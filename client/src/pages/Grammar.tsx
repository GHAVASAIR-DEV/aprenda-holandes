import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { VerbConjugation } from "@/components/VerbConjugation";
import { MobileMenu } from "@/components/MobileMenu";

export default function Grammar() {

  const verbZijn = {
    verb: "zijn",
    translation: "ser/estar",
    conjugations: [
      { pronoun: "ik", conjugation: "ben", portuguese: "eu sou/estou", example: "Ik ben student" },
      { pronoun: "jij/je", conjugation: "bent", portuguese: "você é/está", example: "Jij bent aardig" },
      { pronoun: "u", conjugation: "bent/is", portuguese: "senhor(a) é/está", example: "U bent welkom" },
      { pronoun: "hij", conjugation: "is", portuguese: "ele é/está", example: "Hij is leraar" },
      { pronoun: "zij/ze", conjugation: "is", portuguese: "ela é/está", example: "Zij is mooi" },
      { pronoun: "het", conjugation: "is", portuguese: "ele/ela é/está (neutro)", example: "Het is koud" },
      { pronoun: "wij/we", conjugation: "zijn", portuguese: "nós somos/estamos", example: "Wij zijn thuis" },
      { pronoun: "jullie", conjugation: "zijn", portuguese: "vocês são/estão", example: "Jullie zijn laat" },
      { pronoun: "zij/ze", conjugation: "zijn", portuguese: "eles/elas são/estão", example: "Zij zijn studenten" },
    ],
  };

  const verbHebben = {
    verb: "hebben",
    translation: "ter",
    conjugations: [
      { pronoun: "ik", conjugation: "heb", portuguese: "eu tenho", example: "Ik heb een hond" },
      { pronoun: "jij/je", conjugation: "hebt", portuguese: "você tem", example: "Jij hebt gelijk" },
      { pronoun: "u", conjugation: "hebt/heeft", portuguese: "senhor(a) tem", example: "U hebt tijd" },
      { pronoun: "hij", conjugation: "heeft", portuguese: "ele tem", example: "Hij heeft een auto" },
      { pronoun: "zij/ze", conjugation: "heeft", portuguese: "ela tem", example: "Zij heeft honger" },
      { pronoun: "het", conjugation: "heeft", portuguese: "ele/ela tem (neutro)", example: "Het heeft tijd" },
      { pronoun: "wij/we", conjugation: "hebben", portuguese: "nós temos", example: "Wij hebben kinderen" },
      { pronoun: "jullie", conjugation: "hebben", portuguese: "vocês têm", example: "Jullie hebben geluk" },
      { pronoun: "zij/ze", conjugation: "hebben", portuguese: "eles/elas têm", example: "Zij hebben een huis" },
    ],
  };

  const verbGaan = {
    verb: "gaan",
    translation: "ir",
    conjugations: [
      { pronoun: "ik", conjugation: "ga", portuguese: "eu vou", example: "Ik ga naar school" },
      { pronoun: "jij/je", conjugation: "gaat", portuguese: "você vai", example: "Jij gaat naar huis" },
      { pronoun: "u", conjugation: "gaat", portuguese: "senhor(a) vai", example: "U gaat naar Amsterdam" },
      { pronoun: "hij", conjugation: "gaat", portuguese: "ele vai", example: "Hij gaat werken" },
      { pronoun: "zij/ze", conjugation: "gaat", portuguese: "ela vai", example: "Zij gaat studeren" },
      { pronoun: "het", conjugation: "gaat", portuguese: "ele/ela vai (neutro)", example: "Het gaat goed" },
      { pronoun: "wij/we", conjugation: "gaan", portuguese: "nós vamos", example: "Wij gaan eten" },
      { pronoun: "jullie", conjugation: "gaan", portuguese: "vocês vão", example: "Jullie gaan zwemmen" },
      { pronoun: "zij/ze", conjugation: "gaan", portuguese: "eles/elas vão", example: "Zij gaan naar de stad" },
    ],
  };

  const verbDoen = {
    verb: "doen",
    translation: "fazer",
    conjugations: [
      { pronoun: "ik", conjugation: "doe", portuguese: "eu faço", example: "Ik doe mijn huiswerk" },
      { pronoun: "jij/je", conjugation: "doet", portuguese: "você faz", example: "Jij doet het goed" },
      { pronoun: "u", conjugation: "doet", portuguese: "senhor(a) faz", example: "U doet uw best" },
      { pronoun: "hij", conjugation: "doet", portuguese: "ele faz", example: "Hij doet de boodschappen" },
      { pronoun: "zij/ze", conjugation: "doet", portuguese: "ela faz", example: "Zij doet de was" },
      { pronoun: "het", conjugation: "doet", portuguese: "ele/ela faz (neutro)", example: "Het doet pijn" },
      { pronoun: "wij/we", conjugation: "doen", portuguese: "nós fazemos", example: "Wij doen de afwas" },
      { pronoun: "jullie", conjugation: "doen", portuguese: "vocês fazem", example: "Jullie doen mee" },
      { pronoun: "zij/ze", conjugation: "doen", portuguese: "eles/elas fazem", example: "Zij doen hun werk" },
    ],
  };

  const verbKunnen = {
    verb: "kunnen",
    translation: "poder/saber",
    conjugations: [
      { pronoun: "ik", conjugation: "kan", portuguese: "eu posso/sei", example: "Ik kan zwemmen" },
      { pronoun: "jij/je", conjugation: "kunt/kan", portuguese: "você pode/sabe", example: "Jij kunt Nederlands spreken" },
      { pronoun: "u", conjugation: "kunt/kan", portuguese: "senhor(a) pode/sabe", example: "U kunt hier zitten" },
      { pronoun: "hij", conjugation: "kan", portuguese: "ele pode/sabe", example: "Hij kan goed koken" },
      { pronoun: "zij/ze", conjugation: "kan", portuguese: "ela pode/sabe", example: "Zij kan piano spelen" },
      { pronoun: "het", conjugation: "kan", portuguese: "ele/ela pode (neutro)", example: "Het kan gebeuren" },
      { pronoun: "wij/we", conjugation: "kunnen", portuguese: "nós podemos/sabemos", example: "Wij kunnen helpen" },
      { pronoun: "jullie", conjugation: "kunnen", portuguese: "vocês podem/sabem", example: "Jullie kunnen komen" },
      { pronoun: "zij/ze", conjugation: "kunnen", portuguese: "eles/elas podem/sabem", example: "Zij kunnen dansen" },
    ],
  };

  const verbWillen = {
    verb: "willen",
    translation: "querer",
    conjugations: [
      { pronoun: "ik", conjugation: "wil", portuguese: "eu quero", example: "Ik wil koffie" },
      { pronoun: "jij/je", conjugation: "wilt/wil", portuguese: "você quer", example: "Jij wilt leren" },
      { pronoun: "u", conjugation: "wilt/wil", portuguese: "senhor(a) quer", example: "U wilt thee" },
      { pronoun: "hij", conjugation: "wil", portuguese: "ele quer", example: "Hij wil slapen" },
      { pronoun: "zij/ze", conjugation: "wil", portuguese: "ela quer", example: "Zij wil eten" },
      { pronoun: "het", conjugation: "wil", portuguese: "ele/ela quer (neutro)", example: "Het wil niet lukken" },
      { pronoun: "wij/we", conjugation: "willen", portuguese: "nós queremos", example: "Wij willen gaan" },
      { pronoun: "jullie", conjugation: "willen", portuguese: "vocês querem", example: "Jullie willen spelen" },
      { pronoun: "zij/ze", conjugation: "willen", portuguese: "eles/elas querem", example: "Zij willen blijven" },
    ],
  };

  const verbMoeten = {
    verb: "moeten",
    translation: "dever/ter que",
    conjugations: [
      { pronoun: "ik", conjugation: "moet", portuguese: "eu devo/tenho que", example: "Ik moet werken" },
      { pronoun: "jij/je", conjugation: "moet", portuguese: "você deve/tem que", example: "Jij moet studeren" },
      { pronoun: "u", conjugation: "moet", portuguese: "senhor(a) deve/tem que", example: "U moet wachten" },
      { pronoun: "hij", conjugation: "moet", portuguese: "ele deve/tem que", example: "Hij moet eten" },
      { pronoun: "zij/ze", conjugation: "moet", portuguese: "ela deve/tem que", example: "Zij moet slapen" },
      { pronoun: "het", conjugation: "moet", portuguese: "ele/ela deve (neutro)", example: "Het moet gebeuren" },
      { pronoun: "wij/we", conjugation: "moeten", portuguese: "nós devemos/temos que", example: "Wij moeten gaan" },
      { pronoun: "jullie", conjugation: "moeten", portuguese: "vocês devem/têm que", example: "Jullie moeten komen" },
      { pronoun: "zij/ze", conjugation: "moeten", portuguese: "eles/elas devem/têm que", example: "Zij moeten leren" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Gramática</h1>
          </div>
          <MobileMenu />
        </div>
      </header>

      <div className="container py-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Verbos Essenciais</h2>
            <p className="text-lg text-muted-foreground">
              Aprenda a conjugar os verbos mais importantes do holandês. Tenha acesso rápido às conjugações completas com exemplos práticos e áudio.
            </p>
          </div>
        </div>

          <div className="space-y-12">
            {/* Verbos Irregulares Essenciais */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Verbos Irregulares Essenciais</h3>
              <div className="space-y-8">
                <VerbConjugation {...verbZijn} />
                <VerbConjugation {...verbHebben} />
                <VerbConjugation {...verbGaan} />
                <VerbConjugation {...verbDoen} />
              </div>
            </div>

            {/* Verbos Modais */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Verbos Modais</h3>
              <p className="text-muted-foreground mb-6">
                Verbos modais expressam capacidade, desejo, obrigação ou permissão. Sempre são seguidos por outro verbo no infinitivo.
              </p>
              <div className="space-y-8">
                <VerbConjugation {...verbKunnen} />
                <VerbConjugation {...verbWillen} />
                <VerbConjugation {...verbMoeten} />
              </div>
            </div>
          </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border border-orange-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">📚 Dicas de Estudo</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Zijn, hebben, gaan e doen</strong> são verbos irregulares - memorize suas conjugações!</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use <strong>zijn</strong> para estados, profissões e localizações. Use <strong>hebben</strong> para posse.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Verbos modais</strong> (kunnen, willen, moeten) sempre vêm com outro verbo: "Ik kan zwemmen" (Eu sei nadar).</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Kunnen</strong> = capacidade/habilidade. <strong>Willen</strong> = desejo. <strong>Moeten</strong> = obrigação.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Clique nos ícones de áudio 🔊 para ouvir a pronúncia correta de cada conjugação!</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Pratique criando suas próprias frases com cada verbo e dizendo-as em voz alta.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

