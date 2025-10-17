import { drizzle } from "drizzle-orm/mysql2";
import { vocabulary } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function addSupplementaryVocab() {
  console.log("Adding supplementary vocabulary to reach 500+ words...");

  // Distribute vocabulary across existing lessons
  const supplementaryVocab = [
    // Module 1 additions
    { lessonId: "lesson-1-1", dutch: "het alfabet", portuguese: "o alfabeto", pronunciation: "ret álfabét", example: "Het Nederlandse alfabet." },
    { lessonId: "lesson-1-1", dutch: "de letter", portuguese: "a letra", pronunciation: "de léter", example: "Een letter schrijven." },
    { lessonId: "lesson-1-1", dutch: "spellen", portuguese: "soletrar", pronunciation: "spélen", example: "Kun je dat spellen?" },
    { lessonId: "lesson-1-2", dutch: "hallo", portuguese: "olá", pronunciation: "hálo", example: "Hallo, hoe gaat het?" },
    { lessonId: "lesson-1-2", dutch: "tot later", portuguese: "até mais tarde", pronunciation: "tot láter", example: "Tot later!" },
    { lessonId: "lesson-1-2", dutch: "prettig", portuguese: "prazer", pronunciation: "prétich", example: "Prettig kennis te maken." },
    { lessonId: "lesson-1-2", dutch: "aangenaam", portuguese: "prazer (em conhecer)", pronunciation: "ánrrenám", example: "Aangenaam!" },
    { lessonId: "lesson-1-3", dutch: "tellen", portuguese: "contar", pronunciation: "télen", example: "Ik kan tellen." },
    { lessonId: "lesson-1-3", dutch: "het nummer", portuguese: "o número", pronunciation: "ret númer", example: "Mijn telefoonnummer." },
    { lessonId: "lesson-1-4", dutch: "de kalender", portuguese: "o calendário", pronunciation: "de kalénder", example: "Kijk in de kalender." },
    { lessonId: "lesson-1-4", dutch: "de afspraak", portuguese: "o compromisso", pronunciation: "de áfsprák", example: "Ik heb een afspraak." },

    // Module 2 additions
    { lessonId: "lesson-2-1", dutch: "wij", portuguese: "nós", pronunciation: "vêi", example: "Wij zijn vrienden." },
    { lessonId: "lesson-2-1", dutch: "zij", portuguese: "eles/elas", pronunciation: "zêi", example: "Zij komen morgen." },
    { lessonId: "lesson-2-1", dutch: "het", portuguese: "ele/ela (neutro)", pronunciation: "ret", example: "Het is mooi." },
    { lessonId: "lesson-2-2", dutch: "waar", portuguese: "onde", pronunciation: "vár", example: "Waar ben je?" },
    { lessonId: "lesson-2-2", dutch: "wie", portuguese: "quem", pronunciation: "ví", example: "Wie is dat?" },
    { lessonId: "lesson-2-2", dutch: "wat", portuguese: "o que", pronunciation: "vat", example: "Wat is dit?" },
    { lessonId: "lesson-2-2", dutch: "wanneer", portuguese: "quando", pronunciation: "vanêr", example: "Wanneer kom je?" },
    { lessonId: "lesson-2-2", dutch: "waarom", portuguese: "por que", pronunciation: "várôm", example: "Waarom niet?" },
    { lessonId: "lesson-2-2", dutch: "hoe", portuguese: "como", pronunciation: "hú", example: "Hoe heet je?" },
    { lessonId: "lesson-2-3", dutch: "de auto", portuguese: "o carro", pronunciation: "de êuto", example: "Ik heb een auto." },
    { lessonId: "lesson-2-3", dutch: "de fiets", portuguese: "a bicicleta", pronunciation: "de fíts", example: "Een nieuwe fiets." },
    { lessonId: "lesson-2-3", dutch: "het huis", portuguese: "a casa", pronunciation: "ret hêus", example: "Een groot huis." },
    { lessonId: "lesson-2-4", dutch: "het paspoort", portuguese: "o passaporte", pronunciation: "ret páspôrt", example: "Mijn paspoort." },
    { lessonId: "lesson-2-4", dutch: "de taal", portuguese: "a língua/idioma", pronunciation: "de tál", example: "Welke taal spreek je?" },
    { lessonId: "lesson-2-5", dutch: "de baas", portuguese: "o chefe", pronunciation: "de bás", example: "Mijn baas is aardig." },
    { lessonId: "lesson-2-5", dutch: "het kantoor", portuguese: "o escritório", pronunciation: "ret kantôr", example: "Op kantoor." },

    // Module 3 additions
    { lessonId: "lesson-3-1", dutch: "wit", portuguese: "branco", pronunciation: "vit", example: "Wit papier." },
    { lessonId: "lesson-3-1", dutch: "grijs", portuguese: "cinza", pronunciation: "rrêis", example: "Grijze lucht." },
    { lessonId: "lesson-3-1", dutch: "roze", portuguese: "rosa", pronunciation: "rôze", example: "Roze bloemen." },
    { lessonId: "lesson-3-1", dutch: "paars", portuguese: "roxo", pronunciation: "párs", example: "Paarse druiven." },
    { lessonId: "lesson-3-1", dutch: "de kleur", portuguese: "a cor", pronunciation: "de klêur", example: "Mijn favoriete kleur." },
    { lessonId: "lesson-3-2", dutch: "het vlees", portuguese: "a carne", pronunciation: "ret flês", example: "Ik eet geen vlees." },
    { lessonId: "lesson-3-2", dutch: "de vis", portuguese: "o peixe", pronunciation: "de fis", example: "Verse vis." },
    { lessonId: "lesson-3-2", dutch: "de groente", portuguese: "o legume/verdura", pronunciation: "de rrúnte", example: "Groente is gezond." },
    { lessonId: "lesson-3-2", dutch: "het fruit", portuguese: "a fruta", pronunciation: "ret frêut", example: "Vers fruit." },
    { lessonId: "lesson-3-2", dutch: "de appel", portuguese: "a maçã", pronunciation: "de ápel", example: "Een rode appel." },
    { lessonId: "lesson-3-2", dutch: "de banaan", portuguese: "a banana", pronunciation: "de banán", example: "Een gele banaan." },
    { lessonId: "lesson-3-2", dutch: "de sinaasappel", portuguese: "a laranja", pronunciation: "de sinásápel", example: "Sinaasappelsap." },
    { lessonId: "lesson-3-2", dutch: "de aardappel", portuguese: "a batata", pronunciation: "de ártápel", example: "Gekookte aardappelen." },
    { lessonId: "lesson-3-2", dutch: "de tomaat", portuguese: "o tomate", pronunciation: "de tomát", example: "Rode tomaten." },
    { lessonId: "lesson-3-2", dutch: "de ui", portuguese: "a cebola", pronunciation: "de êui", example: "Een ui snijden." },
    { lessonId: "lesson-3-3", dutch: "de kleren", portuguese: "as roupas", pronunciation: "de klêren", example: "Nieuwe kleren." },
    { lessonId: "lesson-3-3", dutch: "de rok", portuguese: "a saia", pronunciation: "de rok", example: "Een korte rok." },
    { lessonId: "lesson-3-3", dutch: "de trui", portuguese: "o suéter", pronunciation: "de trêui", example: "Een warme trui." },
    { lessonId: "lesson-3-4", dutch: "de deur", portuguese: "a porta", pronunciation: "de dêur", example: "De deur is open." },
    { lessonId: "lesson-3-4", dutch: "het raam", portuguese: "a janela", pronunciation: "ret rám", example: "Het raam is dicht." },
    { lessonId: "lesson-3-4", dutch: "de vloer", portuguese: "o chão", pronunciation: "de flúr", example: "Op de vloer." },
    { lessonId: "lesson-3-4", dutch: "het plafond", portuguese: "o teto", pronunciation: "ret pláfont", example: "Het plafond is wit." },
    { lessonId: "lesson-3-4", dutch: "de muur", portuguese: "a parede", pronunciation: "de múr", example: "Aan de muur." },
    { lessonId: "lesson-3-5", dutch: "eten", portuguese: "comer", pronunciation: "êten", example: "Ik eet brood." },
    { lessonId: "lesson-3-5", dutch: "drinken", portuguese: "beber", pronunciation: "drínken", example: "Ik drink water." },
    { lessonId: "lesson-3-5", dutch: "slapen", portuguese: "dormir", pronunciation: "slápen", example: "Ik slaap goed." },
    { lessonId: "lesson-3-5", dutch: "spelen", portuguese: "jogar/brincar", pronunciation: "spêlen", example: "Kinderen spelen." },

    // Module 4 additions
    { lessonId: "lesson-4-1", dutch: "de stad", portuguese: "a cidade", pronunciation: "de stat", example: "Amsterdam is een stad." },
    { lessonId: "lesson-4-1", dutch: "het dorp", portuguese: "a vila", pronunciation: "ret dorp", example: "Een klein dorp." },
    { lessonId: "lesson-4-1", dutch: "de brug", portuguese: "a ponte", pronunciation: "de bruch", example: "Over de brug." },
    { lessonId: "lesson-4-1", dutch: "het plein", portuguese: "a praça", pronunciation: "ret plêin", example: "Op het plein." },
    { lessonId: "lesson-4-2", dutch: "de reis", portuguese: "a viagem", pronunciation: "de rêis", example: "Een lange reis." },
    { lessonId: "lesson-4-2", dutch: "de passagier", portuguese: "o passageiro", pronunciation: "de pásarrír", example: "De passagiers." },
    { lessonId: "lesson-4-2", dutch: "de chauffeur", portuguese: "o motorista", pronunciation: "de shofêur", example: "De buschauffeur." },
    { lessonId: "lesson-4-3", dutch: "de kaart", portuguese: "o mapa", pronunciation: "de kárt", example: "Op de kaart." },
    { lessonId: "lesson-4-3", dutch: "de weg", portuguese: "o caminho", pronunciation: "de vech", example: "De weg naar huis." },
    { lessonId: "lesson-4-3", dutch: "zoeken", portuguese: "procurar", pronunciation: "zúken", example: "Ik zoek de straat." },
    { lessonId: "lesson-4-4", dutch: "de boodschappen", portuguese: "as compras", pronunciation: "de bôtschapen", example: "Boodschappen doen." },
    { lessonId: "lesson-4-4", dutch: "de kassa", portuguese: "o caixa", pronunciation: "de kása", example: "Bij de kassa." },
    { lessonId: "lesson-4-4", dutch: "de zak", portuguese: "a sacola", pronunciation: "de zak", example: "Een plastic zak." },
    { lessonId: "lesson-4-5", dutch: "de portemonnee", portuguese: "a carteira", pronunciation: "de pórtemóne", example: "Mijn portemonnee." },
    { lessonId: "lesson-4-5", dutch: "de bankpas", portuguese: "o cartão do banco", pronunciation: "de bánkpas", example: "Met de bankpas betalen." },

    // Module 5 additions
    { lessonId: "lesson-5-1", dutch: "de schoonfamilie", portuguese: "a família do cônjuge", pronunciation: "de schônfamíli", example: "Mijn schoonfamilie." },
    { lessonId: "lesson-5-1", dutch: "de schoonmoeder", portuguese: "a sogra", pronunciation: "de schônmúder", example: "Mijn schoonmoeder." },
    { lessonId: "lesson-5-1", dutch: "de schoonvader", portuguese: "o sogro", pronunciation: "de schônfáder", example: "Mijn schoonvader." },
    { lessonId: "lesson-5-2", dutch: "het bezit", portuguese: "a posse", pronunciation: "ret bezít", example: "Mijn bezit." },
    { lessonId: "lesson-5-3", dutch: "de bril", portuguese: "os óculos", pronunciation: "de bril", example: "Hij draagt een bril." },
    { lessonId: "lesson-5-3", dutch: "de baard", portuguese: "a barba", pronunciation: "de bárt", example: "Een lange baard." },
    { lessonId: "lesson-5-3", dutch: "de snor", portuguese: "o bigode", pronunciation: "de snor", example: "Een dikke snor." },
    { lessonId: "lesson-5-4", dutch: "geduldig", portuguese: "paciente", pronunciation: "rredúldech", example: "Zij is geduldig." },
    { lessonId: "lesson-5-4", dutch: "ongeduldig", portuguese: "impaciente", pronunciation: "onrredúldech", example: "Hij is ongeduldig." },
    { lessonId: "lesson-5-5", dutch: "trouwen", portuguese: "casar", pronunciation: "trêuen", example: "Zij gaan trouwen." },
    { lessonId: "lesson-5-5", dutch: "scheiden", portuguese: "divorciar", pronunciation: "schêiden", example: "Ze zijn gescheiden." },

    // Module 6 additions
    { lessonId: "lesson-6-1", dutch: "de klok", portuguese: "o relógio", pronunciation: "de klok", example: "Op de klok kijken." },
    { lessonId: "lesson-6-1", dutch: "de tijd", portuguese: "o tempo/hora", pronunciation: "de têit", example: "Heb je tijd?" },
    { lessonId: "lesson-6-2", dutch: "de temperatuur", portuguese: "a temperatura", pronunciation: "de témperatúr", example: "De temperatuur is laag." },
    { lessonId: "lesson-6-2", dutch: "de graad", portuguese: "o grau", pronunciation: "de rrát", example: "Tien graden." },
    { lessonId: "lesson-6-3", dutch: "de vakantie", portuguese: "as férias", pronunciation: "de fakánsi", example: "Op vakantie gaan." },
    { lessonId: "lesson-6-3", dutch: "de sneeuwpop", portuguese: "o boneco de neve", pronunciation: "de snêupop", example: "Een sneeuwpop maken." },
    { lessonId: "lesson-6-4", dutch: "binnenkort", portuguese: "em breve", pronunciation: "bínenkort", example: "Binnenkort kom ik." },
    { lessonId: "lesson-6-4", dutch: "onlangs", portuguese: "recentemente", pronunciation: "ónlangs", example: "Onlangs was ik daar." },
    { lessonId: "lesson-6-5", dutch: "de kaars", portuguese: "a vela", pronunciation: "de kárs", example: "Kaarsen aansteken." },
    { lessonId: "lesson-6-5", dutch: "het cadeaupapier", portuguese: "o papel de presente", pronunciation: "ret kadôpapír", example: "Mooi cadeaupapier." },

    // Module 7 additions
    { lessonId: "lesson-7-1", dutch: "de trainer", portuguese: "o treinador", pronunciation: "de trêner", example: "De voetbaltrainer." },
    { lessonId: "lesson-7-1", dutch: "het team", portuguese: "o time", pronunciation: "ret tím", example: "Ons team wint." },
    { lessonId: "lesson-7-2", dutch: "de zanger", portuguese: "o cantor", pronunciation: "de zánger", example: "Een beroemde zanger." },
    { lessonId: "lesson-7-2", dutch: "de acteur", portuguese: "o ator", pronunciation: "de aktêur", example: "Een goede acteur." },
    { lessonId: "lesson-7-3", dutch: "proberen", portuguese: "tentar", pronunciation: "probêren", example: "Ik probeer het." },
    { lessonId: "lesson-7-4", dutch: "menen", portuguese: "querer dizer", pronunciation: "mênen", example: "Wat meen je?" },
    { lessonId: "lesson-7-5", dutch: "dagelijks", portuguese: "diariamente", pronunciation: "dárrelêiks", example: "Dagelijks sporten." },

    // Module 8 additions
    { lessonId: "lesson-8-1", dutch: "de reservering", portuguese: "a reserva", pronunciation: "de reserfêring", example: "Een reservering maken." },
    { lessonId: "lesson-8-1", dutch: "het gerecht", portuguese: "o prato", pronunciation: "ret rrerecht", example: "Een lekker gerecht." },
    { lessonId: "lesson-8-2", dutch: "de fles", portuguese: "a garrafa", pronunciation: "de fles", example: "Een fles wijn." },
    { lessonId: "lesson-8-2", dutch: "het glas", portuguese: "o copo", pronunciation: "ret rrlas", example: "Een glas water." },
    { lessonId: "lesson-8-3", dutch: "de smaak", portuguese: "o sabor", pronunciation: "de smák", example: "Een goede smaak." },
    { lessonId: "lesson-8-3", dutch: "ruiken", portuguese: "cheirar", pronunciation: "rêuiken", example: "Lekker ruiken." },
    { lessonId: "lesson-8-4", dutch: "de korting", portuguese: "o desconto", pronunciation: "de kórting", example: "Tien procent korting." },
    { lessonId: "lesson-8-5", dutch: "dankjewel", portuguese: "muito obrigado", pronunciation: "dánkievel", example: "Dankjewel!" },
    { lessonId: "lesson-8-5", dutch: "tot morgen", portuguese: "até amanhã", pronunciation: "tot mórguen", example: "Tot morgen!" },
    { lessonId: "lesson-8-5", dutch: "het beste", portuguese: "tudo de bom", pronunciation: "ret béste", example: "Het beste!" },
  ];

  const vocabWithIds = supplementaryVocab.map((v, idx) => ({
    id: `vocab-supp-${idx + 1}`,
    ...v,
  }));

  await db.insert(vocabulary).values(vocabWithIds);

  console.log("✅ Supplementary vocabulary added!");
  console.log("Added:", supplementaryVocab.length, "vocabulary words");
}

addSupplementaryVocab()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

