import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function removeDuplicates() {
  console.log('Removing duplicate exercises...\n');
  
  // List of duplicate exercise IDs to remove (keeping the first occurrence)
  const duplicatesToRemove = [
    // "qual está correto?" - keep ex-5-6-5, remove ex-8-6-5
    'ex-8-6-5',
    
    // "complete a frase: _____!" - keep ex-lesson-1-2-new-11, remove others
    'ex-lesson-2-2-new-10',
    'ex-lesson-8-5-new-9',
    
    // "o que significa 'zijn' em português?" - keep ex-lesson-2-2-new-4, remove ex-lesson-5-2-new-4
    'ex-lesson-5-2-new-4',
    
    // "o que significa 'de koffie' em português?" - keep ex-lesson-3-2-new-4, remove ex-lesson-8-2-new-4
    'ex-lesson-8-2-new-4',
    
    // "o que significa 'de supermarkt' em português?" - keep ex-lesson-4-1-new-3, remove ex-lesson-4-4-new-3
    'ex-lesson-4-4-new-3',
    
    // "o que significa 'vinden' em português?" - keep ex-lesson-4-3-new-2, remove ex-lesson-7-4-new-4
    'ex-lesson-7-4-new-4',
    
    // "qual é a pronúncia aproximada de 'de korting'?" - keep ex-lesson-4-4-new-10, remove ex-lesson-8-4-new-12
    'ex-lesson-8-4-new-12',
    
    // "complete a frase: in ____ _____" - keep ex-lesson-6-1-new-8, remove ex-lesson-6-1-new-9
    'ex-lesson-6-1-new-9',
    
    // "como se diz 'nadar' em holandês?" - keep ex-lesson-6-3-new-7, remove ex-lesson-7-1-new-6
    'ex-lesson-7-1-new-6',
    
    // "complete a frase: _____ brood" - keep ex-lesson-8-3-new-10, remove ex-lesson-8-3-new-9
    'ex-lesson-8-3-new-9'
  ];
  
  console.log(`Total duplicates to remove: ${duplicatesToRemove.length}\n`);
  
  for (const id of duplicatesToRemove) {
    try {
      // First check if exercise exists
      const existing = await db.select().from(exercises).where(eq(exercises.id, id));
      
      if (existing.length > 0) {
        // Delete the exercise
        await db.delete(exercises).where(eq(exercises.id, id));
        console.log(`✅ Removed: ${id}`);
      } else {
        console.log(`⚠️  Not found: ${id}`);
      }
    } catch (error) {
      console.error(`❌ Error removing ${id}:`, error);
    }
  }
  
  console.log('\n✅ Duplicate removal complete!');
  console.log(`Removed ${duplicatesToRemove.length} duplicate exercises.`);
  
  // Verify no more duplicates
  console.log('\nVerifying no duplicates remain...');
  const allExs = await db.select().from(exercises);
  const questionMap = new Map<string, string[]>();
  
  allExs.forEach(ex => {
    const q = ex.question.trim().toLowerCase();
    if (!questionMap.has(q)) {
      questionMap.set(q, []);
    }
    questionMap.get(q)!.push(ex.id);
  });
  
  const remaining = Array.from(questionMap.entries()).filter(([_, ids]) => ids.length > 1);
  
  if (remaining.length > 0) {
    console.log(`\n⚠️  Warning: ${remaining.length} duplicate questions still remain:`);
    remaining.forEach(([question, ids]) => {
      console.log(`  "${question.substring(0, 50)}..." - ${ids.join(', ')}`);
    });
  } else {
    console.log('\n✅ No duplicate questions remain!');
  }
  
  console.log(`\nTotal exercises after cleanup: ${allExs.length - duplicatesToRemove.length}`);
  
  process.exit(0);
}

removeDuplicates().catch(console.error);
