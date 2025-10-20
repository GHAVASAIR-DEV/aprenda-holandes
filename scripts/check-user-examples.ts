import { drizzle } from 'drizzle-orm/mysql2';
import { exercises, lessons } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function checkUserExamples() {
  console.log('Checking exercises from user screenshots:\n');
  console.log('='.repeat(70));
  
  // Get all exercises from lesson 1-1, 2-1, 3-1 (the ones user showed)
  const lesson11 = await db.select().from(lessons).where(eq(lessons.id, 'lesson-1-1'));
  const lesson21 = await db.select().from(lessons).where(eq(lessons.id, 'lesson-2-1'));
  const lesson31 = await db.select().from(lessons).where(eq(lessons.id, 'lesson-3-1'));
  
  const lessonsToCheck = ['lesson-1-1', 'lesson-2-1', 'lesson-3-1'];
  
  for (const lessonId of lessonsToCheck) {
    const lessonData = await db.select().from(lessons).where(eq(lessons.id, lessonId));
    if (lessonData.length === 0) continue;
    
    console.log(`\n📚 ${lessonData[0].title}`);
    console.log('─'.repeat(70));
    
    const exs = await db.select().from(exercises).where(eq(exercises.lessonId, lessonId));
    
    // Focus on fill_blank exercises (the problematic ones)
    const fillBlanks = exs.filter(e => e.type === 'fill_blank');
    
    console.log(`Total exercises: ${exs.length}`);
    console.log(`Fill-blank exercises: ${fillBlanks.length}\n`);
    
    fillBlanks.forEach((ex, idx) => {
      console.log(`${idx + 1}. ID: ${ex.id}`);
      console.log(`   Question: "${ex.question}"`);
      console.log(`   Answer: "${ex.correctAnswer}"`);
      
      // Check for issues
      const issues = [];
      
      if (ex.question.trim().endsWith('_____')) {
        issues.push('⚠️  Ends with blank (incomplete)');
      }
      
      const questionText = ex.question.replace(/_+/g, '').trim();
      if (questionText.length < 15) {
        issues.push('⚠️  Very short question (lacks context)');
      }
      
      if (!ex.question.includes('_')) {
        issues.push('🔴 Missing blank marker');
      }
      
      if (issues.length > 0) {
        console.log(`   Issues: ${issues.join(', ')}`);
      } else {
        console.log(`   ✅ Looks good`);
      }
      console.log('');
    });
  }
  
  // Also check for duplicate questions
  console.log('\n' + '='.repeat(70));
  console.log('CHECKING FOR DUPLICATE QUESTIONS');
  console.log('='.repeat(70));
  
  const allExs = await db.select().from(exercises);
  const questionMap = new Map<string, string[]>();
  
  allExs.forEach(ex => {
    const q = ex.question.trim().toLowerCase();
    if (!questionMap.has(q)) {
      questionMap.set(q, []);
    }
    questionMap.get(q)!.push(ex.id);
  });
  
  const duplicates = Array.from(questionMap.entries()).filter(([_, ids]) => ids.length > 1);
  
  if (duplicates.length > 0) {
    console.log(`\nFound ${duplicates.length} duplicate questions:\n`);
    duplicates.slice(0, 10).forEach(([question, ids]) => {
      console.log(`Question: "${question.substring(0, 60)}..."`);
      console.log(`Appears in: ${ids.join(', ')}`);
      console.log('');
    });
  } else {
    console.log('\n✅ No duplicate questions found!');
  }
  
  process.exit(0);
}

checkUserExamples().catch(console.error);
