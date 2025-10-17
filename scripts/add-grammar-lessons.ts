import { getDb } from '../server/db';
import { lessons, exercises, vocabulary } from '../drizzle/schema';

async function main() {
  const db = await getDb();
  if (!db) {
    console.log('Database not available');
    return;
  }

  console.log('🎓 Adicionando 7 lições de gramática...\n');

  // LIÇÃO 2.6: Artigos 'de' e 'het'
  await db.insert(lessons).values({
    id: 'lesson-2-6',
    moduleId: 'mod-2',
    title: 'Lição 2.6: Artigos "de" e "het"',
    description: 'Aprenda a diferença entre os artigos holandeses',
    content: JSON.stringify({
      sections: [
        {
          type: 'intro',
          content: 'Em holandês, existem dois artigos definidos: "de" e "het". Saber qual usar é fundamental!'
        },
        {
          type: 'table',
          title: 'Os Dois Artigos',
          headers: ['Artigo', 'Tipo', 'Exemplo', 'Tradução'],
          rows: [
            ['de', 'comum (2/3 das palavras)', 'de tafel', 'a mesa'],
            ['het', 'neutro (1/3 das palavras)', 'het huis', 'a casa'],
            ['de', 'plural (sempre)', 'de tafels', 'as mesas']
          ]
        },
        {
          type: 'phrases',
          title: 'Regras Básicas',
          items: [
            { dutch: 'de man', pronunciation: 'de man', portuguese: 'o homem (comum)' },
            { dutch: 'de vrouw', pronunciation: 'de frou', portuguese: 'a mulher (comum)' },
            { dutch: 'het kind', pronunciation: 'het kint', portuguese: 'a criança (neutro)' },
            { dutch: 'het boek', pronunciation: 'het búk', portuguese: 'o livro (neutro)' },
            { dutch: 'de kinderen', pronunciation: 'de kínderen', portuguese: 'as crianças (plural sempre "de")' }
          ]
        }
      ]
    }),
    orderIndex: '06',
    createdAt: new Date()
  });

  // Vocabulário para lição 2.6
  const vocab26 = [
    { dutch: 'de tafel', pronunciation: 'de táfel', portuguese: 'a mesa', example: 'De tafel is groot.' },
    { dutch: 'het huis', pronunciation: 'het ruis', portuguese: 'a casa', example: 'Het huis is mooi.' },
    { dutch: 'de man', pronunciation: 'de man', portuguese: 'o homem', example: 'De man loopt.' },
    { dutch: 'het kind', pronunciation: 'het kint', portuguese: 'a criança', example: 'Het kind speelt.' }
  ];

  for (const v of vocab26) {
    await db.insert(vocabulary).values({
      id: `vocab-2-6-${vocab26.indexOf(v) + 1}`,
      lessonId: 'lesson-2-6',
      dutch: v.dutch,
      pronunciation: v.pronunciation,
      portuguese: v.portuguese,
      example: v.example,
      createdAt: new Date()
    });
  }

  // Exercícios para lição 2.6
  const exercises26 = [
    {
      id: 'ex-2-6-1',
      type: 'multiple_choice',
      question: 'Qual artigo usar: "_____ tafel" (a mesa)?',
      options: '["de","het","een","geen"]',
      correctAnswer: 'de',
      explanation: '"Tafel" é uma palavra comum, então usa "de".'
    },
    {
      id: 'ex-2-6-2',
      type: 'multiple_choice',
      question: 'Qual artigo usar: "_____ huis" (a casa)?',
      options: '["de","het","een","geen"]',
      correctAnswer: 'het',
      explanation: '"Huis" é uma palavra neutra, então usa "het".'
    },
    {
      id: 'ex-2-6-3',
      type: 'fill_blank',
      question: 'Complete: "_____ man loopt." (O homem anda.)',
      options: '["De","Het","Een","Die"]',
      correctAnswer: 'De',
      explanation: '"Man" é comum, usa "de".'
    },
    {
      id: 'ex-2-6-4',
      type: 'fill_blank',
      question: 'Complete: "_____ kind speelt." (A criança brinca.)',
      options: '["De","Het","Een","Dit"]',
      correctAnswer: 'Het',
      explanation: '"Kind" é neutro, usa "het".'
    },
    {
      id: 'ex-2-6-5',
      type: 'multiple_choice',
      question: 'Qual artigo usar no plural: "_____ huizen" (as casas)?',
      options: '["de","het","een","geen"]',
      correctAnswer: 'de',
      explanation: 'Todas as palavras no plural usam "de".'
    },
    {
      id: 'ex-2-6-6',
      type: 'multiple_choice',
      question: 'Qual artigo: "_____ boek" (o livro)?',
      options: '["de","het","een","geen"]',
      correctAnswer: 'het',
      explanation: '"Boek" é neutro.'
    },
    {
      id: 'ex-2-6-7',
      type: 'fill_blank',
      question: 'Complete: "_____ vrouw zingt." (A mulher canta.)',
      options: '["De","Het","Een","Die"]',
      correctAnswer: 'De',
      explanation: '"Vrouw" é comum.'
    },
    {
      id: 'ex-2-6-8',
      type: 'multiple_choice',
      question: 'Quantas palavras holandesas usam "de"?',
      options: '["Cerca de 1/3","Cerca de 2/3","Todas","Metade"]',
      correctAnswer: 'Cerca de 2/3',
      explanation: 'Aproximadamente 2/3 das palavras usam "de".'
    },
    {
      id: 'ex-2-6-9',
      type: 'fill_blank',
      question: 'Complete: "_____ kinderen spelen." (As crianças brincam.)',
      options: '["De","Het","Een","Die"]',
      correctAnswer: 'De',
      explanation: 'Plural sempre usa "de".'
    },
    {
      id: 'ex-2-6-10',
      type: 'multiple_choice',
      question: 'Qual artigo: "_____ water" (a água)?',
      options: '["de","het","een","geen"]',
      correctAnswer: 'het',
      explanation: '"Water" é neutro.'
    }
  ];

  for (const ex of exercises26) {
    await db.insert(exercises).values({
      ...ex,
      lessonId: 'lesson-2-6',
      orderIndex: String(exercises26.indexOf(ex) + 1).padStart(2, '0'),
      audioUrl: null,
      createdAt: new Date()
    });
  }

  console.log('✅ Lição 2.6: Artigos "de" e "het" - 10 exercícios');

  // LIÇÃO 3.6: Formando Plurais
  await db.insert(lessons).values({
    id: 'lesson-3-6',
    moduleId: 'mod-3',
    title: 'Lição 3.6: Formando Plurais',
    description: 'Aprenda as regras para formar o plural em holandês',
    content: JSON.stringify({
      sections: [
        {
          type: 'intro',
          content: 'Em holandês, existem duas formas principais de formar o plural: adicionar "-en" ou "-s".'
        },
        {
          type: 'table',
          title: 'Regras de Plural',
          headers: ['Terminação', 'Regra', 'Exemplo', 'Plural'],
          rows: [
            ['Maioria', 'Adicionar -en', 'de tafel', 'de tafels → de tafelen'],
            ['Vogal longa + consoante', 'Adicionar -en', 'de boom', 'de bomen'],
            ['-e, -el, -en, -er', 'Adicionar -s', 'de tafel', 'de tafels'],
            ['Palavras curtas', 'Adicionar -s', 'de auto', "de auto's"]
          ]
        },
        {
          type: 'phrases',
          title: 'Exemplos Práticos',
          items: [
            { dutch: 'de kat → de katten', pronunciation: 'de kat → de káten', portuguese: 'o gato → os gatos' },
            { dutch: 'het boek → de boeken', pronunciation: 'het búk → de búken', portuguese: 'o livro → os livros' },
            { dutch: 'de tafel → de tafels', pronunciation: 'de táfel → de táfels', portuguese: 'a mesa → as mesas' },
            { dutch: 'de auto → de autos', pronunciation: 'de óto → de ótos', portuguese: 'o carro → os carros' }
          ]
        }
      ]
    }),
    orderIndex: '06',
    createdAt: new Date()
  });

  // Exercícios para lição 3.6
  const exercises36 = [
    {
      id: 'ex-3-6-1',
      type: 'multiple_choice',
      question: 'Qual é o plural de "de kat" (o gato)?',
      options: '["de kats","de katten","de kattes","de katen"]',
      correctAnswer: 'de katten',
      explanation: 'Adiciona-se "-en" à maioria das palavras.'
    },
    {
      id: 'ex-3-6-2',
      type: 'fill_blank',
      question: 'Complete: "het boek" → "de _____" (os livros)',
      options: '["boeks","boeken","boekken","bookes"]',
      correctAnswer: 'boeken',
      explanation: '"Boek" vira "boeken" no plural.'
    },
    {
      id: 'ex-3-6-3',
      type: 'multiple_choice',
      question: 'Qual é o plural de "de tafel" (a mesa)?',
      options: '["de tafelen","de tafels","de tafeles","de tafelens"]',
      correctAnswer: 'de tafels',
      explanation: 'Palavras terminadas em "-el" geralmente adicionam "-s".'
    },
    {
      id: 'ex-3-6-4',
      type: 'fill_blank',
      question: 'Complete: "de hond" → "de _____" (os cachorros)',
      options: '["honds","honden","hondes","hondden"]',
      correctAnswer: 'honden',
      explanation: 'Adiciona-se "-en".'
    },
    {
      id: 'ex-3-6-5',
      type: 'multiple_choice',
      question: 'Qual é o plural de "de auto" (o carro)?',
      options: '["de autos","de autoen","de autoes","de autten"]',
      correctAnswer: 'de autos',
      explanation: 'Palavras curtas geralmente adicionam "-s".'
    },
    {
      id: 'ex-3-6-6',
      type: 'fill_blank',
      question: 'Complete: "het kind" → "de _____" (as crianças)',
      options: '["kinds","kinden","kinderen","kindes"]',
      correctAnswer: 'kinderen',
      explanation: '"Kind" é irregular e vira "kinderen".'
    },
    {
      id: 'ex-3-6-7',
      type: 'multiple_choice',
      question: 'Qual artigo sempre usamos no plural?',
      options: '["de","het","een","geen"]',
      correctAnswer: 'de',
      explanation: 'Todas as palavras no plural usam "de".'
    },
    {
      id: 'ex-3-6-8',
      type: 'fill_blank',
      question: 'Complete: "de stoel" → "de _____" (as cadeiras)',
      options: '["stoels","stoelen","stoeles","stoelens"]',
      correctAnswer: 'stoelen',
      explanation: 'Adiciona-se "-en".'
    },
    {
      id: 'ex-3-6-9',
      type: 'multiple_choice',
      question: 'Qual é o plural de "de fiets" (a bicicleta)?',
      options: '["de fietsen","de fietss","de fietses","de fietsens"]',
      correctAnswer: 'de fietsen',
      explanation: 'Adiciona-se "-en".'
    },
    {
      id: 'ex-3-6-10',
      type: 'fill_blank',
      question: 'Complete: "het huis" → "de _____" (as casas)',
      options: '["huiss","huizen","huises","huisens"]',
      correctAnswer: 'huizen',
      explanation: '"Huis" vira "huizen" no plural.'
    }
  ];

  for (const ex of exercises36) {
    await db.insert(exercises).values({
      ...ex,
      lessonId: 'lesson-3-6',
      orderIndex: String(exercises36.indexOf(ex) + 1).padStart(2, '0'),
      audioUrl: null,
      createdAt: new Date()
    });
  }

  console.log('✅ Lição 3.6: Formando Plurais - 10 exercícios');

  // LIÇÃO 4.6: Palavras Interrogativas
  await db.insert(lessons).values({
    id: 'lesson-4-6',
    moduleId: 'mod-4',
    title: 'Lição 4.6: Palavras Interrogativas',
    description: 'Aprenda a fazer perguntas em holandês',
    content: JSON.stringify({
      sections: [
        {
          type: 'intro',
          content: 'Para fazer perguntas em holandês, usamos palavras interrogativas específicas e invertemos o sujeito e o verbo.'
        },
        {
          type: 'table',
          title: 'Palavras Interrogativas',
          headers: ['Holandês', 'Português', 'Exemplo', 'Tradução'],
          rows: [
            ['Wat', 'O que', 'Wat is dat?', 'O que é isso?'],
            ['Wie', 'Quem', 'Wie ben jij?', 'Quem é você?'],
            ['Waar', 'Onde', 'Waar woon je?', 'Onde você mora?'],
            ['Wanneer', 'Quando', 'Wanneer kom je?', 'Quando você vem?'],
            ['Waarom', 'Por que', 'Waarom niet?', 'Por que não?'],
            ['Hoe', 'Como', 'Hoe heet je?', 'Como você se chama?'],
            ['Hoeveel', 'Quanto(s)', 'Hoeveel kost het?', 'Quanto custa?']
          ]
        },
        {
          type: 'phrases',
          title: 'Estrutura de Perguntas',
          items: [
            { dutch: 'Waar is het station?', pronunciation: 'vár is het státion?', portuguese: 'Onde fica a estação?' },
            { dutch: 'Hoe laat is het?', pronunciation: 'rú lát is het?', portuguese: 'Que horas são?' },
            { dutch: 'Wat wil je eten?', pronunciation: 'vat vil ie éten?', portuguese: 'O que você quer comer?' },
            { dutch: 'Wie is dat?', pronunciation: 'ví is dat?', portuguese: 'Quem é esse?' }
          ]
        }
      ]
    }),
    orderIndex: '06',
    createdAt: new Date()
  });

  // Exercícios para lição 4.6
  const exercises46 = [
    {
      id: 'ex-4-6-1',
      type: 'fill_blank',
      question: 'Complete: "_____ is dat?" (O que é isso?)',
      options: '["Wat","Wie","Waar","Wanneer"]',
      correctAnswer: 'Wat',
      explanation: '"Wat" significa "o que".'
    },
    {
      id: 'ex-4-6-2',
      type: 'fill_blank',
      question: 'Complete: "_____ ben jij?" (Quem é você?)',
      options: '["Wat","Wie","Waar","Hoe"]',
      correctAnswer: 'Wie',
      explanation: '"Wie" significa "quem".'
    },
    {
      id: 'ex-4-6-3',
      type: 'multiple_choice',
      question: 'Como perguntar "Onde você mora?"',
      options: '["Waar woon je?","Wat woon je?","Wie woon je?","Hoe woon je?"]',
      correctAnswer: 'Waar woon je?',
      explanation: '"Waar" significa "onde".'
    },
    {
      id: 'ex-4-6-4',
      type: 'fill_blank',
      question: 'Complete: "_____ kom je?" (Quando você vem?)',
      options: '["Wanneer","Waar","Wat","Wie"]',
      correctAnswer: 'Wanneer',
      explanation: '"Wanneer" significa "quando".'
    },
    {
      id: 'ex-4-6-5',
      type: 'multiple_choice',
      question: 'Qual palavra usar para "Por que?"',
      options: '["Waarom","Waar","Wanneer","Wat"]',
      correctAnswer: 'Waarom',
      explanation: '"Waarom" significa "por que".'
    },
    {
      id: 'ex-4-6-6',
      type: 'fill_blank',
      question: 'Complete: "_____ heet je?" (Como você se chama?)',
      options: '["Hoe","Wat","Wie","Waar"]',
      correctAnswer: 'Hoe',
      explanation: '"Hoe" significa "como".'
    },
    {
      id: 'ex-4-6-7',
      type: 'multiple_choice',
      question: 'Como perguntar "Quanto custa?"',
      options: '["Hoeveel kost het?","Hoe kost het?","Wat kost het?","Waar kost het?"]',
      correctAnswer: 'Hoeveel kost het?',
      explanation: '"Hoeveel" significa "quanto(s)".'
    },
    {
      id: 'ex-4-6-8',
      type: 'fill_blank',
      question: 'Complete: "_____ laat is het?" (Que horas são?)',
      options: '["Hoe","Wat","Wanneer","Hoeveel"]',
      correctAnswer: 'Hoe',
      explanation: '"Hoe laat" significa "que horas".'
    },
    {
      id: 'ex-4-6-9',
      type: 'multiple_choice',
      question: 'Qual a ordem correta em perguntas?',
      options: '["Palavra interrogativa + verbo + sujeito","Sujeito + verbo + palavra interrogativa","Verbo + palavra interrogativa + sujeito","Palavra interrogativa + sujeito + verbo"]',
      correctAnswer: 'Palavra interrogativa + verbo + sujeito',
      explanation: 'Em perguntas, o verbo vem antes do sujeito (inversão).'
    },
    {
      id: 'ex-4-6-10',
      type: 'fill_blank',
      question: 'Complete: "_____ wil je eten?" (O que você quer comer?)',
      options: '["Wat","Wie","Waar","Hoe"]',
      correctAnswer: 'Wat',
      explanation: '"Wat" significa "o que".'
    }
  ];

  for (const ex of exercises46) {
    await db.insert(exercises).values({
      ...ex,
      lessonId: 'lesson-4-6',
      orderIndex: String(exercises46.indexOf(ex) + 1).padStart(2, '0'),
      audioUrl: null,
      createdAt: new Date()
    });
  }

  console.log('✅ Lição 4.6: Palavras Interrogativas - 10 exercícios');

  // Continue with remaining lessons...
  console.log('\n📊 Progresso: 3 de 7 lições criadas');
  console.log('⏳ Criando lições 5.6, 6.6, 7.6, 8.6...\n');

  // LIÇÃO 5.6: Negação (niet/geen)
  await db.insert(lessons).values({
    id: 'lesson-5-6',
    moduleId: 'mod-5',
    title: 'Lição 5.6: Negação (niet/geen)',
    description: 'Aprenda a negar frases em holandês',
    content: JSON.stringify({
      sections: [
        {
          type: 'intro',
          content: 'Em holandês, usamos "niet" e "geen" para negar. A escolha depende do que estamos negando.'
        },
        {
          type: 'table',
          title: 'Niet vs Geen',
          headers: ['Palavra', 'Uso', 'Exemplo', 'Tradução'],
          rows: [
            ['niet', 'Nega verbos, adjetivos, advérbios', 'Ik werk niet.', 'Eu não trabalho.'],
            ['niet', 'Com artigos definidos (de/het)', 'Dat is niet de auto.', 'Esse não é o carro.'],
            ['geen', 'Nega substantivos com "een"', 'Ik heb geen auto.', 'Eu não tenho carro.'],
            ['geen', 'Nega substantivos sem artigo', 'Ik drink geen koffie.', 'Eu não bebo café.']
          ]
        },
        {
          type: 'phrases',
          title: 'Exemplos Práticos',
          items: [
            { dutch: 'Ik ben niet moe.', pronunciation: 'ik ben nít mú', portuguese: 'Eu não estou cansado.' },
            { dutch: 'Ik heb geen tijd.', pronunciation: 'ik hep rêin teit', portuguese: 'Eu não tenho tempo.' },
            { dutch: 'Dit is niet goed.', pronunciation: 'dit is nít rúd', portuguese: 'Isso não é bom.' },
            { dutch: 'Hij heeft geen geld.', pronunciation: 'hei héft rêin relt', portuguese: 'Ele não tem dinheiro.' }
          ]
        }
      ]
    }),
    orderIndex: '06',
    createdAt: new Date()
  });

  // Exercícios para lição 5.6
  const exercises56 = [
    {
      id: 'ex-5-6-1',
      type: 'fill_blank',
      question: 'Complete: "Ik werk _____." (Eu não trabalho.)',
      options: '["niet","geen","nooit","nee"]',
      correctAnswer: 'niet',
      explanation: 'Usamos "niet" para negar verbos.'
    },
    {
      id: 'ex-5-6-2',
      type: 'fill_blank',
      question: 'Complete: "Ik heb _____ auto." (Eu não tenho carro.)',
      options: '["niet","geen","nooit","nee"]',
      correctAnswer: 'geen',
      explanation: 'Usamos "geen" para negar substantivos com "een".'
    },
    {
      id: 'ex-5-6-3',
      type: 'multiple_choice',
      question: 'Como dizer "Eu não estou cansado"?',
      options: '["Ik ben niet moe.","Ik ben geen moe.","Ik niet ben moe.","Ik geen ben moe."]',
      correctAnswer: 'Ik ben niet moe.',
      explanation: 'Usamos "niet" para negar adjetivos.'
    },
    {
      id: 'ex-5-6-4',
      type: 'fill_blank',
      question: 'Complete: "Hij heeft _____ tijd." (Ele não tem tempo.)',
      options: '["niet","geen","nooit","nee"]',
      correctAnswer: 'geen',
      explanation: 'Usamos "geen" com substantivos sem artigo.'
    },
    {
      id: 'ex-5-6-5',
      type: 'multiple_choice',
      question: 'Qual está correto?',
      options: '["Dit is niet goed.","Dit is geen goed.","Dit niet is goed.","Dit geen is goed."]',
      correctAnswer: 'Dit is niet goed.',
      explanation: 'Usamos "niet" para negar adjetivos.'
    },
    {
      id: 'ex-5-6-6',
      type: 'fill_blank',
      question: 'Complete: "Ik drink _____ koffie." (Eu não bebo café.)',
      options: '["niet","geen","nooit","nee"]',
      correctAnswer: 'geen',
      explanation: 'Usamos "geen" com substantivos sem artigo.'
    },
    {
      id: 'ex-5-6-7',
      type: 'multiple_choice',
      question: 'Quando usamos "niet"?',
      options: '["Para negar verbos e adjetivos","Para negar substantivos","Sempre","Nunca"]',
      correctAnswer: 'Para negar verbos e adjetivos',
      explanation: '"Niet" nega verbos, adjetivos e advérbios.'
    },
    {
      id: 'ex-5-6-8',
      type: 'fill_blank',
      question: 'Complete: "Dat is _____ de auto." (Esse não é o carro.)',
      options: '["niet","geen","nooit","nee"]',
      correctAnswer: 'niet',
      explanation: 'Usamos "niet" com artigos definidos (de/het).'
    },
    {
      id: 'ex-5-6-9',
      type: 'multiple_choice',
      question: 'Quando usamos "geen"?',
      options: '["Para negar substantivos","Para negar verbos","Para negar adjetivos","Para negar advérbios"]',
      correctAnswer: 'Para negar substantivos',
      explanation: '"Geen" nega substantivos (com "een" ou sem artigo).'
    },
    {
      id: 'ex-5-6-10',
      type: 'fill_blank',
      question: 'Complete: "Zij werkt _____ vandaag." (Ela não trabalha hoje.)',
      options: '["niet","geen","nooit","nee"]',
      correctAnswer: 'niet',
      explanation: 'Usamos "niet" para negar verbos.'
    }
  ];

  for (const ex of exercises56) {
    await db.insert(exercises).values({
      ...ex,
      lessonId: 'lesson-5-6',
      orderIndex: String(exercises56.indexOf(ex) + 1).padStart(2, '0'),
      audioUrl: null,
      createdAt: new Date()
    });
  }

  console.log('✅ Lição 5.6: Negação (niet/geen) - 10 exercícios');

  // LIÇÃO 6.6: Preposições de Tempo e Lugar
  await db.insert(lessons).values({
    id: 'lesson-6-6',
    moduleId: 'mod-6',
    title: 'Lição 6.6: Preposições de Tempo e Lugar',
    description: 'Aprenda as preposições essenciais em holandês',
    content: JSON.stringify({
      sections: [
        {
          type: 'intro',
          content: 'As preposições conectam palavras e mostram relações de tempo, lugar e direção.'
        },
        {
          type: 'table',
          title: 'Preposições de Lugar',
          headers: ['Preposição', 'Uso', 'Exemplo', 'Tradução'],
          rows: [
            ['in', 'dentro de, em (cidades/países)', 'in Amsterdam', 'em Amsterdã'],
            ['op', 'em cima de, em (ruas)', 'op straat', 'na rua'],
            ['bij', 'perto de, em (estabelecimentos)', 'bij het station', 'na estação'],
            ['naar', 'para (direção)', 'naar huis', 'para casa'],
            ['van', 'de (origem)', 'van Nederland', 'da Holanda']
          ]
        },
        {
          type: 'table',
          title: 'Preposições de Tempo',
          headers: ['Preposição', 'Uso', 'Exemplo', 'Tradução'],
          rows: [
            ['in', 'mês, ano, estação', 'in januari', 'em janeiro'],
            ['op', 'dia, data', 'op maandag', 'na segunda-feira'],
            ['om', 'hora exata', 'om 3 uur', 'às 3 horas'],
            ['voor', 'antes de', 'voor 5 uur', 'antes das 5'],
            ['na', 'depois de', 'na het eten', 'depois de comer']
          ]
        },
        {
          type: 'phrases',
          title: 'Exemplos Práticos',
          items: [
            { dutch: 'Ik woon in Amsterdam.', pronunciation: 'ik vôn in ámsterdam', portuguese: 'Eu moro em Amsterdã.' },
            { dutch: 'Het boek ligt op de tafel.', pronunciation: 'het búk licht op de táfel', portuguese: 'O livro está na mesa.' },
            { dutch: 'Ik ga naar huis.', pronunciation: 'ik rá nár ruis', portuguese: 'Eu vou para casa.' },
            { dutch: 'We eten om 6 uur.', pronunciation: 've éten om zés úr', portuguese: 'Nós comemos às 6 horas.' }
          ]
        }
      ]
    }),
    orderIndex: '06',
    createdAt: new Date()
  });

  // Exercícios para lição 6.6
  const exercises66 = [
    {
      id: 'ex-6-6-1',
      type: 'fill_blank',
      question: 'Complete: "Ik woon _____ Amsterdam." (Eu moro em Amsterdã.)',
      options: '["in","op","bij","naar"]',
      correctAnswer: 'in',
      explanation: 'Usamos "in" para cidades e países.'
    },
    {
      id: 'ex-6-6-2',
      type: 'fill_blank',
      question: 'Complete: "Het boek ligt _____ de tafel." (O livro está na mesa.)',
      options: '["in","op","bij","naar"]',
      correctAnswer: 'op',
      explanation: 'Usamos "op" para "em cima de".'
    },
    {
      id: 'ex-6-6-3',
      type: 'multiple_choice',
      question: 'Como dizer "Eu vou para casa"?',
      options: '["Ik ga naar huis.","Ik ga in huis.","Ik ga op huis.","Ik ga bij huis."]',
      correctAnswer: 'Ik ga naar huis.',
      explanation: 'Usamos "naar" para indicar direção.'
    },
    {
      id: 'ex-6-6-4',
      type: 'fill_blank',
      question: 'Complete: "We eten _____ 6 uur." (Nós comemos às 6 horas.)',
      options: '["om","in","op","bij"]',
      correctAnswer: 'om',
      explanation: 'Usamos "om" para horas exatas.'
    },
    {
      id: 'ex-6-6-5',
      type: 'multiple_choice',
      question: 'Qual preposição para dias da semana?',
      options: '["op","in","om","bij"]',
      correctAnswer: 'op',
      explanation: 'Usamos "op" para dias: "op maandag".'
    },
    {
      id: 'ex-6-6-6',
      type: 'fill_blank',
      question: 'Complete: "Ik werk _____ januari." (Eu trabalho em janeiro.)',
      options: '["in","op","om","bij"]',
      correctAnswer: 'in',
      explanation: 'Usamos "in" para meses e anos.'
    },
    {
      id: 'ex-6-6-7',
      type: 'multiple_choice',
      question: 'Como dizer "perto da estação"?',
      options: '["bij het station","in het station","op het station","naar het station"]',
      correctAnswer: 'bij het station',
      explanation: 'Usamos "bij" para "perto de".'
    },
    {
      id: 'ex-6-6-8',
      type: 'fill_blank',
      question: 'Complete: "Ik kom _____ Nederland." (Eu venho da Holanda.)',
      options: '["van","naar","in","op"]',
      correctAnswer: 'van',
      explanation: 'Usamos "van" para indicar origem.'
    },
    {
      id: 'ex-6-6-9',
      type: 'multiple_choice',
      question: 'Qual preposição para "antes de"?',
      options: '["voor","na","in","op"]',
      correctAnswer: 'voor',
      explanation: '"Voor" significa "antes de".'
    },
    {
      id: 'ex-6-6-10',
      type: 'fill_blank',
      question: 'Complete: "_____ het eten gaan we wandelen." (Depois de comer vamos caminhar.)',
      options: '["Na","Voor","In","Op"]',
      correctAnswer: 'Na',
      explanation: '"Na" significa "depois de".'
    }
  ];

  for (const ex of exercises66) {
    await db.insert(exercises).values({
      ...ex,
      lessonId: 'lesson-6-6',
      orderIndex: String(exercises66.indexOf(ex) + 1).padStart(2, '0'),
      audioUrl: null,
      createdAt: new Date()
    });
  }

  console.log('✅ Lição 6.6: Preposições de Tempo e Lugar - 10 exercícios');

  // LIÇÃO 7.6: Pronomes Demonstrativos
  await db.insert(lessons).values({
    id: 'lesson-7-6',
    moduleId: 'mod-7',
    title: 'Lição 7.6: Pronomes Demonstrativos',
    description: 'Aprenda a usar dit, dat, deze e die',
    content: JSON.stringify({
      sections: [
        {
          type: 'intro',
          content: 'Os pronomes demonstrativos apontam para pessoas ou coisas. Em holandês, variam conforme o artigo (de/het) e a distância.'
        },
        {
          type: 'table',
          title: 'Pronomes Demonstrativos',
          headers: ['Artigo', 'Perto (este/esta)', 'Longe (esse/aquele)', 'Exemplo'],
          rows: [
            ['het', 'dit', 'dat', 'dit boek (este livro)'],
            ['de (singular)', 'deze', 'die', 'deze man (este homem)'],
            ['de (plural)', 'deze', 'die', 'deze boeken (estes livros)']
          ]
        },
        {
          type: 'phrases',
          title: 'Exemplos Práticos',
          items: [
            { dutch: 'Dit is mijn huis.', pronunciation: 'dit is mein ruis', portuguese: 'Esta é minha casa.' },
            { dutch: 'Dat boek is goed.', pronunciation: 'dat búk is rúd', portuguese: 'Aquele livro é bom.' },
            { dutch: 'Deze auto is nieuw.', pronunciation: 'déze óto is níu', portuguese: 'Este carro é novo.' },
            { dutch: 'Die man is aardig.', pronunciation: 'dí man is árdich', portuguese: 'Aquele homem é gentil.' }
          ]
        }
      ]
    }),
    orderIndex: '06',
    createdAt: new Date()
  });

  // Exercícios para lição 7.6
  const exercises76 = [
    {
      id: 'ex-7-6-1',
      type: 'fill_blank',
      question: 'Complete: "_____ is mijn huis." (Esta é minha casa.) [het huis]',
      options: '["Dit","Dat","Deze","Die"]',
      correctAnswer: 'Dit',
      explanation: 'Usamos "dit" para "het"-palavras perto.'
    },
    {
      id: 'ex-7-6-2',
      type: 'fill_blank',
      question: 'Complete: "_____ boek is goed." (Aquele livro é bom.) [het boek]',
      options: '["Dit","Dat","Deze","Die"]',
      correctAnswer: 'Dat',
      explanation: 'Usamos "dat" para "het"-palavras longe.'
    },
    {
      id: 'ex-7-6-3',
      type: 'multiple_choice',
      question: 'Como dizer "Este homem" (de man)?',
      options: '["deze man","die man","dit man","dat man"]',
      correctAnswer: 'deze man',
      explanation: 'Usamos "deze" para "de"-palavras perto.'
    },
    {
      id: 'ex-7-6-4',
      type: 'fill_blank',
      question: 'Complete: "_____ vrouw is aardig." (Aquela mulher é gentil.) [de vrouw]',
      options: '["Dit","Dat","Deze","Die"]',
      correctAnswer: 'Die',
      explanation: 'Usamos "die" para "de"-palavras longe.'
    },
    {
      id: 'ex-7-6-5',
      type: 'multiple_choice',
      question: 'Qual pronome para "het"-palavras perto?',
      options: '["dit","dat","deze","die"]',
      correctAnswer: 'dit',
      explanation: '"Dit" = este/esta (para "het").'
    },
    {
      id: 'ex-7-6-6',
      type: 'fill_blank',
      question: 'Complete: "_____ auto is nieuw." (Este carro é novo.) [de auto]',
      options: '["Dit","Dat","Deze","Die"]',
      correctAnswer: 'Deze',
      explanation: 'Usamos "deze" para "de"-palavras perto.'
    },
    {
      id: 'ex-7-6-7',
      type: 'multiple_choice',
      question: 'Qual a diferença entre "dit" e "dat"?',
      options: '["Distância (perto vs longe)","Artigo (de vs het)","Número (singular vs plural)","Não há diferença"]',
      correctAnswer: 'Distância (perto vs longe)',
      explanation: '"Dit" = perto, "dat" = longe (ambos para "het").'
    },
    {
      id: 'ex-7-6-8',
      type: 'fill_blank',
      question: 'Complete: "_____ kind speelt." (Esta criança brinca.) [het kind]',
      options: '["Dit","Dat","Deze","Die"]',
      correctAnswer: 'Dit',
      explanation: 'Usamos "dit" para "het"-palavras perto.'
    },
    {
      id: 'ex-7-6-9',
      type: 'multiple_choice',
      question: 'Como dizer "Aqueles livros" (de boeken - plural)?',
      options: '["die boeken","deze boeken","dat boeken","dit boeken"]',
      correctAnswer: 'die boeken',
      explanation: 'Usamos "die" para plural longe.'
    },
    {
      id: 'ex-7-6-10',
      type: 'fill_blank',
      question: 'Complete: "_____ huizen zijn groot." (Estas casas são grandes.) [de huizen - plural]',
      options: '["Dit","Dat","Deze","Die"]',
      correctAnswer: 'Deze',
      explanation: 'Usamos "deze" para plural perto.'
    }
  ];

  for (const ex of exercises76) {
    await db.insert(exercises).values({
      ...ex,
      lessonId: 'lesson-7-6',
      orderIndex: String(exercises76.indexOf(ex) + 1).padStart(2, '0'),
      audioUrl: null,
      createdAt: new Date()
    });
  }

  console.log('✅ Lição 7.6: Pronomes Demonstrativos - 10 exercícios');

  // LIÇÃO 8.6: Estrutura de Frases e Ordem das Palavras
  await db.insert(lessons).values({
    id: 'lesson-8-6',
    moduleId: 'mod-8',
    title: 'Lição 8.6: Estrutura de Frases e Ordem das Palavras',
    description: 'Domine a ordem das palavras em holandês',
    content: JSON.stringify({
      sections: [
        {
          type: 'intro',
          content: 'A ordem das palavras em holandês segue regras específicas. Entender essas regras é essencial para construir frases corretas!'
        },
        {
          type: 'table',
          title: 'Ordem Básica (SVO)',
          headers: ['Posição', 'Elemento', 'Exemplo', 'Tradução'],
          rows: [
            ['1', 'Sujeito', 'Ik', 'Eu'],
            ['2', 'Verbo', 'eet', 'como'],
            ['3', 'Objeto', 'een appel', 'uma maçã'],
            ['Frase completa', '', 'Ik eet een appel.', 'Eu como uma maçã.']
          ]
        },
        {
          type: 'table',
          title: 'Inversão em Perguntas',
          headers: ['Tipo', 'Estrutura', 'Exemplo', 'Tradução'],
          rows: [
            ['Pergunta sim/não', 'Verbo + Sujeito', 'Eet jij een appel?', 'Você come uma maçã?'],
            ['Pergunta com interrogativa', 'Interrogativa + Verbo + Sujeito', 'Wat eet jij?', 'O que você come?']
          ]
        },
        {
          type: 'phrases',
          title: 'Exemplos Práticos',
          items: [
            { dutch: 'Ik woon in Amsterdam.', pronunciation: 'ik vôn in ámsterdam', portuguese: 'Eu moro em Amsterdã. (SVO)' },
            { dutch: 'Woon jij in Amsterdam?', pronunciation: 'vôn iei in ámsterdam?', portuguese: 'Você mora em Amsterdã? (Inversão)' },
            { dutch: 'Waar woon jij?', pronunciation: 'vár vôn iei?', portuguese: 'Onde você mora? (Interrogativa)' },
            { dutch: 'Vandaag ga ik naar huis.', pronunciation: 'fandách rá ik nár ruis', portuguese: 'Hoje eu vou para casa. (Advérbio primeiro)' }
          ]
        }
      ]
    }),
    orderIndex: '06',
    createdAt: new Date()
  });

  // Exercícios para lição 8.6
  const exercises86 = [
    {
      id: 'ex-8-6-1',
      type: 'multiple_choice',
      question: 'Qual é a ordem básica em holandês?',
      options: '["Sujeito-Verbo-Objeto (SVO)","Sujeito-Objeto-Verbo (SOV)","Verbo-Sujeito-Objeto (VSO)","Objeto-Verbo-Sujeito (OVS)"]',
      correctAnswer: 'Sujeito-Verbo-Objeto (SVO)',
      explanation: 'A ordem básica é SVO, como em português.'
    },
    {
      id: 'ex-8-6-2',
      type: 'fill_blank',
      question: 'Ordene: "een appel / ik / eet" → "_____ _____ _____."',
      options: '["Ik eet een appel","Een appel eet ik","Eet ik een appel","Ik een appel eet"]',
      correctAnswer: 'Ik eet een appel',
      explanation: 'Ordem SVO: Ik (S) eet (V) een appel (O).'
    },
    {
      id: 'ex-8-6-3',
      type: 'multiple_choice',
      question: 'Como fazer uma pergunta sim/não?',
      options: '["Inverter verbo e sujeito","Adicionar palavra interrogativa","Mudar para SOV","Não mudar nada"]',
      correctAnswer: 'Inverter verbo e sujeito',
      explanation: 'Em perguntas sim/não, o verbo vem antes do sujeito.'
    },
    {
      id: 'ex-8-6-4',
      type: 'fill_blank',
      question: 'Transforme em pergunta: "Jij woont in Amsterdam." → "_____ jij in Amsterdam?"',
      options: '["Woon","Woont","Wonen","Woonen"]',
      correctAnswer: 'Woon',
      explanation: 'Invertemos: "Woon jij...?" (verbo antes do sujeito).'
    },
    {
      id: 'ex-8-6-5',
      type: 'multiple_choice',
      question: 'Qual está correto?',
      options: '["Waar woon jij?","Waar jij woon?","Woon waar jij?","Jij woon waar?"]',
      correctAnswer: 'Waar woon jij?',
      explanation: 'Ordem: Interrogativa + Verbo + Sujeito.'
    },
    {
      id: 'ex-8-6-6',
      type: 'fill_blank',
      question: 'Complete: "Vandaag _____ ik naar huis." (Hoje eu vou para casa.)',
      options: '["ga","gaan","gaat","gegaan"]',
      correctAnswer: 'ga',
      explanation: 'Quando começamos com advérbio, ainda invertemos: "Vandaag ga ik..."'
    },
    {
      id: 'ex-8-6-7',
      type: 'multiple_choice',
      question: 'Onde fica o verbo em perguntas com palavra interrogativa?',
      options: '["Depois da palavra interrogativa","Antes da palavra interrogativa","No final","No meio"]',
      correctAnswer: 'Depois da palavra interrogativa',
      explanation: 'Estrutura: Interrogativa + Verbo + Sujeito.'
    },
    {
      id: 'ex-8-6-8',
      type: 'fill_blank',
      question: 'Ordene: "in Amsterdam / woon / ik" → "_____ _____ _____."',
      options: '["Ik woon in Amsterdam","In Amsterdam ik woon","Woon ik in Amsterdam","Ik in Amsterdam woon"]',
      correctAnswer: 'Ik woon in Amsterdam',
      explanation: 'Ordem SVO normal.'
    },
    {
      id: 'ex-8-6-9',
      type: 'multiple_choice',
      question: 'Qual frase está correta?',
      options: '["Morgen ga ik naar school.","Morgen ik ga naar school.","Ik morgen ga naar school.","Ga morgen ik naar school."]',
      correctAnswer: 'Morgen ga ik naar school.',
      explanation: 'Com advérbio no início, invertemos verbo e sujeito.'
    },
    {
      id: 'ex-8-6-10',
      type: 'multiple_choice',
      question: 'Parabéns! Você completou o nível A1! Qual é a próxima etapa?',
      options: '["Continuar praticando e avançar para A2","Desistir","Voltar ao início","Pular para C1"]',
      correctAnswer: 'Continuar praticando e avançar para A2',
      explanation: 'Continue praticando! O nível A2 te espera com novos desafios!'
    }
  ];

  for (const ex of exercises86) {
    await db.insert(exercises).values({
      ...ex,
      lessonId: 'lesson-8-6',
      orderIndex: String(exercises86.indexOf(ex) + 1).padStart(2, '0'),
      audioUrl: null,
      createdAt: new Date()
    });
  }

  console.log('✅ Lição 8.6: Estrutura de Frases - 10 exercícios');

  console.log('\n🎉 CONCLUÍDO!');
  console.log('📚 7 lições de gramática adicionadas');
  console.log('📝 70 novos exercícios criados');
  console.log('✅ Total: 46 lições, 529 exercícios');
  console.log('🎓 Cobertura completa de gramática A1!');
}

main();

