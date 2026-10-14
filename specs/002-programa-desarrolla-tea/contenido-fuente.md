> **12-oct-2026:** este borrador quedó superado. El contenido final (documento completo, es y en) vive en `content/programs/desarrolla-tea.es.md` y `.en.md`; esos archivos son la fuente de verdad.

# Contenido fuente — Programa Desarrolla TEA

**Fuente:** `Documentacion/PROYECTO DESARROLLATEA.md` (documento oficial del Centro Lápiz en Mano). No inventar cifras, años de trayectoria ni testimonios que no estén ahí.
**Slug propuesto:** `desarrolla-tea` · **Archivos:** `content/programs/desarrolla-tea.es.md` y `.en.md` (la versión en inglés se traduce en la implementación y la revisa Codex).
**Fotos:** `photos_authorized: false` hasta tener la autorización escrita de los padres. La galería queda vacía u oculta, igual que Aula Wawitas y Pasos Firmes.

## Borrador en español (mismo esquema que `aula-wawitas.es.md`)

```yaml
title: Desarrolla TEA
visible: true
order: 40            # después de los 3 programas actuales; confirmar
photos_authorized: false
home:
  featured: true     # DECISIÓN: el Inicio hoy acepta exactamente 3 tarjetas (min/max 3)
  icon: puzzle
  color: secondary
  badge: Trastorno del Espectro Autista
  ages: 3 – 12 años
hero:
  badge: Programa Integral Terapéutico
  subtitle: Intervención individual y grupal para niños y niñas de 3 a 12 años con Trastorno del Espectro Autista (TEA), centrada en sus fortalezas y con la familia como parte activa del proceso.
  color: secondary
  image: ''          # sin foto hasta tener autorización
  quote: Cada niño tiene un perfil único de fortalezas, necesidades, intereses y formas de comunicarse; por eso la intervención se adapta al niño, y no al revés.
  quote_author: Centro Lápiz en Mano
  quote_context: Desarrolla TEA
  cta_details_label: Ver detalles
  cta_whatsapp_label: Consultar por WhatsApp
stats:
  - { icon: baby, value: 3 – 12, label: años atendidos }
  - { icon: layers, value: '8', label: áreas de intervención }
  - { icon: users, value: '2', label: modalidades (individual y grupal) }
  - { icon: calendar, value: Lun – Sáb, label: días de atención }
section_1:
  badge: Nuestro enfoque
  title: Cómo trabajamos
  layout: tarjetas
  subtitle: Un modelo de intervención que mira al niño completo, no solo un área del desarrollo.
  items:
    - { icon: refresh-cw, color: primary, title: Integral, desc: Considera todas las dimensiones del desarrollo y evita abordar las necesidades del niño de forma aislada. }
    - { icon: puzzle, color: secondary, title: Individualizado, desc: 'Cada niño tiene su Plan Individual de Intervención, con objetivos según su perfil, fortalezas, intereses y nivel de desarrollo.' }
    - { icon: users-round, color: accent, title: Centrado en la familia, desc: La familia es parte activa del proceso, no solo receptora de información. }
    - { icon: star, color: primary, title: Basado en fortalezas, desc: 'La intervención parte de las capacidades, intereses y recursos de cada niño, no solo de sus dificultades.' }
section_2:
  badge: Modalidades
  title: Atención individual y grupal
  subtitle: Dos formas de trabajo que se complementan, entre semana y los sábados.
  tabs:
    - icon: user
      color: primary
      label: Atención individual
      age_range: 3 a 12 años
      desc: Trabaja objetivos específicos según el perfil de cada niño, a partir de un Plan Individual de Intervención (PII) con perfil inicial, fortalezas, necesidades de apoyo, objetivos, estrategias, indicadores de progreso y reajuste periódico.
      highlights: [Plan Individual de Intervención, Objetivos a medida, Indicadores de progreso, Evaluación y reajuste periódico]
    - icon: users
      color: secondary
      label: Atención grupal
      age_range: 3 a 12 años
      desc: Orientada a las habilidades que necesitan interacción con pares. Los grupos se forman según edad, nivel de desarrollo, necesidades de apoyo y objetivos, no solo por diagnóstico.
      highlights: [Juegos cooperativos y de turnos, Comunicación y habilidades sociales, Psicomotricidad grupal, Actividades artísticas y recreativas]
    - icon: calendar
      color: accent
      label: Sábados
      age_range: Niños y familias
      desc: Complementan el proceso con atención individual y grupal, habilidades sociales, psicomotricidad, autonomía, talleres familiares y actividades de integración.
      highlights: [Talleres familiares, Habilidades sociales, Psicomotricidad, Actividades de integración]
section_3:
  badge: Qué trabajamos
  title: Áreas de Intervención
  items:
    - { icon: activity, color: primary, title: Psicomotricidad, items: [Motricidad gruesa y fina, Equilibrio y coordinación, Esquema corporal y lateralidad, Planificación motora] }
    - { icon: message-circle, color: secondary, title: Comunicación y Lenguaje, items: [Comunicación funcional, Comprensión y expresión, Atención conjunta y turnos, Apoyos visuales y sistemas aumentativos] }
    - { icon: hand, color: accent, title: Integración Sensorial, items: [Estímulos táctiles visuales y auditivos, Estímulos vestibulares y propioceptivos, Regulación sensorial, Actividades individualizadas] }
    - { icon: shirt, color: primary, title: Autonomía Personal, items: [Alimentación y vestido, Higiene y uso del baño, Rutinas y orden, Toma de decisiones sencillas] }
    - { icon: brain, color: secondary, title: Estimulación Cognitiva, items: [Atención y memoria, Clasificación y secuenciación, Resolución de problemas, Funciones ejecutivas] }
    - { icon: heart-handshake, color: accent, title: Habilidades Sociales, items: [Juego compartido, Espera de turnos, Reconocimiento de emociones, Interacción con pares] }
    - { icon: book-open, color: primary, title: Apoyo Educativo, items: [Adaptaciones curriculares, Descomposición de tareas, Apoyo en lectoescritura y matemáticas, Coordinación con docentes] }
    - { icon: home, color: secondary, title: Acompañamiento Familiar, items: [Orientación individual, Estrategias para el hogar, Psicoeducación sobre TEA, Red de apoyo entre familias] }
enrollment:
  title: ¿Cómo inscribir a tu hijo?
  steps:     # resumen de los 11 pasos de la Ruta de Ingreso (sección XI)
    - { icon: phone, title: Primer contacto, desc: 'Escríbenos por WhatsApp o el formulario. Hacemos una entrevista inicial con la familia.' }
    - { icon: search, title: Valoración inicial, desc: 'Revisamos antecedentes y valoramos el desarrollo para identificar fortalezas y áreas de apoyo prioritarias. Si hace falta, coordinamos con neuropediatría u otros especialistas.' }
    - { icon: file-text, title: Plan Individual, desc: Elaboramos el Plan Individual de Intervención con objetivos a la medida del niño. }
    - { icon: sparkles, title: Intervención y seguimiento, desc: 'Comienza la atención individual y/o grupal, con orientación a la familia, seguimiento periódico y reajuste del plan.' }
cta:
  title: ¿Tu hijo tiene entre 3 y 12 años?
  text: Desarrolla TEA recibe niños y niñas de 3 a 12 años con diagnóstico de TEA o necesidades del neurodesarrollo. Contáctanos para conocer horarios y comenzar la valoración.
  link_label: Formulario de contacto
```

## Pendiente de confirmar con la Fundación
- ¿Aparece en el Inicio como 4.ª tarjeta? (hoy el CMS fuerza exactamente 3).
- Orden en el menú y en el pie de página.
- Fotos autorizadas para la galería y el hero.
- Íconos: verificar que existan en el `icon_picker` (Lucide) y en `components/ui/Icon.tsx`.

## Aviso técnico (11-oct-2026)
El YAML de arriba **no se puede copiar literal**: dentro de `{ ... }` o `[ ... ]` una coma sin comillas corta el texto. Hay que entrecomillar `section_1.items[2].desc` ("…del proceso, no solo receptora…"). Los archivos finales de `content/programs/` ya lo tienen resuelto; el texto no cambió.
