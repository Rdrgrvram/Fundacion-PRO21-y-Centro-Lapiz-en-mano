import fs from 'fs'
import os from 'os'
import path from 'path'
import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
import zlib from 'zlib'
import { openCmsEntry, publishEntry, backupContentFile } from './helpers'

// US-14 / US-15 / US-09 — la Fundación sube PDFs e imágenes desde el panel y quedan disponibles en el sitio.
// Cubre el límite de tamaño (5 MB; antes 500 KB rechazaba cualquier PDF normal) y la carpeta propia de PDFs
// (public/docs). Los archivos subidos y el contenido editado se restauran al terminar.

const FAMILIES_YML = 'settings/families.yml'
const HOME_YML = 'settings/home.yml'
const MIN_PESADO = 600 * 1024 // por encima del antiguo límite de 512000 bytes

/** PNG válido con ruido aleatorio (no se comprime): pesa lo que se pida, sin depender de librerías de imagen. */
function pngConRuido(lado: number): Buffer {
  const chunk = (tipo: string, datos: Buffer) => {
    const cuerpo = Buffer.concat([Buffer.from(tipo, 'ascii'), datos])
    const largo = Buffer.alloc(4)
    largo.writeUInt32BE(datos.length)
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(zlib.crc32(cuerpo))
    return Buffer.concat([largo, cuerpo, crc])
  }
  const cabecera = Buffer.alloc(13)
  cabecera.writeUInt32BE(lado, 0)
  cabecera.writeUInt32BE(lado, 4)
  cabecera.writeUInt8(8, 8) // 8 bits por canal
  cabecera.writeUInt8(2, 9) // RGB
  const filas = Buffer.alloc((lado * 3 + 1) * lado)
  for (let y = 0; y < lado; y++) {
    const inicio = y * (lado * 3 + 1)
    for (let i = 1; i <= lado * 3; i++) filas[inicio + i] = Math.floor(Math.random() * 256)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', cabecera),
    chunk('IDAT', zlib.deflateSync(filas, { level: 0 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/** Busca recursivamente el primer valor de `key` que sea texto. */
function buscarClave(obj: unknown, key: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (k === key && typeof v === 'string' && v) return v
    const hijo = buscarClave(v, key)
    if (hijo) return hijo
  }
  return undefined
}

test.describe('CMS — recursos descargables e imágenes', () => {
  const creados: string[] = []
  let backup: ReturnType<typeof backupContentFile> | undefined

  test.afterEach(() => {
    backup?.restore()
    backup = undefined
    for (const f of creados.splice(0)) fs.rmSync(f, { force: true })
  })

  test('una guía en PDF de más de 600 KB se sube desde el panel y se descarga desde Familias', async ({ page, request }) => {
    backup = backupContentFile(FAMILIES_YML)
    const nombre = `guia-prueba-${Date.now()}.pdf`
    const local = path.join(os.tmpdir(), nombre)
    // PDF mínimo con relleno hasta superar el antiguo límite de 500 KB.
    fs.writeFileSync(local, Buffer.concat([Buffer.from('%PDF-1.4\n'), Buffer.alloc(MIN_PESADO * 2, 32), Buffer.from('\n%%EOF\n')]))
    creados.push(local, path.join(process.cwd(), 'public', 'docs', nombre))

    await openCmsEntry(page, '/collections/families/entries/content')

    // La lista de guías viene colapsada: se abre el primer ítem y se usa su campo "Archivo PDF".
    const etiqueta = page.getByText(/archivo pdf/i).first()
    const item = etiqueta.locator('xpath=ancestor::div[contains(@class,"ListItem")][1]')
    await item.scrollIntoViewIfNeeded()
    const caja = (await item.boundingBox())!
    await page.mouse.click(caja.x + 25, caja.y + 25)
    await expect(etiqueta).toBeVisible()

    await page.getByRole('button', { name: 'Escoge un archivo' }).first().click()
    await page.locator('input[type=file]').first().setInputFiles(local)
    await page.getByRole('button', { name: 'Confirmar selección' }).click()
    await publishEntry(page)

    // 1) El archivo quedó en la carpeta de PDFs, entero (no truncado ni rechazado).
    const enDisco = path.join(process.cwd(), 'public', 'docs', nombre)
    expect(fs.existsSync(enDisco), 'el PDF debe guardarse en public/docs').toBe(true)
    expect(fs.statSync(enDisco).size).toBeGreaterThan(MIN_PESADO)

    // 2) El contenido apunta a ese archivo.
    const ruta = buscarClave(load(backup.readYamlRaw()), 'file')
    expect(ruta).toBe(`/docs/${nombre}`)

    // 3) La página pública ofrece "Descargar PDF" con ese enlace y el archivo responde.
    await page.goto('/es/familias', { waitUntil: 'networkidle' })
    const enlace = page.locator(`a[href="/docs/${nombre}"]`)
    await expect(enlace).toHaveCount(1)
    await expect(enlace).toContainText(/descargar pdf/i)
    const resp = await request.get(`/docs/${nombre}`)
    expect(resp.status()).toBe(200)
    expect(resp.headers()['content-type']).toContain('pdf')
  })

  test('una foto de más de 600 KB se sube desde el panel y se sirve en Inicio', async ({ page, request }) => {
    backup = backupContentFile(HOME_YML)
    const nombre = `foto-prueba-${Date.now()}.png`
    const local = path.join(os.tmpdir(), nombre)
    fs.writeFileSync(local, pngConRuido(500)) // ≈ 750 KB: sobre el antiguo límite, bajo el nuevo
    expect(fs.statSync(local).size).toBeGreaterThan(MIN_PESADO)
    creados.push(local, path.join(process.cwd(), 'public', 'images', 'uploads', nombre))

    await openCmsEntry(page, '/collections/home/entries/content')
    // El hero ya tiene foto: el botón del campo se llama "Reemplazar".
    await page.getByRole('button', { name: /Reemplazar Foto del hero/i }).first().click()
    await page.locator('input[type=file]').first().setInputFiles(local)
    await page.getByRole('button', { name: 'Confirmar selección' }).click()
    await publishEntry(page)

    const enDisco = path.join(process.cwd(), 'public', 'images', 'uploads', nombre)
    expect(fs.existsSync(enDisco), 'la imagen debe guardarse en public/images/uploads').toBe(true)
    expect(backup.readYamlRaw()).toContain(`/images/uploads/${nombre}`)
    const resp = await request.get(`/images/uploads/${nombre}`)
    expect(resp.status()).toBe(200)
    expect(resp.headers()['content-type']).toContain('image')
  })
})
