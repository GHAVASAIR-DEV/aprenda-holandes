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
              Aprenda a conjugar os dois verbos mais importantes do holandês: <strong>zijn</strong> (ser/estar) e <strong>hebben</strong> (ter).
            </p>
          </div>
        </div>

          <div className="space-y-8">
            <VerbConjugation {...verbZijn} />
            <VerbConjugation {...verbHebben} />
          </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border border-orange-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">📚 Dicas de Estudo</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Zijn</strong> e <strong>hebben</strong> são verbos irregulares - você precisa memorizá-los!</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use <strong>zijn</strong> para descrever estados, profissões, nacionalidades e localizações.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use <strong>hebben</strong> para posse e expressões idiomáticas (honger hebben, dorst hebben).</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Pratique dizendo frases em voz alta usando as conjugações!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

