import { useState } from 'react'
import type { Buildable, Building, PlannedBuild } from '../domain/types'

export function useBuildPlan() {
  const [plannedBuilds, setPlannedBuilds] = useState<readonly PlannedBuild[]>([])

  function addBuild(building: Building, buildable: Buildable) {
    const key = `${building.id}/${buildable.id}`
    setPlannedBuilds((previous) =>
      previous.some((planned) => planned.key === key)
        ? previous.map((planned) =>
            planned.key === key ? { ...planned, count: planned.count + 1 } : planned,
          )
        : [...previous, { key, building, buildable, count: 1 }],
    )
  }

  function changeCount(key: string, count: number) {
    setPlannedBuilds((previous) =>
      count <= 0
        ? previous.filter((planned) => planned.key !== key)
        : previous.map((planned) => (planned.key === key ? { ...planned, count } : planned)),
    )
  }

  function clearPlan() {
    setPlannedBuilds([])
  }

  return { plannedBuilds, addBuild, changeCount, clearPlan }
}
