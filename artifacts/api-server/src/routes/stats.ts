import { Router } from "express";
import { db } from "@workspace/db";
import { chatSessionsTable, chatMessagesTable, guidesTable, diagnosesTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/stats/summary", async (req, res) => {
  const [{ totalSessions }] = await db.select({ totalSessions: sql<number>`count(*)::int` }).from(chatSessionsTable);
  const [{ totalMessages }] = await db.select({ totalMessages: sql<number>`count(*)::int` }).from(chatMessagesTable);
  const [{ totalDiagnoses }] = await db.select({ totalDiagnoses: sql<number>`count(*)::int` }).from(diagnosesTable);
  const [{ totalGuidesAvailable }] = await db.select({ totalGuidesAvailable: sql<number>`count(*)::int` }).from(guidesTable);

  res.json({ totalSessions, totalMessages, totalDiagnoses, totalGuidesAvailable });
});

router.get("/stats/popular-topics", async (req, res) => {
  const topics = await db
    .select({
      topic: chatMessagesTable.topic,
      count: sql<number>`count(*)::int`,
    })
    .from(chatMessagesTable)
    .where(sql`topic IS NOT NULL AND role = 'user'`)
    .groupBy(chatMessagesTable.topic)
    .orderBy(sql`count(*) DESC`)
    .limit(10);

  res.json(topics.map(t => ({ topic: t.topic ?? "Geral", count: t.count })));
});

export default router;
