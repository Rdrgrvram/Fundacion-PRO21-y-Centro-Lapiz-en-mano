# TEAM.md — Roles y Responsabilidades del Equipo

> Proyecto Social UCB — Carrera Ingeniería de Sistemas
> 6 estudiantes · 40 horas de servicio social cada uno

---

## Supervisor

| Nombre | Cargo | Contacto |
|---|---|---|
| M.Sc. Orlando Rivera | Director, Carrera Ingeniería de Sistemas UCB La Paz | _______________ |

**Responsabilidades del supervisor:**
- Garantizar la calidad del producto final
- Resolver bloqueos técnicos o de decisión
- Firmar el convenio y el acta de entrega
- Mediar entre el equipo y la fundación en caso de conflictos de alcance

---

## Estructura del equipo

### Scrum Master

| Campo | Detalle |
|---|---|
| Integrante | Rodrigo Rivera |
| Horas | 40h |

**Responsabilidades:**
- Facilitar las ceremonias Scrum (Daily, Sprint Planning, Review, Retrospectiva)
- Eliminar bloqueos del equipo
- Asegurar que el equipo siga las convenciones definidas en SCRUM.md
- Coordinar comunicación entre el equipo, supervisor y fundación

---

### Rol 1 — Diseño Visual (1 persona)

| Campo | Detalle |
|---|---|
| Integrante 1 | _______________ |
| Horas | 40h |

**Responsabilidades:**
- Definir el sistema de diseño: colores, tipografía, espaciado, íconos
- Diseñar wireframes de alta fidelidad para las 11 secciones
- Crear los mockups navegables (base: mockups JSX existentes)
- Asistir en la presentación del diseño a la fundación
- Revisar que la implementación de frontend coincida con el diseño
- Preparar assets exportados para el equipo de frontend

**Entregables principales:**
- Sistema de diseño documentado
- Mockups de las 11 secciones aprobados por la fundación
- Assets en formatos listos para web (SVG, WebP)

---

### Rol 2 — Frontend (2 personas)

| Campo | Detalle |
|---|---|
| Integrante 1 | _______________ |
| Integrante 2 | _______________ |
| Horas | 40h cada uno |

**Responsabilidades:**
- Implementar todos los componentes en Next.js + Tailwind
- Construir las 11 páginas del sitio
- Integrar el contenido real de la fundación en las páginas estáticas
- Asegurar responsive design (mobile-first)
- Implementar el selector de idioma y las rutas `/es/` y `/en/`
- Integrar el botón flotante de WhatsApp
- Implementar la barra de accesibilidad (tamaño de texto y contraste)
- Optimizar performance (Lighthouse > 90)

**División sugerida de páginas:**
- Frontend 1: Inicio, Quiénes somos, Equipo, Contacto, Impacto
- Frontend 2: Mi Escuelita Down, Aula Wawitas, Pasos Firmes, Colabora, Familias, Blog

**Entregables principales:**
- Todas las páginas implementadas y funcionales
- Lighthouse score > 90 en todas las páginas
- Sitio responsive verificado en dispositivos reales o simulados

---

### Rol 3 — Sistema Interno / Backend (1 persona)

| Campo | Detalle |
|---|---|
| Integrante 1 | _______________ |
| Horas | 40h |

**Responsabilidades:**
- Configurar Decap CMS (`/admin/config.yml`)
- Configurar Cloudflare R2 para almacenamiento de imágenes
- Implementar el formulario de contacto funcional (con Resend o Formspree)
- Configurar las variables de entorno en Vercel
- Gestionar el repositorio GitHub (ramas, protecciones, CI/CD)
- Configurar el deploy automático en Vercel
- Registrar y configurar el dominio
- Configurar Google Search Console y Analytics
- Implementar sitemap.xml y robots.txt
- Configurar las traducciones i18n (archivos `es.ts` y `en.ts`)

**Entregables principales:**
- CMS funcional con autenticación GitHub
- Formulario de contacto funcionando con envío real de email
- Deploy automático configurado (GitHub → Vercel)
- Dominio configurado con SSL
- Variables de entorno documentadas

---

### Rol 4 — QA y Documentación (1 persona)

| Campo | Detalle |
|---|---|
| Integrante | _______________ |
| Horas | 40h |

**Responsabilidades:**
- Ejecutar el plan de pruebas completo (ver ROADMAP.md, Semana 7)
- Registrar y reportar bugs encontrados
- Verificar que el contenido real esté cargado correctamente
- Verificar las traducciones al inglés
- Redactar el Manual de Usuario del CMS
- Redactar el Manual de Administración del sitio
- Redactar la Guía de renovación del dominio
- Elaborar el documento técnico para futuros mantenimientos
- Coordinar la sesión de capacitación final con la fundación
- Preparar el acta de entrega

**Entregables principales:**
- Reporte de pruebas completado y firmado
- Manual de Usuario CMS (en lenguaje no técnico, con capturas de pantalla)
- Manual de Administración del sitio
- Guía de renovación del dominio
- Acta de entrega del proyecto

---

## Canales de comunicación del equipo

| Canal | Uso | Frecuencia |
|---|---|---|
| _______________ (WhatsApp/Discord) | Comunicación diaria del equipo | Diaria |
| GitHub Issues | Reporte de bugs y tareas técnicas | Cuando aplique |
| GitHub Projects | Tablero de tareas (Kanban) | Revisión semanal |
| Reuniones con la fundación | Revisiones formales | 3–4 veces en 8 semanas |
| Email con el supervisor | Reportes de avance | Semanal |

---

## Reglas del equipo

1. **Commits en español** con prefijos convencionales: `feat:`, `fix:`, `content:`, `style:`, `docs:`
2. **Nunca hacer push directo a `main`** — siempre usar Pull Requests desde `develop` o ramas de feature
3. **Documentar lo que haces** — comentarios en el código para facilitar el trabajo de los demás
4. **Avisar con anticipación** si hay bloqueos o imprevistos
5. **El contenido de la fundación es confidencial** — no compartir fuera del equipo sin autorización
6. **Las fotos de niños son especialmente sensibles** — usarlas solo en el sitio, con autorización verificada
7. **Respetar el alcance definido en REQUIREMENTS.md** — si la fundación pide algo nuevo, escalar al supervisor

---

## Tablero de tareas sugerido (GitHub Projects)

**Columnas:**
- 📋 Backlog
- 🔄 En progreso
- 👀 En revisión
- ✅ Completado

**Etiquetas:**
- `diseño` — tareas del equipo de diseño
- `frontend` — componentes y páginas
- `sistema` — CMS, deploy, dominio
- `contenido` — carga de texto, fotos
- `qa` — pruebas y bugs
- `docs` — documentación y manuales
- `bloqueado` — esperando algo externo (fundación, supervisor)
- `urgente` — bloquea a otros

---

## Registro de horas (plantilla semanal)

> Cada integrante debe registrar sus horas para el informe final del Proyecto Social.

| Integrante | Rol | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | Total |
|---|---|---|---|---|---|---|---|---|---|---|
| Rodrigo Rivera | Scrum Master | | | | | | | | | /40h |
| | Diseño | | | | | | | | | /40h |
| | Frontend | | | | | | | | | /40h |
| | Frontend | | | | | | | | | /40h |
| | Sistema | | | | | | | | | /40h |
| | QA/Docs | | | | | | | | | /40h |
| **TOTAL** | | | | | | | | | | **/240h** |
