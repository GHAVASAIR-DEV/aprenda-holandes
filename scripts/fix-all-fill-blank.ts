import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function fixAllFillBlank() {
  console.log('=== FIXING ALL PROBLEMATIC FILL_BLANK EXERCISES ===\n');

  const all = await db.select().from(exercises);
  const problems: Array<{id: string, question: string}> = [];

  // Find all fill_blank exercises without proper _____ format
  all.forEach(ex => {
    if (ex.type === 'fill_blank') {
      // Check if question has _____ in it
      if (!ex.question.includes('_____')) {
        problems.push({
          id: ex.id,
          question: ex.question
        });
      }
    }
  });

  console.log(`Total exercises: ${all.length}`);
  console.log(`Problematic fill_blank exercises: ${problems.length}\n`);

  if (problems.length === 0) {
    console.log('✅ All fill_blank exercises are properly formatted!\n');
    return;
  }

  // Convert all problematic fill_blank to multiple_choice
  let fixed = 0;
  for (const prob of problems) {
    try {
      await db.update(exercises)
        .set({ type: 'multiple_choice' })
        .where(eq(exercises.id, prob.id));
      
      fixed++;
      if (fixed <= 10) {
        console.log(`✓ [${fixed}] Converted to multiple_choice: ${prob.id}`);
        console.log(`   ${prob.question.substring(0, 60)}...`);
      }
    } catch (error) {
      console.error(`✗ Failed to fix ${prob.id}: ${error}`);
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Exercises fixed: ${fixed}/${problems.length}`);
  console.log(`✅ All problematic fill_blank exercises converted!\n`);
}

fixAllFillBlank();

