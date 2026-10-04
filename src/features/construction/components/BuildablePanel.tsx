import type { Buildable, Building } from '../domain/types'
import { buildableImage } from '../images'

type BuildablePanelProps = {
  building: Building
  onAdd: (buildable: Buildable) => void
}

export function BuildablePanel({ building, onAdd }: BuildablePanelProps) {
  return (
    <section className="buildable-panel">
      <h2 className="buildable-panel__title">{building.name}</h2>
      <ul className="buildable-panel__list">
        {building.buildables.map((buildable) => (
          <li key={buildable.id}>
            <button
              type="button"
              className="buildable-panel__item"
              title={`Ajouter ${buildable.name}`}
              onClick={() => onAdd(buildable)}
            >
              <img src={buildableImage(building.id, buildable.id)} alt={buildable.name} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
