import { Link, useLocation } from "wouter";
import { Leaf, BookOpen, Map, Info, Zap, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineArtBg } from "@/components/line-art-bg";
import { FloatingChat } from "@/components/floating-chat";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Início", icon: Leaf },
    { href: "/guias", label: "Guias", icon: BookOpen },
    { href: "/aprender", label: "Aprender", icon: Zap },
    { href: "/analisar-foto", label: "Analisar", icon: Camera },
    { href: "/diagnostico", label: "Propriedade", icon: Map },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background relative">
      <LineArtBg />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 md:px-8 max-w-screen-xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="font-serif font-bold text-lg text-foreground">Guia CAR</span>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                location === item.href ||
                (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 w-full pb-20 md:pb-0 relative z-[1]">
        <div className="max-w-screen-xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="fixed bottom-0 z-50 w-full border-t border-border bg-background/95 backdrop-blur pb-safe md:hidden">
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive =
              location === item.href ||
              (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Floating chat ── */}
      <FloatingChat />
    </div>
  );
}
