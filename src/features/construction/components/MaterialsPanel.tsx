import type { MaterialTotal, PlannedBuild } from '../domain/types'
import { materialImage } from '../images'
import { QuantityStepper } from './QuantityStepper'

type MaterialsPanelProps = {
  plannedBuilds: readonly PlannedBuild[]
  materialTotals: readonly MaterialTotal[]
  onChangeCount: (key: string, count: number) => void
  onClear: () => void
}

export function MaterialsPanel({
  plannedBuilds,
  materialTotals,
  onChangeCount,
  onClear,
}: MaterialsPanelProps) {
  return (
    <section className="materials-panel">
      <header className="materials-panel__header">
        <h2 className="materials-panel__title">Matériaux</h2>
        <button
          type="button"
          className="materials-panel__clear"
          disabled={plannedBuilds.length === 0}
          onClick={onClear}
        >
          Vider
        </button>
      </header>
      {plannedBuilds.length === 0 ? (
        <p className="materials-panel__empty">Cliquez sur une construction pour l'ajouter.</p>
      ) : (
        <div className="materials-panel__content">
          <ul className="planned-builds">
            {plannedBuilds.map((planned) => (
              <li key={planned.key} className="planned-build">
                <span className="planned-build__name">
                  {planned.buildable.name}
                  <span className="planned-build__building">{planned.building.name}</span>
                </span>
                <QuantityStepper
                  label={planned.buildable.name}
                  value={planned.count}
                  onChange={(count) => onChangeCount(planned.key, count)}
                />
              </li>
            ))}
          </ul>
          <ul className="material-totals">
            {materialTotals.map(({ material, quantity }) => (
              <li key={material.id} className="material-total">
                <img src={materialImage(material.id)} alt="" className="material-total__icon" />
                <span className="material-total__name">{material.name}</span>
                <span className="material-total__quantity">{quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
