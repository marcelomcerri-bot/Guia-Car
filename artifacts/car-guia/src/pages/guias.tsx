import { useState } from "react";
import { Link } from "wouter";
import { useListGuides, getListGuidesQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Todos", "APP", "Reserva Legal", "CAR", "Regularização", "Benefícios"];

export default function Guias() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const params = activeCategory !== "Todos" ? { category: activeCategory } : {};
  const { data: guides, isLoading } = useListGuides(params, {
    query: { queryKey: getListGuidesQueryKey(params) }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Guias Práticos</h1>
        <p className="text-muted-foreground">Tudo que você precisa saber sobre o CAR, em linguagem simples.</p>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition-all",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-muted"
            )}
            data-testid={`category-${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))
        ) : guides && guides.length > 0 ? (
          guides.map((guide, i) => (
            <Link key={guide.id} href={`/guias/${guide.id}`}>
              <Card
                className="hover-elevate transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 60}ms` }}
                data-testid={`card-guide-${guide.id}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1">
                      <Badge variant="secondary" className="text-xs mb-1">{guide.category}</Badge>
                      <CardTitle className="text-lg leading-snug">{guide.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{guide.summary}</CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readingTimeMinutes} min de leitura
                    </span>
                    {guide.tags && guide.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 space-y-3">
            <BookOpen className="w-10 h-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">Nenhum guia encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
