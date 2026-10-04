import { useEffect, useState } from 'react'

export function useActiveTab(tabIds: readonly string[]) {
  const [activeTabId, setActiveTabId] = useState(() => tabIdFromLocation(tabIds))

  useEffect(() => {
    const syncWithLocation = () => setActiveTabId(tabIdFromLocation(tabIds))
    window.addEventListener('hashchange', syncWithLocation)
    return () => window.removeEventListener('hashchange', syncWithLocation)
  }, [tabIds])

  function selectTab(tabId: string) {
    window.location.hash = tabId
  }

  return { activeTabId, selectTab }
}

function tabIdFromLocation(tabIds: readonly string[]): string {
  const requestedTabId = window.location.hash.slice(1)
  return tabIds.includes(requestedTabId) ? requestedTabId : tabIds[0]
}
