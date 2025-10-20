import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function findEmptyOptions() {
  console.log('=== FINDING EXERCISES WITH EMPTY/MISSING OPTIONS ===\n');

  const all = await db.select().from(exercises);
  const problems: Array<{id: string, question: string, options: string, type: string}> = [];

  all.forEach(ex => {
    try {
      const options = JSON.parse(ex.options || '[]');
      
      // Check for empty or missing options
      if (!options || options.length === 0) {
        problems.push({
          id: ex.id,
          question: ex.question.substring(0, 60) + '...',
          options: ex.options || 'null',
          type: ex.type
        });
      }
    } catch (e) {
      problems.push({
        id: ex.id,
        question: ex.question.substring(0, 60) + '...',
        options: ex.options || 'null',
        type: ex.type
      });
    }
  });

  console.log(`Total exercises: ${all.length}`);
  console.log(`Exercises with empty/missing options: ${problems.length}\n`);

  if (problems.length > 0) {
    console.log('All problematic exercises:\n');
    problems.forEach((p, i) => {
      console.log(`${i + 1}. [${p.id}] Type: ${p.type}`);
      console.log(`   Question: ${p.question}`);
      console.log(`   Options: ${p.options}`);
      console.log('');
    });
  } else {
    console.log('✅ All exercises have valid options!\n');
  }

  // Save to file
  const fs = await import('fs/promises');
  await fs.writeFile(
    '/home/ubuntu/empty-options.json',
    JSON.stringify(problems, null, 2)
  );
}

findEmptyOptions();

