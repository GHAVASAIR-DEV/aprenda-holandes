import { drizzle } from "drizzle-orm/mysql2";
import { modules, lessons, exercises, vocabulary } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seedModules5to8() {
  console.log("Creating Modules 5-8 for A1 completion...");

  // ============================================
  // MÓDULO 5: FAMÍLIA E RELAÇÕES
  // ============================================
  
  await db.insert(modules).values({
    id: "mod-5",
    title: "Módulo 5: Família e Relações",
    description: "Aprenda a falar sobre sua família e relacionamentos",
    level: "A1",
    orderIndex: "05",
  });

  // Lição 5.1: Membros da Família
  await db.insert(lessons).values({
    id: "lesson-5-1",
    moduleId: "mod-5",
    title: "Lição 5.1: Membros da Família",
    description: "Vocabulário essencial sobre família",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "A família é um tema importante em qualquer idioma. Vamos aprender!"
        },
        {
          type: "table",
          title: "Família Imediata",
          headers: ["Holandês", "Português", "Pronúncia"],
          rows: [
            ["de vader", "o pai", "de fáder"],
            ["de moeder", "a mãe", "de múder"],
            ["de ouders", "os pais", "de êuders"],
            ["de zoon", "o filho", "de zôn"],
            ["de dochter", "a filha", "de dóchter"],
            ["de kinderen", "os filhos/crianças", "de kínderen"],
            ["de broer", "o irmão", "de brúr"],
            ["de zus", "a irmã", "de zus"],
            ["de man", "o marido", "de man"],
            ["de vrouw", "a esposa", "de fráu"],
          ]
        },
        {
          type: "table",
          title: "Família Estendida",
          headers: ["Holandês", "Português", "Pronúncia"],
          rows: [
            ["de opa", "o avô", "de ôpa"],
            ["de oma", "a avó", "de ôma"],
            ["de grootouders", "os avós", "de rrôtêuders"],
            ["de oom", "o tio", "de ôm"],
            ["de tante", "a tia", "de tánte"],
            ["de neef", "o primo/sobrinho", "de nêf"],
            ["de nicht", "a prima/sobrinha", "de nicht"],
          ]
        },
        {
          type: "phrases",
          title: "Frases Úteis",
          items: [
            { dutch: "Dit is mijn vader", portuguese: "Este é meu pai", pronunciation: "dit is mêin fáder" },
            { dutch: "Heb je broers of zussen?", portuguese: "Você tem irmãos ou irmãs?", pronunciation: "hep ie brúrs of zúsen?" },
            { dutch: "Ik heb twee broers", portuguese: "Eu tenho dois irmãos", pronunciation: "ik hep tvê brúrs" },
            { dutch: "Mijn familie is groot", portuguese: "Minha família é grande", pronunciation: "mêin famíli is rrôt" },
          ]
        }
      ]
    }),
    orderIndex: "01",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-5-1-1", lessonId: "lesson-5-1", dutch: "de familie", portuguese: "a família", pronunciation: "de famíli", example: "Mijn familie woont in Brazilië. (Minha família mora no Brasil.)" },
    { id: "vocab-5-1-2", lessonId: "lesson-5-1", dutch: "de vader", portuguese: "o pai", pronunciation: "de fáder", example: "Mijn vader is leraar. (Meu pai é professor.)" },
    { id: "vocab-5-1-3", lessonId: "lesson-5-1", dutch: "de moeder", portuguese: "a mãe", pronunciation: "de múder", example: "Mijn moeder werkt als dokter. (Minha mãe trabalha como médica.)" },
    { id: "vocab-5-1-4", lessonId: "lesson-5-1", dutch: "de broer", portuguese: "o irmão", pronunciation: "de brúr", example: "Ik heb een broer. (Eu tenho um irmão.)" },
    { id: "vocab-5-1-5", lessonId: "lesson-5-1", dutch: "de zus", portuguese: "a irmã", pronunciation: "de zus", example: "Mijn zus is student. (Minha irmã é estudante.)" },
    { id: "vocab-5-1-6", lessonId: "lesson-5-1", dutch: "de opa", portuguese: "o avô", pronunciation: "de ôpa", example: "Mijn opa is oud. (Meu avô é velho.)" },
    { id: "vocab-5-1-7", lessonId: "lesson-5-1", dutch: "de oma", portuguese: "a avó", pronunciation: "de ôma", example: "Oma kookt lekker. (Vovó cozinha gostoso.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-5-1-1",
      lessonId: "lesson-5-1",
      type: "multiple_choice",
      question: "Como se diz 'mãe' em holandês?",
      options: JSON.stringify(["vader", "moeder", "broer", "zus"]),
      correctAnswer: "moeder",
      explanation: "'Moeder' significa mãe em holandês.",
      orderIndex: "01",
    },
    {
      id: "ex-5-1-2",
      lessonId: "lesson-5-1",
      type: "fill_blank",
      question: "Complete: 'Ik heb twee _____.' (Eu tenho dois irmãos.)",
      options: JSON.stringify(["broers", "zussen", "kinderen", "ouders"]),
      correctAnswer: "broers",
      explanation: "'Broers' é o plural de 'broer' (irmão).",
      orderIndex: "02",
    },
  ]);

  // Continue com mais lições do módulo 5...
  // (Por brevidade, vou criar estruturas mais compactas para as próximas lições)

  // Lição 5.2: Adjetivos Possessivos
  await db.insert(lessons).values({
    id: "lesson-5-2",
    moduleId: "mod-5",
    title: "Lição 5.2: Adjetivos Possessivos",
    description: "Aprenda mijn, jouw, zijn, haar, ons, jullie",
    content: JSON.stringify({
      sections: [
        {
          type: "table",
          title: "Adjetivos Possessivos",
          headers: ["Pronome", "Possessivo", "Português", "Exemplo"],
          rows: [
            ["ik", "mijn", "meu/minha", "mijn huis (minha casa)"],
            ["jij", "jouw/je", "seu/sua", "jouw auto (seu carro)"],
            ["u", "uw", "seu/sua (formal)", "uw naam (seu nome)"],
            ["hij", "zijn", "dele", "zijn boek (o livro dele)"],
            ["zij", "haar", "dela", "haar tas (a bolsa dela)"],
            ["wij", "ons/onze", "nosso/nossa", "ons huis (nossa casa)"],
            ["jullie", "jullie", "de vocês", "jullie hond (o cachorro de vocês)"],
            ["zij", "hun", "deles/delas", "hun kinderen (os filhos deles)"],
          ]
        }
      ]
    }),
    orderIndex: "02",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-5-2-1", lessonId: "lesson-5-2", dutch: "mijn", portuguese: "meu/minha", pronunciation: "mêin", example: "Dit is mijn boek. (Este é meu livro.)" },
    { id: "vocab-5-2-2", lessonId: "lesson-5-2", dutch: "jouw", portuguese: "seu/sua", pronunciation: "iêu", example: "Is dit jouw pen? (Esta é sua caneta?)" },
    { id: "vocab-5-2-3", lessonId: "lesson-5-2", dutch: "zijn", portuguese: "dele", pronunciation: "zêin", example: "Dat is zijn fiets. (Aquela é a bicicleta dele.)" },
    { id: "vocab-5-2-4", lessonId: "lesson-5-2", dutch: "haar", portuguese: "dela", pronunciation: "hár", example: "Haar naam is Anna. (O nome dela é Anna.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-5-2-1",
      lessonId: "lesson-5-2",
      type: "fill_blank",
      question: "Complete: 'Dit is _____ huis.' (Esta é minha casa.)",
      options: JSON.stringify(["mijn", "jouw", "zijn", "haar"]),
      correctAnswer: "mijn",
      explanation: "'Mijn' significa 'meu/minha'.",
      orderIndex: "01",
    },
  ]);

  // ============================================
  // MÓDULO 6: TEMPO E CLIMA
  // ============================================
  
  await db.insert(modules).values({
    id: "mod-6",
    title: "Módulo 6: Tempo e Clima",
    description: "Aprenda sobre horas, clima e estações do ano",
    level: "A1",
    orderIndex: "06",
  });

  await db.insert(lessons).values({
    id: "lesson-6-1",
    moduleId: "mod-6",
    title: "Lição 6.1: Horas e Horários",
    description: "Aprenda a dizer as horas em holandês",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Saber dizer as horas é essencial para marcar encontros!"
        },
        {
          type: "phrases",
          title: "Dizendo as Horas",
          items: [
            { dutch: "Hoe laat is het?", portuguese: "Que horas são?", pronunciation: "rú lát is ret?" },
            { dutch: "Het is één uur", portuguese: "É uma hora", pronunciation: "ret is ên úr" },
            { dutch: "Het is twee uur", portuguese: "São duas horas", pronunciation: "ret is tvê úr" },
            { dutch: "Het is half drie", portuguese: "São duas e meia", pronunciation: "ret is half drí" },
            { dutch: "Het is kwart over drie", portuguese: "São três e quinze", pronunciation: "ret is kvart ôver drí" },
            { dutch: "Het is kwart voor vier", portuguese: "São quinze para as quatro", pronunciation: "ret is kvart fôr fír" },
          ]
        },
        {
          type: "phrases",
          title: "Partes do Dia",
          items: [
            { dutch: "'s ochtends", portuguese: "de manhã", pronunciation: "sóchtens" },
            { dutch: "'s middags", portuguese: "à tarde", pronunciation: "smídachs" },
            { dutch: "'s avonds", portuguese: "à noite", pronunciation: "sáfons" },
            { dutch: "'s nachts", portuguese: "de madrugada", pronunciation: "snachts" },
          ]
        }
      ]
    }),
    orderIndex: "01",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-6-1-1", lessonId: "lesson-6-1", dutch: "het uur", portuguese: "a hora", pronunciation: "ret úr", example: "Het is drie uur. (São três horas.)" },
    { id: "vocab-6-1-2", lessonId: "lesson-6-1", dutch: "de minuut", portuguese: "o minuto", pronunciation: "de minút", example: "Vijf minuten. (Cinco minutos.)" },
    { id: "vocab-6-1-3", lessonId: "lesson-6-1", dutch: "half", portuguese: "meia (hora)", pronunciation: "half", example: "Half zes. (Cinco e meia.)" },
    { id: "vocab-6-1-4", lessonId: "lesson-6-1", dutch: "kwart", portuguese: "quarto (de hora)", pronunciation: "kvart", example: "Kwart over twee. (Duas e quinze.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-6-1-1",
      lessonId: "lesson-6-1",
      type: "multiple_choice",
      question: "Como você pergunta 'Que horas são?' em holandês?",
      options: JSON.stringify(["Hoe laat is het?", "Wat is de tijd?", "Welke uur?", "Hoe heet je?"]),
      correctAnswer: "Hoe laat is het?",
      explanation: "'Hoe laat is het?' é a forma padrão de perguntar as horas.",
      orderIndex: "01",
    },
  ]);

  // Lição 6.2: O Clima e as Estações
  await db.insert(lessons).values({
    id: "lesson-6-2",
    moduleId: "mod-6",
    title: "Lição 6.2: O Clima e as Estações",
    description: "Vocabulário sobre clima e estações do ano",
    content: JSON.stringify({
      sections: [
        {
          type: "table",
          title: "Estações do Ano",
          headers: ["Holandês", "Português", "Pronúncia"],
          rows: [
            ["de lente", "a primavera", "de lénte"],
            ["de zomer", "o verão", "de zômer"],
            ["de herfst", "o outono", "de hérfst"],
            ["de winter", "o inverno", "de vínter"],
          ]
        },
        {
          type: "phrases",
          title: "Clima",
          items: [
            { dutch: "Het is warm", portuguese: "Está quente", pronunciation: "ret is varm" },
            { dutch: "Het is koud", portuguese: "Está frio", pronunciation: "ret is kêut" },
            { dutch: "Het regent", portuguese: "Está chovendo", pronunciation: "ret rêrrent" },
            { dutch: "Het sneeuwt", portuguese: "Está nevando", pronunciation: "ret snêut" },
            { dutch: "De zon schijnt", portuguese: "O sol está brilhando", pronunciation: "de zon schêint" },
            { dutch: "Het is bewolkt", portuguese: "Está nublado", pronunciation: "ret is bevólkt" },
          ]
        }
      ]
    }),
    orderIndex: "02",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-6-2-1", lessonId: "lesson-6-2", dutch: "het weer", portuguese: "o clima", pronunciation: "ret vêr", example: "Hoe is het weer? (Como está o tempo?)" },
    { id: "vocab-6-2-2", lessonId: "lesson-6-2", dutch: "de zon", portuguese: "o sol", pronunciation: "de zon", example: "De zon schijnt. (O sol brilha.)" },
    { id: "vocab-6-2-3", lessonId: "lesson-6-2", dutch: "de regen", portuguese: "a chuva", pronunciation: "de rêrren", example: "Ik hou niet van regen. (Eu não gosto de chuva.)" },
    { id: "vocab-6-2-4", lessonId: "lesson-6-2", dutch: "de sneeuw", portuguese: "a neve", pronunciation: "de snêu", example: "In winter valt er sneeuw. (No inverno cai neve.)" },
    { id: "vocab-6-2-5", lessonId: "lesson-6-2", dutch: "warm", portuguese: "quente", pronunciation: "varm", example: "Het is warm vandaag. (Está quente hoje.)" },
    { id: "vocab-6-2-6", lessonId: "lesson-6-2", dutch: "koud", portuguese: "frio", pronunciation: "kêut", example: "Het is koud buiten. (Está frio lá fora.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-6-2-1",
      lessonId: "lesson-6-2",
      type: "multiple_choice",
      question: "Como você diz 'Está chovendo' em holandês?",
      options: JSON.stringify(["Het sneeuwt", "Het regent", "Het is warm", "Het is bewolkt"]),
      correctAnswer: "Het regent",
      explanation: "'Het regent' significa 'está chovendo'.",
      orderIndex: "01",
    },
  ]);

  // ============================================
  // MÓDULO 7: HOBBIES E TEMPO LIVRE
  // ============================================
  
  await db.insert(modules).values({
    id: "mod-7",
    title: "Módulo 7: Hobbies e Tempo Livre",
    description: "Fale sobre seus hobbies e atividades favoritas",
    level: "A1",
    orderIndex: "07",
  });

  await db.insert(lessons).values({
    id: "lesson-7-1",
    moduleId: "mod-7",
    title: "Lição 7.1: Esportes e Atividades",
    description: "Vocabulário de esportes e atividades de lazer",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Falar sobre hobbies é uma ótima forma de fazer amigos!"
        },
        {
          type: "table",
          title: "Esportes Populares",
          headers: ["Holandês", "Português", "Pronúncia"],
          rows: [
            ["voetballen", "jogar futebol", "fútbalen"],
            ["fietsen", "andar de bicicleta", "fítsen"],
            ["zwemmen", "nadar", "zvémen"],
            ["hardlopen", "correr", "hartlôpen"],
            ["tennissen", "jogar tênis", "ténisen"],
            ["basketballen", "jogar basquete", "báskitbalen"],
          ]
        },
        {
          type: "phrases",
          title: "Falando sobre Hobbies",
          items: [
            { dutch: "Wat zijn je hobbies?", portuguese: "Quais são seus hobbies?", pronunciation: "vat zêin ie hóbis?" },
            { dutch: "Ik hou van voetbal", portuguese: "Eu gosto de futebol", pronunciation: "ik hêu fan fútbal" },
            { dutch: "Ik speel graag tennis", portuguese: "Eu gosto de jogar tênis", pronunciation: "ik spêl rráach ténis" },
          ]
        }
      ]
    }),
    orderIndex: "01",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-7-1-1", lessonId: "lesson-7-1", dutch: "de hobby", portuguese: "o hobby", pronunciation: "de hóbi", example: "Wat is je hobby? (Qual é seu hobby?)" },
    { id: "vocab-7-1-2", lessonId: "lesson-7-1", dutch: "sporten", portuguese: "praticar esportes", pronunciation: "spórten", example: "Ik sport graag. (Eu gosto de praticar esportes.)" },
    { id: "vocab-7-1-3", lessonId: "lesson-7-1", dutch: "voetbal", portuguese: "futebol", pronunciation: "fútbal", example: "Ik kijk naar voetbal. (Eu assisto futebol.)" },
    { id: "vocab-7-1-4", lessonId: "lesson-7-1", dutch: "fietsen", portuguese: "andar de bicicleta", pronunciation: "fítsen", example: "Ik fiets elke dag. (Eu ando de bicicleta todo dia.)" },
    { id: "vocab-7-1-5", lessonId: "lesson-7-1", dutch: "zwemmen", portuguese: "nadar", pronunciation: "zvémen", example: "Ik zwem in de zomer. (Eu nado no verão.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-7-1-1",
      lessonId: "lesson-7-1",
      type: "multiple_choice",
      question: "Como você diz 'Eu gosto de futebol' em holandês?",
      options: JSON.stringify([
        "Ik speel voetbal",
        "Ik hou van voetbal",
        "Ik kijk voetbal",
        "Ik ben voetbal"
      ]),
      correctAnswer: "Ik hou van voetbal",
      explanation: "'Ik hou van...' significa 'Eu gosto de...'.",
      orderIndex: "01",
    },
  ]);

  // ============================================
  // MÓDULO 8: NO RESTAURANTE E CAFÉ
  // ============================================
  
  await db.insert(modules).values({
    id: "mod-8",
    title: "Módulo 8: No Restaurante e Café",
    description: "Aprenda a pedir comida e bebida",
    level: "A1",
    orderIndex: "08",
  });

  await db.insert(lessons).values({
    id: "lesson-8-1",
    moduleId: "mod-8",
    title: "Lição 8.1: Fazendo Pedidos",
    description: "Frases essenciais para restaurantes",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Saber pedir comida é essencial quando você visita a Holanda!"
        },
        {
          type: "phrases",
          title: "No Restaurante",
          items: [
            { dutch: "Ik wil graag bestellen", portuguese: "Eu gostaria de fazer um pedido", pronunciation: "ik vil rráach bestélen" },
            { dutch: "Mag ik de menukaart?", portuguese: "Posso ver o cardápio?", pronunciation: "mach ik de menúkárt?" },
            { dutch: "Wat raad je aan?", portuguese: "O que você recomenda?", pronunciation: "vat rát ie án?" },
            { dutch: "Ik neem...", portuguese: "Eu vou querer...", pronunciation: "ik nêm..." },
            { dutch: "Mag ik de rekening?", portuguese: "Posso pegar a conta?", pronunciation: "mach ik de rêkening?" },
            { dutch: "Dat was heerlijk!", portuguese: "Estava delicioso!", pronunciation: "dat vas hêrlêik!" },
          ]
        }
      ]
    }),
    orderIndex: "01",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-8-1-1", lessonId: "lesson-8-1", dutch: "het restaurant", portuguese: "o restaurante", pronunciation: "ret restorán", example: "Ik ga naar het restaurant. (Eu vou ao restaurante.)" },
    { id: "vocab-8-1-2", lessonId: "lesson-8-1", dutch: "de menukaart", portuguese: "o cardápio", pronunciation: "de menúkárt", example: "Mag ik de menukaart? (Posso ver o cardápio?)" },
    { id: "vocab-8-1-3", lessonId: "lesson-8-1", dutch: "bestellen", portuguese: "pedir/encomendar", pronunciation: "bestélen", example: "Ik wil bestellen. (Eu quero fazer um pedido.)" },
    { id: "vocab-8-1-4", lessonId: "lesson-8-1", dutch: "heerlijk", portuguese: "delicioso", pronunciation: "hêrlêik", example: "Het eten is heerlijk! (A comida está deliciosa!)" },
    { id: "vocab-8-1-5", lessonId: "lesson-8-1", dutch: "lekker", portuguese: "gostoso", pronunciation: "léker", example: "Dit smaakt lekker. (Isto está gostoso.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-8-1-1",
      lessonId: "lesson-8-1",
      type: "multiple_choice",
      question: "Como você pede o cardápio em holandês?",
      options: JSON.stringify([
        "Mag ik de rekening?",
        "Mag ik de menukaart?",
        "Ik wil bestellen",
        "Wat raad je aan?"
      ]),
      correctAnswer: "Mag ik de menukaart?",
      explanation: "'Mag ik de menukaart?' significa 'Posso ver o cardápio?'.",
      orderIndex: "01",
    },
  ]);

  console.log("✅ Modules 5-8 created successfully!");
}

seedModules5to8()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error creating modules 5-8:", error);
    process.exit(1);
  });

