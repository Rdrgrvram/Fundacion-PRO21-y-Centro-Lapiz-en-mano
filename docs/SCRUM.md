# SCRUM.md — Guía de Trabajo con Scrum
> Proyecto Social UCB · Fundación PRO-21 · 6 personas · 8 semanas

---

## ¿Por qué Scrum para este proyecto?

Con 6 personas, 8 semanas y un cliente real (la fundación), Scrum permite:
- Entregar valor visible cada semana, no solo al final
- Detectar problemas temprano (no en la semana 7)
- Que la fundación vea avances reales y dé feedback continuo
- Que el equipo se autoorganice sin depender del supervisor para cada decisión

---

## Roles del equipo (6 personas)

### Product Owner — 1 persona
**Quién:** el integrante con mejor comunicación y disponibilidad para hablar con la fundación.

**Responsabilidades:**
- Es el puente entre el equipo y la Fundación PRO-21
- Mantiene y prioriza el **Product Backlog** (lista de tareas)
- Asiste a todas las reuniones con la fundación
- Decide qué entra en cada Sprint cuando hay conflicto de prioridades
- **No programa código** — su foco es el qué, no el cómo

**Persona asignada:** _______________

---

### Scrum Master — 1 persona
**Quién:** el integrante más organizado, no necesariamente el más técnico.

**Responsabilidades:**
- Facilita todas las ceremonias Scrum (Daily, Planning, Review, Retro)
- Elimina bloqueos que impiden avanzar al equipo
- Protege al equipo de interrupciones externas y cambios de alcance no planificados
- Lleva el registro de horas y velocidad del equipo
- **Sí puede programar** — el SM en equipos pequeños también desarrolla

**Persona asignada:** _______________

---

### Developers — 4 personas
**Quién:** los 4 integrantes restantes.

**Responsabilidades:**
- Estimar, planificar y ejecutar las tareas del Sprint
- Participar en todas las ceremonias
- Actualizar el tablero de tareas diariamente
- Hacer code review entre ellos (mínimo 1 aprobación antes de mergear)

**División sugerida de especialidades:**
| Persona | Especialidad principal | Secundaria |
|---|---|---|
| Developer 1 | Diseño UI / Tailwind | Frontend |
| Developer 2 | Frontend / Next.js | Diseño |
| Developer 3 | Frontend / Next.js | CMS |
| Developer 4 | Sistema / Backend | QA |

**Personas asignadas:**
- Developer 1: _______________
- Developer 2: _______________
- Developer 3: _______________
- Developer 4: _______________

---

## Sprints — estructura de las 8 semanas

Con 8 semanas de proyecto, se trabaja con **Sprints de 1 semana**.
Cada Sprint tiene un objetivo claro y termina con algo funcional y visible.

| Sprint | Semanas | Objetivo del Sprint |
|---|---|---|
| **Sprint 0** | Semana 1–2 | Entrevista, materiales, setup técnico, requerimientos |
| **Sprint 1** | Semana 3 | Diseño aprobado por la fundación |
| **Sprint 2** | Semana 4 | Layout base + Header/Footer + Inicio + Quiénes somos |
| **Sprint 3** | Semana 5 | Las 3 páginas de programas + Equipo |
| **Sprint 4** | Semana 6 | Impacto + Colabora + Familias + Blog + Contacto + CMS |
| **Sprint 5** | Semana 7 | QA completo + Manuales + Corrección de bugs |
| **Sprint 6** | Semana 8 | Deploy en producción + Capacitación + Entrega formal |

> **Sprint 0** dura 2 semanas porque es de investigación, no de desarrollo.
> Es normal y necesario — sin requerimientos claros, el desarrollo falla.

---

## Ceremonias Scrum (reuniones)

### 1. Sprint Planning — inicio de cada Sprint
**Cuándo:** lunes al inicio del Sprint · **Duración:** 1 hora máximo

**Agenda:**
1. El PO presenta las historias de usuario prioritarias del backlog (15 min)
2. El equipo estima cada historia con Story Points (20 min)
3. El equipo decide cuánto puede completar en el Sprint (15 min)
4. Se define el **Sprint Goal** (objetivo del Sprint en 1 oración) (10 min)

**Resultado:** Sprint Backlog — la lista de tareas comprometidas para esta semana.

---

### 2. Daily Standup — cada día
**Cuándo:** lunes a viernes, misma hora · **Duración:** 15 minutos máximo · **De pie (o llamada rápida)**

**Cada persona responde exactamente 3 preguntas:**
1. ¿Qué hice ayer?
2. ¿Qué voy a hacer hoy?
3. ¿Hay algo que me está bloqueando?

**Reglas:**
- El Scrum Master facilita y cronometra
- Los bloqueos se resuelven DESPUÉS del Daily, no durante
- Si no hay nada que reportar, igual se hace — mantiene al equipo sincronizado
- Si alguien no puede asistir, escribe sus 3 respuestas en el canal del equipo antes de la hora

---

### 3. Sprint Review — fin de cada Sprint
**Cuándo:** viernes al cierre del Sprint · **Duración:** 30–45 minutos

**Agenda:**
1. Demo en vivo de lo que se construyó (no capturas de pantalla — funcional) (20 min)
2. El PO confirma qué historias están "Done" (5 min)
3. Feedback de los presentes (incluir a la fundación en Sprints 1, 4 y 6) (10 min)
4. Actualizar el backlog con lo que no se completó (5 min)

**Reglas:**
- Solo se muestra lo que está 100% terminado según la Definición de Done
- Lo que no está Done vuelve al backlog — no se "cuenta como casi listo"

---

### 4. Sprint Retrospectiva — inmediatamente después del Review
**Cuándo:** viernes, justo después del Review · **Duración:** 30 minutos

**Agenda — cada persona responde:**
1. ¿Qué salió bien este Sprint? (mantener)
2. ¿Qué salió mal o fue difícil? (mejorar)
3. ¿Qué vamos a hacer diferente el próximo Sprint? (acción concreta)

**El Scrum Master anota las acciones y las revisa al inicio del siguiente Sprint.**

> La retrospectiva es el mecanismo de mejora continua. Sin ella, los mismos problemas se repiten semana tras semana.

---

## Product Backlog — lista de historias de usuario

Las historias de usuario siguen el formato:
> **"Como [tipo de usuario], quiero [acción], para [beneficio]."**

### Historias de usuario iniciales (ordenadas por prioridad)

#### 🔴 Alta prioridad (Must Have)

| ID | Historia | Story Points | Sprint |
|---|---|---|---|
| US-01 | Como visitante, quiero ver una página de inicio atractiva con los programas de la fundación, para entender rápidamente qué hacen | 5 | Sprint 2 |
| US-02 | Como familiar, quiero encontrar información detallada de Mi Escuelita Down, para saber si el programa es adecuado para mi hijo | 3 | Sprint 3 |
| US-03 | Como familiar, quiero encontrar información detallada de Aula Wawitas, para saber si el programa es adecuado para mi hijo | 3 | Sprint 3 |
| US-04 | Como familiar, quiero encontrar información detallada de Pasos Firmes, para evaluar si pueden ayudar a mi hijo con dificultades de aprendizaje | 3 | Sprint 3 |
| US-05 | Como visitante, quiero contactar a la fundación por WhatsApp con un solo toque, para hacer consultas rápidamente | 2 | Sprint 2 |
| US-06 | Como visitante internacional, quiero leer el sitio en inglés, para entender los programas y considerar una colaboración | 5 | Sprint 4 |
| US-07 | Como administrador de la fundación, quiero publicar noticias desde un panel web sin tocar código, para mantener el sitio actualizado de forma autónoma | 8 | Sprint 4 |
| US-08 | Como visitante, quiero ver el sitio correctamente en mi celular, para acceder desde cualquier dispositivo | 3 | Sprint 2 |

#### 🟡 Media prioridad (Should Have)

| ID | Historia | Story Points | Sprint |
|---|---|---|---|
| US-09 | Como cooperante potencial, quiero conocer el impacto real de la fundación con cifras y testimonios, para decidir si apoyarlos | 5 | Sprint 4 |
| US-10 | Como persona con dificultad visual, quiero poder aumentar el tamaño del texto y cambiar el contraste, para leer el sitio cómodamente | 3 | Sprint 4 |
| US-11 | Como visitante, quiero conocer al equipo profesional de la fundación, para confiar en la calidad de sus servicios | 2 | Sprint 3 |
| US-12 | Como familiar interesada, quiero enviar un formulario de contacto, para recibir información sin tener que llamar | 3 | Sprint 4 |
| US-13 | Como donante potencial, quiero saber cómo hacer una donación, para apoyar la causa de forma fácil | 2 | Sprint 4 |
| US-14 | Como padre de familia, quiero acceder a recursos descargables de apoyo, para trabajar con mi hijo en casa | 3 | Sprint 4 |

#### 🟢 Baja prioridad (Nice to Have)

| ID | Historia | Story Points | Sprint |
|---|---|---|---|
| US-15 | Como administrador, quiero subir fotos al CMS sin límite técnico, para mantener la galería actualizada | 2 | Sprint 4 |
| US-16 | Como visitante, quiero leer artículos del blog sobre inclusión, para informarme sobre el tema | 2 | Sprint 4 |
| US-17 | Como voluntario potencial, quiero postularme desde el sitio, para ofrecer mi tiempo a la fundación | 3 | Sprint 5 |

---

## Estimación con Story Points

Usamos la **secuencia de Fibonacci simplificada:** 1 · 2 · 3 · 5 · 8 · 13

| Puntos | Significado | Ejemplo |
|---|---|---|
| 1 | Trivial, menos de 1 hora | Cambiar un texto o color |
| 2 | Simple, pocas horas | Componente de botón con variantes |
| 3 | Moderado, medio día | Página estática con contenido |
| 5 | Considerable, 1–2 días | Página con datos dinámicos |
| 8 | Complejo, varios días | Sistema de CMS o i18n completo |
| 13 | Muy grande — dividir en historias más pequeñas | — |

**Técnica: Planning Poker**
1. El PO lee la historia
2. Cada Developer elige sus puntos en silencio
3. Todos revelan al mismo tiempo
4. Si hay diferencias grandes, discutir brevemente y revotear
5. La estimación es del equipo, no del PO ni del Scrum Master

---

## Definición de Done (DoD)

Una historia solo está **Done** cuando cumple TODO lo siguiente:

- [ ] El código está en una rama `feature/` y tiene Pull Request abierto
- [ ] Al menos 1 compañero revisó y aprobó el PR
- [ ] El código está mergeado a `develop`
- [ ] La funcionalidad se ve correctamente en móvil, tablet y desktop
- [ ] No hay errores en consola del navegador
- [ ] El contenido real (no placeholder) está cargado
- [ ] El PO revisó y aprobó la historia en la Review

> Si algo no cumple la DoD, **no está Done**. No importa que "falte poco".

---

## Tablero Scrum (GitHub Projects)

**Columnas del tablero:**

```
📋 Product Backlog  →  🗓️ Sprint Backlog  →  🔄 En progreso  →  👀 En revisión (PR)  →  ✅ Done
```

**Reglas del tablero:**
- Cada historia tiene un responsable asignado
- Mover la tarjeta cuando cambia de estado (no esperar al Daily)
- El Scrum Master revisa el tablero antes del Daily para detectar tarjetas estancadas
- Una persona no debería tener más de 2 tarjetas "En progreso" simultáneamente

---

## Velocidad del equipo

**Velocidad = Story Points completados por Sprint**

| Sprint | Goal | Points planificados | Points completados | Velocidad |
|---|---|---|---|---|
| Sprint 0 | Setup + Requerimientos | — | — | — |
| Sprint 1 | Diseño aprobado | | | |
| Sprint 2 | Layout + Inicio | | | |
| Sprint 3 | Programas + Equipo | | | |
| Sprint 4 | Resto del sitio + CMS | | | |
| Sprint 5 | QA + Manuales | | | |
| Sprint 6 | Deploy + Entrega | | | |

> Tras el Sprint 2, el equipo ya tendrá datos reales para saber si el ritmo alcanza para terminar a tiempo.

---

## Manejo de cambios de alcance

La fundación **va a pedir cosas nuevas**. El proceso para manejarlos:

1. El PO escucha la solicitud y la registra como nueva historia en el backlog
2. El equipo la estima en Story Points
3. El PO evalúa: ¿entra en el Sprint actual o va al siguiente?
4. Si entra, debe salir algo de igual o mayor peso del Sprint actual
5. Si afecta el alcance total, escalar al supervisor

**Regla de oro:** nada entra a un Sprint en curso sin quitar algo de igual peso.

---

## Calendario semanal tipo

| Día | Actividad | Duración |
|---|---|---|
| **Lunes** | Sprint Planning (inicio de Sprint) + Daily | 1h 15min |
| **Martes** | Daily | 15 min |
| **Miércoles** | Daily | 15 min |
| **Jueves** | Daily | 15 min |
| **Viernes** | Daily + Sprint Review + Retrospectiva | 1h 30min |

**Total de reuniones por semana: ~2h 30min**
El resto del tiempo es trabajo de desarrollo.

---

## Comunicación del equipo

| Canal | Uso |
|---|---|
| WhatsApp/Discord (grupo) | Daily asíncrono si no pueden reunirse, avisos rápidos |
| GitHub Issues | Tareas técnicas, bugs, preguntas de código |
| GitHub Projects | Tablero visual del Sprint |
| GitHub Pull Requests | Code review y discusión técnica |
| Reuniones presenciales/videollamada | Planning, Review, Retro, reuniones con la fundación |

---

## Checklist semanal del Scrum Master

**Lunes:**
- [ ] Preparar el Sprint Backlog con el PO antes del Planning
- [ ] Facilitar el Sprint Planning
- [ ] Asegurarse de que todas las tareas tienen responsable asignado

**Martes a Jueves:**
- [ ] Facilitar el Daily (15 min exactos)
- [ ] Registrar bloqueos y hacer seguimiento de su resolución
- [ ] Revisar que el tablero esté actualizado

**Viernes:**
- [ ] Facilitar el Sprint Review — demostración funcional
- [ ] Actualizar la tabla de velocidad
- [ ] Facilitar la Retrospectiva
- [ ] Registrar las acciones de mejora para el siguiente Sprint
- [ ] Actualizar el ROADMAP.md con el avance real

---

## Consejos prácticos para este equipo

1. **El Daily no es un reporte al jefe** — es sincronización entre iguales. El Scrum Master no es el jefe.

2. **"Casi listo" no existe** — algo está Done o no está Done. Evita el "falta poco" que nunca termina.

3. **Los Sprints no se alargan** — si algo no termina, vuelve al backlog. El Sprint cierra el viernes sí o sí.

4. **La fundación es el cliente real** — invitarla a las Reviews de los Sprints 1, 4 y 6 genera confianza y evita sorpresas en la entrega final.

5. **El backlog es vivo** — puede cambiar entre Sprints. Lo que no puede cambiar es el Sprint en curso.

6. **Scrum no es burocracia** — si una ceremonia no está aportando valor, hablar en la Retro y ajustar. En equipos pequeños, la flexibilidad importa.
