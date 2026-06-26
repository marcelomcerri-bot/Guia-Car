import { Link, useParams } from "wouter";
import { useListDiagnoses, getListDiagnosesQueryKey } from "@workspace/api-client-react";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle, AlertCircle, Clock, MessageSquare, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";

const BIOME_LABELS: Record<string, string> = {
  amazonia: "Amazônia",
  cerrado: "Cerrado",
  mata_atlantica: "Mata Atlântica",
  caatinga: "Caatinga",
  pampa: "Pampa",
  pantanal: "Pantanal",
};

const PROPERTY_LABELS: Record<string, string> = {
  pequena: "Pequena Propriedade",
  media: "Média Propriedade",
  grande: "Grande Propriedade",
};

export default function DiagnosticoResultado() {
  const { id } = useParams<{ id: string }>();
  const sessionId = useSession();

  const { data: diagnoses, isLoading } = useListDiagnoses(
    { sessionId: sessionId || "" },
    { query: { enabled: !!sessionId, queryKey: getListDiagnosesQueryKey({ sessionId: sessionId || "" }) } }
  );

  const diagnosis = diagnoses?.find((d) => d.id === Number(id));

  if (isLoading || !sessionId) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-8 py-8 space-y-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!diagnosis) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-8 py-8 text-center space-y-4">
        <p className="text-muted-foreground">Diagnóstico não encontrado.</p>
        <Link href="/diagnostico">
          <Button variant="outline">Fazer novo diagnóstico</Button>
        </Link>
      </div>
    );
  }

  const situacaoConfig = {
    regular: {
      label: "Regular",
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
      badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    pendente: {
      label: "Pendente",
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    },
    irregular: {
      label: "Irregular",
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
      badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

  const cfg = situacaoConfig[diagnosis.situacao as keyof typeof situacaoConfig];
  const Icon = cfg.icon;

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-8 py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/diagnostico">
        <Button variant="ghost" size="sm" className="-ml-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> Novo diagnóstico
        </Button>
      </Link>

      <div className="space-y-1">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Resultado</h1>
        <p className="text-sm text-muted-foreground">
          {PROPERTY_LABELS[diagnosis.propertyType]} — {BIOME_LABELS[diagnosis.biome]}
        </p>
      </div>

      <Card className={cn("border-2", cfg.bg)}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Icon className={cn("w-8 h-8", cfg.color)} />
            <div>
              <p className="text-sm text-muted-foreground">Situação da propriedade</p>
              <span className={cn("inline-block text-lg font-bold font-serif mt-0.5", cfg.color)}>
                {cfg.label}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TreePine className="w-5 h-5 text-primary" />
            Exigências do Código Florestal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4 text-center space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">APP exigida</p>
              <p className="text-2xl font-bold font-serif text-foreground">
                {diagnosis.appRequiredHectares.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">hectares</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Reserva Legal</p>
              <p className="text-2xl font-bold font-serif text-foreground">
                {diagnosis.reservaLegalRequiredHectares.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">hectares</p>
            </div>
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs text-muted-foreground">
            Total da propriedade: <span className="font-semibold text-foreground">{diagnosis.totalAreaHectares} ha</span> — Bioma: <span className="font-semibold text-foreground">{BIOME_LABELS[diagnosis.biome]}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">O que fazer agora</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {diagnosis.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex-none w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 space-y-3">
        <p className="text-sm font-medium">Ficou com dúvida sobre o diagnóstico?</p>
        <Link href="/chat">
          <Button size="sm" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Perguntar ao assistente
          </Button>
        </Link>
      </div>
    </div>
  );
}
