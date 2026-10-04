import { findItem } from '../data/lookups'
import type { ItemQuantity, Recipe } from '../domain/types'
import { itemImage } from '../images'

export function RecipeSummary({ recipe }: { recipe: Recipe }) {
  return (
    <div className="recipe-summary">
      <div className="recipe-summary__items">
        {recipe.inputs.map((input) => (
          <ItemBadge key={input.itemId} itemQuantity={input} />
        ))}
        <span className="recipe-summary__arrow">→</span>
        <ItemBadge itemQuantity={recipe.output} />
      </div>
      <p className="recipe-summary__work">Travail : {recipe.work}</p>
    </div>
  )
}

function ItemBadge({ itemQuantity }: { itemQuantity: ItemQuantity }) {
  const name = findItem(itemQuantity.itemId)?.name ?? itemQuantity.itemId
  return (
    <span className="item-badge" title={name}>
      <img src={itemImage(itemQuantity.itemId)} alt={name} className="item-badge__icon" />
      <span className="item-badge__quantity">×{itemQuantity.quantity}</span>
    </span>
  )
}
