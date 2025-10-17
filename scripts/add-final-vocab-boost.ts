import { drizzle } from "drizzle-orm/mysql2";
import { vocabulary } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function addFinalVocabBoost() {
  console.log("Adding final vocabulary boost to reach 500+ words...");

  const finalVocab = [
    // General useful words distributed across lessons
    { lessonId: "lesson-1-1", dutch: "zeggen", portuguese: "dizer", pronunciation: "zégen", example: "Wat zeg je?" },
    { lessonId: "lesson-1-2", dutch: "horen", portuguese: "ouvir", pronunciation: "hôren", example: "Ik hoor je." },
    { lessonId: "lesson-1-3", dutch: "tien", portuguese: "dez", pronunciation: "tín", example: "Tien euro." },
    { lessonId: "lesson-1-3", dutch: "elf", portuguese: "onze", pronunciation: "elf", example: "Elf uur." },
    { lessonId: "lesson-1-3", dutch: "twaalf", portuguese: "doze", pronunciation: "tválf", example: "Twaalf maanden." },
    { lessonId: "lesson-1-4", dutch: "de week", portuguese: "a semana", pronunciation: "de vêk", example: "Deze week." },
    
    { lessonId: "lesson-2-1", dutch: "iemand", portuguese: "alguém", pronunciation: "ímant", example: "Iemand is er." },
    { lessonId: "lesson-2-1", dutch: "niemand", portuguese: "ninguém", pronunciation: "nímant", example: "Niemand is thuis." },
    { lessonId: "lesson-2-2", dutch: "misschien", portuguese: "talvez", pronunciation: "míschín", example: "Misschien morgen." },
    { lessonId: "lesson-2-2", dutch: "natuurlijk", portuguese: "claro/naturalmente", pronunciation: "natúrlêik", example: "Natuurlijk!" },
    { lessonId: "lesson-2-3", dutch: "nodig", portuguese: "necessário", pronunciation: "nôdech", example: "Ik heb hulp nodig." },
    { lessonId: "lesson-2-3", dutch: "de hulp", portuguese: "a ajuda", pronunciation: "de hulp", example: "Dank voor je hulp." },
    { lessonId: "lesson-2-4", dutch: "spreken", portuguese: "falar", pronunciation: "sprêken", example: "Ik spreek Nederlands." },
    { lessonId: "lesson-2-4", dutch: "verstaan", portuguese: "entender", pronunciation: "ferstán", example: "Ik versta je niet." },
    { lessonId: "lesson-2-5", dutch: "verdienen", portuguese: "ganhar (dinheiro)", pronunciation: "ferdínen", example: "Geld verdienen." },
    
    { lessonId: "lesson-3-1", dutch: "het ding", portuguese: "a coisa", pronunciation: "ret ding", example: "Wat is dat ding?" },
    { lessonId: "lesson-3-1", dutch: "het voorwerp", portuguese: "o objeto", pronunciation: "ret fôrvérp", example: "Een voorwerp pakken." },
    { lessonId: "lesson-3-2", dutch: "het brood", portuguese: "o pão", pronunciation: "ret brôt", example: "Vers brood." },
    { lessonId: "lesson-3-2", dutch: "de boter", portuguese: "a manteiga", pronunciation: "de bôter", example: "Boter op brood." },
    { lessonId: "lesson-3-2", dutch: "de kaas", portuguese: "o queijo", pronunciation: "de kás", example: "Nederlandse kaas." },
    { lessonId: "lesson-3-2", dutch: "het ei", portuguese: "o ovo", pronunciation: "ret êi", example: "Een gekookt ei." },
    { lessonId: "lesson-3-2", dutch: "de suiker", portuguese: "o açúcar", pronunciation: "de sêuiker", example: "Met suiker." },
    { lessonId: "lesson-3-2", dutch: "het zout", portuguese: "o sal", pronunciation: "ret zêut", example: "Zout en peper." },
    { lessonId: "lesson-3-3", dutch: "de schoen", portuguese: "o sapato", pronunciation: "de schún", example: "Nieuwe schoenen." },
    { lessonId: "lesson-3-3", dutch: "de laars", portuguese: "a bota", pronunciation: "de lárs", example: "Hoge laarzen." },
    { lessonId: "lesson-3-4", dutch: "de trap", portuguese: "a escada", pronunciation: "de trap", example: "Op de trap." },
    { lessonId: "lesson-3-4", dutch: "de garage", portuguese: "a garagem", pronunciation: "de rrarárre", example: "De auto in de garage." },
    { lessonId: "lesson-3-5", dutch: "beginnen", portuguese: "começar", pronunciation: "berrrínen", example: "We beginnen nu." },
    { lessonId: "lesson-3-5", dutch: "stoppen", portuguese: "parar", pronunciation: "stópen", example: "Stop!" },
    
    { lessonId: "lesson-4-1", dutch: "het gebouw", portuguese: "o prédio", pronunciation: "ret rrebêu", example: "Een hoog gebouw." },
    { lessonId: "lesson-4-1", dutch: "de toren", portuguese: "a torre", pronunciation: "de tôren", example: "De kerktoren." },
    { lessonId: "lesson-4-2", dutch: "instappen", portuguese: "embarcar", pronunciation: "ínstapen", example: "Instappen alstublieft!" },
    { lessonId: "lesson-4-2", dutch: "uitstappen", portuguese: "desembarcar", pronunciation: "êutstapen", example: "Hier uitstappen." },
    { lessonId: "lesson-4-3", dutch: "vinden", portuguese: "encontrar/achar", pronunciation: "fínden", example: "Ik kan het niet vinden." },
    { lessonId: "lesson-4-3", dutch: "verdwalen", portuguese: "se perder", pronunciation: "ferdválen", example: "Ik ben verdwaald." },
    { lessonId: "lesson-4-4", dutch: "de aanbieding", portuguese: "a oferta", pronunciation: "de ánbíding", example: "In de aanbieding." },
    { lessonId: "lesson-4-5", dutch: "de bank", portuguese: "o banco", pronunciation: "de bank", example: "Naar de bank gaan." },
    
    { lessonId: "lesson-5-1", dutch: "de generatie", portuguese: "a geração", pronunciation: "de rrenerátsie", example: "Jonge generatie." },
    { lessonId: "lesson-5-2", dutch: "van", portuguese: "de", pronunciation: "fan", example: "Het huis van mijn vader." },
    { lessonId: "lesson-5-3", dutch: "knap", portuguese: "bonito/inteligente", pronunciation: "knap", example: "Een knappe man." },
    { lessonId: "lesson-5-4", dutch: "braaf", portuguese: "bem-comportado", pronunciation: "bráf", example: "Een braaf kind." },
    { lessonId: "lesson-5-5", dutch: "de liefde", portuguese: "o amor", pronunciation: "de lífde", example: "Liefde is mooi." },
    
    { lessonId: "lesson-6-1", dutch: "de seconde", portuguese: "o segundo", pronunciation: "de sekónde", example: "Vijf seconden." },
    { lessonId: "lesson-6-2", dutch: "de donder", portuguese: "o trovão", pronunciation: "de dónder", example: "Donder en bliksem." },
    { lessonId: "lesson-6-2", dutch: "de bliksem", portuguese: "o relâmpago", pronunciation: "de blíksem", example: "Bliksem in de lucht." },
    { lessonId: "lesson-6-3", dutch: "de zee", portuguese: "o mar", pronunciation: "de zê", example: "Aan zee." },
    { lessonId: "lesson-6-4", dutch: "ooit", portuguese: "alguma vez", pronunciation: "ôit", example: "Ben je ooit in Nederland geweest?" },
    { lessonId: "lesson-6-5", dutch: "de uitnodiging", portuguese: "o convite", pronunciation: "de êutnôdiging", example: "Een uitnodiging krijgen." },
    
    { lessonId: "lesson-7-1", dutch: "winnen", portuguese: "ganhar/vencer", pronunciation: "vínen", example: "Ons team wint." },
    { lessonId: "lesson-7-1", dutch: "verliezen", portuguese: "perder", pronunciation: "ferlízen", example: "We verliezen." },
    { lessonId: "lesson-7-2", dutch: "de dans", portuguese: "a dança", pronunciation: "de dans", example: "Een mooie dans." },
    { lessonId: "lesson-7-3", dutch: "makkelijk", portuguese: "fácil", pronunciation: "mákkelêik", example: "Het is makkelijk." },
    { lessonId: "lesson-7-3", dutch: "moeilijk", portuguese: "difícil", pronunciation: "múielêik", example: "Het is moeilijk." },
    { lessonId: "lesson-7-4", dutch: "geweldig", portuguese: "incrível", pronunciation: "rrevéldech", example: "Dat is geweldig!" },
    { lessonId: "lesson-7-5", dutch: "bijna", portuguese: "quase", pronunciation: "bêina", example: "Bijna klaar." },
    
    { lessonId: "lesson-8-1", dutch: "serveren", portuguese: "servir", pronunciation: "serfêren", example: "Het eten serveren." },
    { lessonId: "lesson-8-2", dutch: "schenken", portuguese: "servir (bebida)", pronunciation: "schénken", example: "Wijn schenken." },
    { lessonId: "lesson-8-3", dutch: "proeven", portuguese: "provar", pronunciation: "prúven", example: "Mag ik proeven?" },
    { lessonId: "lesson-8-4", dutch: "het wisselgeld", portuguese: "o troco", pronunciation: "ret víselrrelt", example: "Hou het wisselgeld." },
    { lessonId: "lesson-8-5", dutch: "doei", portuguese: "tchau (informal)", pronunciation: "dúi", example: "Doei!" },
    
    // Additional essential words
    { lessonId: "lesson-1-1", dutch: "ja", portuguese: "sim", pronunciation: "iá", example: "Ja, dat klopt." },
    { lessonId: "lesson-1-1", dutch: "nee", portuguese: "não", pronunciation: "nê", example: "Nee, bedankt." },
    { lessonId: "lesson-1-2", dutch: "alsjeblieft", portuguese: "por favor (informal)", pronunciation: "alsiebléft", example: "Alsjeblieft!" },
    { lessonId: "lesson-2-1", dutch: "iets", portuguese: "algo", pronunciation: "íts", example: "Iets te eten." },
    { lessonId: "lesson-2-1", dutch: "niets", portuguese: "nada", pronunciation: "níts", example: "Niets te doen." },
    { lessonId: "lesson-3-1", dutch: "alles", portuguese: "tudo", pronunciation: "áles", example: "Alles is goed." },
    { lessonId: "lesson-3-2", dutch: "gezond", portuguese: "saudável", pronunciation: "rrezónt", example: "Gezond eten." },
    { lessonId: "lesson-4-1", dutch: "open", portuguese: "aberto", pronunciation: "ôpen", example: "De winkel is open." },
    { lessonId: "lesson-4-1", dutch: "dicht", portuguese: "fechado", pronunciation: "dicht", example: "De deur is dicht." },
    { lessonId: "lesson-5-1", dutch: "de liefde", portuguese: "o amor", pronunciation: "de lífde", example: "Liefde is belangrijk." },
    { lessonId: "lesson-6-1", dutch: "precies", portuguese: "exatamente", pronunciation: "presís", example: "Precies op tijd." },
    { lessonId: "lesson-7-1", dutch: "de wedstrijd", portuguese: "a partida/jogo", pronunciation: "de vétstrêit", example: "Een voetbalwedstrijd." },
    { lessonId: "lesson-8-1", dutch: "klaar", portuguese: "pronto", pronunciation: "klár", example: "Het eten is klaar." },
  ];

  const vocabWithIds = finalVocab.map((v, idx) => ({
    id: `vocab-final-${idx + 1}`,
    ...v,
  }));

  await db.insert(vocabulary).values(vocabWithIds);

  console.log("✅ Final vocabulary boost added!");
  console.log("Added:", finalVocab.length, "vocabulary words");
}

addFinalVocabBoost()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

