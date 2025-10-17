import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  course: router({
    modules: publicProcedure.query(async () => {
      const { getAllModules } = await import("./db");
      return getAllModules();
    }),
    
    lessons: publicProcedure
      .input(z.object({ moduleId: z.string() }))
      .query(async ({ input }) => {
        const { getLessonsByModule } = await import("./db");
        return getLessonsByModule(input.moduleId);
      }),
    
    lesson: publicProcedure
      .input(z.object({ lessonId: z.string() }))
      .query(async ({ input }) => {
        const { getLesson, getExercisesByLesson, getVocabularyByLesson } = await import("./db");
        const lesson = await getLesson(input.lessonId);
        const exercises = await getExercisesByLesson(input.lessonId);
        const vocabulary = await getVocabularyByLesson(input.lessonId);
        return { lesson, exercises, vocabulary };
      }),
    
    progress: protectedProcedure.query(async ({ ctx }) => {
      const { getUserProgress } = await import("./db");
      return getUserProgress(ctx.user.id);
    }),
    
    updateProgress: protectedProcedure
      .input(z.object({
        lessonId: z.string(),
        completed: z.boolean(),
        score: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { updateProgress } = await import("./db");
        return updateProgress(ctx.user.id, input.lessonId, input.completed, input.score);
      }),
  }),
});

export type AppRouter = typeof appRouter;
