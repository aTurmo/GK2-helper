import { useState } from 'react'
import { BuildablePanel } from './components/BuildablePanel'
import { BuildingList } from './components/BuildingList'
import { MaterialsPanel } from './components/MaterialsPanel'
import { BUILDINGS } from './data/buildings'
import { MATERIALS } from './data/materials'
import { totalMaterials } from './domain/totalMaterials'
import type { Building } from './domain/types'
import { useBuildPlan } from './hooks/useBuildPlan'
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
        onAdd={(buildable) => addBuild(selectedBuilding, buildable)}
      />
      <MaterialsPanel
        plannedBuilds={plannedBuilds}
        materialTotals={totalMaterials(plannedBuilds, MATERIALS)}
        onChangeCount={changeCount}
        onClear={clearPlan}
      />
    </div>
  )
}
