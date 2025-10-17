import { drizzle } from "drizzle-orm/mysql2";
import { lessons, exercises, vocabulary } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function completeA1Content() {
  console.log("Adding remaining lessons and vocabulary for A1 completion...");

  // ============================================
  // MÓDULO 3: Complete remaining lessons
  // ============================================
  
  const module3Lessons = [
    {
      id: "lesson-3-3",
      moduleId: "mod-3",
      title: "Lição 3.3: Roupas e Acessórios",
      description: "Vocabulário de roupas e como fazer compras",
      orderIndex: "03",
      vocab: [
        { dutch: "het shirt", portuguese: "a camisa", pronunciation: "ret shirt", example: "Ik draag een wit shirt." },
        { dutch: "de broek", portuguese: "a calça", pronunciation: "de brúk", example: "Deze broek is te groot." },
        { dutch: "de jurk", portuguese: "o vestido", pronunciation: "de iúrk", example: "Zij draagt een mooie jurk." },
        { dutch: "de jas", portuguese: "o casaco", pronunciation: "de iás", example: "Ik heb een warme jas nodig." },
        { dutch: "de schoenen", portuguese: "os sapatos", pronunciation: "de schúnen", example: "Mijn schoenen zijn nieuw." },
        { dutch: "de sok", portuguese: "a meia", pronunciation: "de sok", example: "Ik heb twee sokken." },
        { dutch: "de hoed", portuguese: "o chapéu", pronunciation: "de hút", example: "Hij draagt een hoed." },
        { dutch: "de tas", portuguese: "a bolsa", pronunciation: "de tas", example: "Haar tas is zwart." },
        { dutch: "de riem", portuguese: "o cinto", pronunciation: "de rím", example: "Ik draag een bruine riem." },
        { dutch: "dragen", portuguese: "vestir/usar", pronunciation: "drágen", example: "Wat draag je vandaag?" },
      ],
    },
    {
      id: "lesson-3-4",
      moduleId: "mod-3",
      title: "Lição 3.4: A Casa",
      description: "Cômodos e móveis da casa",
      orderIndex: "04",
      vocab: [
        { dutch: "het huis", portuguese: "a casa", pronunciation: "ret hêus", example: "Mijn huis is groot." },
        { dutch: "de kamer", portuguese: "o quarto", pronunciation: "de kámer", example: "Ik heb drie kamers." },
        { dutch: "de keuken", portuguese: "a cozinha", pronunciation: "de kêuken", example: "De keuken is schoon." },
        { dutch: "de badkamer", portuguese: "o banheiro", pronunciation: "de bátkámer", example: "De badkamer is klein." },
        { dutch: "de woonkamer", portuguese: "a sala de estar", pronunciation: "de vônkámer", example: "We zitten in de woonkamer." },
        { dutch: "de slaapkamer", portuguese: "o quarto de dormir", pronunciation: "de slápkámer", example: "Mijn slaapkamer is groot." },
        { dutch: "de tuin", portuguese: "o jardim", pronunciation: "de têun", example: "Ik heb een mooie tuin." },
        { dutch: "het bed", portuguese: "a cama", pronunciation: "ret bet", example: "Het bed is comfortabel." },
        { dutch: "de tafel", portuguese: "a mesa", pronunciation: "de táfel", example: "De tafel is rond." },
        { dutch: "de stoel", portuguese: "a cadeira", pronunciation: "de stúl", example: "Ik zit op een stoel." },
        { dutch: "de bank", portuguese: "o sofá", pronunciation: "de bank", example: "De bank is rood." },
        { dutch: "de lamp", portuguese: "a lâmpada", pronunciation: "de lamp", example: "De lamp geeft licht." },
      ],
    },
    {
      id: "lesson-3-5",
      moduleId: "mod-3",
      title: "Lição 3.5: Verbos Regulares no Presente",
      description: "Aprenda a conjugar verbos regulares",
      orderIndex: "05",
      vocab: [
        { dutch: "werken", portuguese: "trabalhar", pronunciation: "vérken", example: "Ik werk elke dag." },
        { dutch: "wonen", portuguese: "morar", pronunciation: "vônen", example: "Waar woon je?" },
        { dutch: "koken", portuguese: "cozinhar", pronunciation: "kôken", example: "Zij kookt goed." },
        { dutch: "leren", portuguese: "aprender", pronunciation: "lêren", example: "Ik leer Nederlands." },
        { dutch: "praten", portuguese: "conversar", pronunciation: "práten", example: "Wij praten veel." },
        { dutch: "luisteren", portuguese: "escutar", pronunciation: "lêusteren", example: "Ik luister naar muziek." },
        { dutch: "kijken", portuguese: "olhar/assistir", pronunciation: "kêiken", example: "Hij kijkt televisie." },
        { dutch: "maken", portuguese: "fazer", pronunciation: "máken", example: "Wat maak je?" },
      ],
    },
  ];

  // ============================================
  // MÓDULO 4: Complete remaining lessons
  // ============================================
  
  const module4Lessons = [
    {
      id: "lesson-4-2",
      moduleId: "mod-4",
      title: "Lição 4.2: Transporte Público",
      description: "Vocabulário de transporte",
      orderIndex: "02",
      vocab: [
        { dutch: "de trein", portuguese: "o trem", pronunciation: "de trêin", example: "Ik ga met de trein." },
        { dutch: "de bus", portuguese: "o ônibus", pronunciation: "de bus", example: "De bus is laat." },
        { dutch: "de tram", portuguese: "o bonde", pronunciation: "de tram", example: "De tram stopt hier." },
        { dutch: "de metro", portuguese: "o metrô", pronunciation: "de métro", example: "De metro is snel." },
        { dutch: "de fiets", portuguese: "a bicicleta", pronunciation: "de fíts", example: "Ik fiets naar werk." },
        { dutch: "de auto", portuguese: "o carro", pronunciation: "de êuto", example: "Hij heeft een auto." },
        { dutch: "het station", portuguese: "a estação", pronunciation: "ret státsion", example: "Het station is groot." },
        { dutch: "de halte", portuguese: "o ponto (de ônibus)", pronunciation: "de hálte", example: "Waar is de halte?" },
        { dutch: "het kaartje", portuguese: "o bilhete", pronunciation: "ret kártie", example: "Ik koop een kaartje." },
        { dutch: "reizen", portuguese: "viajar", pronunciation: "rêizen", example: "Ik reis veel." },
      ],
    },
    {
      id: "lesson-4-3",
      moduleId: "mod-4",
      title: "Lição 4.3: Pedindo Direções",
      description: "Frases para pedir e dar direções",
      orderIndex: "03",
      vocab: [
        { dutch: "links", portuguese: "esquerda", pronunciation: "links", example: "Ga naar links." },
        { dutch: "rechts", portuguese: "direita", pronunciation: "rechts", example: "Sla rechts af." },
        { dutch: "rechtdoor", portuguese: "reto/em frente", pronunciation: "rechtdôr", example: "Ga rechtdoor." },
        { dutch: "de hoek", portuguese: "a esquina", pronunciation: "de húk", example: "Bij de hoek." },
        { dutch: "de straat", portuguese: "a rua", pronunciation: "de strát", example: "Welke straat?" },
        { dutch: "ver", portuguese: "longe", pronunciation: "fer", example: "Is het ver?" },
        { dutch: "dichtbij", portuguese: "perto", pronunciation: "dichtbêi", example: "Het is dichtbij." },
        { dutch: "hier", portuguese: "aqui", pronunciation: "hír", example: "Ik ben hier." },
        { dutch: "daar", portuguese: "lá/ali", pronunciation: "dár", example: "Het is daar." },
      ],
    },
    {
      id: "lesson-4-4",
      moduleId: "mod-4",
      title: "Lição 4.4: No Supermercado",
      description: "Fazendo compras no supermercado",
      orderIndex: "04",
      vocab: [
        { dutch: "de supermarkt", portuguese: "o supermercado", pronunciation: "de súpermarkt", example: "Ik ga naar de supermarkt." },
        { dutch: "kopen", portuguese: "comprar", pronunciation: "kôpen", example: "Wat wil je kopen?" },
        { dutch: "verkopen", portuguese: "vender", pronunciation: "ferkôpen", example: "Zij verkopen groente." },
        { dutch: "betalen", portuguese: "pagar", pronunciation: "betálen", example: "Ik wil betalen." },
        { dutch: "de prijs", portuguese: "o preço", pronunciation: "de prêis", example: "Wat is de prijs?" },
        { dutch: "goedkoop", portuguese: "barato", pronunciation: "rútkôp", example: "Dit is goedkoop." },
        { dutch: "duur", portuguese: "caro", pronunciation: "dúr", example: "Dat is te duur." },
        { dutch: "de korting", portuguese: "o desconto", pronunciation: "de kórting", example: "Er is korting." },
        { dutch: "de winkel", portuguese: "a loja", pronunciation: "de vínkel", example: "De winkel is open." },
      ],
    },
    {
      id: "lesson-4-5",
      moduleId: "mod-4",
      title: "Lição 4.5: Números e Dinheiro",
      description: "Números de 20 a 1000 e vocabulário de dinheiro",
      orderIndex: "05",
      vocab: [
        { dutch: "twintig", portuguese: "vinte", pronunciation: "tvíntich", example: "Ik ben twintig jaar." },
        { dutch: "dertig", portuguese: "trinta", pronunciation: "dértich", example: "Dertig euro." },
        { dutch: "veertig", portuguese: "quarenta", pronunciation: "fêrtich", example: "Veertig minuten." },
        { dutch: "vijftig", portuguese: "cinquenta", pronunciation: "fêiftich", example: "Vijftig cent." },
        { dutch: "honderd", portuguese: "cem", pronunciation: "hóndert", example: "Honderd euro." },
        { dutch: "duizend", portuguese: "mil", pronunciation: "dêuzent", example: "Duizend mensen." },
        { dutch: "de euro", portuguese: "o euro", pronunciation: "de êuro", example: "Hoeveel euro?" },
        { dutch: "de cent", portuguese: "o centavo", pronunciation: "de sent", example: "Vijftig cent." },
        { dutch: "het geld", portuguese: "o dinheiro", pronunciation: "ret rrelt", example: "Ik heb geen geld." },
      ],
    },
  ];

  // Add all lessons and vocabulary
  const allLessons = [...module3Lessons, ...module4Lessons];

  for (const lessonData of allLessons) {
    const { vocab, ...lessonInfo } = lessonData;
    
    await db.insert(lessons).values({
      ...lessonInfo,
      content: JSON.stringify({ sections: [] }),
    });

    const vocabEntries = vocab.map((v, idx) => ({
      id: `vocab-${lessonInfo.id}-${idx + 1}`,
      lessonId: lessonInfo.id,
      ...v,
    }));

    await db.insert(vocabulary).values(vocabEntries);

    // Add exercises
    await db.insert(exercises).values([
      {
        id: `ex-${lessonInfo.id}-1`,
        lessonId: lessonInfo.id,
        type: "multiple_choice",
        question: `Escolha a tradução correta de '${vocab[0].dutch}'`,
        options: JSON.stringify([vocab[0].portuguese, "opção incorreta 1", "opção incorreta 2", "opção incorreta 3"]),
        correctAnswer: vocab[0].portuguese,
        explanation: `'${vocab[0].dutch}' significa '${vocab[0].portuguese}' em português.`,
        orderIndex: "01",
      },
    ]);
  }

  // ============================================
  // Add more vocabulary to modules 5-8
  // ============================================
  
  const additionalVocab = [
    // Module 5 additional vocab
    { lessonId: "lesson-5-1", dutch: "de baby", portuguese: "o bebê", pronunciation: "de bébi", example: "De baby huilt." },
    { lessonId: "lesson-5-1", dutch: "het kind", portuguese: "a criança", pronunciation: "ret kint", example: "Het kind speelt." },
    { lessonId: "lesson-5-1", dutch: "de man", portuguese: "o homem", pronunciation: "de man", example: "De man werkt." },
    { lessonId: "lesson-5-1", dutch: "de vrouw", portuguese: "a mulher", pronunciation: "de fráu", example: "De vrouw leest." },
    { lessonId: "lesson-5-1", dutch: "oud", portuguese: "velho", pronunciation: "êut", example: "Mijn opa is oud." },
    { lessonId: "lesson-5-1", dutch: "jong", portuguese: "jovem", pronunciation: "iong", example: "Zij is jong." },
    { lessonId: "lesson-5-1", dutch: "getrouwd", portuguese: "casado", pronunciation: "rretrêut", example: "Ik ben getrouwd." },
    { lessonId: "lesson-5-1", dutch: "gescheiden", portuguese: "divorciado", pronunciation: "reschêiden", example: "Hij is gescheiden." },
    
    // Module 5.2 additional
    { lessonId: "lesson-5-2", dutch: "ons", portuguese: "nosso/nossa", pronunciation: "ons", example: "Dit is ons huis." },
    { lessonId: "lesson-5-2", dutch: "jullie", portuguese: "de vocês", pronunciation: "iúli", example: "Is dit jullie auto?" },
    { lessonId: "lesson-5-2", dutch: "hun", portuguese: "deles/delas", pronunciation: "hun", example: "Dat is hun school." },
    
    // Module 6.1 additional
    { lessonId: "lesson-6-1", dutch: "vroeg", portuguese: "cedo", pronunciation: "frúch", example: "Ik sta vroeg op." },
    { lessonId: "lesson-6-1", dutch: "laat", portuguese: "tarde", pronunciation: "lát", example: "Het is laat." },
    { lessonId: "lesson-6-1", dutch: "de ochtend", portuguese: "a manhã", pronunciation: "de óchtent", example: "In de ochtend." },
    { lessonId: "lesson-6-1", dutch: "de middag", portuguese: "a tarde", pronunciation: "de mídach", example: "In de middag." },
    { lessonId: "lesson-6-1", dutch: "de avond", portuguese: "a noite", pronunciation: "de áfont", example: "In de avond." },
    { lessonId: "lesson-6-1", dutch: "de nacht", portuguese: "a madrugada/noite", pronunciation: "de nacht", example: "In de nacht." },
    
    // Module 6.2 additional
    { lessonId: "lesson-6-2", dutch: "de wind", portuguese: "o vento", pronunciation: "de vint", example: "De wind is sterk." },
    { lessonId: "lesson-6-2", dutch: "de wolk", portuguese: "a nuvem", pronunciation: "de volk", example: "Er zijn wolken." },
    { lessonId: "lesson-6-2", dutch: "mooi", portuguese: "bonito/bom (tempo)", pronunciation: "môi", example: "Het is mooi weer." },
    { lessonId: "lesson-6-2", dutch: "slecht", portuguese: "ruim", pronunciation: "slecht", example: "Het weer is slecht." },
    { lessonId: "lesson-6-2", dutch: "de lente", portuguese: "a primavera", pronunciation: "de lénte", example: "In de lente." },
    { lessonId: "lesson-6-2", dutch: "de zomer", portuguese: "o verão", pronunciation: "de zômer", example: "In de zomer." },
    { lessonId: "lesson-6-2", dutch: "de herfst", portuguese: "o outono", pronunciation: "de hérfst", example: "In de herfst." },
    { lessonId: "lesson-6-2", dutch: "de winter", portuguese: "o inverno", pronunciation: "de vínter", example: "In de winter." },
    
    // Module 7.1 additional
    { lessonId: "lesson-7-1", dutch: "lezen", portuguese: "ler", pronunciation: "lêzen", example: "Ik lees een boek." },
    { lessonId: "lesson-7-1", dutch: "schrijven", portuguese: "escrever", pronunciation: "schrêiven", example: "Ik schrijf een brief." },
    { lessonId: "lesson-7-1", dutch: "tekenen", portuguese: "desenhar", pronunciation: "têkenen", example: "Zij tekent mooi." },
    { lessonId: "lesson-7-1", dutch: "zingen", portuguese: "cantar", pronunciation: "zíngen", example: "Hij zingt goed." },
    { lessonId: "lesson-7-1", dutch: "dansen", portuguese: "dançar", pronunciation: "dánsen", example: "Wij dansen samen." },
    { lessonId: "lesson-7-1", dutch: "wandelen", portuguese: "caminhar", pronunciation: "vándelen", example: "Ik wandel in het park." },
    { lessonId: "lesson-7-1", dutch: "spelen", portuguese: "jogar/brincar", pronunciation: "spêlen", example: "Kinderen spelen buiten." },
    
    // Module 8.1 additional
    { lessonId: "lesson-8-1", dutch: "het ontbijt", portuguese: "o café da manhã", pronunciation: "ret óntbêit", example: "Ik eet ontbijt." },
    { lessonId: "lesson-8-1", dutch: "de lunch", portuguese: "o almoço", pronunciation: "de lunch", example: "Wat eet je voor lunch?" },
    { lessonId: "lesson-8-1", dutch: "het diner", portuguese: "o jantar", pronunciation: "ret dínêr", example: "Het diner is klaar." },
    { lessonId: "lesson-8-1", dutch: "de ober", portuguese: "o garçom", pronunciation: "de ôber", example: "De ober komt." },
    { lessonId: "lesson-8-1", dutch: "de rekening", portuguese: "a conta", pronunciation: "de rêkening", example: "Mag ik de rekening?" },
    { lessonId: "lesson-8-1", dutch: "de fooi", portuguese: "a gorjeta", pronunciation: "de fôi", example: "Hier is de fooi." },
    { lessonId: "lesson-8-1", dutch: "proeven", portuguese: "provar/experimentar", pronunciation: "prúven", example: "Mag ik proeven?" },
    { lessonId: "lesson-8-1", dutch: "smaken", portuguese: "ter gosto", pronunciation: "smáken", example: "Het smaakt goed." },
  ];

  const vocabWithIds = additionalVocab.map((v, idx) => ({
    id: `vocab-additional-${idx + 1}`,
    ...v,
  }));

  await db.insert(vocabulary).values(vocabWithIds);

  console.log("✅ A1 content completed!");
  console.log("Added:", allLessons.length, "new lessons");
  console.log("Added:", allLessons.reduce((sum, l) => sum + l.vocab.length, 0) + additionalVocab.length, "vocabulary words");
}

completeA1Content()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

