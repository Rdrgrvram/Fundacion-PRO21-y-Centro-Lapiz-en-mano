import { useState, useEffect, useRef } from "react";

/* ═══ TOKENS ═══ */
const T = {
  navy: "#0c2340", deep: "#142d4c", blue: "#2466a8", sky: "#4a9eed",
  cloud: "#e8f1fa", gold: "#e8a838", honey: "#f5c242", cream: "#fdf6e3",
  teal: "#1a8a7d", mint: "#e0f5f0", coral: "#e86840", peach: "#fef0e8",
  green: "#2d8a4e", leaf: "#e5f5eb", white: "#ffffff", offWhite: "#fafbfd",
  warm: "#f7f5f0", text: "#1a1a2e", body: "#3d4152", muted: "#6b7084",
  border: "#e4e6ec", purple: "#6c5ce7", lavender: "#f0edff",
};
const F = {
  display: "'DM Serif Display', Georgia, serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
};

/* ═══ HOOKS ═══ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}
function Reveal({ children, delay = 0, y = 44, style = {} }) {
  const [ref, vis] = useReveal();
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : `translateY(${y}px)`, transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`, ...style }}>{children}</div>;
}

/* ═══ DATA ═══ */
const VALUES = [
  { name: "Inclusión radical", icon: "🤝", desc: "Eliminamos barreras y creamos espacios donde cada persona es valorada por sus capacidades únicas.", color: T.blue, bg: T.cloud },
  { name: "Empoderamiento auténtico", icon: "💪", desc: "Fortalecemos la confianza y autonomía de cada niño, niña y familia que acompaña nuestros programas.", color: T.coral, bg: T.peach },
  { name: "Autogestión como meta", icon: "🎯", desc: "Trabajamos para que cada persona desarrolle las herramientas necesarias para dirigir su propia vida.", color: T.teal, bg: T.mint },
  { name: "Innovación con propósito", icon: "💡", desc: "Buscamos nuevas formas de intervención terapéutica y educativa con impacto real y medible.", color: T.gold, bg: T.cream },
  { name: "Equidad adaptativa", icon: "⚖️", desc: "Adaptamos nuestros programas al ritmo y las necesidades individuales, garantizando igualdad de oportunidades.", color: T.purple, bg: T.lavender },
  { name: "Desarrollo holístico", icon: "🌱", desc: "Atendemos todas las dimensiones del ser: cognitiva, física, emocional, social y familiar.", color: T.green, bg: T.leaf },
  { name: "Liderazgo colaborativo", icon: "🤲", desc: "Construimos redes de trabajo entre familias, profesionales, instituciones y la comunidad.", color: T.blue, bg: T.cloud },
  { name: "Compromiso comunitario", icon: "🏘️", desc: "Devolvemos a la comunidad con programas abiertos, campañas de sensibilización y formación continua.", color: T.coral, bg: T.peach },
];

const TIMELINE = [
  { year: "2021", title: "Nace Centro Lápiz en Mano", desc: "Se funda el Centro de Educación Complementaria Lápiz en Mano en la ciudad de La Paz, con la visión de brindar atención integral a niños y niñas con necesidades especiales.", icon: "🏠", color: T.blue },
  { year: "2021", title: "Mi Escuelita Inclusiva Down", desc: "Se inaugura el primer programa especializado para niños con síndrome de Down, ofreciendo estimulación temprana, terapia de lenguaje, fisioterapia y apoyo pedagógico.", icon: "🌟", color: T.gold },
  { year: "2022", title: "Fundación PRO-21", desc: "Se constituye formalmente la Fundación PRO-21 como entidad sin fines de lucro, ampliando el alcance institucional y la capacidad de gestionar cooperación nacional e internacional.", icon: "📋", color: T.teal },
  { year: "2023", title: "Aula Wawitas", desc: "Se lanza el segundo programa especializado, enfocado en niños con autismo y otras condiciones del neurodesarrollo, incorporando detección temprana y evaluación multidisciplinaria.", icon: "🧩", color: T.coral },
  { year: "2024", title: "Pasos Firmes", desc: "Nace el tercer programa, dirigido a niños con dificultades de aprendizaje, atención y desempeño escolar. Se completa la oferta integral de la fundación.", icon: "📚", color: T.green },
  { year: "2025", title: "Reconocimiento y crecimiento", desc: "La fundación gana visibilidad nacional e internacional. Se fortalecen alianzas con organizaciones y se superan las 100 familias acompañadas.", icon: "🌎", color: T.purple },
  { year: "2026", title: "Proyección digital", desc: "Alianza con la UCB para el desarrollo de la plataforma web institucional. Inicio de la estrategia de cooperación internacional y presencia digital profesional.", icon: "🚀", color: T.navy },
];

/* ═══ PAGE HERO ═══ */
function PageHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 520, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 50%, ${T.blue} 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: ${F.body}; background: ${T.white}; color: ${T.text}; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes draw-line { from { height: 0; } to { height: 100%; } }
        @keyframes pulse-dot { 0%, 100% { box-shadow: 0 0 0 0 rgba(232,168,56,0.4); } 50% { box-shadow: 0 0 0 12px rgba(232,168,56,0); } }
      `}</style>

      {/* Decorative */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: "-30%", left: "-8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%)" }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: 5 + i * 3, height: 5 + i * 3,
            borderRadius: "50%", background: `rgba(255,255,255,${0.03 + i * 0.01})`,
            left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`,
            animation: `float ${3.5 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }} />
        ))}
      </div>

      {/* Bottom wave */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 90" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 40C360 80 720 10 1080 50C1260 70 1380 60 1440 55V90H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "140px 32px 100px",
        textAlign: "center", position: "relative", zIndex: 3,
      }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(.16,1,.3,1) 0.15s",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.07)", borderRadius: 50,
            padding: "6px 18px 6px 10px", marginBottom: 28,
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✦</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500 }}>Nuestra historia</span>
          </div>
        </div>

        <h1 style={{
          fontFamily: F.display, fontSize: "clamp(38px, 5vw, 56px)", color: "#fff",
          lineHeight: 1.1, marginBottom: 20,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.16,1,.3,1) 0.25s",
        }}>
          Dos instituciones,{" "}
          <span style={{ fontStyle: "italic", color: T.honey }}>una misión</span>
        </h1>

        <p style={{
          fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.65)",
          maxWidth: 600, margin: "0 auto",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(.16,1,.3,1) 0.4s",
        }}>
          Fundación PRO-21 y Centro Lápiz en Mano trabajan juntos desde La Paz
          para brindar atención integral a personas con y sin discapacidad,
          promoviendo la inclusión y el desarrollo pleno.
        </p>
      </div>
    </section>
  );
}

/* ═══ IDENTITY — TWO INSTITUTIONS ═══ */
function Identity() {
  return (
    <section style={{ padding: "80px 32px 40px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr", gap: 0, alignItems: "stretch" }}>
          {/* PRO-21 */}
          <Reveal delay={0.05}>
            <div style={{
              background: T.white, borderRadius: 24, padding: "44px 40px",
              border: `1px solid ${T.border}`, height: "100%",
              transition: "box-shadow 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.06)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 18,
                background: `linear-gradient(135deg, ${T.blue}, ${T.teal})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24, boxShadow: `0 8px 24px ${T.blue}25`,
              }}>
                <span style={{ fontFamily: F.display, fontSize: 20, color: "#fff" }}>P21</span>
              </div>
              <h3 style={{ fontFamily: F.display, fontSize: 26, color: T.navy, marginBottom: 8 }}>Fundación PRO-21</h3>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.teal, fontStyle: "italic", marginBottom: 18, letterSpacing: 0.3 }}>Promoviendo el bienestar integral</p>
              <p style={{ fontSize: 15, color: T.body, lineHeight: 1.75 }}>
                Entidad sin fines de lucro constituida formalmente para ampliar el alcance institucional,
                gestionar cooperación nacional e internacional, y desarrollar programas de intervención
                y proyectos de formación innovadores enfocados en la inclusión y el empoderamiento.
              </p>
            </div>
          </Reveal>

          {/* Connector */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div style={{ width: 2, flex: 1, background: `linear-gradient(to bottom, transparent, ${T.gold}, transparent)` }} />
            <div style={{
              width: 44, height: 44, borderRadius: "50%", background: T.cream,
              border: `2px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
            }}>🤝</div>
            <div style={{ width: 2, flex: 1, background: `linear-gradient(to bottom, transparent, ${T.gold}, transparent)` }} />
          </div>

          {/* Lápiz en Mano */}
          <Reveal delay={0.15}>
            <div style={{
              background: T.white, borderRadius: 24, padding: "44px 40px",
              border: `1px solid ${T.border}`, height: "100%",
              transition: "box-shadow 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.06)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 18,
                background: `linear-gradient(135deg, ${T.gold}, ${T.coral})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24, boxShadow: `0 8px 24px ${T.gold}25`,
              }}>
                <span style={{ fontSize: 26 }}>✏️</span>
              </div>
              <h3 style={{ fontFamily: F.display, fontSize: 26, color: T.navy, marginBottom: 8 }}>Centro Lápiz en Mano</h3>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.coral, fontStyle: "italic", marginBottom: 18, letterSpacing: 0.3 }}>Centro de Educación Complementaria</p>
              <p style={{ fontSize: 15, color: T.body, lineHeight: 1.75 }}>
                Centro operativo donde se ejecutan los programas terapéuticos y educativos. Espacio
                físico inclusivo, seguro y especializado donde los niños y niñas reciben atención
                personalizada de un equipo multidisciplinario comprometido con su desarrollo integral.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══ MISSION / VISION / OBJECTIVE ═══ */
function MissionVision() {
  const items = [
    {
      label: "Misión",
      icon: "🎯",
      color: T.blue, bg: T.cloud,
      text: "Ser una institución líder en la promoción del bienestar integral de personas con y sin discapacidad mediante la implementación de programas de intervención y proyectos de formación, fortaleciendo la inclusión, el empoderamiento y la autogestión como pilares de desarrollo humano.",
    },
    {
      label: "Visión",
      icon: "🔭",
      color: T.coral, bg: T.peach,
      text: "Ser referentes a nivel nacional como la principal institución en la promoción del bienestar integral, destacándonos por programas de intervención y proyectos de formación innovadores y efectivos que transformen vidas y construyan una sociedad más justa e inclusiva.",
    },
    {
      label: "Objetivo",
      icon: "🧭",
      color: T.teal, bg: T.mint,
      text: "Implementar programas de intervención y proyectos de formación que atiendan las necesidades específicas de niños, niñas y adolescentes con síndrome de Down, autismo, dificultades de aprendizaje y otras condiciones del neurodesarrollo, promoviendo su desarrollo integral, autonomía e inserción activa en la sociedad.",
    },
  ];

  return (
    <section style={{ padding: "60px 32px 80px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.cloud, borderRadius: 50, padding: "6px 18px",
              marginBottom: 14, border: `1px solid rgba(36,102,168,0.12)`,
            }}>
              <span style={{ fontSize: 13 }}>📌</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.blue, letterSpacing: 1.5, textTransform: "uppercase" }}>Identidad institucional</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px, 4vw, 44px)", color: T.navy }}>
              Lo que nos define
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div style={{
                background: T.white, borderRadius: 24, overflow: "hidden",
                border: `1px solid ${T.border}`, height: "100%",
                display: "flex", flexDirection: "column",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 48px ${item.color}10`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Colored top bar */}
                <div style={{ height: 5, background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }} />

                <div style={{ padding: "36px 32px 36px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, background: item.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, marginBottom: 20,
                  }}>{item.icon}</div>

                  <div style={{
                    fontSize: 11, fontWeight: 700, color: item.color,
                    letterSpacing: 2, textTransform: "uppercase", marginBottom: 12,
                  }}>{item.label}</div>

                  <p style={{ fontSize: 15, color: T.body, lineHeight: 1.75, flex: 1 }}>{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ VALUES ═══ */
function ValuesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{
      padding: "96px 32px",
      background: `linear-gradient(180deg, ${T.warm} 0%, ${T.white} 100%)`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.cream, borderRadius: 50, padding: "6px 18px",
              marginBottom: 14, border: `1px solid rgba(232,168,56,0.15)`,
            }}>
              <span style={{ fontSize: 13 }}>💛</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Nuestros valores</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px, 4vw, 44px)", color: T.navy, marginBottom: 14 }}>
              Los principios que nos guían
            </h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Ocho valores fundamentales que orientan cada decisión, cada terapia y cada interacción con las familias.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {VALUES.map((v, i) => {
            const isHovered = hovered === i;
            return (
              <Reveal key={v.name} delay={i * 0.06}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: 28, borderRadius: 20,
                    background: isHovered ? T.white : T.white,
                    border: `1.5px solid ${isHovered ? v.color : T.border}`,
                    boxShadow: isHovered ? `0 16px 40px ${v.color}15` : "0 2px 8px rgba(0,0,0,0.02)",
                    transform: isHovered ? "translateY(-6px)" : "none",
                    transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
                    cursor: "default", height: "100%",
                    display: "flex", flexDirection: "column",
                  }}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: isHovered ? `linear-gradient(135deg, ${v.color}, ${v.color}cc)` : v.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, marginBottom: 16,
                    transition: "all 0.35s",
                    boxShadow: isHovered ? `0 6px 20px ${v.color}30` : "none",
                  }}>
                    <span style={{
                      filter: isHovered ? "grayscale(0) brightness(1.2)" : "none",
                      transition: "filter 0.3s",
                    }}>{v.icon}</span>
                  </div>

                  <h4 style={{
                    fontFamily: F.display, fontSize: 17, color: T.navy,
                    marginBottom: 8, lineHeight: 1.25,
                  }}>{v.name}</h4>

                  <p style={{
                    fontSize: 13, color: T.muted, lineHeight: 1.65, flex: 1,
                    maxHeight: isHovered ? 200 : 0, overflow: "hidden",
                    opacity: isHovered ? 1 : 0,
                    transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
                  }}>{v.desc}</p>

                  <div style={{
                    width: 32, height: 3, borderRadius: 2,
                    background: isHovered ? v.color : T.border,
                    marginTop: isHovered ? 12 : 14,
                    transition: "all 0.3s",
                  }} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══ TIMELINE ═══ */
function TimelineSection() {
  return (
    <section style={{
      padding: "96px 32px",
      background: `linear-gradient(180deg, ${T.white} 0%, ${T.cloud}44 50%, ${T.offWhite} 100%)`,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.mint, borderRadius: 50, padding: "6px 18px",
              marginBottom: 14, border: `1px solid rgba(26,138,125,0.12)`,
            }}>
              <span style={{ fontSize: 13 }}>📅</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>Nuestra trayectoria</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px, 4vw, 44px)", color: T.navy, marginBottom: 14 }}>
              Cada paso cuenta
            </h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Desde 2021, un camino de crecimiento constante al servicio de la inclusión.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: 3,
            background: `linear-gradient(to bottom, ${T.gold}00, ${T.gold}, ${T.gold}, ${T.gold}00)`,
            transform: "translateX(-50%)",
            borderRadius: 2,
          }} />

          {TIMELINE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 1fr",
                  marginBottom: i < TIMELINE.length - 1 ? 32 : 0,
                  alignItems: "center",
                }}>
                  {/* Left content or spacer */}
                  <div style={{ paddingRight: isLeft ? 28 : 0 }}>
                    {isLeft && <TimelineCard item={item} align="right" />}
                  </div>

                  {/* Center dot */}
                  <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: T.white, border: `3px solid ${item.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, zIndex: 2, position: "relative",
                      boxShadow: `0 4px 16px ${item.color}20`,
                      transition: "transform 0.3s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Right content or spacer */}
                  <div style={{ paddingLeft: isLeft ? 0 : 28 }}>
                    {!isLeft && <TimelineCard item={item} align="left" />}
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

function TimelineCard({ item, align }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.white, borderRadius: 20, padding: "28px 28px",
        border: `1.5px solid ${hov ? item.color : T.border}`,
        boxShadow: hov ? `0 12px 36px ${item.color}12` : "0 2px 8px rgba(0,0,0,0.03)",
        transform: hov ? "translateY(-3px)" : "none",
        transition: "all 0.3s cubic-bezier(.16,1,.3,1)",
        textAlign: align,
      }}
    >
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: `${item.color}10`, borderRadius: 50, padding: "4px 14px",
        marginBottom: 12,
      }}>
        <span style={{ fontFamily: F.display, fontSize: 15, color: item.color }}>{item.year}</span>
      </div>
      <h4 style={{ fontFamily: F.display, fontSize: 19, color: T.navy, marginBottom: 8, lineHeight: 1.25 }}>
        {item.title}
      </h4>
      <p style={{ fontSize: 13.5, color: T.body, lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
}

/* ═══ TEAM TEASER ═══ */
function TeamTeaser() {
  const roles = [
    { title: "Terapia de lenguaje", icon: "🗣️", bg: T.cloud },
    { title: "Fisioterapia", icon: "🦿", bg: T.mint },
    { title: "Psicomotricidad", icon: "🤸", bg: T.cream },
    { title: "Psicología", icon: "🧠", bg: T.lavender },
    { title: "Trabajo social", icon: "🤝", bg: T.peach },
    { title: "Pedagogía", icon: "📖", bg: T.leaf },
  ];

  return (
    <section style={{
      padding: "96px 32px", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 50%, #1a4a7a 100%)`,
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "5%", right: "8%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,56,0.05), transparent 70%)" }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.07)", borderRadius: 50, padding: "6px 18px",
              marginBottom: 14, border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <span style={{ fontSize: 13 }}>👩‍⚕️</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.honey, letterSpacing: 1.5, textTransform: "uppercase" }}>Nuestro equipo</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 3.5vw, 42px)", color: "#fff", marginBottom: 14 }}>
              Profesionales comprometidos
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Un equipo multidisciplinario de más de 20 profesionales dedicados al desarrollo integral de cada niño y su familia.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div style={{
                padding: "28px 16px", borderRadius: 20, textAlign: "center",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(4px)",
                transition: "all 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: 14, background: r.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, margin: "0 auto 14px",
                }}>{r.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)", lineHeight: 1.3 }}>{r.title}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="#equipo" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 50, textDecoration: "none",
              background: T.gold, color: T.navy, fontWeight: 700, fontSize: 14,
              boxShadow: `0 6px 24px ${T.gold}30`,
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 10px 32px ${T.gold}40`; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 6px 24px ${T.gold}30`; }}
            >Conoce al equipo completo →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ CTA BANNER ═══ */
function CtaBanner() {
  return (
    <section style={{ padding: "80px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            borderRadius: 28, overflow: "hidden", position: "relative",
            background: `linear-gradient(135deg, ${T.cream}, ${T.cloud})`,
            border: `1px solid ${T.border}`,
            padding: "56px 48px", textAlign: "center",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40, width: 200, height: 200,
              borderRadius: "50%", background: `radial-gradient(circle, ${T.gold}15, transparent 70%)`,
            }} />
            <div style={{
              position: "absolute", bottom: -30, left: -30, width: 160, height: 160,
              borderRadius: "50%", background: `radial-gradient(circle, ${T.blue}10, transparent 70%)`,
            }} />

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>💛</div>
              <h3 style={{ fontFamily: F.display, fontSize: 32, color: T.navy, marginBottom: 14 }}>
                ¿Quieres ser parte de esta historia?
              </h3>
              <p style={{ fontSize: 16, color: T.body, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 28px" }}>
                Tu apoyo transforma vidas. Dona, sé voluntario o conviértete en aliado de la inclusión.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#colabora" style={{
                  padding: "14px 36px", borderRadius: 50, fontWeight: 700, fontSize: 15,
                  background: T.gold, color: T.navy, textDecoration: "none",
                  boxShadow: `0 6px 24px ${T.gold}30`,
                  transition: "all 0.25s",
                }}
                  onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.target.style.transform = "none"}
                >Colaborar ahora</a>
                <a href="#contacto" style={{
                  padding: "14px 36px", borderRadius: 50, fontWeight: 600, fontSize: 15,
                  border: `2px solid ${T.navy}30`, color: T.navy, textDecoration: "none",
                  transition: "all 0.25s",
                }}
                  onMouseEnter={e => { e.target.style.borderColor = T.navy; e.target.style.background = `${T.navy}08`; }}
                  onMouseLeave={e => { e.target.style.borderColor = `${T.navy}30`; e.target.style.background = "transparent"; }}
                >Contactar</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN EXPORT ═══ */
export default function NosotrosPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <PageHero />
      <Identity />
      <MissionVision />
      <ValuesSection />
      <TimelineSection />
      <TeamTeaser />
      <CtaBanner />
    </div>
  );
}
