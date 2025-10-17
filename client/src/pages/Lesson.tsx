import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Volume2, XCircle } from "lucide-react";
import { speakDutch } from "@/lib/audio";
import { Link, useParams, useLocation } from "wouter";
import { toast } from "sonner";

export default function Lesson() {
  const { lessonId } = useParams();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  
  const { data, isLoading } = trpc.course.lesson.useQuery(
    { lessonId: lessonId! },
    { enabled: !!lessonId }
  );
  
  const updateProgressMutation = trpc.course.updateProgress.useMutation({
    onSuccess: () => {
      toast.success("Progresso salvo!");
    },
  });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const { lesson, exercises, vocabulary } = data || {};

  const currentExercise = exercises?.[currentExerciseIndex];
  const totalExercises = exercises?.length || 0;
  const score = (completedExercises.size / totalExercises) * 100;

  const handleCheckAnswer = () => {
    if (!currentExercise || !selectedAnswer) return;

    const correct = selectedAnswer === currentExercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCompletedExercises((prev) => new Set(prev).add(currentExerciseIndex));
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setSelectedAnswer("");
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // Completed all exercises
      if (isAuthenticated) {
        updateProgressMutation.mutate({
          lessonId: lessonId!,
          completed: true,
          score: Math.round(score),
        });
      }
      toast.success("Lição concluída! 🎉");
    }
  };

  const parseContent = (contentStr: string | null) => {
    if (!contentStr) return null;
    try {
      return JSON.parse(contentStr);
    } catch {
      return null;
    }
  };

  const lessonContent = lesson?.content ? parseContent(lesson.content) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Lição não encontrada</h2>
          <Link href="/">
            <Button>Voltar para Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">{lesson.title}</h1>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Lesson Content */}
          <Card>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {lessonContent?.sections?.map((section: any, index: number) => (
                <div key={index}>
                  {section.type === "intro" && (
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  )}
                  
                  {section.type === "special_sounds" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                      <div className="space-y-3">
                        {section.items?.map((item: any, i: number) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                            <Badge variant="outline" className="mt-0.5">{item.letter}</Badge>
                            <div className="flex-1">
                              <p className="font-medium">{item.sound}</p>
                              <p className="text-sm text-muted-foreground">Ex: {item.example}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.type === "phrases" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                      <div className="space-y-2">
                        {section.items?.map((item: any, i: number) => (
                          <div key={i} className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center p-3 rounded-lg bg-muted/50">
                            <div>
                              <p className="font-medium text-primary">{item.dutch}</p>
                              <p className="text-xs text-muted-foreground">{item.pronunciation}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => speakDutch(item.dutch)}
                              title="Ouvir pronúncia"
                            >
                              <Volume2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <p className="text-sm">{item.portuguese}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.type === "table" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              {section.headers?.map((header: string, i: number) => (
                                <th key={i} className="p-3 text-left font-semibold">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.rows?.map((row: string[], i: number) => (
                              <tr key={i} className="border-b">
                                {row.map((cell, j) => (
                                  <td key={j} className="p-3">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Vocabulary */}
          {vocabulary && vocabulary.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Vocabulário</CardTitle>
                <CardDescription>Palavras-chave desta lição</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {vocabulary.map((word) => (
                    <div key={word.id} className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-semibold text-primary">{word.dutch}</p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => speakDutch(word.dutch)}
                          title="Ouvir pronúncia"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{word.pronunciation}</p>
                      <p className="font-medium">{word.portuguese}</p>
                      {word.example && (
                        <p className="text-sm text-muted-foreground mt-2 italic">{word.example}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Exercises */}
          {exercises && exercises.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Exercícios</CardTitle>
                    <CardDescription>
                      Questão {currentExerciseIndex + 1} de {totalExercises}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {completedExercises.size}/{totalExercises} corretas
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentExercise && (
                  <>
                    <div className="space-y-4">
                      <p className="text-lg font-medium">{currentExercise.question}</p>

                      {currentExercise.type === "multiple_choice" && (
                        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={showResult}>
                          {currentExercise.options &&
                            JSON.parse(currentExercise.options).map((option: string) => (
                              <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                              </div>
                            ))}
                        </RadioGroup>
                      )}

                      {currentExercise.type === "fill_blank" && (
                        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={showResult}>
                          {currentExercise.options &&
                            JSON.parse(currentExercise.options).map((option: string) => (
                              <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                              </div>
                            ))}
                        </RadioGroup>
                      )}
                    </div>

                    {showResult && (
                      <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} border`}>
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className={`font-semibold mb-1 ${isCorrect ? "text-green-900" : "text-red-900"}`}>
                              {isCorrect ? "Correto! 🎉" : "Incorreto"}
                            </p>
                            {currentExercise.explanation && (
                              <p className={isCorrect ? "text-green-800" : "text-red-800"}>
                                {currentExercise.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {!showResult ? (
                        <Button
                          onClick={handleCheckAnswer}
                          disabled={!selectedAnswer}
                          className="flex-1"
                        >
                          Verificar Resposta
                        </Button>
                      ) : (
                        <Button onClick={handleNextExercise} className="flex-1">
                          {currentExerciseIndex < totalExercises - 1 ? (
                            <>
                              Próxima Questão
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            "Concluir Lição"
                          )}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

