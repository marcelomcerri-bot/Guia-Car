import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { area } from "@turf/area";
import {
  Satellite, Map as MapIcon, Trash2, PenLine,
  CheckCircle2, Info, MousePointer, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_KEY as string;
const BRAZIL_CENTER: [number, number] = [-52.0, -14.0];

type TileMode = "satellite" | "map";
type DrawState = "idle" | "drawing" | "done";

interface MapaPropriedadeProps {
  onAreaCalculated?: (hectares: number) => void;
}

function formatHectares(ha: number): string {
  if (ha >= 1000) return ha.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) + " ha";
  return ha.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " ha";
}

function buildStyle(mode: TileMode): maplibregl.StyleSpecification {
  const baseTile =
    mode === "satellite"
      ? `https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${TOMTOM_KEY}`
      : `https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`;

  const sources: maplibregl.StyleSpecification["sources"] = {
    "tomtom-base": {
      type: "raster",
      tiles: [baseTile],
      tileSize: 256,
      attribution: "© TomTom",
    },
  };

  const layers: maplibregl.LayerSpecification[] = [
    { id: "tomtom-base-layer", type: "raster", source: "tomtom-base" },
  ];

  if (mode === "satellite") {
    sources["tomtom-hybrid"] = {
      type: "raster",
      tiles: [`https://api.tomtom.com/map/1/tile/hybrid/main/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`],
      tileSize: 256,
    };
    layers.push({
      id: "tomtom-hybrid-layer",
      type: "raster",
      source: "tomtom-hybrid",
      paint: { "raster-opacity": 0.85 },
    });
  }

  return { version: 8, sources, layers };
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function MapaPropriedade({ onAreaCalculated }: MapaPropriedadeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const initializedRef = useRef(false);

  const [tileMode, setTileMode] = useState<TileMode>("satellite");
  const [drawState, setDrawState] = useState<DrawState>("idle");
  const [hectares, setHectares] = useState<number | null>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;

    if (!hasWebGL()) {
      setWebglError(true);
      return;
    }

    initializedRef.current = true;

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: buildStyle("satellite"),
        center: BRAZIL_CENTER,
        zoom: 4,
      });
    } catch {
      setWebglError(true);
      initializedRef.current = false;
      return;
    }

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {},
      defaultMode: "simple_select",
    });

    map.addControl(draw as unknown as maplibregl.IControl);
    drawRef.current = draw;
    mapRef.current = map;

    function recalcArea() {
      const data = draw.getAll();
      if (!data.features.length) {
        setHectares(null);
        return;
      }
      const m2 = area(data as Parameters<typeof area>[0]);
      setHectares(m2 / 10000);
    }

    map.on("draw.create", () => {
      recalcArea();
      setDrawState("done");
    });
    map.on("draw.update", recalcArea);
    map.on("draw.delete", () => {
      setHectares(null);
      setDrawState("idle");
    });
    map.on("draw.modechange", (e: { mode: string }) => {
      if (e.mode === "draw_polygon") setDrawState("drawing");
    });

    return () => {
      map.remove();
      mapRef.current = null;
      drawRef.current = null;
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const applyTileMode = () => {
      try {
        const baseSource = map.getSource("tomtom-base") as maplibregl.RasterTileSource | undefined;
        if (!baseSource) return;

        const baseTile =
          tileMode === "satellite"
            ? `https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${TOMTOM_KEY}`
            : `https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`;
        baseSource.setTiles([baseTile]);

        if (tileMode === "satellite") {
          if (!map.getSource("tomtom-hybrid")) {
            map.addSource("tomtom-hybrid", {
              type: "raster",
              tiles: [`https://api.tomtom.com/map/1/tile/hybrid/main/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`],
              tileSize: 256,
            });
            const firstDrawLayer = map.getStyle().layers.find((l) => l.id.startsWith("gl-draw"));
            map.addLayer(
              { id: "tomtom-hybrid-layer", type: "raster", source: "tomtom-hybrid", paint: { "raster-opacity": 0.85 } },
              firstDrawLayer?.id,
            );
          }
        } else {
          if (map.getLayer("tomtom-hybrid-layer")) map.removeLayer("tomtom-hybrid-layer");
          if (map.getSource("tomtom-hybrid")) map.removeSource("tomtom-hybrid");
        }
      } catch {
        // map may not be fully loaded yet
      }
    };

    if (map.isStyleLoaded()) {
      applyTileMode();
    } else {
      map.once("styledata", applyTileMode);
    }
  }, [tileMode]);

  function handleStartDraw() {
    const draw = drawRef.current;
    if (!draw) return;
    draw.deleteAll();
    setHectares(null);
    draw.changeMode("draw_polygon");
    setDrawState("drawing");
  }

  function handleClear() {
    const draw = drawRef.current;
    if (!draw) return;
    draw.deleteAll();
    setHectares(null);
    setDrawState("idle");
  }

  function handleUseArea() {
    if (hectares !== null && onAreaCalculated) {
      onAreaCalculated(Math.round(hectares * 100) / 100);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setTileMode("satellite")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              tileMode === "satellite"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Satellite className="w-3.5 h-3.5" /> Satélite
          </button>
          <button
            onClick={() => setTileMode("map")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              tileMode === "map"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <MapIcon className="w-3.5 h-3.5" /> Mapa
          </button>
        </div>

        <div className="flex gap-2">
          {drawState !== "idle" && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-medium hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Limpar
            </button>
          )}
          <button
            onClick={handleStartDraw}
            disabled={drawState === "drawing" || webglError}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              drawState === "drawing"
                ? "bg-primary/10 border border-primary/30 text-primary cursor-default"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            <PenLine className="w-3.5 h-3.5" />
            {drawState === "drawing"
              ? "Desenhando..."
              : drawState === "done"
                ? "Redesenhar"
                : "Desenhar área"}
          </button>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-border shadow-md" style={{ height: 380 }}>
        <div ref={containerRef} className="w-full h-full" />

        {webglError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm">
            <div className="bg-background rounded-xl px-6 py-5 text-center shadow-lg max-w-[280px]">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">Mapa não disponível neste ambiente</p>
              <p className="text-xs text-muted-foreground mt-1">
                O mapa requer aceleração gráfica (WebGL). Abra o app em um navegador ou celular para desenhar sua propriedade.
              </p>
            </div>
          </div>
        )}

        {!webglError && drawState === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-background/90 backdrop-blur-sm rounded-xl px-5 py-4 text-center shadow-lg max-w-[240px]">
              <MousePointer className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">Marque sua propriedade</p>
              <p className="text-xs text-muted-foreground mt-1">
                Clique em "Desenhar área" e marque os limites no mapa
              </p>
            </div>
          </div>
        )}

        {!webglError && drawState === "drawing" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none z-[1000]">
            <div className="bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg flex items-center gap-2">
              Clique para adicionar pontos · Duplo clique para fechar
            </div>
          </div>
        )}
      </div>

      {hectares !== null && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary/15 p-2 rounded-lg shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Área calculada</p>
                <p className="text-2xl font-bold font-serif text-foreground leading-none mt-0.5">
                  {formatHectares(hectares)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ≈ {(hectares * 10000).toLocaleString("pt-BR", { maximumFractionDigits: 0 })} m²
                </p>
              </div>
            </div>
            <button
              onClick={handleUseArea}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
            >
              Usar este valor
            </button>
          </div>
          <div className="flex items-start gap-1.5 mt-3 pt-3 border-t border-primary/10">
            <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Valor aproximado baseado no polígono desenhado. Para o CAR oficial, utilize dados do INCRA ou cartório.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
