import { drizzle } from 'drizzle-orm/mysql2';
import { modules, lessons, exercises, vocabulary, users, userProgress } from '../drizzle/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function viewDatabase() {
  console.log('='.repeat(80));
  console.log('DATABASE OVERVIEW - Curso de Holandês A1');
  console.log('='.repeat(80));
  console.log('');

  // Get all data
  const allModules = await db.select().from(modules);
  const allLessons = await db.select().from(lessons);
  const allExercises = await db.select().from(exercises);
  const allVocabulary = await db.select().from(vocabulary);
  const allUsers = await db.select().from(users);
  const allProgress = await db.select().from(userProgress);

  // Statistics
  console.log('📊 STATISTICS:');
  console.log('-'.repeat(80));
  console.log(`Total Modules: ${allModules.length}`);
  console.log(`Total Lessons: ${allLessons.length}`);
  console.log(`Total Exercises: ${allExercises.length}`);
  console.log(`Total Vocabulary Words: ${allVocabulary.length}`);
  console.log(`Total Users: ${allUsers.length}`);
  console.log(`Total Progress Records: ${allProgress.length}`);
  console.log('');

  // Modules breakdown
  console.log('📚 MODULES:');
  console.log('-'.repeat(80));
  for (const module of allModules) {
    const moduleLessons = allLessons.filter(l => l.moduleId === module.id);
    console.log(`${module.id}: ${module.title} (${module.level})`);
    console.log(`   Description: ${module.description}`);
    console.log(`   Lessons: ${moduleLessons.length}`);
    console.log('');
  }

  // Exercise types
  console.log('📝 EXERCISE TYPES:');
  console.log('-'.repeat(80));
  const exerciseTypes = allExercises.reduce((acc, ex) => {
    acc[ex.type] = (acc[ex.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  Object.entries(exerciseTypes).forEach(([type, count]) => {
    console.log(`${type}: ${count}`);
  });
  console.log('');

  // Sample data
  console.log('🔍 SAMPLE DATA:');
  console.log('-'.repeat(80));
  
  console.log('\n📖 First 3 Lessons:');
  allLessons.slice(0, 3).forEach(lesson => {
    const lessonExercises = allExercises.filter(e => e.lessonId === lesson.id);
    const lessonVocab = allVocabulary.filter(v => v.lessonId === lesson.id);
    console.log(`\n${lesson.id}: ${lesson.title}`);
    console.log(`   Module: ${lesson.moduleId}`);
    console.log(`   Order: ${lesson.order}`);
    console.log(`   Exercises: ${lessonExercises.length}`);
    console.log(`   Vocabulary: ${lessonVocab.length}`);
  });

  console.log('\n\n📝 First 3 Exercises:');
  allExercises.slice(0, 3).forEach(ex => {
    console.log(`\n${ex.id}:`);
    console.log(`   Type: ${ex.type}`);
    console.log(`   Question: ${ex.question}`);
    console.log(`   Correct Answer: ${ex.correctAnswer}`);
    if (ex.options) {
      try {
        const opts = typeof ex.options === 'string' ? JSON.parse(ex.options) : ex.options;
        console.log(`   Options: ${opts.join(', ')}`);
      } catch (e) {
        console.log(`   Options: ${ex.options}`);
      }
    }
  });

  console.log('\n\n📚 First 5 Vocabulary Words:');
  allVocabulary.slice(0, 5).forEach(word => {
    console.log(`\n${word.dutch} (${word.pronunciation})`);
    console.log(`   Portuguese: ${word.portuguese}`);
    console.log(`   Category: ${word.category}`);
    if (word.example) {
      console.log(`   Example: ${word.example}`);
    }
  });

  // Users and Progress
  if (allUsers.length > 0) {
    console.log('\n\n👥 USERS:');
    console.log('-'.repeat(80));
    allUsers.forEach(user => {
      const userProgressRecords = allProgress.filter(p => p.userId === user.id);
      const completedLessons = userProgressRecords.filter(p => p.completed).length;
      console.log(`\n${user.name || user.email}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Completed Lessons: ${completedLessons}/${allLessons.length}`);
      console.log(`   Progress Records: ${userProgressRecords.length}`);
    });
  }

  console.log('\n');
  console.log('='.repeat(80));
  console.log('END OF DATABASE OVERVIEW');
  console.log('='.repeat(80));
  
  process.exit(0);
}

viewDatabase().catch(console.error);

