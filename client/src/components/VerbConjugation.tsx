import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { speakDutch } from "@/lib/audio";

interface ConjugationRow {
  pronoun: string;
  conjugation: string;
  portuguese: string;
  example?: string;
}

interface VerbConjugationProps {
  verb: string;
  translation: string;
  tense?: string;
  conjugations: ConjugationRow[];
}

export function VerbConjugation({ verb, translation, tense = "Presente", conjugations }: VerbConjugationProps) {
  return (
    <Card className="p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-orange-600 mb-1">{verb}</h3>
        <p className="text-gray-600">{translation} - {tense}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-orange-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Pronome</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Conjugação</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Português</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Exemplo</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {conjugations.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-orange-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-800">{row.pronoun}</td>
                <td className="py-3 px-4">
                  <span className="text-orange-600 font-semibold text-lg">{row.conjugation}</span>
                </td>
                <td className="py-3 px-4 text-gray-600">{row.portuguese}</td>
                <td className="py-3 px-4 text-sm text-gray-500 italic">{row.example || ""}</td>
                <td className="py-3 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakDutch(`${row.pronoun} ${row.conjugation}`)}
                    className="hover:bg-orange-100"
                    title="Ouvir pronúncia"
                  >
                    <Volume2 className="h-4 w-4 text-orange-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>💡 Dica:</strong> Clique no ícone de volume para ouvir a pronúncia de cada conjugação!
        </p>
      </div>
    </Card>
  );
}

