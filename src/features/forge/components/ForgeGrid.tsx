import { useState, type MouseEvent } from 'react'
import { findKind } from '../data/lookups'
import { footprintOf, type GridSize } from '../domain/placement'
import type { Tool } from '../domain/tool'
import type { PlacedElement, Placement, Rotation } from '../domain/types'
import { PlacedElementView } from './PlacedElementView'

type Cell = {
  readonly column: number
  readonly row: number
}

type ForgeGridProps = {
  elements: readonly PlacedElement[]
  grid: GridSize
  cellSize: number
  tool: Tool
  placementRotation: Rotation
  selectedElementId: string | null
  isFree: (placement: Placement) => boolean
  onPlace: (placement: Placement) => void
  onElementClick: (elementId: string) => void
  onElementRemove: (elementId: string) => void
}

export function ForgeGrid({
  elements,
  grid,
  cellSize,
  tool,
  placementRotation,
  selectedElementId,
  isFree,
  onPlace,
  onElementClick,
  onElementRemove,
}: ForgeGridProps) {
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null)
  const preview =
    tool.mode === 'place' && hoveredCell !== null
      ? { kindId: tool.kindId, ...hoveredCell, rotation: placementRotation }
      : null
  const previewKind = preview === null ? undefined : findKind(preview.kindId)

  function cellAt(event: MouseEvent<HTMLDivElement>): Cell {
    const bounds = event.currentTarget.getBoundingClientRect()
    return {
      column: Math.floor((event.clientX - bounds.left) / cellSize),
      row: Math.floor((event.clientY - bounds.top) / cellSize),
    }
  }

  return (
    <div className="forge-grid">
      <div
        className="forge-grid__canvas"
        style={{
          width: grid.columns * cellSize,
          height: grid.rows * cellSize,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
        onMouseMove={(event) => setHoveredCell(cellAt(event))}
        onMouseLeave={() => setHoveredCell(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget && preview !== null) onPlace(preview)
        }}
      >
        {elements.map((element) => {
          const kind = findKind(element.kindId)
          if (kind === undefined) return null
          return (
            <PlacedElementView
              key={element.id}
              element={element}
              kind={kind}
              cellSize={cellSize}
              isSelected={element.id === selectedElementId}
              onClick={() => onElementClick(element.id)}
              onRemove={() => onElementRemove(element.id)}
            />
          )
        })}
        {preview !== null && previewKind !== undefined && (
          <PlacementPreview
            footprint={footprintOf(previewKind, preview)}
            cellSize={cellSize}
            isValid={isFree(preview)}
          />
        )}
      </div>
    </div>
  )
}

type PlacementPreviewProps = {
  footprint: ReturnType<typeof footprintOf>
  cellSize: number
  isValid: boolean
}

function PlacementPreview({ footprint, cellSize, isValid }: PlacementPreviewProps) {
  return (
    <span
      className="forge-grid__preview"
      data-valid={isValid}
      style={{
        left: footprint.column * cellSize,
        top: footprint.row * cellSize,
        width: footprint.width * cellSize,
        height: footprint.height * cellSize,
      }}
    />
  )
}
