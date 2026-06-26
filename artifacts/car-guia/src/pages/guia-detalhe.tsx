import { Link, useParams } from "wouter";
import { useGetGuide, getGetGuideQueryKey } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, MessageSquare, BookOpen } from "lucide-react";
import { useChatContext } from "@/components/chat-context";

const CATEGORY_COLORS: Record<string, string> = {
  "APP":           "bg-emerald-100 text-emerald-800",
  "Reserva Legal": "bg-green-100 text-green-800",
  "CAR":           "bg-primary/10 text-primary",
  "Regularização": "bg-amber-100 text-amber-800",
  "Benefícios":    "bg-teal-100 text-teal-800",
};

export default function GuiaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const guideId = Number(id);
  const { openWith } = useChatContext();

  const { data: guide, isLoading } = useGetGuide(guideId, {
    query: { enabled: !!guideId, queryKey: getGetGuideQueryKey(guideId) }
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 space-y-4">
        <Skeleton className="h-8 w-20" />
        <div className="bg-card border border-border rounded-2xl shadow-sm p-7 space-y-5">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-36" />
          <div className="space-y-3 pt-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? "w-4/5" : "w-full"}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-8 py-16 flex flex-col items-center text-center space-y-4">
        <BookOpen className="w-12 h-12 text-muted-foreground/40" />
        <p className="text-muted-foreground">Guia não encontrado.</p>
        <Link href="/guias">
          <Button variant="outline">Voltar aos guias</Button>
        </Link>
      </div>
    );
  }

  const badgeClass = CATEGORY_COLORS[guide.category] ?? "bg-primary/10 text-primary";

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Back button — outside card */}
      <Link href="/guias">
        <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Todos os guias
        </Button>
      </Link>

      {/* ── Main reading card ── */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">

        {/* Header area */}
        <div className="px-7 pt-7 pb-5 border-b border-border/60 space-y-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClass}`}>
            {guide.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-tight text-foreground">
            {guide.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {guide.readingTimeMinutes} min de leitura
            </span>
            {guide.tags && guide.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {guide.tags.map((tag) => (
                  <span key={tag} className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Body text */}
        <div className="px-7 py-6">
          <div className="space-y-4 text-foreground leading-relaxed [&_p]:text-[15px] [&_p]:text-justify">
            {guide.content.split("\n\n").map((paragraph, i) => {
              const isHeading = paragraph.length < 80 && !paragraph.includes(".") && i > 0;
              return isHeading ? (
                <h3 key={i} className="text-base font-semibold text-foreground pt-2">
                  {paragraph}
                </h3>
              ) : (
                <p key={i} className="text-muted-foreground">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* CTA footer inside card */}
        <div className="px-7 pb-7">
          <div className="rounded-xl bg-primary/5 border border-primary/15 p-5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">Ficou com dúvida?</p>
                <p className="text-sm text-muted-foreground">
                  Pergunte ao assistente sobre {guide.title.toLowerCase()}.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="gap-2"
              onClick={() => openWith(`Me explica mais sobre ${guide.title}`)}
            >
              <MessageSquare className="w-4 h-4" />
              Perguntar ao assistente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
