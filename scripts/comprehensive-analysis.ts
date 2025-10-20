import { drizzle } from 'drizzle-orm/mysql2';
import { modules, lessons, vocabulary, exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

interface Issue {
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  item: string;
  problem: string;
  details: string;
}

async function comprehensiveAnalysis() {
  console.log('=== COMPREHENSIVE COURSE ANALYSIS ===\n');
  
  const issues: Issue[] = [];
  
  // Load all data
  const allModules = await db.select().from(modules);
  const allLessons = await db.select().from(lessons);
  const allVocabulary = await db.select().from(vocabulary);
  const allExercises = await db.select().from(exercises);
  
  console.log(`Analyzing ${allModules.length} modules, ${allLessons.length} lessons, ${allVocabulary.length} vocabulary words, ${allExercises.length} exercises...\n`);
  
  // ===== VOCABULARY ANALYSIS =====
  console.log('📚 Analyzing Vocabulary...');
  
  for (const vocab of allVocabulary) {
    // Check 1: Empty fields
    if (!vocab.dutch || vocab.dutch.trim() === '') {
      issues.push({
        category: 'VOCABULARY',
        severity: 'CRITICAL',
        item: vocab.id,
        problem: 'DUTCH WORD EMPTY',
        details: `Lesson: ${vocab.lessonId}`
      });
    }
    
    if (!vocab.portuguese || vocab.portuguese.trim() === '') {
      issues.push({
        category: 'VOCABULARY',
        severity: 'CRITICAL',
        item: vocab.id,
        problem: 'PORTUGUESE TRANSLATION EMPTY',
        details: `Dutch: ${vocab.dutch}`
      });
    }
    
    // Check 2: Dutch word should not contain Portuguese
    const portugueseWords = ['o', 'a', 'os', 'as', 'um', 'uma', 'de', 'da', 'do', 'para', 'com', 'em'];
    if (vocab.dutch && portugueseWords.some(pw => vocab.dutch.toLowerCase() === pw)) {
      issues.push({
        category: 'VOCABULARY',
        severity: 'HIGH',
        item: vocab.id,
        problem: 'DUTCH WORD LOOKS LIKE PORTUGUESE',
        details: `Dutch: "${vocab.dutch}" | Portuguese: "${vocab.portuguese}"`
      });
    }
    
    // Check 3: Portuguese translation should not be in Dutch
    if (vocab.portuguese && vocab.portuguese.match(/^[a-z]+$/i) && vocab.portuguese.length > 2) {
      const dutchCommonWords = ['de', 'het', 'een', 'is', 'zijn', 'hebben', 'van', 'en', 'in', 'op'];
      if (dutchCommonWords.includes(vocab.portuguese.toLowerCase())) {
        issues.push({
          category: 'VOCABULARY',
          severity: 'HIGH',
          item: vocab.id,
          problem: 'PORTUGUESE TRANSLATION LOOKS LIKE DUTCH',
          details: `Dutch: "${vocab.dutch}" | Portuguese: "${vocab.portuguese}"`
        });
      }
    }
    
    // Check 4: Duplicate vocabulary (same Dutch word in same lesson)
    const duplicates = allVocabulary.filter(v => 
      v.lessonId === vocab.lessonId && 
      v.dutch.toLowerCase() === vocab.dutch.toLowerCase() &&
      v.id !== vocab.id
    );
    
    if (duplicates.length > 0) {
      issues.push({
        category: 'VOCABULARY',
        severity: 'MEDIUM',
        item: vocab.id,
        problem: 'DUPLICATE WORD IN LESSON',
        details: `"${vocab.dutch}" appears ${duplicates.length + 1} times in ${vocab.lessonId}`
      });
    }
    
    // Check 5: Category should be valid
    const validCategories = ['greeting', 'number', 'color', 'food', 'family', 'profession', 'place', 'time', 'verb', 'adjective', 'pronoun', 'article', 'preposition', 'other'];
    if (vocab.category && !validCategories.includes(vocab.category)) {
      issues.push({
        category: 'VOCABULARY',
        severity: 'LOW',
        item: vocab.id,
        problem: 'INVALID CATEGORY',
        details: `Category: "${vocab.category}" | Word: "${vocab.dutch}"`
      });
    }
  }
  
  // ===== EXERCISE ANALYSIS =====
  console.log('✏️ Analyzing Exercises...');
  
  for (const ex of allExercises) {
    let options: string[] = [];
    try {
      options = JSON.parse(ex.options || '[]');
    } catch (e) {
      options = [];
    }
    
    // Check 1: Question/Answer language consistency
    // If question is in Portuguese, answer should be in Dutch (and vice versa)
    if (ex.question.match(/^(Como|Qual|O que|Onde|Quando|Por que)/)) {
      // Question is in Portuguese, check if answer is in Dutch
      const dutchPattern = /[ëïöüáéíóú]/i;
      if (!ex.correctAnswer.match(dutchPattern) && ex.correctAnswer.length > 3) {
        // Might be Portuguese answer to Portuguese question
        const portugueseWords = ['sim', 'não', 'talvez', 'obrigado', 'olá'];
        if (portugueseWords.some(pw => ex.correctAnswer.toLowerCase().includes(pw))) {
          issues.push({
            category: 'EXERCISE',
            severity: 'MEDIUM',
            item: ex.id,
            problem: 'PORTUGUESE QUESTION WITH PORTUGUESE ANSWER',
            details: `Q: "${ex.question.substring(0, 50)}..." | A: "${ex.correctAnswer}"`
          });
        }
      }
    }
    
    // Check 2: Options should be diverse
    if (options.length >= 2) {
      const lengths = options.map(o => o.length);
      const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
      const allSimilarLength = lengths.every(l => Math.abs(l - avgLength) < 3);
      
      if (allSimilarLength && options.length === 4) {
        // This is actually good - similar length options are harder
      }
    }
    
    // Check 3: Explanation should be helpful
    if (!ex.explanation || ex.explanation.length < 10) {
      issues.push({
        category: 'EXERCISE',
        severity: 'LOW',
        item: ex.id,
        problem: 'EXPLANATION TOO SHORT',
        details: `Explanation: "${ex.explanation}"`
      });
    }
  }
  
  // ===== LESSON ANALYSIS =====
  console.log('📖 Analyzing Lessons...');
  
  for (const lesson of allLessons) {
    // Check 1: Lesson should have vocabulary
    const vocabCount = allVocabulary.filter(v => v.lessonId === lesson.id).length;
    if (vocabCount === 0) {
      issues.push({
        category: 'LESSON',
        severity: 'HIGH',
        item: lesson.id,
        problem: 'NO VOCABULARY',
        details: `Lesson "${lesson.title}" has no vocabulary words`
      });
    }
    
    // Check 2: Lesson should have exercises
    const exerciseCount = allExercises.filter(e => e.lessonId === lesson.id).length;
    if (exerciseCount === 0) {
      issues.push({
        category: 'LESSON',
        severity: 'HIGH',
        item: lesson.id,
        problem: 'NO EXERCISES',
        details: `Lesson "${lesson.title}" has no exercises`
      });
    }
    
    // Check 3: Lesson should have content
    if (!lesson.content || lesson.content.length < 50) {
      issues.push({
        category: 'LESSON',
        severity: 'MEDIUM',
        item: lesson.id,
        problem: 'CONTENT TOO SHORT',
        details: `Lesson "${lesson.title}" has very little content`
      });
    }
  }
  
  // ===== MODULE ANALYSIS =====
  console.log('📦 Analyzing Modules...');
  
  for (const module of allModules) {
    // Check 1: Module should have lessons
    const lessonCount = allLessons.filter(l => l.moduleId === module.id).length;
    if (lessonCount === 0) {
      issues.push({
        category: 'MODULE',
        severity: 'CRITICAL',
        item: module.id,
        problem: 'NO LESSONS',
        details: `Module "${module.title}" has no lessons`
      });
    }
    
    // Check 2: Module order should be sequential
    const moduleNumber = parseInt(module.id.replace('mod-', ''));
    if (isNaN(moduleNumber)) {
      issues.push({
        category: 'MODULE',
        severity: 'LOW',
        item: module.id,
        problem: 'INVALID MODULE ID FORMAT',
        details: `Module ID: ${module.id}`
      });
    }
  }
  
  // ===== SUMMARY =====
  console.log('\n=== ANALYSIS COMPLETE ===\n');
  console.log(`Total issues found: ${issues.length}\n`);
  
  // Group by severity
  const critical = issues.filter(i => i.severity === 'CRITICAL');
  const high = issues.filter(i => i.severity === 'HIGH');
  const medium = issues.filter(i => i.severity === 'MEDIUM');
  const low = issues.filter(i => i.severity === 'LOW');
  
  console.log('By Severity:');
  console.log(`  🔴 CRITICAL: ${critical.length}`);
  console.log(`  🟠 HIGH: ${high.length}`);
  console.log(`  🟡 MEDIUM: ${medium.length}`);
  console.log(`  🟢 LOW: ${low.length}\n`);
  
  // Group by category
  const byCategory: Record<string, number> = {};
  issues.forEach(i => {
    byCategory[i.category] = (byCategory[i.category] || 0) + 1;
  });
  
  console.log('By Category:');
  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });
  
  // Show critical and high issues
  if (critical.length > 0) {
    console.log('\n🔴 CRITICAL ISSUES:\n');
    critical.slice(0, 10).forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.category}] ${issue.problem}`);
      console.log(`   Item: ${issue.item}`);
      console.log(`   ${issue.details}\n`);
    });
  }
  
  if (high.length > 0) {
    console.log('\n🟠 HIGH PRIORITY ISSUES:\n');
    high.slice(0, 10).forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.category}] ${issue.problem}`);
      console.log(`   Item: ${issue.item}`);
      console.log(`   ${issue.details}\n`);
    });
  }
  
  // Save to file
  const fs = await import('fs/promises');
  await fs.writeFile(
    '/home/ubuntu/comprehensive-analysis-results.json',
    JSON.stringify(issues, null, 2)
  );
  console.log('\nFull results saved to: /home/ubuntu/comprehensive-analysis-results.json\n');
}

comprehensiveAnalysis();

