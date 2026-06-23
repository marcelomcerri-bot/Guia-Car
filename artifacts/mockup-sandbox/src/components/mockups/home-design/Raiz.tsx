export function Raiz() {
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100dvh", background: "#faf6f0", display: "flex", flexDirection: "column", paddingBottom: 80 }}>
      {/* Header */}
      <header style={{ background: "#faf6f0", padding: "18px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#4a7c59", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(74,124,89,0.3)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#2c1810", fontFamily: "Georgia, serif" }}>Guia CAR</span>
        </div>
      </header>

      {/* Greeting section */}
      <div style={{ padding: "8px 20px 24px", borderBottom: "1.5px solid #e8ddd0" }}>
        <p style={{ fontSize: 13, color: "#a08060", margin: "0 0 6px", fontStyle: "italic", fontFamily: "Georgia, serif" }}>Bom dia, produtor</p>
        <h1 style={{ color: "#2c1810", fontSize: 28, fontWeight: 700, lineHeight: 1.25, margin: "0 0 10px", fontFamily: "Georgia, serif" }}>
          O Código Florestal explicado sem enrolação
        </h1>
        <p style={{ color: "#6b5040", fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "Georgia, serif" }}>
          Saiba o que a lei exige para sua propriedade de forma clara e direta.
        </p>
      </div>

      {/* Main action — Chat */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ background: "#4a7c59", borderRadius: 20, padding: "22px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -15, right: 20, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ marginBottom: 12 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 6, fontFamily: "Georgia, serif" }}>Tirar dúvidas</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 18, fontFamily: "Georgia, serif" }}>
            Pergunte sobre APP, Reserva Legal e regras do CAR — respondo em português simples.
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", borderRadius: 50, padding: "9px 18px" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", fontFamily: "Georgia, serif" }}>Iniciar conversa</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>

      {/* Secondary actions row */}
      <div style={{ padding: "12px 20px 0", display: "flex", gap: 10 }}>
        <div style={{ flex: 1, background: "#fff", border: "1.5px solid #e8ddd0", borderRadius: 16, padding: "16px 14px" }}>
          <div style={{ marginBottom: 10 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c2763a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#2c1810", marginBottom: 3, lineHeight: 1.3, fontFamily: "Georgia, serif" }}>Diagnóstico da Terra</div>
          <div style={{ fontSize: 12, color: "#a08060", lineHeight: 1.4, fontFamily: "Georgia, serif" }}>O que a lei exige para sua propriedade</div>
        </div>
        <div style={{ flex: 1, background: "#fff", border: "1.5px solid #e8ddd0", borderRadius: 16, padding: "16px 14px" }}>
          <div style={{ marginBottom: 10 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#2c1810", marginBottom: 3, lineHeight: 1.3, fontFamily: "Georgia, serif" }}>Guias Práticos</div>
          <div style={{ fontSize: 12, color: "#a08060", lineHeight: 1.4, fontFamily: "Georgia, serif" }}>8 artigos sobre CAR e Código Florestal</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: "12px 20px 0" }}>
        <div style={{ background: "#f0e8dc", borderRadius: 14, padding: "14px 20px", display: "flex", justifyContent: "space-around", border: "1px solid #e0d0be" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#4a7c59", fontFamily: "Georgia, serif" }}>—</div>
            <div style={{ fontSize: 10, color: "#a08060", marginTop: 2, fontFamily: "Georgia, serif" }}>Produtores ajudados</div>
          </div>
          <div style={{ width: 1, background: "#d0c0ae" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#4a7c59", fontFamily: "Georgia, serif" }}>—</div>
            <div style={{ fontSize: 10, color: "#a08060", marginTop: 2, fontFamily: "Georgia, serif" }}>Diagnósticos feitos</div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#faf6f0", borderTop: "1.5px solid #e8ddd0", height: 64, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px" }}>
        {[
          { label: "Início", active: true },
          { label: "Dúvidas", active: false },
          { label: "Guias", active: false },
          { label: "Propriedade", active: false },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.active ? "#4a7c59" : "#d0c0ae" }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: item.active ? "#4a7c59" : "#b0a090", fontFamily: "Georgia, serif", letterSpacing: "0.01em" }}>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
