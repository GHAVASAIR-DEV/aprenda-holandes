import { describe, it, expect, vi } from "vitest";
import "dotenv/config";
import { appRouter } from "../routers";
import { createContext } from "../_core/context";
import type { Request, Response } from "express";
import type { User } from "../../drizzle/schema";

vi.mock("../db", () => ({
  getAllModules: vi.fn().mockResolvedValue([
    { id: "1", name: "Module 1", description: "Description 1", order: 1 },
    { id: "2", name: "Module 2", description: "Description 2", order: 2 },
  ]),
  getLessonsByModule: vi.fn().mockResolvedValue([
    { id: "1", name: "Lesson 1", moduleId: "1", order: 1 },
    { id: "2", name: "Lesson 2", moduleId: "1", order: 2 },
  ]),
  getLesson: vi.fn().mockResolvedValue({ id: "1", name: "Lesson 1", moduleId: "1", order: 1 }),
  getExercisesByLesson: vi.fn().mockResolvedValue([]),
  getVocabularyByLesson: vi.fn().mockResolvedValue([]),
  getUserProgress: vi.fn().mockResolvedValue([]),
}));

vi.mock("../_core/sdk", () => ({
  sdk: {
    authenticateRequest: vi.fn(),
  },
}));

import { sdk } from "../_core/sdk";

describe("course router", () => {
  const req = {
    headers: {},
  } as Request;
  const res = {} as Response;

  it("should return all modules", async () => {
    const ctx = await createContext({ req, res });
    const caller = appRouter.createCaller(ctx);
    const modules = await caller.course.modules();
    expect(modules).toHaveLength(2);
    expect(modules[0].name).toBe("Module 1");
  });

  it("should return lessons for a module", async () => {
    const ctx = await createContext({ req, res });
    const caller = appRouter.createCaller(ctx);
    const lessons = await caller.course.lessons({ moduleId: "1" });
    expect(lessons).toHaveLength(2);
    expect(lessons[0].name).toBe("Lesson 1");
  });

  it("should return a single lesson with exercises and vocabulary", async () => {
    const ctx = await createContext({ req, res });
    const caller = appRouter.createCaller(ctx);
    const result = await caller.course.lesson({ lessonId: "1" });
    expect(result.lesson).toBeDefined();
    expect(result.exercises).toBeDefined();
    expect(result.vocabulary).toBeDefined();
    expect(result.lesson.name).toBe("Lesson 1");
  });

  it("should return user progress", async () => {
    const user: User = {
      id: "1",
      name: "Test User",
      email: "test@test.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      orgId: null,
      picture: null,
      role: "user",
    };
    (sdk.authenticateRequest as vi.Mock).mockResolvedValue(user);

    const ctx = await createContext({ req, res });
    const caller = appRouter.createCaller(ctx);
    const progress = await caller.course.progress();
    expect(progress).toBeDefined();
  });
});
