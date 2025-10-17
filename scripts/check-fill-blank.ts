import { getDb } from '../server/db';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const db = await getDb();
  if (!db) {
    console.log('Database not available');
    return;
  }
  
  const fillBlankEx = await db.select().from(exercises).where(eq(exercises.type, 'fill_blank')).limit(5);
  console.log('Fill-blank exercises found:', fillBlankEx.length);
  console.log(JSON.stringify(fillBlankEx, null, 2));
}

main();

