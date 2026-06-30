import { useState, useEffect, useRef } from "react";

const T = {
  navy: "#0c2340", deep: "#142d4c", blue: "#2466a8", sky: "#4a9eed",
  cloud: "#e8f1fa", gold: "#e8a838", honey: "#f5c242", cream: "#fdf6e3",
  teal: "#1a8a7d", mint: "#e0f5f0", coral: "#e86840", peach: "#fef0e8",
  green: "#2d8a4e", leaf: "#e5f5eb", white: "#fff", offWhite: "#fafbfd",
  warm: "#f7f5f0", text: "#1a1a2e", body: "#3d4152", muted: "#6b7084",
  border: "#e4e6ec", purple: "#6c5ce7", lavender: "#f0edff",
  rose: "#e84393", roseBg: "#fdf2f8",
  forest: "#1e6b38", darkGreen: "#0a2e16",
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
const DIFFICULTIES = [
  { name: "Dislexia", icon: "📖", short: "Lectura", desc: "Dificultad persistente para leer con fluidez y precisión, que no se explica por la inteligencia ni por falta de oportunidades educativas.", color: T.blue, bg: T.cloud },
  { name: "Disgrafía", icon: "✏️", short: "Escritura", desc: "Dificultad en la expresión escrita: caligrafía irregular, errores ortográficos frecuentes, problemas para organizar ideas en el papel.", color: T.coral, bg: T.peach },
  { name: "Discalculia", icon: "🔢", short: "Matemáticas", desc: "Dificultad para comprender conceptos numéricos, realizar cálculos y resolver problemas matemáticos acorde a la edad.", color: T.purple, bg: T.lavender },
  { name: "TDAH", icon: "🎯", short: "Atención", desc: "Dificultades en la atención sostenida, la organización, el control de impulsos y la regulación de la actividad motora.", color: T.gold, bg: T.cream },
  { name: "Procesamiento lento", icon: "⏱️", short: "Velocidad", desc: "El niño comprende los contenidos pero necesita significativamente más tiempo para procesar información y completar tareas.", color: T.teal, bg: T.mint },
  { name: "Dificultad general", icon: "📚", short: "Rendimiento", desc: "Bajo rendimiento escolar no explicado por una condición específica. Requiere evaluación para identificar las causas y diseñar estrategias.", color: T.green, bg: T.leaf },
];

const SERVICES = [
  { name: "Dificultades de lectura y escritura", icon: "📖", color: T.blue, bg: T.cloud,
    desc: "Intervención especializada en dislexia, disgrafía y otros trastornos del lenguaje escrito. Utilizamos metodologías multisensoriales y estructuradas que respetan el ritmo de cada niño.",
    methods: ["Método Orton-Gillingham adaptado", "Conciencia fonológica", "Fluidez lectora", "Comprensión de textos"] },
  { name: "Atención y concentración", icon: "🎯", color: T.gold, bg: T.cream,
    desc: "Estrategias para TDAH y dificultades atencionales que mejoran el enfoque, la organización y la autorregulación en el aula y en casa.",
    methods: ["Entrenamiento atencional", "Funciones ejecutivas", "Técnicas de organización", "Autorregulación"] },
  { name: "Razonamiento cognitivo", icon: "🧮", color: T.purple, bg: T.lavender,
    desc: "Desarrollo del pensamiento lógico-matemático, resolución de problemas y razonamiento abstracto. Abordaje especializado de discalculia.",
    methods: ["Pensamiento lógico", "Resolución de problemas", "Cálculo funcional", "Razonamiento abstracto"] },
  { name: "Maduración neuropsicológica", icon: "🧠", color: T.coral, bg: T.peach,
    desc: "Evaluación y estimulación de funciones ejecutivas, memoria de trabajo, velocidad de procesamiento y flexibilidad cognitiva.",
    methods: ["Funciones ejecutivas", "Memoria de trabajo", "Velocidad de procesamiento", "Flexibilidad cognitiva"] },
  { name: "Apoyo psicopedagógico", icon: "📝", color: T.green, bg: T.leaf,
    desc: "Adaptaciones metodológicas y estrategias de enseñanza individualizadas según el perfil neuropsicológico de cada estudiante.",
    methods: ["Adaptaciones curriculares", "Estrategias metacognitivas", "Aprendizaje multisensorial", "Evaluación diferenciada"] },
  { name: "Técnicas de estudio", icon: "📐", color: T.teal, bg: T.mint,
    desc: "Herramientas prácticas y personalizadas para organizar, comprender y retener información de forma eficiente según el estilo de aprendizaje.",
    methods: ["Mapas mentales", "Resumen estructurado", "Planificación del estudio", "Técnicas de memoria"] },
  { name: "Orientación familiar y escolar", icon: "👨‍👩‍👧", color: T.rose, bg: T.roseBg,
    desc: "Coordinación permanente entre familia, escuela y equipo terapéutico. Capacitamos a padres y docentes para un abordaje coherente en todos los entornos.",
    methods: ["Informes para la escuela", "Capacitación a docentes", "Estrategias para el hogar", "Reuniones tripartitas"] },
];

const PROCESS = [
  { n: "1", title: "Escuchar", desc: "Entrevista con la familia para comprender la historia del niño, sus fortalezas, sus dificultades y las expectativas de los padres.", icon: "👂", color: T.green },
  { n: "2", title: "Evaluar", desc: "Evaluación neuropsicológica y psicopedagógica completa para identificar el perfil de aprendizaje y las áreas que necesitan apoyo.", icon: "🔬", color: T.blue },
  { n: "3", title: "Diseñar", desc: "Elaboración del plan de intervención personalizado con objetivos claros, medibles y alcanzables a corto y mediano plazo.", icon: "📋", color: T.purple },
  { n: "4", title: "Intervenir", desc: "Sesiones terapéuticas individuales y grupales con estrategias basadas en evidencia, adaptadas al estilo de aprendizaje del niño.", icon: "🧩", color: T.coral },
  { n: "5", title: "Coordinar", desc: "Comunicación permanente con la escuela y la familia para garantizar coherencia en todos los entornos del niño.", icon: "🔄", color: T.teal },
  { n: "6", title: "Evolucionar", desc: "Reevaluación periódica de avances, ajuste de objetivos y celebración de cada logro alcanzado.", icon: "📈", color: T.gold },
];

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 560, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.darkGreen} 0%, ${T.forest} 40%, ${T.green} 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes pencil-write{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
        @keyframes gentle-bob{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-6px) rotate(2deg)}75%{transform:translateY(-3px) rotate(-1deg)}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: 550, height: 550, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", bottom: "-22%", left: "-7%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,194,66,.05),transparent 70%)" }} />
        {["📖", "✏️", "🔢", "📐", "🧠"].map((e, i) => (
          <div key={i} style={{ position: "absolute", fontSize: 20 + i * 6, opacity: .05, left: `${6 + i * 18}%`, top: `${12 + (i % 3) * 28}%`, animation: `gentle-bob ${4 + i * .8}s ease-in-out infinite`, animationDelay: `${i * .7}s` }}>{e}</div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 90" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 45C280 75 560 20 840 50C1120 75 1320 40 1440 42V90H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 32px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 3 }}>
        <div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .1s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", borderRadius: 50, padding: "6px 18px 6px 10px", marginBottom: 24, border: "1px solid rgba(255,255,255,.1)" }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${T.honey}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>📚</span>
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 500 }}>Programa especializado — Dificultades de aprendizaje</span>
            </div>
          </div>

          <h1 style={{ fontFamily: F.display, fontSize: "clamp(38px,4.5vw,54px)", color: "#fff", lineHeight: 1.08, marginBottom: 10, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .2s" }}>
            Pasos{" "}
            <span style={{ fontStyle: "italic", color: T.honey }}>Firmes</span>
          </h1>

          <p style={{ fontFamily: F.display, fontSize: 20, color: "rgba(255,255,255,.5)", fontStyle: "italic", marginBottom: 22, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .3s" }}>
            "Aprender también puede ser diferente"
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 480, marginBottom: 32, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .4s" }}>
            No todos los niños aprenden de la misma manera, y eso no es un problema — es
            una oportunidad. Identificamos las necesidades específicas de cada estudiante
            y construimos el camino que mejor se adapta a su forma de aprender.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .5s" }}>
            <a href="#dificultades" style={{ padding: "15px 34px", borderRadius: 50, fontWeight: 700, fontSize: 15, background: T.gold, color: T.navy, textDecoration: "none", boxShadow: `0 6px 24px ${T.gold}35`, transition: "all .25s" }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "none"}
            >¿Qué dificultades atendemos?</a>
            <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{ padding: "15px 34px", borderRadius: 50, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,.25)", color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; e.currentTarget.style.background = "rgba(255,255,255,.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.background = "transparent"; }}
            ><span style={{ fontSize: 18 }}>💬</span>Solicitar evaluación</a>
          </div>
        </div>

        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateX(50px) scale(.95)", transition: "all 1s cubic-bezier(.16,1,.3,1) .35s", position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "4/4.2", borderRadius: 28, background: `linear-gradient(145deg, ${T.leaf}, ${T.cream})`, boxShadow: "0 32px 80px rgba(0,0,0,.25)", border: "4px solid rgba(255,255,255,.15)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>📚</div>
              <p style={{ fontFamily: F.display, fontSize: 16, color: T.navy, maxWidth: 220 }}>Fotografías de sesiones psicopedagógicas</p>
              <p style={{ fontSize: 12, color: T.muted, marginTop: 8 }}>Aprendizaje personalizado</p>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -16, left: -28, background: T.white, borderRadius: 18, padding: "14px 20px", boxShadow: "0 12px 36px rgba(0,0,0,.1)", display: "flex", alignItems: "center", gap: 12, animation: "float 4s ease-in-out infinite", border: `1px solid ${T.border}` }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: T.lavender, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧠</div>
            <div><div style={{ fontFamily: F.display, fontSize: 13, color: T.navy }}>Evaluación</div><div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>neuropsicológica</div></div>
          </div>
          <div style={{ position: "absolute", top: -12, right: -16, background: T.green, borderRadius: 16, padding: "10px 18px", boxShadow: `0 8px 24px ${T.green}30`, animation: "float 5s ease-in-out infinite", animationDelay: "1.5s" }}>
            <div style={{ fontFamily: F.display, fontSize: 22, color: "#fff", lineHeight: 1 }}>7</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.85)", fontWeight: 700, letterSpacing: .5, textTransform: "uppercase" }}>Áreas</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ DIFFICULTIES WE ADDRESS ═══ */
function DifficultiesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="dificultades" style={{ padding: "72px 32px 80px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.leaf, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(45,138,78,.12)` }}>
              <span style={{ fontSize: 13 }}>❓</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.green, letterSpacing: 1.5, textTransform: "uppercase" }}>¿Qué atendemos?</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Dificultades que acompañamos</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Cada dificultad tiene un nombre, un origen y — lo más importante — un camino de intervención. El primer paso es identificarla.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {DIFFICULTIES.map((d, i) => {
            const isH = hovered === i;
            return (
              <Reveal key={d.name} delay={i * .06}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: T.white, borderRadius: 22, overflow: "hidden",
                    border: `1.5px solid ${isH ? d.color : T.border}`,
                    boxShadow: isH ? `0 16px 40px ${d.color}12` : "0 2px 8px rgba(0,0,0,.02)",
                    transform: isH ? "translateY(-6px)" : "none",
                    transition: "all .35s cubic-bezier(.16,1,.3,1)",
                    cursor: "default",
                  }}
                >
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${d.color}, ${d.color}88)` }} />
                  <div style={{ padding: "28px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: 15,
                        background: isH ? `linear-gradient(135deg, ${d.color}, ${d.color}cc)` : d.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24, flexShrink: 0, transition: "all .35s",
                        boxShadow: isH ? `0 6px 20px ${d.color}25` : "none",
                      }}>{d.icon}</div>
                      <div>
                        <h4 style={{ fontFamily: F.display, fontSize: 19, color: T.navy, lineHeight: 1.2 }}>{d.name}</h4>
                        <span style={{ fontSize: 12, fontWeight: 600, color: d.color }}>{d.short}</span>
                      </div>
                    </div>
                    <p style={{
                      fontSize: 13.5, color: T.body, lineHeight: 1.65,
                      maxHeight: isH ? 120 : 0, overflow: "hidden", opacity: isH ? 1 : 0,
                      transition: "all .4s cubic-bezier(.16,1,.3,1)",
                    }}>{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={.2}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: T.leaf, borderRadius: 16, padding: "16px 28px", border: `1px solid rgba(45,138,78,.1)` }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <p style={{ fontSize: 14, color: T.body, lineHeight: 1.5 }}>
                <strong style={{ color: T.green }}>¿No estás seguro?</strong> No necesitas un diagnóstico previo. Si tu hijo tiene dificultades en la escuela, podemos evaluarlo.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ PROCESS ═══ */
function ProcessSection() {
  return (
    <section style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.lavender, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(108,92,231,.12)` }}>
              <span style={{ fontSize: 13 }}>🔄</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.purple, letterSpacing: 1.5, textTransform: "uppercase" }}>Nuestro proceso</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,40px)", color: T.navy, marginBottom: 14 }}>6 pasos hacia el aprendizaje efectivo</h2>
            <p style={{ fontSize: 16, color: T.body, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Un proceso claro, profesional y centrado en resultados — desde la primera consulta hasta la evolución continua.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={i * .07}>
              <div style={{
                background: T.white, borderRadius: 22, padding: "32px 26px",
                border: `1px solid ${T.border}`, height: "100%",
                display: "flex", flexDirection: "column",
                transition: "all .3s", position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}10`; e.currentTarget.style.borderColor = `${s.color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                {/* Step number watermark */}
                <div style={{ position: "absolute", top: -8, right: 8, fontFamily: F.display, fontSize: 80, color: `${s.color}08`, lineHeight: 1, pointerEvents: "none" }}>{s.n}</div>

                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, boxShadow: `0 6px 20px ${s.color}20`,
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: 1.5, textTransform: "uppercase" }}>Paso {s.n}</div>
                    <h4 style={{ fontFamily: F.display, fontSize: 20, color: T.navy }}>{s.title}</h4>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
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
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.leaf, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(45,138,78,.12)` }}>
              <span style={{ fontSize: 13 }}>🩺</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.green, letterSpacing: 1.5, textTransform: "uppercase" }}>Áreas de intervención</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>7 especialidades integradas</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Cada área aporta herramientas específicas. Juntas construyen un plan de intervención completo para que tu hijo descubra su propia forma de aprender.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.name} delay={i * .04}>
                <div onClick={() => setOpen(isOpen ? null : i)} style={{
                  background: T.white, borderRadius: 20, overflow: "hidden",
                  border: `1.5px solid ${isOpen ? s.color : T.border}`,
                  boxShadow: isOpen ? `0 12px 36px ${s.color}10` : "0 1px 4px rgba(0,0,0,.02)",
                  transition: "all .35s cubic-bezier(.16,1,.3,1)", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "22px 28px" }}>
                    <div style={{
                      width: 54, height: 54, borderRadius: 16,
                      background: isOpen ? `linear-gradient(135deg, ${s.color}, ${s.color}cc)` : s.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 24, flexShrink: 0, transition: "all .3s",
                      boxShadow: isOpen ? `0 6px 20px ${s.color}20` : "none",
                    }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 17, fontWeight: 600, color: T.navy, lineHeight: 1.3 }}>{s.name}</h4>
                      {!isOpen && <p style={{ fontSize: 14, color: T.muted, marginTop: 3, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.desc}</p>}
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: isOpen ? `${s.color}12` : T.offWhite, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: isOpen ? s.color : T.muted, flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "all .3s" }}>▾</div>
                  </div>

                  <div style={{ maxHeight: isOpen ? 250 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" }}>
                    <div style={{ padding: "0 28px 28px 100px" }}>
                      <p style={{ fontSize: 15, color: T.body, lineHeight: 1.75, marginBottom: 18 }}>{s.desc}</p>
                      <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Metodologías y técnicas</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {s.methods.map(m => (
                          <span key={m} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 50, background: s.bg, border: `1px solid ${s.color}12`, fontSize: 13, fontWeight: 500, color: T.body }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color }} />{m}
                          </span>
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

/* ═══ SCHOOL TRIANGLE ═══ */
function SchoolTriangle() {
  return (
    <section style={{ padding: "88px 32px", background: `linear-gradient(180deg, ${T.white} 0%, ${T.warm} 100%)` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cream, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,168,56,.15)` }}>
              <span style={{ fontSize: 13 }}>🔗</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Trabajo en equipo</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,40px)", color: T.navy, marginBottom: 14 }}>El triángulo del éxito</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              El aprendizaje no ocurre solo en la terapia. Trabajamos en coordinación permanente con los tres entornos del niño.
            </p>
          </div>
        </Reveal>

        <Reveal delay={.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { icon: "🏠", title: "Familia", desc: "Formamos a los padres en estrategias para el hogar: organización del espacio de estudio, rutinas, técnicas de acompañamiento en tareas y gestión emocional.", color: T.rose, bg: T.roseBg },
              { icon: "🏫", title: "Escuela", desc: "Coordinamos con los docentes: elaboramos informes con recomendaciones, proponemos adaptaciones metodológicas y realizamos reuniones de seguimiento.", color: T.blue, bg: T.cloud },
              { icon: "🩺", title: "Equipo terapéutico", desc: "Nuestros profesionales diseñan, ejecutan y evalúan el plan de intervención, garantizando coherencia entre todos los entornos del niño.", color: T.green, bg: T.leaf },
            ].map((c, i) => (
              <div key={c.title} style={{
                background: T.white, borderRadius: 24, padding: "36px 28px",
                border: `1px solid ${T.border}`, height: "100%",
                display: "flex", flexDirection: "column",
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${c.color}10`; e.currentTarget.style.borderColor = `${c.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: 18,
                  background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, marginBottom: 20, boxShadow: `0 6px 20px ${c.color}20`,
                }}>{c.icon}</div>
                <h4 style={{ fontFamily: F.display, fontSize: 22, color: T.navy, marginBottom: 10 }}>{c.title}</h4>
                <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7, flex: 1 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={.15}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: T.leaf, borderRadius: 16, padding: "16px 28px", border: `1px solid rgba(45,138,78,.1)` }}>
              <span style={{ fontSize: 20 }}>📝</span>
              <p style={{ fontSize: 14, color: T.body }}>
                <strong style={{ color: T.green }}>Informes para la escuela:</strong> elaboramos documentos con recomendaciones específicas para que los docentes adapten su metodología.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CtaSection() {
  return (
    <section style={{ padding: "80px 32px", background: `linear-gradient(155deg, ${T.darkGreen} 0%, ${T.forest} 50%, ${T.green} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {["📖","✏️","🧮"].map((e, i) => (
          <div key={i} style={{ position: "absolute", fontSize: 36, opacity: .03, left: `${15 + i * 30}%`, top: `${15 + i * 20}%`, transform: `rotate(${i * 45}deg)` }}>{e}</div>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", padding: "56px 48px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📚</div>
            <h3 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,38px)", color: "#fff", marginBottom: 10, lineHeight: 1.15 }}>
              ¿Tu hijo tiene dificultades en la escuela?
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 12px" }}>
              No esperes a que la frustración crezca. Una evaluación profesional puede revelar
              el camino de aprendizaje que mejor se adapta a tu hijo.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", lineHeight: 1.6, maxWidth: 420, margin: "0 auto 32px" }}>
              No necesitas un diagnóstico previo para consultarnos. Evaluamos, identificamos y proponemos soluciones.
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
export default function PasosFirmesPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <DifficultiesSection />
      <ProcessSection />
      <ServicesSection />
      <SchoolTriangle />
      <CtaSection />
    </div>
  );
}
