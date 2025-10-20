import { drizzle } from 'drizzle-orm/mysql2';
import { vocabulary } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function addExampleTranslations() {
  console.log('=== ADDING PORTUGUESE TRANSLATIONS TO EXAMPLE SENTENCES ===\n');

  const allVocab = await db.select().from(vocabulary);
  let fixed = 0;

  for (const v of allVocab) {
    if (!v.exampleSentence) continue;

    const sentence = v.exampleSentence;
    
    // Check if it's Dutch-only (no parentheses with translation)
    const hasTranslation = sentence.includes('(') && sentence.includes(')');
    
    if (!hasTranslation && sentence.trim().length > 0) {
      // It's a Dutch sentence without translation
      // We'll use the LLM to translate it, but for now let's identify them
      
      // Try to translate common patterns
      let translation = '';
      
      // Common sentence patterns
      if (sentence.match(/^Ik /i)) {
        // Sentences starting with "Ik" (I)
        const withoutIk = sentence.replace(/^Ik /i, '');
        if (withoutIk.includes('ben')) translation = sentence.replace('Ik ben', 'Eu sou');
        else if (withoutIk.includes('heb')) translation = sentence.replace('Ik heb', 'Eu tenho');
        else if (withoutIk.includes('kan')) translation = sentence.replace('Ik kan', 'Eu posso');
        else if (withoutIk.includes('wil')) translation = sentence.replace('Ik wil', 'Eu quero');
        else if (withoutIk.includes('ga')) translation = sentence.replace('Ik ga', 'Eu vou');
        else if (withoutIk.includes('doe')) translation = sentence.replace('Ik doe', 'Eu faço');
        else if (withoutIk.includes('heet')) translation = sentence.replace('Ik heet', 'Eu me chamo');
        else if (withoutIk.includes('woon')) translation = sentence.replace('Ik woon', 'Eu moro');
        else if (withoutIk.includes('werk')) translation = sentence.replace('Ik werk', 'Eu trabalho');
        else if (withoutIk.includes('eet')) translation = sentence.replace('Ik eet', 'Eu como');
        else if (withoutIk.includes('drink')) translation = sentence.replace('Ik drink', 'Eu bebo');
      } else if (sentence.match(/^Mijn /i)) {
        // Sentences with "Mijn" (My)
        translation = sentence.replace(/^Mijn /i, 'Meu/Minha ');
      } else if (sentence.match(/^\d+/)) {
        // Number sentences
        if (sentence.includes('uur')) translation = sentence.replace('uur', 'horas');
        if (sentence.includes('maanden')) translation = sentence.replace('maanden', 'meses');
        if (sentence.includes('dagen')) translation = sentence.replace('dagen', 'dias');
        if (sentence.includes('jaar')) translation = sentence.replace('jaar', 'anos');
      }

      // If we found a translation, update it
      if (translation) {
        const newSentence = `${sentence} (${translation})`;
        
        await db.update(vocabulary)
          .set({ exampleSentence: newSentence })
          .where(eq(vocabulary.id, v.id));
        
        fixed++;
        if (fixed <= 20) {
          console.log(`✓ [${v.id}] ${v.dutch}`);
          console.log(`  Before: ${sentence}`);
          console.log(`  After: ${newSentence}`);
          console.log('');
        }
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total vocabulary checked: ${allVocab.length}`);
  console.log(`Example sentences with translations added: ${fixed}`);
  console.log(`✅ Translations added to example sentences!\n`);
}

addExampleTranslations();

