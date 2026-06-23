import { pgTable, text, serial, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const diagnosesTable = pgTable("diagnoses", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  propertyType: text("property_type").notNull(),
  totalAreaHectares: real("total_area_hectares").notNull(),
  biome: text("biome").notNull(),
  appRequiredHectares: real("app_required_hectares").notNull(),
  reservaLegalRequiredHectares: real("reserva_legal_required_hectares").notNull(),
  situacao: text("situacao").notNull(),
  recommendations: text("recommendations").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertDiagnosisSchema = createInsertSchema(diagnosesTable).omit({ id: true, createdAt: true });
export type InsertDiagnosis = z.infer<typeof insertDiagnosisSchema>;
export type Diagnosis = typeof diagnosesTable.$inferSelect;
