import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, vocabulary } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

// Helper to get vocabulary for a lesson
async function getVocabForLesson(lessonId: string) {
  const vocab = await db.select().from(vocabulary).where((v) => v.lessonId === lessonId);
  return vocab;
}

async function recreateExercises() {
  console.log('=== RECREATING PROPER EXERCISES ===\n');

  const exercisesToCreate = [
    // Lesson 3-3 (Roupas)
    { lessonId: 'lesson-3-3', dutch: 'het shirt', portuguese: 'a camisa', distractors: ['a calça', 'o sapato', 'o chapéu'] },
    { lessonId: 'lesson-3-3', dutch: 'de broek', portuguese: 'a calça', distractors: ['a camisa', 'o sapato', 'o vestido'] },
    
    // Lesson 3-4 (Casa)
    { lessonId: 'lesson-3-4', dutch: 'het huis', portuguese: 'a casa', distractors: ['o quarto', 'a cozinha', 'o banheiro'] },
    { lessonId: 'lesson-3-4', dutch: 'de keuken', portuguese: 'a cozinha', distractors: ['o quarto', 'a sala', 'o banheiro'] },
    
    // Lesson 3-5 (Verbos regulares)
    { lessonId: 'lesson-3-5', dutch: 'werken', portuguese: 'trabalhar', distractors: ['morar', 'estudar', 'cozinhar'] },
    { lessonId: 'lesson-3-5', dutch: 'wonen', portuguese: 'morar', distractors: ['trabalhar', 'estudar', 'viajar'] },
    
    // Lesson 4-2 (Transporte)
    { lessonId: 'lesson-4-2', dutch: 'de trein', portuguese: 'o trem', distractors: ['o ônibus', 'o carro', 'a bicicleta'] },
    { lessonId: 'lesson-4-2', dutch: 'de bus', portuguese: 'o ônibus', distractors: ['o trem', 'o carro', 'o metrô'] },
    
    // Lesson 4-3 (Direções)
    { lessonId: 'lesson-4-3', dutch: 'links', portuguese: 'esquerda', distractors: ['direita', 'reto', 'atrás'] },
    { lessonId: 'lesson-4-3', dutch: 'rechts', portuguese: 'direita', distractors: ['esquerda', 'reto', 'atrás'] },
    
    // Lesson 4-4 (Supermercado)
    { lessonId: 'lesson-4-4', dutch: 'de supermarkt', portuguese: 'o supermercado', distractors: ['a loja', 'o mercado', 'a padaria'] },
    { lessonId: 'lesson-4-4', dutch: 'de winkel', portuguese: 'a loja', distractors: ['o supermercado', 'o mercado', 'a farmácia'] },
    
    // Lesson 4-5 (Números/Dinheiro)
    { lessonId: 'lesson-4-5', dutch: 'twintig', portuguese: 'vinte', distractors: ['dez', 'trinta', 'cinquenta'] },
    { lessonId: 'lesson-4-5', dutch: 'dertig', portuguese: 'trinta', distractors: ['vinte', 'quarenta', 'cinquenta'] },
    
    // Lesson 5-3 (Descrição física)
    { lessonId: 'lesson-5-3', dutch: 'groot', portuguese: 'grande/alto', distractors: ['pequeno', 'médio', 'baixo'] },
    { lessonId: 'lesson-5-3', dutch: 'klein', portuguese: 'pequeno/baixo', distractors: ['grande', 'médio', 'alto'] },
    
    // Lesson 5-4 (Personalidade)
    { lessonId: 'lesson-5-4', dutch: 'aardig', portuguese: 'simpático/legal', distractors: ['chato', 'sério', 'tímido'] },
    { lessonId: 'lesson-5-4', dutch: 'grappig', portuguese: 'engraçado', distractors: ['sério', 'chato', 'tímido'] },
    
    // Lesson 5-5 (Relacionamentos)
    { lessonId: 'lesson-5-5', dutch: 'de vriend', portuguese: 'o amigo/namorado', distractors: ['o irmão', 'o pai', 'o colega'] },
    { lessonId: 'lesson-5-5', dutch: 'de vriendin', portuguese: 'a amiga/namorada', distractors: ['a irmã', 'a mãe', 'a colega'] },
    
    // Lesson 6-3 (Clima)
    { lessonId: 'lesson-6-3', dutch: 'het weer', portuguese: 'o clima/tempo', distractors: ['o sol', 'a chuva', 'o vento'] },
    
    // Lesson 6-4 (Estações)
    { lessonId: 'lesson-6-4', dutch: 'de lente', portuguese: 'a primavera', distractors: ['o verão', 'o outono', 'o inverno'] },
    
    // Lesson 6-5 (Datas/Eventos)
    { lessonId: 'lesson-6-5', dutch: 'de verjaardag', portuguese: 'o aniversário', distractors: ['o casamento', 'a festa', 'o feriado'] },
    
    // Lesson 7-5 (Frequência)
    { lessonId: 'lesson-7-5', dutch: 'elke dag', portuguese: 'todo dia', distractors: ['toda semana', 'todo mês', 'todo ano'] },
  ];

  let created = 0;

  for (const ex of exercisesToCreate) {
    const id = `ex-${ex.lessonId}-proper-${created + 1}`;
    const options = [ex.portuguese, ...ex.distractors];
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    await db.insert(exercises).values({
      id,
      lessonId: ex.lessonId,
      type: 'multiple_choice',
      question: `Escolha a tradução correta de '${ex.dutch}'`,
      options: JSON.stringify(options),
      correctAnswer: ex.portuguese,
      explanation: `'${ex.dutch}' (${ex.portuguese}) significa '${ex.portuguese}' em português.`,
      orderIndex: 1
    });

    created++;
    if (created <= 10) {
      console.log(`✓ Created [${id}]: ${ex.dutch} → ${ex.portuguese}`);
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total exercises created: ${created}`);
  console.log(`✅ Proper exercises recreated!\n`);
}

recreateExercises();

