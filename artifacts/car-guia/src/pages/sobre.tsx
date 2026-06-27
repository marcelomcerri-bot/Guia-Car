import { ExternalLink, Github, Heart, Sprout } from "lucide-react";
import { useChatContext } from "@/components/chat-context";

export default function Sobre() {
  const { open } = useChatContext();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-8 py-14 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
          <Sprout className="w-3.5 h-3.5" />
          haCARthon — Desafio 3
        </div>
        <h1 className="text-4xl font-serif font-bold tracking-tight leading-tight">
          Sobre o Guia CAR
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Uma ferramenta de código aberto para ajudar o produtor rural brasileiro a
          entender o Cadastro Ambiental Rural e o Código Florestal — sem juridiquês.
        </p>
      </section>

      {/* Divider */}
      <div className="border-t border-border/60" />

      {/* Origin */}
      <section className="space-y-3">
        <h2 className="text-lg font-serif font-semibold">De onde surgiu</h2>
        <p className="text-muted-foreground leading-relaxed">
          O Guia CAR nasceu no <strong className="text-foreground">haCARthon</strong>,
          um hackathon que reuniu desenvolvedores, agrônomos e advogados ambientais com
          um objetivo: traduzir a legislação ambiental em linguagem simples e prática.
          O desafio foi pensar no <em>"Seu Raimundo"</em> — o pequeno produtor que
          precisa entender seus direitos e obrigações sem depender de um advogado.
        </p>
      </section>

      {/* Mission */}
      <section className="space-y-3">
        <h2 className="text-lg font-serif font-semibold">Nossa missão</h2>
        <p className="text-muted-foreground leading-relaxed">
          Fazer com que nenhum produtor rural perca acesso a crédito, benefícios ou
          caia em multa por não entender o que a lei pede.{" "}
          <strong className="text-foreground">Informação clara salva propriedades.</strong>
        </p>
      </section>

      {/* CTA */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-serif font-semibold">Quer contribuir?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Este é um projeto de código aberto — qualquer pessoa pode ajudar com código,
          revisão de conteúdo, feedback ou divulgação.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/hacarton"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            <Github className="w-4 h-4" />
            Ver no GitHub
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <button
            onClick={open}
            className="inline-flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            Enviar feedback
          </button>
        </div>
      </section>

      {/* Tech */}
      <p className="text-xs text-muted-foreground text-center pb-4">
        Construído com React, Node.js, PostgreSQL e Gemini AI · Licença MIT
      </p>
    </div>
  );
}
