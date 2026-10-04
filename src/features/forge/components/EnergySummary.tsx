import { QuantityStepper } from '../../material-planner/QuantityStepper'
import type { EnergyBalance } from '../domain/energy'
import { elementImage } from '../images'

type EnergySummaryProps = EnergyBalance & {
  zombieCount: number
  onChangeZombieCount: (zombieCount: number) => void
}

export function EnergySummary({
  production,
  consumption,
  zombieCount,
  onChangeZombieCount,
}: EnergySummaryProps) {
  const remaining = production - consumption
  return (
    <section className="energy-summary">
      <h2 className="forge-panel__title">Énergie</h2>
      <div className="energy-summary__zombies">
        <img src={elementImage('carrousel-a-zombies')} alt="" className="energy-summary__icon" />
        <span>Zombies au carrousel</span>
        <QuantityStepper label="zombie" value={zombieCount} onChange={onChangeZombieCount} />
      </div>
      <dl className="energy-summary__values">
        <dt>Production</dt>
        <dd>⚙ {production}</dd>
        <dt>Consommation</dt>
        <dd>⚙ {consumption}</dd>
        <dt>Reste</dt>
        <dd className="energy-summary__remaining" data-negative={remaining < 0}>
          ⚙ {remaining}
        </dd>
      </dl>
    </section>
  )
}
