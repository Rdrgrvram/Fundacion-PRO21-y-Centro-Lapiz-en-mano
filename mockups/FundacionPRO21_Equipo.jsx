import { useState, useEffect, useRef } from "react";

const T = {
  navy: "#0c2340", deep: "#142d4c", blue: "#2466a8", sky: "#4a9eed",
  cloud: "#e8f1fa", gold: "#e8a838", honey: "#f5c242", cream: "#fdf6e3",
  teal: "#1a8a7d", mint: "#e0f5f0", coral: "#e86840", peach: "#fef0e8",
  green: "#2d8a4e", leaf: "#e5f5eb", white: "#ffffff", offWhite: "#fafbfd",
  warm: "#f7f5f0", text: "#1a1a2e", body: "#3d4152", muted: "#6b7084",
  border: "#e4e6ec", purple: "#6c5ce7", lavender: "#f0edff",
  rose: "#e84393", roseBg: "#fdf2f8",
};
const F = {
  display: "'DM Serif Display', Georgia, serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
};

function useReveal(th = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: th });
    o.observe(el); return () => o.disconnect();
  }, [th]);
  return [ref, v];
}
function Reveal({ children, delay = 0, y = 44, style = {} }) {
  const [ref, vis] = useReveal();
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : `translateY(${y}px)`, transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`, ...style }}>{children}</div>;
}

/* ═══ DATA ═══ */
const AREAS = [
  {
    id: "fisio", name: "Fisioterapia", icon: "💪", color: T.blue, bg: T.cloud,
    desc: "Intervención desde la estimulación temprana para mejorar el tono muscular, la postura y la movilidad, adaptando ejercicios a cada etapa de desarrollo.",
    skills: ["Estimulación temprana motora", "Rehabilitación neuromuscular", "Hidroterapia", "Técnicas de posicionamiento"],
    programs: ["Mi Escuelita Down", "Aula Wawitas"],
    members: [
      { name: "Profesional 1", role: "Lic. Fisioterapia y Kinesiología" },
      { name: "Profesional 2", role: "Lic. Fisioterapia Pediátrica" },
    ],
  },
  {
    id: "psicomotricidad", name: "Psicomotricidad", icon: "🤸", color: T.coral, bg: T.peach,
    desc: "Fortalecimiento de la coordinación, equilibrio y esquema corporal para favorecer la autonomía, la concentración y la expresión corporal.",
    skills: ["Coordinación motora gruesa y fina", "Esquema corporal", "Integración bilateral", "Equilibrio dinámico y estático"],
    programs: ["Mi Escuelita Down", "Aula Wawitas"],
    members: [
      { name: "Profesional 3", role: "Lic. Psicomotricidad" },
    ],
  },
  {
    id: "lenguaje", name: "Terapia de lenguaje", icon: "🗣️", color: T.teal, bg: T.mint,
    desc: "Trabajo en respiración, control orofacial y articulación de sonidos para mejorar la comunicación y el habla de forma divertida y funcional.",
    skills: ["Control orofacial", "Articulación fonética", "Comunicación aumentativa", "Desarrollo del lenguaje expresivo y comprensivo"],
    programs: ["Mi Escuelita Down", "Aula Wawitas", "Pasos Firmes"],
    members: [
      { name: "Profesional 4", role: "Lic. Fonoaudiología" },
      { name: "Profesional 5", role: "Lic. Terapia de Lenguaje" },
    ],
  },
  {
    id: "conducta", name: "Terapia de conducta", icon: "🧠", color: T.purple, bg: T.lavender,
    desc: "Acompañamiento en el desarrollo de habilidades sociales, autorregulación y rutinas positivas dentro del entorno familiar y escolar.",
    skills: ["Análisis conductual aplicado", "Habilidades sociales", "Autorregulación emocional", "Modificación de conducta"],
    programs: ["Mi Escuelita Down", "Aula Wawitas"],
    members: [
      { name: "Profesional 6", role: "Lic. Psicología Clínica" },
      { name: "Profesional 7", role: "Lic. Psicología Infantil" },
    ],
  },
  {
    id: "neurocog", name: "Estimulación neuro-cognitiva", icon: "🧩", color: T.gold, bg: T.cream,
    desc: "Intervención orientada a potenciar las funciones cognitivas: lenguaje, atención, memoria y habilidades de aprendizaje, desde un enfoque integral y personalizado.",
    skills: ["Funciones ejecutivas", "Memoria de trabajo", "Atención sostenida", "Razonamiento lógico"],
    programs: ["Mi Escuelita Down", "Aula Wawitas", "Pasos Firmes"],
    members: [
      { name: "Profesional 8", role: "Lic. Neuropsicología" },
      { name: "Profesional 9", role: "Lic. Psicopedagogía" },
    ],
  },
  {
    id: "pedagogia", name: "Pedagogía y apoyo escolar", icon: "📖", color: T.green, bg: T.leaf,
    desc: "Adaptaciones curriculares según las capacidades y ritmo de cada niño, promoviendo el aprendizaje significativo y la inclusión educativa.",
    skills: ["Adaptaciones curriculares", "Técnicas de estudio", "Lectoescritura adaptada", "Evaluación psicopedagógica"],
    programs: ["Mi Escuelita Down", "Pasos Firmes"],
    members: [
      { name: "Profesional 10", role: "Lic. Ciencias de la Educación" },
      { name: "Profesional 11", role: "Lic. Educación Especial" },
      { name: "Profesional 12", role: "Lic. Psicopedagogía" },
    ],
  },
  {
    id: "social", name: "Trabajo social y psicología", icon: "🤝", color: T.rose, bg: T.roseBg,
    desc: "Orientación y contención emocional para las familias, con atención personalizada desde las áreas de Trabajo Social y Psicología.",
    skills: ["Evaluación familiar", "Contención emocional", "Orientación a padres", "Gestión de redes de apoyo"],
    programs: ["Mi Escuelita Down", "Aula Wawitas", "Pasos Firmes"],
    members: [
      { name: "Profesional 13", role: "Lic. Trabajo Social" },
      { name: "Profesional 14", role: "Lic. Psicología Familiar" },
    ],
  },
  {
    id: "nutricion", name: "Orientación nutricional", icon: "🥗", color: T.teal, bg: T.mint,
    desc: "Asesoramiento alimentario considerando necesidades nutricionales específicas y selectividad alimentaria frecuente en el neurodesarrollo.",
    skills: ["Nutrición pediátrica", "Selectividad alimentaria", "Planes alimentarios adaptados", "Suplementación"],
    programs: ["Aula Wawitas"],
    members: [
      { name: "Profesional 15", role: "Lic. Nutrición y Dietética" },
    ],
  },
];

const STATS = [
  { n: "20+", l: "Profesionales", icon: "👩‍⚕️", color: T.blue },
  { n: "8", l: "Áreas de especialidad", icon: "🏥", color: T.coral },
  { n: "3", l: "Programas atendidos", icon: "📋", color: T.green },
  { n: "100%", l: "Dedicación al niño", icon: "💛", color: T.gold },
];

/* ═══ PAGE HERO ═══ */
function PageHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 480, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 45%, #1a4a7a 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes orbit{0%{transform:rotate(0deg) translateX(140px) rotate(0deg)}100%{transform:rotate(360deg) translateX(140px) rotate(-360deg)}}
        @keyframes orbit-reverse{0%{transform:rotate(0deg) translateX(100px) rotate(0deg)}100%{transform:rotate(-360deg) translateX(100px) rotate(360deg)}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Orbiting icons representing multidisciplinary team */}
        <div style={{ position: "absolute", top: "50%", right: "12%", width: 0, height: 0 }}>
          {["💪", "🗣️", "🧠", "🤸", "📖", "🤝"].map((e, i) => (
            <div key={i} style={{
              position: "absolute",
              animation: `orbit ${20 + i * 3}s linear infinite`,
              animationDelay: `${i * -3.3}s`,
              opacity: 0.15,
            }}>
              <span style={{ fontSize: 24 }}>{e}</span>
            </div>
          ))}
          {["🧩", "🥗", "👶"].map((e, i) => (
            <div key={`r${i}`} style={{
              position: "absolute",
              animation: `orbit-reverse ${18 + i * 4}s linear infinite`,
              animationDelay: `${i * -4}s`,
              opacity: 0.1,
            }}>
              <span style={{ fontSize: 20 }}>{e}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 45C360 15 720 65 1080 35C1260 20 1380 30 1440 28V80H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "130px 32px 90px", textAlign: "center", position: "relative", zIndex: 3 }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .15s" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.07)", borderRadius: 50, padding: "6px 18px 6px 10px",
            marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✦</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500 }}>Nuestro equipo</span>
          </div>
        </div>

        <h1 style={{
          fontFamily: F.display, fontSize: "clamp(36px,5vw,54px)", color: "#fff", lineHeight: 1.1, marginBottom: 18,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
          transition: "all .8s cubic-bezier(.16,1,.3,1) .25s",
        }}>
          Profesionales con{" "}
          <span style={{ fontStyle: "italic", color: T.honey }}>vocación</span>
        </h1>

        <p style={{
          fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: 580, margin: "0 auto",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all .8s cubic-bezier(.16,1,.3,1) .4s",
        }}>
          Un equipo multidisciplinario que trabaja de forma coordinada,
          poniendo al niño y su familia en el centro de cada intervención.
        </p>
      </div>
    </section>
  );
}

/* ═══ STATS BAR ═══ */
function StatsBar() {
  return (
    <section style={{ background: T.offWhite, padding: "48px 32px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{
              textAlign: "center", padding: "28px 16px", borderRadius: 20,
              background: T.white, border: `1px solid ${T.border}`,
              transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${s.color}10`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: F.display, fontSize: 34, color: s.color, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: T.muted, marginTop: 6, fontWeight: 500 }}>{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══ PHILOSOPHY ═══ */
function Philosophy() {
  const pillars = [
    { icon: "🔄", title: "Trabajo coordinado", desc: "Todas las áreas comparten información y diseñan planes conjuntos para cada niño, evitando intervenciones aisladas." },
    { icon: "👁️", title: "Mirada integral", desc: "No tratamos síntomas: acompañamos a una persona completa en todas sus dimensiones — física, cognitiva, emocional y social." },
    { icon: "👨‍👩‍👧", title: "Familia como aliada", desc: "Los padres y madres no son espectadores: son parte activa del proceso terapéutico, con formación y acompañamiento permanente." },
    { icon: "📊", title: "Evaluación continua", desc: "Cada plan de intervención se revisa y ajusta periódicamente según los avances y necesidades cambiantes del niño." },
  ];

  return (
    <section style={{ padding: "64px 32px 80px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.cream, borderRadius: 50, padding: "6px 18px",
              marginBottom: 14, border: `1px solid rgba(232,168,56,0.15)`,
            }}>
              <span style={{ fontSize: 13 }}>🩺</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Filosofía de trabajo</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>
              ¿Qué significa ser multidisciplinario?
            </h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              No es solo tener muchas especialidades bajo un mismo techo. Es un equipo que piensa, planifica y actúa como uno solo.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div style={{
                background: T.white, borderRadius: 22, padding: "32px 24px",
                border: `1px solid ${T.border}`, height: "100%",
                transition: "all 0.3s", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                <h4 style={{ fontFamily: F.display, fontSize: 18, color: T.navy, marginBottom: 10, lineHeight: 1.25 }}>{p.title}</h4>
                <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ AREAS GRID ═══ */
function AreasGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <section style={{ padding: "80px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.cloud, borderRadius: 50, padding: "6px 18px",
              marginBottom: 14, border: `1px solid rgba(36,102,168,0.12)`,
            }}>
              <span style={{ fontSize: 13 }}>🏥</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.blue, letterSpacing: 1.5, textTransform: "uppercase" }}>Áreas de especialidad</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>
              8 áreas al servicio de cada niño
            </h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Cada área aporta su mirada especializada. Juntas, construyen un plan de intervención completo y coherente.
            </p>
          </div>
        </Reveal>

        {/* Area cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {AREAS.map((a, i) => {
            const isSel = selected === i;
            return (
              <Reveal key={a.id} delay={i * 0.05}>
                <div
                  onClick={() => setSelected(isSel ? null : i)}
                  style={{
                    background: T.white, borderRadius: 20, overflow: "hidden",
                    border: `2px solid ${isSel ? a.color : T.border}`,
                    boxShadow: isSel ? `0 16px 40px ${a.color}15` : "0 2px 8px rgba(0,0,0,0.02)",
                    transform: isSel ? "translateY(-6px)" : "none",
                    transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
                    cursor: "pointer",
                  }}
                >
                  {/* Top color bar */}
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${a.color}, ${a.color}88)` }} />

                  <div style={{ padding: "24px 20px" }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 15,
                      background: isSel ? `linear-gradient(135deg, ${a.color}, ${a.color}cc)` : a.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 24, marginBottom: 16,
                      boxShadow: isSel ? `0 6px 20px ${a.color}25` : "none",
                      transition: "all 0.35s",
                    }}>{a.icon}</div>
                    <h4 style={{ fontFamily: F.display, fontSize: 16, color: T.navy, marginBottom: 6, lineHeight: 1.25 }}>{a.name}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                      {a.programs.map(pr => (
                        <span key={pr} style={{
                          fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 50,
                          background: a.bg, color: a.color,
                        }}>{pr}</span>
                      ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600, color: a.color,
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                        {isSel ? "Cerrar" : "Ver detalle"}
                        <span style={{
                          display: "inline-block",
                          transform: isSel ? "rotate(180deg)" : "none",
                          transition: "transform 0.3s",
                        }}>▾</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        {selected !== null && (
          <Reveal y={20}>
            <AreaDetail area={AREAS[selected]} onClose={() => setSelected(null)} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

function AreaDetail({ area: a, onClose }) {
  return (
    <div style={{
      background: T.white, borderRadius: 24, overflow: "hidden",
      border: `2px solid ${a.color}25`, boxShadow: `0 16px 48px ${a.color}10`,
      animation: "fadeSlideUp 0.4s cubic-bezier(.16,1,.3,1)",
    }}>
      <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }`}</style>

      {/* Header */}
      <div style={{
        padding: "32px 36px", display: "flex", alignItems: "flex-start", gap: 24,
        background: `linear-gradient(135deg, ${a.bg}, ${T.white})`,
        borderBottom: `1px solid ${a.color}12`,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: `linear-gradient(135deg, ${a.color}, ${a.color}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, flexShrink: 0,
          boxShadow: `0 8px 24px ${a.color}25`,
        }}>{a.icon}</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: F.display, fontSize: 26, color: T.navy, marginBottom: 6 }}>{a.name}</h3>
          <p style={{ fontSize: 15, color: T.body, lineHeight: 1.7 }}>{a.desc}</p>
        </div>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: "50%", border: `1px solid ${T.border}`,
          background: T.white, cursor: "pointer", fontSize: 16, color: T.muted,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = T.offWhite; e.currentTarget.style.color = T.text; }}
          onMouseLeave={e => { e.currentTarget.style.background = T.white; e.currentTarget.style.color = T.muted; }}
        >✕</button>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 36px 36px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
        {/* Competencies */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Competencias clave</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {a.skills.map(sk => (
              <div key={sk} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 12,
                background: a.bg, fontSize: 13, color: T.body, fontWeight: 500,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
                {sk}
              </div>
            ))}
          </div>
        </div>

        {/* Team members */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Equipo del área</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {a.members.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(135deg, ${a.bg}, ${T.offWhite})`,
                  border: `1px solid ${a.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: F.display, fontSize: 16, color: a.color,
                }}>
                  {m.name.split(" ").pop()}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.navy }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: T.muted }}>{m.role}</div>
                </div>
              </div>
            ))}
            <div style={{
              padding: "10px 14px", borderRadius: 12, background: T.offWhite,
              border: `1px dashed ${T.border}`, fontSize: 12, color: T.muted,
              textAlign: "center", fontStyle: "italic",
            }}>
              Perfiles completos próximamente
            </div>
          </div>
        </div>

        {/* Programs served */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Presente en</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {a.programs.map(pr => {
              const progData = {
                "Mi Escuelita Down": { emoji: "🌟", color: T.blue, bg: T.cloud },
                "Aula Wawitas": { emoji: "🧩", color: T.coral, bg: T.peach },
                "Pasos Firmes": { emoji: "📚", color: T.green, bg: T.leaf },
              }[pr];
              return (
                <div key={pr} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px", borderRadius: 14,
                  background: progData.bg, border: `1px solid ${progData.color}15`,
                }}>
                  <span style={{ fontSize: 20 }}>{progData.emoji}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.navy }}>{pr}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Equipo del área</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "14px 16px", borderRadius: 14, background: T.offWhite,
            }}>
              <div style={{
                fontFamily: F.display, fontSize: 28, color: a.color, lineHeight: 1,
              }}>{a.members.length}</div>
              <div style={{ fontSize: 13, color: T.body }}>
                {a.members.length === 1 ? "profesional" : "profesionales"} dedicados
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ ORG VISUAL ═══ */
function OrgVisual() {
  return (
    <section style={{ padding: "80px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.mint, borderRadius: 50, padding: "6px 18px",
              marginBottom: 14, border: `1px solid rgba(26,138,125,0.12)`,
            }}>
              <span style={{ fontSize: 13 }}>🔗</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>Trabajo en red</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,40px)", color: T.navy, marginBottom: 14 }}>
              El niño en el centro de todo
            </h2>
            <p style={{ fontSize: 16, color: T.body, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Cada profesional aporta su especialidad, pero todos miran hacia el mismo punto: el bienestar integral del niño y su familia.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ position: "relative", width: 500, height: 500, margin: "0 auto" }}>
            {/* Center */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: 120, height: 120, borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.gold}, ${T.honey})`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: `0 8px 32px ${T.gold}35`,
              zIndex: 3,
            }}>
              <span style={{ fontSize: 28, marginBottom: 2 }}>👧</span>
              <span style={{ fontFamily: F.display, fontSize: 12, color: T.navy, textAlign: "center" }}>El niño y<br/>su familia</span>
            </div>

            {/* Connecting rings */}
            {[180, 130].map((r, ri) => (
              <div key={ri} style={{
                position: "absolute", top: "50%", left: "50%",
                width: r * 2, height: r * 2, borderRadius: "50%",
                border: `1.5px dashed ${ri === 0 ? T.border : `${T.gold}30`}`,
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }} />
            ))}

            {/* Area nodes around the center */}
            {AREAS.map((a, i) => {
              const angle = (i * 360) / AREAS.length - 90;
              const rad = (angle * Math.PI) / 180;
              const radius = 185;
              const x = 250 + radius * Math.cos(rad);
              const y = 250 + radius * Math.sin(rad);
              return (
                <div key={a.id} style={{
                  position: "absolute", left: x - 34, top: y - 34,
                  width: 68, height: 68, borderRadius: 18,
                  background: T.white, border: `2px solid ${a.color}30`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 4px 16px ${a.color}10`,
                  cursor: "default", zIndex: 2,
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.boxShadow = `0 8px 24px ${a.color}20`; e.currentTarget.style.zIndex = "5"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${a.color}30`; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 4px 16px ${a.color}10`; e.currentTarget.style.zIndex = "2"; }}
                  title={a.name}
                >
                  <span style={{ fontSize: 22 }}>{a.icon}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: T.muted, marginTop: 2, textAlign: "center", lineHeight: 1.1, maxWidth: 58, overflow: "hidden" }}>
                    {a.name.length > 14 ? a.name.split(" ")[0] : a.name}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ JOIN TEAM CTA ═══ */
function JoinCta() {
  return (
    <section style={{
      padding: "80px 32px",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 100%)`,
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            background: "rgba(255,255,255,0.04)", borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "56px 48px", textAlign: "center",
          }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>🩺</div>
            <h3 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,36px)", color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
              ¿Eres profesional en estas áreas?
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
              Buscamos fisioterapeutas, psicólogos, fonoaudiólogos, terapeutas ocupacionales y pedagogos
              que quieran poner su conocimiento al servicio de la inclusión.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#contacto" style={{
                padding: "15px 36px", borderRadius: 50, fontWeight: 700, fontSize: 15,
                background: T.gold, color: T.navy, textDecoration: "none",
                boxShadow: `0 6px 24px ${T.gold}30`, transition: "all 0.25s",
              }}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "none"}
              >Únete al equipo</a>
              <a href="#voluntariado" style={{
                padding: "15px 36px", borderRadius: 50, fontWeight: 600, fontSize: 15,
                border: "2px solid rgba(255,255,255,0.2)", color: "#fff",
                textDecoration: "none", transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.5)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; }}
              >Voluntariado profesional</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function EquipoPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <PageHero />
      <StatsBar />
      <Philosophy />
      <AreasGrid />
      <OrgVisual />
      <JoinCta />
    </div>
  );
}
