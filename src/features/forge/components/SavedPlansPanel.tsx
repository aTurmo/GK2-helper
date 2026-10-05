import { useRef, type ChangeEvent } from 'react'
import {
  isSameLayout,
  parsePlanExport,
  planExportContent,
  planExportFileName,
  type SavedPlan,
} from '../domain/savedPlans'
import type { ForgeLayout } from '../domain/types'

type SavedPlansPanelProps = {
  plans: readonly SavedPlan[]
  activePlanId: string | null
  currentLayout: ForgeLayout
  onSaveAs: (name: string) => void
  onUpdate: (planId: string) => void
  onLoad: (plan: SavedPlan) => void
  onRename: (planId: string, name: string) => void
  onRemove: (planId: string) => void
  onImport: (plan: Omit<SavedPlan, 'id'>) => void
}

export function SavedPlansPanel({
  plans,
  activePlanId,
  currentLayout,
  onSaveAs,
  onUpdate,
  onLoad,
  onRename,
  onRemove,
  onImport,
}: SavedPlansPanelProps) {
  const fileInput = useRef<HTMLInputElement>(null)
  const activePlan = plans.find((plan) => plan.id === activePlanId)
  const hasUnsavedChanges = activePlan
    ? !isSameLayout(activePlan.layout, currentLayout)
    : currentLayout.elements.length > 0

  function saveAs() {
    const name = window.prompt('Nom du plan :', activePlan ? `${activePlan.name} (copie)` : '')
    if (name !== null && name.trim() !== '') onSaveAs(name.trim())
  }

  function load(plan: SavedPlan) {
    if (
      hasUnsavedChanges &&
      !window.confirm('La forge actuelle a des modifications non enregistrées. La remplacer ?')
    ) {
      return
    }
    onLoad(plan)
  }

  function rename(plan: SavedPlan) {
    const name = window.prompt('Nouveau nom :', plan.name)
    if (name !== null && name.trim() !== '') onRename(plan.id, name.trim())
  }

  function remove(plan: SavedPlan) {
    if (window.confirm(`Supprimer le plan « ${plan.name} » ?`)) onRemove(plan.id)
  }

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file === undefined) return
    const plan = parsePlanExport(await file.text())
    if (plan === null) {
      window.alert(`« ${file.name} » n'est pas un plan de forge valide.`)
      return
    }
    onImport(plan)
  }

  return (
    <section className="saved-plans">
      <h2 className="saved-plans__title">Plans</h2>
      {activePlan && (
        <p className="saved-plans__active">
          Plan chargé : <strong>{activePlan.name}</strong>
          {hasUnsavedChanges && <span className="saved-plans__modified"> (modifié)</span>}
        </p>
      )}
      <div className="saved-plans__actions">
        <button type="button" className="forge-button" onClick={saveAs}>
          Enregistrer sous…
        </button>
        {activePlan && (
          <button
            type="button"
            className="forge-button"
            disabled={!hasUnsavedChanges}
            onClick={() => onUpdate(activePlan.id)}
          >
            Mettre à jour
          </button>
        )}
        <button type="button" className="forge-button" onClick={() => fileInput.current?.click()}>
          Importer…
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(event) => void importFile(event)}
        />
      </div>
      {plans.length === 0 ? (
        <p className="saved-plans__empty">Aucun plan enregistré.</p>
      ) : (
        <ul className="saved-plans__list">
          {plans.map((plan) => (
            <li key={plan.id} className="saved-plan" data-active={plan.id === activePlanId}>
              <span className="saved-plan__name">{plan.name}</span>
              <span className="saved-plan__date">
                {new Date(plan.savedAt).toLocaleString('fr-FR', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </span>
              <span className="saved-plan__actions">
                <button type="button" onClick={() => load(plan)}>
                  Charger
                </button>
                <button type="button" onClick={() => downloadPlan(plan)}>
                  Exporter
                </button>
                <button type="button" onClick={() => rename(plan)}>
                  Renommer
                </button>
                <button type="button" className="saved-plan__remove" onClick={() => remove(plan)}>
                  Supprimer
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function downloadPlan(plan: SavedPlan) {
  const url = URL.createObjectURL(new Blob([planExportContent(plan)], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = planExportFileName(plan)
  link.click()
  URL.revokeObjectURL(url)
}
