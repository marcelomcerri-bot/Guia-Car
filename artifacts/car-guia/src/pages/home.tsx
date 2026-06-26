import { useChatContext } from "@/components/chat-context";
import { Link } from "wouter";
import { useGetStatsSummary, useGetPopularTopics } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Map as MapIcon, ArrowRight, Activity, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { open } = useChatContext();
  const { data: stats, isLoading: statsLoading } = useGetStatsSummary();
  const { data: popularTopics, isLoading: topicsLoading } = useGetPopularTopics();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── Desktop: 2-col layout ── */}
      <div className="lg:grid lg:grid-cols-5 lg:gap-14 space-y-10 lg:space-y-0">

        {/* ── Left column ── */}
        <div className="lg:col-span-3 space-y-8">
          <section className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold tracking-tight text-foreground leading-tight">
              Bom dia, produtor.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              O Código Florestal não precisa ser complicado. Estou aqui para
              ajudar a entender o Cadastro Ambiental Rural e as regras para
              sua propriedade, de forma simples e direta.
            </p>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* ── Chat card ── */}
            <button onClick={open} className="block w-full text-left group">
              <Card className="h-full transition-all cursor-pointer bg-card border border-border overflow-hidden relative shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200">
                {/* accent strip */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-l-xl" />
                <CardHeader className="pl-7 pb-3">
                  <div className="bg-primary/10 p-2.5 rounded-xl w-fit mb-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Tirar dúvidas</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Converse comigo sobre APPs, Reserva Legal e regras do CAR.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-7 pt-0">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                    Iniciar conversa <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </button>

            {/* ── Diagnóstico card ── */}
            <Link href="/diagnostico" className="block w-full group">
              <Card className="h-full transition-all cursor-pointer bg-card border border-border overflow-hidden relative shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary rounded-l-xl" />
                <CardHeader className="pl-7 pb-3">
                  <div className="bg-secondary/10 p-2.5 rounded-xl w-fit mb-3">
                    <MapIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Diagnóstico da Terra</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Descubra o que a lei exige para o tamanho e tipo da sua propriedade.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-7 pt-0">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:gap-3 transition-all duration-200">
                    Avaliar propriedade <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-semibold">Tópicos Frequentes</h2>
            <div className="flex flex-wrap gap-2">
              {topicsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-24 rounded-full" />
                ))
              ) : (
                popularTopics?.map((topic) => (
                  <button
                    key={topic.topic}
                    onClick={open}
                    className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/8 hover:border-primary/30 hover:text-primary focus:outline-none"
                  >
                    {topic.topic}
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-semibold">Impacto da Comunidade</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-card border border-border shadow-sm">
                <CardContent className="p-5 flex flex-col items-center text-center space-y-1.5">
                  <div className="bg-primary/10 p-2 rounded-lg mb-1">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-3xl font-bold font-serif text-foreground">
                    {statsLoading ? <Skeleton className="h-9 w-16" /> : stats?.totalSessions}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Produtores Ajudados</span>
                </CardContent>
              </Card>
              <Card className="bg-card border border-border shadow-sm">
                <CardContent className="p-5 flex flex-col items-center text-center space-y-1.5">
                  <div className="bg-secondary/10 p-2 rounded-lg mb-1">
                    <Activity className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-3xl font-bold font-serif text-foreground">
                    {statsLoading ? <Skeleton className="h-9 w-16" /> : stats?.totalDiagnoses}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Diagnósticos Feitos</span>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
