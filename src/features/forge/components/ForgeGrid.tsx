import { useEffect, useState, type MouseEvent } from 'react'
import { useDragToScroll } from '../../../hooks/useDragToScroll'
import { findKind } from '../data/lookups'
import { footprintOf } from '../domain/placement'
import type { Tool } from '../domain/tool'
import type {
  ElementKind,
  Floor,
  Footprint,
  PlacedElement,
  Placement,
  Rotation,
} from '../domain/types'
import { floorImage } from '../images'
import { ElementVisual } from './ElementVisual'
import { PlacedElementView } from './PlacedElementView'

type Cell = {
  readonly column: number
  readonly row: number
}

type ForgeGridProps = {
  elements: readonly PlacedElement[]
  floor: Floor
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
  floor,
  tool,
  placementRotation,
  selectedElementId,
  isFree,
  onPlace,
  onElementClick,
  onElementRemove,
}: ForgeGridProps) {
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null)
  const { containerRef, dragHandlers } = useDragToScroll<HTMLDivElement>()

  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    const center = buildableCenter(floor)
    container.scrollLeft = center.x - container.clientWidth / 2
    container.scrollTop = center.y - container.clientHeight / 2
  }, [containerRef, floor])
  const preview =
    tool.mode === 'place' && hoveredCell !== null
      ? { kindId: tool.kindId, ...hoveredCell, rotation: placementRotation }
      : null
  const previewKind = preview === null ? undefined : findKind(preview.kindId)

  function cellAt(event: MouseEvent<HTMLDivElement>): Cell {
    const bounds = event.currentTarget.getBoundingClientRect()
    return {
      column: Math.floor((event.clientX - bounds.left) / floor.cellWidth),
      row: Math.floor((event.clientY - bounds.top) / floor.cellHeight),
    }
  }

  return (
    <div className="forge-grid" ref={containerRef} {...dragHandlers}>
      <div
        className="forge-grid__canvas"
        style={{
          width: floor.columns * floor.cellWidth,
          height: floor.rows * floor.cellHeight,
          backgroundImage: `url(${floorImage()})`,
        }}
        onMouseMove={(event) => setHoveredCell(cellAt(event))}
        onMouseLeave={() => setHoveredCell(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget && preview !== null) onPlace(preview)
        }}
      >
        {floor.buildableAreas.map((area) => (
          <span
            key={`${area.column}-${area.row}`}
            className="forge-grid__buildable"
            style={{
              ...areaStyle(area, floor),
              backgroundSize: `${floor.cellWidth}px ${floor.cellHeight}px`,
            }}
          />
        ))}
        {elements.map((element) => {
          const kind = findKind(element.kindId)
          if (kind === undefined) return null
          return (
            <PlacedElementView
              key={element.id}
              element={element}
              kind={kind}
              floor={floor}
              isSelected={element.id === selectedElementId}
              onClick={() => onElementClick(element.id)}
              onRemove={() => onElementRemove(element.id)}
            />
          )
        })}
        {preview !== null && previewKind !== undefined && (
          <PlacementPreview
            kind={previewKind}
            rotation={preview.rotation}
            footprint={footprintOf(previewKind, preview)}
            floor={floor}
            isValid={isFree(preview)}
          />
        )}
      </div>
    </div>
  )
}

type PlacementPreviewProps = {
  kind: ElementKind
  rotation: Rotation
  footprint: Footprint
  floor: Floor
  isValid: boolean
}

function PlacementPreview({ kind, rotation, footprint, floor, isValid }: PlacementPreviewProps) {
  return (
    <span className="forge-grid__preview" data-valid={isValid} style={areaStyle(footprint, floor)}>
      <ElementVisual kind={kind} rotation={rotation} floor={floor} />
    </span>
  )
}

function areaStyle(area: Footprint, floor: Floor) {
  return {
    left: area.column * floor.cellWidth,
    top: area.row * floor.cellHeight,
    width: area.width * floor.cellWidth,
    height: area.height * floor.cellHeight,
  }
}

function buildableCenter(floor: Floor) {
  const left = Math.min(...floor.buildableAreas.map((area) => area.column))
  const right = Math.max(...floor.buildableAreas.map((area) => area.column + area.width))
  const top = Math.min(...floor.buildableAreas.map((area) => area.row))
  const bottom = Math.max(...floor.buildableAreas.map((area) => area.row + area.height))
  return {
    x: ((left + right) / 2) * floor.cellWidth,
    y: ((top + bottom) / 2) * floor.cellHeight,
  }
}
