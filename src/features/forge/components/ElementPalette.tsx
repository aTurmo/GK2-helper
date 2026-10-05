import { MATERIALS } from '../../construction/data/materials'
import { materialImage } from '../../construction/images'
import { elementBuildCost } from '../data/buildCosts'
import type { ElementKind, Rotation } from '../domain/types'
import { ERASE_TOOL, SELECT_TOOL, type Tool } from '../domain/tool'
import { elementImage } from '../images'

type ElementPaletteProps = {
  kinds: readonly ElementKind[]
  tool: Tool
  placementRotation: Rotation
  onSelectTool: (tool: Tool) => void
  onRotate: () => void
  onClear: () => void
}

export function ElementPalette({
  kinds,
  tool,
  placementRotation,
  onSelectTool,
  onRotate,
  onClear,
}: ElementPaletteProps) {
  return (
    <aside className="element-palette">
      <div className="element-palette__tools">
        <button
          type="button"
          className="element-palette__tool"
          aria-pressed={tool.mode === 'select'}
          onClick={() => onSelectTool(SELECT_TOOL)}
        >
          Sélection
        </button>
        <button
          type="button"
          className="element-palette__tool"
          aria-pressed={tool.mode === 'erase'}
          onClick={() => onSelectTool(ERASE_TOOL)}
        >
          Gomme
        </button>
      </div>
      <ul className="element-palette__kinds">
        {kinds.map((kind) => (
          <li key={kind.id}>
            <button
              type="button"
              className="element-palette__kind"
              aria-pressed={tool.mode === 'place' && tool.kindId === kind.id}
              onClick={() => onSelectTool({ mode: 'place', kindId: kind.id })}
            >
              <img src={elementImage(kind.id)} alt="" className="element-palette__icon" />
              <span className="element-palette__label">
                <span>{kind.name}</span>
                <span className="element-palette__cost">
                  {elementBuildCost(kind.id).map((requirement) => (
                    <span key={requirement.materialId} className="element-palette__cost-item">
                      <img
                        src={materialImage(requirement.materialId)}
                        alt={findMaterialName(requirement.materialId)}
                        title={findMaterialName(requirement.materialId)}
                        className="element-palette__cost-icon"
                      />
                      {requirement.quantity}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="element-palette__action" onClick={onRotate}>
        Pivoter (R) · position {placementRotation + 1}/4
      </button>
      <button
        type="button"
        className="element-palette__action element-palette__action--danger"
        onClick={onClear}
      >
        Tout effacer
      </button>
    </aside>
  )
}

function findMaterialName(materialId: string): string {
  return MATERIALS.find((material) => material.id === materialId)?.name ?? materialId
}
