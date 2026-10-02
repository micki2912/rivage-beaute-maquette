'use client'

import { useState } from 'react'
import { useCart } from '@/components/CartContext'

const TEXT = { fr: { added: 'Ajouté ✓', add: 'Ajouter' }, de: { added: 'Hinzugefügt ✓', add: 'Hinzufügen' } } as const

export default function AddToCartButton({
  name,
  price,
  lang = 'fr',
}: {
  name: string
  price: number
  lang?: 'fr' | 'de'
}) {
  const { addItem, openCart } = useCart()
  const [added, setAdded] = useState(false)
  const t = TEXT[lang]

  return (
    <button
      type="button"
      className={`btn small add-to-cart${added ? ' is-added' : ''}`}
      onClick={() => {
        addItem(name, price)
        openCart()
        setAdded(true)
        setTimeout(() => setAdded(false), 1400)
      }}
    >
      {added ? t.added : t.add}
    </button>
  )
}
