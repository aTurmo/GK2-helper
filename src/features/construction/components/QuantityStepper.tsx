import { minusButtonImage, plusButtonImage } from '../images'

type QuantityStepperProps = {
  label: string
  value: number
  onChange: (value: number) => void
}

export function QuantityStepper({ label, value, onChange }: QuantityStepperProps) {
  return (
    <span className="quantity-stepper">
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label={`Retirer un ${label}`}
        onClick={() => onChange(value - 1)}
      >
        <img src={minusButtonImage()} alt="" />
      </button>
      <input
        type="number"
        className="quantity-stepper__input"
        aria-label={`Nombre de ${label}`}
        min={0}
        value={value}
        onChange={(event) => {
          const typed = Number.parseInt(event.target.value, 10)
          if (!Number.isNaN(typed)) onChange(typed)
        }}
      />
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label={`Ajouter un ${label}`}
        onClick={() => onChange(value + 1)}
      >
        <img src={plusButtonImage()} alt="" />
      </button>
    </span>
  )
}
