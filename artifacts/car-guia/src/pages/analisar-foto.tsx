import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import {
  Camera,
  Upload,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  TreePine,
  Droplets,
  Leaf,
  ShieldAlert,
  Info,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatContext } from "@/components/chat-context";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Gravidade = "ok" | "atencao" | "critico";
type Urgencia = "imediato" | "curto_prazo" | "longo_prazo";

interface Elemento {
  tipo: string;
  detectado: boolean;
  descricao: string;
  gravidade: Gravidade;
}

interface ProximoPasso {
  acao: string;
  urgencia: Urgencia;
}

interface Analysis {
  risco: "baixo" | "medio" | "alto";
  resumo: string;
  elementos: Elemento[];
  recomendacoes: string[];
  proximosPassos: ProximoPasso[];
}

const TIPO_CONFIG: Record<string, { label: string; icon: typeof Leaf; color: string }> = {
  APP_degradada:    { label: "APP Degradada",         icon: AlertTriangle, color: "text-red-500"    },
  nascente:         { label: "Nascente",               icon: Droplets,      color: "text-blue-500"   },
  mata_ciliar:      { label: "Mata Ciliar",            icon: TreePine,      color: "text-emerald-600"},
  reserva_legal:    { label: "Reserva Legal",          icon: TreePine,      color: "text-green-700"  },
  vegetacao_nativa: { label: "Vegetação Nativa",       icon: Leaf,          color: "text-green-600"  },
  uso_consolidado:  { label: "Uso Consolidado",        icon: ShieldAlert,   color: "text-amber-600"  },
  area_regular:     { label: "Área Regular",           icon: CheckCircle2,  color: "text-teal-600"   },
};

const RISCO_CONFIG = {
  baixo: { label: "Risco Baixo",  bg: "bg-emerald-50",  border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
  medio: { label: "Risco Médio",  bg: "bg-amber-50",    border: "border-amber-200",   text: "text-amber-700",   dot: "bg-amber-500"   },
  alto:  { label: "Risco Alto",   bg: "bg-red-50",      border: "border-red-200",     text: "text-red-700",     dot: "bg-red-500"     },
};

const GRAVIDADE_CONFIG: Record<Gravidade, { icon: typeof CheckCircle2; color: string; label: string }> = {
  ok:      { icon: CheckCircle2,  color: "text-emerald-500", label: "Regular"  },
  atencao: { icon: AlertTriangle, color: "text-amber-500",   label: "Atenção"  },
  critico: { icon: XCircle,       color: "text-red-500",     label: "Crítico"  },
};

const URGENCIA_CONFIG: Record<Urgencia, { label: string; color: string }> = {
  imediato:     { label: "Imediato",     color: "bg-red-100 text-red-700"    },
  curto_prazo:  { label: "Curto prazo",  color: "bg-amber-100 text-amber-700"},
  longo_prazo:  { label: "Longo prazo",  color: "bg-blue-100 text-blue-700"  },
};

export default function AnalisarFoto() {
  const { openWith } = useChatContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState("image/jpeg");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Por favor, envie um arquivo de imagem (JPG, PNG, WEBP).");
      return;
    }
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setAnalysis(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, []);

  const analyze = async () => {
    if (!preview) return;
    setLoading(true);
    setError(null);
    try {
      const base64 = preview.split(",")[1];
      const res = await fetch(`${API_BASE}/api/analyze-photo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Erro desconhecido" }));
        throw new Error(err.error || "Erro ao analisar imagem");
      }
      const data: Analysis = await res.json();
      setAnalysis(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setAnalysis(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const askAbout = (topic: string) => {
    openWith(`Analisei uma foto da minha propriedade e foi detectado: ${topic}. O que devo fazer?`);
  };

  const detectedElements = analysis?.elementos.filter(e => e.detectado) ?? [];
  const riscoCfg = analysis ? RISCO_CONFIG[analysis.risco] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
          <Camera className="w-3.5 h-3.5" />
          Análise por IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
          Analisar Foto da Propriedade
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
          Envie uma foto da sua terra. A IA identifica APPs, nascentes, mata ciliar e
          alerta sobre possíveis irregularidades.
        </p>
      </div>

      {/* Upload area */}
      {!preview ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer",
            dragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary/10 p-5 rounded-2xl">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                Arraste uma foto ou clique para selecionar
              </p>
              <p className="text-sm text-muted-foreground">
                JPG, PNG ou WEBP • Área de APP, margem de rio, pastagem, mata nativa
              </p>
            </div>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:bg-primary/90 transition-all">
              <Camera className="w-4 h-4" />
              Escolher foto
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image preview */}
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm">
            <img
              src={preview}
              alt="Foto da propriedade"
              className="w-full max-h-80 object-cover"
            />
            {!loading && !analysis && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-5">
                <div className="flex gap-3">
                  <button
                    onClick={analyze}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:bg-primary/90 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    Analisar agora
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 bg-white/90 text-foreground px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:bg-white transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Trocar
                  </button>
                </div>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <p className="text-white font-semibold text-sm">Analisando com IA…</p>
                <p className="text-white/70 text-xs">Verificando APP, nascentes, mata ciliar…</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700">Erro na análise</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {analysis && riscoCfg && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">

          {/* Risk badge + summary */}
          <div className={cn("rounded-2xl border p-5 space-y-3", riscoCfg.bg, riscoCfg.border)}>
            <div className="flex items-center gap-2">
              <span className={cn("w-2.5 h-2.5 rounded-full", riscoCfg.dot)} />
              <span className={cn("text-sm font-bold uppercase tracking-wide", riscoCfg.text)}>
                {riscoCfg.label}
              </span>
            </div>
            <p className={cn("text-sm leading-relaxed font-medium", riscoCfg.text)}>
              {analysis.resumo}
            </p>
          </div>

          {/* Detected elements */}
          {detectedElements.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Info className="w-4 h-4 text-muted-foreground" />
                Elementos Detectados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detectedElements.map((el, i) => {
                  const cfg = TIPO_CONFIG[el.tipo] ?? { label: el.tipo, icon: Info, color: "text-muted-foreground" };
                  const grav = GRAVIDADE_CONFIG[el.gravidade];
                  const Icon = cfg.icon;
                  const GravIcon = grav.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => askAbout(`${cfg.label}: ${el.descricao}`)}
                      className="group flex items-start gap-3 bg-card border border-border rounded-xl p-4 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="bg-muted rounded-lg p-2 shrink-0">
                        <Icon className={cn("w-4 h-4", cfg.color)} />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-foreground">{cfg.label}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <GravIcon className={cn("w-3.5 h-3.5", grav.color)} />
                            <span className={cn("text-xs font-medium", grav.color)}>{grav.label}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {el.descricao}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" />
                Clique em um elemento para perguntar ao assistente
              </p>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recomendacoes.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-foreground">Recomendações</h2>
              <ul className="space-y-2">
                {analysis.recomendacoes.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next steps */}
          {analysis.proximosPassos.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-foreground">Próximos Passos</h2>
              <div className="space-y-2">
                {analysis.proximosPassos.map((passo, i) => {
                  const urg = URGENCIA_CONFIG[passo.urgencia];
                  return (
                    <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                      <span className="text-sm font-bold text-muted-foreground w-5 shrink-0">{i + 1}.</span>
                      <p className="text-sm text-foreground flex-1">{passo.acao}</p>
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full shrink-0", urg.color)}>
                        {urg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                openWith(`Analisei minha propriedade e o resultado foi: risco ${analysis.risco}. ${analysis.resumo}. O que devo fazer agora?`);
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            >
              Tirar dúvidas com o assistente
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link href="/diagnostico">
              <button className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                Fazer diagnóstico completo
              </button>
            </Link>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 text-muted-foreground px-4 py-2.5 rounded-xl font-medium text-sm hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Nova análise
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/60 leading-relaxed border-t border-border/50 pt-4">
            Esta análise é gerada por inteligência artificial com base na imagem enviada e serve como orientação inicial.
            Para regularização oficial, consulte o órgão ambiental estadual ou um profissional habilitado.
          </p>
        </div>
      )}
    </div>
  );
}
