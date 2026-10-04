import type { Site } from '../domain/types'

type SiteListProps = {
  sites: readonly Site[]
  selectedSiteId: string
  doneSiteIds: ReadonlySet<string>
  onSelect: (site: Site) => void
}

export function SiteList({ sites, selectedSiteId, doneSiteIds, onSelect }: SiteListProps) {
  return (
    <ul className="site-list">
      {sites.map((site) => {
        const isDone = doneSiteIds.has(site.id)
        return (
          <li key={site.id}>
            <button
              type="button"
              className="site-list__item"
              data-done={isDone}
              aria-pressed={site.id === selectedSiteId}
              onClick={() => onSelect(site)}
            >
              <span className="site-list__number">{site.number}</span>
              <span>{site.name}</span>
              {isDone && (
                <span className="site-list__done" aria-label="Construit">
                  ✓
                </span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
