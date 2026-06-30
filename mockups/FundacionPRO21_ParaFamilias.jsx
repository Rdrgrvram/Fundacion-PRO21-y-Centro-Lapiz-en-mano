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
const VIRTUAL_SESSIONS = [
  { title: "Orientación psicológica", icon: "🧠", desc: "Sesiones individuales con psicólogos para abordar el impacto emocional del diagnóstico, manejar la ansiedad, el duelo y la culpa, y fortalecer la salud mental de los padres.", freq: "Semanal", duration: "45 min", color: T.purple, bg: T.lavender },
  { title: "Trabajo social", icon: "🤝", desc: "Orientación sobre derechos, acceso a servicios públicos, trámites de discapacidad, becas educativas y redes de apoyo institucional disponibles en Bolivia.", freq: "Quincenal", duration: "60 min", color: T.teal, bg: T.mint },
  { title: "Charlas temáticas", icon: "🎓", desc: "Talleres formativos sobre temas como estimulación en casa, manejo de conducta, alimentación, sexualidad, autonomía y transición a la vida adulta.", freq: "Mensual", duration: "90 min", color: T.coral, bg: T.peach },
  { title: "Interconsulta con especialistas", icon: "🩺", desc: "Sesiones donde los padres pueden hacer preguntas directas al fisioterapeuta, fonoaudiólogo o terapeuta conductual de su hijo sobre el progreso y las estrategias.", freq: "Mensual", duration: "30 min", color: T.blue, bg: T.cloud },
];

const SUPPORT_NETWORK = [
  { title: "Encuentros presenciales", icon: "☕", desc: "Reuniones mensuales en el Centro Lápiz en Mano donde las familias comparten experiencias, celebran logros y se apoyan mutuamente en un espacio seguro y libre de juicio.", color: T.gold },
  { title: "Grupo de WhatsApp", icon: "📱", desc: "Comunidad activa de padres y madres donde compartir recursos, resolver dudas cotidianas, coordinar actividades y sentir el acompañamiento diario de familias que entienden.", color: T.green },
  { title: "Padres mentores", icon: "💛", desc: "Familias con más tiempo en la fundación acompañan a las familias nuevas durante sus primeros meses, compartiendo su experiencia y dando contención emocional desde la vivencia.", color: T.rose },
  { title: "Eventos familiares", icon: "🎉", desc: "Celebraciones, paseos inclusivos, talleres recreativos y actividades donde los niños y sus familias disfrutan juntos en un entorno de aceptación y alegría.", color: T.coral },
];

const GUIDES = [
  { title: "Guía de estimulación temprana en casa", icon: "👶", desc: "Actividades prácticas organizadas por edad para estimular el desarrollo de tu hijo desde el hogar.", pages: "24 págs.", program: "Mi Escuelita Down", color: T.blue, bg: T.cloud },
  { title: "Estrategias para el manejo de conducta", icon: "🧩", desc: "Técnicas basadas en evidencia para abordar conductas desafiantes con paciencia y efectividad.", pages: "18 págs.", program: "Aula Wawitas", color: T.coral, bg: T.peach },
  { title: "Cómo apoyar las tareas escolares", icon: "📚", desc: "Guía práctica para padres de niños con dificultades de aprendizaje: organización, técnicas y motivación.", pages: "20 págs.", program: "Pasos Firmes", color: T.green, bg: T.leaf },
  { title: "Derechos de las personas con discapacidad en Bolivia", icon: "⚖️", desc: "Resumen de la normativa boliviana, trámites de certificación, acceso a salud, educación y beneficios.", pages: "16 págs.", program: "Todos los programas", color: T.purple, bg: T.lavender },
  { title: "Pictogramas para la rutina diaria", icon: "🖼️", desc: "Set descargable de pictogramas para estructurar rutinas visuales: higiene, alimentación, escuela y ocio.", pages: "12 láminas", program: "Aula Wawitas", color: T.teal, bg: T.mint },
  { title: "Guía de alimentación y nutrición", icon: "🥗", desc: "Recomendaciones nutricionales, manejo de selectividad alimentaria y recetas adaptadas para niños con TEA.", pages: "22 págs.", program: "Aula Wawitas", color: T.gold, bg: T.cream },
];

const FAQ = [
  { q: "¿Necesito un diagnóstico para inscribir a mi hijo?", a: "No. Si observas señales que te preocupan o tu hijo tiene dificultades en algún área del desarrollo o el aprendizaje, puedes consultarnos directamente. Nuestro equipo realizará una evaluación integral como primer paso." },
  { q: "¿Cuánto cuesta el programa?", a: "Cada programa tiene una cuota mensual accesible. Para familias con dificultades económicas, contamos con un sistema de becas parciales y totales financiadas por donaciones. Ningún niño deja de recibir atención por razones económicas." },
  { q: "¿Con qué frecuencia son las terapias?", a: "Depende del plan de intervención de cada niño. Generalmente las sesiones son de 2 a 4 veces por semana, combinando distintas áreas terapéuticas. El plan se diseña junto con la familia." },
  { q: "¿Mi hijo puede asistir a una escuela regular al mismo tiempo?", a: "Sí, y lo promovemos activamente. Los niños de Mi Escuelita Inclusiva Down asisten tanto al Centro Lápiz en Mano como a su unidad educativa de origen. Nuestro enfoque es la inclusión educativa, no la segregación." },
  { q: "¿Ofrecen atención en horarios flexibles?", a: "Sí. Entendemos que muchas familias trabajan. Coordinamos los horarios de las sesiones terapéuticas para adaptarnos a las necesidades de cada familia, incluyendo opciones en la tarde." },
  { q: "¿Qué pasa si vivimos fuera de La Paz?", a: "Ofrecemos sesiones virtuales gratuitas de orientación para familias de cualquier parte de Bolivia. Para la atención presencial, recibimos familias que puedan desplazarse a nuestro centro en La Paz." },
  { q: "¿Cómo puedo saber cuál programa es el adecuado para mi hijo?", a: "Agenda una evaluación inicial gratuita. Nuestro equipo multidisciplinario evaluará a tu hijo y te recomendará el programa y las áreas de intervención más adecuadas para sus necesidades." },
  { q: "¿Los padres participan en las terapias?", a: "Sí. Consideramos a la familia como parte fundamental del proceso. Los padres participan en sesiones de orientación, reciben estrategias para el hogar, y son bienvenidos a observar las sesiones cuando el terapeuta lo considere apropiado." },
];

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 520, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, #2d0a1e 0%, #6b234e 40%, ${T.rose} 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes gentle-glow{0%,100%{box-shadow:0 0 20px rgba(232,67,147,.15)}50%{box-shadow:0 0 40px rgba(232,67,147,.25)}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-6%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,194,66,.05),transparent 70%)" }} />
        {["👨‍👩‍👧", "💛", "🏠", "📖"].map((e, i) => (
          <div key={i} style={{ position: "absolute", fontSize: 20 + i * 6, opacity: .05, left: `${8 + i * 22}%`, top: `${15 + (i % 3) * 25}%`, animation: `float ${4 + i * .7}s ease-in-out infinite`, animationDelay: `${i * .8}s` }}>{e}</div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 45C320 20 640 60 960 35C1200 15 1380 40 1440 38V80H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "130px 32px 90px", textAlign: "center", position: "relative", zIndex: 3 }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .15s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", borderRadius: 50, padding: "6px 18px 6px 10px", marginBottom: 24, border: "1px solid rgba(255,255,255,.1)" }}>
            <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${T.honey}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>👨‍👩‍👧</span>
            <span style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 500 }}>Para las familias</span>
          </div>
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px,5vw,54px)", color: "#fff", lineHeight: 1.1, marginBottom: 18, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .25s" }}>
          No caminan{" "}
          <span style={{ fontStyle: "italic", color: T.honey }}>solos</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 580, margin: "0 auto", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .4s" }}>
          Sabemos que detrás de cada niño que atendemos hay una familia que también necesita
          acompañamiento, formación y contención. Este espacio es para ustedes.
        </p>
      </div>
    </section>
  );
}

/* ═══ OPENING MESSAGE ═══ */
function OpeningMessage() {
  return (
    <section style={{ padding: "64px 32px 48px", background: T.offWhite }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            background: `linear-gradient(135deg, ${T.roseBg}, ${T.cream})`,
            borderRadius: 28, padding: "44px 44px", border: `1px solid rgba(232,67,147,.08)`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: .04, pointerEvents: "none" }}>💛</div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 28, alignItems: "flex-start" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18, flexShrink: 0,
                background: `linear-gradient(135deg, ${T.rose}, ${T.coral})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, boxShadow: `0 8px 24px ${T.rose}25`,
              }}>💌</div>
              <div>
                <h3 style={{ fontFamily: F.display, fontSize: 24, color: T.navy, marginBottom: 12, lineHeight: 1.2 }}>
                  Querida familia,
                </h3>
                <p style={{ fontSize: 16, color: T.body, lineHeight: 1.8 }}>
                  Recibir un diagnóstico es un momento que cambia la vida. Sentir miedo, confusión o tristeza es completamente
                  normal — y no significa que estés solo. Estamos aquí para acompañarte en cada paso: con información clara,
                  apoyo emocional y una comunidad de familias que entienden exactamente lo que estás viviendo.
                </p>
                <p style={{ fontSize: 15, color: T.rose, fontWeight: 600, marginTop: 14, fontStyle: "italic" }}>
                  — El equipo de Fundación PRO-21 y Centro Lápiz en Mano
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ VIRTUAL SESSIONS ═══ */
function VirtualSessions() {
  return (
    <section id="sesiones" style={{ padding: "64px 32px 88px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.lavender, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(108,92,231,.12)` }}>
              <span style={{ fontSize: 13 }}>🎥</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.purple, letterSpacing: 1.5, textTransform: "uppercase" }}>Sesiones virtuales gratuitas</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Orientación profesional desde casa</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Sesiones sin costo con profesionales de nuestro equipo, diseñadas para acompañar a las familias en cada etapa del proceso.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
          {VIRTUAL_SESSIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * .08}>
              <div style={{
                background: T.white, borderRadius: 22, overflow: "hidden",
                border: `1px solid ${T.border}`, height: "100%",
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}10`; e.currentTarget.style.borderColor = `${s.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{ height: 4, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }} />
                <div style={{ padding: "30px 28px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: s.bg, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 26, flexShrink: 0,
                    }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontFamily: F.display, fontSize: 20, color: T.navy, marginBottom: 6 }}>{s.title}</h4>
                      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 50, background: s.bg, color: s.color }}>{s.freq}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 50, background: T.offWhite, color: T.muted }}>⏱ {s.duration}</span>
                      </div>
                      <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7 }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={.2}>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: T.mint, borderRadius: 16, padding: "14px 24px", border: `1px solid rgba(26,138,125,.1)` }}>
              <span style={{ fontSize: 18 }}>✅</span>
              <p style={{ fontSize: 13, color: T.body }}><strong style={{ color: T.teal }}>100% gratuitas.</strong> No necesitas estar inscrito en un programa para acceder a estas sesiones.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ SUPPORT NETWORK ═══ */
function SupportNetwork() {
  return (
    <section id="red" style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.roseBg, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,67,147,.1)` }}>
              <span style={{ fontSize: 13 }}>🤝</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.rose, letterSpacing: 1.5, textTransform: "uppercase" }}>Red de apoyo</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Nadie entiende mejor que quien lo vive</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Una comunidad de padres y madres que comparten el camino, se fortalecen mutuamente y celebran cada logro juntos.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
          {SUPPORT_NETWORK.map((item, i) => (
            <Reveal key={item.title} delay={i * .08}>
              <div style={{
                background: T.white, borderRadius: 22, padding: "32px 28px",
                border: `1px solid ${T.border}`, height: "100%",
                display: "flex", alignItems: "flex-start", gap: 20,
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${item.color}10`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0, boxShadow: `0 6px 20px ${item.color}20`,
                }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontFamily: F.display, fontSize: 20, color: T.navy, marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ DOWNLOADABLE GUIDES ═══ */
function GuidesSection() {
  return (
    <section id="guias" style={{ padding: "88px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cloud, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(36,102,168,.12)` }}>
              <span style={{ fontSize: 13 }}>📄</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.blue, letterSpacing: 1.5, textTransform: "uppercase" }}>Recursos descargables</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Guías prácticas para el hogar</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Material elaborado por nuestro equipo profesional, diseñado para que puedas aplicar estrategias efectivas desde casa.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {GUIDES.map((g, i) => (
            <Reveal key={g.title} delay={i * .06}>
              <div style={{
                background: T.white, borderRadius: 22, overflow: "hidden",
                border: `1px solid ${T.border}`, height: "100%",
                display: "flex", flexDirection: "column",
                transition: "all .3s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${g.color}10`; e.currentTarget.style.borderColor = `${g.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                {/* Visual header */}
                <div style={{
                  height: 100, background: `linear-gradient(135deg, ${g.bg}, ${T.white})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <span style={{ fontSize: 40 }}>{g.icon}</span>
                  <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 50, background: `${g.color}10`, color: g.color }}>{g.pages}</div>
                </div>

                <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: g.color, marginBottom: 6 }}>{g.program}</span>
                  <h4 style={{ fontFamily: F.display, fontSize: 16, color: T.navy, marginBottom: 8, lineHeight: 1.25, flex: 1 }}>{g.title}</h4>
                  <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, marginBottom: 16 }}>{g.desc}</p>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "10px", borderRadius: 12, background: g.bg,
                    fontSize: 13, fontWeight: 600, color: g.color,
                    border: `1px solid ${g.color}15`,
                  }}>
                    <span style={{ fontSize: 16 }}>⬇️</span> Descargar PDF
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={.25}>
          <p style={{ textAlign: "center", fontSize: 13, color: T.muted, marginTop: 24, fontStyle: "italic" }}>
            Las guías se actualizan periódicamente con nuevos contenidos. Vuelve a visitarnos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cream, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,168,56,.15)` }}>
              <span style={{ fontSize: 13 }}>❓</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Preguntas frecuentes</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Las dudas más comunes</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Si tu pregunta no está aquí, escríbenos por WhatsApp y te respondemos en menos de 24 horas.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * .04}>
                <div onClick={() => setOpen(isOpen ? null : i)} style={{
                  background: T.white, borderRadius: 18, overflow: "hidden",
                  border: `1.5px solid ${isOpen ? T.gold : T.border}`,
                  boxShadow: isOpen ? `0 8px 28px ${T.gold}08` : "0 1px 4px rgba(0,0,0,.02)",
                  transition: "all .35s cubic-bezier(.16,1,.3,1)", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: isOpen ? `linear-gradient(135deg, ${T.gold}, ${T.honey})` : T.cream,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 700, color: isOpen ? T.navy : T.gold,
                      flexShrink: 0, transition: "all .3s",
                      fontFamily: F.display,
                    }}>{i + 1}</div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: T.navy, flex: 1, lineHeight: 1.4 }}>{faq.q}</h4>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: isOpen ? `${T.gold}15` : T.offWhite,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: isOpen ? T.gold : T.muted, flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "none", transition: "all .3s",
                    }}>▾</div>
                  </div>

                  <div style={{ maxHeight: isOpen ? 250 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" }}>
                    <div style={{ padding: "0 24px 24px 76px" }}>
                      <p style={{ fontSize: 14, color: T.body, lineHeight: 1.75 }}>{faq.a}</p>
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

/* ═══ CTA ═══ */
function CtaSection() {
  return (
    <section style={{ padding: "80px 32px", background: `linear-gradient(155deg, #2d0a1e 0%, #6b234e 50%, ${T.rose} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 120 + i * 100, height: 120 + i * 100, borderRadius: "50%", border: "1px solid rgba(255,255,255,.03)", transform: "translate(-50%,-50%)" }} />
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", padding: "56px 48px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>💛</div>
            <h3 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,38px)", color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
              ¿Necesitas orientación?
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 12px" }}>
              Si acabas de recibir un diagnóstico, si tienes dudas sobre el desarrollo de tu hijo, o si simplemente necesitas alguien que te escuche — estamos aquí.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", marginBottom: 32 }}>
              La primera consulta es gratuita. Sin compromisos.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 36px", borderRadius: 50, fontWeight: 700, fontSize: 16,
                background: "#25d366", color: "#fff", textDecoration: "none",
                boxShadow: "0 6px 24px rgba(37,211,102,.3)", transition: "all .25s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              ><span style={{ fontSize: 20 }}>💬</span>Escríbenos al 70106276</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function ParaFamiliasPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <OpeningMessage />
      <VirtualSessions />
      <SupportNetwork />
      <GuidesSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
