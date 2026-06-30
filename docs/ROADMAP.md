# ROADMAP.md — Plan de Trabajo Fundación PRO-21

> 8 semanas · 8 estudiantes · 40 horas/estudiante · 320 horas totales
> Inicio: tercera semana de junio 2026 · Entrega: primera semana de agosto 2026

---

## Vista general

```
Semana 1   │ Entrevista + Recopilación de materiales
Semana 2   │ Recopilación (cont.) + Definición de alcance (SRS)
Semana 3   │ Diseño visual + Prototipo navegable
Semana 4   │ ── CONSTRUCCIÓN ──────────────────────────────────
Semana 5   │    Layout base + Secciones principales
Semana 6   │    CMS + Bilingüe + Formularios + WhatsApp ───────
Semana 7   │ QA + Pruebas + Manuales
Semana 8   │ Publicación + Capacitación + Entrega formal
```

---

## Semana 1 — Investigación e inicio
**Horas:** 4h/estudiante = 32h totales

### Tareas
- [ ] Reunión presencial con la fundación (entrevista según ENTREVISTA.md)
- [ ] Recopilación de materiales institucionales (logos, fotos, textos)
- [ ] Configurar repositorio GitHub y estructura inicial del proyecto
- [ ] Instalar y configurar Next.js + Tailwind
- [ ] Crear rama `develop` y estructura de carpetas base

### Entregables
- Acta de reunión con notas de la entrevista
- Repositorio GitHub inicializado
- Carpeta `assets/` con materiales recibidos organizados

### Responsables
- Entrevista: todo el equipo (o al menos 2 personas + el supervisor)
- Setup técnico: equipo Backend/Sistema

---

## Semana 2 — Definición de alcance
**Horas:** 4h/estudiante = 32h totales

### Tareas
- [ ] Continuar recopilación de materiales faltantes
- [ ] Redactar el documento de Especificación de Requerimientos (ver REQUIREMENTS.md)
- [ ] Definir sitemap definitivo y estructura de navegación
- [ ] Validar con la fundación y el supervisor
- [ ] Planificar componentes reutilizables

### Entregables
- REQUIREMENTS.md firmado/aprobado por la fundación
- Sitemap definitivo
- Lista de componentes a desarrollar

### Responsables
- Documento de requerimientos: QA/Documentación + supervisor
- Sitemap: Diseño visual

---

## Semana 3 — Diseño visual
**Horas:** 4h/estudiante = 32h totales

### Tareas
- [ ] Definir sistema de diseño: colores, tipografía, espaciados, íconos
- [ ] Diseñar wireframes de alta fidelidad para las 11 secciones
- [ ] Construir prototipo navegable (mockups JSX existentes como base)
- [ ] Presentar a la fundación y recoger feedback
- [ ] Ajustar diseño según feedback

### Entregables
- Sistema de diseño documentado (colores, fuentes, componentes)
- Mockups aprobados por la fundación
- Acta de aprobación del diseño

### Responsables
- Diseño visual (2 personas)
- Revisión: supervisor + fundación

---

## Semana 4-6 — Construcción
**Horas:** 12h/estudiante = 96h totales

### Semana 4 — Layout y secciones estáticas
- [ ] Implementar sistema de diseño en Tailwind (tokens, variables CSS)
- [ ] Desarrollar componentes base: Header, Footer, Nav, Botón WhatsApp
- [ ] Implementar páginas: Inicio, Quiénes somos, Equipo
- [ ] Configurar internacionalización (i18n) ES/EN con App Router
- [ ] Configurar Vercel y conectar repositorio GitHub

### Semana 5 — Programas y contenido dinámico
- [ ] Implementar páginas: Mi Escuelita Down, Aula Wawitas, Pasos Firmes
- [ ] Implementar páginas: Impacto, Colabora, Para Familias
- [ ] Implementar Blog con soporte Markdown
- [ ] Implementar página de Contacto con formulario funcional
- [ ] Cargar contenido real entregado por la fundación

### Semana 6 — CMS, formularios y funcionalidades especiales
- [ ] Configurar Decap CMS (`/admin/config.yml`) para gestión de contenido
- [ ] Integrar Cloudflare R2 para almacenamiento de imágenes
- [ ] Implementar funcionalidad de accesibilidad (tamaño texto, contraste)
- [ ] Optimizar SEO: meta tags, Open Graph, sitemap.xml, robots.txt
- [ ] Pruebas de responsive en distintos dispositivos
- [ ] Verificar versión en inglés completa

### Entregables de la fase
- Sitio funcional en URL de Vercel (preview)
- CMS configurado y funcional
- Todas las secciones con contenido real

### Responsables
- Frontend (3 personas): componentes y páginas
- Backend/Sistema (2 personas): CMS, R2, formularios, i18n
- Diseño visual (2 personas): revisión de implementación vs. diseño
- QA (1 persona): pruebas continuas durante la construcción

---

## Semana 7 — QA y manuales
**Horas:** 4h/estudiante = 32h totales

### Pruebas a realizar
- [ ] Compatibilidad en navegadores: Chrome, Firefox, Safari, Edge
- [ ] Responsive: móvil (320px, 375px, 414px), tablet (768px), desktop (1280px+)
- [ ] Formulario de contacto: envío, validación, mensajes de error
- [ ] Botón WhatsApp en iOS y Android
- [ ] Links internos y externos (sin links rotos)
- [ ] Velocidad de carga (Lighthouse score > 90)
- [ ] Accesibilidad básica (Lighthouse accessibility > 90)
- [ ] SEO básico (Lighthouse SEO > 90)
- [ ] CMS: crear, editar y eliminar entradas de blog
- [ ] CMS: subir y gestionar imágenes
- [ ] Versión en inglés: revisar traducciones
- [ ] Formulario de donación: redirección correcta

### Documentación a entregar
- [ ] Manual de usuario del CMS (en lenguaje no técnico)
- [ ] Manual de administración del sitio
- [ ] Guía de renovación del dominio
- [ ] Documento de arquitectura técnica (para futuros mantenimientos)

### Entregables
- Reporte de pruebas completado
- Lista de bugs corregidos
- Manuales en PDF

### Responsables
- QA/Documentación (1 persona): liderar pruebas y manuales
- Todo el equipo: corrección de bugs encontrados

---

## Semana 8 — Publicación y cierre
**Horas:** 4h/estudiante = 32h totales

### Tareas
- [ ] Registro del dominio elegido por la fundación
- [ ] Configurar dominio personalizado en Vercel
- [ ] Publicación del sitio en producción
- [ ] Verificar que todo funcione en el dominio final
- [ ] Configurar Google Search Console
- [ ] Sesión de capacitación con el personal de la fundación (2-3 horas)
- [ ] Entrega formal del proyecto con acta de recepción
- [ ] Entrega de manuales y documentación
- [ ] Entrega de credenciales (GitHub, Vercel, Cloudflare, CMS)

### Entregables finales
- Sitio publicado en dominio definitivo ✅
- Documento de entrega firmado por ambas partes ✅
- Manuales entregados ✅
- Credenciales transferidas a la fundación ✅
- Inicio del período de soporte de 30 días ✅

### Responsables
- Todo el equipo
- Supervisor: firma del acta de entrega

---

## Horas por rol

| Rol | Personas | Horas/persona | Total horas |
|---|---|---|---|
| Diseño visual | 2 | 40 | 80h |
| Frontend | 3 | 40 | 120h |
| Backend/Sistema | 2 | 40 | 80h |
| QA y documentación | 1 | 40 | 40h |
| **TOTAL** | **8** | **40** | **320h** |

---

## Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| La fundación no entrega materiales a tiempo | Alta | Alto | Usar placeholders; definir fecha límite dura en la entrevista |
| Cambios de alcance en medio del proyecto | Media | Alto | Documentar el alcance en REQUIREMENTS.md y hacerlo firmar |
| Bugs de último momento en semana 8 | Media | Medio | Dejar buffer en semana 7 para correcciones |
| Problemas con el dominio `.bo` | Baja | Medio | Recomendar `.org` desde el inicio |
| Integrante del equipo no disponible | Baja | Alto | Documentar bien el código; cualquiera puede retomar |
| Vercel limita el plan gratuito | Muy baja | Alto | Tener Cloudflare Pages como alternativa lista |

---

## Reuniones planificadas

| # | Semana | Tipo | Participantes | Objetivo |
|---|---|---|---|---|
| 1 | Semana 1 | Presencial | Equipo + Fundación + Supervisor | Entrevista inicial, recopilación de requisitos |
| 2 | Semana 3 | Presencial/Virtual | Equipo + Fundación | Presentación y aprobación del diseño |
| 3 | Semana 6 | Virtual | Equipo + Fundación | Revisión del sitio en construcción |
| 4 | Semana 8 | Presencial | Equipo + Fundación + Supervisor | Capacitación y entrega formal |
