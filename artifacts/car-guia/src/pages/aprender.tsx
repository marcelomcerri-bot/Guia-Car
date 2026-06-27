import { useState, useEffect } from "react";
import { Star, Lock, X, Heart, CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Question {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface SessionDef {
  id: string;
  title: string;
  category: string;
  desc: string;
  colorClass: string;
  lightBg: string;
  borderColor: string;
  textColor: string;
  minPass: number;
  illustration: React.ReactNode;
  questions: Question[];
}

type SessionProgress = Record<string, { bestScore: number; stars: number }>;

// ── Illustrations ─────────────────────────────────────────────────────────────
function IllustrationCAR() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="white" fillOpacity="0.25" />
      <rect x="16" y="14" width="20" height="3" rx="1.5" fill="white" fillOpacity="0.7" />
      <rect x="16" y="21" width="32" height="2" rx="1" fill="white" fillOpacity="0.5" />
      <rect x="16" y="27" width="28" height="2" rx="1" fill="white" fillOpacity="0.5" />
      <rect x="16" y="33" width="24" height="2" rx="1" fill="white" fillOpacity="0.5" />
      <circle cx="42" cy="43" r="10" fill="white" fillOpacity="0.3" />
      <path d="M42 36 C38.5 36 36 38.7 36 42 C36 46 42 52 42 52 C42 52 48 46 48 42 C48 38.7 45.5 36 42 36Z" fill="white" fillOpacity="0.8" />
      <circle cx="42" cy="42" r="2.5" fill="currentColor" />
    </svg>
  );
}

function IllustrationAPP() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <path d="M8 44 Q20 36 32 44 Q44 52 56 44" stroke="white" strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
      <path d="M8 38 Q20 30 32 38 Q44 46 56 38" stroke="white" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
      <ellipse cx="18" cy="30" rx="7" ry="10" fill="white" fillOpacity="0.3" />
      <rect x="15" y="38" width="5" height="6" rx="1" fill="white" fillOpacity="0.5" />
      <ellipse cx="32" cy="26" rx="9" ry="13" fill="white" fillOpacity="0.25" />
      <rect x="29" y="38" width="5" height="6" rx="1" fill="white" fillOpacity="0.5" />
      <ellipse cx="46" cy="30" rx="7" ry="10" fill="white" fillOpacity="0.3" />
      <rect x="43" y="38" width="5" height="6" rx="1" fill="white" fillOpacity="0.5" />
    </svg>
  );
}

function IllustrationRL() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <path d="M32 10 L36 20 L44 20 L38 26 L40 34 L32 29 L24 34 L26 26 L20 20 L28 20Z" fill="white" fillOpacity="0.8" />
      <path d="M18 22 L21 30 L27 30 L22 35 L24 41 L18 37 L12 41 L14 35 L9 30 L15 30Z" fill="white" fillOpacity="0.5" />
      <path d="M46 22 L49 30 L55 30 L50 35 L52 41 L46 37 L40 41 L42 35 L37 30 L43 30Z" fill="white" fillOpacity="0.5" />
      <rect x="28" y="40" width="8" height="12" rx="2" fill="white" fillOpacity="0.6" />
      <path d="M8 52 H56" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function IllustrationReg() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <rect x="10" y="8" width="44" height="48" rx="5" fill="white" fillOpacity="0.2" />
      <rect x="18" y="18" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
      <path d="M16 20.5 H20 M22 20.5 H40" stroke="white" strokeWidth="2" strokeOpacity="0" />
      <rect x="26" y="19" width="20" height="2.5" rx="1.2" fill="white" fillOpacity="0.6" />
      <rect x="18" y="28" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
      <rect x="26" y="29" width="20" height="2.5" rx="1.2" fill="white" fillOpacity="0.6" />
      <rect x="18" y="38" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
      <rect x="26" y="39" width="14" height="2.5" rx="1.2" fill="white" fillOpacity="0.6" />
      <path d="M19 20.5 L21 22.5 L24 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 30.5 L21 32.5 L24 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IllustrationBeneficios() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <circle cx="32" cy="28" r="16" fill="white" fillOpacity="0.25" />
      <circle cx="32" cy="28" r="11" fill="white" fillOpacity="0.3" />
      <text x="32" y="33" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fillOpacity="0.9">R$</text>
      <path d="M20 46 L24 40 M32 48 L32 42 M44 46 L40 40" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
      <circle cx="20" cy="48" r="3" fill="white" fillOpacity="0.5" />
      <circle cx="32" cy="50" r="3" fill="white" fillOpacity="0.5" />
      <circle cx="44" cy="48" r="3" fill="white" fillOpacity="0.5" />
    </svg>
  );
}

// ── Session data ───────────────────────────────────────────────────────────────
const SESSIONS: SessionDef[] = [
  {
    id: "car",
    title: "Cadastro Ambiental Rural",
    category: "CAR",
    desc: "O que é, para que serve e como funciona o registro ambiental.",
    colorClass: "bg-primary",
    lightBg: "bg-primary/10",
    borderColor: "border-primary/30",
    textColor: "text-primary",
    minPass: 3,
    illustration: <IllustrationCAR />,
    questions: [
      {
        text: "O que significa a sigla CAR?",
        options: ["Controle de Área Rural", "Cadastro Ambiental Rural", "Certificado Agrário Rural", "Certidão de Aprovação Rural"],
        correct: 1,
        explanation: "CAR = Cadastro Ambiental Rural. É um registro eletrônico obrigatório para todos os imóveis rurais do Brasil.",
      },
      {
        text: "O CAR é obrigatório para quem?",
        options: ["Apenas fazendas acima de 1.000 ha", "Todos os proprietários e posseiros rurais", "Só quem recebe crédito do governo", "Apenas no Bioma Amazônia"],
        correct: 1,
        explanation: "Todos os proprietários, posseiros e arrendatários rurais são obrigados a fazer o CAR, independente do tamanho da propriedade.",
      },
      {
        text: "Em qual sistema o CAR é registrado?",
        options: ["Portal do IBGE Rural", "SICAR — Sistema Nacional de CAR", "Sistema IBAMA Online", "Portal do Agricultor / MAPA"],
        correct: 1,
        explanation: "O SICAR (Sistema Nacional de Cadastro Ambiental Rural) é a plataforma federal onde o CAR é feito.",
      },
      {
        text: "O CAR é exigido para acessar qual benefício?",
        options: ["Isenção total de impostos rurais", "Crédito rural e programas do governo", "Registro de marca de produto", "Carteira de Trabalho Rural"],
        correct: 1,
        explanation: "Sem o CAR, o produtor fica impedido de acessar crédito rural (Pronaf, ABC+) e outros programas de governo.",
      },
      {
        text: "Qual informação NÃO é registrada no CAR?",
        options: ["Limites e confrontações do imóvel", "Localização das APPs e Reserva Legal", "Número de animais criados na fazenda", "Remanescentes de vegetação nativa"],
        correct: 2,
        explanation: "O CAR registra dados geográficos e ambientais da propriedade. O rebanho e outros dados produtivos não fazem parte do CAR.",
      },
    ],
  },
  {
    id: "app",
    title: "Área de Preservação Permanente",
    category: "APP",
    desc: "Margens de rios, topos de morro e outras áreas protegidas por lei.",
    colorClass: "bg-emerald-600",
    lightBg: "bg-emerald-50",
    borderColor: "border-emerald-300",
    textColor: "text-emerald-700",
    minPass: 3,
    illustration: <IllustrationAPP />,
    questions: [
      {
        text: "O que são as Áreas de Preservação Permanente (APPs)?",
        options: ["Áreas para plantar espécies exóticas", "Áreas protegidas que preservam recursos hídricos e biodiversidade", "Áreas de pastagem extensiva permitida", "Terras públicas para assentamento rural"],
        correct: 1,
        explanation: "APPs são áreas protegidas por lei, independente de cobertura vegetal, com função de preservar a água, o solo e a biodiversidade.",
      },
      {
        text: "Qual a faixa mínima de APP em margens de rios de até 10m de largura?",
        options: ["5 metros", "15 metros", "30 metros", "50 metros"],
        correct: 2,
        explanation: "Para rios com até 10 metros de largura, a faixa de APP é de 30 metros em cada margem, conforme o Código Florestal.",
      },
      {
        text: "Qual destes locais é APP automaticamente?",
        options: ["Áreas com pasto há mais de 10 anos", "Topos de morro e chapadas", "Terrenos planos próximos a rodovias", "Áreas com solo arenoso"],
        correct: 1,
        explanation: "Topos de morro, montanhas, chapadas e serras são APPs por natureza, independente de qualquer decreto ou delimitação.",
      },
      {
        text: "Desmatar uma APP é permitido em qual situação?",
        options: ["Nunca, em hipótese alguma", "Em casos de utilidade pública ou interesse social, com autorização", "Livremente para pequenos produtores", "Se o produtor replantar em outra área"],
        correct: 1,
        explanation: "O Código Florestal prevê exceções para obras de utilidade pública (estradas, energia) e interesse social, sempre com licença ambiental.",
      },
      {
        text: "APP degradada em propriedade rural deve ser:",
        options: ["Mantida assim se o produtor tiver CAR", "Recomposta com vegetação nativa no prazo legal", "Convertida em área de lazer da propriedade", "Cercada e deixada sem intervenção eterna"],
        correct: 1,
        explanation: "A lei obriga a recomposição da APP degradada. O prazo e a forma dependem do tamanho da propriedade e do programa de regularização.",
      },
    ],
  },
  {
    id: "reserva-legal",
    title: "Reserva Legal",
    category: "Reserva Legal",
    desc: "Percentuais mínimos de vegetação nativa que toda propriedade deve manter.",
    colorClass: "bg-green-700",
    lightBg: "bg-green-50",
    borderColor: "border-green-300",
    textColor: "text-green-800",
    minPass: 3,
    illustration: <IllustrationRL />,
    questions: [
      {
        text: "O que é a Reserva Legal?",
        options: ["Uma área reservada para morar na propriedade", "Uma área de vegetação nativa que deve ser protegida e mantida", "Uma área para reflorestamento com eucalipto", "Uma reserva de água subterrânea"],
        correct: 1,
        explanation: "A Reserva Legal é uma área dentro da propriedade rural com vegetação nativa que não pode ser desmatada — ela garante a biodiversidade e o equilíbrio ambiental.",
      },
      {
        text: "No Bioma Amazônia, qual o percentual mínimo de Reserva Legal?",
        options: ["20%", "35%", "50%", "80%"],
        correct: 3,
        explanation: "Na Amazônia, 80% da propriedade deve ser mantida como Reserva Legal — o maior percentual entre todos os biomas.",
      },
      {
        text: "Para propriedades no Cerrado (dentro da Amazônia Legal), o percentual é:",
        options: ["20%", "35%", "50%", "80%"],
        correct: 1,
        explanation: "No Cerrado dentro da Amazônia Legal, o percentual de Reserva Legal é 35% — diferente do Cerrado fora da Amazônia, onde é 20%.",
      },
      {
        text: "É possível compensar a Reserva Legal em área fora da propriedade?",
        options: ["Não, nunca é permitido", "Sim, com Servidão Ambiental ou CRA no mesmo bioma", "Sim, em qualquer Estado do país", "Somente com autorização do IBGE"],
        correct: 1,
        explanation: "A compensação da Reserva Legal é permitida com Servidão Ambiental, Cota de Reserva Ambiental (CRA) ou doação ao Poder Público, sempre no mesmo bioma.",
      },
      {
        text: "O registro da Reserva Legal deve ser feito onde?",
        options: ["Apenas no cartório de imóveis local", "No CAR — Cadastro Ambiental Rural", "Na Prefeitura Municipal", "No sindicato rural regional"],
        correct: 1,
        explanation: "Com o Código Florestal de 2012, o registro da Reserva Legal foi simplificado: basta inscrevê-la no CAR. A averbação em cartório foi dispensada.",
      },
    ],
  },
  {
    id: "regularizacao",
    title: "Regularização Ambiental",
    category: "Regularização",
    desc: "Como regularizar passivos ambientais e aderir ao PRA.",
    colorClass: "bg-amber-500",
    lightBg: "bg-amber-50",
    borderColor: "border-amber-300",
    textColor: "text-amber-700",
    minPass: 3,
    illustration: <IllustrationReg />,
    questions: [
      {
        text: "O que é o PRA?",
        options: ["Plano de Recuperação de Animais", "Programa de Regularização Ambiental", "Projeto de Renda Agrícola", "Plano de Reforma Administrativa"],
        correct: 1,
        explanation: "O PRA (Programa de Regularização Ambiental) permite que produtores com passivos ambientais regularizem suas propriedades de forma planejada.",
      },
      {
        text: "Para aderir ao PRA, o produtor precisa primeiro:",
        options: ["Pagar todas as multas ambientais", "Estar inscrito no CAR", "Contratar um advogado ambiental", "Obter licença do IBAMA"],
        correct: 1,
        explanation: "A inscrição no CAR é o ponto de partida. Só a partir do CAR é possível identificar o passivo ambiental e aderir ao PRA.",
      },
      {
        text: "Durante o cumprimento do PRA, as multas ambientais ficam:",
        options: ["Dobradas como incentivo", "Suspensas enquanto o compromisso for cumprido", "Convertidas em serviços municipais", "Canceladas automaticamente"],
        correct: 1,
        explanation: "As multas por desmatamento irregular ficam suspensas durante a vigência do PRA. Se cumprido integralmente, são extintas.",
      },
      {
        text: "Qual órgão analisa e valida o CAR?",
        options: ["Receita Federal", "Órgão ambiental estadual competente", "Tribunal Agrário Regional", "Ministério da Fazenda"],
        correct: 1,
        explanation: "Cada estado possui seu órgão ambiental (ex: SEMA, IEMA, INEA) responsável por analisar e validar os cadastros no SICAR.",
      },
      {
        text: "O prazo para recomposição de APP em propriedades consolidadas pode chegar a:",
        options: ["5 anos", "10 anos", "20 anos", "30 anos"],
        correct: 2,
        explanation: "O Código Florestal prevê prazos de recomposição de até 20 anos para APPs em propriedades com situação consolidada até 22 de julho de 2008.",
      },
    ],
  },
  {
    id: "beneficios",
    title: "Benefícios da Regularização",
    category: "Benefícios",
    desc: "Crédito, seguros, mercados e vantagens para quem está em dia.",
    colorClass: "bg-teal-600",
    lightBg: "bg-teal-50",
    borderColor: "border-teal-300",
    textColor: "text-teal-700",
    minPass: 3,
    illustration: <IllustrationBeneficios />,
    questions: [
      {
        text: "Produtor com CAR regularizado pode acessar:",
        options: ["Apenas empréstimos de bancos privados", "Crédito rural do Pronaf e programas do governo", "Somente subsídios estaduais pontuais", "Isenção de todas as taxas agrícolas"],
        correct: 1,
        explanation: "O CAR em dia é exigência para acessar o Pronaf, ABC+, Pronamp e diversos outros programas de crédito rural subsidiado.",
      },
      {
        text: "O Programa ABC+ (Agricultura de Baixo Carbono) financia:",
        options: ["Compra de terras para expansão", "Práticas sustentáveis como plantio direto e integração lavoura-pecuária", "Importação de maquinário estrangeiro", "Exportação de commodities para Europa"],
        correct: 1,
        explanation: "O ABC+ é uma linha de crédito rural que financia a transição para sistemas de produção sustentáveis, como plantio direto, recuperação de pastagens e florestas plantadas.",
      },
      {
        text: "A regularização ambiental abre portas para mercados que exigem:",
        options: ["Apenas certificação orgânica oficial", "Rastreabilidade ambiental e sustentabilidade comprovada", "Licença especial do MAPA", "Contrato exclusivo com cooperativas"],
        correct: 1,
        explanation: "Mercados como União Europeia e grandes varejistas exigem comprovação de origem sustentável. O CAR e a regularização são a base dessa rastreabilidade.",
      },
      {
        text: "A Cota de Reserva Ambiental (CRA) permite ao produtor:",
        options: ["Desmatar legalmente parte da APP", "Monetizar vegetação nativa que excede o exigido por lei", "Trocar Reserva Legal por área de pastagem", "Vender créditos de carbono diretamente"],
        correct: 1,
        explanation: "O produtor com Reserva Legal acima do mínimo exigido pode emitir CRAs e vendê-las a quem precisa compensar déficit — gerando renda com a floresta em pé.",
      },
      {
        text: "Qual seguro rural é especialmente importante para produtores regularizados?",
        options: ["Seguro contra roubo de maquinário", "Proagro — proteção contra perdas climáticas", "Seguro de responsabilidade civil ambiental", "Seguro de saúde rural familiar"],
        correct: 1,
        explanation: "O Proagro (e sua versão simplificada, Proagro Mais) protege pequenos produtores de perdas por chuvas, seca ou outras adversidades climáticas — e exige CAR para adesão.",
      },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const STORAGE_KEY = "car-guia-aprender-progress";

function loadProgress(): SessionProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(p: SessionProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

function calcStars(score: number, total: number): number {
  const pct = score / total;
  if (pct >= 1) return 3;
  if (pct >= 0.8) return 2;
  if (pct >= 0.6) return 1;
  return 0;
}

function isUnlocked(idx: number, progress: SessionProgress): boolean {
  if (idx === 0) return true;
  const prev = SESSIONS[idx - 1];
  const prevP = progress[prev.id];
  return prevP != null && prevP.stars > 0;
}

// ── Star display ───────────────────────────────────────────────────────────────
function Stars({ count, size = "sm" }: { count: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <Star key={i} className={cn(sz, i < count ? "fill-amber-400 text-amber-400" : "fill-muted text-muted")} />
      ))}
    </div>
  );
}

// ── Quiz view ──────────────────────────────────────────────────────────────────
function QuizView({
  session,
  onComplete,
  onExit,
}: {
  session: SessionDef;
  onComplete: (score: number, stars: number) => void;
  onExit: () => void;
}) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [lives, setLives] = useState(3);

  const q = session.questions[qIdx];
  const total = session.questions.length;
  const stars = calcStars(score + (done ? 0 : 0), total);

  function handleSelect(idx: number) {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    if (idx === q.correct) {
      setScore((s) => s + 1);
    } else {
      setLives((l) => Math.max(0, l - 1));
    }
  }

  function handleNext() {
    if (qIdx + 1 >= total) {
      const finalScore = selected === q.correct ? score : score;
      const finalStars = calcStars(score + (selected === q.correct ? 1 : 0), total);
      setDone(true);
      onComplete(score + (selected === q.correct ? 1 : 0), finalStars);
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
    }
  }

  const finalScore = score + (showFeedback && selected === q.correct ? 1 : 0);
  const finalStars = calcStars(finalScore, total);

  if (done) {
    const passed = finalStars > 0;
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-6 animate-in fade-in duration-500">
        <div className={cn("rounded-full p-6", passed ? "bg-primary/10" : "bg-rose-50")}>
          {passed
            ? <Trophy className="w-14 h-14 text-primary" />
            : <XCircle className="w-14 h-14 text-rose-500" />}
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold">
            {passed ? "Muito bem!" : "Quase lá!"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {passed
              ? `Você acertou ${finalScore} de ${total} perguntas.`
              : `Você precisa de ${session.minPass} acertos para avançar. Tente novamente!`}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <Stars count={finalStars} size="lg" />
          <span className="text-4xl font-bold font-serif text-foreground">
            {finalScore}/{total}
          </span>
        </div>

        {passed && (
          <div className={cn("rounded-xl border px-5 py-3 text-sm font-medium", session.lightBg, session.borderColor, session.textColor)}>
            ✓ Sessão "{session.category}" concluída! Próxima sessão desbloqueada.
          </div>
        )}

        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          {passed ? "Continuar" : "Tentar de novo"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Top bar */}
      <div className="flex items-center gap-4">
        <button onClick={onExit} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>
        {/* Progress bar */}
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", session.colorClass)}
            style={{ width: `${(qIdx / total) * 100}%` }}
          />
        </div>
        {/* Lives */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <Heart key={i} className={cn("w-5 h-5", i < lives ? "fill-rose-500 text-rose-500" : "fill-muted text-muted")} />
          ))}
        </div>
      </div>

      {/* Session badge */}
      <div className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", session.lightBg, session.textColor)}>
        <span>{session.category}</span>
        <span className="opacity-50">•</span>
        <span>{qIdx + 1}/{total}</span>
      </div>

      {/* Question */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pergunta {qIdx + 1}</p>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground leading-snug">
          {q.text}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          let style = "bg-card border border-border text-foreground hover:border-primary/40 hover:bg-primary/5";
          if (showFeedback && isCorrect) style = "bg-emerald-50 border-2 border-emerald-500 text-emerald-800";
          else if (showFeedback && isSelected && !isCorrect) style = "bg-rose-50 border-2 border-rose-400 text-rose-800";
          else if (showFeedback) style = "bg-card border border-border text-muted-foreground opacity-60";

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showFeedback}
              className={cn(
                "w-full text-left px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-3",
                style,
                !showFeedback && "active:scale-[0.99] cursor-pointer"
              )}
            >
              <span className={cn(
                "w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                showFeedback && isCorrect ? "border-emerald-500 bg-emerald-500 text-white" :
                showFeedback && isSelected && !isCorrect ? "border-rose-400 bg-rose-400 text-white" :
                "border-border text-muted-foreground"
              )}>
                {showFeedback && isCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                 showFeedback && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                 String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback banner */}
      {showFeedback && (
        <div className={cn(
          "rounded-xl p-4 space-y-2 animate-in slide-in-from-bottom-2 duration-300",
          selected === q.correct ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"
        )}>
          <p className={cn("font-semibold text-sm", selected === q.correct ? "text-emerald-700" : "text-rose-700")}>
            {selected === q.correct ? "✓ Correto!" : "✗ Incorreto"}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
          <button
            onClick={handleNext}
            className={cn(
              "mt-1 w-full py-2.5 rounded-lg font-semibold text-sm transition-colors",
              selected === q.correct
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-rose-500 text-white hover:bg-rose-600"
            )}
          >
            {qIdx + 1 >= total ? "Ver resultado" : "Continuar"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function Aprender() {
  const [progress, setProgress] = useState<SessionProgress>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => { setProgress(loadProgress()); }, []);

  const totalStars = Object.values(progress).reduce((s, p) => s + p.stars, 0);
  const maxStars = SESSIONS.length * 3;

  function handleComplete(sessionIdx: number, score: number, stars: number) {
    const session = SESSIONS[sessionIdx];
    const prev = progress[session.id];
    const updated = {
      ...progress,
      [session.id]: {
        bestScore: Math.max(score, prev?.bestScore ?? 0),
        stars: Math.max(stars, prev?.stars ?? 0),
      },
    };
    setProgress(updated);
    saveProgress(updated);
    setShowResult(true);
  }

  function handleExit() {
    setActiveIdx(null);
    setShowResult(false);
    setProgress(loadProgress());
  }

  // Quiz mode
  if (activeIdx !== null) {
    return (
      <div className="mx-auto max-w-2xl px-2 animate-in fade-in duration-300">
        <QuizView
          session={SESSIONS[activeIdx]}
          onComplete={(score, stars) => handleComplete(activeIdx, score, stars)}
          onExit={handleExit}
        />
      </div>
    );
  }

  // Map mode
  return (
    <div className="mx-auto max-w-lg px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          {totalStars} / {maxStars} estrelas
        </div>
        <h1 className="text-3xl font-serif font-bold">Aprenda jogando</h1>
        <p className="text-muted-foreground text-sm">
          Complete cada sessão para desbloquear a próxima.
        </p>
      </div>

      {/* Journey */}
      <div className="relative flex flex-col items-center gap-0">
        {SESSIONS.map((session, idx) => {
          const unlocked = isUnlocked(idx, progress);
          const prog = progress[session.id];
          const stars = prog?.stars ?? 0;
          const completed = stars > 0;
          const isCurrent = unlocked && !completed;

          return (
            <div key={session.id} className="flex flex-col items-center w-full">
              {/* Connecting line above (except first) */}
              {idx > 0 && (
                <div className={cn(
                  "w-0.5 h-10 transition-colors duration-500",
                  isUnlocked(idx, progress) ? "bg-primary/40" : "bg-border"
                )} />
              )}

              {/* Node */}
              <div className="relative flex flex-col items-center">
                {/* Pulse ring for current */}
                {isCurrent && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 scale-150 pointer-events-none" />
                )}

                <button
                  onClick={() => unlocked && setActiveIdx(idx)}
                  disabled={!unlocked}
                  className={cn(
                    "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-md",
                    unlocked ? `${session.colorClass} hover:scale-105 hover:shadow-lg cursor-pointer` : "bg-muted cursor-default",
                    isCurrent && "ring-4 ring-offset-2 ring-primary/40"
                  )}
                  style={{ color: "white" }}
                >
                  {unlocked ? session.illustration : <Lock className="w-7 h-7 text-muted-foreground" />}
                </button>

                {/* Completed check */}
                {completed && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </span>
                )}
              </div>

              {/* Label block */}
              <div className="mt-3 mb-1 text-center space-y-1">
                <div className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold",
                  unlocked ? `${session.lightBg} ${session.textColor}` : "bg-muted text-muted-foreground"
                )}>
                  {session.category}
                </div>
                <p className={cn("text-sm font-semibold", unlocked ? "text-foreground" : "text-muted-foreground")}>
                  {session.title}
                </p>
                <p className={cn("text-xs max-w-[240px] leading-relaxed", unlocked ? "text-muted-foreground" : "text-muted-foreground/50")}>
                  {session.desc}
                </p>

                {/* Stars or start button */}
                {completed ? (
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <Stars count={stars} />
                    <button
                      onClick={() => setActiveIdx(idx)}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Refazer
                    </button>
                  </div>
                ) : unlocked ? (
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={cn(
                      "mt-2 px-6 py-2 rounded-xl text-sm font-bold text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
                      session.colorClass
                    )}
                  >
                    COMEÇAR
                  </button>
                ) : (
                  <p className="text-xs text-muted-foreground/50 mt-1">Conclua a sessão anterior</p>
                )}
              </div>
            </div>
          );
        })}

        {/* Finish line */}
        <div className="flex flex-col items-center mt-2">
          <div className={cn("w-0.5 h-10", Object.keys(progress).length === SESSIONS.length ? "bg-primary/40" : "bg-border")} />
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shadow-md",
            Object.values(progress).every(p => p.stars > 0) && Object.keys(progress).length === SESSIONS.length
              ? "bg-amber-400"
              : "bg-muted"
          )}>
            <Trophy className={cn(
              "w-8 h-8",
              Object.values(progress).every(p => p.stars > 0) && Object.keys(progress).length === SESSIONS.length
                ? "text-white"
                : "text-muted-foreground"
            )} />
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">Mestre do CAR</p>
        </div>
      </div>
    </div>
  );
}
