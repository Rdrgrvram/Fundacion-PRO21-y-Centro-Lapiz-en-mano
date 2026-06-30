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
const REASONS = [
  { label: "Quiero inscribir a mi hijo/a", icon: "🌟", color: T.blue },
  { label: "Solicitar una evaluación", icon: "🔍", color: T.coral },
  { label: "Ser voluntario/a", icon: "🙌", color: T.teal },
  { label: "Alianza institucional", icon: "🤝", color: T.purple },
  { label: "Donación o patrocinio", icon: "💛", color: T.gold },
  { label: "Prensa o medios", icon: "📰", color: T.green },
  { label: "Otro motivo", icon: "💬", color: T.muted },
];

const CONTACT_INFO = [
  { icon: "📱", title: "WhatsApp", primary: "+591 70106276", secondary: "Respuesta en menos de 2 horas", href: "https://wa.me/59170106276", action: "Escribir ahora", color: "#25d366", bg: "#e8faf0" },
  { icon: "✉️", title: "Correo electrónico", primary: "contacto@fundacionpro21.org", secondary: "Respuesta en 24 horas", href: "mailto:contacto@fundacionpro21.org", action: "Enviar correo", color: T.blue, bg: T.cloud },
  { icon: "📞", title: "Teléfono", primary: "+591 70106276", secondary: "Lunes a viernes, 8:00 – 18:00", href: "tel:+59170106276", action: "Llamar", color: T.teal, bg: T.mint },
];

const HOURS = [
  { day: "Lunes a viernes", time: "8:00 – 12:00 / 14:00 – 18:00", active: true },
  { day: "Sábados", time: "9:00 – 12:00 (solo con cita)", active: true },
  { day: "Domingos y feriados", time: "Cerrado", active: false },
];

const SOCIALS = [
  { name: "Facebook", handle: "Centro Lapiz en Mano", color: "#1877f2", bg: "#e8f0fe", url: "#" },
  { name: "Instagram", handle: "@Centro_Lapiz_en_Mano", color: "#e4405f", bg: "#fce8ec", url: "#" },
  { name: "TikTok", handle: "@lapiz.en.mano65", color: "#111", bg: "#f0f0f0", url: "#" },
];

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: 440, display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 45%, #1a4a7a 100%)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}body{font-family:${F.body};background:${T.white};color:${T.text}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes ping{0%{transform:scale(1);opacity:.8}80%,100%{transform:scale(2);opacity:0}}
      `}</style>

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 450, height: 450, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        {/* Pulsing location dot */}
        <div style={{ position: "absolute", top: "55%", right: "18%", width: 14, height: 14, borderRadius: "50%", background: T.honey }}>
          <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `2px solid ${T.honey}`, animation: "ping 2s cubic-bezier(0,0,.2,1) infinite" }} />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 70" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0 30C360 55 720 15 1080 40C1260 50 1380 42 1440 38V70H0Z" fill={T.offWhite} />
        </svg>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px 80px", textAlign: "center", position: "relative", zIndex: 3 }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(.16,1,.3,1) .15s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.07)", borderRadius: 50, padding: "6px 18px 6px 10px", marginBottom: 24, border: "1px solid rgba(255,255,255,.1)" }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✦</span>
            <span style={{ color: "rgba(255,255,255,.8)", fontSize: 13, fontWeight: 500 }}>Contacto</span>
          </div>
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(34px,4.5vw,50px)", color: "#fff", lineHeight: 1.1, marginBottom: 18, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .25s" }}>
          Estamos a un mensaje de{" "}
          <span style={{ fontStyle: "italic", color: T.honey }}>distancia</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 520, margin: "0 auto", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .4s" }}>
          Ya sea que busques inscribir a tu hijo, ser voluntario, proponer una alianza o simplemente
          conocernos — escríbenos. Toda conversación comienza con un primer mensaje.
        </p>
      </div>
    </section>
  );
}

/* ═══ QUICK CONTACT CARDS ═══ */
function QuickContact() {
  return (
    <section style={{ padding: "60px 32px 40px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {CONTACT_INFO.map((c, i) => (
            <Reveal key={c.title} delay={i * .08}>
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
                display: "block", textDecoration: "none",
                background: T.white, borderRadius: 22, padding: "32px 28px",
                border: `1px solid ${T.border}`, transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${c.color}12`; e.currentTarget.style.borderColor = `${c.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, background: c.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, flexShrink: 0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, letterSpacing: 1, textTransform: "uppercase" }}>{c.title}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: T.navy, marginTop: 2 }}>{c.primary}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: T.muted, marginBottom: 18 }}>{c.secondary}</p>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "12px", borderRadius: 14, background: c.bg,
                  fontSize: 14, fontWeight: 700, color: c.color,
                  border: `1px solid ${c.color}15`,
                  transition: "all .25s",
                }}>{c.action} →</div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FORM + MAP ═══ */
function FormAndMap() {
  const [selectedReason, setSelectedReason] = useState(null);
  const [formSent, setFormSent] = useState(false);

  return (
    <section style={{ padding: "48px 32px 88px", background: T.offWhite }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Form */}
          <Reveal delay={.05}>
            <div style={{
              background: T.white, borderRadius: 28, padding: "44px 40px",
              border: `1px solid ${T.border}`, boxShadow: "0 4px 24px rgba(0,0,0,.03)",
            }}>
              {!formSent ? (
                <>
                  <h3 style={{ fontFamily: F.display, fontSize: 26, color: T.navy, marginBottom: 8 }}>Envíanos un mensaje</h3>
                  <p style={{ fontSize: 14, color: T.muted, marginBottom: 28, lineHeight: 1.6 }}>Completa el formulario y te responderemos en menos de 24 horas.</p>

                  {/* Reason selector */}
                  <div style={{ marginBottom: 22 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: T.muted, display: "block", marginBottom: 10, letterSpacing: .5, textTransform: "uppercase" }}>¿Cuál es el motivo de tu consulta?</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {REASONS.map((r, i) => (
                        <button key={r.label} onClick={() => setSelectedReason(i)} style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "8px 14px", borderRadius: 50, border: `1.5px solid ${selectedReason === i ? r.color : T.border}`,
                          background: selectedReason === i ? `${r.color}08` : T.white,
                          color: selectedReason === i ? r.color : T.body,
                          fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F.body,
                          transition: "all .25s",
                        }}>
                          <span style={{ fontSize: 14 }}>{r.icon}</span>{r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  {[
                    { label: "Nombre completo", placeholder: "Tu nombre", type: "text" },
                    { label: "Correo electrónico", placeholder: "tu@correo.com", type: "email" },
                    { label: "Teléfono / WhatsApp", placeholder: "+591 ...", type: "tel" },
                  ].map(field => (
                    <div key={field.label} style={{ marginBottom: 18 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted, display: "block", marginBottom: 6, letterSpacing: .5, textTransform: "uppercase" }}>{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder} style={{
                        width: "100%", padding: "13px 18px", borderRadius: 14,
                        border: `1.5px solid ${T.border}`, fontSize: 15, outline: "none",
                        background: T.offWhite, fontFamily: F.body, boxSizing: "border-box",
                        transition: "border-color .2s",
                      }}
                        onFocus={e => e.target.style.borderColor = T.blue}
                        onBlur={e => e.target.style.borderColor = T.border}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: T.muted, display: "block", marginBottom: 6, letterSpacing: .5, textTransform: "uppercase" }}>Mensaje</label>
                    <textarea rows={4} placeholder="Cuéntanos cómo podemos ayudarte..." style={{
                      width: "100%", padding: "13px 18px", borderRadius: 14,
                      border: `1.5px solid ${T.border}`, fontSize: 15, outline: "none",
                      background: T.offWhite, fontFamily: F.body, resize: "vertical", boxSizing: "border-box",
                      transition: "border-color .2s",
                    }}
                      onFocus={e => e.target.style.borderColor = T.blue}
                      onBlur={e => e.target.style.borderColor = T.border}
                    />
                  </div>

                  <button onClick={() => setFormSent(true)} style={{
                    width: "100%", padding: "16px", borderRadius: 50, border: "none",
                    background: `linear-gradient(135deg, ${T.blue}, ${T.teal})`,
                    color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
                    fontFamily: F.body, boxShadow: "0 6px 24px rgba(36,102,168,.25)",
                    transition: "all .25s",
                  }}
                    onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.target.style.transform = "none"}
                  >Enviar mensaje</button>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontFamily: F.display, fontSize: 26, color: T.navy, marginBottom: 12 }}>¡Mensaje enviado!</h3>
                  <p style={{ fontSize: 15, color: T.body, lineHeight: 1.7, maxWidth: 360, margin: "0 auto 24px" }}>
                    Recibimos tu consulta. Nuestro equipo te responderá en menos de 24 horas por el medio que indicaste.
                  </p>
                  <p style={{ fontSize: 14, color: T.muted, marginBottom: 28 }}>
                    ¿Necesitas respuesta inmediata? Escríbenos directo:
                  </p>
                  <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 32px", borderRadius: 50,
                    background: "#25d366", color: "#fff", fontWeight: 700, fontSize: 15,
                    textDecoration: "none", boxShadow: "0 6px 20px rgba(37,211,102,.25)",
                  }}>
                    <span style={{ fontSize: 18 }}>💬</span>WhatsApp — 70106276
                  </a>
                  <div style={{ marginTop: 24 }}>
                    <button onClick={() => setFormSent(false)} style={{
                      background: "none", border: "none", color: T.blue,
                      fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F.body,
                    }}>← Enviar otro mensaje</button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Right column: Map + Info */}
          <Reveal delay={.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Map */}
              <div style={{
                borderRadius: 22, overflow: "hidden",
                border: `1px solid ${T.border}`, height: 280,
                background: `linear-gradient(145deg, ${T.cloud}, ${T.mint})`,
                position: "relative",
              }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${T.coral}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: `0 4px 16px ${T.coral}30` }}>📍</div>
                  <p style={{ fontFamily: F.display, fontSize: 15, color: T.navy }}>Centro Lápiz en Mano</p>
                  <p style={{ fontSize: 12, color: T.muted }}>La Paz, Bolivia</p>
                  <a href="https://maps.google.com/?q=La+Paz+Bolivia" target="_blank" rel="noopener noreferrer" style={{
                    marginTop: 4, padding: "8px 20px", borderRadius: 50,
                    background: T.white, color: T.blue, fontSize: 12, fontWeight: 700,
                    textDecoration: "none", border: `1px solid ${T.border}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                  }}>Abrir en Google Maps →</a>
                </div>
                {/* Decorative grid pattern */}
                <svg viewBox="0 0 400 280" style={{ width: "100%", height: "100%", opacity: .08 }}>
                  {[...Array(12)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 25} x2="400" y2={i * 25} stroke={T.navy} strokeWidth=".5" />)}
                  {[...Array(18)].map((_, i) => <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="280" stroke={T.navy} strokeWidth=".5" />)}
                </svg>
              </div>

              {/* Hours */}
              <div style={{
                background: T.white, borderRadius: 20, padding: "26px 28px",
                border: `1px solid ${T.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: T.cream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🕐</div>
                  <h4 style={{ fontFamily: F.display, fontSize: 18, color: T.navy }}>Horarios de atención</h4>
                </div>
                {HOURS.map((h, i) => (
                  <div key={h.day} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 0", borderBottom: i < HOURS.length - 1 ? `1px solid ${T.border}` : "none",
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: h.active ? T.text : T.muted }}>{h.day}</span>
                    <span style={{
                      fontSize: 13, fontWeight: 600,
                      color: h.active ? T.green : T.muted,
                      padding: "4px 12px", borderRadius: 50,
                      background: h.active ? T.leaf : T.offWhite,
                    }}>{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{
                background: T.white, borderRadius: 20, padding: "26px 28px",
                border: `1px solid ${T.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: T.cloud, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌐</div>
                  <h4 style={{ fontFamily: F.display, fontSize: 18, color: T.navy }}>Redes sociales</h4>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {SOCIALS.map(s => (
                    <a key={s.name} href={s.url} style={{
                      flex: 1, padding: "14px 10px", borderRadius: 14,
                      background: s.bg, textAlign: "center", textDecoration: "none",
                      border: `1px solid transparent`,
                      transition: "all .25s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}30`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "none"; }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{s.handle}</div>
                    </a>
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

/* ═══ QUICK ANSWERS ═══ */
function QuickAnswers() {
  const items = [
    { q: "¿Cómo inscribo a mi hijo?", a: "Agenda una evaluación inicial gratuita por WhatsApp (70106276). Nuestro equipo evaluará a tu hijo y te recomendará el programa más adecuado.", icon: "🌟", color: T.blue },
    { q: "¿Cuánto cuesta la atención?", a: "Cada programa tiene una cuota mensual accesible. Si tu familia no puede cubrirla, contamos con becas parciales y totales. Ningún niño deja de recibir atención por razones económicas.", icon: "💰", color: T.gold },
    { q: "¿Necesito diagnóstico previo?", a: "No. Puedes consultarnos si observas señales de alerta o dificultades en el desarrollo o aprendizaje de tu hijo. Nosotros realizamos la evaluación.", icon: "📋", color: T.teal },
    { q: "¿Atienden fuera de La Paz?", a: "La atención presencial es en nuestro centro en La Paz. Ofrecemos sesiones virtuales gratuitas de orientación para familias de cualquier parte de Bolivia.", icon: "🌎", color: T.coral },
  ];

  return (
    <section style={{ padding: "88px 32px", background: T.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.cream, borderRadius: 50, padding: "6px 18px", marginBottom: 14, border: `1px solid rgba(232,168,56,.15)` }}>
              <span style={{ fontSize: 13 }}>⚡</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Respuestas rápidas</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,40px)", color: T.navy, marginBottom: 14 }}>Antes de escribirnos</h2>
            <p style={{ fontSize: 16, color: T.body, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
              Quizás tu pregunta ya tiene respuesta. Si no, estamos a un WhatsApp de distancia.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * .08}>
              <div style={{
                background: T.white, borderRadius: 22, padding: "32px 28px",
                border: `1px solid ${T.border}`, height: "100%",
                display: "flex", alignItems: "flex-start", gap: 20,
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${item.color}08`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 15,
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, flexShrink: 0, boxShadow: `0 6px 20px ${item.color}20`,
                }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontFamily: F.display, fontSize: 18, color: T.navy, marginBottom: 8, lineHeight: 1.25 }}>{item.q}</h4>
                  <p style={{ fontSize: 14, color: T.body, lineHeight: 1.7 }}>{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={.2}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href="#familias" style={{ fontSize: 14, fontWeight: 600, color: T.blue, textDecoration: "none" }}>
              Ver todas las preguntas frecuentes →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ WHATSAPP CTA ═══ */
function WhatsAppCta() {
  return (
    <section style={{ padding: "80px 32px", background: T.offWhite }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            background: `linear-gradient(135deg, #128c52, #25d366)`,
            borderRadius: 28, padding: "52px 48px",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 36, alignItems: "center",
            boxShadow: "0 16px 48px rgba(37,211,102,.2)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ position: "absolute", top: "50%", right: `${10 + i * 8}%`, width: 80 + i * 60, height: 80 + i * 60, borderRadius: "50%", border: "1px solid rgba(255,255,255,.08)", transform: "translateY(-50%)" }} />
              ))}
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <h3 style={{ fontFamily: F.display, fontSize: 28, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
                ¿Prefieres una respuesta inmediata?
              </h3>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.75)", lineHeight: 1.7 }}>
                Escríbenos al WhatsApp y recibirás respuesta en menos de 2 horas durante horario de atención. Sin formularios, sin esperas.
              </p>
            </div>

            <a href="https://wa.me/59170106276" target="_blank" rel="noopener noreferrer" style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              padding: "24px 36px", borderRadius: 22,
              background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,.2)",
              textDecoration: "none", transition: "all .25s",
              position: "relative", zIndex: 2,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.25)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.15)"; e.currentTarget.style.transform = "none"; }}
            >
              <span style={{ fontSize: 36 }}>💬</span>
              <span style={{ fontFamily: F.display, fontSize: 22, color: "#fff" }}>70106276</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)", fontWeight: 600 }}>Toca para escribir</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ FOOTER MESSAGE ═══ */
function FooterMessage() {
  return (
    <section style={{ padding: "64px 32px", background: `linear-gradient(155deg, ${T.navy} 0%, ${T.deep} 100%)` }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontSize: 40, marginBottom: 16 }}>💛</div>
          <p style={{ fontFamily: F.display, fontSize: 22, color: "rgba(255,255,255,.7)", lineHeight: 1.6, fontStyle: "italic" }}>
            "Creemos que el síndrome de Down no es una barrera, sino una manera diferente y valiosa de aprender, crecer y desarrollar todo su potencial."
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.35)", marginTop: 20 }}>
            Fundación PRO-21 & Centro Lápiz en Mano — La Paz, Bolivia
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ MAIN ═══ */
export default function ContactoPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <QuickContact />
      <FormAndMap />
      <QuickAnswers />
      <WhatsAppCta />
      <FooterMessage />
    </div>
  );
}
