import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, lessons } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function analyzeFillBlank() {
  console.log('='.repeat(80));
  console.log('ANÁLISE DE EXERCÍCIOS FILL-BLANK');
  console.log('='.repeat(80));
  console.log('');

  // Get all fill-blank exercises
  const fillBlankExercises = await db
    .select()
    .from(exercises)
    .where(eq(exercises.type, 'fill_blank'));

  console.log(`Total de exercícios fill-blank: ${fillBlankExercises.length}`);
  console.log('');

  // Get all lessons for reference
  const allLessons = await db.select().from(lessons);
  const lessonMap = new Map(allLessons.map(l => [l.id, l]));

  let problemCount = 0;
  const problems: any[] = [];

  for (const ex of fillBlankExercises) {
    const lesson = lessonMap.get(ex.lessonId!);
    const lessonTitle = lesson?.title || 'Unknown';
    
    // Parse options
    let options: string[] = [];
    try {
      options = typeof ex.options === 'string' ? JSON.parse(ex.options) : ex.options || [];
    } catch (e) {
      options = [];
    }

    // Check for problems
    const issues: string[] = [];

    // 1. Check if question has blank marker
    if (!ex.question.includes('_____')) {
      issues.push('❌ Pergunta não tem marcador de lacuna (_____)');
    }

    // 2. Check if correct answer is in options
    if (options.length > 0 && !options.includes(ex.correctAnswer)) {
      issues.push('❌ Resposta correta não está nas opções');
    }

    // 3. Check if options are too similar
    if (options.length > 1) {
      const uniqueOptions = new Set(options.map(o => o.toLowerCase().trim()));
      if (uniqueOptions.size < options.length) {
        issues.push('⚠️  Opções duplicadas ou muito similares');
      }
    }

    // 4. Check if question makes sense (has context)
    const questionWithoutBlank = ex.question.replace(/_____/g, '').trim();
    if (questionWithoutBlank.length < 5) {
      issues.push('❌ Pergunta muito curta - falta contexto');
    }

    // 5. Check if it's just asking for translation (not contextual)
    if (ex.question.match(/^Complete:?\s*['"]?_____['"]?\s*$/i)) {
      issues.push('❌ Pergunta sem contexto - apenas "Complete: _____"');
    }

    // 6. Check if blank is at the beginning without context
    if (ex.question.trim().startsWith('_____') && questionWithoutBlank.length < 10) {
      issues.push('⚠️  Lacuna no início sem contexto suficiente');
    }

    if (issues.length > 0) {
      problemCount++;
      problems.push({
        id: ex.id,
        lessonId: ex.lessonId,
        lessonTitle,
        question: ex.question,
        correctAnswer: ex.correctAnswer,
        options,
        issues
      });
    }
  }

  console.log('='.repeat(80));
  console.log(`RESUMO: ${problemCount} exercícios com problemas de ${fillBlankExercises.length} (${Math.round(problemCount/fillBlankExercises.length*100)}%)`);
  console.log('='.repeat(80));
  console.log('');

  if (problems.length > 0) {
    console.log('EXERCÍCIOS PROBLEMÁTICOS:');
    console.log('');

    problems.forEach((p, index) => {
      console.log(`${index + 1}. ${p.id}`);
      console.log(`   Lição: ${p.lessonTitle}`);
      console.log(`   Pergunta: "${p.question}"`);
      console.log(`   Resposta: "${p.correctAnswer}"`);
      console.log(`   Opções: ${p.options.join(', ')}`);
      console.log(`   Problemas:`);
      p.issues.forEach((issue: string) => console.log(`      ${issue}`));
      console.log('');
    });
  }

  // Group by issue type
  console.log('='.repeat(80));
  console.log('PROBLEMAS POR TIPO:');
  console.log('='.repeat(80));
  console.log('');

  const issueTypes = new Map<string, number>();
  problems.forEach(p => {
    p.issues.forEach((issue: string) => {
      issueTypes.set(issue, (issueTypes.get(issue) || 0) + 1);
    });
  });

  Array.from(issueTypes.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([issue, count]) => {
      console.log(`${count}x - ${issue}`);
    });

  console.log('');
  console.log('='.repeat(80));
  
  process.exit(0);
}

analyzeFillBlank().catch(console.error);

