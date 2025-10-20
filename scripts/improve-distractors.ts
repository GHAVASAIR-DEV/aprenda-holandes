import { drizzle } from 'drizzle-orm/mysql2';
import { exercises } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function improveDistractors() {
  console.log('Improving poor distractors in multiple choice exercises...\n');
  
  // Define exercises with poor distractors and their improved versions
  const improvements = [
    {
      id: 'ex-5-6-7',
      question: 'Quando usamos "niet"?',
      correctAnswer: 'Para negar verbos e adjetivos',
      oldOptions: ['Para negar verbos e adjetivos', 'Para negar substantivos', 'Sempre', 'Nunca'],
      newOptions: [
        'Para negar verbos e adjetivos',
        'Para negar substantivos',
        'Apenas em frases interrogativas',
        'Somente com verbos modais'
      ]
    },
    {
      id: 'ex-8-6-10',
      question: 'Parabéns! Você completou o nível A1! Qual é a próxima etapa?',
      correctAnswer: 'Continuar praticando e avançar para A2',
      oldOptions: ['Continuar praticando e avançar para A2', 'Desistir', 'Voltar ao início', 'Pular para C1'],
      newOptions: [
        'Continuar praticando e avançar para A2',
        'Revisar apenas os tópicos mais difíceis',
        'Começar a estudar outro idioma',
        'Focar apenas em conversação'
      ]
    },
    {
      id: 'ex-8-6-3',
      question: 'Como fazer uma pergunta sim/não?',
      correctAnswer: 'Inverter verbo e sujeito',
      oldOptions: ['Inverter verbo e sujeito', 'Adicionar palavra interrogativa', 'Mudar para SOV', 'Não mudar nada'],
      newOptions: [
        'Inverter verbo e sujeito',
        'Adicionar palavra interrogativa no início',
        'Usar apenas entonação ascendente',
        'Colocar o verbo no final da frase'
      ]
    },
    {
      id: 'ex-8-6-7',
      question: 'Onde fica o verbo em perguntas com palavra interrogativa?',
      correctAnswer: 'Depois da palavra interrogativa',
      oldOptions: ['Depois da palavra interrogativa', 'Antes da palavra interrogativa', 'No final', 'No meio'],
      newOptions: [
        'Depois da palavra interrogativa',
        'Antes da palavra interrogativa',
        'No final da frase',
        'Entre o sujeito e o objeto'
      ]
    }
  ];
  
  let successCount = 0;
  let notFoundCount = 0;
  
  for (const improvement of improvements) {
    try {
      const existing = await db.select().from(exercises).where(eq(exercises.id, improvement.id));
      
      if (existing.length > 0) {
        const ex = existing[0];
        
        // Update the options
        await db.update(exercises)
          .set({ 
            options: JSON.stringify(improvement.newOptions)
          })
          .where(eq(exercises.id, improvement.id));
        
        console.log(`✅ Updated: ${improvement.id}`);
        console.log(`   Question: "${improvement.question}"`);
        console.log(`   Old options: ${improvement.oldOptions.join(', ')}`);
        console.log(`   New options: ${improvement.newOptions.join(', ')}`);
        console.log('');
        
        successCount++;
      } else {
        console.log(`⚠️  Not found: ${improvement.id}`);
        notFoundCount++;
      }
    } catch (error) {
      console.error(`❌ Error updating ${improvement.id}:`, error);
    }
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('SUMMARY:');
  console.log(`✅ Successfully improved: ${successCount} exercises`);
  console.log(`⚠️  Not found: ${notFoundCount} exercises`);
  console.log('='.repeat(70));
  
  process.exit(0);
}

improveDistractors().catch(console.error);
