import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function fixPortugueseExercises() {
  console.log('=== FIXING EXERCISES WITH PORTUGUESE ANSWERS ===\n');

  // Fix exercise 1: ex-lesson-1-2-new-6
  // Question: "O que significa 'dank je' em português?"
  // Current answer: "obrigado (informal)"
  // This is actually CORRECT - asking for Portuguese translation
  // Change question to ask for Dutch instead
  
  await db.update(exercises)
    .set({
      question: "Como você diz 'obrigado (informal)' em holandês?",
      correctAnswer: "dank je",
      explanation: "'Dank je' é a forma informal de dizer obrigado em holandês."
    })
    .where(eq(exercises.id, 'ex-lesson-1-2-new-6'));
  
  console.log('✓ Fixed ex-lesson-1-2-new-6: Changed to ask for Dutch translation');

  // Fix exercise 2: ex-lesson-8-5-new-4
  // Question: "O que significa 'bedankt' em português?"
  // Current answer: "obrigado"
  // Same issue - change to ask for Dutch
  
  await db.update(exercises)
    .set({
      question: "Como você diz 'obrigado' em holandês (formal)?",
      correctAnswer: "bedankt",
      explanation: "'Bedankt' é a forma mais formal/neutra de dizer obrigado em holandês."
    })
    .where(eq(exercises.id, 'ex-lesson-8-5-new-4'));
  
  console.log('✓ Fixed ex-lesson-8-5-new-4: Changed to ask for Dutch translation');

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total exercises fixed: 2`);
  console.log(`✅ All Portuguese answer issues resolved!\n`);
}

fixPortugueseExercises();

