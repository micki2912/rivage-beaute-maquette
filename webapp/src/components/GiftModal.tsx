'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/components/CartContext'

const PRESETS = [50, 100, 150, 200]

export default function GiftModal() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(50)
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCart()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function handleOpen() {
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function handleAdd() {
    if (!amount || amount <= 0) {
      inputRef.current?.focus()
      return
    }
    addItem(`Bon cadeau — CHF ${Math.round(amount)}`, Math.round(amount))
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setOpen(false)
      openCart()
    }, 700)
  }

  return (
    <>
      <button type="button" className="btn" onClick={handleOpen}>
        Offrir un bon cadeau
      </button>

      <div className={`gift-modal-overlay${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} />
      <div className={`gift-modal${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <button type="button" className="gift-modal-close" onClick={() => setOpen(false)} aria-label="Fermer">
          &times;
        </button>
        <p className="eyebrow">Bon cadeau</p>
        <h3>Quel montant ?</h3>
        <p className="lede">Choisissez un montant, ou indiquez le vôtre.</p>
        <div className="gift-presets">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              className={`gift-preset${amount === p ? ' is-active' : ''}`}
              onClick={() => setAmount(p)}
            >
              {p}.–
            </button>
          ))}
        </div>
        <div className="gift-custom">
          <label htmlFor="giftAmount">Ou un autre montant (CHF)</label>
          <input
            ref={inputRef}
            id="giftAmount"
            type="number"
            min={10}
            step={5}
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        <button type="button" className={`btn${added ? ' is-added' : ''}`} onClick={handleAdd} style={{ width: '100%' }}>
          {added ? 'Ajouté ✓' : 'Ajouter au panier'}
        </button>
      </div>
    </>
  )
}
