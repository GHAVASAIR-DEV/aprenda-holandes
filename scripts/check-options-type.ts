import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function checkType() {
  const ex = await db.select().from(exercises).limit(3);
  
  ex.forEach((e, i) => {
    console.log(`\nExercise ${i+1}:`);
    console.log('  Type of options:', typeof e.options);
    console.log('  Is Array:', Array.isArray(e.options));
    console.log('  Value:', e.options);
    console.log('  Parsed:', JSON.stringify(e.options));
  });
}

checkType();

