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
const SERVICES = [
  { name: "Detección temprana", icon: "🔍", color: "#d94f2b", bg: "#fef0e8",
    desc: "Evaluación integral para identificar señales de alerta lo antes posible e iniciar intervención oportuna. Cuanto antes se identifique, mayor es el impacto de la intervención.",
    details: ["Screening de desarrollo", "Señales de alerta TEA", "Evaluación multisensorial", "Derivación oportuna"],
    highlight: true },
  { name: "Evaluación multidisciplinaria", icon: "📋", color: T.blue, bg: T.cloud,
    desc: "Diagnóstico completo realizado por un equipo de profesionales de distintas áreas para diseñar un plan de intervención verdaderamente personalizado.",
    details: ["Perfil sensorial", "Perfil comunicativo", "Perfil conductual", "Plan individual de intervención"] },
  { name: "Terapia conductual", icon: "🧠", color: T.purple, bg: T.lavender,
    desc: "Estrategias basadas en evidencia para desarrollar conductas adaptativas, fortalecer habilidades funcionales y reducir comportamientos desafiantes.",
    details: ["Análisis funcional", "Refuerzo positivo", "Habilidades adaptativas", "Generalización de conductas"] },
  { name: "Terapia de lenguaje", icon: "🗣️", color: T.teal, bg: T.mint,
    desc: "Desarrollo de habilidades comunicativas verbales y no verbales. Implementamos sistemas aumentativos y alternativos de comunicación cuando es necesario.",
    details: ["Comunicación funcional", "Sistemas aumentativos (SAAC)", "Pragmática del lenguaje", "Intención comunicativa"] },
  { name: "Psicomotricidad", icon: "🤸", color: T.gold, bg: T.cream,
    desc: "Trabajo corporal integral para mejorar la coordinación, el equilibrio, la percepción espacial y la relación del niño con su propio cuerpo.",
    details: ["Coordinación global", "Esquema corporal", "Planificación motora", "Percepción espacial"] },
  { name: "Fisioterapia", icon: "💪", color: T.blue, bg: T.cloud,
    desc: "Intervención motora adaptada a las necesidades sensoriales y motrices de cada niño, mejorando tono muscular, postura y capacidad funcional.",
    details: ["Tono muscular", "Control postural", "Movilidad funcional", "Ejercicio terapéutico"] },
  { name: "Integración sensorial", icon: "🎯", color: "#d94f2b", bg: "#fef0e8",
    desc: "Regulación de la respuesta a estímulos táctiles, vestibulares, propioceptivos, auditivos y visuales para mejorar la participación en actividades cotidianas.",
    details: ["Procesamiento táctil", "Sistema vestibular", "Propiocepción", "Dieta sensorial personalizada"],
    highlight: true },
  { name: "Orientación nutricional", icon: "🥗", color: T.green, bg: T.leaf,
    desc: "Asesoramiento alimentario especializado considerando la selectividad alimentaria frecuente en niños con TEA, y sus necesidades nutricionales específicas.",
    details: ["Selectividad alimentaria", "Nutrición pediátrica", "Planes adaptados", "Suplementación guiada"] },
  { name: "Acompañamiento familiar", icon: "👨‍👩‍👧", color: T.rose, bg: T.roseBg,
    desc: "Formación y contención emocional para las familias. Brindamos estrategias prácticas para el hogar y la escuela, y un espacio seguro para compartir y crecer.",
    details: ["Psicoeducación familiar", "Estrategias para el hogar", "Contención emocional", "Red de apoyo entre familias"] },
];

const SIGNS = [
  { age: "6 – 12 meses", signs: ["No responde a su nombre", "Poco contacto visual", "No señala ni hace gestos", "No balbucea"] },
  { age: "12 – 24 meses", signs: ["No dice palabras sueltas", "No imita acciones", "Pérdida de habilidades adquiridas", "Juego repetitivo o inusual"] },
  { age: "2 – 4 años", signs: ["No arma frases de dos palabras", "Dificultad para jugar con otros", "Movimientos repetitivos", "Reacciones inusuales a sonidos o texturas"] },
];

const PILLARS = [
  { icon: "⏰", title: "Intervención temprana", desc: "Cuanto antes se identifique y se intervenga, mayor será el impacto en el desarrollo del niño. Cada día cuenta.", color: "#d94f2b" },
  { icon: "🧩", title: "Individualización", desc: "No hay dos niños iguales. Cada plan de intervención se diseña a medida, respetando el ritmo y las fortalezas de cada uno.", color: T.purple },
  { icon: "🔄", title: "Enfoque integral", desc: "Abordamos todas las áreas del desarrollo de forma simultánea y coordinada: comunicación, conducta, motricidad y sensorialidad.", color: T.teal },
  { icon: "👨‍👩‍👧", title: "Familia como aliada", desc: "Los padres son los principales agentes del cambio. Los formamos, acompañamos y empoderamos para que sean co-terapeutas.", color: T.rose },
];

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 560, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, #2a0e04 0%, #7a2e14 35%, ${T.coral} 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes puzzle-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes gentle-pulse{0%,100%{opacity:.06}50%{opacity:.12}}
      `}</style>

      {/* Decorative puzzle pieces */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-6%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,200,100,.06),transparent 70%)" }} />
        {["🧩", "🧩", "🧩", "🧩"].map((_, i) => (
          <div key={i} style={{
            position: "absolute", fontSize: 30 + i * 10, opacity: 0, animation: `gentle-pulse ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
            left: `${8 + i * 22}%`, top: `${10 + (i % 3) * 30}%`,
            transform: `rotate(${i * 45}deg)`,
          }}>🧩</div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 90" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 55C320 25 640 70 960 40C1200 18 1380 45 1440 38V90H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 32px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 3 }}>
        <div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .1s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", borderRadius: 50, padding: "6px 18px 6px 10px", marginBottom: 24, border: "1px solid rgba(255,255,255,.1)" }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${T.honey}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🧩</span>
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 500 }}>Programa especializado — Autismo y neurodesarrollo</span>
            </div>
          </div>

          <h1 style={{ fontFamily: F.display, fontSize: "clamp(38px,4.5vw,54px)", color: "#fff", lineHeight: 1.08, marginBottom: 10, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .2s" }}>
            Aula{" "}
            <span style={{ fontStyle: "italic", color: T.honey }}>Wawitas</span>
          </h1>

          <p style={{ fontFamily: F.display, fontSize: 20, color: "rgba(255,255,255,.5)", fontStyle: "italic", marginBottom: 22, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .3s" }}>
            "Comprender, acompañar y potenciar"
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 480, marginBottom: 32, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .4s" }}>
            Programa especializado para niños y niñas con Trastorno del Espectro Autista
            y otras condiciones del neurodesarrollo. Brindamos atención temprana e integral,
            respetando la singularidad de cada niño.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .5s" }}>
            <a href="#servicios" style={{ padding: "15px 34px", borderRadius: 50, fontWeight: 700, fontSize: 15, background: T.gold, color: T.navy, textDecoration: "none", boxShadow: `0 6px 24px ${T.gold}35`, transition: "all .25s" }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "none"}
            >Ver servicios</a>
            <a href="#senales" style={{ padding: "15px 34px", borderRadius: 50, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,.25)", color: "#fff", textDecoration: "none", transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; e.currentTarget.style.background = "rgba(255,255,255,.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.background = "transparent"; }}
            >Señales de alerta</a>
          </div>
        </div>

        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateX(50px) scale(.95)", transition: "all 1s cubic-bezier(.16,1,.3,1) .35s", position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "4/4.2", borderRadius: 28, background: `linear-gradient(145deg, ${T.peach}, ${T.cream})`, boxShadow: "0 32px 80px rgba(0,0,0,.25)", border: "4px solid rgba(255,255,255,.15)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>🧩</div>
              <p style={{ fontFamily: F.display, fontSize: 16, color: T.navy, maxWidth: 220 }}>Fotografías de las sesiones terapéuticas</p>
              <p style={{ fontSize: 12, color: T.muted, marginTop: 8 }}>Espacios sensorialmente adaptados</p>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -16, left: -28, background: T.white, borderRadius: 18, padding: "14px 20px", boxShadow: "0 12px 36px rgba(0,0,0,.1)", display: "flex", alignItems: "center", gap: 12, animation: "float 4s ease-in-out infinite", border: `1px solid ${T.border}` }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: T.peach, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔍</div>
            <div><div style={{ fontFamily: F.display, fontSize: 13, color: T.navy }}>Detección</div><div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>temprana</div></div>
          </div>
          <div style={{ position: "absolute", top: -12, right: -16, background: T.coral, borderRadius: 16, padding: "10px 18px", boxShadow: `0 8px 24px ${T.coral}30`, animation: "float 5s ease-in-out infinite", animationDelay: "1.5s" }}>
            <div style={{ fontFamily: F.display, fontSize: 22, color: "#fff", lineHeight: 1 }}>9</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.85)", fontWeight: 700, letterSpacing: .5, textTransform: "uppercase" }}>Servicios</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ PILLARS ═══ */
function PillarsSection() {
  return (
    <section style={{ padding: "60px 32px 72px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.peach, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,104,64,.12)` }}>
              <span style={{ fontSize: 13 }}>🧭</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.coral, letterSpacing: 1.5, textTransform: "uppercase" }}>Nuestro enfoque</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Cuatro pilares de intervención</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Cada intervención en Aula Wawitas se fundamenta en estos principios no negociables.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * .08}>
              <div style={{ background: T.white, borderRadius: 22, padding: "32px 24px", border: `1px solid ${T.border}`, height: "100%", display: "flex", flexDirection: "column", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${p.color}10`; e.currentTarget.style.borderColor = `${p.color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                <h4 style={{ fontFamily: F.display, fontSize: 18, color: T.navy, marginBottom: 10 }}>{p.title}</h4>
                <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                <div style={{ width: 32, height: 3, borderRadius: 2, background: p.color, marginTop: 16, opacity: .5 }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ EARLY DETECTION ═══ */
function EarlyDetection() {
  const [activeAge, setActiveAge] = useState(0);

  return (
    <section id="senales" style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fef0e8", borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: "1px solid rgba(217,79,43,.12)" }}>
              <span style={{ fontSize: 13 }}>⚠️</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#d94f2b", letterSpacing: 1.5, textTransform: "uppercase" }}>Detección temprana</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>¿Cuándo consultar?</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Identificar las señales a tiempo es el primer paso. Si observas alguna de estas conductas, no esperes — una evaluación profesional puede marcar toda la diferencia.
            </p>
          </div>
        </Reveal>

        {/* Age selector */}
        <Reveal delay={.1}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 36 }}>
            {SIGNS.map((s, i) => (
              <button key={i} onClick={() => setActiveAge(i)} style={{
                padding: "12px 28px", borderRadius: 50, border: `2px solid ${activeAge === i ? "#d94f2b" : T.border}`,
                background: activeAge === i ? "#fef0e8" : T.white,
                color: activeAge === i ? "#d94f2b" : T.body,
                fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: F.body,
                transition: "all .3s",
                boxShadow: activeAge === i ? "0 4px 16px rgba(217,79,43,.12)" : "none",
              }}>{s.age}</button>
            ))}
          </div>
        </Reveal>

        {/* Signs grid */}
        <div key={activeAge} style={{ animation: "fadeSlideUp .4s cubic-bezier(.16,1,.3,1)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, maxWidth: 700, margin: "0 auto" }}>
            {SIGNS[activeAge].signs.map((sign, i) => (
              <div key={sign} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "22px 24px",
                background: T.white, borderRadius: 18, border: `1px solid ${T.border}`,
                transition: "all .25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#d94f2b30"; e.currentTarget.style.transform = "translateX(6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fef0e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, fontFamily: F.display, color: "#d94f2b" }}>{i + 1}</div>
                <span style={{ fontSize: 15, color: T.text, fontWeight: 500 }}>{sign}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fef0e8", borderRadius: 16, padding: "16px 28px", border: "1px solid rgba(217,79,43,.1)" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <p style={{ fontSize: 14, color: T.body, lineHeight: 1.5 }}>
                <strong style={{ color: "#d94f2b" }}>Importante:</strong> Presentar una o más señales no es un diagnóstico.
                Consulta con nuestro equipo para una evaluación profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ SERVICES ═══ */
function ServicesSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="servicios" style={{ padding: "88px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.peach, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,104,64,.12)` }}>
              <span style={{ fontSize: 13 }}>🩺</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.coral, letterSpacing: 1.5, textTransform: "uppercase" }}>Servicios especializados</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>9 áreas de intervención</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Cada servicio se adapta a las características sensoriales, comunicativas y conductuales únicas de cada niño.
            </p>
          </div>
        </Reveal>

        {/* Highlighted services: Detección + Integración sensorial */}
        <Reveal delay={.05}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
            {SERVICES.filter(s => s.highlight).map((s, i) => (
              <div key={s.name} style={{
                background: `linear-gradient(135deg, ${s.bg}, ${T.white})`,
                borderRadius: 24, padding: "36px 32px",
                border: `2px solid ${s.color}20`,
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 18, background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, boxShadow: `0 6px 20px ${s.color}25` }}>{s.icon}</div>
                  <div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${s.color}12`, borderRadius: 50, padding: "3px 12px", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: s.color, letterSpacing: 1, textTransform: "uppercase" }}>Servicio clave</span>
                    </div>
                    <h4 style={{ fontFamily: F.display, fontSize: 22, color: T.navy, marginBottom: 8 }}>{s.name}</h4>
                    <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {s.details.map(d => (
                        <span key={d} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 50, background: T.white, border: `1px solid ${s.color}15`, fontSize: 12, fontWeight: 500, color: T.body }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color }} />{d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Remaining services accordion */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {SERVICES.filter(s => !s.highlight).map((s, idx) => {
            const i = SERVICES.findIndex(x => x.name === s.name);
            const isOpen = open === i;
            return (
              <Reveal key={s.name} delay={idx * .04}>
                <div onClick={() => setOpen(isOpen ? null : i)} style={{
                  background: T.white, borderRadius: 20, overflow: "hidden",
                  border: `1.5px solid ${isOpen ? s.color : T.border}`,
                  boxShadow: isOpen ? `0 12px 36px ${s.color}10` : "0 1px 4px rgba(0,0,0,.02)",
                  transition: "all .35s cubic-bezier(.16,1,.3,1)", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px" }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: 14,
                      background: isOpen ? `linear-gradient(135deg, ${s.color}, ${s.color}cc)` : s.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, flexShrink: 0, transition: "all .3s",
                      boxShadow: isOpen ? `0 4px 16px ${s.color}25` : "none",
                    }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 16, fontWeight: 600, color: T.navy }}>{s.name}</h4>
                      {!isOpen && <p style={{ fontSize: 13, color: T.muted, marginTop: 2, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.desc}</p>}
                    </div>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: isOpen ? `${s.color}12` : T.offWhite, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: isOpen ? s.color : T.muted, flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "all .3s" }}>▾</div>
                  </div>
                  <div style={{ maxHeight: isOpen ? 280 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" }}>
                    <div style={{ padding: "0 24px 24px 90px" }}>
                      <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        {s.details.map(d => (
                          <div key={d} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: s.bg, fontSize: 12.5, fontWeight: 500, color: T.body }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />{d}
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
      </div>
    </section>
  );
}

/* ═══ APPROACH VISUAL ═══ */
function ApproachVisual() {
  const steps = [
    { n: "1", title: "Detección", desc: "Identificamos señales de alerta mediante screening y observación clínica estructurada.", icon: "🔍", color: "#d94f2b" },
    { n: "2", title: "Evaluación", desc: "El equipo multidisciplinario realiza un diagnóstico integral y diseña el plan de intervención.", icon: "📋", color: T.blue },
    { n: "3", title: "Intervención", desc: "Se ejecutan las terapias individuales y grupales según el plan personalizado.", icon: "🧩", color: T.teal },
    { n: "4", title: "Seguimiento", desc: "Evaluamos avances, ajustamos el plan y acompañamos a la familia en cada etapa.", icon: "📊", color: T.purple },
  ];

  return (
    <section style={{ padding: "88px 32px", background: `linear-gradient(180deg, ${T.warm} 0%, ${T.white} 100%)` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.lavender, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(108,92,231,.12)` }}>
              <span style={{ fontSize: 13 }}>🔄</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.purple, letterSpacing: 1.5, textTransform: "uppercase" }}>Proceso de atención</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,40px)", color: T.navy, marginBottom: 14 }}>Del primer contacto al acompañamiento continuo</h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
          {/* Connecting line */}
          <div style={{ position: "absolute", top: 50, left: "10%", right: "10%", height: 3, background: T.border, zIndex: 0, borderRadius: 2 }}>
            <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, #d94f2b, ${T.blue}, ${T.teal}, ${T.purple})` }} />
          </div>

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * .1}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 30, boxShadow: `0 8px 24px ${s.color}25`,
                  border: "4px solid #fff", marginBottom: 20,
                  transition: "transform .3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >{s.icon}</div>
                <div style={{ background: T.white, borderRadius: 18, padding: "20px 18px", border: `1px solid ${T.border}`, textAlign: "center", width: "100%", margin: "0 6px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Paso {s.n}</div>
                  <h4 style={{ fontFamily: F.display, fontSize: 18, color: T.navy, marginBottom: 8 }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FAMILIES ═══ */
function FamiliesSection() {
  return (
    <section style={{ padding: "80px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: `linear-gradient(135deg, ${T.roseBg}, ${T.cream})`, borderRadius: 28, padding: "48px 44px", border: `1px solid rgba(232,67,147,.1)`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,67,147,.08)", borderRadius: 50, padding: "5px 14px", marginBottom: 16 }}>
                <span style={{ fontSize: 14 }}>👨‍👩‍👧</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.rose, letterSpacing: 1 }}>PARA LAS FAMILIAS</span>
              </div>
              <h3 style={{ fontFamily: F.display, fontSize: 30, color: T.navy, marginBottom: 14, lineHeight: 1.15 }}>No caminan solos</h3>
              <p style={{ fontSize: 15, color: T.body, lineHeight: 1.75, marginBottom: 24 }}>
                Recibir un diagnóstico de autismo transforma la vida de toda la familia.
                Por eso, nuestro acompañamiento no termina en la terapia del niño — se extiende
                a cada miembro de la familia con formación, contención y comunidad.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Psicoeducación sobre TEA y neurodesarrollo", "Estrategias prácticas para el hogar", "Contención emocional individual y grupal", "Red de familias que comparten el camino"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: T.body, fontWeight: 500 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.rose, flexShrink: 0 }} />{item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "🎥", title: "Sesiones virtuales gratuitas", desc: "Orientación profesional desde Trabajo Social y Psicología, adaptada a cada etapa del proceso.", bg: T.white },
                { icon: "🤝", title: "Grupos de apoyo", desc: "Encuentros entre familias que comparten experiencias similares — porque nadie entiende mejor que quien lo vive.", bg: T.white },
                { icon: "📚", title: "Material educativo", desc: "Guías prácticas, pictogramas, historias sociales y recursos visuales para usar en casa.", bg: T.white },
              ].map((c, i) => (
                <div key={c.title} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px", borderRadius: 16, background: c.bg, border: `1px solid ${T.border}`, transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: T.roseBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.navy, marginBottom: 3 }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ ENROLLMENT CTA ═══ */
function EnrollmentCta() {
  return (
    <section style={{ padding: "80px 32px", background: `linear-gradient(155deg, #2a0e04 0%, #7a2e14 50%, ${T.coral} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {["🧩","🧩","🧩"].map((_, i) => (
          <div key={i} style={{ position: "absolute", fontSize: 40, opacity: .04, left: `${20 + i * 30}%`, top: `${10 + i * 25}%`, transform: `rotate(${i * 60}deg)` }}>🧩</div>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", padding: "56px 48px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🧩</div>
            <h3 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,38px)", color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
              ¿Tu hijo necesita una evaluación?
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 12px" }}>
              Si observas señales que te preocupan, no esperes. Una evaluación profesional
              a tiempo puede cambiar el curso del desarrollo de tu hijo.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", lineHeight: 1.6, maxWidth: 420, margin: "0 auto 32px" }}>
              La consulta inicial es gratuita. Nuestro equipo te orientará sobre los pasos a seguir.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", borderRadius: 50, fontWeight: 700, fontSize: 16, background: "#25d366", color: "#fff", textDecoration: "none", boxShadow: "0 6px 24px rgba(37,211,102,.3)", transition: "all .25s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              ><span style={{ fontSize: 20 }}>💬</span>Agendar evaluación — 70106276</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function AulaWawitasPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <PillarsSection />
      <EarlyDetection />
      <ServicesSection />
      <ApproachVisual />
      <FamiliesSection />
      <EnrollmentCta />
    </div>
  );
}
