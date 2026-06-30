import { useState, useEffect } from "react";

/* ═══ MOCKUP: Panel de administración Decap CMS (/admin) ═══ */

const A = {
  sidebar: "#1a2535",
  sidebarBorder: "#253347",
  sidebarHover: "#253347",
  sidebarActive: "#2466a8",
  header: "#ffffff",
  bg: "#f0f2f5",
  card: "#ffffff",
  navy: "#0c2340",
  blue: "#2466a8",
  teal: "#1a8a7d",
  gold: "#e8a838",
  coral: "#e86840",
  green: "#2d8a4e",
  purple: "#6c5ce7",
  text: "#1a1a2e",
  body: "#3d4152",
  muted: "#6b7084",
  border: "#e4e6ec",
  cloud: "#e8f1fa",
  mint: "#e0f5f0",
  cream: "#fdf6e3",
  peach: "#fef0e8",
  leaf: "#e5f5eb",
  white: "#ffffff",
};
const F = { display: "'DM Serif Display', Georgia, serif", body: "'DM Sans', 'Helvetica Neue', sans-serif" };

/* ═══ DATA ═══ */
const NAV_ITEMS = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "blog", icon: "📝", label: "Blog / Noticias" },
  { id: "equipo", icon: "👥", label: "Equipo profesional" },
  { id: "testimonios", icon: "💬", label: "Testimonios" },
  { id: "imagenes", icon: "🖼️", label: "Galería de imágenes" },
  { id: "config", icon: "⚙️", label: "Configuración" },
];

const POSTS = [
  { id: 1, title: "La fundación que no se detuvo: cómo el bloqueo visibilizó la inclusión", category: "Prensa", status: "publicado", date: "2026-05-15" },
  { id: 2, title: "Inscripciones 2026: cupos disponibles en los tres programas terapéuticos", category: "Noticias", status: "publicado", date: "2026-01-08" },
  { id: 3, title: "21 de Marzo: jornada comunitaria por el Día Mundial del Síndrome de Down", category: "Campañas", status: "publicado", date: "2026-03-21" },
  { id: 4, title: "UCB y la Fundación PRO-21: alianza para formación en educación especial", category: "Inclusión", status: "borrador", date: "2026-02-14" },
  { id: 5, title: "Nuevas fichas de psicomotricidad disponibles para familias", category: "Recursos", status: "borrador", date: "2026-06-01" },
];

const TESTIMONIOS = [
  { id: 1, familia: "Familia Quispe", programa: "Mi Escuelita Down", status: "publicado", aprobado: true },
  { id: 2, familia: "Familia Mamani", programa: "Aula Wawitas", status: "publicado", aprobado: true },
  { id: 3, familia: "Familia Condori", programa: "Pasos Firmes", status: "publicado", aprobado: true },
  { id: 4, familia: "Familia Choque", programa: "Mi Escuelita Down", status: "pendiente", aprobado: false },
];

const EQUIPO = [
  { id: 1, nombre: "Lic. María Elena T.", cargo: "Directora de Programas", area: "Dirección", status: "publicado" },
  { id: 2, nombre: "Ft. Carlos R.", cargo: "Fisioterapeuta", area: "Fisioterapia", status: "publicado" },
  { id: 3, nombre: "Lic. Ana P.", cargo: "Fonoaudióloga", area: "Terapia de lenguaje", status: "publicado" },
  { id: 4, nombre: "Lic. Juan C.", cargo: "Psicopedagogo", area: "Pedagogía", status: "borrador" },
];

const CAT_COLORS = {
  Prensa: A.gold, Noticias: A.blue, Campañas: A.coral,
  Inclusión: A.teal, Recursos: A.green, Eventos: A.purple,
};

/* ═══ STATUS BADGE ═══ */
function Badge({ status }) {
  const map = {
    publicado: { bg: "#dcfce7", color: "#166534", label: "● Publicado" },
    borrador:  { bg: "#fef9c3", color: "#854d0e", label: "○ Borrador" },
    pendiente: { bg: "#fef3c7", color: "#92400e", label: "⏳ Pendiente" },
  };
  const s = map[status] || map.borrador;
  return (
    <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

/* ═══ SIDEBAR ═══ */
function Sidebar({ active, setActive }) {
  return (
    <div style={{
      width: 240, flexShrink: 0, background: A.sidebar,
      display: "flex", flexDirection: "column",
      borderRight: `1px solid ${A.sidebarBorder}`,
      minHeight: "100vh",
    }}>
      {/* Brand */}
      <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${A.sidebarBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: `linear-gradient(135deg, ${A.blue}, ${A.teal})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontFamily: F.display, fontSize: 14, fontWeight: 700,
          }}>P21</div>
          <div>
            <div style={{ color: "#fff", fontFamily: F.display, fontSize: 15, lineHeight: 1.1 }}>PRO-21</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: 10, letterSpacing: .5 }}>Panel CMS</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 10px", flex: 1 }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} style={{
            display: "flex", alignItems: "center", gap: 12,
            width: "100%", padding: "10px 14px", borderRadius: 10,
            background: active === item.id ? A.sidebarActive : "transparent",
            border: "none", color: active === item.id ? "#fff" : "rgba(255,255,255,.55)",
            fontSize: 13.5, fontWeight: active === item.id ? 600 : 400,
            cursor: "pointer", fontFamily: F.body, textAlign: "left",
            marginBottom: 2, transition: "all .2s",
          }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = A.sidebarHover; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { if (active !== item.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,.55)"; } }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${A.sidebarBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: `linear-gradient(135deg, ${A.gold}, #f5c242)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>👤</div>
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Administrador</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: 11 }}>Fundación PRO-21</div>
          </div>
          <div style={{ marginLeft: "auto", color: "rgba(255,255,255,.3)", cursor: "pointer", fontSize: 16 }}>⏻</div>
        </div>
      </div>
    </div>
  );
}

/* ═══ TOP BAR ═══ */
function TopBar({ section, onBack, editing }) {
  const label = NAV_ITEMS.find(n => n.id === section)?.label || "Dashboard";
  return (
    <div style={{
      height: 60, background: A.header, borderBottom: `1px solid ${A.border}`,
      display: "flex", alignItems: "center", padding: "0 28px",
      justifyContent: "space-between", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: A.muted }}>
        {editing ? (
          <>
            <button onClick={onBack} style={{ background: "none", border: "none", color: A.blue, cursor: "pointer", fontFamily: F.body, fontSize: 13, fontWeight: 600 }}>← {label}</button>
            <span style={{ color: A.border }}>/</span>
            <span style={{ color: A.text }}>Editar entrada</span>
          </>
        ) : (
          <span style={{ color: A.text, fontWeight: 600, fontSize: 15 }}>{label}</span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          padding: "7px 16px", borderRadius: 10,
          background: A.cloud, fontSize: 12.5, color: A.blue, fontWeight: 600,
        }}>
          🔗 fundacionpro21.org
        </div>
        <div style={{ padding: "7px 14px", borderRadius: 10, background: "#f0fdf4", fontSize: 12.5, color: "#166534", fontWeight: 600 }}>
          ● Sitio en línea
        </div>
      </div>
    </div>
  );
}

/* ═══ DASHBOARD VIEW ═══ */
function DashboardView() {
  const stats = [
    { icon: "📝", n: "5", label: "Entradas de blog", sub: "3 publicadas · 2 borradores", color: A.blue, bg: A.cloud },
    { icon: "👥", n: "4", label: "Miembros del equipo", sub: "3 publicados · 1 borrador", color: A.teal, bg: A.mint },
    { icon: "💬", n: "4", label: "Testimonios", sub: "3 aprobados · 1 pendiente", color: A.gold, bg: A.cream },
    { icon: "🖼️", n: "12", label: "Imágenes cargadas", sub: "R2 · 0.8 GB usados de 10 GB", color: A.green, bg: A.leaf },
  ];

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: F.display, fontSize: 26, color: A.navy, marginBottom: 4 }}>Bienvenido al panel de contenido</h2>
        <p style={{ fontSize: 14, color: A.muted }}>Desde aquí puedes actualizar el sitio web sin necesidad de programar.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: A.card, borderRadius: 18, padding: "22px 20px", border: `1px solid ${A.border}` }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{s.icon}</div>
            <div style={{ fontFamily: F.display, fontSize: 28, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: A.navy, marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 11.5, color: A.muted }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: A.card, borderRadius: 18, padding: "24px", border: `1px solid ${A.border}` }}>
          <h4 style={{ fontFamily: F.display, fontSize: 18, color: A.navy, marginBottom: 16 }}>Acciones rápidas</h4>
          {[
            { label: "Nueva entrada de blog", icon: "✏️", color: A.blue },
            { label: "Agregar miembro del equipo", icon: "👤", color: A.teal },
            { label: "Aprobar testimonio pendiente", icon: "✅", color: A.green },
            { label: "Subir imagen a la galería", icon: "📸", color: A.coral },
          ].map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 14px", borderRadius: 12, marginBottom: 6,
              background: A.bg, cursor: "pointer", transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = A.cloud; }}
              onMouseLeave={e => { e.currentTarget.style.background = A.bg; }}
            >
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: a.color }}>{a.label}</span>
            </div>
          ))}
        </div>

        <div style={{ background: A.card, borderRadius: 18, padding: "24px", border: `1px solid ${A.border}` }}>
          <h4 style={{ fontFamily: F.display, fontSize: 18, color: A.navy, marginBottom: 16 }}>Actividad reciente</h4>
          {[
            { msg: "Entrada 'La fundación que no se detuvo' publicada", time: "Hace 2 días", icon: "📝" },
            { msg: "Nueva imagen subida a la galería (jornada 21M)", time: "Hace 5 días", icon: "🖼️" },
            { msg: "Testimonio de Familia Choque en revisión", time: "Hace 1 semana", icon: "💬" },
            { msg: "Perfil del equipo actualizado (Lic. Ana P.)", time: "Hace 2 semanas", icon: "👥" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${A.border}` : "none" }}>
              <span style={{ fontSize: 16, marginTop: 1 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: 13, color: A.body, lineHeight: 1.4 }}>{a.msg}</div>
                <div style={{ fontSize: 11, color: A.muted, marginTop: 3 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CMS note */}
      <div style={{ marginTop: 20, padding: "18px 22px", borderRadius: 14, background: A.mint, border: `1px solid rgba(26,138,125,.12)`, display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ fontSize: 20, marginTop: 2 }}>ℹ️</span>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: A.navy, marginBottom: 4 }}>Sobre este panel</div>
          <div style={{ fontSize: 13, color: A.body, lineHeight: 1.6 }}>
            Este panel utiliza <strong>Decap CMS</strong>, un gestor de contenido gratuito basado en Git. Los cambios que realizas aquí se guardan directamente en GitHub y el sitio se actualiza automáticamente en Vercel. No necesitas saber programar.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ BLOG EDITOR ═══ */
function BlogEditor({ post, onBack }) {
  const [title, setTitle] = useState(post?.title || "");
  const [category, setCategory] = useState(post?.category || "Noticias");
  const [body, setBody] = useState(post ? `## Introducción\n\nEscribe aquí el contenido del artículo.\n\n## Desarrollo\n\nPuedes usar **negrita**, *cursiva*, listas y más.\n\n## Cierre\n\nMensaje final.` : "");
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("editor");

  const handleSave = (publish = false) => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ padding: "24px 28px", height: "calc(100vh - 60px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Editor header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: F.display, fontSize: 22, color: A.navy }}>
            {post ? "Editar entrada" : "Nueva entrada"}
          </h2>
          <p style={{ fontSize: 13, color: A.muted }}>Los cambios se guardan en GitHub y el sitio se actualiza automáticamente.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {saved && (
            <div style={{ padding: "9px 16px", borderRadius: 10, background: "#f0fdf4", color: "#166534", fontSize: 13, fontWeight: 600 }}>
              ✓ Guardado
            </div>
          )}
          <button onClick={() => handleSave(false)} style={{
            padding: "9px 22px", borderRadius: 50, border: `1.5px solid ${A.border}`,
            background: A.white, color: A.navy, fontSize: 13.5, fontWeight: 600,
            cursor: "pointer", fontFamily: F.body, transition: "all .2s",
          }}>Guardar borrador</button>
          <button onClick={() => handleSave(true)} style={{
            padding: "9px 22px", borderRadius: 50, border: "none",
            background: A.blue, color: "#fff", fontSize: 13.5, fontWeight: 700,
            cursor: "pointer", fontFamily: F.body,
            boxShadow: `0 4px 16px ${A.blue}25`, transition: "all .2s",
          }}>Publicar →</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, flex: 1, overflow: "hidden" }}>
        {/* Main editor */}
        <div style={{ background: A.card, borderRadius: 18, border: `1px solid ${A.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: `1px solid ${A.border}`, padding: "0 20px" }}>
            {["editor", "preview"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "14px 16px", border: "none", background: "none",
                color: tab === t ? A.blue : A.muted,
                fontWeight: tab === t ? 700 : 400, fontSize: 13.5,
                cursor: "pointer", fontFamily: F.body,
                borderBottom: tab === t ? `2px solid ${A.blue}` : "2px solid transparent",
                marginBottom: -1, transition: "all .2s",
              }}>{t === "editor" ? "✏️ Editor" : "👁 Vista previa"}</button>
            ))}
          </div>

          <div style={{ padding: "20px", flex: 1, overflow: "auto" }}>
            {/* Título */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: A.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 7 }}>Título *</label>
              <input
                value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Escribe el título del artículo..."
                style={{
                  width: "100%", fontSize: 18, fontFamily: F.display,
                  padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${A.border}`,
                  outline: "none", color: A.navy, background: A.bg, boxSizing: "border-box",
                  transition: "border-color .2s",
                }}
                onFocus={e => e.target.style.borderColor = A.blue}
                onBlur={e => e.target.style.borderColor = A.border}
              />
            </div>

            {/* Body / Preview */}
            {tab === "editor" ? (
              <div>
                {/* Markdown toolbar */}
                <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
                  {[
                    { label: "H2", tip: "Título" }, { label: "H3", tip: "Subtítulo" },
                    { label: "B", tip: "Negrita" }, { label: "I", tip: "Cursiva" },
                    { label: "—", tip: "Separador" },
                    { label: "🔗", tip: "Enlace" }, { label: "📷", tip: "Imagen" },
                    { label: "❝", tip: "Cita" },
                  ].map(btn => (
                    <button key={btn.label} title={btn.tip} style={{
                      padding: "5px 11px", borderRadius: 8, border: `1px solid ${A.border}`,
                      background: A.white, color: A.body, fontSize: 12, fontWeight: 700,
                      cursor: "pointer", fontFamily: F.body, transition: "all .15s",
                    }}
                      onMouseEnter={e => { e.target.style.background = A.cloud; e.target.style.borderColor = A.blue; e.target.style.color = A.blue; }}
                      onMouseLeave={e => { e.target.style.background = A.white; e.target.style.borderColor = A.border; e.target.style.color = A.body; }}
                    >{btn.label}</button>
                  ))}
                </div>
                <label style={{ fontSize: 11, fontWeight: 700, color: A.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 7 }}>Contenido (Markdown) *</label>
                <textarea
                  value={body} onChange={e => setBody(e.target.value)}
                  style={{
                    width: "100%", minHeight: 360, padding: "16px",
                    borderRadius: 12, border: `1.5px solid ${A.border}`,
                    fontSize: 14, fontFamily: "monospace", lineHeight: 1.7,
                    color: A.body, background: A.bg, outline: "none",
                    resize: "vertical", boxSizing: "border-box", transition: "border-color .2s",
                  }}
                  onFocus={e => e.target.style.borderColor = A.blue}
                  onBlur={e => e.target.style.borderColor = A.border}
                />
                <div style={{ fontSize: 12, color: A.muted, marginTop: 6 }}>
                  Usa **texto** para negrita, *texto* para cursiva, ## para títulos. <a href="#" style={{ color: A.blue }}>Ver guía Markdown →</a>
                </div>
              </div>
            ) : (
              /* Preview */
              <div style={{ background: A.bg, borderRadius: 12, padding: "24px", minHeight: 320 }}>
                <h1 style={{ fontFamily: F.display, fontSize: 28, color: A.navy, marginBottom: 16 }}>{title || "(Sin título)"}</h1>
                {body.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h2 key={i} style={{ fontFamily: F.display, fontSize: 20, color: A.navy, margin: "20px 0 8px" }}>{line.slice(3)}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} style={{ fontFamily: F.display, fontSize: 16, color: A.navy, margin: "16px 0 6px" }}>{line.slice(4)}</h3>;
                  if (line === "") return <div key={i} style={{ height: 12 }} />;
                  return <p key={i} style={{ fontSize: 15, color: A.body, lineHeight: 1.75, marginBottom: 6 }}>{line.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1")}</p>;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar: metadata */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, overflow: "auto" }}>
          <div style={{ background: A.card, borderRadius: 18, padding: "20px", border: `1px solid ${A.border}` }}>
            <h5 style={{ fontFamily: F.display, fontSize: 16, color: A.navy, marginBottom: 14 }}>Metadatos</h5>

            <label style={{ fontSize: 11, fontWeight: 700, color: A.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Categoría</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{
              width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${A.border}`,
              fontSize: 13.5, fontFamily: F.body, color: A.text, background: A.bg,
              outline: "none", marginBottom: 14, boxSizing: "border-box",
            }}>
              {["Noticias", "Campañas", "Eventos", "Inclusión", "Prensa", "Recursos"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <label style={{ fontSize: 11, fontWeight: 700, color: A.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Fecha de publicación</label>
            <input type="date" defaultValue={new Date().toISOString().split("T")[0]} style={{
              width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${A.border}`,
              fontSize: 13.5, fontFamily: F.body, color: A.text, background: A.bg,
              outline: "none", marginBottom: 14, boxSizing: "border-box",
            }} />

            <label style={{ fontSize: 11, fontWeight: 700, color: A.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Resumen (excerpt)</label>
            <textarea placeholder="Breve descripción para listados y SEO..." style={{
              width: "100%", height: 80, padding: "10px 12px", borderRadius: 10,
              border: `1.5px solid ${A.border}`, fontSize: 13, fontFamily: F.body,
              color: A.text, background: A.bg, outline: "none", resize: "none",
              boxSizing: "border-box", lineHeight: 1.55,
            }} />
          </div>

          <div style={{ background: A.card, borderRadius: 18, padding: "20px", border: `1px solid ${A.border}` }}>
            <h5 style={{ fontFamily: F.display, fontSize: 16, color: A.navy, marginBottom: 14 }}>Imagen destacada</h5>
            <div style={{
              border: `2px dashed ${A.border}`, borderRadius: 14,
              padding: "28px 20px", textAlign: "center",
              background: A.bg, cursor: "pointer", transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = A.blue; e.currentTarget.style.background = A.cloud; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = A.border; e.currentTarget.style.background = A.bg; }}
            >
              <div style={{ fontSize: 30, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 13, color: A.muted, lineHeight: 1.5 }}>
                Arrastra una imagen aquí<br />o <span style={{ color: A.blue, fontWeight: 600 }}>haz clic para buscar</span>
              </div>
              <div style={{ fontSize: 11, color: A.muted, marginTop: 8 }}>JPG, PNG · Máx. 5 MB</div>
            </div>
            <div style={{ fontSize: 12, color: A.muted, marginTop: 8, lineHeight: 1.5 }}>
              ⚠️ Solo imágenes con autorización escrita de los padres para fotos de niños.
            </div>
          </div>

          <div style={{ background: A.card, borderRadius: 18, padding: "20px", border: `1px solid ${A.border}` }}>
            <h5 style={{ fontFamily: F.display, fontSize: 16, color: A.navy, marginBottom: 14 }}>SEO</h5>
            {[
              { label: "Etiquetas (tags)", placeholder: "inclusión, síndrome de Down..." },
              { label: "Meta descripción", placeholder: "Descripción para Google (160 caracteres máx.)" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: A.muted, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input placeholder={f.placeholder} style={{
                  width: "100%", padding: "9px 12px", borderRadius: 10, border: `1.5px solid ${A.border}`,
                  fontSize: 13, fontFamily: F.body, background: A.bg, outline: "none", boxSizing: "border-box",
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ COLLECTION LIST VIEW ═══ */
function CollectionView({ collection, onEdit }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");

  const data = collection === "blog" ? POSTS
    : collection === "testimonios" ? TESTIMONIOS
    : collection === "equipo" ? EQUIPO
    : [];

  const filtered = data.filter(item => {
    const title = item.title || item.familia || item.nombre || "";
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todos" || item.status === filter;
    return matchSearch && matchFilter;
  });

  const labels = {
    blog: { title: "Blog / Noticias", new: "Nueva entrada", icon: "📝" },
    testimonios: { title: "Testimonios de familias", new: "Agregar testimonio", icon: "💬" },
    equipo: { title: "Equipo profesional", new: "Agregar miembro", icon: "👥" },
  };
  const l = labels[collection] || { title: "Colección", new: "Nuevo", icon: "📄" };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: F.display, fontSize: 24, color: A.navy, marginBottom: 4 }}>{l.icon} {l.title}</h2>
          <p style={{ fontSize: 13, color: A.muted }}>{filtered.length} elemento{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => onEdit(null)} style={{
          padding: "10px 24px", borderRadius: 50, border: "none",
          background: A.blue, color: "#fff", fontSize: 13.5, fontWeight: 700,
          cursor: "pointer", fontFamily: F.body,
          boxShadow: `0 4px 16px ${A.blue}25`, transition: "all .2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "none"}
        >+ {l.new}</button>
      </div>

      {/* Search + filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar..."
          style={{
            flex: 1, padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${A.border}`,
            fontSize: 13.5, fontFamily: F.body, background: A.white, outline: "none",
            transition: "border-color .2s", boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.borderColor = A.blue}
          onBlur={e => e.target.style.borderColor = A.border}
        />
        <div style={{ display: "flex", gap: 6 }}>
          {["todos", "publicado", "borrador"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "9px 16px", borderRadius: 50, border: `1.5px solid ${filter === f ? A.blue : A.border}`,
              background: filter === f ? A.blue : A.white, color: filter === f ? "#fff" : A.muted,
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F.body, transition: "all .2s",
            }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: A.card, borderRadius: 18, border: `1px solid ${A.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: collection === "blog" ? "1fr 130px 120px 120px 100px" : "1fr 160px 120px 80px", padding: "12px 20px", borderBottom: `1px solid ${A.border}`, background: A.bg }}>
          {(collection === "blog"
            ? ["Título", "Categoría", "Estado", "Fecha", ""]
            : collection === "testimonios"
            ? ["Familia", "Programa", "Estado", ""]
            : ["Nombre", "Área", "Estado", ""]
          ).map((h, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 700, color: A.muted, letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {filtered.map((item, i) => (
          <div key={item.id} style={{
            display: "grid",
            gridTemplateColumns: collection === "blog" ? "1fr 130px 120px 120px 100px" : "1fr 160px 120px 80px",
            padding: "16px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${A.border}` : "none",
            alignItems: "center", transition: "background .15s", cursor: "pointer",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#fafbfd"}
            onMouseLeave={e => e.currentTarget.style.background = A.white}
            onClick={() => onEdit(item)}
          >
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: A.navy, marginBottom: 2 }}>
                {item.title || item.familia || item.nombre}
              </div>
              {item.cargo && <div style={{ fontSize: 12, color: A.muted }}>{item.cargo}</div>}
            </div>
            <div>
              {item.category && (
                <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 700, background: `${CAT_COLORS[item.category]}18`, color: CAT_COLORS[item.category] || A.muted }}>{item.category}</span>
              )}
              {item.programa && <span style={{ fontSize: 13, color: A.body }}>{item.programa}</span>}
              {item.area && <span style={{ fontSize: 13, color: A.body }}>{item.area}</span>}
            </div>
            <Badge status={item.status} />
            {item.date && <div style={{ fontSize: 12, color: A.muted }}>{item.date}</div>}
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{
                padding: "5px 14px", borderRadius: 8, border: `1px solid ${A.border}`,
                background: A.white, color: A.blue, fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: F.body,
              }} onClick={e => { e.stopPropagation(); onEdit(item); }}>Editar</button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: A.muted, fontSize: 14 }}>
            No se encontraron resultados para "{search}"
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ PLACEHOLDER VIEW ═══ */
function PlaceholderView({ icon, title, description }) {
  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 20 }}>{icon}</div>
      <h3 style={{ fontFamily: F.display, fontSize: 24, color: A.navy, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 15, color: A.muted, maxWidth: 400, lineHeight: 1.65 }}>{description}</p>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function AdminPage() {
  const [section, setSection] = useState("dashboard");
  const [editing, setEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
    setEditing(true);
  };

  const handleBack = () => {
    setEditing(false);
    setEditItem(null);
  };

  const renderContent = () => {
    if (editing && (section === "blog")) {
      return <BlogEditor post={editItem} onBack={handleBack} />;
    }
    switch (section) {
      case "dashboard": return <DashboardView />;
      case "blog": return <CollectionView collection="blog" onEdit={handleEdit} />;
      case "testimonios": return <CollectionView collection="testimonios" onEdit={handleEdit} />;
      case "equipo": return <CollectionView collection="equipo" onEdit={handleEdit} />;
      case "imagenes": return <PlaceholderView icon="🖼️" title="Galería de imágenes" description="Gestiona las fotos del sitio. Las imágenes se almacenan en Cloudflare R2 (10 GB gratuitos). Solo sube fotos con autorización firmada de los padres para imágenes de niños." />;
      case "config": return <PlaceholderView icon="⚙️" title="Configuración del sitio" description="Edita el nombre, descripción, datos de contacto, redes sociales y colores del sitio. Cambios se aplican en el próximo despliegue de Vercel." />;
      default: return <DashboardView />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: F.body, background: A.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html,body{height:100%}body{font-family:'DM Sans',sans-serif}
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}
      `}</style>

      <Sidebar active={section} setActive={(id) => { setSection(id); setEditing(false); setEditItem(null); }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar section={section} onBack={handleBack} editing={editing} />
        <div style={{ flex: 1, overflow: "auto" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
