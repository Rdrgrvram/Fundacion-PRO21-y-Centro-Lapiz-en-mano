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
const CATEGORIES = [
  { label: "Todos", color: T.navy },
  { label: "Noticias", color: T.blue },
  { label: "Campañas", color: T.coral },
  { label: "Eventos", color: T.purple },
  { label: "Inclusión", color: T.teal },
  { label: "Prensa", color: T.gold },
];

const FEATURED = {
  title: "La fundación que no se detuvo: cómo un incidente de violencia visibilizó el trabajo por la inclusión en Bolivia",
  excerpt: "Durante los conflictos sociales en La Paz, un vehículo que transportaba a niños con síndrome de Down hacia sus terapias fue agredido. Lo que siguió fue una ola de solidaridad nacional e internacional que puso los ojos del mundo en el Centro Lápiz en Mano.",
  date: "Mayo 2026",
  category: "Prensa",
  catColor: T.gold,
  readTime: "8 min",
  emoji: "📰",
};

const ARTICLES = [
  { title: "Inscripciones abiertas: Mi Escuelita Inclusiva Down — Gestión 2026", excerpt: "Abrimos nuestras puertas para la gestión 2026 invitando a las familias a formar parte de un espacio educativo inclusivo, humano y especializado.", date: "Enero 2026", category: "Noticias", catColor: T.blue, readTime: "3 min", emoji: "🌟" },
  { title: "Día Mundial del Síndrome de Down: actividades y celebración", excerpt: "Cada 21 de marzo celebramos las capacidades, los logros y el valor de cada persona con síndrome de Down. Este año organizamos una jornada abierta a toda la comunidad.", date: "Marzo 2026", category: "Campañas", catColor: T.coral, readTime: "4 min", emoji: "💛" },
  { title: "Lanzamiento del programa Pasos Firmes para dificultades de aprendizaje", excerpt: "Nuestro tercer programa nace para atender a niños con dislexia, TDAH, discalculia y otras dificultades que afectan su desempeño escolar.", date: "Agosto 2024", category: "Noticias", catColor: T.blue, readTime: "5 min", emoji: "📚" },
  { title: "Campaña 'Mirar con otros ojos': sensibilización sobre autismo", excerpt: "Llevamos a colegios y empresas de La Paz talleres vivenciales para comprender el Trastorno del Espectro Autista desde la empatía y la información.", date: "Abril 2026", category: "Campañas", catColor: T.coral, readTime: "4 min", emoji: "🧩" },
  { title: "Taller para docentes: adaptaciones curriculares en el aula inclusiva", excerpt: "Capacitamos a 45 docentes de 12 unidades educativas de La Paz en estrategias prácticas para atender la diversidad en sus aulas.", date: "Junio 2025", category: "Eventos", catColor: T.purple, readTime: "5 min", emoji: "🏫" },
  { title: "La importancia de la detección temprana del autismo en Bolivia", excerpt: "Artículo de nuestro equipo profesional sobre por qué Bolivia necesita un protocolo nacional de screening para TEA en atención primaria.", date: "Febrero 2026", category: "Inclusión", catColor: T.teal, readTime: "7 min", emoji: "🔍" },
  { title: "Red Uno visita el Centro Lápiz en Mano: reportaje completo", excerpt: "El equipo de Red Uno Bolivia visitó nuestras instalaciones para conocer de cerca el trabajo diario con los niños y sus familias.", date: "Mayo 2026", category: "Prensa", catColor: T.gold, readTime: "3 min", emoji: "📺" },
  { title: "Alianza con la UCB: estudiantes desarrollarán nuestra web institucional", excerpt: "La Carrera de Ingeniería de Sistemas de la UCB se suma como aliado estratégico a través de un proyecto social de 320 horas profesionales.", date: "Mayo 2026", category: "Noticias", catColor: T.blue, readTime: "4 min", emoji: "🤝" },
];

const EVENTS = [
  { title: "Jornada de puertas abiertas", date: "15 Jun 2026", time: "09:00 - 12:00", location: "Centro Lápiz en Mano, La Paz", desc: "Ven a conocer nuestras instalaciones, conversar con el equipo y ver cómo trabajamos.", color: T.blue, icon: "🏠" },
  { title: "Taller: Estimulación en casa para padres", date: "22 Jun 2026", time: "15:00 - 17:00", location: "Virtual (Zoom)", desc: "Sesión práctica con nuestra fisioterapeuta sobre actividades de estimulación temprana.", color: T.teal, icon: "🎥" },
  { title: "Caminata por la inclusión", date: "13 Jul 2026", time: "08:00 - 11:00", location: "Prado, La Paz", desc: "Caminata familiar abierta a toda la comunidad. Porque la inclusión se construye paso a paso.", color: T.coral, icon: "🚶" },
  { title: "Feria de talentos inclusiva", date: "10 Ago 2026", time: "10:00 - 14:00", location: "Centro Lápiz en Mano, La Paz", desc: "Nuestros niños muestran sus habilidades artísticas, musicales y deportivas.", color: T.gold, icon: "🎨" },
];

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 460, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 45%, #1a4a7a 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 450, height: 450, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 70" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 35C360 60 720 15 1080 40C1260 52 1380 45 1440 42V70H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px 80px", textAlign: "center", position: "relative", zIndex: 3 }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .15s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.07)", borderRadius: 50, padding: "6px 18px 6px 10px", marginBottom: 24, border: "1px solid rgba(255,255,255,.1)" }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✦</span>
            <span style={{ color: "rgba(255,255,255,.8)", fontSize: 13, fontWeight: 500 }}>Blog y noticias</span>
          </div>
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(34px,4.5vw,50px)", color: "#fff", lineHeight: 1.1, marginBottom: 18, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .25s" }}>
          Lo que está{" "}
          <span style={{ fontStyle: "italic", color: T.honey }}>pasando</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 520, margin: "0 auto", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .4s" }}>
          Campañas, eventos, noticias de prensa y artículos sobre inclusión. Mantente al día con el trabajo de la fundación.
        </p>
      </div>
    </section>
  );
}

/* ═══ FEATURED ARTICLE ═══ */
function FeaturedArticle() {
  return (
    <section style={{ padding: "60px 32px 48px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
            background: T.white, borderRadius: 28, overflow: "hidden",
            border: `1px solid ${T.border}`, boxShadow: "0 8px 32px rgba(0,0,0,.04)",
            transition: "all .3s", cursor: "pointer",
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.04)"; e.currentTarget.style.transform = "none"; }}
          >
            {/* Image placeholder */}
            <div style={{
              background: `linear-gradient(145deg, ${T.cream}, ${T.cloud})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              minHeight: 340, position: "relative",
            }}>
              <div style={{ position: "absolute", top: 20, left: 20, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.9)", borderRadius: 50, padding: "5px 14px", backdropFilter: "blur(8px)" }}>
                <span style={{ fontSize: 12 }}>⭐</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.navy, letterSpacing: .5, textTransform: "uppercase" }}>Destacado</span>
              </div>
              <div style={{ textAlign: "center", padding: 32 }}>
                <div style={{ fontSize: 64, marginBottom: 12 }}>{FEATURED.emoji}</div>
                <p style={{ fontSize: 14, color: T.muted }}>Imagen del artículo</p>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 50, background: `${FEATURED.catColor}12`, color: FEATURED.catColor }}>{FEATURED.category}</span>
                <span style={{ fontSize: 12, color: T.muted }}>{FEATURED.date}</span>
                <span style={{ fontSize: 12, color: T.muted }}>·</span>
                <span style={{ fontSize: 12, color: T.muted }}>⏱ {FEATURED.readTime}</span>
              </div>
              <h2 style={{ fontFamily: F.display, fontSize: 26, color: T.navy, lineHeight: 1.25, marginBottom: 16 }}>{FEATURED.title}</h2>
              <p style={{ fontSize: 15, color: T.body, lineHeight: 1.75, marginBottom: 24 }}>{FEATURED.excerpt}</p>
              <div>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 14, fontWeight: 700, color: T.blue,
                }}>Leer artículo completo <span style={{ fontSize: 16 }}>→</span></span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ ARTICLES GRID ═══ */
function ArticlesGrid() {
  const [filter, setFilter] = useState(0);
  const filtered = filter === 0 ? ARTICLES : ARTICLES.filter(a => a.category === CATEGORIES[filter].label);

  return (
    <section style={{ padding: "48px 32px 88px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Filter bar */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((c, i) => (
                <button key={c.label} onClick={() => setFilter(i)} style={{
                  padding: "9px 20px", borderRadius: 50,
                  border: `1.5px solid ${filter === i ? c.color : T.border}`,
                  background: filter === i ? `${c.color}08` : T.white,
                  color: filter === i ? c.color : T.muted,
                  fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: F.body,
                  transition: "all .25s",
                }}>{c.label}</button>
              ))}
            </div>
            <span style={{ fontSize: 13, color: T.muted }}>{filtered.length} artículo{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </Reveal>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {filtered.map((a, i) => (
            <Reveal key={a.title} delay={i * .06}>
              <div onClick={() => { window.location.hash = "blog-post"; }} style={{
                background: T.white, borderRadius: 22, overflow: "hidden",
                border: `1px solid ${T.border}`, height: "100%",
                display: "flex", flexDirection: "column",
                transition: "all .3s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Thumbnail */}
                <div style={{
                  height: 160, background: `linear-gradient(135deg, ${a.catColor}10, ${T.offWhite})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <span style={{ fontSize: 44 }}>{a.emoji}</span>
                  <div style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 50, background: `${a.catColor}12`, color: a.catColor }}>{a.category}</div>
                </div>

                <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: T.muted }}>{a.date}</span>
                    <span style={{ fontSize: 12, color: T.border }}>·</span>
                    <span style={{ fontSize: 12, color: T.muted }}>⏱ {a.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: F.display, fontSize: 17, color: T.navy, lineHeight: 1.3, marginBottom: 10, flex: 1 }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.excerpt}</p>
                  <span style={{ fontSize: 13, fontWeight: 700, color: a.catColor }}>Leer más →</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <p style={{ fontSize: 16, color: T.muted }}>No hay artículos en esta categoría todavía.</p>
          </div>
        )}

        {/* Load more */}
        <Reveal delay={.2}>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button style={{
              padding: "14px 36px", borderRadius: 50, border: `2px solid ${T.border}`,
              background: T.white, color: T.body, fontWeight: 600, fontSize: 14,
              cursor: "pointer", fontFamily: F.body, transition: "all .25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.navy; e.currentTarget.style.color = T.navy; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.body; }}
            >Cargar más artículos</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ UPCOMING EVENTS ═══ */
function UpcomingEvents() {
  return (
    <section style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.lavender, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(108,92,231,.12)` }}>
              <span style={{ fontSize: 13 }}>📅</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.purple, letterSpacing: 1.5, textTransform: "uppercase" }}>Próximos eventos</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,42px)", color: T.navy, marginBottom: 14 }}>Agenda</h2>
            <p style={{ fontSize: 17, color: T.body, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Talleres, caminatas, jornadas abiertas y celebraciones. Participa y sé parte del cambio.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.title} delay={i * .08}>
              <div style={{
                background: T.white, borderRadius: 22, overflow: "hidden",
                border: `1px solid ${T.border}`, transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${ev.color}10`; e.currentTarget.style.borderColor = `${ev.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{ display: "flex" }}>
                  {/* Date block */}
                  <div style={{
                    width: 90, flexShrink: 0, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    background: `linear-gradient(135deg, ${ev.color}, ${ev.color}cc)`,
                    padding: "20px 12px",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.7)", letterSpacing: 1, textTransform: "uppercase" }}>
                      {ev.date.split(" ")[1]}
                    </div>
                    <div style={{ fontFamily: F.display, fontSize: 36, color: "#fff", lineHeight: 1, margin: "4px 0" }}>
                      {ev.date.split(" ")[0]}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.7)" }}>
                      {ev.date.split(" ")[2]}
                    </div>
                  </div>

                  {/* Event details */}
                  <div style={{ padding: "22px 24px", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 18 }}>{ev.icon}</span>
                      <h4 style={{ fontFamily: F.display, fontSize: 18, color: T.navy, lineHeight: 1.25 }}>{ev.title}</h4>
                    </div>
                    <p style={{ fontSize: 13.5, color: T.body, lineHeight: 1.6, marginBottom: 14 }}>{ev.desc}</p>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.muted }}>
                        <span>🕐</span>{ev.time}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.muted }}>
                        <span>📍</span>{ev.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ NEWSLETTER ═══ */
function Newsletter() {
  return (
    <section style={{ padding: "88px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            background: `linear-gradient(135deg, ${T.navy}, ${T.deep})`,
            borderRadius: 28, padding: "56px 48px", textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {[0, 1].map(i => (
                <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 200 + i * 150, height: 200 + i * 150, borderRadius: "50%", border: "1px solid rgba(255,255,255,.03)", transform: "translate(-50%,-50%)" }} />
              ))}
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✉️</div>
              <h3 style={{ fontFamily: F.display, fontSize: 28, color: "#fff", marginBottom: 10 }}>No te pierdas nada</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px" }}>
                Recibe en tu correo nuestras noticias, eventos, campañas y recursos para familias. Sin spam — solo contenido que importa.
              </p>

              <div style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto" }}>
                <input
                  placeholder="tu@correo.com"
                  style={{
                    flex: 1, padding: "14px 20px", borderRadius: 50,
                    border: "2px solid rgba(255,255,255,.12)",
                    background: "rgba(255,255,255,.06)",
                    color: "#fff", fontSize: 15, fontFamily: F.body,
                    outline: "none", backdropFilter: "blur(8px)",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(255,255,255,.3)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.12)"}
                />
                <button style={{
                  padding: "14px 32px", borderRadius: 50, border: "none",
                  background: T.gold, color: T.navy, fontWeight: 700, fontSize: 14,
                  cursor: "pointer", fontFamily: F.body,
                  boxShadow: `0 4px 16px ${T.gold}30`,
                  transition: "all .25s", flexShrink: 0,
                }}
                  onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.target.style.transform = "none"}
                >Suscribirme</button>
              </div>

              <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 16 }}>
                Puedes cancelar tu suscripción en cualquier momento.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ SOCIAL MEDIA BAR ═══ */
function SocialBar() {
  const socials = [
    { name: "Facebook", handle: "Centro Lapiz en Mano", icon: "📘", color: "#1877f2", bg: "#e8f0fe", desc: "Noticias y fotos diarias de las actividades en el centro." },
    { name: "Instagram", handle: "@Centro_Lapiz_en_Mano", icon: "📷", color: "#e4405f", bg: "#fce8ec", desc: "Historias visuales de los logros de cada niño." },
    { name: "TikTok", handle: "@lapiz.en.mano65", icon: "🎵", color: "#111", bg: "#f0f0f0", desc: "Videos cortos de terapias, celebraciones y vida en el centro." },
    { name: "WhatsApp", handle: "70106276", icon: "💬", color: "#25d366", bg: "#e8faf0", desc: "Canal directo para consultas, inscripciones y apoyo." },
  ];

  return (
    <section style={{ padding: "64px 32px 88px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h3 style={{ fontFamily: F.display, fontSize: 24, color: T.navy }}>Síguenos en redes</h3>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {socials.map((s, i) => (
            <Reveal key={s.name} delay={i * .06}>
              <div style={{
                background: T.white, borderRadius: 20, padding: "28px 22px",
                border: `1px solid ${T.border}`, textAlign: "center",
                transition: "all .3s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${s.color}12`; e.currentTarget.style.borderColor = `${s.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14, background: s.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, margin: "0 auto 14px",
                }}>{s.icon}</div>
                <div style={{ fontFamily: F.display, fontSize: 16, color: T.navy, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 600, marginBottom: 10 }}>{s.handle}</div>
                <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function BlogPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <FeaturedArticle />
      <ArticlesGrid />
      <UpcomingEvents />
      <Newsletter />
      <SocialBar />
    </div>
  );
}
