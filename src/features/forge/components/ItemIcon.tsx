import type { Quality } from '../domain/types'
import { itemImage, qualityStarImage } from '../images'

const QUALITY_NAMES: Readonly<Record<Quality, string>> = {
  bronze: 'bronze',
  silver: 'argent',
  gold: 'or',
}

type ItemIconProps = {
  itemId: string
  quality: Quality | undefined
  alt: string
  className: string
}

export function ItemIcon({ itemId, quality, alt, className }: ItemIconProps) {
  return (
    <span className="item-icon">
      <img src={itemImage(itemId)} alt={alt} className={className} />
      {quality !== undefined && (
        <img
          src={qualityStarImage(quality)}
          alt={`qualité ${QUALITY_NAMES[quality]}`}
          title={`Qualité ${QUALITY_NAMES[quality]}`}
          className="item-icon__star"
        />
      )}
    </span>
  )
}
