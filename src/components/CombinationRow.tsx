import { Fragment } from 'react'
import type { Combination } from '../alchemy/types'

export function CombinationRow({ combination }: { combination: Combination }) {
  return (
    <li className="combination">
      {combination.map((ingredient, position) => (
        <Fragment key={`${position}-${ingredient.id}`}>
          {position > 0 && <span className="combination__plus">+</span>}
          <img src={`/images/ingredients/${ingredient.id}.png`} alt={ingredient.name} />
        </Fragment>
      ))}
    </li>
  )
}
