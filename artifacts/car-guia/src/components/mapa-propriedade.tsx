import { useEffect, useRef, useState } from "react";
import type * as L from "leaflet";
import { area } from "@turf/area";
import "leaflet/dist/leaflet.css";
import {
  Satellite, Map as MapIcon, Trash2, PenLine,
  CheckCircle2, Info, MousePointer, Square,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_KEY as string;
const BRAZIL_CENTER: [number, number] = [-14.0, -52.0];

function formatHectares(ha: number): string {
  if (ha >= 1000) return ha.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) + " ha";
  return ha.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " ha";
}

type TileMode = "satellite" | "map";
type DrawState = "idle" | "drawing" | "done";

interface MapaPropriedadeProps {
  onAreaCalculated?: (hectares: number) => void;
}

export function MapaPropriedade({ onAreaCalculated }: MapaPropriedadeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayLayerRef = useRef<L.TileLayer | null>(null);
  const pointsRef = useRef<[number, number][]>([]);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const polygonRef = useRef<L.Polygon | null>(null);
  const previewLineRef = useRef<L.Polyline | null>(null);

  const [tileMode, setTileMode] = useState<TileMode>("satellite");
  const [drawState, setDrawState] = useState<DrawState>("idle");
  const [hectares, setHectares] = useState<number | null>(null);
  const drawStateRef = useRef<DrawState>("idle");

  // Keep ref in sync for use inside event listeners
  drawStateRef.current = drawState;

  function getTileUrl(mode: TileMode) {
    if (mode === "satellite") {
      return `https://api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${TOMTOM_KEY}`;
    }
    return `https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`;
  }

  function getOverlayUrl() {
    return `https://api.tomtom.com/map/1/tile/hybrid/main/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`;
  }

  function clearDrawing(map: L.Map) {
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];
    if (polylineRef.current) { map.removeLayer(polylineRef.current); polylineRef.current = null; }
    if (polygonRef.current) { map.removeLayer(polygonRef.current); polygonRef.current = null; }
    if (previewLineRef.current) { map.removeLayer(previewLineRef.current); previewLineRef.current = null; }
    pointsRef.current = [];
  }

  function closePolygon(map: L.Map, Leaflet: typeof L) {
    const pts = pointsRef.current;
    if (pts.length < 3) return;

    // Remove preview line + in-progress polyline
    if (polylineRef.current) { map.removeLayer(polylineRef.current); polylineRef.current = null; }
    if (previewLineRef.current) { map.removeLayer(previewLineRef.current); previewLineRef.current = null; }

    // Draw finished polygon
    polygonRef.current = Leaflet.polygon(pts as [number, number][], {
      color: "#16a34a",
      weight: 2.5,
      fillColor: "#22c55e",
      fillOpacity: 0.22,
      dashArray: "6 4",
    }).addTo(map);

    // Calculate area
    const geojson = {
      type: "Feature" as const,
      geometry: {
        type: "Polygon" as const,
        coordinates: [[...pts.map(([lat, lng]) => [lng, lat]), [pts[0][1], pts[0][0]]]],
      },
      properties: {},
    };
    const m2 = area(geojson);
    const ha = m2 / 10000;
    setHectares(ha);
    setDrawState("done");
    drawStateRef.current = "done";
  }

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamic import to avoid SSR issues
    import("leaflet").then((Leaflet) => {
      if (!containerRef.current || mapRef.current) return;

      const map = Leaflet.map(containerRef.current, {
        center: BRAZIL_CENTER,
        zoom: 4,
        zoomControl: false,
        attributionControl: true,
      });

      // Fix default icon path issue with Vite
      delete (Leaflet.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;

      map.addControl(Leaflet.control.zoom({ position: "bottomright" }));
      map.addControl(Leaflet.control.scale({ imperial: false, position: "bottomleft" }));

      // Tile layers
      const tileLayer = Leaflet.tileLayer(getTileUrl(tileMode), {
        attribution: "© TomTom",
        maxZoom: 20,
        maxNativeZoom: 20,
      }).addTo(map);

      const overlayLayer = Leaflet.tileLayer(getOverlayUrl(), {
        maxZoom: 20,
        opacity: 0.85,
      });
      if (tileMode === "satellite") overlayLayer.addTo(map);

      tileLayerRef.current = tileLayer;
      overlayLayerRef.current = overlayLayer;
      mapRef.current = map;

      // Click: add point
      map.on("click", (e: L.LeafletMouseEvent) => {
        if (drawStateRef.current !== "drawing") return;
        const { lat, lng } = e.latlng;
        pointsRef.current = [...pointsRef.current, [lat, lng]];

        // Dot marker
        const marker = Leaflet.circleMarker([lat, lng], {
          radius: 5,
          color: "#16a34a",
          fillColor: "#fff",
          fillOpacity: 1,
          weight: 2,
        }).addTo(map);
        markersRef.current.push(marker);

        // Update in-progress polyline
        if (polylineRef.current) map.removeLayer(polylineRef.current);
        if (pointsRef.current.length > 1) {
          polylineRef.current = Leaflet.polyline(pointsRef.current as [number, number][], {
            color: "#16a34a",
            weight: 2,
            dashArray: "6 4",
          }).addTo(map);
        }
      });

      // Mousemove: show preview segment
      map.on("mousemove", (e: L.LeafletMouseEvent) => {
        if (drawStateRef.current !== "drawing" || pointsRef.current.length === 0) return;
        const pts = pointsRef.current;
        const last = pts[pts.length - 1];
        if (previewLineRef.current) map.removeLayer(previewLineRef.current);
        previewLineRef.current = Leaflet.polyline(
          [last as [number, number], [e.latlng.lat, e.latlng.lng]],
          { color: "#16a34a", weight: 1.5, opacity: 0.6, dashArray: "4 4" }
        ).addTo(map);
      });

      // Double-click: close polygon
      map.on("dblclick", (e: L.LeafletMouseEvent) => {
        e.originalEvent.preventDefault();
        if (drawStateRef.current !== "drawing") return;
        if (pointsRef.current.length >= 3) {
          closePolygon(map, Leaflet);
        }
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        tileLayerRef.current = null;
        overlayLayerRef.current = null;
        markersRef.current = [];
        pointsRef.current = [];
        polylineRef.current = null;
        polygonRef.current = null;
        previewLineRef.current = null;
      }
    };
  }, []); // mount only

  // Tile mode switch
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !tileLayerRef.current) return;

    import("leaflet").then((Leaflet) => {
      if (!map || !tileLayerRef.current) return;
      tileLayerRef.current.setUrl(getTileUrl(tileMode));
      const overlay = overlayLayerRef.current;
      if (overlay) {
        if (tileMode === "satellite") { overlay.addTo(map); }
        else { map.removeLayer(overlay); }
      } else if (tileMode === "satellite") {
        overlayLayerRef.current = Leaflet.tileLayer(getOverlayUrl(), { maxZoom: 20, opacity: 0.85 }).addTo(map);
      }
    });
  }, [tileMode]);

  function handleStartDraw() {
    const map = mapRef.current;
    if (!map) return;
    import("leaflet").then((Leaflet) => {
      clearDrawing(map);
      setHectares(null);
      setDrawState("drawing");
      drawStateRef.current = "drawing";
      map.getContainer().style.cursor = "crosshair";
    });
  }

  function handleClear() {
    const map = mapRef.current;
    if (!map) return;
    clearDrawing(map);
    setHectares(null);
    setDrawState("idle");
    drawStateRef.current = "idle";
    map.getContainer().style.cursor = "";
  }

  function handleUseArea() {
    if (hectares !== null && onAreaCalculated) {
      onAreaCalculated(Math.round(hectares * 100) / 100);
    }
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
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
            disabled={drawState === "drawing"}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              drawState === "drawing"
                ? "bg-primary/10 border border-primary/30 text-primary cursor-default"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <PenLine className="w-3.5 h-3.5" />
            {drawState === "drawing" ? "Desenhando..." : drawState === "done" ? "Redesenhar" : "Desenhar área"}
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="relative rounded-xl overflow-hidden border border-border shadow-md" style={{ height: 380 }}>
        <div ref={containerRef} className="w-full h-full" />

        {/* Instruction overlay */}
        {drawState === "idle" && (
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

        {drawState === "drawing" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none z-[1000]">
            <div className="bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg flex items-center gap-2">
              <Square className="w-3 h-3" />
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
              Valor aproximado baseado no polígono desenhado. Para o CAR oficial, utilize dados do INCRA ou cartório.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
