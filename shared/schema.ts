import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  uniqueId: text("unique_id").notNull().unique(),
  prompt: text("prompt").notNull(),
  category: text("category").notNull(),
  ideasList: text("ideas_list").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertIdeaSchema = createInsertSchema(ideas).omit({
  id: true,
  createdAt: true,
});

export const generateIdeaSchema = z.object({
  prompt: z.string().min(1).max(100),
  category: z.enum([
    "Business", 
    "Story", 
    "App", 
    "Product", 
    "Marketing", 
    "Social Media", 
    "Education", 
    "Technology", 
    "Food", 
    "Travel"
  ]),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Idea = typeof ideas.$inferSelect;
export type InsertIdea = z.infer<typeof insertIdeaSchema>;
export type GenerateIdeaRequest = z.infer<typeof generateIdeaSchema>;
