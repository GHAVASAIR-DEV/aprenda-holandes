import { drizzle } from "drizzle-orm/mysql2";
import { exercises, lessons, vocabulary } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

async function addMoreExercises() {
  console.log("Adding 10+ exercises per lesson...");

  // Get all lessons
  const allLessons = await db.select().from(lessons);
  console.log(`Found ${allLessons.length} lessons`);

  let totalAdded = 0;

  for (const lesson of allLessons) {
    // Get vocabulary for this lesson
    const lessonVocab = await db
      .select()
      .from(vocabulary)
      .where(eq(vocabulary.lessonId, lesson.id));

    if (lessonVocab.length === 0) {
      console.log(`Skipping ${lesson.id} - no vocabulary`);
      continue;
    }

    // Check existing exercises
    const existingExercises = await db
      .select()
      .from(exercises)
      .where(eq(exercises.lessonId, lesson.id));

    console.log(`Lesson ${lesson.id}: ${existingExercises.length} exercises, ${lessonVocab.length} vocab words`);

    // Generate 10+ exercises per lesson
    const newExercises = [];
    let exerciseCount = existingExercises.length;

    // Type 1: Multiple choice translation (Dutch -> Portuguese)
    for (let i = 0; i < Math.min(3, lessonVocab.length); i++) {
      const word = lessonVocab[i];
      const wrongOptions = lessonVocab
        .filter((v) => v.id !== word.id)
        .slice(0, 3)
        .map((v) => v.portuguese);
      
      newExercises.push({
        id: `ex-${lesson.id}-new-${++exerciseCount}`,
        lessonId: lesson.id,
        type: "multiple_choice",
        question: `O que significa '${word.dutch}' em português?`,
        options: JSON.stringify([word.portuguese, ...wrongOptions]),
        correctAnswer: word.portuguese,
        explanation: `'${word.dutch}' significa '${word.portuguese}'. Exemplo: ${word.example}`,
        orderIndex: exerciseCount.toString().padStart(2, "0"),
      });
    }

    // Type 2: Multiple choice translation (Portuguese -> Dutch)
    for (let i = 0; i < Math.min(3, lessonVocab.length); i++) {
      const word = lessonVocab[i + 3] || lessonVocab[i];
      const wrongOptions = lessonVocab
        .filter((v) => v.id !== word.id)
        .slice(0, 3)
        .map((v) => v.dutch);
      
      newExercises.push({
        id: `ex-${lesson.id}-new-${++exerciseCount}`,
        lessonId: lesson.id,
        type: "multiple_choice",
        question: `Como se diz '${word.portuguese}' em holandês?`,
        options: JSON.stringify([word.dutch, ...wrongOptions]),
        correctAnswer: word.dutch,
        explanation: `'${word.portuguese}' em holandês é '${word.dutch}'. Pronúncia: ${word.pronunciation}`,
        orderIndex: exerciseCount.toString().padStart(2, "0"),
      });
    }

    // Type 3: Fill in the blank
    for (let i = 0; i < Math.min(2, lessonVocab.length); i++) {
      const word = lessonVocab[i + 6] || lessonVocab[i];
      const sentence = word.example.replace(word.dutch, "____");
      const wrongOptions = lessonVocab
        .filter((v) => v.id !== word.id)
        .slice(0, 3)
        .map((v) => v.dutch);
      
      newExercises.push({
        id: `ex-${lesson.id}-new-${++exerciseCount}`,
        lessonId: lesson.id,
        type: "fill_blank",
        question: `Complete a frase: ${sentence}`,
        options: JSON.stringify([word.dutch, ...wrongOptions]),
        correctAnswer: word.dutch,
        explanation: `A palavra correta é '${word.dutch}' (${word.portuguese}). Frase completa: ${word.example}`,
        orderIndex: exerciseCount.toString().padStart(2, "0"),
      });
    }

    // Type 4: Pronunciation matching
    for (let i = 0; i < Math.min(2, lessonVocab.length); i++) {
      const word = lessonVocab[i + 8] || lessonVocab[i];
      const wrongOptions = lessonVocab
        .filter((v) => v.id !== word.id)
        .slice(0, 3)
        .map((v) => v.pronunciation);
      
      newExercises.push({
        id: `ex-${lesson.id}-new-${++exerciseCount}`,
        lessonId: lesson.id,
        type: "multiple_choice",
        question: `Qual é a pronúncia aproximada de '${word.dutch}'?`,
        options: JSON.stringify([word.pronunciation, ...wrongOptions]),
        correctAnswer: word.pronunciation,
        explanation: `'${word.dutch}' se pronuncia aproximadamente como '${word.pronunciation}' em português.`,
        orderIndex: exerciseCount.toString().padStart(2, "0"),
      });
    }

    // Add more exercises to reach at least 10
    while (newExercises.length < 10 && lessonVocab.length > 0) {
      const idx = newExercises.length % lessonVocab.length;
      const word = lessonVocab[idx];
      const wrongOptions = lessonVocab
        .filter((v) => v.id !== word.id)
        .slice(0, 3)
        .map((v) => v.portuguese);
      
      newExercises.push({
        id: `ex-${lesson.id}-new-${++exerciseCount}`,
        lessonId: lesson.id,
        type: "multiple_choice",
        question: `Traduza: '${word.dutch}'`,
        options: JSON.stringify([word.portuguese, ...wrongOptions]),
        correctAnswer: word.portuguese,
        explanation: `'${word.dutch}' = '${word.portuguese}'`,
        orderIndex: exerciseCount.toString().padStart(2, "0"),
      });
    }

    // Insert new exercises
    if (newExercises.length > 0) {
      await db.insert(exercises).values(newExercises);
      totalAdded += newExercises.length;
      console.log(`  Added ${newExercises.length} exercises to ${lesson.id}`);
    }
  }

  console.log(`\n✅ Total exercises added: ${totalAdded}`);
}

addMoreExercises()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

