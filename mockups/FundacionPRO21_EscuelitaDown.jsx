import { useState, useEffect, useRef } from "react";

const T = {
  navy: "#0c2340", deep: "#142d4c", blue: "#2466a8", sky: "#4a9eed",
  cloud: "#e8f1fa", gold: "#e8a838", honey: "#f5c242", cream: "#fdf6e3",
  teal: "#1a8a7d", mint: "#e0f5f0", coral: "#e86840", peach: "#fef0e8",
  green: "#2d8a4e", leaf: "#e5f5eb", white: "#fff", offWhite: "#fafbfd",
  warm: "#f7f5f0", text: "#1a1a2e", body: "#3d4152", muted: "#6b7084",
  border: "#e4e6ec", purple: "#6c5ce7", lavender: "#f0edff",
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
const LEVELS = [
  {
    age: "0 – 2 años", name: "Manos Chiquitas", icon: "🍼", color: "#6c9fd4", bg: "#eaf2fb",
    photo: "👶", photoLabel: "Sesión de estimulación temprana",
    desc: "Intervención desde los primeros meses de vida. Trabajamos con la familia como eje central del desarrollo, potenciando cada logro temprano mediante estimulación multisensorial, vínculo afectivo y acompañamiento profesional permanente.",
    highlights: ["Estimulación multisensorial", "Vínculo madre-hijo", "Desarrollo neuromotor", "Orientación familiar intensiva"],
  },
  {
    age: "3 – 7 años", name: "Aventuras sin Límites", icon: "🎨", color: "#e8a838", bg: "#fdf6e3",
    photo: "🧒", photoLabel: "Actividades lúdicas y terapéuticas",
    desc: "Etapa de máxima exploración y aprendizaje. A través del juego, el arte y actividades lúdicas estructuradas, desarrollamos habilidades sociales, motoras y cognitivas que preparan al niño para la inclusión educativa.",
    highlights: ["Aprendizaje a través del juego", "Habilidades sociales", "Pre-lectoescritura", "Inclusión educativa activa"],
  },
  {
    age: "8 – 14 años", name: "Oportunidades para Todos", icon: "📖", color: "#1a8a7d", bg: "#e0f5f0",
    photo: "👦", photoLabel: "Apoyo pedagógico y autonomía",
    desc: "Fortalecimiento académico con adaptaciones curriculares, desarrollo de habilidades de autonomía personal y preparación progresiva para la vida independiente. Los estudiantes asisten al centro y a su unidad educativa de origen.",
    highlights: ["Adaptación curricular", "Autonomía personal", "Habilidades para la vida", "Libreta del sistema regular"],
  },
  {
    age: "15+ años", name: "Programa Crecer", icon: "🌱", color: "#2d8a4e", bg: "#e5f5eb",
    photo: "🧑", photoLabel: "Formación pre-laboral",
    desc: "Formación pre-laboral e inserción en el mundo del trabajo. Desarrollamos competencias para la vida adulta autónoma: habilidades socio-laborales, manejo del dinero, transporte, y relaciones interpersonales en contextos reales.",
    highlights: ["Inserción laboral", "Vida independiente", "Competencias socio-laborales", "Inclusión comunitaria"],
  },
];

const SERVICES = [
  {
    name: "Estimulación temprana", icon: "👶", color: "#6c9fd4", bg: "#eaf2fb",
    desc: "Intervención desde los primeros meses para potenciar el desarrollo neuromotor y sensorial. Cada sesión combina técnicas especializadas con un ambiente cálido y afectivo que fortalece el vínculo familiar.",
    details: ["Desarrollo neuromotor", "Estimulación sensorial", "Masaje infantil terapéutico", "Guía a padres para estimulación en casa"],
  },
  {
    name: "Terapia de lenguaje", icon: "🗣️", color: T.teal, bg: T.mint,
    desc: "Trabajamos la respiración, el control orofacial y la articulación de sonidos para mejorar la comunicación y el habla de forma divertida y funcional. Incluimos sistemas aumentativos cuando es necesario.",
    details: ["Control orofacial", "Articulación fonética", "Lenguaje expresivo y comprensivo", "Comunicación funcional"],
  },
  {
    name: "Psicomotricidad", icon: "🤸", color: T.coral, bg: T.peach,
    desc: "Fortalecemos la coordinación, equilibrio y esquema corporal para favorecer la autonomía, la concentración y la expresión corporal a través de circuitos, juegos y actividades vivenciales.",
    details: ["Coordinación motora gruesa", "Motricidad fina", "Esquema corporal", "Equilibrio y lateralidad"],
  },
  {
    name: "Fisioterapia", icon: "💪", color: T.blue, bg: T.cloud,
    desc: "Intervenimos desde la estimulación temprana para mejorar aspectos como tono muscular, postura y movilidad, adaptando ejercicios a cada etapa de desarrollo con un enfoque lúdico y respetuoso.",
    details: ["Tono muscular", "Postura y alineación", "Movilidad funcional", "Ejercicios adaptativos"],
  },
  {
    name: "Terapia de conducta", icon: "🧠", color: T.purple, bg: T.lavender,
    desc: "Acompañamos a los niños en el desarrollo de habilidades sociales, autorregulación y rutinas positivas dentro de su entorno familiar y escolar para mejorar la independencia y la convivencia.",
    details: ["Habilidades sociales", "Autorregulación", "Rutinas positivas", "Independencia funcional"],
  },
  {
    name: "Estimulación neuro-cognitiva", icon: "🧩", color: T.gold, bg: T.cream,
    desc: "Intervención orientada a potenciar las funciones cognitivas en niños con síndrome de Down, favoreciendo el desarrollo del lenguaje, la atención, la memoria y las habilidades de aprendizaje.",
    details: ["Atención y concentración", "Memoria de trabajo", "Funciones ejecutivas", "Razonamiento lógico"],
  },
  {
    name: "Apoyo pedagógico", icon: "📝", color: T.green, bg: T.leaf,
    desc: "Realizamos adaptaciones curriculares según las capacidades y ritmo de cada niño, promoviendo el aprendizaje significativo. Nuestros estudiantes cuentan con libreta de educación regular.",
    details: ["Adaptaciones curriculares", "Lectoescritura adaptada", "Matemáticas funcionales", "Libreta del sistema regular"],
  },
  {
    name: "Orientación familiar", icon: "👨‍👩‍👧", color: "#e84393", bg: "#fdf2f8",
    desc: "Ofrecemos sesiones virtuales gratuitas, atención desde Trabajo Social y Psicología, y una red de apoyo donde las familias comparten experiencias y crecen juntas en el proceso de crianza.",
    details: ["Sesiones virtuales gratuitas", "Red de apoyo para padres", "Contención emocional", "Estrategias para el hogar"],
  },
];

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 560, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.navy} 0%, #163a60 40%, ${T.blue} 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes path-draw{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
        @keyframes star-pulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.3);opacity:1}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: 550, height: 550, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: "-25%", left: "-8%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,168,56,0.06),transparent 70%)" }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ position: "absolute", fontSize: 16 + i * 4, left: `${12 + i * 18}%`, top: `${20 + (i % 3) * 25}%`, animation: `star-pulse ${2 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.5}s`, opacity: 0.08 }}>⭐</div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 90" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 50C240 20 480 70 720 40C960 10 1200 60 1440 35V90H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 32px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 3 }}>
        <div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .1s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", borderRadius: 50, padding: "6px 18px 6px 10px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${T.gold}, ${T.honey})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🌟</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>Programa principal — Desde 2021</span>
            </div>
          </div>

          <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px,4.5vw,52px)", color: "#fff", lineHeight: 1.08, marginBottom: 10, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .2s" }}>
            Mi Escuelita<br/>Inclusiva{" "}
            <span style={{ fontStyle: "italic", color: T.honey }}>Down</span>
          </h1>

          <p style={{ fontFamily: F.display, fontSize: 20, color: "rgba(255,255,255,0.55)", fontStyle: "italic", marginBottom: 22, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .3s" }}>
            "Creciendo sin límites"
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: 480, marginBottom: 32, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .4s" }}>
            Programa integral que acompaña a las familias de niños y niñas con síndrome de Down
            desde la estimulación temprana hasta la inserción laboral, potenciando sus habilidades
            y fortaleciendo su autonomía en cada etapa de la vida.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .5s" }}>
            <a href="#niveles" style={{ padding: "15px 34px", borderRadius: 50, fontWeight: 700, fontSize: 15, background: T.gold, color: T.navy, textDecoration: "none", boxShadow: `0 6px 24px ${T.gold}35`, transition: "all .25s" }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "none"}
            >Explorar niveles</a>
            <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{ padding: "15px 34px", borderRadius: 50, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,0.25)", color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.background = "transparent"; }}
            ><span style={{ fontSize: 18 }}>💬</span>Inscripciones 2026</a>
          </div>
        </div>

        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateX(50px) scale(.95)", transition: "all 1s cubic-bezier(.16,1,.3,1) .35s", position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "4/4.5", borderRadius: 28, background: `linear-gradient(145deg, ${T.cloud}, ${T.cream})`, boxShadow: "0 32px 80px rgba(0,0,0,0.25)", border: "4px solid rgba(255,255,255,0.15)", overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>🌟</div>
              <p style={{ fontFamily: F.display, fontSize: 16, color: T.navy, maxWidth: 220 }}>Fotografías de los niños en actividades terapéuticas</p>
              <p style={{ fontSize: 12, color: T.muted, marginTop: 8 }}>Pre Kínder · Kínder · Primaria</p>
            </div>
          </div>
          {/* Floating badges */}
          <div style={{ position: "absolute", bottom: -16, left: -28, background: T.white, borderRadius: 18, padding: "14px 20px", boxShadow: "0 12px 36px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 12, animation: "float 4s ease-in-out infinite", border: `1px solid ${T.border}` }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: T.leaf, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📚</div>
            <div><div style={{ fontFamily: F.display, fontSize: 13, color: T.navy }}>Libreta del</div><div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>sistema regular</div></div>
          </div>
          <div style={{ position: "absolute", top: -12, right: -16, background: T.gold, borderRadius: 16, padding: "10px 18px", boxShadow: `0 8px 24px ${T.gold}30`, animation: "float 5s ease-in-out infinite", animationDelay: "1.5s" }}>
            <div style={{ fontFamily: F.display, fontSize: 22, color: T.navy, lineHeight: 1 }}>4</div>
            <div style={{ fontSize: 9, color: T.navy, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase" }}>Niveles</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ KEY FACTS ═══ */
function KeyFacts() {
  const facts = [
    { icon: "🏫", label: "Niveles educativos", value: "Pre Kínder · Kínder · Primaria", bg: T.cloud },
    { icon: "🧑‍🤝‍🧑", label: "Inclusión activa", value: "Asisten al centro + escuela regular", bg: T.cream },
    { icon: "📋", label: "Acreditación", value: "Libreta del sistema educativo regular", bg: T.mint },
    { icon: "🌱", label: "Hasta bachiller", value: "Trayectoria educativa completa", bg: T.leaf },
  ];
  return (
    <section style={{ background: T.offWhite, padding: "48px 32px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {facts.map((f, i) => (
          <Reveal key={i} delay={i * .07}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 18px", borderRadius: 18, background: T.white, border: `1px solid ${T.border}`, transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.navy, marginTop: 2, lineHeight: 1.3 }}>{f.value}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══ LEVELS JOURNEY ═══ */
function LevelsJourney() {
  const [activeLevel, setActiveLevel] = useState(0);
  const lv = LEVELS[activeLevel];

  return (
    <section id="niveles" style={{ padding: "80px 32px 88px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cream, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,168,56,.15)` }}>
              <span style={{ fontSize: 13 }}>🗺️</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Un camino de crecimiento</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>4 niveles, una vida de oportunidades</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Desde los primeros meses hasta la vida adulta, cada nivel está diseñado para la etapa de desarrollo en la que se encuentra el niño.
            </p>
          </div>
        </Reveal>

        {/* Journey path selector */}
        <Reveal delay={.1}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 48, position: "relative" }}>
            {/* Connecting line */}
            <div style={{ position: "absolute", top: "50%", left: "15%", right: "15%", height: 3, background: T.border, transform: "translateY(-50%)", zIndex: 0, borderRadius: 2 }}>
              <div style={{
                height: "100%", borderRadius: 2,
                background: `linear-gradient(90deg, ${LEVELS[0].color}, ${lv.color})`,
                width: `${(activeLevel / (LEVELS.length - 1)) * 100}%`,
                transition: "width .5s cubic-bezier(.16,1,.3,1)",
              }} />
            </div>

            {LEVELS.map((l, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative", zIndex: 1 }}>
                <button onClick={() => setActiveLevel(i)} style={{
                  width: 72, height: 72, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: i <= activeLevel ? `linear-gradient(135deg, ${l.color}, ${l.color}cc)` : T.white,
                  boxShadow: i === activeLevel ? `0 8px 28px ${l.color}30` : i <= activeLevel ? `0 4px 12px ${l.color}15` : `0 2px 8px rgba(0,0,0,.06)`,
                  borderWidth: 3, borderStyle: "solid",
                  borderColor: i <= activeLevel ? l.color : T.border,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, transition: "all .35s cubic-bezier(.16,1,.3,1)",
                  transform: i === activeLevel ? "scale(1.1)" : "scale(1)",
                }}>{l.icon}</button>
                <div style={{ marginTop: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: i === activeLevel ? l.color : T.muted, transition: "color .3s" }}>{l.age}</div>
                  <div style={{ fontSize: 11, color: T.muted, fontWeight: 500, marginTop: 2 }}>{l.name}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Active level detail */}
        <div key={activeLevel} style={{ animation: "fadeSlideUp .5s cubic-bezier(.16,1,.3,1)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, background: T.white, borderRadius: 28, overflow: "hidden", border: `2px solid ${lv.color}20`, boxShadow: `0 16px 48px ${lv.color}08` }}>
            {/* Photo placeholder */}
            <div style={{ background: `linear-gradient(145deg, ${lv.bg}, ${T.white})`, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 380, position: "relative" }}>
              <div style={{ position: "absolute", top: 24, left: 24, display: "inline-flex", alignItems: "center", gap: 6, background: `${lv.color}12`, borderRadius: 50, padding: "5px 14px" }}>
                <span style={{ fontSize: 14 }}>{lv.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: lv.color }}>{lv.name}</span>
              </div>
              <div style={{ textAlign: "center", padding: 32 }}>
                <div style={{ fontSize: 64, marginBottom: 12 }}>{lv.photo}</div>
                <p style={{ fontFamily: F.display, fontSize: 15, color: T.navy }}>{lv.photoLabel}</p>
                <p style={{ fontSize: 12, color: T.muted, marginTop: 6 }}>Imagen real del Centro Lápiz en Mano</p>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "40px 40px 40px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${lv.color}10`, borderRadius: 50, padding: "5px 14px", marginBottom: 16, alignSelf: "flex-start" }}>
                <span style={{ fontFamily: F.display, fontSize: 14, color: lv.color }}>{lv.age}</span>
              </div>

              <h3 style={{ fontFamily: F.display, fontSize: 30, color: T.navy, marginBottom: 14, lineHeight: 1.15 }}>{lv.name}</h3>
              <p style={{ fontSize: 15, color: T.body, lineHeight: 1.75, marginBottom: 28 }}>{lv.desc}</p>

              <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Enfoque de esta etapa</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {lv.highlights.map(h => (
                  <div key={h} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: lv.bg, fontSize: 13, fontWeight: 500, color: T.body }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: lv.color, flexShrink: 0 }} />
                    {h}
                  </div>
                ))}
              </div>
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
    <section id="servicios" style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cloud, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(36,102,168,.12)` }}>
              <span style={{ fontSize: 13 }}>🩺</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.blue, letterSpacing: 1.5, textTransform: "uppercase" }}>Servicios terapéuticos</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>8 áreas de intervención</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Cada área trabaja de forma coordinada para ofrecer una atención verdaderamente integral.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px" }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: 14,
                      background: isOpen ? `linear-gradient(135deg, ${s.color}, ${s.color}cc)` : s.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, flexShrink: 0, transition: "all .3s",
                      boxShadow: isOpen ? `0 4px 16px ${s.color}25` : "none",
                    }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 16, fontWeight: 600, color: T.navy, lineHeight: 1.3 }}>{s.name}</h4>
                      {!isOpen && <p style={{ fontSize: 13, color: T.muted, marginTop: 3, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.desc}</p>}
                    </div>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: isOpen ? `${s.color}12` : T.offWhite, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: isOpen ? s.color : T.muted, flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "all .3s" }}>▾</div>
                  </div>

                  {/* Expanded content */}
                  <div style={{ maxHeight: isOpen ? 300 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" }}>
                    <div style={{ padding: "0 24px 24px 90px" }}>
                      <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        {s.details.map(d => (
                          <div key={d} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: s.bg, fontSize: 12.5, fontWeight: 500, color: T.body }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                            {d}
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

/* ═══ PARENTS SECTION ═══ */
function ParentsSection() {
  return (
    <section style={{ padding: "80px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fdf2f8", borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: "1px solid rgba(232,67,147,.12)" }}>
              <span style={{ fontSize: 13 }}>👨‍👩‍👧</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#e84393", letterSpacing: 1.5, textTransform: "uppercase" }}>Para los padres</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(26px,3vw,38px)", color: T.navy, marginBottom: 14 }}>La familia es parte del equipo</h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { icon: "🎥", title: "Sesiones virtuales gratuitas", desc: "Orientación personalizada sobre el proceso y desarrollo de su hijo, desde las áreas de Trabajo Social y Psicología, considerando sus características individuales.", bg: T.cloud },
            { icon: "🤝", title: "Red de apoyo para padres", desc: "Espacio de acompañamiento y contención donde las familias comparten experiencias, fortalecen vínculos y crecen juntas en el proceso de crianza y desarrollo.", bg: T.cream },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * .1}>
              <div style={{ background: T.white, borderRadius: 22, padding: "36px 32px", border: `1px solid ${T.border}`, height: "100%", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 16, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>{item.icon}</div>
                <h4 style={{ fontFamily: F.display, fontSize: 20, color: T.navy, marginBottom: 10 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ ENROLLMENT CTA ═══ */
function EnrollmentCta() {
  return (
    <section style={{ padding: "80px 32px", background: `linear-gradient(155deg, ${T.navy} 0%, #163a60 50%, ${T.blue} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,168,56,.06),transparent 70%)" }} />
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", padding: "56px 48px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🌟</div>
            <h3 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,38px)", color: "#fff", marginBottom: 10, lineHeight: 1.15 }}>
              Inscripciones abiertas — Gestión 2026
            </h3>
            <p style={{ fontFamily: F.display, fontSize: 18, color: "rgba(255,255,255,.45)", fontStyle: "italic", marginBottom: 24 }}>
              "El síndrome de Down no es una barrera, sino una manera diferente y valiosa de aprender, crecer y desarrollar todo su potencial."
            </p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
              Contamos con cupos limitados porque priorizamos la calidad, el acompañamiento cercano
              y una atención verdaderamente significativa.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", borderRadius: 50, fontWeight: 700, fontSize: 16, background: "#25d366", color: "#fff", textDecoration: "none", boxShadow: "0 6px 24px rgba(37,211,102,.3)", transition: "all .25s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              ><span style={{ fontSize: 20 }}>💬</span>Reservar cupo — 70106276</a>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.3)", marginTop: 20 }}>Inicio oficial de clases: Febrero 2026</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function EscuelitaDownPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <KeyFacts />
      <LevelsJourney />
      <ServicesSection />
      <ParentsSection />
      <EnrollmentCta />
    </div>
  );
}
