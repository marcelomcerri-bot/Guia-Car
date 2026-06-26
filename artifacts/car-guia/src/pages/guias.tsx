import { useState } from "react";
import { Link } from "wouter";
import { useListGuides, getListGuidesQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Todos", "APP", "Reserva Legal", "CAR", "Regularização", "Benefícios"];

const CATEGORY_COLORS: Record<string, { bar: string; badge: string; text: string }> = {
  "APP":           { bar: "bg-emerald-600",    badge: "bg-emerald-100 text-emerald-800",   text: "text-emerald-700" },
  "Reserva Legal": { bar: "bg-green-700",       badge: "bg-green-100 text-green-800",       text: "text-green-700" },
  "CAR":           { bar: "bg-primary",         badge: "bg-primary/10 text-primary",        text: "text-primary" },
  "Regularização": { bar: "bg-amber-600",       badge: "bg-amber-100 text-amber-800",       text: "text-amber-700" },
  "Benefícios":    { bar: "bg-teal-600",        badge: "bg-teal-100 text-teal-800",         text: "text-teal-700" },
};

const DEFAULT_COLOR = { bar: "bg-primary", badge: "bg-primary/10 text-primary", text: "text-primary" };

export default function Guias() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const params = activeCategory !== "Todos" ? { category: activeCategory } : {};
  const { data: guides, isLoading } = useListGuides(params, {
    query: { queryKey: getListGuidesQueryKey(params) }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-1.5">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Guias Práticos</h1>
        <p className="text-muted-foreground">Tudo que você precisa saber sobre o CAR, em linguagem simples.</p>
      </section>

      {/* Category filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium border transition-all duration-150",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guide cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))
        ) : guides && guides.length > 0 ? (
          guides.map((guide, i) => {
            const colors = CATEGORY_COLORS[guide.category] ?? DEFAULT_COLOR;
            return (
              <Link key={guide.id} href={`/guias/${guide.id}`}>
                <div
                  className="group relative flex bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Left accent bar */}
                  <div className={cn("w-[3px] shrink-0 rounded-l-xl", colors.bar)} />

                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        {/* Badge */}
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", colors.badge)}>
                          {guide.category}
                        </span>

                        {/* Title */}
                        <h3 className="text-base font-semibold text-foreground leading-snug">
                          {guide.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {guide.summary}
                        </p>
                      </div>

                      <ArrowRight className={cn("w-4 h-4 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5", colors.text)} />
                    </div>

                    {/* Footer meta */}
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {guide.readingTimeMinutes} min de leitura
                      </span>
                      {guide.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center text-center py-16 space-y-3">
            <BookOpen className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">Nenhum guia encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
