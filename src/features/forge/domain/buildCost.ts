import type { PlannedBuild } from '../../material-planner/types'
import type { ElementKind, Extension, ForgeLayout, PlacedElement } from './types'

type ConveyorCostLine = {
  readonly kind: ElementKind
  readonly placedCount: number
  readonly countedCount: number
}

type ExtensionCostLine = {
  readonly key: string
  readonly extension: Extension
  readonly isCounted: boolean
}

export type ElementCostLine = {
  readonly key: string
  readonly element: PlacedElement
  readonly kind: ElementKind
  readonly isCounted: boolean
  readonly extensions: readonly ExtensionCostLine[]
}

export type BuildCostLines = {
  readonly conveyors: readonly ConveyorCostLine[]
  readonly production: readonly ElementCostLine[]
  readonly others: readonly ElementCostLine[]
}

type Lookups = {
  readonly findKind: (kindId: string) => ElementKind | undefined
  readonly findExtension: (extensionId: string) => Extension | undefined
}

function extensionCostKey(elementId: string, extensionId: string): string {
  return `${elementId}/${extensionId}`
}

export function buildCostLines(layout: ForgeLayout, lookups: Lookups): BuildCostLines {
  const conveyors = new Map<string, ConveyorCostLine>()
  const production: ElementCostLine[] = []
  const others: ElementCostLine[] = []
  for (const element of layout.elements) {
    const kind = lookups.findKind(element.kindId)
    if (kind === undefined) continue
    if (kind.category === 'conveyor') {
      const placedCount = (conveyors.get(kind.id)?.placedCount ?? 0) + 1
      conveyors.set(kind.id, { kind, placedCount, countedCount: placedCount })
      continue
    }
    const line = elementLine(element, kind, layout.costExclusions, lookups)
    ;(kind.category === 'station' ? production : others).push(line)
  }
  return {
    conveyors: [...conveyors.values()].map((line) => ({
      ...line,
      countedCount: Math.max(
        0,
        line.placedCount - (layout.excludedConveyorCounts[line.kind.id] ?? 0),
      ),
    })),
    production,
    others,
  }
}

export function countedBuilds(
  lines: BuildCostLines,
  elementCost: (kindId: string) => PlannedBuild['requirements'],
  extensionCost: (extensionId: string) => PlannedBuild['requirements'],
): readonly PlannedBuild[] {
  const conveyorBuilds = lines.conveyors.map((line) => ({
    key: line.kind.id,
    name: line.kind.name,
    detail: '',
    requirements: elementCost(line.kind.id),
    count: line.countedCount,
  }))
  const elementBuilds = [...lines.production, ...lines.others].flatMap((line) => [
    ...(line.isCounted
      ? [
          {
            key: line.key,
            name: line.kind.name,
            detail: '',
            requirements: elementCost(line.kind.id),
            count: 1,
          },
        ]
      : []),
    ...line.extensions
      .filter((extension) => extension.isCounted)
      .map((extension) => ({
        key: extension.key,
        name: extension.extension.name,
        detail: '',
        requirements: extensionCost(extension.extension.id),
        count: 1,
      })),
  ])
  return [...conveyorBuilds, ...elementBuilds]
}

function elementLine(
  element: PlacedElement,
  kind: ElementKind,
  exclusions: readonly string[],
  lookups: Lookups,
): ElementCostLine {
  return {
    key: element.id,
    element,
    kind,
    isCounted: !exclusions.includes(element.id),
    extensions: element.extensionIds.flatMap((extensionId) => {
      const extension = lookups.findExtension(extensionId)
      if (extension === undefined) return []
      const key = extensionCostKey(element.id, extensionId)
      return [{ key, extension, isCounted: !exclusions.includes(key) }]
    }),
  }
}
