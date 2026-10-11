import fs from 'fs'
import path from 'path'
import { test, expect } from '@playwright/test'
import matter from 'gray-matter'
import { getAllPrograms, getProgramBySlug } from '@/lib/cms'

const root = process.cwd()
const configPath = path.join(root, 'public', 'admin', 'config.yml')
const programPath = path.join(root, 'content', 'programs', 'aula-wawitas.es.md')

test.describe('Program management invariants', () => {
  test('keeps the programs collection dynamic and relation-safe', async () => {
    const config = fs.readFileSync(configPath, 'utf8')

    expect(config).toMatch(/- name: programs[\s\S]*?create: true/)
    expect(config).toMatch(/- name: programs[\s\S]*?delete: true/)
    expect(config).toContain('name: program_slug')
    expect(config).toContain('collection: programs')
    expect(config).toContain('field: visible')

    const programs = getAllPrograms('es')
    expect(programs.length).toBeGreaterThanOrEqual(3)
    expect(programs.map((program) => program.slug)).toEqual([
      'mi-escuelita-down',
      'aula-wawitas',
      'pasos-firmes',
    ])
  })

  test('hiding a program removes it from public resolution but keeps CMS access', async () => {
    const original = fs.readFileSync(programPath, 'utf8')
    const parsed = matter(original)

    try {
      parsed.data.visible = false
      fs.writeFileSync(programPath, matter.stringify(parsed.content, parsed.data), 'utf8')

      expect(getProgramBySlug('aula-wawitas', 'es')).toBeNull()
      expect(getProgramBySlug('aula-wawitas', 'es', { includeHidden: true })?.visible).toBe(false)
      expect(getAllPrograms('es').some((program) => program.slug === 'aula-wawitas')).toBe(false)
      expect(getAllPrograms('es', { includeHidden: true }).some((program) => program.slug === 'aula-wawitas')).toBe(true)
    } finally {
      fs.writeFileSync(programPath, original, 'utf8')
    }
  })
})
