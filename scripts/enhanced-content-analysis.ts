import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, lessons } from '../drizzle/schema';
import * as fs from 'fs';

const db = drizzle(process.env.DATABASE_URL!);

interface DetailedIssue {
  exerciseId: string;
  lessonId: string;
  lessonTitle: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  issue: string;
  question: string;
  correctAnswer?: string;
  options?: any;
  recommendation: string;
}

async function enhancedAnalysis() {
  console.log('Starting enhanced content quality analysis...\n');
  
  const allExercises = await db.select().from(exercises);
  const allLessons = await db.select().from(lessons);
  
  const lessonMap = new Map(allLessons.map(l => [l.id, { title: l.title, slug: l.id }]));
  
  const issues: DetailedIssue[] = [];
  const goodExamples: any[] = [];
  
  for (const ex of allExercises) {
    const lesson = lessonMap.get(ex.lessonId);
    const lessonTitle = lesson?.title || 'Unknown Lesson';
    
    let options = ex.options;
    if (typeof options === 'string') {
      try {
        options = JSON.parse(options);
      } catch (e) {
        issues.push({
          exerciseId: ex.id,
          lessonId: ex.lessonId,
          lessonTitle,
          type: ex.type,
          severity: 'critical',
          category: 'Technical Error',
          issue: 'Invalid JSON in options',
          question: ex.question,
          recommendation: 'Fix JSON formatting'
        });
        continue;
      }
    }
    
    // CATEGORY 1: INCOMPLETE OR NONSENSICAL CONTENT
    
    // Check for incomplete fill-blank at end
    if (ex.type === 'fill_blank' && ex.question.trim().endsWith('_____')) {
      issues.push({
        exerciseId: ex.id,
        lessonId: ex.lessonId,
        lessonTitle,
        type: ex.type,
        severity: 'critical',
        category: 'Incomplete Content',
        issue: 'Fill-blank ends with blank - incomplete phrase',
        question: ex.question,
        correctAnswer: ex.correctAnswer,
        recommendation: 'Complete the sentence or restructure the exercise'
      });
    }
    
    // Check for very short questions (likely incomplete)
    const questionText = ex.question.replace(/_+/g, '').replace(/\s+/g, ' ').trim();
    if (questionText.length < 15 && ex.type !== 'matching') {
      issues.push({
        exerciseId: ex.id,
        lessonId: ex.lessonId,
        lessonTitle,
        type: ex.type,
        severity: 'high',
        category: 'Incomplete Content',
        issue: 'Question too short - may lack context',
        question: ex.question,
        correctAnswer: ex.correctAnswer,
        recommendation: 'Add more context to make the exercise meaningful'
      });
    }
    
    // CATEGORY 2: TRANSLATION ISSUES
    
    // Check for common Dutch words in Portuguese instructions
    const dutchCommonWords = ['de', 'het', 'een', 'is', 'zijn', 'ben', 'heeft', 'hebben'];
    const questionLower = ex.question.toLowerCase();
    
    // But exclude legitimate cases
    const isTranslationExercise = ex.question.includes('Traduza') || 
                                   ex.question.includes('significa') ||
                                   ex.question.includes('holandês') ||
                                   ex.question.includes('em português');
    
    if (!isTranslationExercise) {
      const foundDutch = dutchCommonWords.filter(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(questionLower);
      });
      
      if (foundDutch.length > 0) {
        // Check if it's in quotes (which is OK)
        const hasQuotes = ex.question.includes('"') || ex.question.includes("'");
        if (!hasQuotes) {
          issues.push({
            exerciseId: ex.id,
            lessonId: ex.lessonId,
            lessonTitle,
            type: ex.type,
            severity: 'medium',
            category: 'Translation Issue',
            issue: `Possible untranslated Dutch: ${foundDutch.join(', ')}`,
            question: ex.question,
            correctAnswer: ex.correctAnswer,
            recommendation: 'Verify if Dutch words should be translated or in quotes'
          });
        }
      }
    }
    
    // CATEGORY 3: MULTIPLE CHOICE QUALITY
    
    if (ex.type === 'multiple_choice' && Array.isArray(options)) {
      // Check for too obvious/simple answers
      if (options.length === 4) {
        const obviousWrong = ['Não existe', 'Impossível', 'Nunca', 'Desistir', 'Voltar ao início', 'Pular para C1'];
        const hasObvious = options.some((opt: string) => 
          obviousWrong.some(wrong => opt.includes(wrong))
        );
        
        if (hasObvious) {
          issues.push({
            exerciseId: ex.id,
            lessonId: ex.lessonId,
            lessonTitle,
            type: ex.type,
            severity: 'medium',
            category: 'Poor Distractors',
            issue: 'Contains obviously wrong answer options',
            question: ex.question,
            options,
            recommendation: 'Replace with plausible distractors that test understanding'
          });
        }
      }
      
      // Check for duplicate options
      const uniqueOpts = new Set(options);
      if (uniqueOpts.size < options.length) {
        issues.push({
          exerciseId: ex.id,
          lessonId: ex.lessonId,
          lessonTitle,
          type: ex.type,
          severity: 'critical',
          category: 'Duplicate Content',
          issue: 'Duplicate options in multiple choice',
          question: ex.question,
          options,
          recommendation: 'Remove duplicate options'
        });
      }
      
      // Check if correct answer is in options
      if (!options.includes(ex.correctAnswer)) {
        issues.push({
          exerciseId: ex.id,
          lessonId: ex.lessonId,
          lessonTitle,
          type: ex.type,
          severity: 'critical',
          category: 'Technical Error',
          issue: 'Correct answer not in options',
          question: ex.question,
          correctAnswer: ex.correctAnswer,
          options,
          recommendation: 'Add correct answer to options or fix correctAnswer field'
        });
      }
      
      // Check for very similar options (poor distractors)
      if (options.length >= 3) {
        const allShort = options.every((opt: string) => opt.length < 10);
        const allSimilar = options.every((opt: string) => {
          const words = opt.split(' ');
          return words.length <= 2;
        });
        
        if (allShort && allSimilar) {
          issues.push({
            exerciseId: ex.id,
            lessonId: ex.lessonId,
            lessonTitle,
            type: ex.type,
            severity: 'low',
            category: 'Poor Distractors',
            issue: 'All options are very short/similar',
            question: ex.question,
            options,
            recommendation: 'Consider adding more varied distractors'
          });
        }
      }
    }
    
    // CATEGORY 4: FILL-IN-THE-BLANK QUALITY
    
    if (ex.type === 'fill_blank') {
      if (!ex.question.includes('_')) {
        issues.push({
          exerciseId: ex.id,
          lessonId: ex.lessonId,
          lessonTitle,
          type: ex.type,
          severity: 'critical',
          category: 'Technical Error',
          issue: 'Fill-blank missing blank marker (_)',
          question: ex.question,
          correctAnswer: ex.correctAnswer,
          recommendation: 'Add blank marker where answer should go'
        });
      }
      
      // Check for ambiguous blanks (too many possible answers)
      const veryGenericAnswers = ['de', 'het', 'een', 'is', 'ben'];
      if (veryGenericAnswers.includes(ex.correctAnswer?.toLowerCase() || '')) {
        const contextWords = questionText.split(' ').filter(w => w.length > 2);
        if (contextWords.length < 4) {
          issues.push({
            exerciseId: ex.id,
            lessonId: ex.lessonId,
            lessonTitle,
            type: ex.type,
            severity: 'high',
            category: 'Ambiguous Exercise',
            issue: 'Generic answer with insufficient context',
            question: ex.question,
            correctAnswer: ex.correctAnswer,
            recommendation: 'Add more context to make the answer unambiguous'
          });
        }
      }
    }
    
    // CATEGORY 5: EMPTY/MISSING CONTENT
    
    if (!ex.question.trim() || ex.question.trim() === '_____') {
      issues.push({
        exerciseId: ex.id,
        lessonId: ex.lessonId,
        lessonTitle,
        type: ex.type,
        severity: 'critical',
        category: 'Missing Content',
        issue: 'Empty or whitespace-only question',
        question: ex.question,
        correctAnswer: ex.correctAnswer,
        recommendation: 'Add proper question content'
      });
    }
    
    if (ex.type !== 'matching' && !ex.correctAnswer?.trim()) {
      issues.push({
        exerciseId: ex.id,
        lessonId: ex.lessonId,
        lessonTitle,
        type: ex.type,
        severity: 'critical',
        category: 'Missing Content',
        issue: 'Empty or missing correct answer',
        question: ex.question,
        correctAnswer: ex.correctAnswer,
        recommendation: 'Add correct answer'
      });
    }
    
    // Collect good examples (no issues found)
    if (issues.filter(i => i.exerciseId === ex.id).length === 0) {
      if (ex.type === 'fill_blank' || ex.type === 'multiple_choice') {
        goodExamples.push({
          id: ex.id,
          lesson: lessonTitle,
          type: ex.type,
          question: ex.question,
          answer: ex.correctAnswer,
          options: ex.type === 'multiple_choice' ? options : undefined
        });
      }
    }
  }
  
  // Generate comprehensive report
  console.log(`\n${'='.repeat(60)}`);
  console.log('ENHANCED CONTENT QUALITY ANALYSIS');
  console.log('='.repeat(60));
  
  console.log(`\nTotal exercises analyzed: ${allExercises.length}`);
  console.log(`Total issues found: ${issues.length}`);
  console.log(`Exercises with issues: ${new Set(issues.map(i => i.exerciseId)).size}`);
  console.log(`Clean exercises: ${allExercises.length - new Set(issues.map(i => i.exerciseId)).size}`);
  
  // By severity
  const bySeverity = {
    critical: issues.filter(i => i.severity === 'critical'),
    high: issues.filter(i => i.severity === 'high'),
    medium: issues.filter(i => i.severity === 'medium'),
    low: issues.filter(i => i.severity === 'low')
  };
  
  console.log(`\n${'─'.repeat(60)}`);
  console.log('BY SEVERITY:');
  console.log(`  🔴 Critical: ${bySeverity.critical.length} (must fix)`);
  console.log(`  🟠 High: ${bySeverity.high.length} (should fix)`);
  console.log(`  🟡 Medium: ${bySeverity.medium.length} (nice to fix)`);
  console.log(`  🟢 Low: ${bySeverity.low.length} (optional)`);
  
  // By category
  const byCategory = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log(`\n${'─'.repeat(60)}`);
  console.log('BY CATEGORY:');
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
  
  // By lesson
  const byLesson = issues.reduce((acc, issue) => {
    const key = `${issue.lessonId} - ${issue.lessonTitle}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log(`\n${'─'.repeat(60)}`);
  console.log('TOP 15 LESSONS WITH MOST ISSUES:');
  Object.entries(byLesson)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .forEach(([lesson, count], idx) => {
      console.log(`  ${idx + 1}. ${lesson}: ${count} issues`);
    });
  
  // Save detailed results
  const output = {
    summary: {
      totalExercises: allExercises.length,
      totalIssues: issues.length,
      exercisesWithIssues: new Set(issues.map(i => i.exerciseId)).size,
      cleanExercises: allExercises.length - new Set(issues.map(i => i.exerciseId)).size,
      bySeverity: {
        critical: bySeverity.critical.length,
        high: bySeverity.high.length,
        medium: bySeverity.medium.length,
        low: bySeverity.low.length
      },
      byCategory,
      topLessonsWithIssues: Object.entries(byLesson)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([lesson, count]) => ({ lesson, count }))
    },
    issues: issues.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
    goodExamples: goodExamples.slice(0, 20)
  };
  
  fs.writeFileSync(
    '/home/ubuntu/enhanced-content-analysis.json',
    JSON.stringify(output, null, 2)
  );
  
  console.log(`\n${'─'.repeat(60)}`);
  console.log('Detailed results saved to: /home/ubuntu/enhanced-content-analysis.json');
  
  // Show critical issues
  console.log(`\n${'='.repeat(60)}`);
  console.log('CRITICAL ISSUES (Sample):');
  console.log('='.repeat(60));
  bySeverity.critical.slice(0, 15).forEach((issue, idx) => {
    console.log(`\n${idx + 1}. [${issue.category}] ${issue.lessonTitle}`);
    console.log(`   Exercise: ${issue.exerciseId}`);
    console.log(`   Issue: ${issue.issue}`);
    console.log(`   Question: "${issue.question}"`);
    if (issue.correctAnswer) console.log(`   Answer: "${issue.correctAnswer}"`);
    if (issue.options) console.log(`   Options:`, issue.options);
    console.log(`   → ${issue.recommendation}`);
  });
  
  // Show high priority issues
  console.log(`\n${'='.repeat(60)}`);
  console.log('HIGH PRIORITY ISSUES (Sample):');
  console.log('='.repeat(60));
  bySeverity.high.slice(0, 10).forEach((issue, idx) => {
    console.log(`\n${idx + 1}. [${issue.category}] ${issue.lessonTitle}`);
    console.log(`   Exercise: ${issue.exerciseId}`);
    console.log(`   Issue: ${issue.issue}`);
    console.log(`   Question: "${issue.question}"`);
    if (issue.correctAnswer) console.log(`   Answer: "${issue.correctAnswer}"`);
    console.log(`   → ${issue.recommendation}`);
  });
  
  process.exit(0);
}

enhancedAnalysis().catch(console.error);
