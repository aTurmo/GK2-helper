import { useState } from 'react'
import { MaterialsPanel } from '../material-planner/MaterialsPanel'
import { totalMaterials } from '../material-planner/totalMaterials'
import { useBuildPlan } from '../material-planner/useBuildPlan'
import { BuildablePanel } from './components/BuildablePanel'
import { BuildingList } from './components/BuildingList'
import { BUILDINGS } from './data/buildings'
import { MATERIALS } from './data/materials'
import type { Building } from './domain/types'
import { materialImage } from './images'
import './construction.css'

export function ConstructionTab() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(BUILDINGS[0])
  const { plannedBuilds, addBuild, changeCount, clearPlan } = useBuildPlan()

  return (
    <div className="construction-tab">
      <BuildingList
        buildings={BUILDINGS}
        selectedBuildingId={selectedBuilding.id}
        onSelect={setSelectedBuilding}
      />
      <BuildablePanel
        building={selectedBuilding}
        onAdd={(buildable) =>
          addBuild({
            key: `${selectedBuilding.id}/${buildable.id}`,
            name: buildable.name,
            detail: selectedBuilding.name,
            requirements: buildable.requirements,
          })
        }
      />
      <MaterialsPanel
        plannedBuilds={plannedBuilds}
        materialTotals={totalMaterials(plannedBuilds, MATERIALS)}
        materialImage={materialImage}
        onChangeCount={changeCount}
        onClear={clearPlan}
      />
    </div>
  )
}
