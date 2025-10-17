import { drizzle } from "drizzle-orm/mysql2";
import { vocabulary, lessons, modules, exercises } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function countStats() {
  console.log("📊 Estatísticas do Curso A1:\n");

  const vocabCount = await db.select().from(vocabulary);
  const lessonsCount = await db.select().from(lessons);
  const modulesCount = await db.select().from(modules);
  const exercisesCount = await db.select().from(exercises);

  console.log("✅ Módulos:", modulesCount.length);
  console.log("✅ Lições:", lessonsCount.length);
  console.log("✅ Vocabulário:", vocabCount.length, "palavras");
  console.log("✅ Exercícios:", exercisesCount.length);
  console.log("");

  console.log("📚 Módulos criados:");
  modulesCount.forEach((m) => {
    const moduleLessons = lessonsCount.filter((l) => l.moduleId === m.id);
    const moduleVocab = vocabCount.filter((v) =>
      moduleLessons.some((l) => l.id === v.lessonId)
    );
    console.log(`  ${m.title} (${moduleLessons.length} lições, ${moduleVocab.length} palavras)`);
  });

  console.log("");
  console.log("🎯 Meta CEFR A1: 500-1000 palavras");
  
  if (vocabCount.length >= 500 && vocabCount.length <= 1000) {
    console.log("✅ Meta atingida!");
  } else if (vocabCount.length < 500) {
    console.log(`⚠️  Faltam ${500 - vocabCount.length} palavras para atingir o mínimo`);
  } else {
    console.log("✅ Meta ultrapassada!");
  }
}

countStats()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

