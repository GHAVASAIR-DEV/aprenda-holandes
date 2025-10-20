import { drizzle } from 'drizzle-orm/mysql2';
import { vocabulary } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function checkVocabExamples() {
  console.log('=== CHECKING VOCABULARY EXAMPLE TRANSLATIONS ===\n');

  const allVocab = await db.select().from(vocabulary);
  const problems: Array<{id: string, dutch: string, issue: string}> = [];

  allVocab.forEach(v => {
    // Check if exampleSentence exists but has no translation
    if (v.exampleSentence) {
      const sentence = v.exampleSentence;
      
      // Check if there's a translation in parentheses
      const hasTranslation = sentence.includes('(') && sentence.includes(')');
      
      if (!hasTranslation) {
        problems.push({
          id: v.id,
          dutch: v.dutch,
          issue: `Example sentence without translation: "${sentence}"`
        });
      }
    }
  });

  console.log(`Total vocabulary checked: ${allVocab.length}`);
  console.log(`Vocabulary with missing example translations: ${problems.length}\n`);

  if (problems.length > 0) {
    console.log('First 20 examples:\n');
    problems.slice(0, 20).forEach((p, i) => {
      console.log(`${i + 1}. [${p.id}] ${p.dutch}`);
      console.log(`   ${p.issue}`);
      console.log('');
    });
  } else {
    console.log('✅ All vocabulary has proper example translations!\n');
  }

  // Save to file
  const fs = await import('fs/promises');
  await fs.writeFile(
    '/home/ubuntu/vocab-missing-translations.json',
    JSON.stringify(problems, null, 2)
  );
  console.log(`Full results saved to: /home/ubuntu/vocab-missing-translations.json\n`);
}

checkVocabExamples();

