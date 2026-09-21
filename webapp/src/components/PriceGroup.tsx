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

export default function PriceGroup({
  title,
  visible,
  extra,
}: {
  title: string
  visible: React.ReactNode
  extra: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="menu-group">
      <h3>{title}</h3>
      {visible}
      <div className="menu-extra" hidden={!open}>
        {extra}
      </div>
      <button type="button" className={`menu-more${open ? ' is-open' : ''}`} onClick={() => setOpen((v) => !v)}>
        {open ? 'Voir moins' : 'Voir plus'}
      </button>
    </div>
  )
}
