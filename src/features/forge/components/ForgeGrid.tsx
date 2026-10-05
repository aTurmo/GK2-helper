import { useEffect, useState, type MouseEvent } from 'react'
import { useDragToScroll } from '../../../hooks/useDragToScroll'
import { useMapZoom } from '../../../hooks/useMapZoom'
import { findItem, findKind } from '../data/lookups'
import { RESERVES } from '../data/reserves'
import { footprintOf, occupiedAreas } from '../domain/placement'
import type { Tool } from '../domain/tool'
import type {
  ElementKind,
  Floor,
  Footprint,
  PlacedElement,
  Placement,
  Rotation,
} from '../domain/types'
import { floorImage, itemImage } from '../images'
import { ElementVisual } from './ElementVisual'
import { PlacedElementView } from './PlacedElementView'

type PointerPosition = {
  readonly column: number
  readonly row: number
}

type ForgeGridProps = {
  elements: readonly PlacedElement[]
  floor: Floor
  tool: Tool
  placementRotation: Rotation
  selectedElementId: string | null
  isFree: (placement: Placement, ignoredElementId?: string) => boolean
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
  const [pointer, setPointer] = useState<PointerPosition | null>(null)
  const { containerRef, dragHandlers } = useDragToScroll<HTMLDivElement>()
  const { zoom, zoomIn, zoomOut, resetZoom } = useMapZoom(containerRef)
  const canvasWidth = floor.columns * floor.cellWidth
  const canvasHeight = floor.rows * floor.cellHeight

  useEffect(() => {
    const container = containerRef.current
    if (container === null) return
    const center = buildableCenter(floor)
    container.scrollLeft = center.x - container.clientWidth / 2
    container.scrollTop = center.y - container.clientHeight / 2
  }, [containerRef, floor])
  const movingElement =
    tool.mode === 'move' ? elements.find((element) => element.id === tool.elementId) : undefined
  const previewKind =
    tool.mode === 'place' ? findKind(tool.kindId) : movingElement && findKind(movingElement.kindId)
  const preview =
    previewKind !== undefined && pointer !== null
      ? centeredPlacement(previewKind, pointer, placementRotation)
      : null

  function pointerAt(event: MouseEvent<HTMLDivElement>): PointerPosition {
    const bounds = event.currentTarget.getBoundingClientRect()
    return {
      column: (event.clientX - bounds.left) / (floor.cellWidth * zoom),
      row: (event.clientY - bounds.top) / (floor.cellHeight * zoom),
    }
  }

  return (
    <div className="forge-grid-frame">
      <div className="forge-grid" ref={containerRef} {...dragHandlers}>
        <div
          className="forge-grid__sizer"
          style={{ width: canvasWidth * zoom, height: canvasHeight * zoom }}
        >
          <div
            className="forge-grid__canvas"
            style={{
              width: canvasWidth,
              height: canvasHeight,
              backgroundImage: `url(${floorImage()})`,
              transform: `scale(${zoom})`,
            }}
            onMouseMove={(event) => setPointer(pointerAt(event))}
            onMouseLeave={() => setPointer(null)}
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
            {RESERVES.map((reserve) => (
              <span
                key={reserve.id}
                className="forge-grid__reserve-output"
                style={areaStyle(reserve.output, floor)}
              >
                <span className="forge-grid__reserve-arrow">▲</span>
                <img
                  src={itemImage(reserve.itemId)}
                  alt={findItem(reserve.itemId)?.name ?? reserve.name}
                  className="forge-grid__reserve-item"
                />
              </span>
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
                  isMoving={element.id === movingElement?.id}
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
                isValid={isFree(preview, movingElement?.id)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="zoom-controls">
        <button
          type="button"
          className="zoom-controls__button"
          aria-label="Dézoomer"
          onClick={zoomOut}
        >
          −
        </button>
        <button
          type="button"
          className="zoom-controls__level"
          title="Revenir à 100 %"
          onClick={resetZoom}
        >
          {Math.round(zoom * 100)} %
        </button>
        <button
          type="button"
          className="zoom-controls__button"
          aria-label="Zoomer"
          onClick={zoomIn}
        >
          +
        </button>
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
      {occupiedAreas(kind, { kindId: kind.id, column: 0, row: 0, rotation }).map((area) => (
        <span
          key={`${area.column}-${area.row}`}
          className="forge-grid__preview-area"
          style={areaStyle(area, floor)}
        />
      ))}
    </span>
  )
}

function centeredPlacement(
  kind: ElementKind,
  pointer: PointerPosition,
  rotation: Rotation,
): Placement {
  const size = footprintOf(kind, { kindId: kind.id, column: 0, row: 0, rotation })
  return {
    kindId: kind.id,
    column: Math.round(pointer.column - size.width / 2),
    row: Math.round(pointer.row - size.height / 2),
    rotation,
  }
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
