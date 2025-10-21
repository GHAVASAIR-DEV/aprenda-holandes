import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { BookOpen, GraduationCap, Headphones, Trophy } from "lucide-react";
import { Link } from "wouter";
import { MobileMenu } from "@/components/MobileMenu";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { data: modules, isLoading } = trpc.course.modules.useQuery();
  const { data: progress } = trpc.course.progress.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Calculate total lessons from all modules
  const getTotalLessons = () => {
    // We have 46 lessons total in the A1 course (39 original + 7 grammar lessons)
    return 46;
  };

  const getProgressPercentage = () => {
    if (!progress || progress.length === 0) return 0;
    const completed = progress.filter((p) => p.completed === "true").length;
    const total = getTotalLessons();
    return Math.round((completed / total) * 100);
  };

  const getCompletedCount = () => {
    if (!progress) return 0;
    return progress.filter((p) => p.completed === "true").length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{APP_TITLE}</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">Olá, {user?.name}</span>
                <Link href="/progresso">
                  <Button variant="outline">Meu Progresso</Button>
                </Link>
                <Link href="/gramatica">
                  <Button variant="outline">📚 Gramática</Button>
                </Link>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="sm">Entrar</Button>
              </a>
            )}
          </nav>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Curso Nível A1 (Iniciante)
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Aprenda Holandês do Zero
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Curso interativo de holandês para brasileiros. Aprenda com áudio de pronúncia,
              exercícios práticos e situações do dia a dia.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">8 Módulos A1</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
                <Headphones className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Áudio Nativo</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Exercícios Interativos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section (for authenticated users) */}
      {isAuthenticated && progress && progress.length > 0 && (
        <section className="py-8">
          <div className="container">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Seu Progresso</CardTitle>
                <CardDescription>Continue de onde parou</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Progresso Geral</span>
                      <span className="font-medium">{getProgressPercentage()}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${getProgressPercentage()}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getCompletedCount()} de {getTotalLessons()}{" "}
                    lições concluídas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Modules Section */}
      <section className="py-12">
        <div className="container">
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold">Módulos do Curso</h3>
            <p className="mt-2 text-muted-foreground">
              Aprenda holandês do zero com 8 módulos progressivos (Nível A1)
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-full rounded bg-muted" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modules?.map((module) => (
                <Link key={module.id} href={`/modulo/${module.id}`}>
                  <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant={module.level === "A1" ? "default" : "secondary"}>
                          {module.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Módulo {module.orderIndex}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {module.title}
                      </CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Ver Lições
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-8 text-center text-3xl font-bold">Por que este curso?</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">🎯 Focado em Brasileiros</h4>
                <p className="text-muted-foreground">
                  Todas as explicações em português, com comparações que fazem sentido para falantes
                  nativos de português.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">🔊 Pronúncia Autêntica</h4>
                <p className="text-muted-foreground">
                  Áudio de pronúncia para todas as palavras e frases, gravado por falantes nativos
                  de holandês.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">📝 Exercícios Práticos</h4>
                <p className="text-muted-foreground">
                  Múltipla escolha, preenchimento de lacunas, correspondência e muito mais para
                  fixar o conteúdo.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">🌍 Situações Reais</h4>
                <p className="text-muted-foreground">
                  Aprenda vocabulário e frases para situações do dia a dia: compras, restaurante,
                  trabalho e mais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-16">
          <div className="container">
            <Card className="mx-auto max-w-2xl border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Comece Agora Gratuitamente</CardTitle>
                <CardDescription>
                  Faça login para acompanhar seu progresso e desbloquear todos os recursos
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <a href={getLoginUrl()}>
                  <Button size="lg" className="px-8">
                    Começar a Aprender
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Aprenda Holandês. Curso interativo de holandês para brasileiros.</p>
        </div>
      </footer>
    </div>
  );
}

