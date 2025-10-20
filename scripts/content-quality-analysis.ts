import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, lessons } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';

const db = drizzle(process.env.DATABASE_URL!);

interface ContentIssue {
  exerciseId: number;
  lessonSlug: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  issue: string;
  question: string;
  correctAnswer?: string;
  options?: any;
}

async function analyzeContentQuality() {
  console.log('Starting comprehensive content quality analysis...\n');
  
  const allExercises = await db.select().from(exercises);
  const allLessons = await db.select().from(lessons);
  
  const lessonMap = new Map(allLessons.map(l => [l.id, l.slug]));
  
  const issues: ContentIssue[] = [];
  let totalAnalyzed = 0;
  
  for (const ex of allExercises) {
    totalAnalyzed++;
    const lessonSlug = lessonMap.get(ex.lessonId) || 'unknown';
    
    // Parse options if string
    let options = ex.options;
    if (typeof options === 'string') {
      try {
        options = JSON.parse(options);
      } catch (e) {
        issues.push({
          exerciseId: ex.id,
          lessonSlug,
          type: ex.type,
          severity: 'critical',
          issue: 'Invalid JSON in options',
          question: ex.question
        });
        continue;
      }
    }
    
    // CONTENT QUALITY CHECKS
    
    // 1. Check for incomplete/nonsensical questions
    if (ex.question.includes('_____') && ex.question.trim().endsWith('_____')) {
      issues.push({
        exerciseId: ex.id,
        lessonSlug,
        type: ex.type,
        severity: 'critical',
        issue: 'Question ends with blank - incomplete phrase',
        question: ex.question,
        correctAnswer: ex.correctAnswer
      });
    }
    
    // 2. Check for too short/simple questions (less than 10 chars excluding blanks)
    const questionWithoutBlanks = ex.question.replace(/_+/g, '').trim();
    if (questionWithoutBlanks.length < 10 && ex.type !== 'matching') {
      issues.push({
        exerciseId: ex.id,
        lessonSlug,
        type: ex.type,
        severity: 'medium',
        issue: 'Question too short/simple',
        question: ex.question,
        correctAnswer: ex.correctAnswer
      });
    }
    
    // 3. Check for missing translations (Dutch text in Portuguese context)
    const dutchPattern = /\b(de|het|een|is|zijn|heeft|hebben|ik|jij|hij|zij|wij|jullie|naar|van|op|in)\b/i;
    if (ex.question.includes('Traduza:') || ex.question.includes('significa:')) {
      // These are translation exercises, Dutch is expected
    } else if (dutchPattern.test(ex.question) && !ex.question.includes('holandês')) {
      issues.push({
        exerciseId: ex.id,
        lessonSlug,
        type: ex.type,
        severity: 'high',
        issue: 'Possible untranslated Dutch in Portuguese question',
        question: ex.question,
        correctAnswer: ex.correctAnswer
      });
    }
    
    // 4. Check fill-in-the-blank specific issues
    if (ex.type === 'fill_blank') {
      if (!ex.question.includes('_')) {
        issues.push({
          exerciseId: ex.id,
          lessonSlug,
          type: ex.type,
          severity: 'critical',
          issue: 'Fill-blank exercise missing blank marker',
          question: ex.question,
          correctAnswer: ex.correctAnswer
        });
      }
      
      // Check if correct answer is too generic
      const genericAnswers = ['de', 'het', 'een', 'is', 'ben', 'zijn'];
      if (genericAnswers.includes(ex.correctAnswer?.toLowerCase() || '')) {
        // Check if question provides enough context
        if (questionWithoutBlanks.split(' ').length < 3) {
          issues.push({
            exerciseId: ex.id,
            lessonSlug,
            type: ex.type,
            severity: 'high',
            issue: 'Generic answer with insufficient context',
            question: ex.question,
            correctAnswer: ex.correctAnswer
          });
        }
      }
    }
    
    // 5. Check multiple choice specific issues
    if (ex.type === 'multiple_choice' && Array.isArray(options)) {
      // Check for duplicate options
      const uniqueOptions = new Set(options);
      if (uniqueOptions.size < options.length) {
        issues.push({
          exerciseId: ex.id,
          lessonSlug,
          type: ex.type,
          severity: 'high',
          issue: 'Duplicate options in multiple choice',
          question: ex.question,
          options
        });
      }
      
      // Check if correct answer is in options
      if (!options.includes(ex.correctAnswer)) {
        issues.push({
          exerciseId: ex.id,
          lessonSlug,
          type: ex.type,
          severity: 'critical',
          issue: 'Correct answer not in options',
          question: ex.question,
          correctAnswer: ex.correctAnswer,
          options
        });
      }
      
      // Check for too few options
      if (options.length < 3) {
        issues.push({
          exerciseId: ex.id,
          lessonSlug,
          type: ex.type,
          severity: 'medium',
          issue: 'Too few options (less than 3)',
          question: ex.question,
          options
        });
      }
      
      // Check for generic/placeholder options
      const genericOptions = ['Opção 1', 'Opção 2', 'Option', 'A', 'B', 'C'];
      const hasGeneric = options.some((opt: string) => 
        genericOptions.some(g => opt.includes(g))
      );
      if (hasGeneric) {
        issues.push({
          exerciseId: ex.id,
          lessonSlug,
          type: ex.type,
          severity: 'critical',
          issue: 'Generic/placeholder options detected',
          question: ex.question,
          options
        });
      }
    }
    
    // 6. Check matching exercises
    if (ex.type === 'matching') {
      if (!options || typeof options !== 'object') {
        issues.push({
          exerciseId: ex.id,
          lessonSlug,
          type: ex.type,
          severity: 'critical',
          issue: 'Invalid matching pairs structure',
          question: ex.question,
          options
        });
      } else {
        const pairs = Object.entries(options);
        if (pairs.length < 3) {
          issues.push({
            exerciseId: ex.id,
            lessonSlug,
            type: ex.type,
            severity: 'medium',
            issue: 'Too few matching pairs (less than 3)',
            question: ex.question,
            options
          });
        }
      }
    }
    
    // 7. Check for empty/whitespace-only content
    if (!ex.question.trim() || ex.question.trim() === '_____') {
      issues.push({
        exerciseId: ex.id,
        lessonSlug,
        type: ex.type,
        severity: 'critical',
        issue: 'Empty or whitespace-only question',
        question: ex.question,
        correctAnswer: ex.correctAnswer
      });
    }
    
    if (ex.type !== 'matching' && !ex.correctAnswer?.trim()) {
      issues.push({
        exerciseId: ex.id,
        lessonSlug,
        type: ex.type,
        severity: 'critical',
        issue: 'Empty or missing correct answer',
        question: ex.question,
        correctAnswer: ex.correctAnswer
      });
    }
  }
  
  // Generate report
  console.log(`\n=== CONTENT QUALITY ANALYSIS RESULTS ===`);
  console.log(`Total exercises analyzed: ${totalAnalyzed}`);
  console.log(`Total issues found: ${issues.length}`);
  console.log(`Exercises with issues: ${new Set(issues.map(i => i.exerciseId)).size}`);
  
  // Group by severity
  const bySeverity = {
    critical: issues.filter(i => i.severity === 'critical'),
    high: issues.filter(i => i.severity === 'high'),
    medium: issues.filter(i => i.severity === 'medium'),
    low: issues.filter(i => i.severity === 'low')
  };
  
  console.log(`\nBy Severity:`);
  console.log(`  Critical: ${bySeverity.critical.length}`);
  console.log(`  High: ${bySeverity.high.length}`);
  console.log(`  Medium: ${bySeverity.medium.length}`);
  console.log(`  Low: ${bySeverity.low.length}`);
  
  // Group by issue type
  const byIssueType = issues.reduce((acc, issue) => {
    acc[issue.issue] = (acc[issue.issue] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log(`\nBy Issue Type:`);
  Object.entries(byIssueType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([issue, count]) => {
      console.log(`  ${issue}: ${count}`);
    });
  
  // Group by lesson
  const byLesson = issues.reduce((acc, issue) => {
    acc[issue.lessonSlug] = (acc[issue.lessonSlug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log(`\nTop 10 Lessons with Most Issues:`);
  Object.entries(byLesson)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([lesson, count]) => {
      console.log(`  ${lesson}: ${count} issues`);
    });
  
  // Save detailed results
  const output = {
    summary: {
      totalExercises: totalAnalyzed,
      totalIssues: issues.length,
      exercisesWithIssues: new Set(issues.map(i => i.exerciseId)).size,
      bySeverity: {
        critical: bySeverity.critical.length,
        high: bySeverity.high.length,
        medium: bySeverity.medium.length,
        low: bySeverity.low.length
      },
      byIssueType,
      byLesson
    },
    issues: issues.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    })
  };
  
  fs.writeFileSync(
    '/home/ubuntu/content-quality-analysis.json',
    JSON.stringify(output, null, 2)
  );
  
  console.log(`\nDetailed results saved to: /home/ubuntu/content-quality-analysis.json`);
  
  // Show sample critical issues
  console.log(`\n=== SAMPLE CRITICAL ISSUES ===`);
  bySeverity.critical.slice(0, 10).forEach((issue, idx) => {
    console.log(`\n${idx + 1}. Lesson: ${issue.lessonSlug}`);
    console.log(`   Type: ${issue.type}`);
    console.log(`   Issue: ${issue.issue}`);
    console.log(`   Question: "${issue.question}"`);
    if (issue.correctAnswer) console.log(`   Answer: "${issue.correctAnswer}"`);
    if (issue.options) console.log(`   Options:`, issue.options);
  });
  
  process.exit(0);
}

analyzeContentQuality().catch(console.error);
