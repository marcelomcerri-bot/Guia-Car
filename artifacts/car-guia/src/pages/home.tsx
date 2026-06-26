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
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── Desktop: 2-col layout ── */}
      <div className="lg:grid lg:grid-cols-5 lg:gap-12 space-y-8 lg:space-y-0">

        {/* ── Left column ── */}
        <div className="lg:col-span-3 space-y-8">
          <section className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold tracking-tight text-foreground">
              Bom dia, produtor.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              O Código Florestal não precisa ser complicado. Estou aqui para ajudar a entender o Cadastro Ambiental Rural e as regras para sua propriedade, de forma simples e direta.
            </p>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <button onClick={open} className="block w-full text-left">
              <Card className="h-full hover-elevate transition-all cursor-pointer border-primary/20 bg-primary/5">
                <CardHeader>
                  <MessageSquare className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Tirar dúvidas</CardTitle>
                  <CardDescription className="text-base">Converse comigo sobre APPs, Reserva Legal e regras do CAR.</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Iniciar conversa <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </button>

            <Link href="/diagnostico" className="block w-full">
              <Card className="h-full hover-elevate transition-all cursor-pointer border-secondary/20 bg-secondary/5">
                <CardHeader>
                  <MapIcon className="w-8 h-8 text-secondary mb-2" />
                  <CardTitle className="text-xl">Diagnóstico da Terra</CardTitle>
                  <CardDescription className="text-base">Descubra o que a lei exige para o tamanho e tipo da sua propriedade.</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-medium text-secondary">
                    Avaliar propriedade <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold">Tópicos Frequentes</h2>
            <div className="flex flex-wrap gap-2">
              {topicsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))
              ) : (
                popularTopics?.map((topic) => (
                  <button
                    key={topic.topic}
                    onClick={open}
                    className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus:outline-none"
                  >
                    {topic.topic}
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold">Impacto da Comunidade</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Users className="w-6 h-6 text-muted-foreground" />
                  <span className="text-3xl font-bold font-serif">
                    {statsLoading ? <Skeleton className="h-9 w-16" /> : stats?.totalSessions}
                  </span>
                  <span className="text-sm text-muted-foreground">Produtores Ajudados</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Activity className="w-6 h-6 text-muted-foreground" />
                  <span className="text-3xl font-bold font-serif">
                    {statsLoading ? <Skeleton className="h-9 w-16" /> : stats?.totalDiagnoses}
                  </span>
                  <span className="text-sm text-muted-foreground">Diagnósticos Feitos</span>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
