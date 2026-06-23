import { Router } from "express";
import { db } from "@workspace/db";
import { diagnosesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateDiagnosisBody, ListDiagnosesQueryParams } from "@workspace/api-zod";

const router = Router();

function calculateDiagnosis(data: {
  propertyType: string;
  totalAreaHectares: number;
  biome: string;
  hasRiver: boolean;
  riverWidthMeters?: number | null;
  hasSpring: boolean;
  hasNativeVegetation: boolean;
  nativeVegetationAreaHectares?: number | null;
  consolidatedUseAreaHectares?: number | null;
}) {
  // Calculate APP required (simplified Código Florestal rules)
  let appRequiredHectares = 0;

  if (data.hasRiver && data.riverWidthMeters) {
    const w = data.riverWidthMeters;
    let appWidth = 30; // default for rivers < 10m
    if (w <= 10) appWidth = 30;
    else if (w <= 50) appWidth = 50;
    else if (w <= 200) appWidth = 100;
    else if (w <= 600) appWidth = 200;
    else appWidth = 500;

    // Approximate: river length ~20% of total area perimeter (simplified)
    const estimatedRiverLengthKm = Math.sqrt(data.totalAreaHectares * 10000) / 1000;
    appRequiredHectares += (appWidth * estimatedRiverLengthKm * 1000) / 10000;
  }

  if (data.hasSpring) {
    // 50m radius around spring = ~0.785 ha per spring
    appRequiredHectares += 0.785;
  }

  // Calculate Reserva Legal percentage by biome
  let reservaLegalPct = 0.20; // default 20%
  if (data.biome === "amazonia") reservaLegalPct = 0.80;
  else if (data.biome === "cerrado") reservaLegalPct = 0.35;
  else if (data.biome === "mata_atlantica") reservaLegalPct = 0.20;
  else if (data.biome === "caatinga") reservaLegalPct = 0.20;
  else if (data.biome === "pampa") reservaLegalPct = 0.20;
  else if (data.biome === "pantanal") reservaLegalPct = 0.20;

  const reservaLegalRequiredHectares = data.totalAreaHectares * reservaLegalPct;
  const nativeVeg = data.nativeVegetationAreaHectares ?? 0;
  const totalRequired = appRequiredHectares + reservaLegalRequiredHectares;

  // Determine situation
  let situacao: "regular" | "pendente" | "irregular";
  if (nativeVeg >= totalRequired) {
    situacao = "regular";
  } else if (nativeVeg >= totalRequired * 0.5) {
    situacao = "pendente";
  } else {
    situacao = "irregular";
  }

  // Generate recommendations
  const recommendations: string[] = [];

  if (situacao === "regular") {
    recommendations.push("Sua propriedade aparenta estar em conformidade com o Código Florestal. Finalize o CAR com esses dados.");
    recommendations.push("Mantenha a vegetação nativa existente e monitore regularmente.");
  } else if (situacao === "pendente") {
    const deficit = totalRequired - nativeVeg;
    recommendations.push(`Você precisa regularizar aproximadamente ${deficit.toFixed(1)} hectares de vegetação nativa.`);
    recommendations.push("Procure o órgão ambiental estadual para aderir ao PRA (Programa de Regularização Ambiental).");
    recommendations.push("No PRA, você pode fazer recomposição florestal, regeneração natural ou compensação com CRA.");
  } else {
    recommendations.push("Sua propriedade tem um déficit significativo de vegetação nativa exigida por lei.");
    recommendations.push("Procure urgentemente o órgão ambiental estadual para regularização e evitar multas.");
    recommendations.push(`Área total exigida: ${totalRequired.toFixed(1)} ha (APP: ${appRequiredHectares.toFixed(1)} ha + Reserva Legal: ${reservaLegalRequiredHectares.toFixed(1)} ha).`);
    recommendations.push("A regularização pelo PRA é obrigatória e possibilita parcelamento da recomposição em até 20 anos.");
  }

  if (data.biome === "amazonia") {
    recommendations.push("Atenção: no bioma Amazônia, a Reserva Legal obrigatória é de 80% da área da propriedade.");
  }

  return {
    appRequiredHectares: Math.round(appRequiredHectares * 100) / 100,
    reservaLegalRequiredHectares: Math.round(reservaLegalRequiredHectares * 100) / 100,
    situacao,
    recommendations,
  };
}

router.post("/diagnosis", async (req, res) => {
  const parsed = CreateDiagnosisBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body", details: parsed.error.issues });
    return;
  }

  const data = parsed.data;
  const result = calculateDiagnosis(data);

  const [diagnosis] = await db.insert(diagnosesTable).values({
    sessionId: data.sessionId,
    propertyType: data.propertyType,
    totalAreaHectares: data.totalAreaHectares,
    biome: data.biome,
    appRequiredHectares: result.appRequiredHectares,
    reservaLegalRequiredHectares: result.reservaLegalRequiredHectares,
    situacao: result.situacao,
    recommendations: result.recommendations,
  }).returning();

  res.status(201).json({ ...diagnosis, createdAt: diagnosis.createdAt.toISOString() });
});

router.get("/diagnosis/history", async (req, res) => {
  const parsed = ListDiagnosesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "sessionId required" });
    return;
  }

  const diagnoses = await db
    .select()
    .from(diagnosesTable)
    .where(eq(diagnosesTable.sessionId, parsed.data.sessionId))
    .orderBy(diagnosesTable.createdAt);

  res.json(diagnoses.map(d => ({ ...d, createdAt: d.createdAt.toISOString() })));
});

export default router;
