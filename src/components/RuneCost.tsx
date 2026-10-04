import { RUNE_COLORS, type Runes } from '../alchemy/runes'

export function RuneCost({ runes }: { runes: Runes }) {
  return (
    <span className="rune-cost">
      {RUNE_COLORS.filter((color) => runes[color] > 0).map((color) => (
        <span key={color} className="rune-cost__rune">
          <img src={`/images/${color}-rune.png`} alt="" />
          {runes[color]}
        </span>
      ))}
    </span>
  )
}
