import { drizzle } from "drizzle-orm/mysql2";
import { modules, lessons, exercises, vocabulary } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seedMoreContent() {
  console.log("Adding more course content...");

  // Lesson 1.3: Números 0-20
  await db.insert(lessons).values({
    id: "lesson-1-3",
    moduleId: "mod-1",
    title: "Lição 1.3: Números 0-20",
    description: "Aprenda os números básicos em holandês",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Os números são essenciais para o dia a dia. Vamos aprender de 0 a 20!"
        },
        {
          type: "table",
          title: "Números 0-20",
          headers: ["Número", "Holandês", "Pronúncia"],
          rows: [
            ["0", "nul", "nul"],
            ["1", "een", "ên"],
            ["2", "twee", "tvê"],
            ["3", "drie", "drí"],
            ["4", "vier", "fír"],
            ["5", "vijf", "fêif"],
            ["6", "zes", "zés"],
            ["7", "zeven", "zêven"],
            ["8", "acht", "acht"],
            ["9", "negen", "nêguen"],
            ["10", "tien", "tín"],
            ["11", "elf", "elf"],
            ["12", "twaalf", "tváalf"],
            ["13", "dertien", "dértín"],
            ["14", "veertien", "fêrtín"],
            ["15", "vijftien", "fêiftín"],
            ["16", "zestien", "zéstín"],
            ["17", "zeventien", "zêventín"],
            ["18", "achttien", "achtín"],
            ["19", "negentien", "nêguentín"],
            ["20", "twintig", "tvíntech"],
          ]
        }
      ]
    }),
    orderIndex: "03",
  });

  await db.insert(vocabulary).values([
    {
      id: "vocab-1-3-1",
      lessonId: "lesson-1-3",
      dutch: "een",
      portuguese: "um",
      pronunciation: "ên",
      example: "Ik heb een hond. (Eu tenho um cachorro.)"
    },
    {
      id: "vocab-1-3-2",
      lessonId: "lesson-1-3",
      dutch: "twee",
      portuguese: "dois",
      pronunciation: "tvê",
      example: "Twee koffie, alstublieft. (Dois cafés, por favor.)"
    },
    {
      id: "vocab-1-3-3",
      lessonId: "lesson-1-3",
      dutch: "tien",
      portuguese: "dez",
      pronunciation: "tín",
      example: "Het kost tien euro. (Custa dez euros.)"
    },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-1-3-1",
      lessonId: "lesson-1-3",
      type: "multiple_choice",
      question: "Como se diz '5' em holandês?",
      options: JSON.stringify(["vier", "vijf", "zes", "zeven"]),
      correctAnswer: "vijf",
      explanation: "'Vijf' é o número 5 em holandês.",
      orderIndex: "01",
    },
    {
      id: "ex-1-3-2",
      lessonId: "lesson-1-3",
      type: "fill_blank",
      question: "Complete: 'Ik ben _____ jaar oud.' (Eu tenho 20 anos.)",
      options: JSON.stringify(["tien", "twintig", "dertig", "veertien"]),
      correctAnswer: "twintig",
      explanation: "'Twintig' significa 20 em holandês.",
      orderIndex: "02",
    },
  ]);

  // Module 3: Vida Cotidiana
  await db.insert(modules).values({
    id: "mod-3",
    title: "Módulo 3: Vida Cotidiana",
    description: "Vocabulário e frases para situações do dia a dia",
    level: "A1",
    orderIndex: "03",
  });

  // Lesson 3.1: Cores e Objetos
  await db.insert(lessons).values({
    id: "lesson-3-1",
    moduleId: "mod-3",
    title: "Lição 3.1: Cores e Objetos",
    description: "Aprenda as cores e objetos comuns",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "As cores são fundamentais para descrever o mundo ao seu redor. Vamos aprender!"
        },
        {
          type: "phrases",
          title: "Cores Básicas",
          items: [
            { dutch: "rood", portuguese: "vermelho", pronunciation: "rôt" },
            { dutch: "blauw", portuguese: "azul", pronunciation: "bláu" },
            { dutch: "groen", portuguese: "verde", pronunciation: "rrún" },
            { dutch: "geel", portuguese: "amarelo", pronunciation: "rrêl" },
            { dutch: "wit", portuguese: "branco", pronunciation: "vit" },
            { dutch: "zwart", portuguese: "preto", pronunciation: "zvart" },
            { dutch: "oranje", portuguese: "laranja", pronunciation: "oránie" },
            { dutch: "roze", portuguese: "rosa", pronunciation: "rôze" },
          ]
        },
        {
          type: "phrases",
          title: "Objetos Comuns",
          items: [
            { dutch: "de tafel", portuguese: "a mesa", pronunciation: "de táfel" },
            { dutch: "de stoel", portuguese: "a cadeira", pronunciation: "de stul" },
            { dutch: "het boek", portuguese: "o livro", pronunciation: "ret búk" },
            { dutch: "de pen", portuguese: "a caneta", pronunciation: "de pen" },
            { dutch: "het huis", portuguese: "a casa", pronunciation: "ret rêus" },
            { dutch: "de auto", portuguese: "o carro", pronunciation: "de áuto" },
          ]
        }
      ]
    }),
    orderIndex: "01",
  });

  await db.insert(vocabulary).values([
    {
      id: "vocab-3-1-1",
      lessonId: "lesson-3-1",
      dutch: "rood",
      portuguese: "vermelho",
      pronunciation: "rôt",
      example: "De auto is rood. (O carro é vermelho.)"
    },
    {
      id: "vocab-3-1-2",
      lessonId: "lesson-3-1",
      dutch: "blauw",
      portuguese: "azul",
      pronunciation: "bláu",
      example: "De lucht is blauw. (O céu é azul.)"
    },
    {
      id: "vocab-3-1-3",
      lessonId: "lesson-3-1",
      dutch: "het boek",
      portuguese: "o livro",
      pronunciation: "ret búk",
      example: "Ik lees een boek. (Eu leio um livro.)"
    },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-3-1-1",
      lessonId: "lesson-3-1",
      type: "multiple_choice",
      question: "Qual é a tradução de 'groen'?",
      options: JSON.stringify(["vermelho", "azul", "verde", "amarelo"]),
      correctAnswer: "verde",
      explanation: "'Groen' significa verde em holandês.",
      orderIndex: "01",
    },
    {
      id: "ex-3-1-2",
      lessonId: "lesson-3-1",
      type: "fill_blank",
      question: "Complete: 'De _____ is rood.' (O carro é vermelho.)",
      options: JSON.stringify(["huis", "auto", "boek", "stoel"]),
      correctAnswer: "auto",
      explanation: "'Auto' significa carro em holandês.",
      orderIndex: "02",
    },
  ]);

  // Lesson 3.2: Alimentos e Bebidas
  await db.insert(lessons).values({
    id: "lesson-3-2",
    moduleId: "mod-3",
    title: "Lição 3.2: Alimentos e Bebidas",
    description: "Vocabulário essencial para restaurantes e supermercados",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Vamos aprender palavras essenciais para fazer compras e pedir comida!"
        },
        {
          type: "phrases",
          title: "Alimentos",
          items: [
            { dutch: "het brood", portuguese: "o pão", pronunciation: "ret brôt" },
            { dutch: "de kaas", portuguese: "o queijo", pronunciation: "de kás" },
            { dutch: "het vlees", portuguese: "a carne", pronunciation: "ret flês" },
            { dutch: "de vis", portuguese: "o peixe", pronunciation: "de fis" },
            { dutch: "de groente", portuguese: "o vegetal", pronunciation: "de rrúnte" },
            { dutch: "het fruit", portuguese: "a fruta", pronunciation: "ret frêut" },
          ]
        },
        {
          type: "phrases",
          title: "Bebidas",
          items: [
            { dutch: "het water", portuguese: "a água", pronunciation: "ret váter" },
            { dutch: "de koffie", portuguese: "o café", pronunciation: "de kófi" },
            { dutch: "de thee", portuguese: "o chá", pronunciation: "de tê" },
            { dutch: "de melk", portuguese: "o leite", pronunciation: "de melk" },
            { dutch: "het bier", portuguese: "a cerveja", pronunciation: "ret bír" },
            { dutch: "de wijn", portuguese: "o vinho", pronunciation: "de vêin" },
          ]
        },
        {
          type: "phrases",
          title: "Frases Úteis",
          items: [
            { dutch: "Ik wil graag...", portuguese: "Eu gostaria de...", pronunciation: "ik vil rráach..." },
            { dutch: "Mag ik...?", portuguese: "Posso ter...?", pronunciation: "mach ik...?" },
            { dutch: "De rekening, alstublieft", portuguese: "A conta, por favor", pronunciation: "de rêkening, als-tú-blíft" },
          ]
        }
      ]
    }),
    orderIndex: "02",
  });

  await db.insert(vocabulary).values([
    {
      id: "vocab-3-2-1",
      lessonId: "lesson-3-2",
      dutch: "het brood",
      portuguese: "o pão",
      pronunciation: "ret brôt",
      example: "Ik eet brood met kaas. (Eu como pão com queijo.)"
    },
    {
      id: "vocab-3-2-2",
      lessonId: "lesson-3-2",
      dutch: "de koffie",
      portuguese: "o café",
      pronunciation: "de kófi",
      example: "Een koffie, alstublieft. (Um café, por favor.)"
    },
    {
      id: "vocab-3-2-3",
      lessonId: "lesson-3-2",
      dutch: "Ik wil graag",
      portuguese: "Eu gostaria de",
      pronunciation: "ik vil rráach",
      example: "Ik wil graag een broodje. (Eu gostaria de um sanduíche.)"
    },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-3-2-1",
      lessonId: "lesson-3-2",
      type: "multiple_choice",
      question: "Como você pede a conta em holandês?",
      options: JSON.stringify([
        "Ik wil graag betalen",
        "De rekening, alstublieft",
        "Tot ziens",
        "Dank u wel"
      ]),
      correctAnswer: "De rekening, alstublieft",
      explanation: "'De rekening, alstublieft' é a forma educada de pedir a conta.",
      orderIndex: "01",
    },
    {
      id: "ex-3-2-2",
      lessonId: "lesson-3-2",
      type: "fill_blank",
      question: "Complete: '_____ wil graag een koffie.' (Eu gostaria de um café.)",
      options: JSON.stringify(["Jij", "Hij", "Ik", "Wij"]),
      correctAnswer: "Ik",
      explanation: "'Ik wil graag' significa 'Eu gostaria de'.",
      orderIndex: "02",
    },
  ]);

  // Module 4: Na Cidade (A1)
  await db.insert(modules).values({
    id: "mod-4",
    title: "Módulo 4: Na Cidade",
    description: "Navegue pela cidade, peça direções e use transporte público",
    level: "A1",
    orderIndex: "04",
  });

  // Lesson 4.1: Lugares na Cidade
  await db.insert(lessons).values({
    id: "lesson-4-1",
    moduleId: "mod-4",
    title: "Lição 4.1: Lugares na Cidade",
    description: "Aprenda os nomes dos lugares importantes na cidade",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Conhecer os lugares da cidade é essencial para se orientar. Vamos aprender!"
        },
        {
          type: "phrases",
          title: "Lugares Importantes",
          items: [
            { dutch: "het station", portuguese: "a estação", pronunciation: "ret státion" },
            { dutch: "de supermarkt", portuguese: "o supermercado", pronunciation: "de súpermarkt" },
            { dutch: "het ziekenhuis", portuguese: "o hospital", pronunciation: "ret zíkenhêus" },
            { dutch: "de school", portuguese: "a escola", pronunciation: "de scôl" },
            { dutch: "het park", portuguese: "o parque", pronunciation: "ret park" },
            { dutch: "de bank", portuguese: "o banco", pronunciation: "de bank" },
            { dutch: "het restaurant", portuguese: "o restaurante", pronunciation: "ret restorán" },
            { dutch: "de apotheek", portuguese: "a farmácia", pronunciation: "de apotêk" },
          ]
        },
        {
          type: "phrases",
          title: "Perguntar Localização",
          items: [
            { dutch: "Waar is...?", portuguese: "Onde fica...?", pronunciation: "vár is...?" },
            { dutch: "Hoe kom ik bij...?", portuguese: "Como chego em...?", pronunciation: "rú kom ik bêi...?" },
            { dutch: "Is het ver?", portuguese: "É longe?", pronunciation: "is ret fér?" },
          ]
        }
      ]
    }),
    orderIndex: "01",
  });

  await db.insert(vocabulary).values([
    {
      id: "vocab-4-1-1",
      lessonId: "lesson-4-1",
      dutch: "het station",
      portuguese: "a estação",
      pronunciation: "ret státion",
      example: "Waar is het station? (Onde fica a estação?)"
    },
    {
      id: "vocab-4-1-2",
      lessonId: "lesson-4-1",
      dutch: "de supermarkt",
      portuguese: "o supermercado",
      pronunciation: "de súpermarkt",
      example: "Ik ga naar de supermarkt. (Eu vou ao supermercado.)"
    },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-4-1-1",
      lessonId: "lesson-4-1",
      type: "multiple_choice",
      question: "Como você pergunta 'Onde fica...?' em holandês?",
      options: JSON.stringify(["Hoe is...?", "Waar is...?", "Wat is...?", "Wie is...?"]),
      correctAnswer: "Waar is...?",
      explanation: "'Waar is...?' é usado para perguntar onde algo está localizado.",
      orderIndex: "01",
    },
  ]);

  console.log("✅ More content added successfully!");
}

seedMoreContent()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding more content:", error);
    process.exit(1);
  });

