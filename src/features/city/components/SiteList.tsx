import type { Site } from '../domain/types'

type SiteListProps = {
  sites: readonly Site[]
  selectedSiteNumber: number
  onSelect: (site: Site) => void
}

export function SiteList({ sites, selectedSiteNumber, onSelect }: SiteListProps) {
  return (
    <ul className="site-list">
      {sites.map((site) => (
        <li key={site.number}>
          <button
            type="button"
            className="site-list__item"
            aria-pressed={site.number === selectedSiteNumber}
            onClick={() => onSelect(site)}
          >
            <span className="site-list__number">{site.number}</span>
            <span>{site.name}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
