import { Fragment } from 'react'
import type { Combination } from '../domain/types'
import { ingredientImage } from '../images'

export function CombinationRow({ combination }: { combination: Combination }) {
  return (
    <li className="combination">
      {combination.map((ingredient, position) => (
        <Fragment key={`${position}-${ingredient.id}`}>
          {position > 0 && <span className="combination__plus">+</span>}
          <img src={ingredientImage(ingredient.id)} alt={ingredient.name} />
        </Fragment>
      ))}
    </li>
  )
}
