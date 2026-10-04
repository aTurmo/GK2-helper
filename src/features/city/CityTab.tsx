import { useState } from 'react'
import { MaterialsPanel } from '../material-planner/MaterialsPanel'
import { totalMaterials } from '../material-planner/totalMaterials'
import { useBuildPlan } from '../material-planner/useBuildPlan'
import { CityMap } from './components/CityMap'
import { SiteList } from './components/SiteList'
import { SitePanel } from './components/SitePanel'
import { MATERIALS } from './data/materials'
import { OPTIONS } from './data/options'
import { SITES } from './data/sites'
import type { Site } from './domain/types'
import { materialImage } from './images'
import './city.css'

export function CityTab() {
  const [selectedSite, setSelectedSite] = useState<Site>(SITES[0])
  const { plannedBuilds, addBuild, changeCount, clearPlan } = useBuildPlan()
  const selectedOptions = OPTIONS.filter((option) => selectedSite.optionIds.includes(option.id))

  return (
    <div className="city-tab">
      <SiteList sites={SITES} selectedSiteNumber={selectedSite.number} onSelect={setSelectedSite} />
      <div className="city-tab__center">
        <CityMap
          sites={SITES}
          selectedSiteNumber={selectedSite.number}
          onSelect={setSelectedSite}
        />
        <SitePanel
          site={selectedSite}
          options={selectedOptions}
          onAdd={(option) =>
            addBuild({
              key: `${selectedSite.number}/${option.id}`,
              name: option.name,
              detail: `Site ${selectedSite.number} · ${selectedSite.name}`,
              requirements: option.requirements,
            })
          }
        />
      </div>
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
