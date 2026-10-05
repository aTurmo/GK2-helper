import { useEffect, useState } from 'react'
import { ElementDetails } from './components/ElementDetails'
import { BuildCostPanel } from './components/BuildCostPanel'
import { ElementPalette } from './components/ElementPalette'
import { EnergySummary } from './components/EnergySummary'
import { ForgeGrid } from './components/ForgeGrid'
import { SavedPlansPanel } from './components/SavedPlansPanel'
import { ELEMENT_KINDS } from './data/elements'
import { FLOOR } from './data/floor'
import { findExtension, findKind } from './data/lookups'
import { buildCostLines } from './domain/buildCost'
import { energyBalance } from './domain/energy'
import { nextRotation } from './domain/placement'
import { SELECT_TOOL, type Tool } from './domain/tool'
import type { Placement, Rotation } from './domain/types'
import { useForgeLayout } from './hooks/useForgeLayout'
import { useSavedPlans } from './hooks/useSavedPlans'
import './forge.css'

export function ForgeTab() {
  const forge = useForgeLayout()
  const { layout } = forge
  const [tool, setTool] = useState<Tool>(SELECT_TOOL)
  const [placementRotation, setPlacementRotation] = useState<Rotation>(0)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const savedPlans = useSavedPlans()
  const [activePlanId, setActivePlanId] = useState<string | null>(null)
  const selectedElement = layout.elements.find((element) => element.id === selectedElementId)
  const selectedKind = selectedElement && findKind(selectedElement.kindId)

  function rotate() {
    if (tool.mode === 'place' || tool.mode === 'move') {
      setPlacementRotation(nextRotation)
    } else if (selectedElementId !== null) {
      forge.rotateElement(selectedElementId)
    }
  }

  function startMoving(elementId: string) {
    const element = layout.elements.find((candidate) => candidate.id === elementId)
    if (element === undefined) return
    setPlacementRotation(element.rotation)
    setTool({ mode: 'move', elementId })
  }

  function dropElement(placement: Placement) {
    if (tool.mode === 'move') {
      forge.moveElement(tool.elementId, placement)
      setSelectedElementId(tool.elementId)
      setTool(SELECT_TOOL)
      return
    }
    const placedElementId = forge.placeElement(placement)
    if (placedElementId !== null) setSelectedElementId(placedElementId)
  }

  function removeElement(elementId: string) {
    forge.removeElement(elementId)
    if (elementId === selectedElementId) setSelectedElementId(null)
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
        return
      }
      if (event.key === 'r' || event.key === 'R') rotate()
      if ((event.key === 'm' || event.key === 'M') && selectedElementId !== null) {
        startMoving(selectedElementId)
      }
      if (event.key === 'Escape') setTool(SELECT_TOOL)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <div className="forge-tab">
      <div className="forge-tab__side">
        <ElementPalette
          kinds={ELEMENT_KINDS}
          tool={tool}
          placementRotation={placementRotation}
          onSelectTool={setTool}
          onRotate={rotate}
          onClear={() => {
            if (window.confirm('Effacer toute la forge ?')) {
              forge.clearElements()
              setSelectedElementId(null)
            }
          }}
        />
        <BuildCostPanel
          lines={buildCostLines(layout, { findKind, findExtension })}
          onToggle={forge.toggleCostExclusion}
          onChangeConveyorCount={forge.setExcludedConveyorCount}
        />
        <SavedPlansPanel
          plans={savedPlans.plans}
          activePlanId={activePlanId}
          currentLayout={layout}
          onSaveAs={(name) => setActivePlanId(savedPlans.addPlan(name, layout))}
          onUpdate={(planId) => savedPlans.updatePlan(planId, layout)}
          onLoad={(plan) => {
            forge.replaceLayout(plan.layout)
            setActivePlanId(plan.id)
            setSelectedElementId(null)
            setTool(SELECT_TOOL)
          }}
          onRename={savedPlans.renamePlan}
          onRemove={(planId) => {
            savedPlans.removePlan(planId)
            if (planId === activePlanId) setActivePlanId(null)
          }}
          onImport={(plan) => savedPlans.addPlan(plan.name, plan.layout, plan.savedAt)}
        />
      </div>
      <ForgeGrid
        elements={layout.elements}
        floor={FLOOR}
        tool={tool}
        placementRotation={placementRotation}
        selectedElementId={selectedElementId}
        isFree={forge.isFree}
        onPlace={dropElement}
        onElementClick={(elementId) =>
          tool.mode === 'erase' ? removeElement(elementId) : setSelectedElementId(elementId)
        }
        onElementRemove={removeElement}
      />
      <div className="forge-panel">
        <EnergySummary
          {...energyBalance(layout, findKind)}
          zombieCount={layout.zombieCount}
          onChangeZombieCount={forge.changeZombieCount}
        />
        {selectedElement && selectedKind ? (
          <ElementDetails
            element={selectedElement}
            kind={selectedKind}
            onChange={forge.replaceElement}
            onRotate={() => forge.rotateElement(selectedElement.id)}
            onMove={() => startMoving(selectedElement.id)}
            onRemove={() => removeElement(selectedElement.id)}
          />
        ) : (
          <p className="forge-panel__hint">
            Choisissez un élément à gauche puis cliquez sur la grille pour le placer. Clic droit
            pour supprimer, R pour pivoter, M pour déplacer l'élément sélectionné, Échap pour
            annuler.
          </p>
        )}
      </div>
    </div>
  )
}
