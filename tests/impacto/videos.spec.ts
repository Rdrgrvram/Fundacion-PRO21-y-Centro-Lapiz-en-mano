import fs from 'fs'
import { test, expect } from '@playwright/test'
import { youtubeId } from '@/lib/utils'
import { backupContentFile } from '../cms/helpers'

// Videos de YouTube en Impacto (issue #70): se editan desde el panel, cargan solo al pulsar y nunca se incrusta
// algo que no sea un video de YouTube.

test.describe('youtubeId — extrae el ID de los formatos de enlace de YouTube', () => {
  const ID = 'dQw4w9WgXcQ'
  for (const url of [
    `https://www.youtube.com/watch?v=${ID}`,
    `https://youtube.com/watch?v=${ID}&t=10s`,
    `https://m.youtube.com/watch?v=${ID}`,
    `https://youtu.be/${ID}`,
    `https://youtu.be/${ID}?si=abc`,
    `https://www.youtube.com/shorts/${ID}`,
    `https://www.youtube.com/embed/${ID}`,
    `https://www.youtube-nocookie.com/embed/${ID}`,
  ]) {
    test(url, () => expect(youtubeId(url)).toBe(ID))
  }
  for (const url of ['', 'no es un enlace', 'https://example.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=corto', 'javascript:alert(1)', 'https://www.youtube.com/']) {
    test(`rechaza «${url}»`, () => expect(youtubeId(url)).toBeNull())
  }
})

test.describe('Impacto — sección de videos', () => {
  const IMPACT_YML = 'settings/impact.yml'
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(IMPACT_YML)
  })
  test.afterEach(() => backup.restore())

  /** Inserta una lista de videos antes de la nota de la galería, en el bloque es y en el bloque en. */
  function conVideos(url: string) {
    const crudo = backup.readYamlRaw().replace(/\r\n/g, '\n')
    const partes = crudo.split('  gallery_note:')
    expect(partes.length, 'debe haber un gallery_note por idioma').toBe(3)
    const bloque = (titulo: string) => `  videos:\n    - title: ${titulo}\n      url: ${url}\n      desc: Descripción de prueba\n`
    fs.writeFileSync(backup.path, partes[0] + bloque('Video de prueba') + '  gallery_note:' + partes[1] + bloque('Test video') + '  gallery_note:' + partes[2], 'utf-8')
  }

  test('sin videos la sección no se muestra', async ({ page }) => {
    await page.goto('/es/impacto', { waitUntil: 'networkidle' })
    await expect(page.getByText('Videos del centro')).toHaveCount(0)
  })

  test('con un video: aparece la sección y YouTube solo carga al pulsar "Reproducir"', async ({ page }) => {
    conVideos('https://youtu.be/dQw4w9WgXcQ')
    await page.goto('/es/impacto', { waitUntil: 'networkidle' })
    await expect(page.getByText('Videos del centro')).toBeVisible()
    await expect(page.getByText('Video de prueba')).toBeVisible()
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0)

    await page.getByRole('button', { name: /reproducir video: video de prueba/i }).click()
    const marco = page.locator('iframe[src*="youtube-nocookie.com/embed/dQw4w9WgXcQ"]')
    await expect(marco).toHaveCount(1)
    await expect(marco).toHaveAttribute('title', 'Video de prueba')
  })

  test('en inglés el encabezado y el botón salen en inglés', async ({ page }) => {
    conVideos('https://youtu.be/dQw4w9WgXcQ')
    await page.goto('/en/impacto', { waitUntil: 'networkidle' })
    await expect(page.getByText('Videos from the center')).toBeVisible()
    await expect(page.getByRole('button', { name: /play video: test video/i })).toBeVisible()
  })

  test('un enlace que no es de YouTube no se incrusta ni muestra la sección', async ({ page }) => {
    conVideos('https://example.com/video.mp4')
    await page.goto('/es/impacto', { waitUntil: 'networkidle' })
    await expect(page.getByText('Videos del centro')).toHaveCount(0)
    await expect(page.locator('iframe')).toHaveCount(0)
  })
})
