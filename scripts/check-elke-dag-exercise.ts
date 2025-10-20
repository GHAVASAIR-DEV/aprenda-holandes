import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function checkExercise() {
  const all = await db.select().from(exercises);
  
  const found = all.filter(e => e.question && e.question.toLowerCase().includes('elke dag'));
  
  console.log(`Found ${found.length} exercises with 'elke dag'\n`);
  
  found.forEach(e => {
    console.log('ID:', e.id);
    console.log('Question:', e.question);
    console.log('Options (raw):', e.options);
    console.log('Options (parsed):', JSON.parse(e.options || '[]'));
    console.log('Correct:', e.correctAnswer);
    console.log('Type:', e.type);
    console.log('---\n');
  });
}

checkExercise();

