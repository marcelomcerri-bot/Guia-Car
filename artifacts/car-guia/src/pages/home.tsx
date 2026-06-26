import { useChatContext } from "@/components/chat-context";
import { Link } from "wouter";
import {
  useGetStatsSummary,
  useGetPopularTopics,
  useListGuides,
  getListGuidesQueryKey,
} from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Map as MapIcon,
  ArrowRight,
  Activity,
  Users,
  BookOpen,
  Clock,
  CheckCircle2,
  FileSearch,
  Sprout,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  "APP":           "bg-emerald-100 text-emerald-800",
  "Reserva Legal": "bg-green-100 text-green-800",
  "CAR":           "bg-primary/10 text-primary",
  "Regularização": "bg-amber-100 text-amber-800",
  "Benefícios":    "bg-teal-100 text-teal-800",
};

const HOW_STEPS = [
  {
    icon: MessageSquare,
    color: "bg-primary/10 text-primary",
    title: "Tire suas dúvidas",
    desc: "O assistente responde perguntas sobre o Código Florestal em linguagem simples.",
  },
  {
    icon: FileSearch,
    color: "bg-amber-100 text-amber-700",
    title: "Diagnostique sua terra",
    desc: "Informe as características da sua propriedade e veja o que a lei exige para você.",
  },
  {
    icon: BookOpen,
    color: "bg-teal-100 text-teal-700",
    title: "Leia os guias",
    desc: "Conteúdo prático sobre APP, Reserva Legal, CAR, regularização e benefícios.",
  },
];

export default function Home() {
  const { open } = useChatContext();
  const { data: stats, isLoading: statsLoading } = useGetStatsSummary();
  const { data: popularTopics, isLoading: topicsLoading } = useGetPopularTopics();
  const { data: featuredGuides, isLoading: guidesLoading } = useListGuides({}, {
    query: { queryKey: getListGuidesQueryKey({}) }
  });

  const topGuides = featuredGuides?.slice(0, 3) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">

      {/* ── Hero + sidebar ── */}
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

          {/* Action cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <button onClick={open} className="block w-full text-left group">
              <Card className="h-full transition-all cursor-pointer bg-card border border-border overflow-hidden relative shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200">
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

          {/* ── How it works — desktop only in left col, shown on mobile below ── */}
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-semibold text-foreground">Como funciona</h2>
            <div className="space-y-3">
              {HOW_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-card border border-border rounded-xl px-5 py-4 shadow-sm"
                >
                  <div className={cn("p-2.5 rounded-xl shrink-0", step.color)}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground/40 shrink-0 mt-0.5 tabular-nums">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Frequent topics */}
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

          {/* Community stats */}
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

          {/* CAR info card — filler for desktop right column */}
          <section>
            <Card className="bg-card border border-border shadow-sm overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/40" />
              <CardContent className="pl-6 pr-5 py-5 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Sprout className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">Sabia que…</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  O CAR é obrigatório para todos os imóveis rurais no Brasil. Produtores regularizados têm acesso a crédito rural e programas de regularização ambiental.
                </p>
                <button
                  onClick={open}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all duration-200 pt-1"
                >
                  Saiba mais <ArrowRight className="w-3 h-3" />
                </button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* ── Featured Guides — full width below ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-semibold">Guias em Destaque</h2>
          <Link href="/guias">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200">
              Ver todos <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guidesLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))
          ) : topGuides.map((guide, i) => {
            const badgeClass = CATEGORY_COLORS[guide.category] ?? "bg-primary/10 text-primary";
            return (
              <Link key={guide.id} href={`/guias/${guide.id}`}>
                <div className="group relative flex bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full">
                  <div className={cn("w-[3px] shrink-0",
                    guide.category === "APP" ? "bg-emerald-600" :
                    guide.category === "Reserva Legal" ? "bg-green-700" :
                    guide.category === "Regularização" ? "bg-amber-600" :
                    guide.category === "Benefícios" ? "bg-teal-600" : "bg-primary"
                  )} />
                  <div className="flex-1 p-5 space-y-2.5">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", badgeClass)}>
                      {guide.category}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {guide.summary}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {guide.readingTimeMinutes} min
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
