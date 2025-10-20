import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function checkExercises() {
  // Get sample exercises to check for errors
  const exs = await db.select().from(exercises).limit(30);

  console.log('=== CHECKING EXERCISES FOR ERRORS ===\n');
  
  let errorCount = 0;
  
  exs.forEach((ex, i) => {
    console.log(`${i+1}. Lesson: ${ex.lessonId} | Type: ${ex.type}`);
    console.log(`   Question: ${ex.question}`);
    console.log(`   Options: ${ex.options}`);
    console.log(`   Correct: ${ex.correctAnswer}`);
    console.log(`   Explanation: ${ex.explanation}`);
    console.log('');
  });
  
  console.log(`\nTotal exercises checked: ${exs.length}`);
}

checkExercises();

