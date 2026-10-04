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
import { useDoneSites } from './hooks/useDoneSites'
import { materialImage } from './images'
import './city.css'

export function CityTab() {
  const [selectedSite, setSelectedSite] = useState<Site>(SITES[0])
  const { plannedBuilds, addBuild, changeCount, clearPlan } = useBuildPlan()
  const { doneSiteIds, toggleDone } = useDoneSites()
  const selectedOptions = OPTIONS.filter((option) => selectedSite.optionIds.includes(option.id))

  return (
    <div className="city-tab">
      <SiteList
        sites={SITES}
        selectedSiteId={selectedSite.id}
        doneSiteIds={doneSiteIds}
        onSelect={setSelectedSite}
      />
      <div className="city-tab__center">
        <CityMap
          sites={SITES}
          selectedSiteId={selectedSite.id}
          doneSiteIds={doneSiteIds}
          onSelect={setSelectedSite}
        />
        <SitePanel
          site={selectedSite}
          options={selectedOptions}
          isDone={doneSiteIds.has(selectedSite.id)}
          onToggleDone={() => toggleDone(selectedSite.id)}
          onAdd={(option) =>
            addBuild({
              key: `${selectedSite.id}/${option.id}`,
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
