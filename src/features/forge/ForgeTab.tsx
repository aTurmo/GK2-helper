import { useEffect, useState } from 'react'
import { ElementDetails } from './components/ElementDetails'
import { ElementPalette } from './components/ElementPalette'
import { EnergySummary } from './components/EnergySummary'
import { ForgeGrid } from './components/ForgeGrid'
import { ELEMENT_KINDS } from './data/elements'
import { FLOOR } from './data/floor'
import { findKind } from './data/lookups'
import { energyBalance } from './domain/energy'
import { nextRotation } from './domain/placement'
import { SELECT_TOOL, type Tool } from './domain/tool'
import type { Rotation } from './domain/types'
import { useForgeLayout } from './hooks/useForgeLayout'
import './forge.css'

export function ForgeTab() {
  const forge = useForgeLayout()
  const { layout } = forge
  const [tool, setTool] = useState<Tool>(SELECT_TOOL)
  const [placementRotation, setPlacementRotation] = useState<Rotation>(0)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const selectedElement = layout.elements.find((element) => element.id === selectedElementId)
  const selectedKind = selectedElement && findKind(selectedElement.kindId)

  function rotate() {
    if (tool.mode === 'place') {
      setPlacementRotation(nextRotation)
    } else if (selectedElementId !== null) {
      forge.rotateElement(selectedElementId)
    }
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
      if (event.key === 'Escape') setTool(SELECT_TOOL)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <div className="forge-tab">
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
      <ForgeGrid
        elements={layout.elements}
        floor={FLOOR}
        tool={tool}
        placementRotation={placementRotation}
        selectedElementId={selectedElementId}
        isFree={forge.isFree}
        onPlace={forge.placeElement}
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
            onRemove={() => removeElement(selectedElement.id)}
          />
        ) : (
          <p className="forge-panel__hint">
            Choisissez un élément à gauche puis cliquez sur la grille pour le placer. Clic droit
            pour supprimer, R pour pivoter, Échap pour revenir à la sélection.
          </p>
        )}
      </div>
    </div>
  )
}
