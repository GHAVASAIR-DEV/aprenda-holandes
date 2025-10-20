import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function inspect() {
  const allExercises = await db.select().from(exercises);
  
  const problematic = allExercises.filter(ex => 
    ex.type === 'fill_blank' && !ex.question.includes('_____')
  );
  
  console.log(`Found ${problematic.length} fill_blank exercises without _____\n`);
  
  // Show first 5
  problematic.slice(0, 5).forEach((ex, i) => {
    console.log(`${i+1}. ID: ${ex.id}`);
    console.log(`   Question: "${ex.question}"`);
    console.log(`   Correct: "${ex.correctAnswer}"`);
    console.log(`   Starts with "Complete a frase:": ${ex.question.startsWith('Complete a frase:')}`);
    console.log(`   Starts with "Complete:": ${ex.question.startsWith('Complete:')}`);
    console.log('');
  });
}

inspect();

