import { useEffect, useRef } from 'react'
import type { Site } from '../domain/types'
import { cityMapImage } from '../images'

type CityMapProps = {
  sites: readonly Site[]
  selectedSiteNumber: number
  onSelect: (site: Site) => void
}

export function CityMap({ sites, selectedSiteNumber, onSelect }: CityMapProps) {
  const selectedPin = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    selectedPin.current?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
  }, [selectedSiteNumber])

  return (
    <div className="city-map">
      <div className="city-map__canvas">
        <img src={cityMapImage()} alt="Carte de la ville" className="city-map__image" />
        {sites.map((site) => {
          const isSelected = site.number === selectedSiteNumber
          return (
            <button
              key={site.number}
              ref={isSelected ? selectedPin : undefined}
              type="button"
              className="city-map__pin"
              style={{ left: site.position.x, top: site.position.y }}
              aria-pressed={isSelected}
              aria-label={`Site ${site.number} : ${site.name}`}
              onClick={() => onSelect(site)}
            >
              {site.number}
            </button>
          )
        })}
      </div>
    </div>
  )
}
