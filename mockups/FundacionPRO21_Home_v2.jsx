import { useState, useEffect, useRef } from "react";

/* ═══ DESIGN TOKENS ═══ */
const T = {
  navy: "#0c2340",
  deep: "#142d4c",
  blue: "#2466a8",
  sky: "#4a9eed",
  cloud: "#e8f1fa",
  gold: "#e8a838",
  honey: "#f5c242",
  cream: "#fdf6e3",
  teal: "#1a8a7d",
  mint: "#e0f5f0",
  coral: "#e86840",
  peach: "#fef0e8",
  green: "#2d8a4e",
  leaf: "#e5f5eb",
  white: "#ffffff",
  offWhite: "#fafbfd",
  warm: "#f7f5f0",
  text: "#1a1a2e",
  body: "#3d4152",
  muted: "#6b7084",
  border: "#e4e6ec",
};

const FONT = {
  display: "'DM Serif Display', Georgia, serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
};

/* ═══ INTERSECTION OBSERVER HOOK ═══ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 50, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ═══ NAVBAR (incluye barra de accesibilidad integrada) ═══ */
export function AccessibilityBar() { return null; } // integrada en Navbar

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [showBar, setShowBar] = useState(true);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Inicio", "Nosotros", "Programas", "Blog", "Impacto", "Colabora", "Contacto"];
  const bg = scrolled ? "rgba(255,255,255,0.96)" : "transparent";
  const fg = scrolled ? T.navy : "#fff";
  const btnA = {
    padding: "2px 8px", borderRadius: 6, border: "1px solid rgba(255,255,255,.12)",
    color: "#fff", cursor: "pointer", fontFamily: FONT.body, fontWeight: 700,
    background: "rgba(255,255,255,.07)", transition: "background .2s",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: ${FONT.body}; background: ${T.white}; color: ${T.text}; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes gradient-shift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 50%; width: 0; height: 2px; background: ${T.gold}; transition: all 0.3s; transform: translateX(-50%); }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* ── Barra de accesibilidad ── */}
        {showBar && (
          <div style={{
            background: T.navy,
            borderBottom: "1px solid rgba(255,255,255,.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 32px", height: 36,
          }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>
              Centro Lápiz en Mano · La Paz, Bolivia
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginRight: 2 }}>Accesibilidad:</span>
              <button title="Reducir texto" onClick={() => setFontSize(f => Math.max(80, f - 10))}
                style={{ ...btnA, fontSize: 10 }}>A−</button>
              <button title="Normal" onClick={() => setFontSize(100)}
                style={{ ...btnA, fontSize: 12, background: fontSize === 100 ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.07)" }}>A</button>
              <button title="Aumentar texto" onClick={() => setFontSize(f => Math.min(140, f + 10))}
                style={{ ...btnA, fontSize: 14 }}>A+</button>
              <div style={{ width: 1, height: 13, background: "rgba(255,255,255,.1)", margin: "0 3px" }} />
              <button title="Alto contraste" onClick={() => setHighContrast(h => !h)}
                style={{ ...btnA, background: highContrast ? T.gold : "rgba(255,255,255,.07)", color: highContrast ? T.navy : "#fff", fontSize: 11 }}>
                ◑ {highContrast ? "Normal" : "Contraste"}
              </button>
              <div style={{ width: 1, height: 13, background: "rgba(255,255,255,.1)", margin: "0 3px" }} />
              <div style={{ display: "flex", gap: 2, padding: "2px", borderRadius: 8, background: "rgba(255,255,255,.07)" }}>
                {["ES", "EN"].map((lang, i) => (
                  <button key={lang} style={{
                    padding: "2px 8px", borderRadius: 6, border: "none",
                    background: i === 0 ? "rgba(255,255,255,.18)" : "transparent",
                    color: i === 0 ? "#fff" : "rgba(255,255,255,.45)",
                    fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: FONT.body,
                  }}>{lang}</button>
                ))}
              </div>
              <button onClick={() => setShowBar(false)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", fontSize: 15, cursor: "pointer", lineHeight: 1, marginLeft: 2 }}>×</button>
            </div>
          </div>
        )}

        {/* ── Barra de navegación principal ── */}
        <nav style={{
          background: bg, backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "none",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
            <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 13,
                background: `linear-gradient(135deg, ${T.blue}, ${T.teal})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(36,102,168,0.3)",
              }}>
                <span style={{ color: "#fff", fontFamily: FONT.display, fontSize: 17, fontWeight: 700 }}>P21</span>
              </div>
              <div>
                <div style={{ fontFamily: FONT.display, fontSize: 18, color: fg, transition: "color 0.3s", lineHeight: 1.1 }}>Fundación PRO-21</div>
                <div style={{ fontSize: 11, color: scrolled ? T.muted : "rgba(255,255,255,0.65)", letterSpacing: 0.8, fontWeight: 500, transition: "color 0.3s" }}>Centro Lápiz en Mano</div>
              </div>
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {links.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="nav-link"
                  style={{
                    padding: "8px 14px", fontSize: 14, fontWeight: 500, textDecoration: "none",
                    color: fg, transition: "color 0.3s", borderRadius: 8,
                  }}>{l}</a>
              ))}
              <a href="#colabora" style={{
                marginLeft: 8, padding: "10px 24px", borderRadius: 50,
                background: T.gold, color: T.navy, fontWeight: 700, fontSize: 14,
                textDecoration: "none", boxShadow: "0 4px 16px rgba(232,168,56,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(232,168,56,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,168,56,0.35)"; }}
              >Apoyar ♥</a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="inicio" style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      background: `linear-gradient(160deg, ${T.navy} 0%, ${T.deep} 35%, ${T.blue} 100%)`,
      display: "flex", alignItems: "center",
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-10%", right: "-8%", width: 600, height: 600,
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)",
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "5%", width: 300, height: 300,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,56,0.08), transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", left: "-5%", width: 500, height: 500,
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)",
        }} />
        {/* Floating dots */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: 6 + i * 2, height: 6 + i * 2,
            borderRadius: "50%", background: `rgba(232,168,56,${0.1 + i * 0.03})`,
            left: `${15 + i * 10}%`, top: `${20 + (i % 3) * 25}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}
      </div>

      {/* Bottom wave */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 120" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 60C240 20 480 80 720 60C960 40 1200 80 1440 50V120H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{
        maxWidth: 1240, margin: "0 auto", padding: "160px 32px 100px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
        position: "relative", zIndex: 2,
      }}>
        {/* Left: Copy */}
        <div>
          <div style={{
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.08)", borderRadius: 50,
              padding: "7px 18px 7px 10px", marginBottom: 28,
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%",
                background: `linear-gradient(135deg, ${T.gold}, ${T.honey})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13,
              }}>✦</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>La Paz, Bolivia — Desde 2021</span>
            </div>
          </div>

          <h1 style={{
            fontFamily: FONT.display, fontSize: "clamp(40px, 5vw, 60px)",
            color: "#fff", lineHeight: 1.08, marginBottom: 24, fontWeight: 400,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
          }}>
            Cada niño merece<br />
            la oportunidad de{" "}
            <span style={{
              fontStyle: "italic",
              background: `linear-gradient(90deg, ${T.honey}, ${T.gold}, ${T.honey})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 4s ease infinite",
            }}>brillar</span>
          </h1>

          <p style={{
            fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.7)",
            maxWidth: 500, marginBottom: 36,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}>
            Promovemos el bienestar integral de niños, niñas y adolescentes con
            síndrome de Down, autismo y dificultades de aprendizaje a través de
            programas terapéuticos especializados e inclusivos.
          </p>

          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s",
          }}>
            <a href="#programas" style={{
              padding: "15px 36px", borderRadius: 50, fontWeight: 700, fontSize: 15,
              background: T.gold, color: T.navy, textDecoration: "none",
              boxShadow: "0 6px 24px rgba(232,168,56,0.3)",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 10px 32px rgba(232,168,56,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 6px 24px rgba(232,168,56,0.3)"; }}
            >Conoce nuestros programas</a>
            <a href="#contacto" style={{
              padding: "15px 36px", borderRadius: 50, fontWeight: 600, fontSize: 15,
              border: "2px solid rgba(255,255,255,0.25)", color: "#fff",
              textDecoration: "none", transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.6)"; e.target.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.background = "transparent"; }}
            >Contáctanos</a>
          </div>
        </div>

        {/* Right: Visual composition */}
        <div style={{
          position: "relative",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateX(60px) scale(0.95)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
        }}>
          {/* Main photo placeholder */}
          <div style={{
            width: "100%", aspectRatio: "3/3.2", borderRadius: 28,
            background: `linear-gradient(145deg, ${T.cloud}, ${T.cream})`,
            overflow: "hidden", position: "relative",
            boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
            border: "4px solid rgba(255,255,255,0.15)",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, rgba(36,102,168,0.05), rgba(232,168,56,0.05))`,
            }} />
            <div style={{ position: "relative", textAlign: "center", padding: "60px 32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <div style={{ fontSize: 56, marginBottom: 16, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>👧🧒👦</div>
              <p style={{ fontFamily: FONT.display, fontSize: 17, color: T.navy, maxWidth: 240, lineHeight: 1.5 }}>
                Foto principal de los niños en terapia
              </p>
              <p style={{ fontSize: 12, color: T.muted, marginTop: 8 }}>
                Imagen real del Centro Lápiz en Mano
              </p>
            </div>
          </div>

          {/* Floating stat card */}
          <div style={{
            position: "absolute", bottom: -24, left: -40,
            background: "#fff", borderRadius: 20, padding: "18px 24px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", gap: 14,
            animation: "float 4s ease-in-out infinite",
            border: `1px solid ${T.border}`,
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: 14,
              background: `linear-gradient(135deg, ${T.mint}, ${T.leaf})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
            }}>💚</div>
            <div>
              <div style={{ fontFamily: FONT.display, fontSize: 28, color: T.navy, lineHeight: 1 }}>100+</div>
              <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>Familias acompañadas</div>
            </div>
          </div>

          {/* Floating badge top-right */}
          <div style={{
            position: "absolute", top: -16, right: -20,
            background: T.gold, borderRadius: 16, padding: "12px 20px",
            boxShadow: "0 8px 24px rgba(232,168,56,0.3)",
            animation: "float 5s ease-in-out infinite",
            animationDelay: "1s",
          }}>
            <div style={{ fontFamily: FONT.display, fontSize: 20, color: T.navy, lineHeight: 1 }}>3</div>
            <div style={{ fontSize: 10, color: T.navy, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>Programas</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ STATS ═══ */
function Stats() {
  const stats = [
    { n: "5+", l: "Años de experiencia", icon: "🏛", color: T.blue },
    { n: "3", l: "Programas especializados", icon: "📋", color: T.coral },
    { n: "100+", l: "Familias acompañadas", icon: "👨‍👩‍👧", color: T.teal },
    { n: "20+", l: "Profesionales del equipo", icon: "🩺", color: T.gold },
  ];
  return (
    <section style={{ background: T.offWhite, padding: "56px 32px", position: "relative", zIndex: 3 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{
              textAlign: "center", padding: "28px 16px", borderRadius: 20,
              background: T.white, border: `1px solid ${T.border}`,
              transition: "transform 0.3s, box-shadow 0.3s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: FONT.display, fontSize: 36, color: s.color, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: T.muted, marginTop: 6, fontWeight: 500 }}>{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══ THREE PROGRAMS ═══ */
function Programs() {
  const [active, setActive] = useState(null);
  const programs = [
    {
      id: "escuelita",
      emoji: "🌟",
      name: "Mi Escuelita Inclusiva Down",
      slogan: "Creciendo sin límites",
      color: T.blue, bg: T.cloud, accent: T.blue,
      levels: [
        { age: "0–2", name: "Manos chiquitas", icon: "🍼" },
        { age: "3–7", name: "Aventuras sin límites", icon: "🎨" },
        { age: "8–14", name: "Oportunidades para todos", icon: "📖" },
        { age: "15+", name: "Programa Crecer", icon: "🌱" },
      ],
      services: ["Estimulación temprana", "Terapia de lenguaje", "Psicomotricidad", "Fisioterapia", "Integración sensorial", "Habilidades adaptativas", "Apoyo pedagógico", "Orientación familiar"],
      desc: "Programa especializado para niños, niñas y adolescentes con síndrome de Down. Potenciamos sus habilidades, fortalecemos su autonomía y favorecemos una inclusión plena a través de intervenciones adaptadas a cada etapa de desarrollo.",
    },
    {
      id: "wawitas",
      emoji: "🧩",
      name: "Aula Wawitas",
      slogan: "Comprender, acompañar y potenciar",
      color: T.coral, bg: T.peach, accent: T.coral,
      levels: [],
      services: ["Detección temprana", "Evaluación multidisciplinaria", "Terapia conductual", "Terapia de lenguaje", "Psicomotricidad", "Fisioterapia", "Integración sensorial", "Orientación nutricional", "Acompañamiento familiar"],
      desc: "Programa especializado para niños y niñas con autismo y otras condiciones del neurodesarrollo. Brindamos atención temprana e integral, respetando las características individuales y el ritmo de cada niño.",
    },
    {
      id: "pasos",
      emoji: "📚",
      name: "Pasos Firmes",
      slogan: "Aprender también puede ser diferente",
      color: T.green, bg: T.leaf, accent: T.green,
      levels: [],
      services: ["Dificultades de lectura y escritura", "Atención y concentración", "Razonamiento cognitivo", "Maduración neuropsicológica", "Apoyo psicopedagógico", "Técnicas de estudio", "Orientación familiar"],
      desc: "Programa para niños y niñas con dificultades en el aprendizaje, atención o desempeño escolar. Identificamos necesidades específicas y desarrollamos estrategias terapéuticas y pedagógicas personalizadas.",
    },
  ];

  return (
    <section id="programas" style={{ padding: "100px 32px 80px", background: T.offWhite }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.cream, borderRadius: 50, padding: "6px 18px",
              marginBottom: 16, border: `1px solid rgba(232,168,56,0.2)`,
            }}>
              <span style={{ fontSize: 14 }}>💛</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.coral, letterSpacing: 1.5, textTransform: "uppercase" }}>Nuestros programas</span>
            </div>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(32px, 4vw, 48px)", color: T.navy, marginBottom: 16 }}>
              Tres caminos, un propósito
            </h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Programas especializados adaptados a las necesidades únicas de cada niño y su familia.
            </p>
          </div>
        </Reveal>

        {/* Program cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {programs.map((prog, i) => {
            const isActive = active === i;
            return (
              <Reveal key={prog.id} delay={i * 0.12}>
                <div
                  onClick={() => setActive(isActive ? null : i)}
                  style={{
                    borderRadius: 24, overflow: "hidden", cursor: "pointer",
                    background: T.white,
                    border: `2px solid ${isActive ? prog.color : T.border}`,
                    boxShadow: isActive
                      ? `0 20px 48px ${prog.color}18, 0 4px 12px rgba(0,0,0,0.04)`
                      : "0 4px 16px rgba(0,0,0,0.04)",
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    transform: isActive ? "translateY(-6px)" : "none",
                  }}
                >
                  {/* Card header */}
                  <div style={{
                    padding: "36px 32px 28px", position: "relative",
                    background: `linear-gradient(135deg, ${prog.bg}, ${T.white})`,
                  }}>
                    <div style={{
                      position: "absolute", top: 20, right: 20,
                      fontSize: 40, opacity: 0.15,
                    }}>{prog.emoji}</div>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: `linear-gradient(135deg, ${prog.color}, ${prog.accent}dd)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 26, marginBottom: 20,
                      boxShadow: `0 6px 20px ${prog.color}30`,
                    }}>{prog.emoji}</div>
                    <h3 style={{ fontFamily: FONT.display, fontSize: 22, color: T.navy, marginBottom: 6, lineHeight: 1.2 }}>
                      {prog.name}
                    </h3>
                    <p style={{
                      fontSize: 13, fontWeight: 600, color: prog.color,
                      fontStyle: "italic", letterSpacing: 0.3,
                    }}>"{prog.slogan}"</p>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "0 32px 32px" }}>
                    <p style={{ fontSize: 14, color: T.body, lineHeight: 1.65, marginBottom: 20 }}>{prog.desc}</p>

                    {/* Levels (only for Escuelita) */}
                    {prog.levels.length > 0 && (
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
                          Niveles por edad
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                          {prog.levels.map(l => (
                            <div key={l.age} style={{
                              display: "flex", alignItems: "center", gap: 8,
                              padding: "8px 12px", borderRadius: 10,
                              background: prog.bg, fontSize: 12, fontWeight: 500, color: T.text,
                            }}>
                              <span style={{ fontSize: 14 }}>{l.icon}</span>
                              <span>{l.age}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Services — expandable */}
                    <div style={{
                      maxHeight: isActive ? 400 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, paddingTop: 8 }}>
                        {prog.services.length} servicios especializados
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {prog.services.map(s => (
                          <div key={s} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "7px 12px", borderRadius: 8,
                            background: prog.bg, fontSize: 13, color: T.body,
                          }}>
                            <span style={{
                              width: 6, height: 6, borderRadius: "50%",
                              background: prog.color, flexShrink: 0,
                            }} />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Toggle hint + link a página completa */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: prog.color }}>
                        <span>{isActive ? "Ver menos" : "Ver servicios"}</span>
                        <span style={{ transform: isActive ? "rotate(180deg)" : "none", transition: "transform 0.3s", display: "inline-block" }}>▾</span>
                      </div>
                      {isActive && (
                        <a href={`#${prog.id === "escuelita" ? "escuelita-down" : prog.id === "wawitas" ? "aula-wawitas" : "pasos-firmes"}`}
                          onClick={e => e.stopPropagation()}
                          style={{ fontSize: 13, fontWeight: 700, color: prog.color, textDecoration: "none", padding: "6px 14px", borderRadius: 50, border: `1.5px solid ${prog.color}30`, background: `${prog.color}08`, transition: "all .2s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = `${prog.color}15`; }}
                          onMouseLeave={e => { e.currentTarget.style.background = `${prog.color}08`; }}
                        >Ver programa completo →</a>
                      )}
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

/* ═══ TESTIMONIALS ═══ */
const TESTIMONIALS = [
  {
    quote: "Cuando recibimos el diagnóstico sentimos que el mundo se detenía. En Lápiz en Mano encontramos no solo terapia, sino una familia que nos enseñó a ver las capacidades antes que las limitaciones.",
    name: "Familia Quispe",
    program: "Mi Escuelita Down",
    icon: "🌟", color: T.blue,
  },
  {
    quote: "Mi hijo no hablaba a los 3 años. Después de un año en Aula Wawitas, no solo dice palabras: canta canciones. Cada logro que parece pequeño para otros, para nosotros es un universo completo.",
    name: "Familia Mamani",
    program: "Aula Wawitas",
    icon: "🧩", color: T.coral,
  },
  {
    quote: "Los profesores decían que era flojo. Aquí descubrieron que tiene dislexia. Le enseñaron a aprender de otra forma y sus notas cambiaron. Pero lo más importante: su autoestima volvió.",
    name: "Familia Condori",
    program: "Pasos Firmes",
    icon: "📚", color: T.green,
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[active];

  return (
    <section style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.cream, borderRadius: 50, padding: "6px 18px",
              marginBottom: 16, border: `1px solid rgba(232,168,56,.15)`,
            }}>
              <span style={{ fontSize: 14 }}>💬</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Testimonios</span>
            </div>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy }}>
              Lo que dicen las familias
            </h2>
          </div>
        </Reveal>

        <Reveal delay={.1}>
          <div style={{
            background: T.white, borderRadius: 28, padding: "52px 56px",
            border: `1px solid ${T.border}`,
            boxShadow: `0 20px 64px ${t.color}08`,
            position: "relative", overflow: "hidden",
            transition: "box-shadow .5s",
          }}>
            <div style={{
              position: "absolute", top: -16, left: 28,
              fontFamily: FONT.display, fontSize: 140, lineHeight: 1,
              color: `${t.color}05`, userSelect: "none", pointerEvents: "none",
              transition: "color .5s",
            }}>"</div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: FONT.display, fontSize: "clamp(18px,2.2vw,24px)",
                color: T.navy, lineHeight: 1.55, marginBottom: 36, fontStyle: "italic",
              }}>"{t.quote}"</p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, boxShadow: `0 6px 20px ${t.color}25`,
                    transition: "background .5s",
                  }}>{t.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: T.navy }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: t.color, fontWeight: 500, transition: "color .5s" }}>{t.program}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)} style={{
                      width: i === active ? 28 : 10, height: 10, borderRadius: 5,
                      background: i === active ? t.color : T.border,
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all .4s cubic-bezier(.16,1,.3,1)",
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={.15}>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href="#impacto" style={{ fontSize: 14, color: T.blue, fontWeight: 600, textDecoration: "none" }}>
              Ver más historias en la sección Impacto →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ IMPACT STRIP ═══ */
function ImpactStrip() {
  return (
    <section style={{
      padding: "80px 32px",
      background: `linear-gradient(135deg, ${T.cream} 0%, ${T.white} 50%, ${T.cloud} 100%)`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.peach, borderRadius: 50, padding: "6px 18px",
              marginBottom: 16, border: `1px solid rgba(232,104,64,0.15)`,
            }}>
              <span style={{ fontSize: 14 }}>🌎</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.coral, letterSpacing: 1.5, textTransform: "uppercase" }}>Impacto social</span>
            </div>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(28px, 3.5vw, 42px)", color: T.navy, marginBottom: 16 }}>
              Historias que transforman
            </h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Cada familia que acompañamos es una historia de superación, valentía y amor incondicional.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            {
              title: "Historias de familias",
              desc: "Testimonios reales de padres y madres que encontraron esperanza y crecimiento en nuestros programas.",
              icon: "💛", bg: T.cream, accent: T.gold,
            },
            {
              title: "Transparencia",
              desc: "Publicamos informes anuales de gestión, uso de recursos y resultados medibles de cada programa.",
              icon: "📊", bg: T.cloud, accent: T.blue,
            },
            {
              title: "Repercusión mediática",
              desc: "Nuestra labor ha sido reconocida por medios nacionales e internacionales, visibilizando la inclusión en Bolivia.",
              icon: "📰", bg: T.leaf, accent: T.green,
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{
                padding: 32, borderRadius: 24, background: T.white,
                border: `1px solid ${T.border}`, height: "100%",
                transition: "all 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${item.accent}12`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16, background: item.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 20,
                }}>{item.icon}</div>
                <h4 style={{ fontFamily: FONT.display, fontSize: 20, color: T.navy, marginBottom: 10 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ BLOG PREVIEW ═══ */
const RECENT_POSTS = [
  {
    emoji: "📰", category: "Prensa", catColor: T.gold,
    date: "Mayo 2026", readTime: "8 min",
    title: "La fundación que no se detuvo: cómo el bloqueo visibilizó la inclusión en Bolivia",
    excerpt: "Cuando los caminos se cerraron, la Fundación PRO-21 no pausó sus sesiones. La historia se difundió por redes sociales y llegó a medios internacionales.",
  },
  {
    emoji: "🌟", category: "Noticias", catColor: T.blue,
    date: "Enero 2026", readTime: "3 min",
    title: "Inscripciones 2026: cupos disponibles en los tres programas terapéuticos",
    excerpt: "Iniciamos el año con cupos en Mi Escuelita Down, Aula Wawitas y Pasos Firmes. Consulta los requisitos y cómo inscribirse.",
  },
  {
    emoji: "💛", category: "Campañas", catColor: T.coral,
    date: "Marzo 2026", readTime: "4 min",
    title: "21 de Marzo: jornada comunitaria por el Día Mundial del Síndrome de Down",
    excerpt: "Familias, profesionales y amigos de la fundación celebraron juntos con una jornada abierta llena de color e inclusión en La Paz.",
  },
];

function BlogPreview() {
  return (
    <section style={{ padding: "88px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: T.cloud, borderRadius: 50, padding: "6px 18px",
                marginBottom: 14, border: `1px solid rgba(36,102,168,.1)`,
              }}>
                <span style={{ fontSize: 13 }}>📖</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.blue, letterSpacing: 1.5, textTransform: "uppercase" }}>Blog y noticias</span>
              </div>
              <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(26px,3.2vw,38px)", color: T.navy }}>Últimas novedades</h2>
            </div>
            <a href="#blog" style={{
              padding: "10px 24px", borderRadius: 50, border: `1.5px solid ${T.border}`,
              color: T.navy, fontWeight: 600, fontSize: 14,
              textDecoration: "none", background: T.white, whiteSpace: "nowrap",
              transition: "all .25s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = T.blue; e.target.style.color = T.blue; }}
              onMouseLeave={e => { e.target.style.borderColor = T.border; e.target.style.color = T.navy; }}
            >Ver todas las noticias →</a>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {RECENT_POSTS.map((post, i) => (
            <Reveal key={i} delay={i * .08}>
              <article onClick={() => { window.location.hash = "blog-post"; }} style={{
                background: T.white, borderRadius: 22, overflow: "hidden",
                border: `1px solid ${T.border}`, height: "100%",
                display: "flex", flexDirection: "column",
                transition: "all .3s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  height: 160,
                  background: `linear-gradient(135deg, ${T.cloud}, ${T.offWhite})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 52, position: "relative",
                }}>
                  {post.emoji}
                  <div style={{
                    position: "absolute", top: 14, left: 14,
                    padding: "4px 12px", borderRadius: 50,
                    background: post.catColor, color: "#fff",
                    fontSize: 11, fontWeight: 700,
                  }}>{post.category}</div>
                </div>
                <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 12, color: T.muted }}>
                    <span>{post.date}</span><span>·</span><span>{post.readTime} lectura</span>
                  </div>
                  <h4 style={{ fontFamily: FONT.display, fontSize: 17, color: T.navy, lineHeight: 1.4, marginBottom: 10, flex: 1 }}>{post.title}</h4>
                  <p style={{ fontSize: 13, color: T.body, lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt}</p>
                  <div style={{ fontSize: 13, color: T.blue, fontWeight: 600 }}>Leer más →</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA / COLABORA ═══ */
function Collaborate() {
  return (
    <section id="colabora" style={{
      padding: "100px 32px", position: "relative", overflow: "hidden",
      background: `linear-gradient(150deg, ${T.navy} 0%, ${T.deep} 40%, #1a4a7a 100%)`,
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "10%", left: "5%", width: 400, height: 400,
          borderRadius: "50%", background: `radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "10%", width: 300, height: 300,
          borderRadius: "50%", background: `radial-gradient(circle, rgba(26,138,125,0.06), transparent 70%)`,
        }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.08)", borderRadius: 50, padding: "6px 18px",
              marginBottom: 16, border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <span style={{ fontSize: 14 }}>♥</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.honey, letterSpacing: 1.5, textTransform: "uppercase" }}>Colabora</span>
            </div>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(28px, 3.5vw, 42px)", color: "#fff", marginBottom: 16 }}>
              Tu apoyo cambia vidas
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Existen muchas formas de ser parte de esta misión. Cada contribución nos acerca a una sociedad más inclusiva.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { title: "Dona", desc: "Tu aporte financia terapias, materiales y becas para familias que más lo necesitan.", icon: "🤍", btn: "Quiero donar", color: T.gold },
            { title: "Sé voluntario", desc: "Comparte tu tiempo y talento. Necesitamos profesionales, estudiantes y personas comprometidas.", icon: "🙌", btn: "Inscríbete", color: T.teal },
            { title: "Alianzas", desc: "Empresas, ONGs e instituciones internacionales: trabajemos juntos por la inclusión.", icon: "🌍", btn: "Contáctanos", color: T.sky },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{
                padding: 36, borderRadius: 24,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                display: "flex", flexDirection: "column", height: "100%",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 20 }}>{item.icon}</div>
                <h4 style={{ fontFamily: FONT.display, fontSize: 24, color: "#fff", marginBottom: 12 }}>{item.title}</h4>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, flex: 1 }}>{item.desc}</p>
                <a href="#contacto" style={{
                  display: "block", marginTop: 24, padding: "13px 0", borderRadius: 50,
                  fontWeight: 700, fontSize: 14, textAlign: "center", textDecoration: "none",
                  background: item.color, color: item.color === T.gold ? T.navy : "#fff",
                  boxShadow: `0 6px 20px ${item.color}35`,
                  transition: "transform 0.2s",
                }}
                  onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.target.style.transform = "none"}
                >{item.btn}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CONTACT ═══ */
function Contact() {
  return (
    <section id="contacto" style={{ padding: "100px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(28px, 3.5vw, 42px)", color: T.navy, marginBottom: 16 }}>
              Estamos para ayudarte
            </h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Escríbenos o visítanos. Estamos a un mensaje de distancia.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Form */}
          <Reveal delay={0.1}>
            <div style={{
              background: T.white, borderRadius: 24, padding: 44,
              border: `1px solid ${T.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
            }}>
              <h4 style={{ fontFamily: FONT.display, fontSize: 22, color: T.navy, marginBottom: 28 }}>Envíanos un mensaje</h4>
              {["Nombre completo", "Correo electrónico", "Teléfono"].map(label => (
                <div key={label} style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</label>
                  <input style={{
                    width: "100%", padding: "13px 18px", borderRadius: 12,
                    border: `1px solid ${T.border}`, fontSize: 15, outline: "none",
                    background: T.offWhite, fontFamily: FONT.body, boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                    onFocus={e => e.target.style.borderColor = T.blue}
                    onBlur={e => e.target.style.borderColor = T.border}
                    placeholder={label}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>Mensaje</label>
                <textarea rows={4} style={{
                  width: "100%", padding: "13px 18px", borderRadius: 12,
                  border: `1px solid ${T.border}`, fontSize: 15, outline: "none",
                  background: T.offWhite, fontFamily: FONT.body, resize: "vertical", boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                  onFocus={e => e.target.style.borderColor = T.blue}
                  onBlur={e => e.target.style.borderColor = T.border}
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <button style={{
                width: "100%", padding: "15px", borderRadius: 50, border: "none",
                background: `linear-gradient(135deg, ${T.blue}, ${T.teal})`,
                color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                fontFamily: FONT.body, boxShadow: "0 6px 24px rgba(36,102,168,0.25)",
                transition: "transform 0.2s",
              }}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "none"}
              >Enviar mensaje</button>
            </div>
          </Reveal>

          {/* Info cards */}
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "📍", title: "Dirección", info: "La Paz, Bolivia", sub: "Centro Lápiz en Mano", color: T.cloud },
                { icon: "📱", title: "WhatsApp", info: "+591 70106276", sub: "Lun – Vie: 8:00 – 18:00", color: T.leaf },
                { icon: "✉️", title: "Correo", info: "contacto@fundacionpro21.org", sub: "Respuesta en 24 horas", color: T.cream },
              ].map((c, i) => (
                <div key={i} style={{
                  padding: 24, borderRadius: 18, background: T.white,
                  border: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", gap: 18,
                  transition: "all 0.25s", cursor: "pointer",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{
                    width: 54, height: 54, borderRadius: 16, background: c.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, flexShrink: 0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>{c.title}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: T.navy, marginTop: 2 }}>{c.info}</div>
                    <div style={{ fontSize: 13, color: T.muted }}>{c.sub}</div>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div style={{
                padding: 24, borderRadius: 18, background: T.white,
                border: `1px solid ${T.border}`, marginTop: 4,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Redes sociales</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { name: "Facebook", handle: "Centro Lapiz en Mano", color: "#1877f2", bg: "#e8f0fe" },
                    { name: "Instagram", handle: "@Centro_Lapiz_en_Mano", color: "#e4405f", bg: "#fce8ec" },
                    { name: "TikTok", handle: "@lapiz.en.mano65", color: "#111", bg: "#f0f0f0" },
                  ].map(s => (
                    <div key={s.name} style={{
                      padding: "14px 10px", borderRadius: 14, background: s.bg,
                      textAlign: "center", cursor: "pointer",
                      transition: "all 0.25s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = s.bg; e.currentTarget.style.transform = "none"; }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 700, color: s.color, transition: "color 0.25s" }}
                        className="social-name">{s.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
export function SiteFooter() {
  return (
    <footer style={{ background: T.navy, padding: "60px 32px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: `linear-gradient(135deg, ${T.blue}, ${T.teal})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: FONT.display, fontSize: 14,
              }}>P21</div>
              <div>
                <div style={{ fontFamily: FONT.display, fontSize: 16, color: "#fff" }}>Fundación PRO-21</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Centro Lápiz en Mano</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 280 }}>
              Promovemos el bienestar integral de personas con y sin discapacidad en La Paz, Bolivia.
            </p>
          </div>
          {[
            { t: "Programas", items: [
              { label: "Mi Escuelita Down", href: "#escuelita-down" },
              { label: "Aula Wawitas", href: "#aula-wawitas" },
              { label: "Pasos Firmes", href: "#pasos-firmes" },
              { label: "Prog. Crecer", href: "#escuelita-down" },
            ]},
            { t: "Institución", items: [
              { label: "Nosotros", href: "#nosotros" },
              { label: "Equipo", href: "#equipo" },
              { label: "Impacto", href: "#impacto" },
              { label: "Blog", href: "#blog" },
            ]},
            { t: "Colabora", items: [
              { label: "Donaciones", href: "#colabora" },
              { label: "Voluntariado", href: "#colabora" },
              { label: "Alianzas", href: "#colabora" },
              { label: "Contacto", href: "#contacto" },
            ]},
          ].map(col => (
            <div key={col.t}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1.5 }}>{col.t}</div>
              {col.items.map(item => (
                <a key={item.label} href={item.href} style={{
                  display: "block", fontSize: 13, color: "rgba(255,255,255,0.45)",
                  textDecoration: "none", padding: "5px 0", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = T.honey}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                >{item.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            © 2026 Fundación PRO-21 & Centro Lápiz en Mano — La Paz, Bolivia
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="#admin" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.5)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.2)"}
            >⚙ Admin CMS</a>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 600 }}>ES</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", cursor: "pointer" }}>EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══ WHATSAPP FAB ═══ */
export function WhatsApp() {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 999,
        display: "flex", alignItems: "center", gap: 10,
        background: "#25d366", borderRadius: 50,
        padding: hovered ? "14px 24px 14px 18px" : "16px",
        boxShadow: "0 6px 24px rgba(37,211,102,0.35)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        textDecoration: "none",
        transform: hovered ? "scale(1.05)" : "none",
      }}
    >
      <span style={{ fontSize: 26, lineHeight: 1 }}>💬</span>
      <span style={{
        color: "#fff", fontWeight: 700, fontSize: 14,
        maxWidth: hovered ? 200 : 0, overflow: "hidden",
        whiteSpace: "nowrap", transition: "max-width 0.3s",
        fontFamily: FONT.body,
      }}>Escríbenos</span>
    </a>
  );
}

/* ═══ MAIN EXPORT ═══ */
export default function FundacionPRO21Home() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <Stats />
      <Programs />
      <TestimonialsSection />
      <ImpactStrip />
      <BlogPreview />
      <Collaborate />
      <Contact />
      <SiteFooter />
      <WhatsApp />
    </div>
  );
}
