import type { ReactNode } from 'react'
import { MATERIALS } from '../../construction/data/materials'
import { materialImage } from '../../construction/images'
import { QuantityStepper } from '../../material-planner/QuantityStepper'
import { totalMaterials } from '../../material-planner/totalMaterials'
import { elementBuildCost, extensionBuildCost } from '../data/buildCosts'
import { findRecipe } from '../data/lookups'
import { countedBuilds, type BuildCostLines, type ElementCostLine } from '../domain/buildCost'
import { elementImage, itemImage } from '../images'

type BuildCostPanelProps = {
  lines: BuildCostLines
  onToggle: (key: string) => void
  onChangeConveyorCount: (kindId: string, excludedCount: number) => void
}

export function BuildCostPanel({ lines, onToggle, onChangeConveyorCount }: BuildCostPanelProps) {
  const totals = totalMaterials(
    countedBuilds(lines, elementBuildCost, extensionBuildCost),
    MATERIALS,
  )
  const isEmpty =
    lines.conveyors.length === 0 && lines.production.length === 0 && lines.others.length === 0

  return (
    <section className="build-cost">
      <h2 className="build-cost__title">Coût</h2>
      {isEmpty ? (
        <p className="build-cost__empty">Rien n'est placé.</p>
      ) : (
        <>
          {lines.conveyors.length > 0 && (
            <CostGroup title="Convoyeurs">
              {lines.conveyors.map((line) => (
                <li key={line.kind.id} className="build-cost__line">
                  <img src={elementImage(line.kind.id)} alt="" className="build-cost__icon" />
                  <span className="build-cost__name">
                    {line.kind.name}
                    <span className="build-cost__detail">sur {line.placedCount} placés</span>
                  </span>
                  <span className="build-cost__count">
                    <QuantityStepper
                      label={line.kind.name}
                      value={line.countedCount}
                      onChange={(count) =>
                        onChangeConveyorCount(
                          line.kind.id,
                          line.placedCount - Math.min(line.placedCount, Math.max(0, count)),
                        )
                      }
                    />
                    <span className="build-cost__shortcuts">
                      <button
                        type="button"
                        className="build-cost__shortcut"
                        disabled={line.countedCount === 0}
                        onClick={() => onChangeConveyorCount(line.kind.id, line.placedCount)}
                      >
                        0
                      </button>
                      <button
                        type="button"
                        className="build-cost__shortcut"
                        disabled={line.countedCount === line.placedCount}
                        onClick={() => onChangeConveyorCount(line.kind.id, 0)}
                      >
                        max
                      </button>
                    </span>
                  </span>
                </li>
              ))}
            </CostGroup>
          )}
          {lines.production.length > 0 && (
            <CostGroup title="Production">
              <ElementLines lines={lines.production} onToggle={onToggle} />
            </CostGroup>
          )}
          {lines.others.length > 0 && (
            <CostGroup title="Autres">
              <ElementLines lines={lines.others} onToggle={onToggle} />
            </CostGroup>
          )}
          <div className="build-cost__group">
            <h3 className="build-cost__group-title">Total</h3>
            {totals.length === 0 ? (
              <p className="build-cost__empty">Aucun élément compté.</p>
            ) : (
              <ul className="build-cost__totals">
                {totals.map(({ material, quantity }) => (
                  <li key={material.id} className="build-cost__total">
                    <img src={materialImage(material.id)} alt="" className="build-cost__icon" />
                    <span className="build-cost__name">{material.name}</span>
                    <span className="build-cost__quantity">{quantity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  )
}

function CostGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="build-cost__group">
      <h3 className="build-cost__group-title">{title}</h3>
      <ul className="build-cost__lines">{children}</ul>
    </div>
  )
}

type ElementLinesProps = {
  lines: readonly ElementCostLine[]
  onToggle: (key: string) => void
}

function ElementLines({ lines, onToggle }: ElementLinesProps) {
  return lines.map((line) => {
    const sameKind = lines.filter((other) => other.kind.id === line.kind.id)
    const number = sameKind.length > 1 ? ` · ${sameKind.indexOf(line) + 1}` : ''
    const recipe = findRecipe(line.element.recipeId)
    return (
      <li key={line.key} className="build-cost__element">
        <label className="build-cost__line">
          <input type="checkbox" checked={line.isCounted} onChange={() => onToggle(line.key)} />
          <img src={elementImage(line.kind.id)} alt="" className="build-cost__icon" />
          <span className="build-cost__name">
            {line.kind.name}
            {number}
          </span>
          {recipe && (
            <img
              src={itemImage(recipe.output.itemId)}
              alt={recipe.name}
              title={recipe.name}
              className="build-cost__icon"
            />
          )}
        </label>
        {line.extensions.map((extension) => (
          <label key={extension.key} className="build-cost__line build-cost__line--extension">
            <input
              type="checkbox"
              checked={extension.isCounted}
              onChange={() => onToggle(extension.key)}
            />
            <img src={elementImage(extension.extension.id)} alt="" className="build-cost__icon" />
            <span className="build-cost__name">{extension.extension.name}</span>
          </label>
        ))}
      </li>
    )
  })
}
