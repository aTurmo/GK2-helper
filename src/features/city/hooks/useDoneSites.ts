import { useEffect, useState } from 'react'

const STORAGE_KEY = 'gk2-helper:city:done-sites'

export function useDoneSites() {
  const [doneSiteIds, setDoneSiteIds] = useState<ReadonlySet<string>>(readDoneSiteIds)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...doneSiteIds]))
    } catch (error) {
      console.warn('Could not save the built sites, they will be lost on reload.', error)
    }
  }, [doneSiteIds])

  function toggleDone(siteId: string) {
    setDoneSiteIds((previous) => {
      const next = new Set(previous)
      if (next.has(siteId)) {
        next.delete(siteId)
      } else {
        next.add(siteId)
      }
      return next
    })
  }

  return { doneSiteIds, toggleDone }
}

function readDoneSiteIds(): ReadonlySet<string> {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(stored)
      ? new Set(stored.filter((id): id is string => typeof id === 'string'))
      : new Set()
  } catch (error) {
    console.warn('Could not read the built sites, starting with none.', error)
    return new Set()
  }
}
