import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function analyzeExercises() {
  const allExercises = await db.select().from(exercises);

  console.log(`=== ANALYZING ${allExercises.length} EXERCISES ===\n`);

  const errors: Array<{
    id: string;
    lesson: string;
    type: string;
    error: string;
    question: string;
    suggestion: string;
  }> = [];

  allExercises.forEach((ex) => {
    let options: string[] = [];
    try {
      // Options is always a string (JSON), need to parse it
      options = JSON.parse(ex.options || '[]');
      if (!Array.isArray(options)) {
        options = [];
      }
    } catch (e) {
      options = [];
    }
    
    // Check 1: Correct answer must be in options
    if (!options.includes(ex.correctAnswer)) {
      errors.push({
        id: ex.id,
        lesson: ex.lessonId,
        type: ex.type,
        error: 'RESPOSTA CORRETA NÃO ESTÁ NAS OPÇÕES',
        question: ex.question,
        suggestion: `Correct: "${ex.correctAnswer}" | Options: ${JSON.stringify(options)}`
      });
    }

    // Check 2: Options should have at least 2 items
    if (options.length < 2) {
      errors.push({
        id: ex.id,
        lesson: ex.lessonId,
        type: ex.type,
        error: 'MENOS DE 2 OPÇÕES',
        question: ex.question,
        suggestion: `Apenas ${options.length} opção(ões)`
      });
    }

    // Check 3: No duplicate options
    const uniqueOptions = [...new Set(options)];
    if (uniqueOptions.length !== options.length) {
      errors.push({
        id: ex.id,
        lesson: ex.lessonId,
        type: ex.type,
        error: 'OPÇÕES DUPLICADAS',
        question: ex.question,
        suggestion: `Options: ${JSON.stringify(options)}`
      });
    }

    // Check 4: Question should not be empty
    if (!ex.question || ex.question.trim() === '') {
      errors.push({
        id: ex.id,
        lesson: ex.lessonId,
        type: ex.type,
        error: 'PERGUNTA VAZIA',
        question: ex.question,
        suggestion: 'Adicionar texto da pergunta'
      });
    }

    // Check 5: Explanation should not be empty
    if (!ex.explanation || ex.explanation.trim() === '') {
      errors.push({
        id: ex.id,
        lesson: ex.lessonId,
        type: ex.type,
        error: 'EXPLICAÇÃO VAZIA',
        question: ex.question,
        suggestion: 'Adicionar explicação'
      });
    }

    // Check 6: For fill_blank, check if _____ is in question
    if (ex.type === 'fill_blank' && !ex.question.includes('_____')) {
      errors.push({
        id: ex.id,
        lesson: ex.lessonId,
        type: ex.type,
        error: 'FILL_BLANK SEM ESPAÇO EM BRANCO (_____)',
        question: ex.question,
        suggestion: 'Adicionar _____ na pergunta'
      });
    }
  });

  console.log(`\n=== RESUMO ===`);
  console.log(`Total de exercícios: ${allExercises.length}`);
  console.log(`Exercícios com erros: ${errors.length}`);
  console.log(`Taxa de erro: ${((errors.length / allExercises.length) * 100).toFixed(2)}%\n`);

  if (errors.length > 0) {
    console.log(`\n=== ERROS ENCONTRADOS (${errors.length}) ===\n`);
    
    // Group by error type
    const errorsByType: Record<string, number> = {};
    errors.forEach(e => {
      errorsByType[e.error] = (errorsByType[e.error] || 0) + 1;
    });

    console.log('Por tipo de erro:');
    Object.entries(errorsByType).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count}`);
    });

    console.log('\n=== DETALHES DOS ERROS ===\n');
    errors.slice(0, 20).forEach((err, i) => {
      console.log(`${i + 1}. [${err.lesson}] ${err.error}`);
      console.log(`   Question: ${err.question}`);
      console.log(`   ${err.suggestion}`);
      console.log('');
    });

    if (errors.length > 20) {
      console.log(`... e mais ${errors.length - 20} erros.\n`);
    }
  } else {
    console.log('✅ NENHUM ERRO ENCONTRADO!\n');
  }

  // Save errors to file
  if (errors.length > 0) {
    const fs = await import('fs/promises');
    await fs.writeFile(
      '/home/ubuntu/exercise-errors.json',
      JSON.stringify(errors, null, 2)
    );
    console.log('Erros salvos em: /home/ubuntu/exercise-errors.json\n');
  }
}

analyzeExercises();

