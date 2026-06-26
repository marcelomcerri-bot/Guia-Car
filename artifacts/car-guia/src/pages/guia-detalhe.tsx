import { Link, useParams } from "wouter";
import { useGetGuide, getGetGuideQueryKey } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, MessageSquare } from "lucide-react";
import { useChatContext } from "@/components/chat-context";

export default function GuiaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const guideId = Number(id);
  const { openWith } = useChatContext();

  const { data: guide, isLoading } = useGetGuide(guideId, {
    query: { enabled: !!guideId, queryKey: getGetGuideQueryKey(guideId) }
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 space-y-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-3 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 text-center space-y-4">
        <p className="text-muted-foreground">Guia não encontrado.</p>
        <Link href="/guias">
          <Button variant="outline">Voltar aos guias</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/guias">
        <Button variant="ghost" size="sm" className="-ml-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </Button>
      </Link>

      <div className="space-y-3">
        <Badge variant="secondary">{guide.category}</Badge>
        <h1 className="text-3xl font-serif font-bold tracking-tight leading-tight">{guide.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {guide.readingTimeMinutes} min de leitura
          </span>
        </div>
        {guide.tags && guide.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed space-y-4 [&_p]:text-justify [&_li]:text-justify">
        {guide.content.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="pt-6 border-t border-border">
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 space-y-3">
          <p className="text-sm font-medium text-foreground">Ficou com dúvida sobre esse tema?</p>
          <p className="text-sm text-muted-foreground">
            Use o assistente para perguntar sobre {guide.title.toLowerCase()}.
          </p>
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
  );
}
