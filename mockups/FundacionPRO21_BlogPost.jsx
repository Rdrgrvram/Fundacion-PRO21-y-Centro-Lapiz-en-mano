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
function Reveal({ children, delay = 0, y = 32, style = {} }) {
  const [ref, vis] = useReveal();
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : `translateY(${y}px)`, transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`, ...style }}>{children}</div>;
}

/* ═══ SAMPLE POST DATA ═══ */
const POST = {
  category: "Prensa",
  catColor: T.gold,
  date: "15 de mayo de 2026",
  readTime: "8 min",
  author: { name: "Equipo de Comunicación", role: "Fundación PRO-21", initials: "P21" },
  title: "La fundación que no se detuvo: cómo el bloqueo visibilizó la inclusión en Bolivia",
  subtitle: "Cuando los caminos se cerraron, las terapias continuaron. La historia de la Fundación PRO-21 durante los días de bloqueo recorrió redes sociales y llegó a medios internacionales.",
  tags: ["inclusión", "síndrome de Down", "autismo", "Bolivia", "dificultades de aprendizaje"],
};

const RELATED = [
  { emoji: "🌟", category: "Noticias", catColor: T.blue, date: "Enero 2026", title: "Inscripciones 2026: cupos disponibles en los tres programas terapéuticos" },
  { emoji: "💛", category: "Campañas", catColor: T.coral, date: "Marzo 2026", title: "21 de Marzo: jornada comunitaria por el Día Mundial del Síndrome de Down" },
  { emoji: "🎓", category: "Inclusión", catColor: T.teal, date: "Febrero 2026", title: "UCB y la Fundación PRO-21: alianza para la formación en educación especial" },
];

/* ═══ READING PROGRESS BAR ═══ */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 2000, background: "rgba(0,0,0,.05)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${T.blue}, ${T.teal})`, transition: "width .1s" }} />
    </div>
  );
}

/* ═══ BREADCRUMB ═══ */
function Breadcrumb() {
  return (
    <div style={{ padding: "16px 32px", maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      `}</style>
      {[
        { label: "Inicio", href: "#" },
        { label: "Blog", href: "#" },
        { label: POST.category, href: "#" },
      ].map((crumb, i, arr) => (
        <span key={crumb.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i < arr.length - 1 ? (
            <>
              <a href={crumb.href} style={{ fontSize: 13, color: T.blue, textDecoration: "none", fontWeight: 500 }}>{crumb.label}</a>
              <span style={{ color: T.border, fontSize: 12 }}>›</span>
            </>
          ) : (
            <span style={{ fontSize: 13, color: T.muted }}>{crumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ═══ ARTICLE HEADER ═══ */
function ArticleHeader() {
  return (
    <header style={{ padding: "8px 32px 48px", maxWidth: 860, margin: "0 auto" }}>
      {/* Category + meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <span style={{ padding: "5px 14px", borderRadius: 50, background: POST.catColor, color: "#fff", fontSize: 12, fontWeight: 700 }}>{POST.category}</span>
        <span style={{ fontSize: 13, color: T.muted }}>{POST.date}</span>
        <span style={{ color: T.border }}>·</span>
        <span style={{ fontSize: 13, color: T.muted }}>⏱ {POST.readTime} de lectura</span>
      </div>

      {/* Title */}
      <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.8vw,48px)", color: T.navy, lineHeight: 1.12, marginBottom: 18 }}>
        {POST.title}
      </h1>

      {/* Subtitle */}
      <p style={{ fontSize: 19, color: T.body, lineHeight: 1.65, marginBottom: 32, fontWeight: 400 }}>
        {POST.subtitle}
      </p>

      {/* Author + share */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: `linear-gradient(135deg, ${T.blue}, ${T.teal})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontFamily: F.display, fontSize: 14, fontWeight: 700,
          }}>{POST.author.initials}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{POST.author.name}</div>
            <div style={{ fontSize: 12, color: T.muted }}>{POST.author.role}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { label: "Facebook", icon: "f", color: "#1877f2" },
            { label: "WhatsApp", icon: "w", color: "#25d366" },
            { label: "X", icon: "𝕏", color: "#000" },
          ].map(s => (
            <button key={s.label} title={`Compartir en ${s.label}`} style={{
              width: 36, height: 36, borderRadius: "50%", border: `1px solid ${T.border}`,
              background: T.white, color: s.color, fontSize: 14, fontWeight: 700,
              cursor: "pointer", fontFamily: F.body, transition: "all .2s",
            }}
              onMouseEnter={e => { e.target.style.background = s.color; e.target.style.color = "#fff"; e.target.style.borderColor = s.color; }}
              onMouseLeave={e => { e.target.style.background = T.white; e.target.style.color = s.color; e.target.style.borderColor = T.border; }}
            >{s.icon}</button>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ═══ FEATURED IMAGE ═══ */
function FeaturedImage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto 48px", padding: "0 32px" }}>
      <Reveal>
        <div style={{
          borderRadius: 24, overflow: "hidden",
          aspectRatio: "16/7",
          background: `linear-gradient(135deg, ${T.deep} 0%, ${T.blue} 50%, ${T.teal} 100%)`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,.25)", gap: 12, position: "relative",
        }}>
          <div style={{ fontSize: 64, animation: "float 4s ease-in-out infinite" }}>📷</div>
          <div style={{ fontSize: 15, fontFamily: F.display, fontStyle: "italic" }}>Foto destacada del artículo</div>
          <div style={{ fontSize: 12, opacity: .7 }}>Imagen real pendiente de autorización</div>
          {/* Decorative overlay dots */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,.08)", left: `${10 + i * 15}%`, top: `${20 + (i % 2) * 50}%` }} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: T.muted, fontStyle: "italic" }}>
          Imagen: actividades de la Fundación PRO-21 durante la gestión 2025 · Crédito fotográfico pendiente
        </div>
      </Reveal>
    </div>
  );
}

/* ═══ ARTICLE BODY ═══ */
function ArticleBody() {
  const s = {
    p: { fontSize: 17, color: T.body, lineHeight: 1.8, marginBottom: 24 },
    h2: { fontFamily: F.display, fontSize: "clamp(22px,2.5vw,30px)", color: T.navy, lineHeight: 1.25, margin: "40px 0 16px" },
    h3: { fontFamily: F.display, fontSize: "clamp(18px,2vw,24px)", color: T.navy, lineHeight: 1.3, margin: "32px 0 12px" },
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 32px 48px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 56, alignItems: "start" }}>
        {/* Article text */}
        <div>
          <Reveal>
            <p style={s.p}>
              Era la segunda semana del bloqueo y los caminos de acceso a La Paz estaban cerrados. Para la mayoría de instituciones, eso significó cerrar puertas y suspender actividades. Para la <strong>Fundación PRO-21 y el Centro Lápiz en Mano</strong>, significó adaptarse —como siempre lo han hecho— y continuar.
            </p>
            <p style={s.p}>
              Las familias de los niños con síndrome de Down, autismo y dificultades de aprendizaje que asisten a los tres programas de la fundación no podían llegar físicamente. Pero el equipo de profesionales tampoco iba a dejarlos solos.
            </p>
          </Reveal>

          <Reveal delay={.05}>
            <h2 style={s.h2}>Sesiones virtuales de emergencia</h2>
            <p style={s.p}>
              En menos de 24 horas, el equipo de fisioterapeutas, psicólogos, fonoaudiólogos y pedagogos especiales reorganizó su agenda completa en formato virtual. Las familias recibieron guías ilustradas por WhatsApp con ejercicios que podían realizar en casa. Las sesiones grupales de orientación familiar se transmitieron en vivo.
            </p>
            <p style={s.p}>
              "Ningún niño se quedó sin atención", afirmó la directora del programa Mi Escuelita Down. "Sabemos lo que significa para estas familias perder aunque sea una semana de terapia. No era una opción."
            </p>
          </Reveal>

          {/* Pull quote */}
          <Reveal delay={.08}>
            <blockquote style={{
              margin: "36px 0", padding: "28px 32px",
              borderLeft: `4px solid ${T.gold}`,
              background: T.cream, borderRadius: "0 16px 16px 0",
              fontFamily: F.display, fontSize: 20, fontStyle: "italic",
              color: T.navy, lineHeight: 1.55,
            }}>
              "Cuando las noticias llegaron a redes sociales, el apoyo fue inmediato. Mensajes de Perú, Argentina, España. Fue emocionante ver que la inclusión no conoce fronteras."
              <div style={{ fontFamily: F.body, fontSize: 13, fontStyle: "normal", color: T.muted, marginTop: 12, fontWeight: 600 }}>
                — Trabajadora Social, Fundación PRO-21
              </div>
            </blockquote>
          </Reveal>

          <Reveal delay={.1}>
            <h2 style={s.h2}>La historia que se viralizó</h2>
            <p style={s.p}>
              Un video corto grabado por una madre mostrando a su hijo de 4 años realizando sus ejercicios de psicomotricidad en la sala de su casa, guiado por su terapeuta a través del teléfono, acumuló más de 80.000 visualizaciones en tres días.
            </p>
            <p style={s.p}>
              Medios como <strong>Red Uno</strong> y <strong>ATB Digital</strong> recogieron la historia. El diario <em>Página Siete</em> publicó un reportaje central. Desde Argentina, una organización de padres con hijos con síndrome de Down contactó a la fundación para conocer el modelo de atención.
            </p>

            <h3 style={s.h3}>El impacto en números</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, margin: "16px 0 24px" }}>
              {[
                { n: "80K+", l: "Visualizaciones del video" },
                { n: "4", l: "Medios nacionales que cubrieron la historia" },
                { n: "100%", l: "Familias mantuvieron atención continua" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "20px 18px", borderRadius: 16, background: T.cloud, textAlign: "center", border: `1px solid rgba(36,102,168,.08)` }}>
                  <div style={{ fontFamily: F.display, fontSize: 28, color: T.blue, marginBottom: 4 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: T.body, lineHeight: 1.4 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <h2 style={s.h2}>Más que una crisis: una oportunidad</h2>
            <p style={s.p}>
              La visibilidad inesperada abrió puertas. Tres nuevas familias se inscribieron en los programas la semana siguiente al bloqueo. Una empresa de La Paz contactó para explorar una donación corporativa. Una estudiante de Psicología de la UCB pidió información para realizar sus prácticas profesionales.
            </p>
            <p style={s.p}>
              Para la fundación, que opera con recursos limitados y sin publicidad paga, la repercusión fue transformadora. "La inclusión tiene un poder enorme cuando se muestra sin filtros", reflexionó el equipo. "Estas familias son valientes todos los días. Solo necesitan ser vistas."
            </p>
          </Reveal>

          {/* Tags */}
          <Reveal delay={.12}>
            <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Temas</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {POST.tags.map(tag => (
                  <span key={tag} style={{ padding: "5px 14px", borderRadius: 50, background: T.offWhite, border: `1px solid ${T.border}`, fontSize: 12, color: T.body }}># {tag}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Share footer */}
          <Reveal delay={.13}>
            <div style={{ marginTop: 36, padding: "24px 0", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.navy }}>¿Te pareció útil? Comparte:</span>
              <a href="https://wa.me/?text=https%3A%2F%2Ffundacionpro21.org%2Fblog" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 50, background: "#25d366", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 700, transition: "all .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              ><span style={{ fontSize: 16 }}>💬</span>WhatsApp</a>
              <a href="#" style={{ padding: "9px 20px", borderRadius: 50, border: `1.5px solid ${T.border}`, color: T.body, textDecoration: "none", fontSize: 13, fontWeight: 600, transition: "all .2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = T.blue}
                onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
              >Facebook</a>
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside style={{ position: "sticky", top: 90 }}>
          {/* About foundation card */}
          <Reveal>
            <div style={{
              borderRadius: 20, padding: "24px", border: `1px solid ${T.border}`,
              background: T.white, marginBottom: 16,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${T.blue}, ${T.teal})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: F.display, fontSize: 16, fontWeight: 700, marginBottom: 14 }}>P21</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.navy, marginBottom: 6 }}>Fundación PRO-21</div>
              <p style={{ fontSize: 12.5, color: T.body, lineHeight: 1.6, marginBottom: 16 }}>
                Atención terapéutica y educativa para niños con síndrome de Down, autismo y dificultades de aprendizaje en La Paz, Bolivia.
              </p>
              <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "10px 16px", borderRadius: 50, background: T.gold, color: T.navy, fontSize: 13, fontWeight: 700, textDecoration: "none", transition: "all .2s" }}>Contactar →</a>
            </div>
          </Reveal>

          {/* Table of contents */}
          <Reveal delay={.05}>
            <div style={{ borderRadius: 20, padding: "20px 24px", border: `1px solid ${T.border}`, background: T.offWhite }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>En este artículo</div>
              {[
                "Sesiones virtuales de emergencia",
                "La historia que se viralizó",
                "El impacto en números",
                "Más que una crisis: una oportunidad",
              ].map((item, i) => (
                <a key={i} href="#" style={{ display: "block", fontSize: 13, color: T.body, textDecoration: "none", padding: "7px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none", lineHeight: 1.4, transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = T.blue}
                  onMouseLeave={e => e.target.style.color = T.body}
                >{item}</a>
              ))}
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}

/* ═══ RELATED ARTICLES ═══ */
function RelatedArticles() {
  return (
    <section style={{ background: T.warm, padding: "72px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <h3 style={{ fontFamily: F.display, fontSize: "clamp(22px,2.5vw,30px)", color: T.navy, marginBottom: 32, textAlign: "center" }}>
            También puede interesarte
          </h3>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {RELATED.map((post, i) => (
            <Reveal key={i} delay={i * .07}>
              <article style={{
                background: T.white, borderRadius: 20, overflow: "hidden",
                border: `1px solid ${T.border}`, cursor: "pointer",
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ height: 120, background: `linear-gradient(135deg, ${T.cloud}, ${T.offWhite})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{post.emoji}</div>
                <div style={{ padding: "18px 20px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: 50, background: post.catColor, color: "#fff", fontSize: 10, fontWeight: 700 }}>{post.category}</span>
                  <div style={{ fontSize: 11, color: T.muted, margin: "8px 0 4px" }}>{post.date}</div>
                  <h4 style={{ fontFamily: F.display, fontSize: 15, color: T.navy, lineHeight: 1.4 }}>{post.title}</h4>
                  <div style={{ fontSize: 13, color: T.blue, fontWeight: 600, marginTop: 10 }}>Leer →</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA BOTTOM ═══ */
function PostCta() {
  return (
    <section style={{ background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 100%)`, padding: "72px 32px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontSize: 40, marginBottom: 16, animation: "float 4s ease-in-out infinite" }}>💛</div>
          <h3 style={{ fontFamily: F.display, fontSize: "clamp(22px,3vw,34px)", color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>
            ¿Quieres apoyar esta misión?
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: 28 }}>
            Hay muchas formas de colaborar. Dona, sé voluntario o simplemente comparte esta historia.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{ padding: "13px 32px", borderRadius: 50, background: T.gold, color: T.navy, fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: `0 6px 24px ${T.gold}30`, transition: "all .25s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >Ver cómo colaborar</a>
            <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{ padding: "13px 32px", borderRadius: 50, border: "2px solid rgba(255,255,255,.2)", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "all .25s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"}
            >Escribir por WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ WHATSAPP FAB ═══ */
function WhatsAppFab() {
  const [hov, setHov] = useState(false);
  return (
    <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 999,
        height: 56, borderRadius: 28,
        width: hov ? "auto" : 56,
        padding: hov ? "0 20px 0 14px" : "0",
        background: "#25d366",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 8, overflow: "hidden",
        boxShadow: "0 6px 24px rgba(37,211,102,.4)",
        textDecoration: "none", color: "#fff",
        transition: "all .35s cubic-bezier(.16,1,.3,1)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ fontSize: 24, flexShrink: 0 }}>💬</span>
      {hov && <span style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", fontFamily: F.body }}>70106276</span>}
    </a>
  );
}

/* ═══ MAIN ═══ */
export default function BlogPostPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <ReadingProgress />

      {/* Minimal nav strip */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,.96)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${T.border}`, padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 60,
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${T.blue}, ${T.teal})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: F.display, fontSize: 13, fontWeight: 700 }}>P21</div>
          <span style={{ fontFamily: F.display, fontSize: 15, color: T.navy }}>Fundación PRO-21</span>
        </a>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#" style={{ fontSize: 13, color: T.muted, textDecoration: "none", fontWeight: 500 }}>← Volver al Blog</a>
          <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{ padding: "8px 20px", borderRadius: 50, background: T.gold, color: T.navy, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>Colaborar ♥</a>
        </div>
      </div>

      <Breadcrumb />
      <ArticleHeader />
      <FeaturedImage />
      <ArticleBody />
      <RelatedArticles />
      <PostCta />
      <WhatsAppFab />
    </div>
  );
}
