import { ExternalLink, Github, Code2, Users, MessageSquare, Bug, BookOpen, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CONTRIBUTION_WAYS = [
  {
    icon: Code2,
    title: "Contribuir com código",
    description: "Ajude a melhorar o app com novas funcionalidades, correções de bugs ou melhorias de performance.",
    action: "Ver repositório no GitHub",
    href: "https://github.com/hacarton",
  },
  {
    icon: Bug,
    title: "Reportar problemas",
    description: "Encontrou um erro ou algo que não funciona como deveria? Abra uma issue e nos conte.",
    action: "Abrir issue",
    href: "https://github.com/hacarton",
  },
  {
    icon: BookOpen,
    title: "Melhorar o conteúdo",
    description: "Conhece bem o Código Florestal ou o CAR? Ajude a revisar e expandir os guias e as respostas do assistente.",
    action: "Ver guias existentes",
    href: "https://github.com/hacarton",
  },
  {
    icon: MessageSquare,
    title: "Dar feedback",
    description: "Produtor rural ou técnico agronômico? Seu ponto de vista é valioso para melhorarmos a linguagem e o conteúdo.",
    action: "Enviar feedback",
    href: "https://github.com/hacarton",
  },
  {
    icon: Users,
    title: "Divulgar o projeto",
    description: "Conhece produtores rurais que podem se beneficiar desta ferramenta? Compartilhe com eles.",
    action: null,
    href: null,
  },
  {
    icon: Heart,
    title: "Apoiar financeiramente",
    description: "Ajude a manter o projeto ativo cobrindo custos de infraestrutura e APIs.",
    action: null,
    href: null,
  },
];

export default function Sobre() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-3xl font-serif font-bold tracking-tight">Sobre o projeto</h1>
          <Badge variant="secondary" className="text-xs font-semibold">Codigo aberto</Badge>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          O Guia CAR nasceu no <strong className="text-foreground">haCARthon</strong> — um hackathon com foco em soluções para o Cadastro Ambiental Rural e a legislação ambiental brasileira.
        </p>
      </section>

      {/* O que é o haCARthon */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif font-semibold">O que é o haCARthon?</h2>
        <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-sm text-muted-foreground leading-relaxed border">
          <p>
            O haCARthon é uma iniciativa que reúne desenvolvedores, agrônomos, advogados ambientais e produtores rurais para criar ferramentas que tornem o Código Florestal mais acessível à população do campo.
          </p>
          <p>
            O desafio que originou este app propôs traduzir a legislação ambiental em linguagem simples e prática — pensando no "Seu Raimundo", o pequeno produtor que precisa entender seus direitos e obrigações sem depender de um advogado.
          </p>
        </div>
      </section>

      {/* Missão */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif font-semibold">Nossa missão</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Fazer com que nenhum produtor rural perca acesso a crédito, benefícios ou caia em multa por não entender o que a lei pede. Informação clara salva propriedades.
        </p>
      </section>

      {/* Como contribuir */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-serif font-semibold">Como você pode contribuir</h2>
          <Github className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          Este é um projeto de codigo aberto — qualquer pessoa pode ajudar, de qualquer lugar, de diversas formas:
        </p>
        <div className="grid gap-3">
          {CONTRIBUTION_WAYS.map((item) => (
            <Card key={item.title} className="border">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                {item.action && item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {item.action}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif font-semibold">Tecnologia</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Construido com React, Node.js, PostgreSQL e a API do Gemini (Google AI). Todo o codigo esta disponivel no GitHub sob licenca MIT.
        </p>
        <div className="flex flex-wrap gap-2">
          {["React", "TypeScript", "Node.js", "PostgreSQL", "Gemini AI", "Tailwind CSS", "MIT License"].map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="border-t pt-6 text-center text-xs text-muted-foreground space-y-1 pb-8">
        <p>Feito com dedicacao para o produtor rural brasileiro.</p>
        <p>haCARthon — Desafio 3</p>
      </div>
    </div>
  );
}
