import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, BookOpen, CheckCircle2, Circle } from "lucide-react";
import { Link, useParams } from "wouter";
import { MobileMenu } from "@/components/MobileMenu";

export default function Module() {
  const { moduleId } = useParams();
  const { isAuthenticated } = useAuth();
  
  const { data: modules } = trpc.course.modules.useQuery();
  const { data: lessons, isLoading } = trpc.course.lessons.useQuery(
    { moduleId: moduleId! },
    { enabled: !!moduleId }
  );
  const { data: progress } = trpc.course.progress.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const currentModule = modules?.find((m) => m.id === moduleId);

  const isLessonCompleted = (lessonId: string) => {
    return progress?.some((p) => p.lessonId === lessonId && p.completed === "true");
  };

  if (!currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Módulo não encontrado</h2>
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
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">{currentModule.title}</h1>
          </div>
          <MobileMenu />
        </div>
      </header>

      {/* Module Header */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Badge className="mb-4" variant={currentModule.level === "A1" ? "default" : "secondary"}>
              Nível {currentModule.level}
            </Badge>
            <h2 className="text-4xl font-bold mb-4">{currentModule.title}</h2>
            <p className="text-lg text-muted-foreground">{currentModule.description}</p>
          </div>
        </div>
      </section>

      {/* Lessons List */}
      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-2xl font-bold mb-6">Lições</h3>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 w-3/4 rounded bg-muted" />
                      <div className="h-4 w-full rounded bg-muted" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : lessons && lessons.length > 0 ? (
              <div className="space-y-4">
                {lessons.map((lesson, index) => {
                  const completed = isLessonCompleted(lesson.id);
                  return (
                    <Link key={lesson.id} href={`/licao/${lesson.id}`}>
                      <Card className="group transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                  {index + 1}
                                </span>
                                <CardTitle className="group-hover:text-primary transition-colors">
                                  {lesson.title}
                                </CardTitle>
                              </div>
                              <CardDescription>{lesson.description}</CardDescription>
                            </div>
                            <div className="flex-shrink-0">
                              {completed ? (
                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                              ) : (
                                <Circle className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Button
                            variant={completed ? "outline" : "default"}
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            {completed ? "Revisar Lição" : "Começar Lição"}
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Nenhuma lição disponível ainda.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

