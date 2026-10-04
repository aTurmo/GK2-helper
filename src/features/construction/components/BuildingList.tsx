import type { Building } from '../domain/types'

type BuildingListProps = {
  buildings: readonly Building[]
  selectedBuildingId: string
  onSelect: (building: Building) => void
}

export function BuildingList({ buildings, selectedBuildingId, onSelect }: BuildingListProps) {
  return (
    <ul className="building-list">
      {buildings.map((building) => (
        <li key={building.id}>
          <button
            type="button"
            className="building-list__item"
            aria-pressed={building.id === selectedBuildingId}
            onClick={() => onSelect(building)}
          >
            <span>{building.name}</span>
            <span className="building-list__count">{building.buildables.length}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
