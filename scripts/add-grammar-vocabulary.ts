import { drizzle } from 'drizzle-orm/mysql2';
import { vocabulary } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function addGrammarVocabulary() {
  console.log('=== ADDING VOCABULARY TO GRAMMAR LESSONS ===\n');

  const grammarVocab = [
    // Lesson 3.6: Formando Plurais
    { id: 'vocab-3-6-1', lessonId: 'lesson-3-6', dutch: 'het boek', portuguese: 'o livro', category: 'other' },
    { id: 'vocab-3-6-2', lessonId: 'lesson-3-6', dutch: 'de boeken', portuguese: 'os livros', category: 'other' },
    { id: 'vocab-3-6-3', lessonId: 'lesson-3-6', dutch: 'de auto', portuguese: 'o carro', category: 'other' },
    { id: 'vocab-3-6-4', lessonId: 'lesson-3-6', dutch: "de auto's", portuguese: 'os carros', category: 'other' },
    { id: 'vocab-3-6-5', lessonId: 'lesson-3-6', dutch: 'het kind', portuguese: 'a criança', category: 'family' },
    { id: 'vocab-3-6-6', lessonId: 'lesson-3-6', dutch: 'de kinderen', portuguese: 'as crianças', category: 'family' },
    
    // Lesson 4.6: Palavras Interrogativas
    { id: 'vocab-4-6-1', lessonId: 'lesson-4-6', dutch: 'wie', portuguese: 'quem', category: 'other' },
    { id: 'vocab-4-6-2', lessonId: 'lesson-4-6', dutch: 'wat', portuguese: 'o que', category: 'other' },
    { id: 'vocab-4-6-3', lessonId: 'lesson-4-6', dutch: 'waar', portuguese: 'onde', category: 'other' },
    { id: 'vocab-4-6-4', lessonId: 'lesson-4-6', dutch: 'wanneer', portuguese: 'quando', category: 'other' },
    { id: 'vocab-4-6-5', lessonId: 'lesson-4-6', dutch: 'waarom', portuguese: 'por que', category: 'other' },
    { id: 'vocab-4-6-6', lessonId: 'lesson-4-6', dutch: 'hoe', portuguese: 'como', category: 'other' },
    { id: 'vocab-4-6-7', lessonId: 'lesson-4-6', dutch: 'hoeveel', portuguese: 'quanto/quantos', category: 'other' },
    
    // Lesson 5.6: Negação (niet/geen)
    { id: 'vocab-5-6-1', lessonId: 'lesson-5-6', dutch: 'niet', portuguese: 'não (negação de verbo)', category: 'other' },
    { id: 'vocab-5-6-2', lessonId: 'lesson-5-6', dutch: 'geen', portuguese: 'nenhum/nenhuma', category: 'other' },
    { id: 'vocab-5-6-3', lessonId: 'lesson-5-6', dutch: 'nooit', portuguese: 'nunca', category: 'other' },
    { id: 'vocab-5-6-4', lessonId: 'lesson-5-6', dutch: 'niemand', portuguese: 'ninguém', category: 'other' },
    { id: 'vocab-5-6-5', lessonId: 'lesson-5-6', dutch: 'niets', portuguese: 'nada', category: 'other' },
    
    // Lesson 6.6: Preposições de Tempo e Lugar
    { id: 'vocab-6-6-1', lessonId: 'lesson-6-6', dutch: 'in', portuguese: 'em/dentro de', category: 'preposition' },
    { id: 'vocab-6-6-2', lessonId: 'lesson-6-6', dutch: 'op', portuguese: 'em/sobre', category: 'preposition' },
    { id: 'vocab-6-6-3', lessonId: 'lesson-6-6', dutch: 'bij', portuguese: 'perto de/em', category: 'preposition' },
    { id: 'vocab-6-6-4', lessonId: 'lesson-6-6', dutch: 'voor', portuguese: 'antes de/para', category: 'preposition' },
    { id: 'vocab-6-6-5', lessonId: 'lesson-6-6', dutch: 'na', portuguese: 'depois de', category: 'preposition' },
    { id: 'vocab-6-6-6', lessonId: 'lesson-6-6', dutch: 'onder', portuguese: 'embaixo de', category: 'preposition' },
    { id: 'vocab-6-6-7', lessonId: 'lesson-6-6', dutch: 'boven', portuguese: 'acima de', category: 'preposition' },
    
    // Lesson 7.6: Pronomes Demonstrativos
    { id: 'vocab-7-6-1', lessonId: 'lesson-7-6', dutch: 'dit', portuguese: 'isto/este/esta', category: 'pronoun' },
    { id: 'vocab-7-6-2', lessonId: 'lesson-7-6', dutch: 'dat', portuguese: 'isso/esse/essa/aquilo', category: 'pronoun' },
    { id: 'vocab-7-6-3', lessonId: 'lesson-7-6', dutch: 'deze', portuguese: 'estes/estas', category: 'pronoun' },
    { id: 'vocab-7-6-4', lessonId: 'lesson-7-6', dutch: 'die', portuguese: 'esses/essas/aqueles', category: 'pronoun' },
    { id: 'vocab-7-6-5', lessonId: 'lesson-7-6', dutch: 'hier', portuguese: 'aqui', category: 'other' },
    { id: 'vocab-7-6-6', lessonId: 'lesson-7-6', dutch: 'daar', portuguese: 'lá/ali', category: 'other' },
    
    // Lesson 8.6: Estrutura de Frases e Ordem das Palavras
    { id: 'vocab-8-6-1', lessonId: 'lesson-8-6', dutch: 'omdat', portuguese: 'porque', category: 'other' },
    { id: 'vocab-8-6-2', lessonId: 'lesson-8-6', dutch: 'want', portuguese: 'pois', category: 'other' },
    { id: 'vocab-8-6-3', lessonId: 'lesson-8-6', dutch: 'maar', portuguese: 'mas', category: 'other' },
    { id: 'vocab-8-6-4', lessonId: 'lesson-8-6', dutch: 'en', portuguese: 'e', category: 'other' },
    { id: 'vocab-8-6-5', lessonId: 'lesson-8-6', dutch: 'of', portuguese: 'ou', category: 'other' },
    { id: 'vocab-8-6-6', lessonId: 'lesson-8-6', dutch: 'dus', portuguese: 'então/portanto', category: 'other' },
  ];

  let added = 0;
  
  for (const vocab of grammarVocab) {
    try {
      await db.insert(vocabulary).values(vocab);
      added++;
      console.log(`✓ Added: ${vocab.dutch} → ${vocab.portuguese} (${vocab.lessonId})`);
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.log(`⚠ Skipped duplicate: ${vocab.dutch} (${vocab.lessonId})`);
      } else {
        console.error(`✗ Error adding ${vocab.dutch}:`, error.message);
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total vocabulary added: ${added}`);
  console.log(`✅ Grammar lessons now have vocabulary!\n`);
}

addGrammarVocabulary();

