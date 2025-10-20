import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, vocabulary } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

// Common translations dictionary
const commonTranslations: Record<string, string> = {
  'zijn': 'ser/estar',
  'hebben': 'ter',
  'gaan': 'ir',
  'doen': 'fazer',
  'kunnen': 'poder/saber',
  'willen': 'querer',
  'moeten': 'dever/ter que',
  'mogen': 'poder (permissão)',
  'Brazilië': 'Brasil',
  'Nederland': 'Holanda/Países Baixos',
  'de week': 'a semana',
  'de kalender': 'o calendário',
  'de hulp': 'a ajuda',
  'de taal': 'a língua/idioma',
  'het boek': 'o livro',
  'het ding': 'a coisa',
  'het voorwerp': 'o objeto',
  'het zout': 'o sal',
  'het brood': 'o pão',
  'de auto': 'o carro',
  'het kind': 'a criança',
  'de kinderen': 'as crianças',
  'wie': 'quem',
  'wat': 'o que',
  'waar': 'onde',
  'wanneer': 'quando',
  'waarom': 'por que',
  'hoe': 'como',
  'hoeveel': 'quanto/quantos',
  'niet': 'não',
  'geen': 'nenhum/nenhuma',
  'nooit': 'nunca',
  'niemand': 'ninguém',
  'niets': 'nada',
  'in': 'em/dentro de',
  'op': 'em/sobre',
  'bij': 'perto de/em',
  'voor': 'antes de/para',
  'na': 'depois de',
  'onder': 'embaixo de',
  'boven': 'acima de',
  'dit': 'isto/este/esta',
  'dat': 'isso/esse/essa/aquilo',
  'deze': 'estes/estas',
  'die': 'esses/essas/aqueles',
  'hier': 'aqui',
  'daar': 'lá/ali',
  'omdat': 'porque',
  'want': 'pois',
  'maar': 'mas',
  'en': 'e',
  'of': 'ou',
  'dus': 'então/portanto'
};

async function addTranslationsToExplanations() {
  console.log('=== ADDING TRANSLATIONS TO EXERCISE EXPLANATIONS ===\n');

  // Load all vocabulary to build translation dictionary
  const allVocab = await db.select().from(vocabulary);
  const vocabDict: Record<string, string> = {};
  
  allVocab.forEach(v => {
    if (v.dutch && v.portuguese) {
      vocabDict[v.dutch.toLowerCase()] = v.portuguese;
    }
  });

  // Merge with common translations
  const fullDict = { ...vocabDict, ...commonTranslations };

  const allExercises = await db.select().from(exercises);
  let fixed = 0;

  for (const ex of allExercises) {
    if (!ex.explanation) continue;

    let newExplanation = ex.explanation;
    let changed = false;

    // Find all Dutch words in single quotes
    const matches = ex.explanation.match(/'([^']+)'/g) || [];

    for (const match of matches) {
      const word = match.replace(/'/g, '');
      const wordLower = word.toLowerCase();

      // Check if it's Dutch and needs translation
      const isDutch = word.match(/[ëïöü]/) || 
                     word.match(/^(de |het |een )/) ||
                     fullDict[wordLower];

      if (isDutch) {
        const index = newExplanation.indexOf(match);
        if (index === -1) continue;

        const after = newExplanation.substring(index + match.length, index + match.length + 30);

        // Check if translation already exists
        if (after.includes('(') && after.includes(')')) {
          continue; // Already has translation
        }

        // Find translation
        let translation = fullDict[wordLower];

        if (!translation) {
          // Try without article
          const withoutArticle = wordLower.replace(/^(de |het |een )/, '');
          translation = fullDict[withoutArticle];
        }

        if (translation) {
          // Add translation after the quoted word
          newExplanation = newExplanation.replace(
            match,
            `${match} (${translation})`
          );
          changed = true;
        }
      }
    }

    if (changed) {
      await db.update(exercises)
        .set({ explanation: newExplanation })
        .where(eq(exercises.id, ex.id));
      
      fixed++;
      if (fixed <= 10) {
        console.log(`✓ Fixed [${ex.id}]`);
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total exercises fixed: ${fixed}`);
  console.log(`✅ Translations added to explanations!\n`);
}

addTranslationsToExplanations();

