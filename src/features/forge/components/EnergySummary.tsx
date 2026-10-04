import type { EnergyBalance } from '../domain/energy'

export function EnergySummary({ production, consumption }: EnergyBalance) {
  const remaining = production - consumption
  return (
    <section className="energy-summary">
      <h2 className="forge-panel__title">Énergie</h2>
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
