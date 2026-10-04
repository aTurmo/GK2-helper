import type { ComponentType } from 'react'
import { TabBar } from './components/TabBar'
import { AlchemyTab } from './features/alchemy/AlchemyTab'
import { ConstructionTab } from './features/construction/ConstructionTab'
import { useActiveTab } from './hooks/useActiveTab'

type Tab = {
  id: string
  label: string
  Content: ComponentType
}

const TABS: readonly Tab[] = [
  { id: 'alchimie', label: 'Alchimie', Content: AlchemyTab },
  { id: 'construction', label: 'Construction', Content: ConstructionTab },
]

const TAB_IDS = TABS.map((tab) => tab.id)

function App() {
  const { activeTabId, selectTab } = useActiveTab(TAB_IDS)
  const activeTab = TABS.find((tab) => tab.id === activeTabId) ?? TABS[0]

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">Graveyard Keeper 2</h1>
        <TabBar tabs={TABS} activeTabId={activeTab.id} onSelect={selectTab} />
      </header>
      <div className="app__tab-content" role="tabpanel">
        <activeTab.Content />
      </div>
    </main>
  )
}

export default App
