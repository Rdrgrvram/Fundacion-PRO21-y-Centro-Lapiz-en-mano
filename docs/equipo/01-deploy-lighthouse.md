# 01 · Deploy de prueba y Lighthouse (#77)

**Responsable:** Mauricio · **Desbloquea:** el QA de José (#79) y de Leo (#80) · **Tiempo:** ~2 horas

**Meta:** un sitio de prueba en `https://<proyecto>.vercel.app`, sin difundir, y una tabla de Lighthouse medida ahí.

> Entrega primero la URL. Apenas el sitio abra, avisa a José y a Leo en sus issues, y después haz Lighthouse con calma.

## Antes de empezar

- Cuenta de Vercel (plan **Hobby**, gratis) con **tu GitHub**. Para esta prueba basta tu cuenta; la institucional se hace después (#81).
- El repo es público, así que puedes importarlo desde tu cuenta si tienes acceso de colaborador.
- Pide a Rodrigo, por un canal privado (no chat grupal), la `RESEND_API_KEY` de prueba. Si no la hay todavía, deja la variable vacía: los formularios mostrarán error + WhatsApp, que es lo correcto (ver paso 4).

## Pasos

Sigue [`docs/entrega/GUIA-DESPLIEGUE.md`](../entrega/GUIA-DESPLIEGUE.md), **solo el paso 2** (Vercel) y, si hay claves, el paso 4. Resumen:

1. Vercel → **Add New → Project** → importa `Rdrgrvram/Fundacion-PRO21-y-Centro-Lapiz-en-mano`.
2. Framework **Next.js**. **Settings → Git → Production Branch = `master`**.
3. Variables de entorno (antes de desplegar):

   | Variable | Valor |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://<proyecto>.vercel.app` (sin barra final) |
   | `RESEND_API_KEY` | la de prueba, o vacía |
   | `CONTACT_FROM` | `onboarding@resend.dev` (solo envía al titular de la cuenta de Resend) |
   | `SITE_NOINDEX` | `1` — evita que Google indexe el sitio de prueba (robots.txt con `Disallow: /` y cabecera `noindex`). Se quita al lanzar |

4. **Deploy** (≈ 3 min). Si `NEXT_PUBLIC_SITE_URL` cambia, hay que **redesplegar**.
5. Entra a `/es` y `/en`. Revisa que carguen las 12 rutas (lista en el README).
6. Comprueba `/sitemap.xml`, `/robots.txt` y que `<link rel="alternate" hreflang>` use la URL real de Vercel.

El login de `/admin` **no funcionará todavía** (falta la OAuth App con la URL real). Eso es el paso 3 de la guía; coordínalo con Leo (#80): puedes crearla tú con tu GitHub para la prueba.

## Lighthouse (medir en Vercel, no en local)

En local da 73–91 y varía mucho; el número que cuenta es el de Vercel.

1. Chrome → ventana de incógnito (sin extensiones) → DevTools (F12) → pestaña **Lighthouse**.
2. Modo **Navigation**, dispositivo **Mobile**, categorías **todas**.
3. Mide **3 veces** cada ruta: `/es`, `/es/mi-escuelita-down`, `/es/contacto`.
4. Cierra otras pestañas y programas pesados mientras mides.
5. Anota en la tabla (copia este formato):

   | Ruta | Rendimiento (3 corridas) | LCP | Accesibilidad | Buenas prácticas | SEO |
   |---|---|---|---|---|---|
   | `/es` | | | | | |
   | `/es/mi-escuelita-down` | | | | | |
   | `/es/contacto` | | | | | |

6. Criterio: si Rendimiento es **≥ 90 estable**, queda cumplido (RF-012). Si no, anota las 3 cifras y qué recomienda Lighthouse; la decisión (aceptar el riesgo o ajustar peso de la foto del hero) la toma Rodrigo.

## Entregable (pegar en el issue #77)

- [ ] URL del deploy de prueba.
- [ ] Captura de Vercel → Deployments en verde, con la rama `master`.
- [ ] Tabla de Lighthouse completa.
- [ ] Variables cargadas (solo los **nombres**, nunca los valores).
- [ ] Aviso hecho a José (#79) y Leo (#80).

## No olvides

- **No difundas la URL** fuera del equipo: el sitio aún tiene contenido sin autorización completa. Con `SITE_NOINDEX=1` tampoco lo indexan los buscadores: comprueba `/robots.txt` (debe decir `Disallow: /`).
- Actualiza [`specs/001-entrega-v1/notas-rendimiento.md`](../../specs/001-entrega-v1/notas-rendimiento.md) con la tabla (rama `feature/…` y PR a `develop`).
- Issues relacionados con más detalle técnico: #60 (deploy) y #61 (Lighthouse).
