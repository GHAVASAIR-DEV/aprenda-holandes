import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Course structure tables
export const modules = mysqlTable("modules", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  level: mysqlEnum("level", ["A1", "A2"]).notNull(),
  orderIndex: varchar("orderIndex", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const lessons = mysqlTable("lessons", {
  id: varchar("id", { length: 64 }).primaryKey(),
  moduleId: varchar("moduleId", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content"),
  orderIndex: varchar("orderIndex", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const exercises = mysqlTable("exercises", {
  id: varchar("id", { length: 64 }).primaryKey(),
  lessonId: varchar("lessonId", { length: 64 }).notNull(),
  type: mysqlEnum("type", ["multiple_choice", "fill_blank", "matching", "listening", "speaking"]).notNull(),
  question: text("question").notNull(),
  options: text("options"),
  correctAnswer: text("correctAnswer").notNull(),
  explanation: text("explanation"),
  audioUrl: varchar("audioUrl", { length: 512 }),
  orderIndex: varchar("orderIndex", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const vocabulary = mysqlTable("vocabulary", {
  id: varchar("id", { length: 64 }).primaryKey(),
  lessonId: varchar("lessonId", { length: 64 }).notNull(),
  dutch: varchar("dutch", { length: 255 }).notNull(),
  portuguese: varchar("portuguese", { length: 255 }).notNull(),
  pronunciation: varchar("pronunciation", { length: 255 }),
  audioUrl: varchar("audioUrl", { length: 512 }),
  example: text("example"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const userProgress = mysqlTable("userProgress", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  lessonId: varchar("lessonId", { length: 64 }).notNull(),
  completed: varchar("completed", { length: 10 }).default("false").notNull(),
  score: varchar("score", { length: 10 }),
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow(),
  completedAt: timestamp("completedAt"),
});

export type Module = typeof modules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type Vocabulary = typeof vocabulary.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
