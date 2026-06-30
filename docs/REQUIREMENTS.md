# REQUIREMENTS.md — Especificación de Requerimientos

> Versión: 1.0 (borrador — completar tras la entrevista)
> Estado: ⬜ Pendiente de aprobación por la fundación

---

## Información del proyecto

| Campo | Detalle |
|---|---|
| Proyecto | Página Web Institucional Fundación PRO-21 |
| Cliente | Fundación PRO-21 / Centro Lápiz en Mano |
| Desarrollador | UCB Carrera Ingeniería de Sistemas |
| Supervisor | M.Sc. Orlando Rivera |
| Versión del documento | 1.0 |
| Fecha | ___ / ___ / 2026 |
| Estado | Borrador |

---

## Requerimientos funcionales

### RF-01 · Página de Inicio
- **Descripción:** Página principal con presentación visual de la fundación
- **Debe incluir:**
  - Hero con imagen/video de fondo, eslogan y llamada a la acción
  - Sección de cifras de impacto (número de niños atendidos, años de servicio, etc.)
  - Cards de acceso rápido a los 3 programas (Mi Escuelita Down, Aula Wawitas, Pasos Firmes)
  - Sección de testimonios destacados
  - Sección de noticias recientes (últimas 3 del blog)
  - Sección de llamada a colaborar/donar
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-02 · Quiénes Somos
- **Descripción:** Historia, identidad y valores institucionales
- **Debe incluir:**
  - Historia de la fundación
  - Misión y Visión
  - Los 8 valores institucionales (confirmar en entrevista)
  - Presentación conjunta de PRO-21 y Centro Lápiz en Mano
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-03 · Mi Escuelita Down
- **Descripción:** Programa para niños con síndrome de Down
- **Debe incluir:**
  - Descripción general del programa
  - Los 4 niveles por edad (nombres y rangos de edad a confirmar)
  - Los 8 servicios terapéuticos (a listar en entrevista)
  - Programa Crecer para jóvenes
  - Galería de fotos del programa
  - Llamada a la acción (contactar/inscribir)
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-04 · Aula Wawitas
- **Descripción:** Programa para autismo y neurodesarrollo
- **Debe incluir:**
  - Descripción del programa
  - Los 9 servicios especializados (a listar en entrevista)
  - Enfoque de detección temprana
  - Galería de fotos
  - Llamada a la acción
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-05 · Pasos Firmes
- **Descripción:** Programa para dificultades de aprendizaje
- **Debe incluir:**
  - Descripción del programa
  - Las 7 áreas de intervención (a listar en entrevista)
  - Descripción de dislexia, discalculia y problemas de atención
  - Llamada a la acción
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-06 · Nuestro Equipo
- **Descripción:** Presentación del equipo profesional
- **Debe incluir:**
  - Foto y nombre de cada profesional
  - Cargo y especialidad
  - Breve descripción/formación
- **Prioridad:** Media
- **Estado:** ⬜ Pendiente

### RF-07 · Impacto
- **Descripción:** Resultados y transparencia
- **Debe incluir:**
  - Historias reales de familias (con permiso)
  - Cifras e indicadores de impacto
  - Galería de fotos y/o videos
  - Espacio para informes anuales descargables (PDF)
- **Prioridad:** Media
- **Estado:** ⬜ Pendiente

### RF-08 · Colabora
- **Descripción:** Sección para recibir apoyo externo
- **Debe incluir:**
  - Información sobre donaciones (con datos bancarios o botón de pago externo)
  - Formulario de voluntariado
  - Información sobre alianzas institucionales
- **Prioridad:** Media
- **Nota:** Sin procesamiento de pagos interno en v1
- **Estado:** ⬜ Pendiente

### RF-09 · Para Familias
- **Descripción:** Recursos de apoyo para las familias
- **Debe incluir:**
  - Recursos descargables (guías, materiales)
  - Información sobre sesiones virtuales gratuitas
  - Red de Apoyo para Padres
- **Prioridad:** Media
- **Estado:** ⬜ Pendiente

### RF-10 · Blog / Noticias
- **Descripción:** Espacio editorial actualizable por la fundación
- **Debe incluir:**
  - Listado de posts con imagen, título, fecha y resumen
  - Vista de post individual completo
  - Categorías: campañas, eventos, notas de prensa, artículos
  - Gestionable desde Decap CMS sin tocar código
- **Prioridad:** Media
- **Estado:** ⬜ Pendiente

### RF-11 · Contacto
- **Descripción:** Canales de comunicación con la fundación
- **Debe incluir:**
  - Formulario de contacto con campos: nombre, email, teléfono, mensaje
  - Mapa de ubicación (Google Maps embed)
  - Número de WhatsApp con link directo: 70106276
  - Links a redes sociales
  - Dirección física
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-12 · Botón WhatsApp flotante
- **Descripción:** Acceso rápido a WhatsApp desde cualquier página
- **Debe incluir:** Botón fijo en esquina inferior derecha, visible en todas las páginas
- **Número:** 70106276
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-13 · Internacionalización (ES/EN)
- **Descripción:** Versión completa del sitio en español e inglés
- **Rutas:** `/es/` y `/en/`
- **Selector de idioma:** visible en el header
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-14 · Panel de administración CMS
- **Descripción:** Interfaz para que la fundación actualice el sitio
- **Acceso:** `/admin`
- **Puede gestionar:** blog, testimonios, perfiles de equipo, imágenes
- **Prioridad:** Alta
- **Estado:** ⬜ Pendiente

### RF-15 · Accesibilidad
- **Descripción:** Opciones de personalización visual
- **Debe incluir:**
  - Botón para aumentar/disminuir tamaño de texto
  - Botón para cambiar a modo de alto contraste
- **Prioridad:** Media
- **Estado:** ⬜ Pendiente

---

## Requerimientos no funcionales

### RNF-01 · Rendimiento
- Lighthouse Performance Score: > 90
- Tiempo de carga en 3G: < 3 segundos
- Core Web Vitals: todos en verde

### RNF-02 · Accesibilidad
- Lighthouse Accessibility Score: > 90
- Cumplimiento WCAG 2.1 nivel AA (mínimo)
- Texto alternativo en todas las imágenes

### RNF-03 · SEO
- Lighthouse SEO Score: > 90
- Meta tags completos en todas las páginas
- Open Graph para compartir en redes sociales
- sitemap.xml y robots.txt configurados

### RNF-04 · Compatibilidad
- Navegadores: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- Dispositivos: móvil (desde 320px), tablet (768px+), desktop (1280px+)
- Sistema operativo: iOS 14+, Android 10+, Windows 10+, macOS 11+

### RNF-05 · Seguridad
- HTTPS obligatorio (SSL automático vía Vercel)
- Sin datos sensibles en el frontend
- Formularios con validación y protección básica contra spam

### RNF-06 · Mantenibilidad
- Código documentado en español
- Componentes reutilizables y bien nombrados
- README.md con instrucciones claras para futuros desarrolladores
- Contenido separado del código (vía Markdown + CMS)

### RNF-07 · Costo operativo
- Máximo $15 USD/año (solo dominio)
- Hosting, CMS, SSL y almacenamiento gratuitos

---

## Requerimientos excluidos del alcance (v2 futura)

> Estos requerimientos fueron identificados pero NO forman parte de este proyecto.
> Documentarlos evita que se agreguen sin consenso.

| ID | Descripción | Razón de exclusión |
|---|---|---|
| RE-01 | Sistema de reserva de citas en línea | Fuera del alcance del Proyecto Social |
| RE-02 | Área privada para familias con login | Requiere backend y BD adicionales |
| RE-03 | Procesamiento de pagos interno | Complejidad técnica y legal |
| RE-04 | Aplicación móvil | Fuera del alcance |
| RE-05 | Chat en vivo | Servicios de terceros con costo |
| RE-06 | Portal de voluntarios con gestión | Base de datos requerida |
| RE-07 | Certificados o diplomas generados en línea | Fuera del alcance |

---

## Aprobación

| Rol | Nombre | Firma | Fecha |
|---|---|---|---|
| Director UCB | M.Sc. Orlando Rivera | | |
| Representante Fundación | | | |
| Líder del equipo | | | |
