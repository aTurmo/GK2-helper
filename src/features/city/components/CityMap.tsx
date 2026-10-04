import { useEffect, useRef } from 'react'
import type { Site } from '../domain/types'
import { cityMapImage } from '../images'

type CityMapProps = {
  sites: readonly Site[]
  selectedSiteId: string
  doneSiteIds: ReadonlySet<string>
  onSelect: (site: Site) => void
}

export function CityMap({ sites, selectedSiteId, doneSiteIds, onSelect }: CityMapProps) {
  const selectedPin = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    selectedPin.current?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
  }, [selectedSiteId])

  return (
    <div className="city-map">
      <div className="city-map__canvas">
        <img src={cityMapImage()} alt="Carte de la ville" className="city-map__image" />
        {sites.map((site) => {
          const isSelected = site.id === selectedSiteId
          const isDone = doneSiteIds.has(site.id)
          return (
            <button
              key={site.id}
              ref={isSelected ? selectedPin : undefined}
              type="button"
              className="city-map__pin"
              style={{ left: site.position.x, top: site.position.y }}
              data-done={isDone}
              aria-pressed={isSelected}
              aria-label={`Site ${site.number} : ${site.name}${isDone ? ' (construit)' : ''}`}
              onClick={() => onSelect(site)}
            >
              {isDone ? '✓' : site.number}
            </button>
          )
        })}
      </div>
    </div>
  )
}
