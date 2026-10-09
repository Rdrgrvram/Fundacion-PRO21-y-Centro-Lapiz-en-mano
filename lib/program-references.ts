const LEGACY_PROGRAM_NAMES: Record<string, string> = {
  'Mi Escuelita Down': 'mi-escuelita-down',
  'Aula Wawitas': 'aula-wawitas',
  'Pasos Firmes': 'pasos-firmes',
}

export function normalizeProgramSlug(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined
  const normalized = value.trim()
  if (LEGACY_PROGRAM_NAMES[normalized]) return LEGACY_PROGRAM_NAMES[normalized]
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized) ? normalized : undefined
}

export function isVisibleProgramReference(
  value: unknown,
  visibleProgramSlugs?: ReadonlySet<string>
): boolean {
  if (!visibleProgramSlugs) return true
  const slug = normalizeProgramSlug(value)
  return !slug || visibleProgramSlugs.has(slug)
}
