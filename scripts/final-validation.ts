import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, lessons, vocabulary, modules } from '../drizzle/schema';
import * as fs from 'fs';

const db = drizzle(process.env.DATABASE_URL!);

async function finalValidation() {
  console.log('=' .repeat(70));
  console.log('FINAL COURSE VALIDATION - CEFR A1 COMPLIANCE');
  console.log('='.repeat(70));
  console.log('');
  
  // Get all data
  const allModules = await db.select().from(modules);
  const allLessons = await db.select().from(lessons);
  const allExercises = await db.select().from(exercises);
  const allVocabulary = await db.select().from(vocabulary);
  
  console.log('📊 COURSE STATISTICS:');
  console.log('─'.repeat(70));
  console.log(`Modules: ${allModules.length}`);
  console.log(`Lessons: ${allLessons.length}`);
  console.log(`Exercises: ${allExercises.length}`);
  console.log(`Vocabulary words: ${allVocabulary.length}`);
  console.log('');
  
  // Exercise type breakdown
  const exercisesByType = allExercises.reduce((acc, ex) => {
    acc[ex.type] = (acc[ex.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('📝 EXERCISES BY TYPE:');
  console.log('─'.repeat(70));
  Object.entries(exercisesByType).forEach(([type, count]) => {
    console.log(`${type}: ${count}`);
  });
  console.log('');
  
  // Check for critical issues
  console.log('🔍 QUALITY CHECKS:');
  console.log('─'.repeat(70));
  
  let issueCount = 0;
  
  // Check 1: Duplicate questions
  const questionMap = new Map<string, string[]>();
  allExercises.forEach(ex => {
    const q = ex.question.trim().toLowerCase();
    if (!questionMap.has(q)) {
      questionMap.set(q, []);
    }
    questionMap.get(q)!.push(ex.id);
  });
  
  const duplicates = Array.from(questionMap.entries()).filter(([_, ids]) => ids.length > 1);
  
  if (duplicates.length === 0) {
    console.log('✅ No duplicate questions');
  } else {
    console.log(`❌ Found ${duplicates.length} duplicate questions`);
    issueCount += duplicates.length;
  }
  
  // Check 2: Empty questions or answers
  const emptyQuestions = allExercises.filter(ex => !ex.question.trim());
  const emptyAnswers = allExercises.filter(ex => ex.type !== 'matching' && !ex.correctAnswer?.trim());
  
  if (emptyQuestions.length === 0) {
    console.log('✅ No empty questions');
  } else {
    console.log(`❌ Found ${emptyQuestions.length} empty questions`);
    issueCount += emptyQuestions.length;
  }
  
  if (emptyAnswers.length === 0) {
    console.log('✅ No empty answers');
  } else {
    console.log(`❌ Found ${emptyAnswers.length} empty answers`);
    issueCount += emptyAnswers.length;
  }
  
  // Check 3: Fill-blank exercises without blanks
  const fillBlankWithoutBlanks = allExercises.filter(ex => 
    ex.type === 'fill_blank' && !ex.question.includes('_')
  );
  
  if (fillBlankWithoutBlanks.length === 0) {
    console.log('✅ All fill-blank exercises have blank markers');
  } else {
    console.log(`❌ Found ${fillBlankWithoutBlanks.length} fill-blank exercises without blanks`);
    issueCount += fillBlankWithoutBlanks.length;
  }
  
  // Check 4: Multiple choice with invalid options
  let mcIssues = 0;
  for (const ex of allExercises.filter(e => e.type === 'multiple_choice')) {
    let options = ex.options;
    if (typeof options === 'string') {
      try {
        options = JSON.parse(options);
      } catch (e) {
        mcIssues++;
        continue;
      }
    }
    
    if (!Array.isArray(options) || options.length < 2) {
      mcIssues++;
    } else if (!options.includes(ex.correctAnswer)) {
      mcIssues++;
    }
  }
  
  if (mcIssues === 0) {
    console.log('✅ All multiple choice exercises have valid options');
  } else {
    console.log(`❌ Found ${mcIssues} multiple choice exercises with invalid options`);
    issueCount += mcIssues;
  }
  
  console.log('');
  
  // CEFR A1 Compliance
  console.log('🎯 CEFR A1 COMPLIANCE:');
  console.log('─'.repeat(70));
  
  const a1Requirements = {
    vocabularyMin: 500,
    vocabularyMax: 2000,
    exercisesMin: 300,
    lessonsMin: 30
  };
  
  const vocabularyCount = allVocabulary.length;
  const exerciseCount = allExercises.length;
  const lessonCount = allLessons.length;
  
  console.log(`Vocabulary: ${vocabularyCount} words (Required: ${a1Requirements.vocabularyMin}-${a1Requirements.vocabularyMax})`);
  if (vocabularyCount >= a1Requirements.vocabularyMin && vocabularyCount <= a1Requirements.vocabularyMax) {
    console.log('  ✅ Within CEFR A1 range');
  } else if (vocabularyCount < a1Requirements.vocabularyMin) {
    console.log('  ⚠️  Below minimum requirement');
  } else {
    console.log('  ⚠️  Above maximum (may be A2 level)');
  }
  
  console.log(`Exercises: ${exerciseCount} (Recommended minimum: ${a1Requirements.exercisesMin})`);
  if (exerciseCount >= a1Requirements.exercisesMin) {
    console.log('  ✅ Meets recommendation');
  } else {
    console.log('  ⚠️  Below recommendation');
  }
  
  console.log(`Lessons: ${lessonCount} (Recommended minimum: ${a1Requirements.lessonsMin})`);
  if (lessonCount >= a1Requirements.lessonsMin) {
    console.log('  ✅ Meets recommendation');
  } else {
    console.log('  ⚠️  Below recommendation');
  }
  
  console.log('');
  
  // Final summary
  console.log('='.repeat(70));
  console.log('VALIDATION SUMMARY:');
  console.log('='.repeat(70));
  
  if (issueCount === 0) {
    console.log('✅ ALL QUALITY CHECKS PASSED!');
    console.log('✅ Course is ready for deployment');
  } else {
    console.log(`⚠️  Found ${issueCount} issues that need attention`);
  }
  
  console.log('');
  
  // Save validation report
  const report = {
    timestamp: new Date().toISOString(),
    statistics: {
      modules: allModules.length,
      lessons: allLessons.length,
      exercises: allExercises.length,
      vocabulary: allVocabulary.length,
      exercisesByType
    },
    qualityChecks: {
      duplicateQuestions: duplicates.length,
      emptyQuestions: emptyQuestions.length,
      emptyAnswers: emptyAnswers.length,
      fillBlankIssues: fillBlankWithoutBlanks.length,
      multipleChoiceIssues: mcIssues,
      totalIssues: issueCount
    },
    cefrCompliance: {
      vocabulary: {
        count: vocabularyCount,
        required: a1Requirements.vocabularyMin + '-' + a1Requirements.vocabularyMax,
        compliant: vocabularyCount >= a1Requirements.vocabularyMin && vocabularyCount <= a1Requirements.vocabularyMax
      },
      exercises: {
        count: exerciseCount,
        recommended: a1Requirements.exercisesMin,
        compliant: exerciseCount >= a1Requirements.exercisesMin
      },
      lessons: {
        count: lessonCount,
        recommended: a1Requirements.lessonsMin,
        compliant: lessonCount >= a1Requirements.lessonsMin
      }
    },
    readyForDeployment: issueCount === 0
  };
  
  fs.writeFileSync(
    '/home/ubuntu/final-validation-report.json',
    JSON.stringify(report, null, 2)
  );
  
  console.log('📄 Detailed report saved to: /home/ubuntu/final-validation-report.json');
  console.log('');
  
  process.exit(0);
}

finalValidation().catch(console.error);
