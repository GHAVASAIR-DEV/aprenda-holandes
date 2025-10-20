import { drizzle } from 'drizzle-orm/mysql2';
import { vocabulary } from '../drizzle/schema';
import { or, eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function checkSpecificVocab() {
  const results = await db.select().from(vocabulary).where(
    or(
      eq(vocabulary.dutch, 'elf'),
      eq(vocabulary.dutch, 'twaalf'),
      eq(vocabulary.dutch, 'tellen'),
      eq(vocabulary.dutch, 'het nummer')
    )
  );

  results.forEach(v => {
    console.log('---');
    console.log('Dutch:', v.dutch);
    console.log('Portuguese:', v.portuguese);
    console.log('Example:', v.example);
    console.log('');
  });
}

checkSpecificVocab();

