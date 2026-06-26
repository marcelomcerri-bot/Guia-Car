import { useChatContext } from "@/components/chat-context";
import { Link } from "wouter";
import {
  useGetStatsSummary,
  useGetPopularTopics,
  useListGuides,
  getListGuidesQueryKey,
} from "@workspace/api-client-react";
import {
  MessageSquare,
  Map as MapIcon,
  ArrowRight,
  Activity,
  Users,
  BookOpen,
  Clock,
  FileSearch,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, { bar: string; badge: string }> = {
  "APP":           { bar: "bg-emerald-600",  badge: "bg-emerald-100 text-emerald-800" },
  "Reserva Legal": { bar: "bg-green-700",    badge: "bg-green-100 text-green-800" },
  "CAR":           { bar: "bg-primary",      badge: "bg-primary/10 text-primary" },
  "Regularização": { bar: "bg-amber-600",    badge: "bg-amber-100 text-amber-800" },
  "Benefícios":    { bar: "bg-teal-600",     badge: "bg-teal-100 text-teal-800" },
};

const HOW_STEPS = [
  {
    icon: MessageSquare,
    color: "bg-primary/10 text-primary",
    title: "Tire suas dúvidas",
    desc: "O assistente responde perguntas sobre o Código Florestal em linguagem simples, sem juridiquês.",
  },
  {
    icon: FileSearch,
    color: "bg-amber-100 text-amber-700",
    title: "Diagnostique sua terra",
    desc: "Informe o tamanho e o bioma da sua propriedade e veja exatamente o que a lei exige para você.",
  },
  {
    icon: BookOpen,
    color: "bg-teal-100 text-teal-700",
    title: "Leia os guias",
    desc: "Conteúdo prático sobre APP, Reserva Legal, CAR, regularização ambiental e benefícios.",
  },
];

const CAR_FACTS = [
  "Obrigatório para todo imóvel rural no Brasil",
  "Necessário para acessar crédito rural",
  "Exigido em programas de regularização ambiental",
];

export default function Home() {
  const { open } = useChatContext();
  const { data: stats, isLoading: statsLoading } = useGetStatsSummary();
  const { data: popularTopics, isLoading: topicsLoading } = useGetPopularTopics();
  const { data: allGuides, isLoading: guidesLoading } = useListGuides({}, {
    query: { queryKey: getListGuidesQueryKey({}) }
  });

  const topGuides = allGuides?.slice(0, 3) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ════════════════════════════════════════
          HERO — 2-col on desktop
      ════════════════════════════════════════ */}
      <section className="pt-12 pb-10 border-b border-border/50">
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-12 space-y-10 lg:space-y-0 items-start">

          {/* ── Left: headline + CTAs ── */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
              <Sprout className="w-3.5 h-3.5" />
              Guia CAR — Cadastro Ambiental Rural
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.06] text-foreground">
              Bom dia,<br className="hidden sm:block" /> produtor.
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-xl">
              O Código Florestal não precisa ser complicado. Entenda o CAR e as
              regras da sua propriedade — de forma simples e direta.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={open}
                className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                Tirar dúvidas
              </button>
              <Link href="/diagnostico">
                <button className="inline-flex items-center gap-2.5 bg-card border border-border text-foreground px-6 py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:border-secondary/50 hover:-translate-y-0.5 transition-all duration-200">
                  <MapIcon className="w-4 h-4 text-secondary" />
                  Diagnóstico da Terra
                </button>
              </Link>
              <Link href="/guias">
                <button className="inline-flex items-center gap-2 text-muted-foreground px-4 py-3 rounded-xl font-medium text-sm hover:text-foreground transition-colors duration-200">
                  Ver guias <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Quick topics */}
            {!topicsLoading && popularTopics && popularTopics.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium shrink-0">Pergunte sobre:</span>
                {popularTopics.map((t) => (
                  <button
                    key={t.topic}
                    onClick={open}
                    className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-primary/8 hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    {t.topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: stats + facts card ── */}
          <div className="space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-5 flex flex-col items-center text-center space-y-2">
                <div className="bg-primary/10 p-2.5 rounded-xl">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-5xl font-bold font-serif text-foreground leading-none pt-1">
                  {statsLoading ? <Skeleton className="h-12 w-14 mx-auto" /> : stats?.totalSessions ?? 0}
                </span>
                <span className="text-sm text-muted-foreground font-medium leading-tight">
                  Produtores<br/>Ajudados
                </span>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 flex flex-col items-center text-center space-y-2">
                <div className="bg-secondary/10 p-2.5 rounded-xl">
                  <Activity className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-5xl font-bold font-serif text-foreground leading-none pt-1">
                  {statsLoading ? <Skeleton className="h-12 w-14 mx-auto" /> : stats?.totalDiagnoses ?? 0}
                </span>
                <span className="text-sm text-muted-foreground font-medium leading-tight">
                  Diagnósticos<br/>Realizados
                </span>
              </div>
            </div>

            {/* CAR facts card */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Sprout className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Por que regularizar?</span>
              </div>
              <ul className="space-y-2.5">
                {CAR_FACTS.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                    {fact}
                  </li>
                ))}
              </ul>
              <button
                onClick={open}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all duration-200 pt-1"
              >
                Saiba mais sobre o CAR <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COMO FUNCIONA
      ════════════════════════════════════════ */}
      <section className="space-y-5 pt-10 pb-10">
        <h2 className="text-2xl font-serif font-semibold">Como funciona</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {HOW_STEPS.map((step, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5 space-y-3 relative overflow-hidden"
            >
              <span className="absolute top-3 right-4 text-6xl font-black text-foreground/[0.04] select-none leading-none">
                0{i + 1}
              </span>
              <div className={cn("p-2.5 rounded-xl w-fit", step.color)}>
                <step.icon className="w-4 h-4" />
              </div>
              <p className="text-sm font-semibold text-foreground pr-10">{step.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          GUIAS EM DESTAQUE
      ════════════════════════════════════════ */}
      <section className="space-y-5 pb-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-semibold">Guias em Destaque</h2>
          <Link href="/guias">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200">
              Ver todos <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guidesLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-xl" />)
            : topGuides.map((guide) => {
                const colors = CATEGORY_COLORS[guide.category] ?? CATEGORY_COLORS["CAR"];
                return (
                  <Link key={guide.id} href={`/guias/${guide.id}`}>
                    <div className="group flex bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full">
                      <div className={cn("w-[3px] shrink-0", colors.bar)} />
                      <div className="flex-1 p-5 space-y-2.5">
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", colors.badge)}>
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
