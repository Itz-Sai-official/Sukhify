import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  userType: text("user_type"),
  stressLevel: integer("stress_level"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  isUser: boolean("is_user").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const evaluationResponses = pgTable("evaluation_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  responses: text("responses").array().notNull(),
  score: integer("score").notNull(),
});

// Schema for user registration and login
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
}).omit({ id: true, createdAt: true });

export const loginSchema = insertUserSchema.pick({
  email: true,
  password: true,
});

export const insertMessageSchema = createInsertSchema(messages);
export const insertEvaluationSchema = createInsertSchema(evaluationResponses);

export type User = typeof users.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type EvaluationResponse = typeof evaluationResponses.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;

export const userTypes = ["student", "parent", "employee", "teenager", "psychiatrist"] as const;