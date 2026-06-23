export function TerraFirme() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100dvh", background: "#13110e", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ background: "#4ade80", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#052e16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.4px" }}>Guia CAR</span>
      </header>

      {/* Hero */}
      <div style={{ padding: "32px 20px 28px" }}>
        <div style={{ display: "inline-block", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 100, padding: "4px 12px", marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#4ade80", letterSpacing: "0.05em", textTransform: "uppercase" }}>Bom dia, produtor</span>
        </div>
        <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: "0 0 14px", letterSpacing: "-0.8px" }}>
          Entenda o CAR<br />sem complicação
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
          Regras do Código Florestal em português simples, direto para o produtor rural.
        </p>
      </div>

      {/* Grid 2x2 */}
      <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {/* Chat */}
        <div style={{ background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", borderRadius: 18, padding: "20px 16px", gridColumn: "span 2" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#fff", marginBottom: 4 }}>Tirar dúvidas</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, marginBottom: 16 }}>Pergunte sobre APP, Reserva Legal, CAR e mais</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "7px 12px" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Iniciar conversa</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        {/* Diagnosis */}
        <div style={{ background: "#1e1a14", border: "1px solid #3d3020", borderRadius: 18, padding: "18px 14px" }}>
          <div style={{ background: "#3d2a00", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 4, lineHeight: 1.3 }}>Diagnóstico da Terra</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>O que a lei exige para você</div>
        </div>

        {/* Guides */}
        <div style={{ background: "#1e1a14", border: "1px solid #3d3020", borderRadius: 18, padding: "18px 14px" }}>
          <div style={{ background: "#1a1040", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 4, lineHeight: 1.3 }}>Guias Práticos</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>8 artigos sobre o CAR</div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ margin: "4px 16px 0", background: "#1a1510", border: "1px solid #2a2218", borderRadius: 14, padding: "14px 20px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80" }}>—</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3, fontWeight: 500 }}>Produtores ajudados</div>
        </div>
        <div style={{ width: 1, height: 30, background: "#2a2218" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80" }}>—</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3, fontWeight: 500 }}>Diagnósticos feitos</div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a1510", borderTop: "1px solid #2a2218", height: 64, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        {[
          { icon: "home", label: "Início", active: true, stroke: "#4ade80" },
          { icon: "chat", label: "Dúvidas", active: false, stroke: "#4a4030" },
          { icon: "book", label: "Guias", active: false, stroke: "#4a4030" },
          { icon: "map", label: "Propriedade", active: false, stroke: "#4a4030" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: item.active ? "rgba(74,222,128,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.stroke }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: item.active ? "#4ade80" : "#4a4030" }}>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
