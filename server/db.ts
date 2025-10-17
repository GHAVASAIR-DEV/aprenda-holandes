import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Course queries
export async function getAllModules() {
  const db = await getDb();
  if (!db) return [];
  const { modules } = await import("../drizzle/schema");
  return db.select().from(modules).orderBy(modules.orderIndex);
}

export async function getLessonsByModule(moduleId: string) {
  const db = await getDb();
  if (!db) return [];
  const { lessons } = await import("../drizzle/schema");
  return db.select().from(lessons).where(eq(lessons.moduleId, moduleId)).orderBy(lessons.orderIndex);
}

export async function getLesson(lessonId: string) {
  const db = await getDb();
  if (!db) return null;
  const { lessons } = await import("../drizzle/schema");
  const result = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getExercisesByLesson(lessonId: string) {
  const db = await getDb();
  if (!db) return [];
  const { exercises } = await import("../drizzle/schema");
  return db.select().from(exercises).where(eq(exercises.lessonId, lessonId)).orderBy(exercises.orderIndex);
}

export async function getVocabularyByLesson(lessonId: string) {
  const db = await getDb();
  if (!db) return [];
  const { vocabulary } = await import("../drizzle/schema");
  return db.select().from(vocabulary).where(eq(vocabulary.lessonId, lessonId));
}

export async function getUserProgress(userId: string) {
  const db = await getDb();
  if (!db) return [];
  const { userProgress } = await import("../drizzle/schema");
  return db.select().from(userProgress).where(eq(userProgress.userId, userId));
}

export async function updateProgress(userId: string, lessonId: string, completed: boolean, score?: number) {
  const db = await getDb();
  if (!db) return null;
  const { userProgress } = await import("../drizzle/schema");
  const progressId = `${userId}-${lessonId}`;
  
  await db.insert(userProgress).values({
    id: progressId,
    userId,
    lessonId,
    completed: completed ? "true" : "false",
    score: score?.toString(),
    lastAccessedAt: new Date(),
    completedAt: completed ? new Date() : null,
  }).onDuplicateKeyUpdate({
    set: {
      completed: completed ? "true" : "false",
      score: score?.toString(),
      lastAccessedAt: new Date(),
      completedAt: completed ? new Date() : null,
    },
  });
  
  return { success: true };
}

export async function getUserProgressByModule(userId: string) {
  const db = await getDb();
  if (!db) return [];
  
  const { modules, lessons, userProgress } = await import("../drizzle/schema");
  
  // Get all modules
  const allModules = await db.select().from(modules).orderBy(modules.orderIndex);
  
  // Get all lessons
  const allLessons = await db.select().from(lessons);
  
  // Get user progress
  const progress = await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  
  // Calculate progress for each module
  return allModules.map((module) => {
    const moduleLessons = allLessons.filter((l) => l.moduleId === module.id);
    const total = moduleLessons.length;
    const completed = progress.filter(
      (p) => moduleLessons.some((l) => l.id === p.lessonId) && p.completed === "true"
    ).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      moduleId: module.id,
      moduleTitle: module.title,
      completed,
      total,
      percentage,
    };
  });
}
