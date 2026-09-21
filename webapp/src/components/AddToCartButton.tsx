'use client'

import { useState } from 'react'
import { useCart } from '@/components/CartContext'

export default function AddToCartButton({ name, price }: { name: string; price: number }) {
  const { addItem, openCart } = useCart()
  const [added, setAdded] = useState(false)

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
      {added ? 'Ajouté ✓' : 'Ajouter'}
    </button>
  )
}
