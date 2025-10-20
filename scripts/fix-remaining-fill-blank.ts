import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function fixRemainingFillBlank() {
  console.log('=== FIXING REMAINING FILL_BLANK EXERCISES ===\n');

  const allExercises = await db.select().from(exercises);
  
  let fixed = 0;

  for (const ex of allExercises) {
    if (ex.type === 'fill_blank' && !ex.question.includes('_____')) {
      let newQuestion = ex.question;
      const correctAnswer = ex.correctAnswer;

      // Pattern: "Complete a frase: Text here."
      if (ex.question.startsWith('Complete a frase:')) {
        const afterColon = ex.question.substring('Complete a frase:'.length).trim();
        
        // Try to find the correct answer in the text
        const lowerText = afterColon.toLowerCase();
        const lowerAnswer = correctAnswer.toLowerCase();
        
        if (lowerText.includes(lowerAnswer)) {
          // Replace the correct answer with _____
          const regex = new RegExp(correctAnswer, 'gi');
          const newText = afterColon.replace(regex, '_____');
          newQuestion = `Complete a frase: ${newText}`;
          
          await db.update(exercises)
            .set({ question: newQuestion })
            .where(eq(exercises.id, ex.id));
          
          fixed++;
          console.log(`✓ Fixed [${ex.id}]: Replaced "${correctAnswer}" with _____`);
        } else {
          // Correct answer not in text, add _____ at the end
          // Remove trailing period/punctuation first
          let newText = afterColon.replace(/[.!?]\s*$/, '');
          newText = `${newText} _____.`;
          newQuestion = `Complete a frase: ${newText}`;
          
          await db.update(exercises)
            .set({ question: newQuestion })
            .where(eq(exercises.id, ex.id));
          
          fixed++;
          console.log(`✓ Fixed [${ex.id}]: Added _____ at end`);
        }
      }
      // Pattern: "Complete: 'Text here.'"
      else if (ex.question.startsWith('Complete:')) {
        const quoteMatch = ex.question.match(/'([^']+)'/);
        if (quoteMatch) {
          const content = quoteMatch[1];
          const lowerContent = content.toLowerCase();
          const lowerAnswer = correctAnswer.toLowerCase();
          
          if (lowerContent.includes(lowerAnswer)) {
            const regex = new RegExp(correctAnswer, 'gi');
            const newContent = content.replace(regex, '_____');
            newQuestion = ex.question.replace(quoteMatch[0], `'${newContent}'`);
          } else {
            // Add _____ before punctuation or at end
            let newContent = content.replace(/([.!?])\s*$/, ' _____ $1');
            if (!newContent.includes('_____')) {
              newContent = content + ' _____';
            }
            newQuestion = ex.question.replace(quoteMatch[0], `'${newContent}'`);
          }
          
          await db.update(exercises)
            .set({ question: newQuestion })
            .where(eq(exercises.id, ex.id));
          
          fixed++;
          console.log(`✓ Fixed [${ex.id}]: Added _____ in quotes`);
        }
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total fixed: ${fixed}`);
  console.log(`✅ All remaining fill_blank exercises fixed!\n`);
}

fixRemainingFillBlank();

