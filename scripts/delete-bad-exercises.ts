import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs/promises';

const db = drizzle(process.env.DATABASE_URL!);

async function deleteBadExercises() {
  console.log('=== DELETING PROBLEMATIC EXERCISES ===\n');

  // Read the list of bad exercises
  const badExercisesData = await fs.readFile('/home/ubuntu/bad-exercises.json', 'utf-8');
  const badExercises = JSON.parse(badExercisesData);

  // Get unique exercise IDs
  const uniqueIds = [...new Set(badExercises.map((ex: any) => ex.id))];

  console.log(`Found ${uniqueIds.length} unique exercises to delete\n`);

  let deleted = 0;
  for (const id of uniqueIds) {
    await db.delete(exercises).where(eq(exercises.id, id));
    deleted++;
    if (deleted <= 15) {
      console.log(`✓ Deleted [${id}]`);
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total exercises deleted: ${deleted}`);
  console.log(`✅ All problematic exercises removed!\n`);
}

deleteBadExercises();

