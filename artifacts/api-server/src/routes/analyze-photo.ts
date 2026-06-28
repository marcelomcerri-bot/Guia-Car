import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

function getGenAI() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY not set");
  return new GoogleGenAI({ apiKey });
}

const ANALYSIS_PROMPT = `Você é um especialista em legislação ambiental brasileira e geoprocessamento. Analise esta foto de propriedade rural e identifique elementos relacionados ao Código Florestal (Lei 12.651/2012).

Responda SOMENTE com um JSON válido no seguinte formato (sem markdown, sem blocos de código):
{
  "risco": "baixo" | "medio" | "alto",
  "resumo": "frase curta de 1-2 linhas descrevendo o que foi visto na imagem",
  "elementos": [
    {
      "tipo": "APP_degradada" | "nascente" | "mata_ciliar" | "reserva_legal" | "vegetacao_nativa" | "uso_consolidado" | "area_regular",
      "detectado": true | false,
      "descricao": "o que foi observado especificamente",
      "gravidade": "ok" | "atencao" | "critico"
    }
  ],
  "recomendacoes": [
    "recomendação 1",
    "recomendação 2",
    "recomendação 3"
  ],
  "proximosPassos": [
    { "acao": "descrição da ação", "urgencia": "imediato" | "curto_prazo" | "longo_prazo" }
  ]
}

Elementos obrigatórios para avaliar (inclua todos na lista, detectado true ou false):
- APP_degradada: margens de rios/córregos sem vegetação, solo exposto em áreas de preservação
- nascente: olhos d'água, brejeiros, locais úmidos sem proteção adequada
- mata_ciliar: vegetação nas margens de cursos d'água
- reserva_legal: área com vegetação nativa significativa no interior da propriedade
- vegetacao_nativa: presença de vegetação nativa em qualquer parte da imagem
- uso_consolidado: uso agropecuário ou edificações em áreas de possível APP

Seja específico e técnico. Se a imagem não for de uma propriedade rural ou não tiver elementos avaliáveis, indique isso no resumo e coloque risco "baixo" com todos detectado false.`;

router.post("/analyze-photo", async (req, res) => {
  const { imageBase64, mimeType } = req.body as {
    imageBase64?: string;
    mimeType?: string;
  };

  if (!imageBase64) {
    res.status(400).json({ error: "imageBase64 é obrigatório" });
    return;
  }

  const mime = mimeType || "image/jpeg";

  try {
    const genai = getGenAI();

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: mime,
                data: imageBase64,
              },
            },
            { text: ANALYSIS_PROMPT },
          ],
        },
      ],
    });

    const rawText = response.text ?? "";

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      res.status(500).json({ error: "Resposta inválida da IA", raw: rawText });
      return;
    }

    const analysis = JSON.parse(jsonMatch[0]);
    res.json(analysis);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: `Erro ao analisar imagem: ${msg}` });
  }
});

export default router;
