import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, lessons } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function showExamples() {
  // Get all fill-blank exercises
  const fillBlankExercises = await db
    .select()
    .from(exercises)
    .where(eq(exercises.type, 'fill_blank'));

  // Get all lessons
  const allLessons = await db.select().from(lessons);
  const lessonMap = new Map(allLessons.map(l => [l.id, l]));

  console.log('='.repeat(80));
  console.log('EXEMPLOS DE EXERCÍCIOS FILL-BLANK');
  console.log('='.repeat(80));
  console.log('');
  console.log(`Mostrando 30 primeiros de ${fillBlankExercises.length} exercícios`);
  console.log('');

  fillBlankExercises.slice(0, 30).forEach((ex, index) => {
    const lesson = lessonMap.get(ex.lessonId!);
    let options: string[] = [];
    try {
      options = typeof ex.options === 'string' ? JSON.parse(ex.options) : ex.options || [];
    } catch (e) {
      options = [];
    }

    console.log(`${index + 1}. [${ex.id}]`);
    console.log(`   Lição: ${lesson?.title || 'Unknown'}`);
    console.log(`   Pergunta: "${ex.question}"`);
    console.log(`   Resposta Correta: "${ex.correctAnswer}"`);
    console.log(`   Opções: [${options.join(', ')}]`);
    if (ex.explanation) {
      console.log(`   Explicação: "${ex.explanation}"`);
    }
    console.log('');
  });

  process.exit(0);
}

showExamples().catch(console.error);

