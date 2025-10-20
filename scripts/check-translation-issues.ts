import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function checkExamples() {
  const exampleIds = [
    'ex-lesson-1-1-new-10',
    'ex-lesson-1-1-new-9',
    'ex-lesson-1-2-new-10',
    'ex-lesson-2-1-new-10',
    'ex-lesson-3-1-new-10'
  ];
  
  console.log('Checking translation issue examples:\n');
  
  for (const id of exampleIds) {
    const ex = await db.select().from(exercises).where(eq(exercises.id, id));
    if (ex.length > 0) {
      const e = ex[0];
      console.log(`ID: ${e.id}`);
      console.log(`Type: ${e.type}`);
      console.log(`Question: "${e.question}"`);
      console.log(`Answer: "${e.correctAnswer}"`);
      console.log(`---`);
    }
  }
  
  process.exit(0);
}

checkExamples().catch(console.error);
