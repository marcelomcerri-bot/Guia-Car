import { Router } from "express";
import { db } from "@workspace/db";
import { guidesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { GetGuideParams, ListGuidesQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/guides", async (req, res) => {
  const parsed = ListGuidesQueryParams.safeParse(req.query);
  const category = parsed.success ? parsed.data.category : undefined;

  const guides = category
    ? await db.select().from(guidesTable).where(eq(guidesTable.category, category))
    : await db.select().from(guidesTable);

  res.json(guides.map(g => ({
    ...g,
    tags: g.tags ?? [],
  })));
});

router.get("/guides/:id", async (req, res) => {
  const parsed = GetGuideParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [guide] = await db.select().from(guidesTable).where(eq(guidesTable.id, parsed.data.id));
  if (!guide) {
    res.status(404).json({ error: "Guide not found" });
    return;
  }

  res.json({ ...guide, tags: guide.tags ?? [] });
});

export default router;
