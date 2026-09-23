import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
import matter from 'gray-matter'
import { getEquipoPageContent, getAllTeamAreas, getAllTeamMembers, getAllVolunteers } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "equipo_page" (contenido fijo de la página de Equipo:
// hero, filosofía, grilla, red, voluntariado, CTA). Ver public/admin/config.yml
// líneas ~437-508. Las fichas individuales (team_areas/equipo/volunteers) son
// colecciones folder aparte, fuera de este spec.

const EQUIPO_PAGE_YML = 'settings/equipo_page.yml'

const EXPECTED_SECTIONS = [
  'Hero',
  'Cifras rápidas',
  'Sección: Filosofía de trabajo',
  'Tarjetas de filosofía',
  'Sección: Grilla de equipo (filtro + fichas)',
  'Sección: Trabajo en red',
  'Sección: Voluntariado',
  'CTA final',
]

test.describe('CMS — Equipo (colección "equipo_page")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(EQUIPO_PAGE_YML)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga la entrada de Equipo vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/equipo_page/entries/content')

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
    await expect(page.getByText('Escribiendo en la colección 👥 Equipo — Contenido de página')).toBeVisible()
  })

  test('todas las secciones definidas en config.yml para "equipo_page" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/equipo_page/entries/content')

    for (const section of EXPECTED_SECTIONS) {
      await expect(page.getByText(section, { exact: true }).first()).toBeVisible()
    }
  })

  test('editar y publicar el badge del hero persiste el cambio en content/settings/equipo_page.yml', async ({
    page,
  }) => {
    const marker = uniqueMarker('EQUIPO_HERO_BADGE')
    await openCmsEntry(page, '/collections/equipo_page/entries/content')

    // hero.badge es el primer campo de la colección.
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { hero: { badge: string } } }
    expect(parsed.es.hero.badge).toBe(marker)
  })

  test('tras publicar, el archivo sigue siendo válido contra el esquema zod real (lib/cms.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('EQUIPO_HERO_BADGE_SCHEMA')
    await openCmsEntry(page, '/collections/equipo_page/entries/content')

    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const content = getEquipoPageContent('es')
    expect(content.hero.badge).toBe(marker)
  })

  test('el contenido publicado en el CMS se refleja en la página pública /es/equipo', async ({ page }) => {
    const marker = uniqueMarker('EQUIPO_HERO_BADGE_SITE')
    await openCmsEntry(page, '/collections/equipo_page/entries/content')

    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    await page.goto('/es/equipo')
    await expect(page.getByText(marker)).toBeVisible()
  })
})

// Migradas de lib/content.ts (fallbacks silenciosos) a lib/cms.ts (zod) en el
// mismo turno que equipo_page — mismo esquema de campos, solo cambió la capa de
// datos. Un test de round-trip por colección alcanza (formularios simples, sin
// secciones anidadas que auditar como equipo_page).
test.describe('CMS — colecciones folder de Equipo (team_areas / equipo / volunteers)', () => {
  test('team_areas: editar y publicar el nombre de "fisio" persiste el cambio y valida contra el esquema', async ({
    page,
  }) => {
    // "Nombre" es i18n: true (no duplicate) en team_areas — solo toca el archivo
    // ES. De todas formas se respalda también el EN por seguridad.
    const backupEs = backupContentFile('team_areas/fisio.es.md')
    const backupEn = backupContentFile('team_areas/fisio.en.md')
    try {
      const marker = uniqueMarker('TEAM_AREA_NAME')
      await openCmsEntry(page, '/collections/team_areas/entries/fisio')
      await page.locator('input[type="text"], textarea').first().fill(marker)
      await publishEntry(page)

      const parsed = matter(backupEs.readYamlRaw())
      expect(parsed.data.name).toBe(marker)

      const areas = getAllTeamAreas('es')
      expect(areas.find((a) => a.slug === 'fisio')?.name).toBe(marker)
    } finally {
      backupEs.restore()
      backupEn.restore()
    }
  })

  test('equipo: editar y publicar el nombre de "ana-copa" persiste el cambio y valida contra el esquema', async ({
    page,
  }) => {
    // "Nombre completo" es i18n: duplicate en equipo — Decap propaga el valor
    // editado en ES también al archivo EN al publicar, así que hay que
    // respaldar y restaurar los dos (confirmado en vivo: sin esto, el marcador
    // de prueba queda filtrado en el .en.md real).
    const backupEs = backupContentFile('equipo/ana-copa.es.md')
    const backupEn = backupContentFile('equipo/ana-copa.en.md')
    try {
      const marker = uniqueMarker('TEAM_MEMBER_NAME')
      await openCmsEntry(page, '/collections/equipo/entries/ana-copa')
      await page.locator('input[type="text"], textarea').first().fill(marker)
      await publishEntry(page)

      const parsed = matter(backupEs.readYamlRaw())
      expect(parsed.data.name).toBe(marker)

      const team = getAllTeamMembers('es')
      expect(team.find((m) => m.slug === 'ana-copa')?.name).toBe(marker)
    } finally {
      backupEs.restore()
      backupEn.restore()
    }
  })

  // Regresión: el widget de imagen custom (admin/widgets/ImageControl.tsx) tuvo un bug
  // real reportado en uso donde el botón de basurero exigía DOS clics (uno para "armar"
  // la confirmación, otro para borrar de verdad) — un usuario que hacía un solo clic
  // (el gesto normal para un ícono de basurero) nunca disparaba onChange, así que Decap
  // nunca marcaba la entrada como modificada y "Publicar" seguía gris/inactivo, sin
  // ningún error en consola. Se quitó la confirmación de doble clic; este test fija que
  // un solo clic en el basurero sí marca "CAMBIOS NO GUARDADOS" y habilita "Publicar".
  test('equipo: quitar la foto con UN SOLO clic en el basurero marca la entrada como modificada', async ({
    page,
  }) => {
    const backupEs = backupContentFile('equipo/ana-copa.es.md')
    const backupEn = backupContentFile('equipo/ana-copa.en.md')
    try {
      await openCmsEntry(page, '/collections/equipo/entries/ana-copa')
      await expect(page.getByText('CAMBIOS GUARDADOS')).toBeVisible()

      await page.locator('[aria-label="Quitar imagen"]').first().click()

      await expect(page.getByText('CAMBIOS NO GUARDADOS')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Publicar', exact: true })).toBeEnabled()
    } finally {
      backupEs.restore()
      backupEn.restore()
    }
  })

  test('volunteers: editar y publicar el nombre de "alejandra" persiste el cambio y valida contra el esquema', async ({
    page,
  }) => {
    const backup = backupContentFile('volunteers/alejandra.md')
    try {
      const marker = uniqueMarker('VOLUNTEER_NAME')
      await openCmsEntry(page, '/collections/volunteers/entries/alejandra')
      await page.locator('input[type="text"], textarea').first().fill(marker)
      await publishEntry(page)

      const parsed = matter(backup.readYamlRaw())
      expect(parsed.data.name).toBe(marker)

      const volunteers = getAllVolunteers()
      expect(volunteers.find((v) => v.slug === 'alejandra')?.name).toBe(marker)
    } finally {
      backup.restore()
    }
  })
})
