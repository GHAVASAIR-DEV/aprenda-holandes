import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function updateEx3() {
  const allEx = await db.select().from(exercises).where(eq(exercises.lessonId, 'lesson-1-1'));
  const sorted = allEx.sort((a, b) => parseInt(a.orderIndex) - parseInt(b.orderIndex));
  const ex3 = sorted[2];

  await db.update(exercises)
    .set({
      question: 'Qual saudação em holandês significa "Olá"?',
      options: JSON.stringify(['Hallo', 'Goedemorgen', 'Goedemiddag', 'Goedenavond']),
      correctAnswer: 'Hallo',
      explanation: '"Hallo" é a saudação informal em holandês que significa "Olá" em português.'
    })
    .where(eq(exercises.id, ex3.id));

  console.log('✅ Exercise 3 updated with unique question about greetings');
}

updateEx3();

