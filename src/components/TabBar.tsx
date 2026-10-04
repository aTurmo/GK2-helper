type TabBarProps = {
  tabs: readonly { id: string; label: string }[]
  activeTabId: string
  onSelect: (tabId: string) => void
}

export function TabBar({ tabs, activeTabId, onSelect }: TabBarProps) {
  return (
    <nav className="tab-bar" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          className="tab-bar__tab"
          aria-selected={tab.id === activeTabId}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
