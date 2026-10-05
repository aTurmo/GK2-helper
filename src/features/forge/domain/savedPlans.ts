import { isRecord, parseForgeLayout } from './layoutParsing'
import type { ForgeLayout } from './types'

export type SavedPlan = {
  readonly id: string
  readonly name: string
  readonly savedAt: string
  readonly layout: ForgeLayout
}

const EXPORT_FORMAT = 'gk2-helper-forge-plan'
const EXPORT_VERSION = 1

export function parseSavedPlan(value: unknown): SavedPlan | null {
  if (!isRecord(value)) return null
  const layout = parseForgeLayout(value.layout)
  if (
    typeof value.id !== 'string' ||
    typeof value.name !== 'string' ||
    typeof value.savedAt !== 'string' ||
    layout === null
  ) {
    return null
  }
  return { id: value.id, name: value.name, savedAt: value.savedAt, layout }
}

export function planExportContent(plan: SavedPlan): string {
  return JSON.stringify(
    {
      format: EXPORT_FORMAT,
      version: EXPORT_VERSION,
      name: plan.name,
      savedAt: plan.savedAt,
      layout: plan.layout,
    },
    null,
    2,
  )
}

export function planExportFileName(plan: SavedPlan): string {
  const slug = plan.name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `forge-${slug || 'plan'}.json`
}

export function parsePlanExport(content: string): Omit<SavedPlan, 'id'> | null {
  let value: unknown
  try {
    value = JSON.parse(content)
  } catch {
    return null
  }
  if (!isRecord(value) || value.format !== EXPORT_FORMAT || typeof value.name !== 'string') {
    return null
  }
  const layout = parseForgeLayout(value.layout)
  if (layout === null) return null
  const savedAt = typeof value.savedAt === 'string' ? value.savedAt : new Date().toISOString()
  return { name: value.name, savedAt, layout }
}

export function isSameLayout(a: ForgeLayout, b: ForgeLayout): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
