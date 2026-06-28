import { useState } from "react";
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
  Camera,
  Tractor,
  Building2,
  GraduationCap,
  Network,
  ChevronRight,
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

type Perfil = "pequeno" | "medio" | "oema" | "multiplicador" | null;

const PERFIS = [
  {
    id: "pequeno" as Perfil,
    icon: Tractor,
    label: "Pequeno Produtor",
    desc: "Até 4 módulos fiscais",
    color: "border-emerald-300 bg-emerald-50 text-emerald-700",
    activeColor: "border-emerald-500 bg-emerald-100 text-emerald-800 ring-2 ring-emerald-300",
    dica: "Como pequeno produtor, você tem regras simplificadas e benefícios especiais no Código Florestal.",
    acoes: ["Entenda o CAR básico", "Veja benefícios para pequenos", "Identifique sua APP"],
    hrefs: ["/guias/1", "/guias/9", "/guias/8"],
  },
  {
    id: "medio" as Perfil,
    icon: MapIcon,
    label: "Médio Produtor",
    desc: "Acima de 4 módulos fiscais",
    color: "border-amber-300 bg-amber-50 text-amber-700",
    activeColor: "border-amber-500 bg-amber-100 text-amber-800 ring-2 ring-amber-300",
    dica: "Para médios produtores, o foco é regularizar a Reserva Legal e as APPs dentro dos prazos do PRA.",
    acoes: ["Calcule sua Reserva Legal", "Entenda o PRA", "Acesse crédito rural"],
    hrefs: ["/guias/3", "/guias/5", "/guias/6"],
  },
  {
    id: "oema" as Perfil,
    icon: Building2,
    label: "Analista OEMA",
    desc: "Órgão ambiental estadual",
    color: "border-blue-300 bg-blue-50 text-blue-700",
    activeColor: "border-blue-500 bg-blue-100 text-blue-800 ring-2 ring-blue-300",
    dica: "Como analista, use a IA para tirar dúvidas sobre legislação, biomas e procedimentos de regularização.",
    acoes: ["Legislação completa", "Procedimentos PRA", "Guia de georreferenciamento"],
    hrefs: ["/guias/1", "/guias/5", "/guias/4"],
  },
  {
    id: "multiplicador" as Perfil,
    icon: Network,
    label: "Multiplicador",
    desc: "Técnico, extensionista ou consultor",
    color: "border-purple-300 bg-purple-50 text-purple-700",
    activeColor: "border-purple-500 bg-purple-100 text-purple-800 ring-2 ring-purple-300",
    dica: "Você orienta produtores. Use os guias e o assistente para embasar suas explicações em campo.",
    acoes: ["Compartilhe os guias", "Use o assistente em campo", "Analisar foto do produtor"],
    hrefs: ["/guias", "/guias", "/analisar-foto"],
  },
];

const HOW_STEPS = [
  {
    step: "01",
    icon: GraduationCap,
    color: "bg-primary/10 text-primary",
    title: "Escolha seu perfil",
    desc: "Selecione se você é pequeno produtor, médio, analista ou multiplicador para receber orientação personalizada.",
    href: null,
    cta: null,
  },
  {
    step: "02",
    icon: Camera,
    color: "bg-rose-100 text-rose-700",
    title: "Analise sua propriedade",
    desc: "Envie uma foto da sua terra. A IA identifica APPs degradadas, nascentes e mata ciliar automaticamente.",
    href: "/analisar-foto",
    cta: "Analisar foto",
  },
  {
    step: "03",
    icon: FileSearch,
    color: "bg-amber-100 text-amber-700",
    title: "Diagnostique sua situação",
    desc: "Informe o tamanho e o bioma da sua propriedade e veja exatamente o que a lei exige para você.",
    href: "/diagnostico",
    cta: "Fazer diagnóstico",
  },
  {
    step: "04",
    icon: BookOpen,
    color: "bg-teal-100 text-teal-700",
    title: "Leia os guias e regularize",
    desc: "Conteúdo prático sobre APP, Reserva Legal, CAR, regularização e os benefícios de estar em dia.",
    href: "/guias",
    cta: "Ver guias",
  },
];

const CAR_FACTS = [
  "Obrigatório para todo imóvel rural no Brasil",
  "Necessário para acessar crédito rural",
  "Exigido em programas de regularização ambiental",
];

export default function Home() {
  const { open, openWith } = useChatContext();
  const [perfilSelecionado, setPerfilSelecionado] = useState<Perfil>(null);

  const { data: stats, isLoading: statsLoading } = useGetStatsSummary();
  const { data: popularTopics, isLoading: topicsLoading } = useGetPopularTopics();
  const { data: allGuides, isLoading: guidesLoading } = useListGuides({}, {
    query: { queryKey: getListGuidesQueryKey({}) }
  });

  const topGuides = allGuides?.slice(0, 3) ?? [];
  const perfilAtivo = PERFIS.find(p => p.id === perfilSelecionado) ?? null;

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
              Bem-vindo ao<br className="hidden sm:block" /> Guia CAR.
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
              <Link href="/analisar-foto">
                <button className="inline-flex items-center gap-2.5 bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:bg-rose-700 hover:-translate-y-0.5 transition-all duration-200">
                  <Camera className="w-4 h-4" />
                  Analisar minha foto
                </button>
              </Link>
              <Link href="/diagnostico">
                <button className="inline-flex items-center gap-2.5 bg-card border border-border text-foreground px-6 py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:border-secondary/50 hover:-translate-y-0.5 transition-all duration-200">
                  <MapIcon className="w-4 h-4 text-secondary" />
                  Diagnóstico da Terra
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
                    onClick={() => openWith(t.topic)}
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
          PERFIL DO USUÁRIO
      ════════════════════════════════════════ */}
      <section className="space-y-5 pt-10 pb-10 border-b border-border/50">
        <div>
          <h2 className="text-2xl font-serif font-semibold">Qual é o seu perfil?</h2>
          <p className="text-sm text-muted-foreground mt-1">Selecione para receber orientação personalizada.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PERFIS.map((perfil) => {
            const Icon = perfil.icon;
            const isActive = perfilSelecionado === perfil.id;
            return (
              <button
                key={perfil.id}
                onClick={() => setPerfilSelecionado(isActive ? null : perfil.id)}
                className={cn(
                  "flex flex-col items-center gap-2 border-2 rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5",
                  isActive ? perfil.activeColor : perfil.color + " hover:shadow-md"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-bold leading-tight">{perfil.label}</span>
                <span className="text-[10px] opacity-70 leading-tight">{perfil.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Profile-specific content */}
        {perfilAtivo && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-card border border-border rounded-xl p-5 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Dica para {perfilAtivo.label}:</span>{" "}
              {perfilAtivo.dica}
            </p>
            <div className="flex flex-wrap gap-2">
              {perfilAtivo.acoes.map((acao, i) => (
                <Link key={i} href={perfilAtivo.hrefs[i]}>
                  <button className="inline-flex items-center gap-1.5 border border-border bg-background rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted hover:shadow-sm transition-all">
                    {acao}
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════
          COMO FUNCIONA — JORNADA GUIADA
      ════════════════════════════════════════ */}
      <section className="space-y-5 pt-10 pb-10 border-b border-border/50">
        <div>
          <h2 className="text-2xl font-serif font-semibold">Do zero à regularização</h2>
          <p className="text-sm text-muted-foreground mt-1">Siga estes passos para resolver sua situação ambiental.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_STEPS.map((step, i) => (
            <div
              key={i}
              className="relative bg-card border border-border rounded-xl p-5 space-y-3 overflow-hidden group"
            >
              <span className="absolute top-3 right-4 text-6xl font-black text-foreground/[0.04] select-none leading-none">
                {step.step}
              </span>
              <div className={cn("p-2.5 rounded-xl w-fit", step.color)}>
                <step.icon className="w-4 h-4" />
              </div>
              <p className="text-sm font-semibold text-foreground pr-10">{step.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {step.href && step.cta && (
                <Link href={step.href}>
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all duration-200 pt-1">
                    {step.cta} <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              )}
              {/* Connector arrow — hidden on last card and on mobile */}
              {i < HOW_STEPS.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                  <div className="bg-background border border-border rounded-full p-1">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          DESTAQUE: ANÁLISE DE FOTO
      ════════════════════════════════════════ */}
      <section className="pt-10 pb-10 border-b border-border/50">
        <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="bg-rose-600 text-white p-4 rounded-2xl shrink-0">
            <Camera className="w-8 h-8" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              Novo · Powered by IA
            </div>
            <h2 className="text-xl font-serif font-bold text-foreground">Análise de foto da propriedade</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Tire uma foto da sua terra e deixe a inteligência artificial identificar
              APPs degradadas, nascentes sem proteção e mata ciliar — em segundos.
            </p>
          </div>
          <Link href="/analisar-foto">
            <button className="inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:bg-rose-700 hover:-translate-y-0.5 transition-all duration-200 shrink-0">
              Analisar agora
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
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
