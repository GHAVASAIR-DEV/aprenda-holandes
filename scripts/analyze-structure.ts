import { getDb } from '../server/db';
import { modules, lessons } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const db = await getDb();
  if (!db) {
    console.log('Database not available');
    return;
  }
  
  const mods = await db.select().from(modules).orderBy(modules.orderIndex);
  
  console.log('📚 ESTRUTURA ATUAL DO CURSO A1\n');
  
  for (const m of mods) {
    const lsns = await db.select().from(lessons).where(eq(lessons.moduleId, m.id)).orderBy(lessons.orderIndex);
    console.log(`\n${m.title} (${m.id}):`);
    lsns.forEach(l => console.log(`  - ${l.title}`));
  }
}

main();

