import { RUNE_COLORS, type Runes } from '../domain/runes'
import { runeImage } from '../images'

export function RuneCost({ runes }: { runes: Runes }) {
  return (
    <span className="rune-cost">
      {RUNE_COLORS.filter((color) => runes[color] > 0).map((color) => (
        <span key={color} className="rune-cost__rune">
          <img src={runeImage(color)} alt="" />
          {runes[color]}
        </span>
      ))}
    </span>
  )
}
