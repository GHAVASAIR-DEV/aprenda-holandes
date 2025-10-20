import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function fixFillBlankExercises() {
  console.log('=== FIXING FILL_BLANK EXERCISES ===\n');

  const allExercises = await db.select().from(exercises);
  
  let convertedToMultipleChoice = 0;
  let addedBlank = 0;

  for (const ex of allExercises) {
    if (ex.type === 'fill_blank' && !ex.question.includes('_____')) {
      let needsUpdate = false;
      let newType = ex.type;
      let newQuestion = ex.question;

      // Check if question starts with "Complete:" or "Complete a frase:"
      if (ex.question.startsWith('Complete:') || ex.question.startsWith('Complete a frase:')) {
        // This should remain fill_blank, but needs _____ added
        // Try to find where to add _____
        
        // Pattern 1: "Complete: 'text'" → try to add _____ intelligently
        const quoteMatch = ex.question.match(/'([^']+)'/);
        if (quoteMatch) {
          const content = quoteMatch[1];
          const correctAnswer = ex.correctAnswer;
          
          // Try to replace the correct answer with _____
          if (content.toLowerCase().includes(correctAnswer.toLowerCase())) {
            const regex = new RegExp(correctAnswer, 'gi');
            const newContent = content.replace(regex, '_____');
            newQuestion = ex.question.replace(quoteMatch[0], `'${newContent}'`);
            needsUpdate = true;
            addedBlank++;
            console.log(`✓ Added _____ [${ex.id}]: "${ex.question.substring(0, 50)}..."`);
          } else {
            // Can't find correct answer in question, add _____ at a logical place
            // Add before punctuation if exists
            if (content.match(/[.!?]$/)) {
              const newContent = content.replace(/([.!?])$/, ' _____ $1');
              newQuestion = ex.question.replace(quoteMatch[0], `'${newContent}'`);
            } else {
              const newContent = content + ' _____';
              newQuestion = ex.question.replace(quoteMatch[0], `'${newContent}'`);
            }
            needsUpdate = true;
            addedBlank++;
            console.log(`✓ Added _____ at end [${ex.id}]: "${ex.question.substring(0, 50)}..."`);
          }
        }
      } else {
        // This is actually a multiple choice question, not fill_blank
        // Convert type to multiple_choice
        newType = 'multiple_choice';
        needsUpdate = true;
        convertedToMultipleChoice++;
        console.log(`✓ Converted to multiple_choice [${ex.id}]: "${ex.question.substring(0, 50)}..."`);
      }

      if (needsUpdate) {
        await db.update(exercises)
          .set({
            type: newType,
            question: newQuestion
          })
          .where(eq(exercises.id, ex.id));
      }
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Converted to multiple_choice: ${convertedToMultipleChoice}`);
  console.log(`Added _____ to fill_blank: ${addedBlank}`);
  console.log(`Total fixed: ${convertedToMultipleChoice + addedBlank}`);
  console.log('\n✅ All fill_blank issues fixed!\n');
}

fixFillBlankExercises();

