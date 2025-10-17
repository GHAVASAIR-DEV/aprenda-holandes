import { BookOpen, Home, LayoutGrid, TrendingUp, BookMarked, User, LogOut, LogIn, Menu } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function MobileMenu() {
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Você saiu com sucesso!");
      window.location.href = "/";
    } catch (error) {
      toast.error("Erro ao sair");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-left">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Aprenda Holandês</span>
          </SheetTitle>
        </SheetHeader>
        
        <nav className="mt-8 flex flex-col gap-2">
          {/* Home */}
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 text-base">
              <Home className="h-5 w-5" />
              Início
            </Button>
          </Link>

          {/* Módulos */}
          <Link href="/#modulos">
            <Button variant="ghost" className="w-full justify-start gap-3 text-base">
              <LayoutGrid className="h-5 w-5" />
              Módulos
            </Button>
          </Link>

          {/* Progresso */}
          {isAuthenticated && (
            <Link href="/progresso">
              <Button variant="ghost" className="w-full justify-start gap-3 text-base">
                <TrendingUp className="h-5 w-5" />
                Meu Progresso
              </Button>
            </Link>
          )}

          {/* Gramática */}
          <Link href="/gramatica">
            <Button variant="ghost" className="w-full justify-start gap-3 text-base">
              <BookMarked className="h-5 w-5" />
              Gramática
            </Button>
          </Link>

          <div className="my-4 border-t" />

          {/* User Section */}
          {isAuthenticated ? (
            <>
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="truncate">{user?.name || user?.email}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-base text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Sair
              </Button>
            </>
          ) : (
            <a href={getLoginUrl()}>
              <Button variant="ghost" className="w-full justify-start gap-3 text-base">
                <LogIn className="h-5 w-5" />
                Entrar
              </Button>
            </a>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

