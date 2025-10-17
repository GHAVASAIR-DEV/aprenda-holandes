import { drizzle } from "drizzle-orm/mysql2";
import { lessons, exercises, vocabulary } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function addFinalLessons() {
  console.log("Adding final lessons to reach 500+ vocabulary words...");

  const newLessons = [
    // Module 5: Família e Relações - Lições 5.3, 5.4, 5.5
    {
      id: "lesson-5-3",
      moduleId: "mod-5",
      title: "Lição 5.3: Descrevendo Pessoas",
      description: "Adjetivos para descrever aparência física",
      orderIndex: "03",
      vocab: [
        { dutch: "groot", portuguese: "grande/alto", pronunciation: "rrôt", example: "Hij is groot." },
        { dutch: "klein", portuguese: "pequeno/baixo", pronunciation: "klêin", example: "Zij is klein." },
        { dutch: "lang", portuguese: "comprido/alto", pronunciation: "lang", example: "Lang haar." },
        { dutch: "kort", portuguese: "curto/baixo", pronunciation: "kort", example: "Kort haar." },
        { dutch: "dik", portuguese: "gordo", pronunciation: "dik", example: "De kat is dik." },
        { dutch: "dun", portuguese: "magro", pronunciation: "dun", example: "Hij is dun." },
        { dutch: "mooi", portuguese: "bonito", pronunciation: "môi", example: "Zij is mooi." },
        { dutch: "lelijk", portuguese: "feio", pronunciation: "lêlêik", example: "De hond is niet lelijk." },
        { dutch: "het haar", portuguese: "o cabelo", pronunciation: "ret hár", example: "Haar haar is blond." },
        { dutch: "de ogen", portuguese: "os olhos", pronunciation: "de ôgen", example: "Blauwe ogen." },
        { dutch: "blond", portuguese: "loiro", pronunciation: "blont", example: "Blond haar." },
        { dutch: "bruin", portuguese: "marrom/moreno", pronunciation: "brêun", example: "Bruin haar." },
        { dutch: "zwart", portuguese: "preto", pronunciation: "zvart", example: "Zwart haar." },
        { dutch: "rood", portuguese: "ruivo/vermelho", pronunciation: "rôt", example: "Rood haar." },
        { dutch: "blauw", portuguese: "azul", pronunciation: "blêu", example: "Blauwe ogen." },
        { dutch: "groen", portuguese: "verde", pronunciation: "rrún", example: "Groene ogen." },
      ],
    },
    {
      id: "lesson-5-4",
      moduleId: "mod-5",
      title: "Lição 5.4: Personalidade",
      description: "Adjetivos para descrever personalidade",
      orderIndex: "04",
      vocab: [
        { dutch: "aardig", portuguese: "simpático/legal", pronunciation: "árdech", example: "Hij is aardig." },
        { dutch: "vriendelijk", portuguese: "amigável", pronunciation: "fríndelêik", example: "Zij is vriendelijk." },
        { dutch: "grappig", portuguese: "engraçado", pronunciation: "rrápich", example: "De man is grappig." },
        { dutch: "slim", portuguese: "inteligente", pronunciation: "slim", example: "Het kind is slim." },
        { dutch: "dom", portuguese: "burro", pronunciation: "dom", example: "Hij is niet dom." },
        { dutch: "lui", portuguese: "preguiçoso", pronunciation: "lêui", example: "De kat is lui." },
        { dutch: "actief", portuguese: "ativo", pronunciation: "aktíf", example: "Zij is actief." },
        { dutch: "rustig", portuguese: "calmo", pronunciation: "rústech", example: "Hij is rustig." },
        { dutch: "druk", portuguese: "agitado/ocupado", pronunciation: "druk", example: "Ik ben druk." },
        { dutch: "verlegen", portuguese: "tímido", pronunciation: "ferlêgen", example: "Het meisje is verlegen." },
        { dutch: "sociaal", portuguese: "sociável", pronunciation: "sosiál", example: "Hij is sociaal." },
        { dutch: "eerlijk", portuguese: "honesto", pronunciation: "êrlêik", example: "Zij is eerlijk." },
      ],
    },
    {
      id: "lesson-5-5",
      moduleId: "mod-5",
      title: "Lição 5.5: Relacionamentos",
      description: "Vocabulário sobre relacionamentos",
      orderIndex: "05",
      vocab: [
        { dutch: "de vriend", portuguese: "o amigo/namorado", pronunciation: "de frínt", example: "Hij is mijn vriend." },
        { dutch: "de vriendin", portuguese: "a amiga/namorada", pronunciation: "de fríndín", example: "Zij is mijn vriendin." },
        { dutch: "de partner", portuguese: "o parceiro", pronunciation: "de pártner", example: "Mijn partner." },
        { dutch: "de collega", portuguese: "o colega", pronunciation: "de kolêrra", example: "Een collega van werk." },
        { dutch: "de buur", portuguese: "o vizinho", pronunciation: "de búr", example: "Mijn buur is aardig." },
        { dutch: "houden van", portuguese: "amar/gostar", pronunciation: "hêuden fan", example: "Ik hou van jou." },
        { dutch: "kennen", portuguese: "conhecer", pronunciation: "kénen", example: "Ik ken hem." },
        { dutch: "ontmoeten", portuguese: "encontrar", pronunciation: "óntmúten", example: "Ik ontmoet vrienden." },
        { dutch: "samen", portuguese: "juntos", pronunciation: "sámen", example: "Wij zijn samen." },
        { dutch: "alleen", portuguese: "sozinho", pronunciation: "alên", example: "Ik ben alleen." },
      ],
    },

    // Module 6: Tempo e Clima - Lições 6.3, 6.4, 6.5
    {
      id: "lesson-6-3",
      moduleId: "mod-6",
      title: "Lição 6.3: Atividades por Estação",
      description: "O que fazer em cada estação",
      orderIndex: "03",
      vocab: [
        { dutch: "schaatsen", portuguese: "patinar no gelo", pronunciation: "schátsen", example: "In winter schaatsen we." },
        { dutch: "skiën", portuguese: "esquiar", pronunciation: "skíën", example: "Ik ga skiën." },
        { dutch: "zwemmen", portuguese: "nadar", pronunciation: "zvémen", example: "In zomer zwemmen we." },
        { dutch: "picknicken", portuguese: "fazer piquenique", pronunciation: "píkníken", example: "We picknicken in het park." },
        { dutch: "wandelen", portuguese: "caminhar", pronunciation: "vándelen", example: "In herfst wandelen we." },
        { dutch: "het strand", portuguese: "a praia", pronunciation: "ret strant", example: "Ik ga naar het strand." },
        { dutch: "het park", portuguese: "o parque", pronunciation: "ret park", example: "In het park." },
        { dutch: "het bos", portuguese: "a floresta", pronunciation: "ret bos", example: "Wandelen in het bos." },
        { dutch: "de bloem", portuguese: "a flor", pronunciation: "de blúm", example: "Bloemen in de lente." },
        { dutch: "het blad", portuguese: "a folha", pronunciation: "ret blat", example: "Bladeren vallen." },
      ],
    },
    {
      id: "lesson-6-4",
      moduleId: "mod-6",
      title: "Lição 6.4: Expressões de Tempo",
      description: "Palavras para falar sobre tempo",
      orderIndex: "04",
      vocab: [
        { dutch: "nu", portuguese: "agora", pronunciation: "nú", example: "Ik ga nu." },
        { dutch: "straks", portuguese: "daqui a pouco", pronunciation: "straks", example: "Tot straks!" },
        { dutch: "later", portuguese: "mais tarde", pronunciation: "láter", example: "Zie je later." },
        { dutch: "vroeger", portuguese: "antigamente", pronunciation: "frúger", example: "Vroeger was het anders." },
        { dutch: "altijd", portuguese: "sempre", pronunciation: "áltêit", example: "Ik ben altijd thuis." },
        { dutch: "nooit", portuguese: "nunca", pronunciation: "nôit", example: "Ik ben nooit laat." },
        { dutch: "vaak", portuguese: "frequentemente", pronunciation: "fák", example: "Ik sport vaak." },
        { dutch: "soms", portuguese: "às vezes", pronunciation: "soms", example: "Soms kook ik." },
        { dutch: "de week", portuguese: "a semana", pronunciation: "de vêk", example: "Deze week." },
        { dutch: "het jaar", portuguese: "o ano", pronunciation: "ret iár", example: "Dit jaar." },
        { dutch: "de maand", portuguese: "o mês", pronunciation: "de mánt", example: "Volgende maand." },
        { dutch: "de dag", portuguese: "o dia", pronunciation: "de dach", example: "Elke dag." },
      ],
    },
    {
      id: "lesson-6-5",
      moduleId: "mod-6",
      title: "Lição 6.5: Datas e Aniversários",
      description: "Falando sobre datas",
      orderIndex: "05",
      vocab: [
        { dutch: "de verjaardag", portuguese: "o aniversário", pronunciation: "de feriárdach", example: "Mijn verjaardag is in mei." },
        { dutch: "de datum", portuguese: "a data", pronunciation: "de dátum", example: "Wat is de datum?" },
        { dutch: "het feest", portuguese: "a festa", pronunciation: "ret fêst", example: "Er is een feest." },
        { dutch: "de kaart", portuguese: "o cartão", pronunciation: "de kárt", example: "Een verjaardagskaart." },
        { dutch: "het cadeau", portuguese: "o presente", pronunciation: "ret kadô", example: "Een cadeau geven." },
        { dutch: "feliciteren", portuguese: "parabenizar", pronunciation: "felisitêren", example: "Gefeliciteerd!" },
        { dutch: "vieren", portuguese: "comemorar", pronunciation: "fíren", example: "We vieren mijn verjaardag." },
        { dutch: "de taart", portuguese: "o bolo", pronunciation: "de tárt", example: "Een verjaardagstaart." },
      ],
    },

    // Module 7: Hobbies - Lições 7.2, 7.3, 7.4, 7.5
    {
      id: "lesson-7-2",
      moduleId: "mod-7",
      title: "Lição 7.2: Música e Arte",
      description: "Vocabulário de música e arte",
      orderIndex: "02",
      vocab: [
        { dutch: "de muziek", portuguese: "a música", pronunciation: "de múzik", example: "Ik luister naar muziek." },
        { dutch: "het lied", portuguese: "a canção", pronunciation: "ret lít", example: "Een mooi lied." },
        { dutch: "de kunst", portuguese: "a arte", pronunciation: "de kunst", example: "Ik hou van kunst." },
        { dutch: "het museum", portuguese: "o museu", pronunciation: "ret músêum", example: "In het museum." },
        { dutch: "de film", portuguese: "o filme", pronunciation: "de film", example: "Een goede film." },
        { dutch: "de bioscoop", portuguese: "o cinema", pronunciation: "de bíoskôp", example: "Naar de bioscoop gaan." },
        { dutch: "het concert", portuguese: "o concerto", pronunciation: "ret kónsért", example: "Een concert bezoeken." },
        { dutch: "het theater", portuguese: "o teatro", pronunciation: "ret têáter", example: "In het theater." },
        { dutch: "de gitaar", portuguese: "o violão", pronunciation: "de rritár", example: "Gitaar spelen." },
        { dutch: "de piano", portuguese: "o piano", pronunciation: "de piáno", example: "Piano spelen." },
      ],
    },
    {
      id: "lesson-7-3",
      moduleId: "mod-7",
      title: "Lição 7.3: Verbos Modais",
      description: "Kunnen, willen, moeten, mogen",
      orderIndex: "03",
      vocab: [
        { dutch: "kunnen", portuguese: "poder/conseguir", pronunciation: "kúnen", example: "Ik kan zwemmen." },
        { dutch: "willen", portuguese: "querer", pronunciation: "vílen", example: "Ik wil leren." },
        { dutch: "moeten", portuguese: "dever/ter que", pronunciation: "múten", example: "Ik moet werken." },
        { dutch: "mogen", portuguese: "poder (permissão)", pronunciation: "môgen", example: "Mag ik binnenkomen?" },
        { dutch: "hoeven", portuguese: "precisar (negativo)", pronunciation: "húfen", example: "Ik hoef niet te gaan." },
        { dutch: "zullen", portuguese: "futuro/dever", pronunciation: "zúlen", example: "Ik zal komen." },
      ],
    },
    {
      id: "lesson-7-4",
      moduleId: "mod-7",
      title: "Lição 7.4: Expressando Preferências",
      description: "Como dizer o que você gosta",
      orderIndex: "04",
      vocab: [
        { dutch: "vinden", portuguese: "achar/encontrar", pronunciation: "fínden", example: "Wat vind je?" },
        { dutch: "denken", portuguese: "pensar/achar", pronunciation: "dénken", example: "Ik denk dat..." },
        { dutch: "geloven", portuguese: "acreditar", pronunciation: "rrelôven", example: "Ik geloof je." },
        { dutch: "hopen", portuguese: "esperar", pronunciation: "hôpen", example: "Ik hoop het." },
        { dutch: "weten", portuguese: "saber", pronunciation: "vêten", example: "Ik weet het niet." },
        { dutch: "begrijpen", portuguese: "entender", pronunciation: "berrêipen", example: "Ik begrijp het." },
        { dutch: "leuk", portuguese: "legal/divertido", pronunciation: "lêuk", example: "Dat is leuk!" },
        { dutch: "saai", portuguese: "chato/entediante", pronunciation: "sái", example: "Het is saai." },
        { dutch: "interessant", portuguese: "interessante", pronunciation: "ínteresánt", example: "Heel interessant." },
        { dutch: "belangrijk", portuguese: "importante", pronunciation: "belángrêik", example: "Dat is belangrijk." },
      ],
    },
    {
      id: "lesson-7-5",
      moduleId: "mod-7",
      title: "Lição 7.5: Frequência",
      description: "Advérbios de frequência",
      orderIndex: "05",
      vocab: [
        { dutch: "elke dag", portuguese: "todo dia", pronunciation: "élke dach", example: "Ik werk elke dag." },
        { dutch: "elke week", portuguese: "toda semana", pronunciation: "élke vêk", example: "Elke week sport ik." },
        { dutch: "twee keer", portuguese: "duas vezes", pronunciation: "tvê kêr", example: "Twee keer per week." },
        { dutch: "één keer", portuguese: "uma vez", pronunciation: "ên kêr", example: "Één keer per maand." },
        { dutch: "meestal", portuguese: "geralmente", pronunciation: "mêstal", example: "Meestal ben ik thuis." },
        { dutch: "regelmatig", portuguese: "regularmente", pronunciation: "rêgelmatich", example: "Ik sport regelmatig." },
        { dutch: "zelden", portuguese: "raramente", pronunciation: "zélden", example: "Ik kom zelden te laat." },
      ],
    },

    // Module 8: Restaurante - Lições 8.2, 8.3, 8.4, 8.5
    {
      id: "lesson-8-2",
      moduleId: "mod-8",
      title: "Lição 8.2: Bebidas",
      description: "Vocabulário de bebidas",
      orderIndex: "02",
      vocab: [
        { dutch: "de koffie", portuguese: "o café", pronunciation: "de kófi", example: "Een kop koffie." },
        { dutch: "de thee", portuguese: "o chá", pronunciation: "de tê", example: "Een kopje thee." },
        { dutch: "het water", portuguese: "a água", pronunciation: "ret váter", example: "Een glas water." },
        { dutch: "het sap", portuguese: "o suco", pronunciation: "ret sap", example: "Sinaasappelsap." },
        { dutch: "de melk", portuguese: "o leite", pronunciation: "de melk", example: "Warme melk." },
        { dutch: "het bier", portuguese: "a cerveja", pronunciation: "ret bír", example: "Een biertje." },
        { dutch: "de wijn", portuguese: "o vinho", pronunciation: "de vêin", example: "Rode wijn." },
        { dutch: "de frisdrank", portuguese: "o refrigerante", pronunciation: "de frísdrank", example: "Een frisdrank." },
        { dutch: "drinken", portuguese: "beber", pronunciation: "drínken", example: "Wat wil je drinken?" },
      ],
    },
    {
      id: "lesson-8-3",
      moduleId: "mod-8",
      title: "Lição 8.3: Sabores",
      description: "Descrevendo sabores",
      orderIndex: "03",
      vocab: [
        { dutch: "zoet", portuguese: "doce", pronunciation: "zút", example: "Het is zoet." },
        { dutch: "zout", portuguese: "salgado", pronunciation: "zêut", example: "Te zout." },
        { dutch: "zuur", portuguese: "azedo", pronunciation: "zúr", example: "Zure smaak." },
        { dutch: "bitter", portuguese: "amargo", pronunciation: "bíter", example: "Bitter eten." },
        { dutch: "pittig", portuguese: "picante", pronunciation: "pítich", example: "Pittig eten." },
        { dutch: "vers", portuguese: "fresco", pronunciation: "fers", example: "Vers brood." },
        { dutch: "oud", portuguese: "velho/passado", pronunciation: "êut", example: "Oud brood." },
        { dutch: "koud", portuguese: "frio", pronunciation: "kêut", example: "Koud water." },
        { dutch: "warm", portuguese: "quente", pronunciation: "varm", example: "Warm eten." },
      ],
    },
    {
      id: "lesson-8-4",
      moduleId: "mod-8",
      title: "Lição 8.4: Pagando a Conta",
      description: "Vocabulário para pagar",
      orderIndex: "04",
      vocab: [
        { dutch: "contant", portuguese: "em dinheiro", pronunciation: "kóntant", example: "Ik betaal contant." },
        { dutch: "pinnen", portuguese: "pagar com cartão", pronunciation: "pínen", example: "Kan ik pinnen?" },
        { dutch: "de pinpas", portuguese: "o cartão de débito", pronunciation: "de pínpas", example: "Mijn pinpas." },
        { dutch: "de creditcard", portuguese: "o cartão de crédito", pronunciation: "de krédítkart", example: "Met creditcard betalen." },
        { dutch: "het wisselgeld", portuguese: "o troco", pronunciation: "ret víselrrelt", example: "Hier is het wisselgeld." },
        { dutch: "de bon", portuguese: "o recibo", pronunciation: "de bon", example: "Mag ik een bon?" },
        { dutch: "samen", portuguese: "junto", pronunciation: "sámen", example: "Samen of apart?" },
        { dutch: "apart", portuguese: "separado", pronunciation: "apárt", example: "We betalen apart." },
      ],
    },
    {
      id: "lesson-8-5",
      moduleId: "mod-8",
      title: "Lição 8.5: Revisão A1",
      description: "Revisão geral do nível A1",
      orderIndex: "05",
      vocab: [
        { dutch: "bedankt", portuguese: "obrigado", pronunciation: "bedánkt", example: "Bedankt voor alles!" },
        { dutch: "alstublieft", portuguese: "por favor (formal)", pronunciation: "alstúblíft", example: "Alstublieft, meneer." },
        { dutch: "sorry", portuguese: "desculpa", pronunciation: "sóri", example: "Sorry, ik ben laat." },
        { dutch: "pardon", portuguese: "com licença", pronunciation: "pardón", example: "Pardon, mag ik erdoor?" },
        { dutch: "graag gedaan", portuguese: "de nada", pronunciation: "rráach rredán", example: "Graag gedaan!" },
        { dutch: "tot ziens", portuguese: "até logo", pronunciation: "tot zíns", example: "Tot ziens!" },
        { dutch: "dag", portuguese: "tchau", pronunciation: "dach", example: "Dag, tot morgen!" },
        { dutch: "welkom", portuguese: "bem-vindo", pronunciation: "vélkom", example: "Welkom in Nederland!" },
      ],
    },
  ];

  // Add all lessons and vocabulary
  for (const lessonData of newLessons) {
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
      {
        id: `ex-${lessonInfo.id}-2`,
        lessonId: lessonInfo.id,
        type: "fill_blank",
        question: `Complete a frase com a palavra correta`,
        options: JSON.stringify([vocab[0].dutch, vocab[1]?.dutch || "outra", "incorreta1", "incorreta2"]),
        correctAnswer: vocab[0].dutch,
        explanation: `A resposta correta é '${vocab[0].dutch}'.`,
        orderIndex: "02",
      },
    ]);
  }

  const totalVocab = newLessons.reduce((sum, l) => sum + l.vocab.length, 0);
  console.log("✅ Final A1 lessons added!");
  console.log("Added:", newLessons.length, "new lessons");
  console.log("Added:", totalVocab, "vocabulary words");
}

addFinalLessons()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

