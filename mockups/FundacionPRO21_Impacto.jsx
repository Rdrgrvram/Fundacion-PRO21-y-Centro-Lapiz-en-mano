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

/* ═══ ANIMATED COUNTER ═══ */
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  const num = parseInt(end);

  useEffect(() => {
    if (!visible || isNaN(num)) return;
    let start = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, num, duration]);

  return <span ref={ref}>{isNaN(num) ? end : count}{suffix}</span>;
}

/* ═══ DATA ═══ */
const IMPACT_STATS = [
  { value: "100", suffix: "+", label: "Familias acompañadas", icon: "👨‍👩‍👧", color: T.blue, bg: T.cloud },
  { value: "3", suffix: "", label: "Programas activos", icon: "📋", color: T.coral, bg: T.peach },
  { value: "5", suffix: "+", label: "Años de servicio", icon: "🏛", color: T.teal, bg: T.mint },
  { value: "20", suffix: "+", label: "Profesionales", icon: "🩺", color: T.green, bg: T.leaf },
  { value: "8", suffix: "", label: "Áreas terapéuticas", icon: "🧩", color: T.purple, bg: T.lavender },
  { value: "1000", suffix: "+", label: "Sesiones al año", icon: "📅", color: T.gold, bg: T.cream },
];

const TESTIMONIALS = [
  {
    quote: "Cuando recibimos el diagnóstico sentimos que el mundo se detenía. En Lápiz en Mano encontramos no solo terapia, sino una familia que nos enseñó a ver las capacidades antes que las limitaciones.",
    family: "Familia Quispe",
    program: "Mi Escuelita Down",
    emoji: "🌟", color: T.blue,
  },
  {
    quote: "Mi hijo no hablaba a los 3 años. Después de un año en Aula Wawitas, no solo dice palabras — canta canciones. Cada logro que parece pequeño para otros, para nosotros es un universo.",
    family: "Familia Mamani",
    program: "Aula Wawitas",
    emoji: "🧩", color: T.coral,
  },
  {
    quote: "Los profesores decían que era flojo. Aquí descubrieron que tiene dislexia. Le enseñaron a aprender de otra forma y sus notas cambiaron, pero lo más importante: su autoestima volvió.",
    family: "Familia Condori",
    program: "Pasos Firmes",
    emoji: "📚", color: T.green,
  },
];

const REPORTS = [
  { year: "2025", title: "Informe anual de gestión 2025", desc: "Resultados, cifras de atención, uso de recursos y proyección institucional.", icon: "📊", status: "Disponible" },
  { year: "2024", title: "Informe anual de gestión 2024", desc: "Segundo año de operaciones con tres programas activos.", icon: "📊", status: "Disponible" },
  { year: "2023", title: "Informe anual de gestión 2023", desc: "Lanzamiento de Aula Wawitas y expansión del equipo.", icon: "📊", status: "Disponible" },
  { year: "2022", title: "Informe anual de gestión 2022", desc: "Constitución de Fundación PRO-21 y consolidación institucional.", icon: "📊", status: "Disponible" },
];

const MEDIA = [
  { outlet: "Red Uno", type: "Televisión", desc: "Cobertura del incidente durante los conflictos sociales en La Paz, visibilizando el trabajo de la fundación.", year: "2026", color: "#e53935" },
  { outlet: "ATB Digital", type: "Televisión", desc: "Reportaje sobre los programas de inclusión educativa para niños con síndrome de Down en Bolivia.", year: "2026", color: "#1565c0" },
  { outlet: "Página Siete", type: "Prensa escrita", desc: "Artículo sobre la labor del Centro Lápiz en Mano y la importancia de la estimulación temprana.", year: "2025", color: "#2e7d32" },
  { outlet: "Redes internacionales", type: "Digital", desc: "Organizaciones internacionales se hacen eco del trabajo de la fundación tras la cobertura mediática.", year: "2026", color: "#6a1b9a" },
];

/* ═══ HERO ═══ */
function Hero() {
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
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes count-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-6%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,168,56,.05),transparent 70%)" }} />
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 40C360 70 720 15 1080 45C1260 60 1380 50 1440 48V80H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "130px 32px 90px", textAlign: "center", position: "relative", zIndex: 3 }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .15s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.07)", borderRadius: 50, padding: "6px 18px 6px 10px", marginBottom: 24, border: "1px solid rgba(255,255,255,.1)" }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✦</span>
            <span style={{ color: "rgba(255,255,255,.8)", fontSize: 13, fontWeight: 500 }}>Impacto y transparencia</span>
          </div>
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px,5vw,54px)", color: "#fff", lineHeight: 1.1, marginBottom: 18, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .25s" }}>
          Historias que{" "}
          <span style={{ fontStyle: "italic", color: T.honey }}>transforman</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 580, margin: "0 auto", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .4s" }}>
          Detrás de cada cifra hay una familia que encontró esperanza. Detrás de cada informe hay un compromiso con la transparencia. Aquí mostramos ambos.
        </p>
      </div>
    </section>
  );
}

/* ═══ IMPACT NUMBERS ═══ */
function ImpactNumbers() {
  return (
    <section style={{ padding: "60px 32px 72px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cream, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,168,56,.15)` }}>
              <span style={{ fontSize: 13 }}>📊</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Nuestras cifras</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>El impacto en números</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Cifras que hablan del compromiso diario con cada niño y cada familia.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {IMPACT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * .06}>
              <div style={{
                textAlign: "center", padding: "36px 20px", borderRadius: 22,
                background: T.white, border: `1px solid ${T.border}`,
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}10`; e.currentTarget.style.borderColor = `${s.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 16, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 16px" }}>{s.icon}</div>
                <div style={{ fontFamily: F.display, fontSize: 44, color: s.color, lineHeight: 1 }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 14, color: T.muted, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 8000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.roseBg, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,67,147,.1)` }}>
              <span style={{ fontSize: 13 }}>💛</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.rose, letterSpacing: 1.5, textTransform: "uppercase" }}>Testimonios</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Lo que dicen las familias</h2>
          </div>
        </Reveal>

        {/* Main testimonial card */}
        <div key={active} style={{ animation: "fadeSlideUp .6s cubic-bezier(.16,1,.3,1)" }}>
          <div style={{
            background: T.white, borderRadius: 28, padding: "48px 52px",
            border: `1px solid ${T.border}`, position: "relative",
            boxShadow: "0 8px 32px rgba(0,0,0,.04)",
          }}>
            {/* Quote mark */}
            <div style={{ position: "absolute", top: 24, left: 36, fontFamily: F.display, fontSize: 100, color: `${t.color}10`, lineHeight: 1, pointerEvents: "none" }}>"</div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: F.display, fontSize: 22, color: T.navy, lineHeight: 1.6, fontStyle: "italic", marginBottom: 28 }}>
                "{t.quote}"
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: `0 4px 16px ${t.color}25` }}>{t.emoji}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.navy }}>{t.family}</div>
                    <div style={{ fontSize: 13, color: t.color, fontWeight: 500 }}>{t.program}</div>
                  </div>
                </div>

                {/* Dots */}
                <div style={{ display: "flex", gap: 8 }}>
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)} style={{
                      width: i === active ? 28 : 10, height: 10, borderRadius: 5,
                      background: i === active ? T.gold : T.border,
                      border: "none", cursor: "pointer",
                      transition: "all .3s",
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small cards below */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 20 }}>
          {TESTIMONIALS.map((tm, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              padding: "16px 20px", borderRadius: 16, cursor: "pointer",
              background: i === active ? `${tm.color}08` : T.white,
              border: `1.5px solid ${i === active ? tm.color : T.border}`,
              transition: "all .3s",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>{tm.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{tm.family}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{tm.program}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ TRANSPARENCY / REPORTS ═══ */
function TransparencySection() {
  return (
    <section style={{ padding: "88px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cloud, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(36,102,168,.12)` }}>
              <span style={{ fontSize: 13 }}>🔍</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.blue, letterSpacing: 1.5, textTransform: "uppercase" }}>Transparencia</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Rendición de cuentas</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              La confianza se construye con hechos. Publicamos informes anuales para que cada cooperante, donante y familia sepa exactamente cómo se utilizan los recursos.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Reports list */}
          <Reveal delay={.05}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 18 }}>Informes anuales de gestión</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {REPORTS.map((r, i) => (
                  <div key={r.year} style={{
                    display: "flex", alignItems: "center", gap: 18,
                    padding: "22px 24px", borderRadius: 18,
                    background: T.white, border: `1px solid ${T.border}`,
                    transition: "all .25s", cursor: "pointer",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.05)"; e.currentTarget.style.borderColor = `${T.blue}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
                  >
                    <div style={{
                      width: 54, height: 54, borderRadius: 14,
                      background: i === 0 ? `linear-gradient(135deg, ${T.blue}, ${T.teal})` : T.cloud,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, flexShrink: 0,
                      boxShadow: i === 0 ? `0 4px 16px ${T.blue}20` : "none",
                    }}>{r.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: T.navy }}>{r.title}</div>
                      <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>{r.desc}</div>
                    </div>
                    <div style={{
                      padding: "5px 14px", borderRadius: 50, fontSize: 11, fontWeight: 600,
                      background: i === 0 ? T.leaf : T.offWhite,
                      color: i === 0 ? T.green : T.muted,
                    }}>{r.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* What the reports include */}
          <Reveal delay={.15}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 18 }}>¿Qué incluyen nuestros informes?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "👨‍👩‍👧", title: "Familias atendidas", desc: "Número de niños en cada programa, nuevos ingresos y egresos durante el año.", bg: T.cloud },
                  { icon: "💰", title: "Uso de recursos", desc: "Detalle de ingresos por donaciones, cuotas y cooperación, y su distribución por programa.", bg: T.cream },
                  { icon: "📈", title: "Resultados terapéuticos", desc: "Indicadores de avance en las áreas de intervención, medidos con instrumentos estandarizados.", bg: T.mint },
                  { icon: "🎯", title: "Objetivos y metas", desc: "Grado de cumplimiento de los objetivos del plan anual y proyección para el siguiente periodo.", bg: T.lavender },
                  { icon: "🤝", title: "Alianzas y cooperación", desc: "Convenios firmados, proyectos con cooperación internacional y nuevas alianzas estratégicas.", bg: T.leaf },
                ].map((item, i) => (
                  <div key={item.title} style={{
                    display: "flex", alignItems: "flex-start", gap: 16,
                    padding: "20px 22px", borderRadius: 16,
                    background: T.white, border: `1px solid ${T.border}`,
                    transition: "all .25s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.navy }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══ MEDIA COVERAGE ═══ */
function MediaSection() {
  return (
    <section style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.peach, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,104,64,.12)` }}>
              <span style={{ fontSize: 13 }}>📰</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.coral, letterSpacing: 1.5, textTransform: "uppercase" }}>En los medios</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Repercusión mediática</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Nuestra labor ha trascendido fronteras. Medios nacionales e internacionales han visibilizado el trabajo que realizamos por la inclusión en Bolivia.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
          {MEDIA.map((m, i) => (
            <Reveal key={m.outlet} delay={i * .08}>
              <div style={{
                background: T.white, borderRadius: 22, overflow: "hidden",
                border: `1px solid ${T.border}`, transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ height: 4, background: `linear-gradient(90deg, ${m.color}, ${m.color}88)` }} />
                <div style={{ padding: "28px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${m.color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 20, height: 20, borderRadius: 4, background: m.color, opacity: .7 }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: T.navy }}>{m.outlet}</div>
                        <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{m.type}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.muted, background: T.offWhite, padding: "4px 12px", borderRadius: 50 }}>{m.year}</span>
                  </div>
                  <p style={{ fontSize: 14, color: T.body, lineHeight: 1.65 }}>{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ GALLERY PLACEHOLDER ═══ */
function GallerySection() {
  const categories = ["Todos", "Mi Escuelita", "Aula Wawitas", "Pasos Firmes", "Eventos"];
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <section style={{ padding: "88px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.mint, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(26,138,125,.12)` }}>
              <span style={{ fontSize: 13 }}>📷</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>Galería</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Momentos que nos inspiran</h2>
          </div>
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={.05}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {categories.map((c, i) => (
              <button key={c} onClick={() => setActiveFilter(i)} style={{
                padding: "10px 22px", borderRadius: 50, border: `1.5px solid ${activeFilter === i ? T.teal : T.border}`,
                background: activeFilter === i ? T.mint : T.white,
                color: activeFilter === i ? T.teal : T.body,
                fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: F.body,
                transition: "all .25s",
              }}>{c}</button>
            ))}
          </div>
        </Reveal>

        {/* Photo grid placeholders */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[...Array(8)].map((_, i) => {
            const heights = [220, 280, 240, 260, 260, 220, 280, 240];
            const emojis = ["🎨", "🤸", "📖", "🧩", "🎵", "👶", "🌟", "🧠"];
            return (
              <Reveal key={i} delay={i * .04}>
                <div style={{
                  height: heights[i], borderRadius: 18,
                  background: `linear-gradient(145deg, ${[T.cloud, T.cream, T.mint, T.peach, T.leaf, T.lavender, T.cloud, T.cream][i]}, ${T.white})`,
                  border: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: 8,
                  transition: "all .3s", cursor: "pointer",
                  overflow: "hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: 36, opacity: .4 }}>{emojis[i]}</div>
                  <span style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>Foto {i + 1}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={.2}>
          <p style={{ textAlign: "center", fontSize: 13, color: T.muted, marginTop: 20, fontStyle: "italic" }}>
            Las fotografías serán proporcionadas por la fundación con autorización de las familias.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CtaSection() {
  return (
    <section style={{ padding: "80px 32px", background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 100%)` }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 28, border: "1px solid rgba(255,255,255,.08)", padding: "56px 48px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>🌍</div>
            <h3 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,36px)", color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>
              ¿Quieres ser parte de esta transformación?
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
              Cada donación, cada alianza y cada hora de voluntariado multiplica nuestro impacto. Juntos podemos llegar a más familias.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#colabora" style={{ padding: "15px 36px", borderRadius: 50, fontWeight: 700, fontSize: 15, background: T.gold, color: T.navy, textDecoration: "none", boxShadow: `0 6px 24px ${T.gold}30`, transition: "all .25s" }}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "none"}
              >Colaborar ahora</a>
              <a href="#contacto" style={{ padding: "15px 36px", borderRadius: 50, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,.2)", color: "#fff", textDecoration: "none", transition: "all .25s" }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,.5)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,.2)"; }}
              >Descargar último informe</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function ImpactoPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <ImpactNumbers />
      <TestimonialsSection />
      <TransparencySection />
      <MediaSection />
      <GallerySection />
      <CtaSection />
    </div>
  );
}
