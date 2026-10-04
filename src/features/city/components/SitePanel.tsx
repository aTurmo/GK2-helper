import type { Site, SiteOption } from '../domain/types'
import { optionImage } from '../images'

type SitePanelProps = {
  site: Site
  options: readonly SiteOption[]
  isDone: boolean
  onToggleDone: () => void
  onAdd: (option: SiteOption) => void
}

export function SitePanel({ site, options, isDone, onToggleDone, onAdd }: SitePanelProps) {
  return (
    <section className="site-panel">
      <header className="site-panel__header">
        <h2 className="site-panel__title">
          {site.number} · {site.name}
        </h2>
        <label className="site-panel__done">
          <input type="checkbox" checked={isDone} onChange={onToggleDone} />
          Construit
        </label>
      </header>
      <ul className="site-panel__options">
        {options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              className="site-panel__option"
              title={`Ajouter ${option.name}`}
              onClick={() => onAdd(option)}
            >
              <img src={optionImage(option.id)} alt={option.name} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
