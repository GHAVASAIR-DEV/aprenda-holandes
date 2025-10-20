import { drizzle } from 'drizzle-orm/mysql2';
import { vocabulary } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { invokeLLM } from '../server/_core/llm';

const db = drizzle(process.env.DATABASE_URL!);

async function translateAllExamples() {
  console.log('=== TRANSLATING ALL DUTCH-ONLY EXAMPLE SENTENCES ===\n');

  const allVocab = await db.select().from(vocabulary);
  const needsTranslation: Array<{id: string, dutch: string, portuguese: string, example: string}> = [];

  // Find all examples that need translation
  allVocab.forEach(v => {
    if (v.example && v.example.trim().length > 0) {
      // Check if it already has translation in parentheses
      const hasTranslation = v.example.includes('(') && v.example.includes(')');
      
      if (!hasTranslation) {
        needsTranslation.push({
          id: v.id,
          dutch: v.dutch,
          portuguese: v.portuguese,
          example: v.example
        });
      }
    }
  });

  console.log(`Total vocabulary: ${allVocab.length}`);
  console.log(`Examples needing translation: ${needsTranslation.length}\n`);

  if (needsTranslation.length === 0) {
    console.log('✅ All examples already have translations!\n');
    return;
  }

  // Translate in batches using LLM
  console.log('Translating examples using LLM...\n');
  
  let fixed = 0;
  for (const item of needsTranslation) {
    try {
      // Use LLM to translate
      const response = await invokeLLM({
        messages: [
          {
            role: 'system',
            content: 'You are a Dutch to Portuguese translator. Translate the given Dutch sentence to Portuguese. Return ONLY the Portuguese translation, nothing else.'
          },
          {
            role: 'user',
            content: `Translate this Dutch sentence to Portuguese: "${item.example}"\n\nContext: The word "${item.dutch}" means "${item.portuguese}" in Portuguese.`
          }
        ]
      });

      const translation = response.choices[0].message.content.trim();
      const newExample = `${item.example} (${translation})`;

      // Update database
      await db.update(vocabulary)
        .set({ example: newExample })
        .where(eq(vocabulary.id, item.id));

      fixed++;
      if (fixed <= 20 || fixed % 50 === 0) {
        console.log(`✓ [${fixed}/${needsTranslation.length}] ${item.dutch}`);
        console.log(`  ${item.example} → ${newExample}`);
        console.log('');
      }

    } catch (error) {
      console.error(`✗ Failed to translate [${item.id}]: ${error}`);
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Examples translated: ${fixed}/${needsTranslation.length}`);
  console.log(`✅ Translation complete!\n`);
}

translateAllExamples();

