import { useEffect, useState } from 'react'
import { parseSavedPlan, type SavedPlan } from '../domain/savedPlans'
import type { ForgeLayout } from '../domain/types'

const STORAGE_KEY = 'gk2-helper:forge:saved-plans'

export function useSavedPlans() {
  const [plans, setPlans] = useState<readonly SavedPlan[]>(readPlans)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
    } catch (error) {
      console.warn('Could not save the forge plans, they will be lost on reload.', error)
    }
  }, [plans])

  function addPlan(name: string, layout: ForgeLayout, savedAt = new Date().toISOString()) {
    const plan: SavedPlan = { id: crypto.randomUUID(), name, savedAt, layout }
    setPlans((previous) => [...previous, plan])
    return plan.id
  }

  function updatePlan(planId: string, layout: ForgeLayout) {
    setPlans((previous) =>
      previous.map((plan) =>
        plan.id === planId ? { ...plan, layout, savedAt: new Date().toISOString() } : plan,
      ),
    )
  }

  function renamePlan(planId: string, name: string) {
    setPlans((previous) => previous.map((plan) => (plan.id === planId ? { ...plan, name } : plan)))
  }

  function removePlan(planId: string) {
    setPlans((previous) => previous.filter((plan) => plan.id !== planId))
  }

  return { plans, addPlan, updatePlan, renamePlan, removePlan }
}

function readPlans(): readonly SavedPlan[] {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(stored)) return []
    return stored.flatMap((value) => {
      const plan = parseSavedPlan(value)
      return plan === null ? [] : [plan]
    })
  } catch (error) {
    console.warn('Could not read the forge plans, starting with none.', error)
    return []
  }
}
