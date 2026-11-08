const LABEL = { fr: 'Populaire', de: 'Beliebt' } as const

export default function PopularBadge({ lang = 'fr', inline = false }: { lang?: 'fr' | 'de'; inline?: boolean }) {
  return (
    <span className={`badge-popular${inline ? ' badge-inline' : ''}`}>
      <span aria-hidden="true">★</span> {LABEL[lang]}
    </span>
  )
}
