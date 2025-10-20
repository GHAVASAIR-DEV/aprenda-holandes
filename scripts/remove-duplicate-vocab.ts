import { drizzle } from 'drizzle-orm/mysql2';
import { vocabulary } from '../drizzle/schema';
import { eq, and } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function removeDuplicateVocab() {
  console.log('=== REMOVING DUPLICATE VOCABULARY ===\n');

  const allVocab = await db.select().from(vocabulary);
  
  // Group by lesson and dutch word
  const grouped: Record<string, typeof allVocab> = {};
  
  allVocab.forEach(v => {
    const key = `${v.lessonId}:${v.dutch.toLowerCase()}`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(v);
  });
  
  let removed = 0;
  
  // Find duplicates and keep only the first one
  for (const [key, vocabList] of Object.entries(grouped)) {
    if (vocabList.length > 1) {
      console.log(`\nFound ${vocabList.length} duplicates for: ${vocabList[0].dutch} in ${vocabList[0].lessonId}`);
      
      // Keep the first one, remove the rest
      for (let i = 1; i < vocabList.length; i++) {
        const toRemove = vocabList[i];
        await db.delete(vocabulary).where(eq(vocabulary.id, toRemove.id));
        removed++;
        console.log(`  ✓ Removed duplicate: ${toRemove.id}`);
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total duplicates removed: ${removed}`);
  console.log(`✅ All duplicate vocabulary removed!\n`);
}

removeDuplicateVocab();

