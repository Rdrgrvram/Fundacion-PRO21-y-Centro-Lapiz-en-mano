> **12-oct-2026:** esta traducción quedó superada por el contenido completo de `content/programs/desarrolla-tea.en.md`, que es la fuente de verdad.

# Source content — Desarrolla TEA Program (English translation)

Faithful translation of `contenido-fuente.md` (the Spanish text is unchanged). Used to create
`content/programs/desarrolla-tea.en.md`. Keys, icons, colors, order, `visible` and `photos_authorized`
are identical to the Spanish file. To be reviewed by Codex (reviewer role).

```yaml
title: Desarrolla TEA
visible: true
order: 40
photos_authorized: false
home:
  featured: true     # PENDING: confirm (see spec.md, Story 3)
  icon: puzzle
  color: secondary
  badge: Autism Spectrum Disorder
  ages: Ages 3 – 12
hero:
  badge: Comprehensive Therapeutic Program
  subtitle: Individual and group intervention for children aged 3 to 12 with Autism Spectrum Disorder (ASD), built on their strengths and with the family as an active part of the process.
  color: secondary
  image: ''
  quote: Every child has a unique profile of strengths, needs, interests and ways of communicating; that is why the intervention adapts to the child, not the other way around.
  quote_author: Centro Lápiz en Mano
  quote_context: Desarrolla TEA
  cta_details_label: See details
  cta_whatsapp_label: Ask on WhatsApp
stats:
  - { icon: baby, value: 3 – 12, label: ages served }
  - { icon: layers, value: '8', label: intervention areas }
  - { icon: users, value: '2', label: formats (individual and group) }
  - { icon: calendar, value: Mon – Sat, label: days of service }
section_1:
  badge: Our approach
  title: How we work
  layout: tarjetas
  subtitle: An intervention model that looks at the whole child, not just one area of development.
  items:
    - { icon: refresh-cw, color: primary, title: Comprehensive, desc: Considers every dimension of development and avoids addressing the child's needs in isolation. }
    - { icon: puzzle, color: secondary, title: Individualized, desc: 'Each child has an Individual Intervention Plan, with goals based on their profile, strengths, interests and level of development.' }
    - { icon: users-round, color: accent, title: Family-centered, desc: 'The family is an active part of the process, not just a recipient of information.' }
    - { icon: star, color: primary, title: Strengths-based, desc: 'The intervention starts from each child''s abilities, interests and resources, not only from their difficulties.' }
section_2:
  badge: Formats
  title: Individual and group care
  subtitle: Two ways of working that complement each other, on weekdays and on Saturdays.
  tabs:
    - icon: user
      color: primary
      label: Individual care
      age_range: Ages 3 to 12
      desc: Works on specific goals according to each child's profile, based on an Individual Intervention Plan (IIP) with an initial profile, strengths, support needs, goals, strategies, progress indicators and periodic adjustment.
      highlights: [Individual Intervention Plan, Tailor-made goals, Progress indicators, Periodic evaluation and adjustment]
    - icon: users
      color: secondary
      label: Group care
      age_range: Ages 3 to 12
      desc: Focused on skills that need interaction with peers. Groups are formed by age, level of development, support needs and goals, not by diagnosis alone.
      highlights: [Cooperative and turn-taking games, Communication and social skills, Group psychomotor activities, Arts and recreational activities]
    - icon: calendar
      color: accent
      label: Saturdays
      age_range: Children and families
      desc: They complement the process with individual and group care, social skills, psychomotor work, autonomy, family workshops and integration activities.
      highlights: [Family workshops, Social skills, Psychomotor activities, Integration activities]
section_3:
  badge: What we work on
  title: Intervention Areas
  items:
    - { icon: activity, color: primary, title: Psychomotor Skills, items: [Gross and fine motor skills, Balance and coordination, Body schema and laterality, Motor planning] }
    - { icon: message-circle, color: secondary, title: Communication and Language, items: [Functional communication, Comprehension and expression, Joint attention and turn-taking, Visual supports and augmentative systems] }
    - { icon: hand, color: accent, title: Sensory Integration, items: ['Tactile, visual and auditory stimuli', Vestibular and proprioceptive stimuli, Sensory regulation, Individualized activities] }
    - { icon: shirt, color: primary, title: Personal Autonomy, items: [Eating and dressing, Hygiene and toilet use, Routines and organization, Simple decision-making] }
    - { icon: brain, color: secondary, title: Cognitive Stimulation, items: [Attention and memory, Classification and sequencing, Problem solving, Executive functions] }
    - { icon: heart-handshake, color: accent, title: Social Skills, items: [Shared play, Waiting for a turn, Recognizing emotions, Interaction with peers] }
    - { icon: book-open, color: primary, title: Educational Support, items: [Curricular adaptations, Task breakdown, 'Support in reading, writing and math', Coordination with teachers] }
    - { icon: home, color: secondary, title: Family Support, items: [Individual guidance, Strategies for the home, Psychoeducation about ASD, Support network among families] }
enrollment:
  title: How do I enroll my child?
  steps:
    - { icon: phone, title: First contact, desc: 'Write to us on WhatsApp or through the form. We hold an initial interview with the family.' }
    - { icon: search, title: Initial assessment, desc: 'We review the child''s background and assess development to identify strengths and priority support areas. If needed, we coordinate with neuropediatrics or other specialists.' }
    - { icon: file-text, title: Individual Plan, desc: We draw up the Individual Intervention Plan with goals tailored to the child. }
    - { icon: sparkles, title: Intervention and follow-up, desc: 'Individual and/or group care begins, with guidance for the family, periodic follow-up and plan adjustment.' }
cta:
  title: Is your child between 3 and 12 years old?
  text: Desarrolla TEA welcomes children aged 3 to 12 with an ASD diagnosis or neurodevelopmental needs. Contact us to learn about schedules and to start the assessment.
  link_label: Contact form
```

## Translation notes (for the reviewer)
- "Plan Individual de Intervención (PII)" → "Individual Intervention Plan (IIP)"; "TEA" → "ASD" in running text; the program name stays **Desarrolla TEA** (proper name).
- `badge` of the card: "Trastorno del Espectro Autista" → "Autism Spectrum Disorder".
- Check that the wording matches the English already used in `aula-wawitas.en.md` ("See details", "Ask on WhatsApp", "Contact form").
- Icons `layers`, `shirt`, `user` are not in the icon catalog yet (see `plan.md`, D2).
