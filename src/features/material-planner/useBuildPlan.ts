import { useState } from 'react'
import type { PlannableItem, PlannedBuild } from './types'

export function useBuildPlan() {
  const [plannedBuilds, setPlannedBuilds] = useState<readonly PlannedBuild[]>([])

  function addBuild(item: PlannableItem) {
    setPlannedBuilds((previous) =>
      previous.some((planned) => planned.key === item.key)
        ? previous.map((planned) =>
            planned.key === item.key ? { ...planned, count: planned.count + 1 } : planned,
          )
        : [...previous, { ...item, count: 1 }],
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
