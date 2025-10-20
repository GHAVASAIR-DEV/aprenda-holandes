import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, lessons } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function deepAnalysis() {
  console.log('=== DEEP EXERCISE ANALYSIS ===\n');

  const allExercises = await db.select().from(exercises);
  const allLessons = await db.select().from(lessons);

  const problems = {
    duplicateQuestions: [] as Array<{lessonId: string, question: string, count: number}>,
    fillBlankWithoutBlanks: [] as Array<{id: string, lessonId: string, question: string}>,
    emptyOptions: [] as Array<{id: string, lessonId: string, question: string}>,
    wrongAnswerNotInOptions: [] as Array<{id: string, lessonId: string, question: string, answer: string, options: string[]}>,
    lessonsWith3OrFewerExercises: [] as Array<{lessonId: string, title: string, count: number}>,
    orderingIssues: [] as Array<{lessonId: string, issue: string}>
  };

  // Group by lesson
  const byLesson = new Map<string, typeof allExercises>();
  allExercises.forEach(ex => {
    if (!byLesson.has(ex.lessonId)) {
      byLesson.set(ex.lessonId, []);
    }
    byLesson.get(ex.lessonId)!.push(ex);
  });

  // Analyze each lesson
  for (const [lessonId, exercises] of byLesson.entries()) {
    const lesson = allLessons.find(l => l.id === lessonId);
    
    // Check for duplicate questions
    const questionCounts = new Map<string, number>();
    exercises.forEach(ex => {
      const q = ex.question.trim().toLowerCase();
      questionCounts.set(q, (questionCounts.get(q) || 0) + 1);
    });
    
    questionCounts.forEach((count, question) => {
      if (count > 1) {
        problems.duplicateQuestions.push({
          lessonId,
          question: question.substring(0, 60),
          count
        });
      }
    });

    // Check for lessons with too few exercises
    if (exercises.length <= 3) {
      problems.lessonsWith3OrFewerExercises.push({
        lessonId,
        title: lesson?.title || 'Unknown',
        count: exercises.length
      });
    }

    // Check ordering
    const orderIndices = exercises.map(e => parseInt(e.orderIndex)).sort((a, b) => a - b);
    const hasGaps = orderIndices.some((val, i) => i > 0 && val !== orderIndices[i-1] + 1);
    if (hasGaps || orderIndices[0] !== 1) {
      problems.orderingIssues.push({
        lessonId,
        issue: `Gaps or doesn't start at 1: ${orderIndices.join(', ')}`
      });
    }

    // Check each exercise
    exercises.forEach(ex => {
      // Fill blank without _____
      if (ex.type === 'fill_blank' && !ex.question.includes('_____')) {
        problems.fillBlankWithoutBlanks.push({
          id: ex.id,
          lessonId,
          question: ex.question.substring(0, 60)
        });
      }

      // Empty options
      try {
        const options = JSON.parse(ex.options || '[]');
        if (!options || options.length === 0) {
          problems.emptyOptions.push({
            id: ex.id,
            lessonId,
            question: ex.question.substring(0, 60)
          });
        }

        // Wrong answer not in options
        if (options.length > 0 && !options.includes(ex.correctAnswer)) {
          problems.wrongAnswerNotInOptions.push({
            id: ex.id,
            lessonId,
            question: ex.question.substring(0, 60),
            answer: ex.correctAnswer,
            options
          });
        }
      } catch (e) {
        problems.emptyOptions.push({
          id: ex.id,
          lessonId,
          question: ex.question.substring(0, 60)
        });
      }
    });
  }

  // Report
  console.log('📊 ANALYSIS RESULTS:\n');
  console.log(`Total exercises: ${allExercises.length}`);
  console.log(`Total lessons: ${allLessons.length}\n`);

  console.log(`🔴 Duplicate questions: ${problems.duplicateQuestions.length}`);
  console.log(`🔴 Fill_blank without _____: ${problems.fillBlankWithoutBlanks.length}`);
  console.log(`🔴 Empty options: ${problems.emptyOptions.length}`);
  console.log(`🔴 Wrong answer not in options: ${problems.wrongAnswerNotInOptions.length}`);
  console.log(`🟡 Lessons with ≤3 exercises: ${problems.lessonsWith3OrFewerExercises.length}`);
  console.log(`🟡 Ordering issues: ${problems.orderingIssues.length}\n`);

  // Save detailed report
  const fs = await import('fs/promises');
  await fs.writeFile(
    '/home/ubuntu/deep-exercise-analysis.json',
    JSON.stringify(problems, null, 2)
  );

  console.log('✅ Detailed report saved to: /home/ubuntu/deep-exercise-analysis.json\n');

  // Show samples
  if (problems.duplicateQuestions.length > 0) {
    console.log('\n🔴 SAMPLE DUPLICATE QUESTIONS:');
    problems.duplicateQuestions.slice(0, 5).forEach(p => {
      console.log(`  Lesson ${p.lessonId}: "${p.question}..." (${p.count}x)`);
    });
  }

  if (problems.fillBlankWithoutBlanks.length > 0) {
    console.log('\n🔴 SAMPLE FILL_BLANK WITHOUT _____:');
    problems.fillBlankWithoutBlanks.slice(0, 5).forEach(p => {
      console.log(`  [${p.id}] ${p.question}...`);
    });
  }
}

deepAnalysis();

