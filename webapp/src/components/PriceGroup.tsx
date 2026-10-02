'use client'

import { useState } from 'react'

export function PriceRow({ name, note, price }: { name: string; note?: string; price: string }) {
  return (
    <div className="menu-row">
      <span className="name">
        {name}
        {note && <small>{note}</small>}
      </span>
      <span className="fill" />
      <span className="price">{price}</span>
    </div>
  )
}

const TEXT = { fr: { less: 'Voir moins', more: 'Voir plus' }, de: { less: 'Weniger anzeigen', more: 'Mehr anzeigen' } } as const

export default function PriceGroup({
  title,
  visible,
  extra,
  lang = 'fr',
}: {
  title: string
  visible: React.ReactNode
  extra: React.ReactNode
  lang?: 'fr' | 'de'
}) {
  const [open, setOpen] = useState(false)
  const t = TEXT[lang]

  return (
    <div className="menu-group">
      <h3>{title}</h3>
      {visible}
      <div className="menu-extra" hidden={!open}>
        {extra}
      </div>
      <button type="button" className={`menu-more${open ? ' is-open' : ''}`} onClick={() => setOpen((v) => !v)}>
        {open ? t.less : t.more}
      </button>
    </div>
  )
}
