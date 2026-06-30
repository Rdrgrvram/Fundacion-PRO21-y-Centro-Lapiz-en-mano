import { useState, useEffect, useRef } from "react";

const T = {
  navy: "#0c2340", deep: "#142d4c", blue: "#2466a8", sky: "#4a9eed",
  cloud: "#e8f1fa", gold: "#e8a838", honey: "#f5c242", cream: "#fdf6e3",
  teal: "#1a8a7d", mint: "#e0f5f0", coral: "#e86840", peach: "#fef0e8",
  green: "#2d8a4e", leaf: "#e5f5eb", white: "#ffffff", offWhite: "#fafbfd",
  warm: "#f7f5f0", text: "#1a1a2e", body: "#3d4152", muted: "#6b7084",
  border: "#e4e6ec",
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
const PROGRAMS = [
  {
    id: "escuelita", emoji: "🌟",
    name: "Mi Escuelita Inclusiva Down",
    slogan: "Creciendo sin límites",
    color: T.blue, light: T.cloud, accent: "#1d5a96",
    heroGradient: `linear-gradient(155deg, #0c2340 0%, #1d5a96 50%, #2466a8 100%)`,
    target: "Niños, niñas y adolescentes con síndrome de Down (Trisomía 21)",
    desc: "Programa integral que acompaña a las familias desde la estimulación temprana hasta la inserción laboral. Potenciamos las habilidades de cada niño y niña, fortalecemos su autonomía y promovemos una inclusión plena en todos los ámbitos de la vida.",
    approach: "Intervenciones personalizadas y actividades grupales acordes a las líneas del desarrollo infantil, respetando el ritmo y las características de cada niño. Los estudiantes asisten tanto al Centro Lápiz en Mano como a su unidad educativa de origen, fortaleciendo su proceso de inclusión en el sistema educativo regular.",
    levels: [
      { age: "0 – 2 años", name: "Manos Chiquitas", icon: "🍼", desc: "Estimulación temprana integral. Trabajo con la familia como eje central del desarrollo desde los primeros meses de vida." },
      { age: "3 – 7 años", name: "Aventuras sin Límites", icon: "🎨", desc: "Desarrollo de habilidades sociales, motoras y cognitivas a través del juego, el arte y actividades lúdicas estructuradas." },
      { age: "8 – 14 años", name: "Oportunidades para Todos", icon: "📖", desc: "Fortalecimiento académico, habilidades de autonomía personal y preparación para la vida independiente." },
      { age: "15+ años", name: "Programa Crecer", icon: "🌱", desc: "Formación pre-laboral e inserción en el mundo del trabajo. Desarrollo de competencias para la vida adulta autónoma." },
    ],
    services: [
      { name: "Estimulación temprana", icon: "👶", desc: "Intervención desde los primeros meses para potenciar el desarrollo neuromotor y sensorial." },
      { name: "Terapia de lenguaje", icon: "🗣️", desc: "Trabajo en respiración, control orofacial y articulación para mejorar la comunicación funcional." },
      { name: "Psicomotricidad", icon: "🤸", desc: "Fortalecimiento de coordinación, equilibrio y esquema corporal para favorecer la autonomía." },
      { name: "Fisioterapia", icon: "💪", desc: "Mejora del tono muscular, postura y movilidad adaptando ejercicios a cada etapa de desarrollo." },
      { name: "Terapia de conducta", icon: "🧠", desc: "Desarrollo de habilidades sociales, autorregulación y rutinas positivas." },
      { name: "Estimulación neuro-cognitiva", icon: "🧩", desc: "Potenciación de funciones cognitivas: lenguaje, atención, memoria y aprendizaje." },
      { name: "Apoyo pedagógico", icon: "📝", desc: "Adaptaciones curriculares según capacidades y ritmo de cada niño. Libreta del sistema regular." },
      { name: "Orientación familiar", icon: "👨‍👩‍👧", desc: "Acompañamiento a padres y madres con sesiones virtuales gratuitas y red de apoyo." },
    ],
  },
  {
    id: "wawitas", emoji: "🧩",
    name: "Aula Wawitas",
    slogan: "Comprender, acompañar y potenciar",
    color: T.coral, light: T.peach, accent: "#c4542e",
    heroGradient: `linear-gradient(155deg, #3d1008 0%, #c4542e 50%, #e86840 100%)`,
    target: "Niños y niñas con autismo (TEA) y otras condiciones del neurodesarrollo",
    desc: "Programa especializado en la atención temprana e integral de niños con Trastorno del Espectro Autista y otras condiciones del neurodesarrollo. Cada intervención se diseña a partir de las características individuales, respetando la singularidad de cada niño.",
    approach: "Enfoque multidisciplinario centrado en la detección temprana y la intervención oportuna. Combinamos terapias individuales con actividades grupales en espacios sensorialmente adaptados, favoreciendo la comunicación, la interacción social y la regulación emocional.",
    levels: [],
    services: [
      { name: "Detección temprana", icon: "🔍", desc: "Evaluación integral para identificar señales de alerta lo antes posible e iniciar intervención oportuna." },
      { name: "Evaluación multidisciplinaria", icon: "📋", desc: "Diagnóstico completo por un equipo de profesionales para diseñar un plan de intervención personalizado." },
      { name: "Terapia conductual", icon: "🧠", desc: "Estrategias basadas en evidencia para desarrollar conductas adaptativas y reducir comportamientos desafiantes." },
      { name: "Terapia de lenguaje", icon: "🗣️", desc: "Desarrollo de habilidades comunicativas verbales y no verbales, incluyendo sistemas aumentativos." },
      { name: "Psicomotricidad", icon: "🤸", desc: "Trabajo corporal para mejorar la coordinación, el equilibrio y la percepción espacial." },
      { name: "Fisioterapia", icon: "💪", desc: "Intervención motora adaptada a las necesidades sensoriales y motrices de cada niño." },
      { name: "Integración sensorial", icon: "🎯", desc: "Regulación de la respuesta a estímulos sensoriales para mejorar la participación en actividades cotidianas." },
      { name: "Orientación nutricional", icon: "🥗", desc: "Asesoramiento alimentario considerando selectividad alimentaria y necesidades nutricionales específicas." },
      { name: "Acompañamiento familiar", icon: "👨‍👩‍👧", desc: "Formación y contención emocional para las familias, con estrategias para el hogar y la escuela." },
    ],
  },
  {
    id: "pasos", emoji: "📚",
    name: "Pasos Firmes",
    slogan: "Aprender también puede ser diferente",
    color: T.green, light: T.leaf, accent: "#1e6b38",
    heroGradient: `linear-gradient(155deg, #0a2e16 0%, #1e6b38 50%, #2d8a4e 100%)`,
    target: "Niños y niñas con dificultades de aprendizaje, atención y desempeño escolar",
    desc: "Programa dirigido a niños y niñas que presentan dificultades en el aprendizaje, la atención o el desempeño escolar. Identificamos las necesidades específicas de cada estudiante y desarrollamos estrategias terapéuticas y pedagógicas personalizadas para que descubran su propia forma de aprender.",
    approach: "Evaluación neuropsicológica inicial para identificar el perfil de aprendizaje, seguida de un plan de intervención que combina apoyo psicopedagógico, técnicas de estudio adaptadas y acompañamiento emocional. Trabajamos en coordinación con la escuela y la familia.",
    levels: [],
    services: [
      { name: "Dificultades de lectura y escritura", icon: "📖", desc: "Intervención especializada en dislexia, disgrafía y otros trastornos del lenguaje escrito." },
      { name: "Atención y concentración", icon: "🎯", desc: "Estrategias para TDAH y dificultades atencionales que mejoran el enfoque y la organización." },
      { name: "Razonamiento cognitivo", icon: "🧮", desc: "Desarrollo del pensamiento lógico-matemático y resolución de problemas. Discalculia y razonamiento abstracto." },
      { name: "Maduración neuropsicológica", icon: "🧠", desc: "Evaluación y estimulación de funciones ejecutivas, memoria de trabajo y velocidad de procesamiento." },
      { name: "Apoyo psicopedagógico", icon: "📝", desc: "Adaptaciones metodológicas y estrategias de enseñanza individualizadas según el perfil de aprendizaje." },
      { name: "Técnicas de estudio", icon: "📐", desc: "Herramientas prácticas para organizar, comprender y retener información de forma eficiente." },
      { name: "Orientación familiar y escolar", icon: "👨‍👩‍👧", desc: "Coordinación entre familia, escuela y equipo terapéutico para un abordaje integral y coherente." },
    ],
  },
];

/* ═══ PAGE HERO ═══ */
function PageHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 480, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 50%, ${T.blue} 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes expand-line{from{transform:scaleX(0)}to{transform:scaleX(1)}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-8%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,168,56,0.05),transparent 70%)" }} />
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 35C320 70 640 10 960 45C1200 65 1360 50 1440 48V80H0Z" fill={T.offWhite} />
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
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500 }}>Nuestros programas</span>
          </div>
        </div>

        <h1 style={{
          fontFamily: F.display, fontSize: "clamp(36px,5vw,54px)", color: "#fff", lineHeight: 1.1, marginBottom: 18,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
          transition: "all .8s cubic-bezier(.16,1,.3,1) .25s",
        }}>
          Tres caminos,{" "}
          <span style={{ fontStyle: "italic", color: T.honey }}>un propósito</span>
        </h1>

        <p style={{
          fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all .8s cubic-bezier(.16,1,.3,1) .4s",
        }}>
          Cada niño aprende, crece y brilla a su manera. Nuestros tres programas
          están diseñados para acompañar ese camino único con profesionalismo y amor.
        </p>
      </div>
    </section>
  );
}

/* ═══ QUICK NAV ═══ */
function QuickNav() {
  return (
    <section style={{ padding: "0 32px", background: T.offWhite, marginTop: -1 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", transform: "translateY(-36px)" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
          background: T.white, borderRadius: 20, padding: 8,
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)", border: `1px solid ${T.border}`,
        }}>
          {PROGRAMS.map((p) => (
            <a key={p.id} href={`#${p.id}`} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "18px 20px", borderRadius: 14, textDecoration: "none",
              transition: "all 0.25s", background: "transparent",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = p.light; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `linear-gradient(135deg, ${p.color}, ${p.accent})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
                boxShadow: `0 4px 12px ${p.color}25`,
              }}>{p.emoji}</div>
              <div>
                <div style={{ fontFamily: F.display, fontSize: 15, color: T.navy, lineHeight: 1.2 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: T.muted, fontWeight: 500, marginTop: 2 }}>{p.services.length} servicios</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PROGRAM SECTION (full immersive) ═══ */
function ProgramSection({ program: p, index }) {
  const [expandedService, setExpandedService] = useState(null);
  const isEven = index % 2 === 0;

  return (
    <section id={p.id} style={{ padding: "80px 0 0", background: T.offWhite }}>
      {/* Program header band */}
      <Reveal>
        <div style={{
          background: p.heroGradient,
          padding: "64px 32px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
            <div style={{ position: "absolute", bottom: "-20%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle,rgba(255,255,255,0.03),transparent 70%)` }} />
          </div>

          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
            <div style={{ order: isEven ? 0 : 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.1)", borderRadius: 50, padding: "5px 16px 5px 8px",
                marginBottom: 20, border: "1px solid rgba(255,255,255,0.1)",
              }}>
                <span style={{ fontSize: 18 }}>{p.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: 0.5 }}>Programa {index + 1} de 3</span>
              </div>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>{p.name}</h2>
              <p style={{ fontFamily: F.display, fontSize: 18, color: "rgba(255,255,255,0.6)", fontStyle: "italic", marginBottom: 20 }}>"{p.slogan}"</p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 480 }}>{p.desc}</p>
            </div>

            <div style={{ order: isEven ? 1 : 0 }}>
              <div style={{
                aspectRatio: "4/3", borderRadius: 24,
                background: `linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`,
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}>
                <div style={{ textAlign: "center", padding: 32 }}>
                  <div style={{ fontSize: 56, marginBottom: 12 }}>{p.emoji}</div>
                  <p style={{ fontFamily: F.display, fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Fotografías del programa</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{p.target}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Content area */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 32px 80px" }}>

        {/* Approach */}
        <Reveal>
          <div style={{
            background: p.light, borderRadius: 20, padding: "32px 36px",
            border: `1px solid ${p.color}15`, marginBottom: 48,
            display: "flex", gap: 20, alignItems: "flex-start",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `linear-gradient(135deg, ${p.color}, ${p.accent})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0, boxShadow: `0 4px 16px ${p.color}20`,
            }}>💡</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Enfoque metodológico</div>
              <p style={{ fontSize: 15, color: T.body, lineHeight: 1.75 }}>{p.approach}</p>
            </div>
          </div>
        </Reveal>

        {/* Levels — only for Escuelita */}
        {p.levels.length > 0 && (
          <>
            <Reveal>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Niveles por edad</div>
                <h3 style={{ fontFamily: F.display, fontSize: 28, color: T.navy }}>Un camino para cada etapa</h3>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 56 }}>
              {p.levels.map((lv, i) => (
                <Reveal key={lv.name} delay={i * 0.08}>
                  <div style={{
                    background: T.white, borderRadius: 20, padding: "28px 24px",
                    border: `1.5px solid ${T.border}`, height: "100%",
                    transition: "all 0.3s", cursor: "default",
                    display: "flex", flexDirection: "column",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${p.color}10`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 14 }}>{lv.icon}</div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 0,
                      background: `${p.color}10`, borderRadius: 50, padding: "4px 12px",
                      marginBottom: 10, alignSelf: "flex-start",
                    }}>
                      <span style={{ fontFamily: F.display, fontSize: 13, color: p.color }}>{lv.age}</span>
                    </div>
                    <h4 style={{ fontFamily: F.display, fontSize: 17, color: T.navy, marginBottom: 8, lineHeight: 1.25 }}>{lv.name}</h4>
                    <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, flex: 1 }}>{lv.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* Services */}
        <Reveal>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Servicios especializados</div>
            <h3 style={{ fontFamily: F.display, fontSize: 28, color: T.navy }}>{p.services.length} áreas de intervención</h3>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {p.services.map((s, i) => {
            const isOpen = expandedService === i;
            return (
              <Reveal key={s.name} delay={i * 0.04}>
                <div
                  onClick={() => setExpandedService(isOpen ? null : i)}
                  style={{
                    background: T.white, borderRadius: 18, overflow: "hidden",
                    border: `1.5px solid ${isOpen ? p.color : T.border}`,
                    boxShadow: isOpen ? `0 8px 28px ${p.color}10` : "0 1px 4px rgba(0,0,0,0.02)",
                    transition: "all 0.3s cubic-bezier(.16,1,.3,1)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "20px 24px",
                  }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 13,
                      background: isOpen ? `linear-gradient(135deg, ${p.color}, ${p.accent})` : p.light,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0,
                      transition: "all 0.3s",
                      boxShadow: isOpen ? `0 4px 14px ${p.color}25` : "none",
                    }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 15, fontWeight: 600, color: T.navy, lineHeight: 1.3 }}>{s.name}</h4>
                    </div>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: isOpen ? `${p.color}12` : T.offWhite,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: isOpen ? p.color : T.muted, flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "all 0.3s",
                    }}>▾</div>
                  </div>

                  <div style={{
                    maxHeight: isOpen ? 120 : 0, overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(.16,1,.3,1)",
                  }}>
                    <div style={{ padding: "0 24px 20px 86px" }}>
                      <p style={{ fontSize: 13.5, color: T.body, lineHeight: 1.65 }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      {index < PROGRAMS.length - 1 && (
        <div style={{ maxWidth: 200, margin: "0 auto", height: 2, background: `linear-gradient(90deg, transparent, ${T.border}, transparent)` }} />
      )}
    </section>
  );
}

/* ═══ FOR FAMILIES STRIP ═══ */
function FamiliesStrip() {
  const items = [
    { icon: "🎥", title: "Sesiones virtuales gratuitas", desc: "Orientación a familias sobre el proceso de desarrollo, desde las áreas de Trabajo Social y Psicología.", bg: T.cloud },
    { icon: "🤝", title: "Red de apoyo para padres", desc: "Espacio de acompañamiento donde las familias comparten experiencias y fortalecen vínculos.", bg: T.cream },
    { icon: "📄", title: "Libreta del sistema regular", desc: "Nuestros estudiantes cuentan con libreta de educación regular para continuar su trayectoria hasta bachiller.", bg: T.mint },
  ];

  return (
    <section style={{ padding: "80px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.peach, borderRadius: 50, padding: "6px 18px",
              marginBottom: 14, border: `1px solid rgba(232,104,64,0.12)`,
            }}>
              <span style={{ fontSize: 13 }}>👨‍👩‍👧</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.coral, letterSpacing: 1.5, textTransform: "uppercase" }}>Para las familias</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,40px)", color: T.navy, marginBottom: 14 }}>
              Acompañamiento más allá de la terapia
            </h2>
            <p style={{ fontSize: 16, color: T.body, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Los tres programas comparten un compromiso con la familia como eje fundamental del proceso terapéutico.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div style={{
                background: T.white, borderRadius: 22, padding: "36px 30px",
                border: `1px solid ${T.border}`, height: "100%",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16, background: item.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 20,
                }}>{item.icon}</div>
                <h4 style={{ fontFamily: F.display, fontSize: 19, color: T.navy, marginBottom: 10 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CtaBanner() {
  return (
    <section style={{
      padding: "80px 32px",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 100%)`,
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontSize: 40, marginBottom: 20 }}>💛</div>
          <h3 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,38px)", color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
            ¿Tienes un niño o niña que necesita apoyo?
          </h3>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
            El síndrome de Down no es una barrera, sino una manera diferente y valiosa de aprender, crecer y desarrollar todo su potencial.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "15px 34px", borderRadius: 50, fontWeight: 700, fontSize: 15,
              background: "#25d366", color: "#fff", textDecoration: "none",
              boxShadow: "0 6px 24px rgba(37,211,102,0.3)",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "none"}
            >
              <span style={{ fontSize: 20 }}>💬</span>
              Consulta por WhatsApp
            </a>
            <a href="#contacto" style={{
              padding: "15px 34px", borderRadius: 50, fontWeight: 600, fontSize: 15,
              border: "2px solid rgba(255,255,255,0.2)", color: "#fff",
              textDecoration: "none", transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.5)"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "transparent"; }}
            >Más información</a>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 20 }}>
            Inscripciones abiertas — Gestión 2026 — Consultas: 70106276
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function ProgramasPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <PageHero />
      <QuickNav />
      {PROGRAMS.map((p, i) => (
        <ProgramSection key={p.id} program={p} index={i} />
      ))}
      <FamiliesStrip />
      <CtaBanner />
    </div>
  );
}
