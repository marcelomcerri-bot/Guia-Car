import { Link, useLocation } from "wouter";
import { Leaf, MessageSquare, BookOpen, Map } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Início", icon: Leaf },
    { href: "/chat", label: "Dúvidas", icon: MessageSquare },
    { href: "/guias", label: "Guias", icon: BookOpen },
    { href: "/diagnostico", label: "Propriedade", icon: Map },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="font-serif font-bold text-lg text-foreground">Guia CAR</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full pb-20 md:pb-0">
        {children}
      </main>

      <nav className="fixed bottom-0 z-50 w-full border-t border-border bg-background pb-safe md:hidden">
        <div className="flex h-16 items-center justify-around px-4">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground transition-colors",
                  isActive && "text-primary"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
