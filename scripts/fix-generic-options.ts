import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function fixGenericOptions() {
  console.log('=== FINDING EXERCISES WITH GENERIC OPTIONS ===\n');

  const all = await db.select().from(exercises);
  const problematic: typeof all = [];

  all.forEach(ex => {
    try {
      const options = JSON.parse(ex.options || '[]');
      const hasGeneric = options.some((opt: string) => 
        opt.includes('opção incorreta') || 
        opt.includes('incorrect option') ||
        opt === 'opção 1' ||
        opt === 'opção 2' ||
        opt === 'opção 3'
      );

      if (hasGeneric) {
        problematic.push(ex);
      }
    } catch (e) {
      // Skip if can't parse
    }
  });

  console.log(`Found ${problematic.length} exercises with generic options\n`);

  if (problematic.length > 0) {
    console.log('First 10 examples:\n');
    problematic.slice(0, 10).forEach((ex, i) => {
      console.log(`${i + 1}. [${ex.id}]`);
      console.log(`   Question: ${ex.question.substring(0, 60)}...`);
      console.log(`   Options: ${ex.options}`);
      console.log('');
    });
  }

  // Delete these problematic exercises
  console.log('\n=== DELETING PROBLEMATIC EXERCISES ===\n');
  
  let deleted = 0;
  for (const ex of problematic) {
    await db.delete(exercises).where(eq(exercises.id, ex.id));
    deleted++;
    if (deleted <= 10) {
      console.log(`✓ Deleted [${ex.id}]`);
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total exercises deleted: ${deleted}`);
  console.log(`✅ Generic option exercises removed!\n`);
  console.log(`Note: These exercises need to be recreated with proper options.`);
}

fixGenericOptions();

