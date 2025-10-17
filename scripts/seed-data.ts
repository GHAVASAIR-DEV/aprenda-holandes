import { drizzle } from "drizzle-orm/mysql2";
import { modules, lessons, exercises, vocabulary } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seedData() {
  console.log("Starting to seed course data...");

  // Module 1: Primeiros Passos (A1)
  await db.insert(modules).values({
    id: "mod-1",
    title: "Módulo 1: Primeiros Passos",
    description: "Aprenda o alfabeto, saudações e números básicos",
    level: "A1",
    orderIndex: "01",
  });

  // Lesson 1.1: O Alfabeto Holandês
  await db.insert(lessons).values({
    id: "lesson-1-1",
    moduleId: "mod-1",
    title: "Lição 1.1: O Alfabeto Holandês",
    description: "Conheça as 26 letras do alfabeto holandês e sua pronúncia",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "O alfabeto holandês tem 26 letras, igual ao português. Mas a pronúncia é bem diferente! Vamos aprender os sons especiais que não existem em português."
        },
        {
          type: "special_sounds",
          title: "Sons Especiais",
          items: [
            { letter: "G/CH", sound: "Como um 'R' forte do francês", example: "goed (bom)" },
            { letter: "J", sound: "Como 'Y' em inglês", example: "ja (sim)" },
            { letter: "V", sound: "Como 'F'", example: "vader (pai)" },
            { letter: "W", sound: "Entre 'V' e 'W'", example: "water (água)" },
            { letter: "IJ", sound: "Como 'EI' em português", example: "ijs (gelo)" },
          ]
        }
      ]
    }),
    orderIndex: "01",
  });

  // Vocabulary for Lesson 1.1
  await db.insert(vocabulary).values([
    {
      id: "vocab-1-1-1",
      lessonId: "lesson-1-1",
      dutch: "ja",
      portuguese: "sim",
      pronunciation: "iá",
      example: "Ja, ik wil koffie. (Sim, eu quero café.)"
    },
    {
      id: "vocab-1-1-2",
      lessonId: "lesson-1-1",
      dutch: "nee",
      portuguese: "não",
      pronunciation: "nê",
      example: "Nee, dank je. (Não, obrigado.)"
    },
    {
      id: "vocab-1-1-3",
      lessonId: "lesson-1-1",
      dutch: "goed",
      portuguese: "bom",
      pronunciation: "rúd (com R gutural)",
      example: "Het is goed. (Está bom.)"
    },
  ]);

  // Exercises for Lesson 1.1
  await db.insert(exercises).values([
    {
      id: "ex-1-1-1",
      lessonId: "lesson-1-1",
      type: "multiple_choice",
      question: "Como se pronuncia a letra 'G' em holandês?",
      options: JSON.stringify([
        "Como 'G' em português (gato)",
        "Como um 'R' forte gutural",
        "Como 'J' em português",
        "Muda"
      ]),
      correctAnswer: "Como um 'R' forte gutural",
      explanation: "A letra G em holandês tem um som gutural, feito no fundo da garganta, parecido com o 'R' do francês.",
      orderIndex: "01",
    },
    {
      id: "ex-1-1-2",
      lessonId: "lesson-1-1",
      type: "multiple_choice",
      question: "Qual é a tradução de 'ja' em português?",
      options: JSON.stringify(["não", "sim", "talvez", "obrigado"]),
      correctAnswer: "sim",
      explanation: "'Ja' significa 'sim' em holandês. Pronuncia-se como 'iá'.",
      orderIndex: "02",
    },
  ]);

  // Lesson 1.2: Saudações e Apresentações
  await db.insert(lessons).values({
    id: "lesson-1-2",
    moduleId: "mod-1",
    title: "Lição 1.2: Saudações e Apresentações",
    description: "Aprenda a cumprimentar e se apresentar em holandês",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Vamos aprender as saudações básicas e como se apresentar em holandês!"
        },
        {
          type: "phrases",
          title: "Saudações Básicas",
          items: [
            { dutch: "Hallo", portuguese: "Olá", pronunciation: "rálô" },
            { dutch: "Goedemorgen", portuguese: "Bom dia", pronunciation: "rúde-mórguen" },
            { dutch: "Goedemiddag", portuguese: "Boa tarde", pronunciation: "rúde-mídach" },
            { dutch: "Goedenavond", portuguese: "Boa noite", pronunciation: "rúde-náfont" },
            { dutch: "Tot ziens", portuguese: "Até logo", pronunciation: "tot síns" },
          ]
        },
        {
          type: "phrases",
          title: "Apresentações",
          items: [
            { dutch: "Hoe heet je?", portuguese: "Como você se chama?", pronunciation: "rú rêit ie?" },
            { dutch: "Ik heet...", portuguese: "Eu me chamo...", pronunciation: "ik rêit..." },
            { dutch: "Hoe gaat het?", portuguese: "Como vai?", pronunciation: "rú ráat ret?" },
            { dutch: "Goed, dank je", portuguese: "Bem, obrigado", pronunciation: "rúd, dank ie" },
          ]
        }
      ]
    }),
    orderIndex: "02",
  });

  // Vocabulary for Lesson 1.2
  await db.insert(vocabulary).values([
    {
      id: "vocab-1-2-1",
      lessonId: "lesson-1-2",
      dutch: "hallo",
      portuguese: "olá",
      pronunciation: "rálô",
      example: "Hallo! Hoe gaat het? (Olá! Como vai?)"
    },
    {
      id: "vocab-1-2-2",
      lessonId: "lesson-1-2",
      dutch: "goedemorgen",
      portuguese: "bom dia",
      pronunciation: "rúde-mórguen",
      example: "Goedemorgen! (Bom dia!)"
    },
    {
      id: "vocab-1-2-3",
      lessonId: "lesson-1-2",
      dutch: "dank je",
      portuguese: "obrigado (informal)",
      pronunciation: "dank ie",
      example: "Dank je wel! (Muito obrigado!)"
    },
    {
      id: "vocab-1-2-4",
      lessonId: "lesson-1-2",
      dutch: "alstublieft",
      portuguese: "por favor (formal)",
      pronunciation: "als-tú-blíft",
      example: "Een koffie, alstublieft. (Um café, por favor.)"
    },
  ]);

  // Exercises for Lesson 1.2
  await db.insert(exercises).values([
    {
      id: "ex-1-2-1",
      lessonId: "lesson-1-2",
      type: "fill_blank",
      question: "Complete: '_____ heet je?' (Como você se chama?)",
      options: JSON.stringify(["Hoe", "Wat", "Wie", "Waar"]),
      correctAnswer: "Hoe",
      explanation: "'Hoe heet je?' é a forma de perguntar o nome de alguém em holandês.",
      orderIndex: "01",
    },
    {
      id: "ex-1-2-2",
      lessonId: "lesson-1-2",
      type: "multiple_choice",
      question: "Como você diz 'Bom dia' em holandês?",
      options: JSON.stringify(["Goedenavond", "Goedemiddag", "Goedemorgen", "Hallo"]),
      correctAnswer: "Goedemorgen",
      explanation: "'Goedemorgen' significa 'bom dia' em holandês.",
      orderIndex: "02",
    },
    {
      id: "ex-1-2-3",
      lessonId: "lesson-1-2",
      type: "matching",
      question: "Combine as saudações em holandês com suas traduções em português",
      options: JSON.stringify({
        pairs: [
          { dutch: "Hallo", portuguese: "Olá" },
          { dutch: "Tot ziens", portuguese: "Até logo" },
          { dutch: "Dank je", portuguese: "Obrigado" },
          { dutch: "Goedenavond", portuguese: "Boa noite" },
        ]
      }),
      correctAnswer: JSON.stringify({
        "Hallo": "Olá",
        "Tot ziens": "Até logo",
        "Dank je": "Obrigado",
        "Goedenavond": "Boa noite"
      }),
      explanation: "Essas são as saudações básicas mais usadas no dia a dia.",
      orderIndex: "03",
    },
  ]);

  // Module 2: Sobre Você (A1)
  await db.insert(modules).values({
    id: "mod-2",
    title: "Módulo 2: Sobre Você",
    description: "Aprenda a falar sobre si mesmo, família e informações pessoais",
    level: "A1",
    orderIndex: "02",
  });

  // Lesson 2.1: Pronomes Pessoais
  await db.insert(lessons).values({
    id: "lesson-2-1",
    moduleId: "mod-2",
    title: "Lição 2.1: Pronomes Pessoais",
    description: "Conheça os pronomes pessoais em holandês",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Os pronomes pessoais são fundamentais para construir frases. Vamos aprender todos eles!"
        },
        {
          type: "table",
          title: "Pronomes Pessoais",
          headers: ["Holandês", "Português", "Uso"],
          rows: [
            ["ik", "eu", "Primeira pessoa singular"],
            ["jij/je", "você (informal)", "Segunda pessoa singular informal"],
            ["u", "você/o senhor (formal)", "Segunda pessoa singular formal"],
            ["hij", "ele", "Terceira pessoa singular masculino"],
            ["zij/ze", "ela", "Terceira pessoa singular feminino"],
            ["het", "ele/ela (neutro)", "Terceira pessoa singular neutro"],
            ["wij/we", "nós", "Primeira pessoa plural"],
            ["jullie", "vocês", "Segunda pessoa plural"],
            ["zij/ze", "eles/elas", "Terceira pessoa plural"],
          ]
        }
      ]
    }),
    orderIndex: "01",
  });

  // Vocabulary for Lesson 2.1
  await db.insert(vocabulary).values([
    {
      id: "vocab-2-1-1",
      lessonId: "lesson-2-1",
      dutch: "ik",
      portuguese: "eu",
      pronunciation: "ik",
      example: "Ik ben student. (Eu sou estudante.)"
    },
    {
      id: "vocab-2-1-2",
      lessonId: "lesson-2-1",
      dutch: "jij",
      portuguese: "você (informal)",
      pronunciation: "iêi",
      example: "Jij bent aardig. (Você é legal.)"
    },
    {
      id: "vocab-2-1-3",
      lessonId: "lesson-2-1",
      dutch: "hij",
      portuguese: "ele",
      pronunciation: "rêi",
      example: "Hij is mijn vriend. (Ele é meu amigo.)"
    },
    {
      id: "vocab-2-1-4",
      lessonId: "lesson-2-1",
      dutch: "wij",
      portuguese: "nós",
      pronunciation: "vêi",
      example: "Wij wonen in Amsterdam. (Nós moramos em Amsterdam.)"
    },
  ]);

  // Exercises for Lesson 2.1
  await db.insert(exercises).values([
    {
      id: "ex-2-1-1",
      lessonId: "lesson-2-1",
      type: "multiple_choice",
      question: "Qual é o pronome correto para 'nós' em holandês?",
      options: JSON.stringify(["ik", "jij", "wij", "zij"]),
      correctAnswer: "wij",
      explanation: "'Wij' (ou 'we' na forma curta) significa 'nós' em holandês.",
      orderIndex: "01",
    },
    {
      id: "ex-2-1-2",
      lessonId: "lesson-2-1",
      type: "fill_blank",
      question: "Complete: '_____ ben student.' (Eu sou estudante.)",
      options: JSON.stringify(["Ik", "Jij", "Hij", "Wij"]),
      correctAnswer: "Ik",
      explanation: "'Ik' é o pronome para 'eu' em holandês.",
      orderIndex: "02",
    },
  ]);

  console.log("✅ Seed data inserted successfully!");
}

seedData()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });

