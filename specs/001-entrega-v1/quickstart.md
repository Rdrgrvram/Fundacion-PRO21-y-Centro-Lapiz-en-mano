# Quickstart: validación de la Entrega v1

Ejecutar sobre un build de producción (`npm run build && npm start -- -p 3100`).

| # | Escenario | Cómo se valida | Resultado esperado |
|---|---|---|---|
| Q1 | Fotos sin permiso | Abrir `/es/aula-wawitas`, `/es/pasos-firmes` y la galería de `/es/impacto` | Sin fotos de niños de esos programas; páginas completas y dignas |
| Q2 | Testimonios | Inicio, Impacto, Familias y cada programa | Solo los 3 de la fundación, sin nombres completos |
| Q3 | Contacto sin clave | `POST /api/contact` y `/api/volunteer` sin `RESEND_API_KEY` | HTTP 503 con mensaje; el sitio muestra error + WhatsApp |
| Q4 | Contacto con clave | Mismo POST con clave de prueba y datos válidos | HTTP 200 y correo recibido |
| Q5 | Validación | Correo inválido / campos vacíos / honeypot | HTTP 400 con mensaje |
| Q6 | Idioma | `curl /en` y `/es` | `<html lang="en">` / `<html lang="es">` |
| Q7 | SEO | `/sitemap.xml`, `/robots.txt`, `<head>` de cada página, `/favicon.ico` | Existen; hay `canonical`, `hreflang` y `og:*` |
| Q8 | Cifras | Inicio, Quiénes Somos, Equipo, Impacto (es/en) | "9 profesionales" en todos; sin "1000+" ni "8 áreas" |
| Q9 | Blog | Inicio y `/es/blog` | 3 últimas publicaciones; sin imágenes rotas |
| Q10 | Accesibilidad/perf | Lighthouse en `/es`, `/es/mi-escuelita-down`, `/es/contacto`; barrido a 375px | ≥ 90 en las 4 categorías; sin áreas < 44px ni contraste < AA |
| Q11 | CMS | `npm run dev:cms` → crear post, testimonio y miembro; subir imagen | Se guardan con nombre legible y aparecen en el sitio |
| Q12 | Suite | `npm run test:cms` | 100% verde |
| Q13 | Entrega | Seguir `docs/entrega/GUIA-DESPLIEGUE.md` en un entorno de prueba | Sitio, panel, correo e imágenes funcionando |
