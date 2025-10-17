import { drizzle } from "drizzle-orm/mysql2";
import { modules, lessons, exercises, vocabulary } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function expandModules1to4() {
  console.log("Expanding Modules 1-4 with additional lessons...");

  // ============================================
  // MÓDULO 1: ADICIONAR LIÇÃO 1.4
  // ============================================
  
  await db.insert(lessons).values({
    id: "lesson-1-4",
    moduleId: "mod-1",
    title: "Lição 1.4: Dias da Semana e Meses",
    description: "Aprenda os dias da semana e os meses do ano",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Saber os dias e meses é essencial para marcar compromissos e falar sobre datas!"
        },
        {
          type: "table",
          title: "Dias da Semana",
          headers: ["Holandês", "Português", "Pronúncia"],
          rows: [
            ["maandag", "segunda-feira", "mándach"],
            ["dinsdag", "terça-feira", "dínsdach"],
            ["woensdag", "quarta-feira", "vúnsdach"],
            ["donderdag", "quinta-feira", "dónderdach"],
            ["vrijdag", "sexta-feira", "frêidach"],
            ["zaterdag", "sábado", "záterdach"],
            ["zondag", "domingo", "zóndach"],
          ]
        },
        {
          type: "table",
          title: "Meses do Ano",
          headers: ["Holandês", "Português", "Pronúncia"],
          rows: [
            ["januari", "janeiro", "ianúári"],
            ["februari", "fevereiro", "fébruári"],
            ["maart", "março", "márt"],
            ["april", "abril", "aprél"],
            ["mei", "maio", "mêi"],
            ["juni", "junho", "iúni"],
            ["juli", "julho", "iúli"],
            ["augustus", "agosto", "aurústus"],
            ["september", "setembro", "septémber"],
            ["oktober", "outubro", "oktôber"],
            ["november", "novembro", "novémber"],
            ["december", "dezembro", "decémber"],
          ]
        },
        {
          type: "phrases",
          title: "Frases Úteis",
          items: [
            { dutch: "Welke dag is het vandaag?", portuguese: "Que dia é hoje?", pronunciation: "vélke dach is ret fandách?" },
            { dutch: "Het is maandag", portuguese: "É segunda-feira", pronunciation: "ret is mándach" },
            { dutch: "Wanneer ben je jarig?", portuguese: "Quando é seu aniversário?", pronunciation: "vánêr ben ie iárech?" },
            { dutch: "In mei", portuguese: "Em maio", pronunciation: "in mêi" },
          ]
        }
      ]
    }),
    orderIndex: "04",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-1-4-1", lessonId: "lesson-1-4", dutch: "maandag", portuguese: "segunda-feira", pronunciation: "mándach", example: "Op maandag werk ik. (Na segunda-feira eu trabalho.)" },
    { id: "vocab-1-4-2", lessonId: "lesson-1-4", dutch: "vrijdag", portuguese: "sexta-feira", pronunciation: "frêidach", example: "Vrijdag is mijn favoriete dag. (Sexta-feira é meu dia favorito.)" },
    { id: "vocab-1-4-3", lessonId: "lesson-1-4", dutch: "weekend", portuguese: "fim de semana", pronunciation: "víkent", example: "In het weekend rust ik. (No fim de semana eu descanso.)" },
    { id: "vocab-1-4-4", lessonId: "lesson-1-4", dutch: "januari", portuguese: "janeiro", pronunciation: "ianúári", example: "Januari is de eerste maand. (Janeiro é o primeiro mês.)" },
    { id: "vocab-1-4-5", lessonId: "lesson-1-4", dutch: "december", portuguese: "dezembro", pronunciation: "decémber", example: "In december is het winter. (Em dezembro é inverno.)" },
    { id: "vocab-1-4-6", lessonId: "lesson-1-4", dutch: "vandaag", portuguese: "hoje", pronunciation: "fandách", example: "Vandaag is dinsdag. (Hoje é terça-feira.)" },
    { id: "vocab-1-4-7", lessonId: "lesson-1-4", dutch: "morgen", portuguese: "amanhã", pronunciation: "mórguen", example: "Morgen is woensdag. (Amanhã é quarta-feira.)" },
    { id: "vocab-1-4-8", lessonId: "lesson-1-4", dutch: "gisteren", portuguese: "ontem", pronunciation: "rrísteren", example: "Gisteren was maandag. (Ontem foi segunda-feira.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-1-4-1",
      lessonId: "lesson-1-4",
      type: "multiple_choice",
      question: "Como se diz 'sexta-feira' em holandês?",
      options: JSON.stringify(["maandag", "vrijdag", "zaterdag", "zondag"]),
      correctAnswer: "vrijdag",
      explanation: "'Vrijdag' significa sexta-feira em holandês.",
      orderIndex: "01",
    },
    {
      id: "ex-1-4-2",
      lessonId: "lesson-1-4",
      type: "fill_blank",
      question: "Complete: 'Welke dag is het _____?' (Que dia é hoje?)",
      options: JSON.stringify(["gisteren", "morgen", "vandaag", "weekend"]),
      correctAnswer: "vandaag",
      explanation: "'Vandaag' significa 'hoje' em holandês.",
      orderIndex: "02",
    },
    {
      id: "ex-1-4-3",
      lessonId: "lesson-1-4",
      type: "multiple_choice",
      question: "Qual é o primeiro mês do ano em holandês?",
      options: JSON.stringify(["december", "januari", "maart", "mei"]),
      correctAnswer: "januari",
      explanation: "'Januari' é janeiro, o primeiro mês do ano.",
      orderIndex: "03",
    },
  ]);

  // ============================================
  // MÓDULO 2: ADICIONAR LIÇÕES 2.2, 2.3, 2.4, 2.5
  // ============================================

  // Lição 2.2: Verbo "zijn" (ser/estar)
  await db.insert(lessons).values({
    id: "lesson-2-2",
    moduleId: "mod-2",
    title: "Lição 2.2: Verbo 'zijn' (ser/estar) - Presente",
    description: "Aprenda a conjugar o verbo mais importante do holandês",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "O verbo 'zijn' (ser/estar) é o verbo mais usado em holandês. É irregular, então precisa ser memorizado!"
        },
        {
          type: "table",
          title: "Conjugação de 'zijn' no Presente",
          headers: ["Pronome", "Conjugação", "Português", "Exemplo"],
          rows: [
            ["ik", "ben", "eu sou/estou", "Ik ben student"],
            ["jij/je", "bent", "você é/está", "Jij bent aardig"],
            ["u", "bent/is", "senhor(a) é/está", "U bent welkom"],
            ["hij", "is", "ele é/está", "Hij is leraar"],
            ["zij/ze", "is", "ela é/está", "Zij is mooi"],
            ["het", "is", "ele/ela é/está (neutro)", "Het is koud"],
            ["wij/we", "zijn", "nós somos/estamos", "Wij zijn thuis"],
            ["jullie", "zijn", "vocês são/estão", "Jullie zijn laat"],
            ["zij/ze", "zijn", "eles/elas são/estão", "Zij zijn studenten"],
          ]
        },
        {
          type: "phrases",
          title: "Frases Comuns com 'zijn'",
          items: [
            { dutch: "Ik ben moe", portuguese: "Eu estou cansado", pronunciation: "ik ben mú" },
            { dutch: "Jij bent Nederlands", portuguese: "Você é holandês", pronunciation: "iêi bent néderlants" },
            { dutch: "Hij is thuis", portuguese: "Ele está em casa", pronunciation: "rêi is têus" },
            { dutch: "Wij zijn blij", portuguese: "Nós estamos felizes", pronunciation: "vêi zêin blêi" },
            { dutch: "Het is mooi weer", portuguese: "Está um tempo bonito", pronunciation: "ret is môi vêr" },
          ]
        }
      ]
    }),
    orderIndex: "02",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-2-2-1", lessonId: "lesson-2-2", dutch: "zijn", portuguese: "ser/estar", pronunciation: "zêin", example: "Ik ben hier. (Eu estou aqui.)" },
    { id: "vocab-2-2-2", lessonId: "lesson-2-2", dutch: "moe", portuguese: "cansado", pronunciation: "mú", example: "Ik ben moe. (Eu estou cansado.)" },
    { id: "vocab-2-2-3", lessonId: "lesson-2-2", dutch: "blij", portuguese: "feliz", pronunciation: "blêi", example: "Zij is blij. (Ela está feliz.)" },
    { id: "vocab-2-2-4", lessonId: "lesson-2-2", dutch: "thuis", portuguese: "em casa", pronunciation: "têus", example: "Wij zijn thuis. (Nós estamos em casa.)" },
    { id: "vocab-2-2-5", lessonId: "lesson-2-2", dutch: "aardig", portuguese: "simpático/legal", pronunciation: "árdech", example: "Jij bent aardig. (Você é legal.)" },
    { id: "vocab-2-2-6", lessonId: "lesson-2-2", dutch: "laat", portuguese: "atrasado/tarde", pronunciation: "lát", example: "Jullie zijn laat. (Vocês estão atrasados.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-2-2-1",
      lessonId: "lesson-2-2",
      type: "fill_blank",
      question: "Complete: 'Ik _____ student.' (Eu sou estudante.)",
      options: JSON.stringify(["ben", "bent", "is", "zijn"]),
      correctAnswer: "ben",
      explanation: "Com 'ik' (eu), usamos 'ben'.",
      orderIndex: "01",
    },
    {
      id: "ex-2-2-2",
      lessonId: "lesson-2-2",
      type: "fill_blank",
      question: "Complete: 'Jij _____ aardig.' (Você é legal.)",
      options: JSON.stringify(["ben", "bent", "is", "zijn"]),
      correctAnswer: "bent",
      explanation: "Com 'jij' (você), usamos 'bent'.",
      orderIndex: "02",
    },
    {
      id: "ex-2-2-3",
      lessonId: "lesson-2-2",
      type: "fill_blank",
      question: "Complete: 'Wij _____ thuis.' (Nós estamos em casa.)",
      options: JSON.stringify(["ben", "bent", "is", "zijn"]),
      correctAnswer: "zijn",
      explanation: "Com 'wij' (nós), usamos 'zijn'.",
      orderIndex: "03",
    },
  ]);

  // Lição 2.3: Verbo "hebben" (ter)
  await db.insert(lessons).values({
    id: "lesson-2-3",
    moduleId: "mod-2",
    title: "Lição 2.3: Verbo 'hebben' (ter) - Presente",
    description: "Aprenda a conjugar o verbo 'ter' em holandês",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "O verbo 'hebben' (ter) é outro verbo essencial. Também é irregular!"
        },
        {
          type: "table",
          title: "Conjugação de 'hebben' no Presente",
          headers: ["Pronome", "Conjugação", "Português", "Exemplo"],
          rows: [
            ["ik", "heb", "eu tenho", "Ik heb een hond"],
            ["jij/je", "hebt", "você tem", "Jij hebt gelijk"],
            ["u", "hebt/heeft", "senhor(a) tem", "U hebt tijd"],
            ["hij", "heeft", "ele tem", "Hij heeft een auto"],
            ["zij/ze", "heeft", "ela tem", "Zij heeft honger"],
            ["het", "heeft", "ele/ela tem (neutro)", "Het heeft tijd"],
            ["wij/we", "hebben", "nós temos", "Wij hebben kinderen"],
            ["jullie", "hebben", "vocês têm", "Jullie hebben geluk"],
            ["zij/ze", "hebben", "eles/elas têm", "Zij hebben een huis"],
          ]
        },
        {
          type: "phrases",
          title: "Expressões com 'hebben'",
          items: [
            { dutch: "Ik heb honger", portuguese: "Eu tenho fome", pronunciation: "ik hep hónger" },
            { dutch: "Ik heb dorst", portuguese: "Eu tenho sede", pronunciation: "ik hep dorst" },
            { dutch: "Ik heb tijd", portuguese: "Eu tenho tempo", pronunciation: "ik hep têit" },
            { dutch: "Ik heb gelijk", portuguese: "Eu tenho razão", pronunciation: "ik hep rrelêik" },
            { dutch: "Ik heb het koud", portuguese: "Eu estou com frio", pronunciation: "ik hep ret kêut" },
            { dutch: "Ik heb het warm", portuguese: "Eu estou com calor", pronunciation: "ik hep ret varm" },
          ]
        }
      ]
    }),
    orderIndex: "03",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-2-3-1", lessonId: "lesson-2-3", dutch: "hebben", portuguese: "ter", pronunciation: "hében", example: "Ik heb een fiets. (Eu tenho uma bicicleta.)" },
    { id: "vocab-2-3-2", lessonId: "lesson-2-3", dutch: "honger", portuguese: "fome", pronunciation: "hónger", example: "Ik heb honger. (Eu tenho fome.)" },
    { id: "vocab-2-3-3", lessonId: "lesson-2-3", dutch: "dorst", portuguese: "sede", pronunciation: "dorst", example: "Ik heb dorst. (Eu tenho sede.)" },
    { id: "vocab-2-3-4", lessonId: "lesson-2-3", dutch: "tijd", portuguese: "tempo", pronunciation: "têit", example: "Heb je tijd? (Você tem tempo?)" },
    { id: "vocab-2-3-5", lessonId: "lesson-2-3", dutch: "gelijk", portuguese: "razão", pronunciation: "rrelêik", example: "Jij hebt gelijk. (Você tem razão.)" },
    { id: "vocab-2-3-6", lessonId: "lesson-2-3", dutch: "geluk", portuguese: "sorte", pronunciation: "rrelúk", example: "Veel geluk! (Boa sorte!)" },
    { id: "vocab-2-3-7", lessonId: "lesson-2-3", dutch: "de hond", portuguese: "o cachorro", pronunciation: "de hont", example: "Ik heb een hond. (Eu tenho um cachorro.)" },
    { id: "vocab-2-3-8", lessonId: "lesson-2-3", dutch: "de kat", portuguese: "o gato", pronunciation: "de kat", example: "Zij heeft een kat. (Ela tem um gato.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-2-3-1",
      lessonId: "lesson-2-3",
      type: "fill_blank",
      question: "Complete: 'Ik _____ honger.' (Eu tenho fome.)",
      options: JSON.stringify(["heb", "hebt", "heeft", "hebben"]),
      correctAnswer: "heb",
      explanation: "Com 'ik' (eu), usamos 'heb'.",
      orderIndex: "01",
    },
    {
      id: "ex-2-3-2",
      lessonId: "lesson-2-3",
      type: "fill_blank",
      question: "Complete: 'Hij _____ een auto.' (Ele tem um carro.)",
      options: JSON.stringify(["heb", "hebt", "heeft", "hebben"]),
      correctAnswer: "heeft",
      explanation: "Com 'hij' (ele), usamos 'heeft'.",
      orderIndex: "02",
    },
    {
      id: "ex-2-3-3",
      lessonId: "lesson-2-3",
      type: "multiple_choice",
      question: "Como você diz 'Eu tenho sede' em holandês?",
      options: JSON.stringify(["Ik heb honger", "Ik heb dorst", "Ik heb tijd", "Ik heb gelijk"]),
      correctAnswer: "Ik heb dorst",
      explanation: "'Dorst' significa sede em holandês.",
      orderIndex: "03",
    },
  ]);

  // Lição 2.4: Nacionalidades e Países
  await db.insert(lessons).values({
    id: "lesson-2-4",
    moduleId: "mod-2",
    title: "Lição 2.4: Nacionalidades e Países",
    description: "Aprenda a dizer de onde você é",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Saber falar sobre nacionalidades é essencial para se apresentar!"
        },
        {
          type: "table",
          title: "Países e Nacionalidades",
          headers: ["País", "Nacionalidade (M)", "Nacionalidade (F)", "Pronúncia"],
          rows: [
            ["Nederland", "Nederlandse", "Nederlandse", "néderlant / néderlantse"],
            ["Brazilië", "Braziliaan", "Braziliaanse", "brazílië / braziliján / braziliánse"],
            ["België", "Belg", "Belgische", "bélrrië / belrr / bélrrise"],
            ["Duitsland", "Duitser", "Duitse", "dêutsland / dêutser / dêutse"],
            ["Frankrijk", "Fransman", "Franse", "fránkrêik / fránsman / frânse"],
            ["Engeland", "Engelsman", "Engelse", "éngelant / éngelsman / éngelse"],
            ["Spanje", "Spanjaard", "Spaanse", "spánie / spániárt / spánse"],
            ["Portugal", "Portugees", "Portugese", "pórturral / pórturês / pórturêse"],
          ]
        },
        {
          type: "phrases",
          title: "Frases Úteis",
          items: [
            { dutch: "Waar kom je vandaan?", portuguese: "De onde você é?", pronunciation: "vár kom ie fandán?" },
            { dutch: "Ik kom uit Brazilië", portuguese: "Eu sou do Brasil", pronunciation: "ik kom êut brazílië" },
            { dutch: "Ik ben Braziliaan", portuguese: "Eu sou brasileiro", pronunciation: "ik ben braziliján" },
            { dutch: "Welke nationaliteit heb je?", portuguese: "Qual é sua nacionalidade?", pronunciation: "vélke natsionalitêit hep ie?" },
          ]
        }
      ]
    }),
    orderIndex: "04",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-2-4-1", lessonId: "lesson-2-4", dutch: "Nederland", portuguese: "Holanda/Países Baixos", pronunciation: "néderlant", example: "Ik woon in Nederland. (Eu moro na Holanda.)" },
    { id: "vocab-2-4-2", lessonId: "lesson-2-4", dutch: "Brazilië", portuguese: "Brasil", pronunciation: "brazílië", example: "Ik kom uit Brazilië. (Eu sou do Brasil.)" },
    { id: "vocab-2-4-3", lessonId: "lesson-2-4", dutch: "Braziliaan", portuguese: "brasileiro", pronunciation: "braziliján", example: "Ik ben Braziliaan. (Eu sou brasileiro.)" },
    { id: "vocab-2-4-4", lessonId: "lesson-2-4", dutch: "nationaliteit", portuguese: "nacionalidade", pronunciation: "natsionalitêit", example: "Wat is je nationaliteit? (Qual é sua nacionalidade?)" },
    { id: "vocab-2-4-5", lessonId: "lesson-2-4", dutch: "land", portuguese: "país", pronunciation: "lant", example: "Nederland is een mooi land. (Holanda é um país bonito.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-2-4-1",
      lessonId: "lesson-2-4",
      type: "fill_blank",
      question: "Complete: 'Ik kom uit _____.' (Eu sou do Brasil.)",
      options: JSON.stringify(["Nederland", "Brazilië", "België", "Duitsland"]),
      correctAnswer: "Brazilië",
      explanation: "'Brazilië' é Brasil em holandês.",
      orderIndex: "01",
    },
    {
      id: "ex-2-4-2",
      lessonId: "lesson-2-4",
      type: "multiple_choice",
      question: "Como você pergunta 'De onde você é?' em holandês?",
      options: JSON.stringify([
        "Hoe heet je?",
        "Waar kom je vandaan?",
        "Hoe gaat het?",
        "Wat is je naam?"
      ]),
      correctAnswer: "Waar kom je vandaan?",
      explanation: "'Waar kom je vandaan?' significa 'De onde você é?'.",
      orderIndex: "02",
    },
  ]);

  // Lição 2.5: Profissões Básicas
  await db.insert(lessons).values({
    id: "lesson-2-5",
    moduleId: "mod-2",
    title: "Lição 2.5: Profissões Básicas",
    description: "Aprenda a falar sobre profissões",
    content: JSON.stringify({
      sections: [
        {
          type: "intro",
          content: "Falar sobre sua profissão é parte importante de se apresentar!"
        },
        {
          type: "table",
          title: "Profissões Comuns",
          headers: ["Masculino", "Feminino", "Português", "Pronúncia"],
          rows: [
            ["leraar", "lerares", "professor(a)", "lerár / lerares"],
            ["dokter", "dokter", "médico(a)", "dókter"],
            ["verpleegkundige", "verpleegkundige", "enfermeiro(a)", "ferplêrrkúnderre"],
            ["kok", "kokkin", "cozinheiro(a)", "kok / kókin"],
            ["politieagent", "politieagente", "policial", "polítsiárrent / polítsiárrénte"],
            ["advocaat", "advocate", "advogado(a)", "atvokát / atvokáte"],
            ["ingenieur", "ingenieur", "engenheiro(a)", "inrreniúr"],
            ["student", "studente", "estudante", "stúdent / stúdente"],
            ["werkloos", "werkloos", "desempregado(a)", "vérklôs"],
          ]
        },
        {
          type: "phrases",
          title: "Frases Úteis",
          items: [
            { dutch: "Wat doe je?", portuguese: "O que você faz?", pronunciation: "vat dú ie?" },
            { dutch: "Ik ben leraar", portuguese: "Eu sou professor", pronunciation: "ik ben lerár" },
            { dutch: "Ik werk als dokter", portuguese: "Eu trabalho como médico", pronunciation: "ik vérk als dókter" },
            { dutch: "Ik studeer", portuguese: "Eu estudo", pronunciation: "ik stúdêr" },
            { dutch: "Ik ben werkloos", portuguese: "Eu estou desempregado", pronunciation: "ik ben vérklôs" },
          ]
        }
      ]
    }),
    orderIndex: "05",
  });

  await db.insert(vocabulary).values([
    { id: "vocab-2-5-1", lessonId: "lesson-2-5", dutch: "leraar", portuguese: "professor", pronunciation: "lerár", example: "Ik ben leraar. (Eu sou professor.)" },
    { id: "vocab-2-5-2", lessonId: "lesson-2-5", dutch: "dokter", portuguese: "médico", pronunciation: "dókter", example: "Zij is dokter. (Ela é médica.)" },
    { id: "vocab-2-5-3", lessonId: "lesson-2-5", dutch: "student", portuguese: "estudante", pronunciation: "stúdent", example: "Wij zijn studenten. (Nós somos estudantes.)" },
    { id: "vocab-2-5-4", lessonId: "lesson-2-5", dutch: "werken", portuguese: "trabalhar", pronunciation: "vérken", example: "Ik werk in Amsterdam. (Eu trabalho em Amsterdam.)" },
    { id: "vocab-2-5-5", lessonId: "lesson-2-5", dutch: "studeren", portuguese: "estudar", pronunciation: "stúdêren", example: "Ik studeer Nederlands. (Eu estudo holandês.)" },
  ]);

  await db.insert(exercises).values([
    {
      id: "ex-2-5-1",
      lessonId: "lesson-2-5",
      type: "multiple_choice",
      question: "Como você pergunta 'O que você faz?' em holandês?",
      options: JSON.stringify(["Hoe heet je?", "Wat doe je?", "Waar woon je?", "Hoe gaat het?"]),
      correctAnswer: "Wat doe je?",
      explanation: "'Wat doe je?' é usado para perguntar sobre profissão.",
      orderIndex: "01",
    },
    {
      id: "ex-2-5-2",
      lessonId: "lesson-2-5",
      type: "fill_blank",
      question: "Complete: 'Ik ben _____.' (Eu sou professor.)",
      options: JSON.stringify(["dokter", "leraar", "student", "kok"]),
      correctAnswer: "leraar",
      explanation: "'Leraar' significa professor em holandês.",
      orderIndex: "02",
    },
  ]);

  console.log("✅ Modules 1-4 expanded successfully!");
}

expandModules1to4()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error expanding modules:", error);
    process.exit(1);
  });

