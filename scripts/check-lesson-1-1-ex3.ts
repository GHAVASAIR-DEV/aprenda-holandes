import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function checkExercise() {
  console.log('=== CHECKING LESSON 1-1 EXERCISES ===\n');

  const allEx = await db.select().from(exercises).where(eq(exercises.lessonId, 'lesson-1-1'));
  
  console.log(`Total exercises for lesson-1-1: ${allEx.length}\n`);
  
  allEx.forEach((ex, index) => {
    console.log(`--- Exercise ${index + 1} (orderIndex: ${ex.orderIndex}) ---`);
    console.log(`ID: ${ex.id}`);
    console.log(`Type: ${ex.type}`);
    console.log(`Question: ${ex.question}`);
    console.log(`Options: ${ex.options}`);
    console.log(`Correct Answer: ${ex.correctAnswer}`);
    console.log('');
  });
}

checkExercise();

