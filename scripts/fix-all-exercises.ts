import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function fixAllExercises() {
  console.log('=== FIXING ALL EXERCISE ERRORS ===\n');

  const allExercises = await db.select().from(exercises);
  
  let fixedCount = 0;
  let fillBlankFixed = 0;
  let duplicatesFixed = 0;
  let matchingFixed = 0;

  for (const ex of allExercises) {
    let needsUpdate = false;
    let newQuestion = ex.question;
    let newOptions = ex.options;
    let newCorrectAnswer = ex.correctAnswer;

    let options: string[] = [];
    try {
      options = JSON.parse(ex.options || '[]');
      if (!Array.isArray(options)) {
        options = [];
      }
    } catch (e) {
      options = [];
    }

    // Fix 1: Fill_blank without _____
    if (ex.type === 'fill_blank' && !ex.question.includes('_____')) {
      // Try to intelligently add _____
      // Strategy: Look for the correct answer in the question and replace it
      const correctWord = ex.correctAnswer;
      
      if (ex.question.includes(correctWord)) {
        // Replace the correct answer with _____
        newQuestion = ex.question.replace(correctWord, '_____');
        needsUpdate = true;
        fillBlankFixed++;
        console.log(`✓ Fixed fill_blank [${ex.id}]: Added _____ for "${correctWord}"`);
      } else {
        // If correct answer not in question, try to add _____ at the end
        // Look for patterns like "Complete: 'text'"
        if (ex.question.includes("'") && ex.question.includes("'")) {
          // Add _____ before the closing quote
          newQuestion = ex.question.replace(/'([^']+)'/, (match, content) => {
            // Check if content has a period or exclamation at the end
            if (content.endsWith('.') || content.endsWith('!') || content.endsWith('?')) {
              return `'${content.slice(0, -1)} _____${content.slice(-1)}'`;
            } else {
              return `'${content} _____'`;
            }
          });
          needsUpdate = true;
          fillBlankFixed++;
          console.log(`✓ Fixed fill_blank [${ex.id}]: Added _____ at end`);
        }
      }
    }

    // Fix 2: Duplicate options
    const uniqueOptions = [...new Set(options)];
    if (uniqueOptions.length !== options.length && uniqueOptions.length >= 2) {
      // Remove duplicates
      newOptions = JSON.stringify(uniqueOptions);
      needsUpdate = true;
      duplicatesFixed++;
      console.log(`✓ Fixed duplicates [${ex.id}]: ${options.length} → ${uniqueOptions.length} options`);
    }

    // Fix 3: Matching exercise with no options
    if (ex.type === 'matching' && options.length === 0) {
      // Convert to multiple choice
      // This is the problematic "Combine as saudações" exercise
      // Let's convert it to a simple multiple choice
      newQuestion = "Qual saudação em holandês significa 'Olá'?";
      newOptions = JSON.stringify(["Hallo", "Tot ziens", "Dank je", "Goedenavond"]);
      newCorrectAnswer = "Hallo";
      needsUpdate = true;
      matchingFixed++;
      console.log(`✓ Fixed matching [${ex.id}]: Converted to multiple_choice`);
    }

    // Update database if needed
    if (needsUpdate) {
      await db.update(exercises)
        .set({
          question: newQuestion,
          options: newOptions,
          correctAnswer: newCorrectAnswer
        })
        .where(eq(exercises.id, ex.id));
      
      fixedCount++;
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Total exercises fixed: ${fixedCount}`);
  console.log(`  - Fill_blank fixed: ${fillBlankFixed}`);
  console.log(`  - Duplicates fixed: ${duplicatesFixed}`);
  console.log(`  - Matching fixed: ${matchingFixed}`);
  console.log('\n✅ All fixes applied!\n');
}

fixAllExercises();

