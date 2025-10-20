import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function fixLesson() {
  console.log('=== FIXING LESSON 1-1 EXERCISES ===\n');

  // Get all exercises
  const allEx = await db.select().from(exercises).where(eq(exercises.lessonId, 'lesson-1-1'));
  
  // Sort by orderIndex
  allEx.sort((a, b) => {
    const aNum = parseInt(a.orderIndex);
    const bNum = parseInt(b.orderIndex);
    return aNum - bNum;
  });

  console.log(`Found ${allEx.length} exercises\n`);

  // Fix ordering and problematic exercise
  for (let i = 0; i < allEx.length; i++) {
    const ex = allEx[i];
    const newOrderIndex = String(i + 1).padStart(2, '0');
    
    // Fix exercise 3 (the fill_blank one)
    if (i === 2) {
      console.log(`Fixing exercise ${i + 1}: Converting to multiple_choice`);
      await db.update(exercises)
        .set({
          orderIndex: newOrderIndex,
          type: 'multiple_choice',
          question: "Qual saudação em holandês significa 'Olá'?"
        })
        .where(eq(exercises.id, ex.id));
    } else {
      // Just fix ordering
      if (ex.orderIndex !== newOrderIndex) {
        console.log(`Updating exercise ${i + 1}: ${ex.orderIndex} → ${newOrderIndex}`);
        await db.update(exercises)
          .set({ orderIndex: newOrderIndex })
          .where(eq(exercises.id, ex.id));
      }
    }
  }

  console.log('\n✅ Lesson 1-1 exercises fixed!\n');
}

fixLesson();

