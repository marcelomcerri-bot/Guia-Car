import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const guidesTable = pgTable("guides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  readingTimeMinutes: integer("reading_time_minutes").notNull().default(3),
  icon: text("icon"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertGuideSchema = createInsertSchema(guidesTable).omit({ id: true, createdAt: true });
export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type Guide = typeof guidesTable.$inferSelect;
