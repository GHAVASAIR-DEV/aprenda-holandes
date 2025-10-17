import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Award, BookOpen, CheckCircle2, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Progress() {
  const { user, isAuthenticated } = useAuth();
  
  const { data: modules } = trpc.course.modules.useQuery();
  const { data: progress, isLoading } = trpc.course.progress.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: moduleProgress } = trpc.course.progressByModule.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Login Necessário</CardTitle>
            <CardDescription>
              Faça login para acompanhar seu progresso no curso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a href={getLoginUrl()}>
              <Button className="w-full">Fazer Login</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Total lessons in A1 course (39 original + 7 grammar lessons)
  const totalLessons = 46;
  const completedLessons = progress?.filter((p) => p.completed === "true").length || 0;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const getModuleProgress = (moduleId: string) => {
    if (!moduleProgress) return { completed: 0, total: 0, percentage: 0 };
    
    const progress = moduleProgress.find((mp) => mp.moduleId === moduleId);
    if (!progress) return { completed: 0, total: 0, percentage: 0 };
    
    return {
      completed: progress.completed,
      total: progress.total,
      percentage: progress.percentage,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Meu Progresso</h1>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardHeader>
              <CardTitle className="text-2xl">Olá, {user?.name}! 👋</CardTitle>
              <CardDescription>
                Continue sua jornada de aprendizado de holandês
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso Geral</CardTitle>
              <CardDescription>Seu desempenho no curso completo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Lições Concluídas</span>
                  <span className="text-muted-foreground">
                    {completedLessons} de {totalLessons}
                  </span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-center text-2xl font-bold text-primary">
                  {progressPercentage}%
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4">
                  <BookOpen className="mb-2 h-8 w-8 text-primary" />
                  <p className="text-2xl font-bold">{totalLessons}</p>
                  <p className="text-sm text-muted-foreground">Lições Totais</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4">
                  <CheckCircle2 className="mb-2 h-8 w-8 text-green-500" />
                  <p className="text-2xl font-bold">{completedLessons}</p>
                  <p className="text-sm text-muted-foreground">Concluídas</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4">
                  <Award className="mb-2 h-8 w-8 text-accent" />
                  <p className="text-2xl font-bold">{progressPercentage}%</p>
                  <p className="text-sm text-muted-foreground">Progresso</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modules Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso por Módulo</CardTitle>
              <CardDescription>Veja seu avanço em cada módulo</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 w-3/4 rounded bg-muted" />
                      <div className="h-2 w-full rounded bg-muted" />
                    </div>
                  ))}
                </div>
              ) : modules && modules.length > 0 ? (
                <div className="space-y-4">
                  {modules.map((module) => {
                    const moduleProgress = getModuleProgress(module.id);
                    return (
                      <div key={module.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant={module.level === "A1" ? "default" : "secondary"}>
                              {module.level}
                            </Badge>
                            <p className="font-medium">{module.title}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {moduleProgress.percentage}%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${moduleProgress.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  Nenhum progresso registrado ainda
                </p>
              )}
            </CardContent>
          </Card>

          {/* Achievements (placeholder for future) */}
          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
              <CardDescription>Desbloqueie medalhas conforme avança</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className={`flex flex-col items-center rounded-lg border p-4 ${completedLessons >= 1 ? 'bg-primary/5 border-primary/20' : 'opacity-50'}`}>
                  <div className="mb-2 text-4xl">🎯</div>
                  <p className="font-semibold">Primeira Lição</p>
                  <p className="text-xs text-muted-foreground text-center">
                    Complete sua primeira lição
                  </p>
                </div>
                <div className={`flex flex-col items-center rounded-lg border p-4 ${completedLessons >= 5 ? 'bg-primary/5 border-primary/20' : 'opacity-50'}`}>
                  <div className="mb-2 text-4xl">🔥</div>
                  <p className="font-semibold">Em Chamas</p>
                  <p className="text-xs text-muted-foreground text-center">
                    Complete 5 lições
                  </p>
                </div>
                <div className={`flex flex-col items-center rounded-lg border p-4 ${progressPercentage >= 50 ? 'bg-primary/5 border-primary/20' : 'opacity-50'}`}>
                  <div className="mb-2 text-4xl">⭐</div>
                  <p className="font-semibold">Meio Caminho</p>
                  <p className="text-xs text-muted-foreground text-center">
                    Complete 50% do curso
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Learning CTA */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <h3 className="mb-2 text-xl font-bold">Continue Aprendendo!</h3>
              <p className="mb-4 text-muted-foreground">
                Quanto mais você pratica, mais rápido aprende
              </p>
              <Link href="/">
                <Button size="lg">Voltar ao Curso</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

