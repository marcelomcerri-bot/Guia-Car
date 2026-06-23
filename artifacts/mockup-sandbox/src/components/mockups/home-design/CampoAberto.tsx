export function CampoAberto() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100dvh", background: "#f7f5f0", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e8e3db", padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: "#2d6a4f", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#1a2e1a", letterSpacing: "-0.3px" }}>Guia CAR</span>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)", padding: "36px 20px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Bom dia, produtor</p>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, lineHeight: 1.2, margin: "0 0 12px", letterSpacing: "-0.5px" }}>
          O CAR em linguagem<br />que você entende
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          Saiba o que a lei exige para sua propriedade, sem complicação.
        </p>
      </div>

      {/* Action cards */}
      <div style={{ padding: "20px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Chat card */}
        <div style={{ background: "#fff", border: "1px solid #e0ebe3", borderRadius: 16, padding: "20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 8px rgba(45,106,79,0.06)" }}>
          <div style={{ background: "#e8f5ee", borderRadius: 12, width: 48, height: 48, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2e1a", marginBottom: 2 }}>Tirar dúvidas</div>
            <div style={{ fontSize: 13, color: "#6b7c6b", lineHeight: 1.4 }}>Pergunte sobre APP, Reserva Legal e CAR</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>

        {/* Diagnosis card */}
        <div style={{ background: "#fff", border: "1px solid #f0e6d0", borderRadius: 16, padding: "20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 8px rgba(180,100,20,0.05)" }}>
          <div style={{ background: "#fdf3e3", borderRadius: 12, width: 48, height: 48, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2e1a", marginBottom: 2 }}>Diagnóstico da Terra</div>
            <div style={{ fontSize: 13, color: "#6b7c6b", lineHeight: 1.4 }}>Descubra o que a lei exige para seu imóvel</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>

        {/* Guides card */}
        <div style={{ background: "#fff", border: "1px solid #e5e0f8", borderRadius: 16, padding: "20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 8px rgba(80,60,160,0.05)" }}>
          <div style={{ background: "#f0eeff", borderRadius: 12, width: 48, height: 48, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5046e4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2e1a", marginBottom: 2 }}>Guias Práticos</div>
            <div style={{ fontSize: 13, color: "#6b7c6b", lineHeight: 1.4 }}>8 guias sobre CAR, APP e Reserva Legal</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5046e4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e3db", padding: "16px 20px", display: "flex", justifyContent: "space-around" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#2d6a4f", lineHeight: 1 }}>—</div>
            <div style={{ fontSize: 11, color: "#8a9a8a", marginTop: 4, fontWeight: 500, letterSpacing: "0.03em" }}>Produtores ajudados</div>
          </div>
          <div style={{ width: 1, background: "#e8e3db" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#2d6a4f", lineHeight: 1 }}>—</div>
            <div style={{ fontSize: 11, color: "#8a9a8a", marginTop: 4, fontWeight: 500, letterSpacing: "0.03em" }}>Diagnósticos feitos</div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e8e3db", height: 64, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px" }}>
        {[
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: "Início", active: true },
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a9a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: "Dúvidas", active: false },
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a9a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>, label: "Guias", active: false },
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a9a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>, label: "Propriedade", active: false },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: 600, color: item.active ? "#2d6a4f" : "#8a9a8a", letterSpacing: "0.01em" }}>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
