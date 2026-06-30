import { useState, useEffect, useRef } from "react";

const T = {
  navy: "#0c2340", deep: "#142d4c", blue: "#2466a8", sky: "#4a9eed",
  cloud: "#e8f1fa", gold: "#e8a838", honey: "#f5c242", cream: "#fdf6e3",
  teal: "#1a8a7d", mint: "#e0f5f0", coral: "#e86840", peach: "#fef0e8",
  green: "#2d8a4e", leaf: "#e5f5eb", white: "#fff", offWhite: "#fafbfd",
  warm: "#f7f5f0", text: "#1a1a2e", body: "#3d4152", muted: "#6b7084",
  border: "#e4e6ec", purple: "#6c5ce7", lavender: "#f0edff",
  rose: "#e84393", roseBg: "#fdf2f8",
};
const F = { display: "'DM Serif Display', Georgia, serif", body: "'DM Sans', 'Helvetica Neue', sans-serif" };

function useReveal(th = 0.1) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: th }); o.observe(el); return () => o.disconnect(); }, [th]);
  return [ref, v];
}
function Reveal({ children, delay = 0, y = 44, style = {} }) {
  const [ref, vis] = useReveal();
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : `translateY(${y}px)`, transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s, transform .8s cubic-bezier(.16,1,.3,1) ${delay}s`, ...style }}>{children}</div>;
}

/* ═══ DATA ═══ */
const DONATION_TIERS = [
  {
    amount: "Bs 100", usd: "≈ $14", label: "Semilla", icon: "🌱",
    color: T.teal, bg: T.mint,
    impact: "Cubre materiales terapéuticos para un niño durante un mes.",
    items: ["Materiales de estimulación", "Fichas psicopedagógicas", "Insumos terapéuticos"],
  },
  {
    amount: "Bs 300", usd: "≈ $43", label: "Acompañante", icon: "💚",
    color: T.blue, bg: T.cloud,
    impact: "Financia 2 sesiones de terapia especializada.",
    items: ["1 sesión de fisioterapia", "1 sesión de lenguaje", "Evaluación de avances"],
    featured: true,
  },
  {
    amount: "Bs 500", usd: "≈ $72", label: "Guardián", icon: "⭐",
    color: T.gold, bg: T.cream,
    impact: "Cubre un mes completo de atención para una familia con beca.",
    items: ["Plan terapéutico mensual", "Orientación familiar", "Materiales + sesiones"],
  },
  {
    amount: "Libre", usd: "", label: "A tu medida", icon: "💛",
    color: T.coral, bg: T.peach,
    impact: "Elige el monto que puedas. Todo suma y todo cambia vidas.",
    items: ["Cualquier monto ayuda", "Recibo de donación", "Impacto verificable"],
  },
];

const PAYMENT_METHODS = [
  {
    icon: "🏦", title: "Transferencia bancaria", color: T.blue, bg: T.cloud,
    lines: ["Banco Unión · Cta. Cte. Bs:", "1-0123456-01", "A nombre de: Fundación PRO-21"],
  },
  {
    icon: "📱", title: "QR de pago", color: T.teal, bg: T.mint,
    lines: ["Escanea con tu app bancaria.", "Compatible con todas las", "billeteras digitales de Bolivia."],
  },
  {
    icon: "🌐", title: "Donación internacional", color: T.purple, bg: T.lavender,
    lines: ["PayPal o tarjeta de crédito", "a través de nuestra página", "de donación segura (próximo)."],
  },
];

const VOLUNTEER_AREAS = [
  { icon: "🩺", title: "Salud y terapia", desc: "Fisioterapia, psicología, fonoaudiología, terapia ocupacional, nutrición pediátrica.", color: T.blue, bg: T.cloud },
  { icon: "📖", title: "Educación y pedagogía", desc: "Educación especial, tutorías, adaptaciones curriculares, psicopedagogía.", color: T.teal, bg: T.mint },
  { icon: "🎨", title: "Arte y expresión", desc: "Talleres de pintura, música, teatro, arteterapia y actividad física adaptada.", color: T.coral, bg: T.peach },
  { icon: "💻", title: "Tecnología", desc: "Diseño gráfico, redes sociales, fotografía, desarrollo web y sistemas informáticos.", color: T.purple, bg: T.lavender },
  { icon: "📋", title: "Administración y gestión", desc: "Gestión de proyectos, captación de fondos, eventos y comunicación institucional.", color: T.gold, bg: T.cream },
  { icon: "🌍", title: "Trabajo comunitario", desc: "Trabajo social, orientación jurídica y campañas de sensibilización sobre inclusión.", color: T.green, bg: T.leaf },
];

const PARTNER_TYPES = [
  {
    icon: "🏢", title: "Empresas", color: T.blue, bg: T.cloud,
    desc: "RSE, auspicios, donaciones corporativas con impacto social verificable.",
    benefits: ["Recibo de donación oficial", "Visibilidad en nuestras comunicaciones", "Informe de impacto personalizado"],
  },
  {
    icon: "🎓", title: "Universidades", color: T.purple, bg: T.lavender,
    desc: "Proyectos sociales, prácticas profesionales e investigación aplicada.",
    benefits: ["Convenio interinstitucional", "Campo de prácticas certificado", "Acceso a datos para investigación"],
  },
  {
    icon: "🌍", title: "ONGs e internacionales", color: T.teal, bg: T.mint,
    desc: "Cooperación técnica y financiera, intercambio de experiencias globales.",
    benefits: ["Proyectos conjuntos", "Informes de transparencia", "Presencia en red internacional"],
  },
  {
    icon: "📺", title: "Medios de comunicación", color: T.coral, bg: T.peach,
    desc: "Cobertura de actividades y difusión de campañas de sensibilización.",
    benefits: ["Material de prensa exclusivo", "Acceso a historias de impacto", "Entrevistas con el equipo"],
  },
];

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 520, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 45%, #1a4a7a 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes heart-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.2)}30%{transform:scale(1)}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-6%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,168,56,.05),transparent 70%)" }} />
        {["💛", "🙌", "🌍", "♥"].map((e, i) => (
          <div key={i} style={{ position: "absolute", fontSize: 20 + i * 6, opacity: .05, left: `${8 + i * 22}%`, top: `${15 + (i % 3) * 25}%`, animation: `float ${4 + i * .7}s ease-in-out infinite`, animationDelay: `${i * .8}s` }}>{e}</div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 45C320 20 640 60 960 35C1200 15 1380 40 1440 38V80H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "130px 32px 90px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 3 }}>
        {/* Left: copy */}
        <div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .1s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", borderRadius: 50, padding: "6px 18px 6px 10px", marginBottom: 24, border: "1px solid rgba(255,255,255,.1)" }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${T.gold}, ${T.honey})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, animation: "heart-beat 2s ease-in-out infinite" }}>♥</span>
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 500 }}>Colabora con la fundación</span>
            </div>
          </div>

          <h1 style={{ fontFamily: F.display, fontSize: "clamp(38px,4.5vw,56px)", color: "#fff", lineHeight: 1.08, marginBottom: 20, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .2s" }}>
            Tu apoyo{" "}
            <span style={{ fontStyle: "italic", color: T.honey }}>transforma</span><br />vidas reales
          </h1>

          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,.65)", maxWidth: 460, marginBottom: 36, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .35s" }}>
            Hay muchas formas de ser parte de esta misión. Donando, siendo voluntario o formando
            una alianza, cada contribución acerca a Bolivia a una sociedad más inclusiva.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .5s" }}>
            {[
              { label: "Donar ahora", href: "#donaciones", bg: T.gold, color: T.navy },
              { label: "Ser voluntario", href: "#voluntariado", bg: "rgba(255,255,255,.1)", color: "#fff", border: "2px solid rgba(255,255,255,.25)" },
              { label: "Alianzas", href: "#alianzas", bg: "rgba(255,255,255,.1)", color: "#fff", border: "2px solid rgba(255,255,255,.25)" },
            ].map(b => (
              <a key={b.label} href={b.href} style={{
                padding: "13px 30px", borderRadius: 50, fontWeight: 700, fontSize: 14,
                background: b.bg, color: b.color, textDecoration: "none",
                border: b.border || "none",
                boxShadow: b.bg === T.gold ? `0 6px 24px ${T.gold}30` : "none",
                transition: "all .25s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >{b.label}</a>
            ))}
          </div>
        </div>

        {/* Right: impact summary cards */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateX(50px) scale(.95)", transition: "all 1s cubic-bezier(.16,1,.3,1) .35s" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { n: "100+", l: "Familias que necesitan tu apoyo", icon: "👨‍👩‍👧", color: T.blue },
              { n: "20+", l: "Profesionales a quienes respaldar", icon: "🩺", color: T.teal },
              { n: "3", l: "Programas que sostener", icon: "📋", color: T.gold },
              { n: "Bs 0", l: "Costo para familias con beca", icon: "💚", color: T.green },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,.06)", borderRadius: 20, padding: "24px 20px",
                border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(8px)",
                textAlign: "center",
                transition: "all .3s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.06)"}
              >
                <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: F.display, fontSize: 30, color: T.honey, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 6, lineHeight: 1.4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ DONACIONES ═══ */
function DonationsSection() {
  const [selected, setSelected] = useState(1);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <section id="donaciones" style={{ padding: "88px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cream, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,168,56,.15)` }}>
              <span style={{ fontSize: 13 }}>💛</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Donaciones</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Elige cómo quieres ayudar</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Cada boliviano aportado se destina directamente a terapias, materiales y becas para las familias que más lo necesitan.
            </p>
          </div>
        </Reveal>

        {/* Donation tiers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 48 }}>
          {DONATION_TIERS.map((tier, i) => {
            const isSel = selected === i;
            return (
              <Reveal key={tier.label} delay={i * .07}>
                <div onClick={() => setSelected(i)} style={{
                  borderRadius: 22, overflow: "hidden", cursor: "pointer",
                  background: T.white, position: "relative",
                  border: `2px solid ${isSel ? tier.color : T.border}`,
                  boxShadow: isSel ? `0 16px 48px ${tier.color}15` : "0 2px 8px rgba(0,0,0,.02)",
                  transform: isSel ? "translateY(-6px)" : "none",
                  transition: "all .35s cubic-bezier(.16,1,.3,1)",
                }}>
                  {tier.featured && (
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      background: T.blue, color: "#fff", fontSize: 9, fontWeight: 700,
                      padding: "3px 10px", borderRadius: 50, letterSpacing: 1, textTransform: "uppercase",
                    }}>Popular</div>
                  )}

                  {/* Color top bar */}
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)` }} />

                  <div style={{ padding: "28px 24px" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 15, background: isSel ? `linear-gradient(135deg, ${tier.color}, ${tier.color}cc)` : tier.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16, transition: "all .35s", boxShadow: isSel ? `0 6px 20px ${tier.color}25` : "none" }}>{tier.icon}</div>

                    <div style={{ fontFamily: F.display, fontSize: 28, color: isSel ? tier.color : T.navy, lineHeight: 1, marginBottom: 4, transition: "color .3s" }}>{tier.amount}</div>
                    {tier.usd && <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>{tier.usd} USD</div>}
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 8 }}>{tier.label}</div>
                    <p style={{ fontSize: 12.5, color: T.body, lineHeight: 1.6, marginBottom: 16 }}>{tier.impact}</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {tier.items.map(item => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.body }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: tier.color, flexShrink: 0 }} />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Custom amount + CTA */}
        <Reveal delay={.15}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
            background: T.white, borderRadius: 24, padding: "36px 40px",
            border: `1px solid ${T.border}`,
          }}>
            {/* Left: custom input */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
                Monto personalizado (en bolivianos)
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontFamily: F.display, fontSize: 18, color: T.gold }}>Bs</span>
                  <input
                    type="number" placeholder="0.00"
                    value={customAmount} onChange={e => setCustomAmount(e.target.value)}
                    style={{
                      width: "100%", padding: "14px 18px 14px 52px", borderRadius: 14,
                      border: `1.5px solid ${T.border}`, fontSize: 18, fontFamily: F.display,
                      outline: "none", background: T.offWhite, boxSizing: "border-box",
                      transition: "border-color .2s",
                    }}
                    onFocus={e => e.target.style.borderColor = T.gold}
                    onBlur={e => e.target.style.borderColor = T.border}
                  />
                </div>
              </div>
              <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
                <strong style={{ color: T.green }}>100%</strong> de tu donación se destina directamente a los programas. Emitimos recibo oficial de donación para personas y empresas.
              </div>
            </div>

            {/* Right: payment methods */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
                Medios de pago disponibles
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PAYMENT_METHODS.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: 14, background: m.bg, border: `1px solid ${m.color}12` }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: T.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}>{m.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{m.title}</div>
                      {m.lines.map((l, li) => (
                        <div key={li} style={{ fontSize: 12, color: li === 1 ? m.color : T.muted, fontWeight: li === 1 ? 700 : 400, lineHeight: 1.4 }}>{l}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Donate CTA */}
        <Reveal delay={.2}>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "16px 40px", borderRadius: 50, fontWeight: 700, fontSize: 16,
              background: `linear-gradient(135deg, ${T.gold}, ${T.honey})`,
              color: T.navy, textDecoration: "none",
              boxShadow: `0 8px 28px ${T.gold}30`, transition: "all .25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${T.gold}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 8px 28px ${T.gold}30`; }}
            >
              <span style={{ fontSize: 20 }}>💛</span>
              Quiero donar — Contactar por WhatsApp
            </a>
            <p style={{ fontSize: 12, color: T.muted, marginTop: 12 }}>
              Coordinaremos el método de pago que más te convenga. Sin comisiones, sin intermediarios.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ VOLUNTARIADO ═══ */
function VolunteerSection() {
  const [formSent, setFormSent] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  return (
    <section id="voluntariado" style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.mint, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(26,138,125,.12)` }}>
              <span style={{ fontSize: 13 }}>🙌</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>Voluntariado</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Comparte tu talento</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Necesitamos personas comprometidas que quieran poner su conocimiento al servicio de la inclusión. Contamos horas como Servicio Social.
            </p>
          </div>
        </Reveal>

        {/* Area selector */}
        <Reveal delay={.05}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
              ¿En qué área quieres colaborar?
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {VOLUNTEER_AREAS.map((a, i) => {
                const isSel = selectedArea === i;
                return (
                  <div key={a.title} onClick={() => setSelectedArea(isSel ? null : i)} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "18px 20px", borderRadius: 18, cursor: "pointer",
                    background: isSel ? T.white : T.white,
                    border: `1.5px solid ${isSel ? a.color : T.border}`,
                    boxShadow: isSel ? `0 8px 24px ${a.color}12` : "0 1px 4px rgba(0,0,0,.02)",
                    transform: isSel ? "translateY(-3px)" : "none",
                    transition: "all .3s cubic-bezier(.16,1,.3,1)",
                  }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: isSel ? `linear-gradient(135deg, ${a.color}, ${a.color}cc)` : a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, transition: "all .3s" }}>{a.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.navy, lineHeight: 1.3 }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.4, marginTop: 2, display: isSel ? "block" : "none" }}>{a.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Volunteer form */}
        <Reveal delay={.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Form */}
            <div style={{ background: T.white, borderRadius: 24, padding: "36px 36px", border: `1px solid ${T.border}` }}>
              {!formSent ? (
                <>
                  <h4 style={{ fontFamily: F.display, fontSize: 22, color: T.navy, marginBottom: 24 }}>Inscríbete como voluntario</h4>
                  {[
                    { label: "Nombre completo", placeholder: "Tu nombre", type: "text" },
                    { label: "Correo electrónico", placeholder: "tu@correo.com", type: "email" },
                    { label: "Teléfono / WhatsApp", placeholder: "+591 ...", type: "tel" },
                    { label: "Profesión o carrera", placeholder: "Ej: Lic. Psicología", type: "text" },
                  ].map(f => (
                    <div key={f.label} style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, display: "block", marginBottom: 6, letterSpacing: .5, textTransform: "uppercase" }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} style={{
                        width: "100%", padding: "12px 16px", borderRadius: 12,
                        border: `1.5px solid ${T.border}`, fontSize: 14, outline: "none",
                        background: T.offWhite, fontFamily: F.body, boxSizing: "border-box",
                        transition: "border-color .2s",
                      }}
                        onFocus={e => e.target.style.borderColor = T.teal}
                        onBlur={e => e.target.style.borderColor = T.border}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, display: "block", marginBottom: 6, letterSpacing: .5, textTransform: "uppercase" }}>¿Cuántas horas por semana puedes ofrecer?</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["2-4 hs", "4-8 hs", "8+ hs", "Flexible"].map(h => (
                        <button key={h} style={{ padding: "8px 14px", borderRadius: 50, border: `1.5px solid ${T.border}`, background: T.white, color: T.body, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F.body, transition: "all .25s" }}
                          onMouseEnter={e => { e.target.style.borderColor = T.teal; e.target.style.color = T.teal; e.target.style.background = T.mint; }}
                          onMouseLeave={e => { e.target.style.borderColor = T.border; e.target.style.color = T.body; e.target.style.background = T.white; }}
                        >{h}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setFormSent(true)} style={{
                    width: "100%", padding: "14px", borderRadius: 50, border: "none",
                    background: `linear-gradient(135deg, ${T.teal}, ${T.blue})`,
                    color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                    fontFamily: F.body, boxShadow: `0 6px 24px ${T.teal}25`, transition: "all .25s",
                  }}
                    onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.target.style.transform = "none"}
                  >Enviar inscripción</button>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                  <h3 style={{ fontFamily: F.display, fontSize: 24, color: T.navy, marginBottom: 12 }}>¡Gracias por tu interés!</h3>
                  <p style={{ fontSize: 15, color: T.body, lineHeight: 1.7, marginBottom: 24 }}>
                    Recibimos tu inscripción. Nuestro equipo de Trabajo Social se comunicará contigo en los próximos días.
                  </p>
                  <button onClick={() => setFormSent(false)} style={{ background: "none", border: "none", color: T.teal, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F.body }}>← Enviar otra inscripción</button>
                </div>
              )}
            </div>

            {/* What volunteering looks like */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: T.white, borderRadius: 20, padding: "28px", border: `1px solid ${T.border}` }}>
                <h4 style={{ fontFamily: F.display, fontSize: 18, color: T.navy, marginBottom: 16 }}>¿Qué implica ser voluntario?</h4>
                {[
                  { icon: "📅", text: "Horarios flexibles acordados con el equipo" },
                  { icon: "🎓", text: "Formación inicial sobre los programas" },
                  { icon: "📋", text: "Certificado de voluntariado con horas acreditadas" },
                  { icon: "💚", text: "Acompañamiento permanente del equipo profesional" },
                  { icon: "🌍", text: "Puede contar como Servicio Social universitario" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: T.body }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Testimonial from volunteer */}
              <div style={{
                background: `linear-gradient(135deg, ${T.mint}, ${T.cloud})`,
                borderRadius: 20, padding: "28px",
                border: `1px solid rgba(26,138,125,.1)`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -8, left: 12, fontFamily: F.display, fontSize: 80, color: `${T.teal}08`, lineHeight: 1 }}>"</div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{ fontFamily: F.display, fontSize: 15, color: T.navy, lineHeight: 1.6, fontStyle: "italic", marginBottom: 16 }}>
                    "Vine como practicante y me quedé como voluntaria. Ver el progreso de estos niños es la recompensa más grande de mi carrera."
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${T.teal}, ${T.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🩺</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Voluntaria del equipo</div>
                      <div style={{ fontSize: 11, color: T.teal }}>Terapia de lenguaje</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ ALIANZAS ═══ */
function AlliancesSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="alianzas" style={{ padding: "88px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.lavender, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(108,92,231,.12)` }}>
              <span style={{ fontSize: 13 }}>🤝</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.purple, letterSpacing: 1.5, textTransform: "uppercase" }}>Alianzas institucionales</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Crecer juntos</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Empresas, universidades, ONGs e instituciones internacionales: construyamos juntos una Bolivia más inclusiva.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 48 }}>
          {PARTNER_TYPES.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={p.title} delay={i * .08}>
                <div onClick={() => setOpen(isOpen ? null : i)} style={{
                  background: T.white, borderRadius: 22, overflow: "hidden",
                  border: `1.5px solid ${isOpen ? p.color : T.border}`,
                  boxShadow: isOpen ? `0 12px 40px ${p.color}10` : "0 2px 8px rgba(0,0,0,.02)",
                  transition: "all .35s cubic-bezier(.16,1,.3,1)", cursor: "pointer",
                }}>
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, ${p.color}88)` }} />
                  <div style={{ padding: "28px 28px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, background: isOpen ? `linear-gradient(135deg, ${p.color}, ${p.color}cc)` : p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, transition: "all .3s", boxShadow: isOpen ? `0 6px 20px ${p.color}25` : "none" }}>{p.icon}</div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontFamily: F.display, fontSize: 20, color: T.navy, marginBottom: 6 }}>{p.title}</h4>
                        <p style={{ fontSize: 14, color: T.body, lineHeight: 1.6 }}>{p.desc}</p>
                      </div>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: isOpen ? `${p.color}12` : T.offWhite, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: isOpen ? p.color : T.muted, flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "all .3s" }}>▾</div>
                    </div>

                    <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" }}>
                      <div style={{ paddingTop: 20, paddingLeft: 74 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Beneficios de la alianza</div>
                        {p.benefits.map(b => (
                          <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: 10, background: p.bg, fontSize: 13, color: T.body, marginBottom: 6 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />{b}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Current allies showcase */}
        <Reveal delay={.2}>
          <div style={{ background: T.white, borderRadius: 24, padding: "36px 40px", border: `1px solid ${T.border}` }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h4 style={{ fontFamily: F.display, fontSize: 22, color: T.navy, marginBottom: 8 }}>Aliados actuales</h4>
              <p style={{ fontSize: 14, color: T.muted }}>Organizaciones que ya confían en nuestro trabajo</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
              {[
                { name: "UCB La Paz", type: "Universidad aliada", icon: "🎓", color: T.purple },
                { name: "Red Uno", type: "Medio de comunicación", icon: "📺", color: T.coral },
                { name: "ATB Digital", type: "Medio de comunicación", icon: "🎬", color: T.blue },
                { name: "Página Siete", type: "Prensa escrita", icon: "📰", color: T.green },
              ].map((ally, i) => (
                <div key={ally.name} style={{
                  textAlign: "center", padding: "20px 24px", borderRadius: 18,
                  background: T.offWhite, border: `1px solid ${T.border}`,
                  minWidth: 140, transition: "all .25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{ally.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{ally.name}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{ally.type}</div>
                </div>
              ))}
              <div style={{
                textAlign: "center", padding: "20px 24px", borderRadius: 18,
                background: T.offWhite, border: `2px dashed ${T.border}`,
                minWidth: 140, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>+</div>
                <div style={{ fontSize: 13, color: T.muted }}>Tu organización aquí</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ WHATSAPP CTA ═══ */
function FinalCta() {
  return (
    <section style={{ padding: "80px 32px", background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 100%)` }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", padding: "56px 48px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16, animation: "heart-beat 2s ease-in-out infinite" }}>♥</div>
            <h3 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,38px)", color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
              ¿Tienes dudas sobre cómo colaborar?
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
              Escríbenos y te explicamos cómo tu aporte puede hacer la diferencia más concreta posible. Estamos para ayudarte a encontrar la forma de colaborar que más se adapte a ti.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", borderRadius: 50, fontWeight: 700, fontSize: 16, background: "#25d366", color: "#fff", textDecoration: "none", boxShadow: "0 6px 24px rgba(37,211,102,.3)", transition: "all .25s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              ><span style={{ fontSize: 20 }}>💬</span>Escribir al 70106276</a>
              <a href="mailto:contacto@fundacionpro21.org" style={{ padding: "16px 36px", borderRadius: 50, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,.2)", color: "#fff", textDecoration: "none", transition: "all .25s" }}
                onMouseEnter={e => e.target.style.borderColor = "rgba(255,255,255,.5)"}
                onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,.2)"}
              >Enviar correo</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function ColaboraPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <DonationsSection />
      <VolunteerSection />
      <AlliancesSection />
      <FinalCta />
    </div>
  );
}
