import { Router } from "express";
import { randomUUID } from "crypto";
import { db } from "@workspace/db";
import { chatSessionsTable, chatMessagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListMessagesQueryParams, SendMessageBody } from "@workspace/api-zod";
import OpenAI from "openai";

const router = Router();

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");
  return new OpenAI({ apiKey });
}

const SYSTEM_PROMPT = `Você é o Assistente do CAR (Cadastro Ambiental Rural), um guia especialista em legislação ambiental brasileira, especialmente o Código Florestal (Lei nº 12.651/2012) e o CAR.

Seu papel é ajudar produtores rurais a entender suas obrigações ambientais em linguagem simples, clara e acessível — como um vizinho conhecedor que explica as regras do campo sem jargão jurídico.

Você pode explicar:
- O que é o CAR e como fazer o cadastro
- APP (Área de Preservação Permanente): o que é, quais áreas protegidas, tamanhos mínimos por bioma
- Reserva Legal: percentuais obrigatórios por bioma (80% Amazônia, 35% Cerrado/Amazônia, 20% outros)
- Áreas consolidadas e o que isso significa para a regularização
- PRA (Programa de Regularização Ambiental)
- Como retificar o CAR
- Prazos e consequências de não regularizar
- Benefícios do CAR: crédito rural, PSA, seguro agrícola

Regras importantes:
- Use linguagem simples, direta e amigável. Evite termos jurídicos quando possível; quando necessário, explique-os.
- Sempre que mencionar percentuais ou metragens, seja específico e cite a lei.
- Se não souber a resposta exata, diga isso e oriente o produtor a buscar o órgão ambiental estadual.
- Seja encorajador — muitos produtores têm medo de errar. Reduza a ansiedade.
- Responda sempre em português brasileiro.
- Seja conciso: respostas de 2-4 parágrafos são ideais, a menos que o usuário peça mais detalhes.`;

function detectTopic(content: string): string {
  const lower = content.toLowerCase();
  if (lower.includes("app") || lower.includes("preservação permanente") || lower.includes("mata ciliar")) return "APP";
  if (lower.includes("reserva legal")) return "Reserva Legal";
  if (lower.includes("car") || lower.includes("cadastro ambiental")) return "CAR";
  if (lower.includes("retific")) return "Retificação";
  if (lower.includes("pra") || lower.includes("regulariz")) return "Regularização";
  if (lower.includes("crédito") || lower.includes("credito")) return "Crédito Rural";
  if (lower.includes("multa") || lower.includes("sanção") || lower.includes("infração")) return "Sanções";
  if (lower.includes("bioma") || lower.includes("cerrado") || lower.includes("amazônia")) return "Biomas";
  return "Geral";
}

router.post("/chat/sessions", async (req, res) => {
  const id = randomUUID();
  const [session] = await db.insert(chatSessionsTable).values({ id }).returning();
  res.status(201).json({ id: session.id, createdAt: session.createdAt.toISOString() });
});

router.get("/chat/messages", async (req, res) => {
  const parsed = ListMessagesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "sessionId required" });
    return;
  }
  const messages = await db
    .select()
    .from(chatMessagesTable)
    .where(eq(chatMessagesTable.sessionId, parsed.data.sessionId))
    .orderBy(chatMessagesTable.createdAt);
  res.json(messages.map(m => ({ ...m, createdAt: m.createdAt.toISOString() })));
});

router.post("/chat/messages", async (req, res) => {
  const parsed = SendMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const { sessionId, content } = parsed.data;

  // Ensure session exists
  const existing = await db.select().from(chatSessionsTable).where(eq(chatSessionsTable.id, sessionId));
  if (existing.length === 0) {
    await db.insert(chatSessionsTable).values({ id: sessionId });
  }

  // Save user message
  const topic = detectTopic(content);
  await db.insert(chatMessagesTable).values({ sessionId, role: "user", content, topic });

  // Get conversation history
  const history = await db
    .select()
    .from(chatMessagesTable)
    .where(eq(chatMessagesTable.sessionId, sessionId))
    .orderBy(chatMessagesTable.createdAt);

  let assistantContent: string;

  try {
    const openai = getOpenAI();
    const chatMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      max_tokens: 800,
    });

    assistantContent = completion.choices[0]?.message?.content ?? "Desculpe, não consegui processar sua pergunta. Tente novamente.";
  } catch {
    assistantContent = "Desculpe, o assistente de IA não está disponível no momento. Verifique se a chave OPENAI_API_KEY está configurada corretamente.";
  }

  const [saved] = await db.insert(chatMessagesTable).values({
    sessionId,
    role: "assistant",
    content: assistantContent,
    topic,
  }).returning();

  res.status(201).json({ ...saved, createdAt: saved.createdAt.toISOString() });
});

export default router;
