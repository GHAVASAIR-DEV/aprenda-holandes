import { drizzle } from 'drizzle-orm/mysql2';
import { vocabulary, lessons, exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function findMissingTranslations() {
  console.log('=== FINDING MISSING PORTUGUESE TRANSLATIONS ===\n');

  const issues: string[] = [];

  // Check vocabulary
  console.log('📚 Checking Vocabulary...');
  const allVocab = await db.select().from(vocabulary);
  
  let vocabIssues = 0;
  allVocab.forEach(v => {
    if (!v.portuguese || v.portuguese.trim() === '') {
      issues.push(`VOCAB [${v.id}]: Dutch "${v.dutch}" has no Portuguese translation`);
      vocabIssues++;
    }
  });
  console.log(`  Found ${vocabIssues} vocabulary items without Portuguese translation\n`);

  // Check lessons
  console.log('📖 Checking Lessons...');
  const allLessons = await db.select().from(lessons);
  
  let lessonIssues = 0;
  allLessons.forEach(l => {
    // Check if content has untranslated Dutch words in examples
    if (l.content && l.content.includes('**') && !l.content.includes('(')) {
      // Might have Dutch words without translations
      const matches = l.content.match(/\*\*([^*]+)\*\*/g);
      if (matches) {
        matches.forEach(match => {
          const word = match.replace(/\*\*/g, '');
          // Check if it looks like Dutch (has 'de', 'het', or typical Dutch letters)
          if (word.match(/^(de |het |een )/i) || word.match(/[ëïöü]/)) {
            // Check if there's a translation nearby
            const index = l.content!.indexOf(match);
            const after = l.content!.substring(index, index + 100);
            if (!after.includes('(') || !after.includes(')')) {
              issues.push(`LESSON [${l.id}]: "${word}" in content might need translation`);
              lessonIssues++;
            }
          }
        });
      }
    }
  });
  console.log(`  Found ${lessonIssues} potential untranslated words in lesson content\n`);

  // Check exercises
  console.log('✏️ Checking Exercises...');
  const allExercises = await db.select().from(exercises);
  
  let exerciseIssues = 0;
  allExercises.forEach(ex => {
    // Check if question has Dutch words without translation
    if (ex.question.match(/[ëïöü]/) || ex.question.match(/\b(de|het|een|is|zijn|hebben)\b/)) {
      // Has Dutch words - check if there's a translation
      if (!ex.question.includes('(') && !ex.question.includes('?')) {
        issues.push(`EXERCISE [${ex.id}]: Question "${ex.question.substring(0, 50)}..." might have untranslated Dutch`);
        exerciseIssues++;
      }
    }
    
    // Check explanation
    if (ex.explanation && (ex.explanation.match(/[ëïöü]/) || ex.explanation.match(/\b(de|het|een|is|zijn|hebben)\b/))) {
      if (!ex.explanation.includes('(') || !ex.explanation.includes(')')) {
        issues.push(`EXERCISE [${ex.id}]: Explanation might have untranslated Dutch`);
        exerciseIssues++;
      }
    }
  });
  console.log(`  Found ${exerciseIssues} exercises with potentially untranslated Dutch\n`);

  // Summary
  console.log('=== SUMMARY ===');
  console.log(`Total issues found: ${issues.length}`);
  console.log(`  - Vocabulary: ${vocabIssues}`);
  console.log(`  - Lessons: ${lessonIssues}`);
  console.log(`  - Exercises: ${exerciseIssues}\n`);

  if (issues.length > 0) {
    console.log('First 20 issues:\n');
    issues.slice(0, 20).forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`);
    });
  }

  // Save to file
  const fs = await import('fs/promises');
  await fs.writeFile(
    '/home/ubuntu/missing-translations.json',
    JSON.stringify(issues, null, 2)
  );
  console.log(`\nFull results saved to: /home/ubuntu/missing-translations.json\n`);
}

findMissingTranslations();

