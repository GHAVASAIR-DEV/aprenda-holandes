import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function fixFillBlankExercises() {
  console.log('Corrigindo exercícios fill-blank para serem mais pedagógicos...\n');

  const fillBlankExercises = await db
    .select()
    .from(exercises)
    .where(eq(exercises.type, 'fill_blank'));

  let fixedCount = 0;

  for (const ex of fillBlankExercises) {
    let needsUpdate = false;
    let newQuestion = ex.question;
    let newExplanation = ex.explanation;

    // Pattern 1: "Complete: 'Dutch sentence' (Portuguese translation)"
    // Remove the Portuguese translation to test comprehension
    const pattern1 = /^Complete:\s*['"](.+?)['"]?\s*\((.+?)\)\.?$/;
    const match1 = ex.question.match(pattern1);
    
    if (match1) {
      const dutchSentence = match1[1];
      const portugueseTranslation = match1[2];
      
      // Only keep Dutch, move translation to explanation
      newQuestion = `Complete a frase em holandês: "${dutchSentence}"`;
      
      // Add translation to explanation
      if (!newExplanation?.includes(portugueseTranslation)) {
        newExplanation = `Tradução: "${portugueseTranslation}". ${newExplanation || ''}`.trim();
      }
      
      needsUpdate = true;
    }

    // Pattern 2: "Complete: 'Sentence with _____' (Translation)"
    // Similar fix
    const pattern2 = /^Complete:\s*['"]?(.+?)['"]?\s*\((.+?)\)\.?$/;
    const match2 = ex.question.match(pattern2);
    
    if (match2 && !match1) { // Don't match if already matched pattern1
      const sentence = match2[1];
      const translation = match2[2];
      
      newQuestion = `Complete a frase: "${sentence}"`;
      
      if (!newExplanation?.includes(translation)) {
        newExplanation = `Tradução: "${translation}". ${newExplanation || ''}`.trim();
      }
      
      needsUpdate = true;
    }

    if (needsUpdate) {
      await db
        .update(exercises)
        .set({
          question: newQuestion,
          explanation: newExplanation
        })
        .where(eq(exercises.id, ex.id));
      
      fixedCount++;
      console.log(`✓ Corrigido: ${ex.id}`);
      console.log(`  Antes: ${ex.question}`);
      console.log(`  Depois: ${newQuestion}`);
      console.log('');
    }
  }

  console.log(`\n✅ Total corrigido: ${fixedCount} de ${fillBlankExercises.length} exercícios`);
  process.exit(0);
}

fixFillBlankExercises().catch(console.error);

