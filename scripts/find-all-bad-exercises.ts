import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function findAllBadExercises() {
  console.log('=== COMPREHENSIVE EXERCISE QUALITY CHECK ===\n');

  const all = await db.select().from(exercises);
  const problems: Array<{id: string, issue: string, options: string}> = [];

  all.forEach(ex => {
    try {
      const options = JSON.parse(ex.options || '[]');
      
      // Check for various types of bad options
      options.forEach((opt: string, idx: number) => {
        const optLower = opt.toLowerCase();
        
        // Generic option patterns
        if (
          optLower.includes('opção incorreta') ||
          optLower.includes('incorrect option') ||
          optLower.match(/^incorreta\d+$/) ||
          optLower.match(/^incorrect\d+$/) ||
          optLower.match(/^opção \d+$/) ||
          optLower.match(/^option \d+$/) ||
          opt === 'incorreta1' ||
          opt === 'incorreta2' ||
          opt === 'incorreta3' ||
          opt === 'incorrect1' ||
          opt === 'incorrect2' ||
          opt === 'incorrect3'
        ) {
          problems.push({
            id: ex.id,
            issue: `Generic option at index ${idx}: "${opt}"`,
            options: ex.options!
          });
        }
      });

      // Check for duplicate options
      const uniqueOptions = new Set(options);
      if (uniqueOptions.size !== options.length) {
        problems.push({
          id: ex.id,
          issue: 'Duplicate options found',
          options: ex.options!
        });
      }

      // Check if correct answer is in options
      if (!options.includes(ex.correctAnswer)) {
        problems.push({
          id: ex.id,
          issue: `Correct answer "${ex.correctAnswer}" not in options`,
          options: ex.options!
        });
      }

      // Check for too few options
      if (options.length < 2) {
        problems.push({
          id: ex.id,
          issue: `Only ${options.length} option(s)`,
          options: ex.options!
        });
      }

    } catch (e) {
      problems.push({
        id: ex.id,
        issue: 'Cannot parse options JSON',
        options: ex.options || 'null'
      });
    }
  });

  console.log(`Total exercises checked: ${all.length}`);
  console.log(`Exercises with problems: ${problems.length}\n`);

  if (problems.length > 0) {
    console.log('All problematic exercises:\n');
    problems.forEach((p, i) => {
      console.log(`${i + 1}. [${p.id}]`);
      console.log(`   Issue: ${p.issue}`);
      console.log(`   Options: ${p.options}`);
      console.log('');
    });
  } else {
    console.log('✅ No problems found! All exercises are valid.\n');
  }

  // Save to file
  const fs = await import('fs/promises');
  await fs.writeFile(
    '/home/ubuntu/bad-exercises.json',
    JSON.stringify(problems, null, 2)
  );
  console.log(`Full results saved to: /home/ubuntu/bad-exercises.json\n`);
}

findAllBadExercises();

