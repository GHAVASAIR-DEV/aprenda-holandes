import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, lessons, vocabulary } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function findUntranslatedDutch() {
  console.log('=== FINDING UNTRANSLATED DUTCH WORDS ===\n');

  const allExercises = await db.select().from(exercises);
  const issues: Array<{id: string, word: string, context: string}> = [];

  allExercises.forEach(ex => {
    // Look for Dutch words in single quotes
    const matches = ex.explanation?.match(/'([^']+)'/g) || [];
    
    matches.forEach(match => {
      const word = match.replace(/'/g, '');
      
      // Check if it looks like Dutch
      const isDutch = word.match(/[ëïöü]/) || 
                     word.match(/^(de |het |een |ik |jij |hij |zij |wij |jullie )/) ||
                     word.match(/\b(zijn|hebben|gaan|doen|kunnen|willen|moeten|mogen)\b/);
      
      if (isDutch) {
        const index = ex.explanation!.indexOf(match);
        const before = ex.explanation!.substring(Math.max(0, index - 20), index);
        const after = ex.explanation!.substring(index + match.length, index + match.length + 30);
        
        // Check if there's a translation nearby (within 30 chars after)
        const hasTranslation = after.includes('(') && after.includes(')');
        
        if (!hasTranslation) {
          issues.push({
            id: ex.id,
            word: word,
            context: `...${before}${match}${after}...`
          });
        }
      }
    });
  });

  console.log(`Found ${issues.length} Dutch words without Portuguese translation\n`);

  if (issues.length > 0) {
    console.log('First 20 examples:\n');
    issues.slice(0, 20).forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.id}]`);
      console.log(`   Word: "${issue.word}"`);
      console.log(`   Context: ${issue.context}`);
      console.log('');
    });
  }

  // Save to file
  const fs = await import('fs/promises');
  await fs.writeFile(
    '/home/ubuntu/untranslated-dutch.json',
    JSON.stringify(issues, null, 2)
  );
  console.log(`Full results saved to: /home/ubuntu/untranslated-dutch.json\n`);
}

findUntranslatedDutch();

