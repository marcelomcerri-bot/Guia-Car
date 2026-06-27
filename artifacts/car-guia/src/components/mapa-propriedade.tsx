import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { area } from "@turf/area";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Satellite, Map as MapIcon, Trash2, MousePointer, PenLine, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_KEY as string;
const BRAZIL_CENTER: [number, number] = [-52.0, -14.0];

type TileMode = "satellite" | "map";

function buildStyle(mode: TileMode) {
  const sat = "https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=" + TOMTOM_KEY;
  const hybrid = "https://api.tomtom.com/map/1/tile/hybrid/main/{z}/{x}/{y}.png?key=" + TOMTOM_KEY;
  const basic = "https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=" + TOMTOM_KEY;

  if (mode === "satellite") {
    return {
      version: 8 as const,
      sources: {
        sat: { type: "raster" as const, tiles: [sat], tileSize: 256 },
        overlay: { type: "raster" as const, tiles: [hybrid], tileSize: 256 },
      },
      layers: [
        { id: "sat-layer", type: "raster" as const, source: "sat" },
        { id: "overlay-layer", type: "raster" as const, source: "overlay", paint: { "raster-opacity": 0.85 } },
      ],
    };
  }
  return {
    version: 8 as const,
    sources: { map: { type: "raster" as const, tiles: [basic], tileSize: 256 } },
    layers: [{ id: "map-layer", type: "raster" as const, source: "map" }],
  };
}

function formatHectares(ha: number): string {
  if (ha >= 1000) return ha.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) + " ha";
  return ha.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " ha";
}

interface MapaPropriedadeProps {
  onAreaCalculated?: (hectares: number) => void;
}

export function MapaPropriedade({ onAreaCalculated }: MapaPropriedadeProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [tileMode, setTileMode] = useState<TileMode>("satellite");
  const [hectares, setHectares] = useState<number | null>(null);
  const [drawMode, setDrawMode] = useState<"idle" | "drawing" | "done">("idle");
  const [hasPolygon, setHasPolygon] = useState(false);

  const recalculate = useCallback(() => {
    if (!drawRef.current) return;
    const data = drawRef.current.getAll();
    const polygons = data.features.filter((f) => f.geometry.type === "Polygon");
    if (polygons.length === 0) {
      setHectares(null);
      setHasPolygon(false);
      setDrawMode("idle");
      return;
    }
    const totalM2 = polygons.reduce((sum, f) => sum + area(f), 0);
    const ha = totalM2 / 10000;
    setHectares(ha);
    setHasPolygon(true);
    setDrawMode("done");
  }, []);

  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    let map: maplibregl.Map;
    try {
      if (!maplibregl.supported()) throw new Error("WebGL not supported");

      map = new maplibregl.Map({
        container: mapContainer.current,
        style: buildStyle(tileMode),
        center: BRAZIL_CENTER,
        zoom: 4,
        attributionControl: false,
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      setWebglError(true);
      return;
    }

    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {},
      defaultMode: "simple_select",
      styles: [
        {
          id: "gl-draw-polygon-fill",
          type: "fill",
          filter: ["all", ["==", "$type", "Polygon"]],
          paint: { "fill-color": "#22c55e", "fill-opacity": 0.2 },
        },
        {
          id: "gl-draw-polygon-stroke",
          type: "line",
          filter: ["all", ["==", "$type", "Polygon"]],
          paint: { "line-color": "#16a34a", "line-width": 2, "line-dasharray": [2, 1] },
        },
        {
          id: "gl-draw-polygon-stroke-active",
          type: "line",
          filter: ["all", ["==", "$type", "Polygon"], ["==", "active", "true"]],
          paint: { "line-color": "#16a34a", "line-width": 2.5 },
        },
        {
          id: "gl-draw-point",
          type: "circle",
          filter: ["all", ["==", "$type", "Point"]],
          paint: { "circle-radius": 5, "circle-color": "#fff", "circle-stroke-width": 2, "circle-stroke-color": "#16a34a" },
        },
        {
          id: "gl-draw-point-active",
          type: "circle",
          filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"]],
          paint: { "circle-radius": 7, "circle-color": "#16a34a", "circle-stroke-width": 2, "circle-stroke-color": "#fff" },
        },
      ],
    });

    (map as unknown as maplibregl.Map & { addControl(c: unknown, p?: string): void }).addControl(draw as unknown as maplibregl.IControl);
    mapRef.current = map;
    drawRef.current = draw;

    map.on("draw.create", recalculate);
    map.on("draw.update", recalculate);
    map.on("draw.delete", recalculate);
    map.on("draw.modechange", (e: { mode: string }) => {
      if (e.mode === "draw_polygon") setDrawMode("drawing");
    });

    return () => {
      map.remove();
      mapRef.current = null;
      drawRef.current = null;
    };
  }, []); // intentionally only on mount

  // Switch tile style without re-creating the map
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    map.setStyle(buildStyle(tileMode));
    // Re-add draw controls after style change
    map.once("style.load", () => {
      if (drawRef.current) {
        const existing = (map as unknown as { hasControl(c: unknown): boolean }).hasControl(drawRef.current);
        if (!existing) {
          (map as unknown as { addControl(c: unknown): void }).addControl(drawRef.current as unknown as maplibregl.IControl);
        }
      }
    });
  }, [tileMode]);

  function handleStartDraw() {
    if (!drawRef.current) return;
    drawRef.current.deleteAll();
    drawRef.current.changeMode("draw_polygon");
    setDrawMode("drawing");
    setHectares(null);
    setHasPolygon(false);
  }

  function handleClear() {
    if (!drawRef.current) return;
    drawRef.current.deleteAll();
    setHectares(null);
    setHasPolygon(false);
    setDrawMode("idle");
  }

  function handleUseArea() {
    if (hectares !== null && onAreaCalculated) {
      onAreaCalculated(Math.round(hectares * 100) / 100);
    }
  }

  if (webglError) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-center space-y-3">
        <MapIcon className="w-8 h-8 text-amber-500 mx-auto" />
        <p className="font-semibold text-sm text-amber-800">Mapa não disponível neste dispositivo</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          Seu navegador não suporta WebGL, necessário para renderizar o mapa. Use o modo manual para informar a área.
        </p>
        <p className="text-xs text-muted-foreground">
          Chrome, Firefox e Edge modernos suportam o mapa interativo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Mode toggle */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setTileMode("satellite")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              tileMode === "satellite" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Satellite className="w-3.5 h-3.5" /> Satélite
          </button>
          <button
            onClick={() => setTileMode("map")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              tileMode === "map" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MapIcon className="w-3.5 h-3.5" /> Mapa
          </button>
        </div>

        {/* Draw controls */}
        <div className="flex gap-2">
          {hasPolygon && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-medium hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Limpar
            </button>
          )}
          <button
            onClick={handleStartDraw}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              drawMode === "drawing"
                ? "bg-primary/10 border border-primary/30 text-primary"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <PenLine className="w-3.5 h-3.5" />
            {drawMode === "drawing" ? "Desenhando..." : hasPolygon ? "Redesenhar" : "Desenhar área"}
          </button>
        </div>
      </div>

      {/* Map container */}
      <div className="relative rounded-xl overflow-hidden border border-border shadow-md" style={{ height: 380 }}>
        <div ref={mapContainer} className="w-full h-full" />

        {/* Instruction overlay */}
        {drawMode === "idle" && !hasPolygon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-background/90 backdrop-blur-sm rounded-xl px-5 py-4 text-center shadow-lg max-w-[240px]">
              <MousePointer className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">Marque sua propriedade</p>
              <p className="text-xs text-muted-foreground mt-1">Clique em "Desenhar área" e delimite o contorno no mapa</p>
            </div>
          </div>
        )}

        {drawMode === "drawing" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg flex items-center gap-2 animate-pulse">
              <PenLine className="w-3.5 h-3.5" />
              Clique para adicionar pontos · Duplo clique para fechar
            </div>
          </div>
        )}
      </div>

      {/* Result panel */}
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
              Valor aproximado baseado no polígono desenhado. Para o diagnóstico oficial, utilize dados do INCRA ou cartório.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
