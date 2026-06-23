import { useState } from "react";
import { useLocation } from "wouter";
import { useSession } from "@/hooks/use-session";
import { useCreateDiagnosis } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, TreePine, Waves, Leaf, CheckCircle } from "lucide-react";

const PROPERTY_TYPES = [
  { value: "pequena", label: "Pequena Propriedade", desc: "Até 4 módulos fiscais" },
  { value: "media", label: "Média Propriedade", desc: "4 a 15 módulos fiscais" },
  { value: "grande", label: "Grande Propriedade", desc: "Acima de 15 módulos fiscais" },
];

const BIOMES = [
  { value: "amazonia", label: "Amazônia" },
  { value: "cerrado", label: "Cerrado" },
  { value: "mata_atlantica", label: "Mata Atlântica" },
  { value: "caatinga", label: "Caatinga" },
  { value: "pampa", label: "Pampa" },
  { value: "pantanal", label: "Pantanal" },
];

type FormData = {
  propertyType: string;
  totalAreaHectares: string;
  biome: string;
  hasRiver: boolean;
  riverWidthMeters: string;
  hasSpring: boolean;
  hasNativeVegetation: boolean;
  nativeVegetationAreaHectares: string;
  consolidatedUseAreaHectares: string;
};

export default function Diagnostico() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const sessionId = useSession();
  const createDiagnosis = useCreateDiagnosis();

  const [form, setForm] = useState<FormData>({
    propertyType: "",
    totalAreaHectares: "",
    biome: "",
    hasRiver: false,
    riverWidthMeters: "",
    hasSpring: false,
    hasNativeVegetation: false,
    nativeVegetationAreaHectares: "",
    consolidatedUseAreaHectares: "",
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const canProceed1 = form.propertyType && form.totalAreaHectares && form.biome;
  const canProceed2 = true;
  const canSubmit = sessionId && canProceed1;

  const handleSubmit = () => {
    if (!sessionId) return;
    createDiagnosis.mutate({
      data: {
        sessionId,
        propertyType: form.propertyType as "pequena" | "media" | "grande",
        totalAreaHectares: Number(form.totalAreaHectares),
        biome: form.biome as "amazonia" | "cerrado" | "mata_atlantica" | "caatinga" | "pampa" | "pantanal",
        hasRiver: form.hasRiver,
        riverWidthMeters: form.hasRiver && form.riverWidthMeters ? Number(form.riverWidthMeters) : null,
        hasSpring: form.hasSpring,
        hasNativeVegetation: form.hasNativeVegetation,
        nativeVegetationAreaHectares: form.nativeVegetationAreaHectares ? Number(form.nativeVegetationAreaHectares) : null,
        consolidatedUseAreaHectares: form.consolidatedUseAreaHectares ? Number(form.consolidatedUseAreaHectares) : null,
      }
    }, {
      onSuccess: (diagnosis) => {
        setLocation(`/diagnostico/resultado/${diagnosis.id}`);
      }
    });
  };

  return (
    <div className="container max-w-lg px-4 py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-1">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Diagnóstico da Propriedade</h1>
        <p className="text-muted-foreground text-sm">Passo {step} de {totalSteps}</p>
      </section>

      <Progress value={progress} className="h-2" />

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <Card>
            <CardHeader>
              <TreePine className="w-6 h-6 text-primary mb-1" />
              <CardTitle>Sua propriedade</CardTitle>
              <CardDescription>Informações básicas sobre o imóvel rural.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Tipo de propriedade</Label>
                <div className="space-y-2">
                  {PROPERTY_TYPES.map((pt) => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, propertyType: pt.value }))}
                      className={cn(
                        "w-full text-left rounded-lg border p-3 transition-all",
                        form.propertyType === pt.value
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:bg-muted"
                      )}
                      data-testid={`property-type-${pt.value}`}
                    >
                      <div className="font-medium text-sm">{pt.label}</div>
                      <div className="text-xs text-muted-foreground">{pt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Área total (hectares)</Label>
                <Input
                  id="area"
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="Ex: 50.5"
                  value={form.totalAreaHectares}
                  onChange={(e) => setForm(f => ({ ...f, totalAreaHectares: e.target.value }))}
                  data-testid="input-area"
                />
              </div>

              <div className="space-y-2">
                <Label>Bioma</Label>
                <div className="grid grid-cols-2 gap-2">
                  {BIOMES.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, biome: b.value }))}
                      className={cn(
                        "rounded-lg border p-3 text-sm font-medium transition-all",
                        form.biome === b.value
                          ? "border-primary bg-primary/5 ring-1 ring-primary text-primary"
                          : "border-border hover:bg-muted text-foreground"
                      )}
                      data-testid={`biome-${b.value}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full gap-2"
            onClick={() => setStep(2)}
            disabled={!canProceed1}
            data-testid="button-next-step1"
          >
            Próximo <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <Card>
            <CardHeader>
              <Waves className="w-6 h-6 text-primary mb-1" />
              <CardTitle>Recursos hídricos</CardTitle>
              <CardDescription>Rios, córregos e nascentes na sua propriedade.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Tem rio ou córrego?</Label>
                  <p className="text-xs text-muted-foreground">Curso d'água que passa pela propriedade</p>
                </div>
                <Switch
                  checked={form.hasRiver}
                  onCheckedChange={(v) => setForm(f => ({ ...f, hasRiver: v }))}
                  data-testid="switch-has-river"
                />
              </div>

              {form.hasRiver && (
                <div className="space-y-2 animate-in fade-in">
                  <Label htmlFor="river-width">Largura aproximada do rio (metros)</Label>
                  <Input
                    id="river-width"
                    type="number"
                    min="1"
                    placeholder="Ex: 15"
                    value={form.riverWidthMeters}
                    onChange={(e) => setForm(f => ({ ...f, riverWidthMeters: e.target.value }))}
                    data-testid="input-river-width"
                  />
                  <p className="text-xs text-muted-foreground">A largura define a faixa de APP obrigatória</p>
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-4">
                <div className="space-y-1">
                  <Label>Tem nascente?</Label>
                  <p className="text-xs text-muted-foreground">Onde a água brota do solo</p>
                </div>
                <Switch
                  checked={form.hasSpring}
                  onCheckedChange={(v) => setForm(f => ({ ...f, hasSpring: v }))}
                  data-testid="switch-has-spring"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Button>
            <Button className="flex-1 gap-2" onClick={() => setStep(3)}>
              Próximo <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <Card>
            <CardHeader>
              <Leaf className="w-6 h-6 text-primary mb-1" />
              <CardTitle>Vegetação</CardTitle>
              <CardDescription>Cobertura vegetal nativa existente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Tem vegetação nativa?</Label>
                  <p className="text-xs text-muted-foreground">Mata, cerradão, caatinga etc.</p>
                </div>
                <Switch
                  checked={form.hasNativeVegetation}
                  onCheckedChange={(v) => setForm(f => ({ ...f, hasNativeVegetation: v }))}
                  data-testid="switch-has-native"
                />
              </div>

              {form.hasNativeVegetation && (
                <div className="space-y-2 animate-in fade-in">
                  <Label htmlFor="native-area">Área de vegetação nativa (hectares)</Label>
                  <Input
                    id="native-area"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Ex: 12.5"
                    value={form.nativeVegetationAreaHectares}
                    onChange={(e) => setForm(f => ({ ...f, nativeVegetationAreaHectares: e.target.value }))}
                    data-testid="input-native-area"
                  />
                </div>
              )}

              <div className="space-y-2 border-t pt-4">
                <Label htmlFor="consolidated">Área de uso consolidado (hectares) — opcional</Label>
                <Input
                  id="consolidated"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Ex: 30.0"
                  value={form.consolidatedUseAreaHectares}
                  onChange={(e) => setForm(f => ({ ...f, consolidatedUseAreaHectares: e.target.value }))}
                  data-testid="input-consolidated"
                />
                <p className="text-xs text-muted-foreground">Área com uso agropecuário antes de julho de 2008</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={() => setStep(2)}>
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handleSubmit}
              disabled={!canSubmit || createDiagnosis.isPending}
              data-testid="button-submit-diagnosis"
            >
              {createDiagnosis.isPending ? (
                "Calculando..."
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" /> Ver diagnóstico
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
