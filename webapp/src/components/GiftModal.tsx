'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/components/CartContext'

const PRESETS = [50, 100, 150, 200]

const TEXT = {
  fr: {
    cta: 'Offrir un bon cadeau', close: 'Fermer', eyebrow: 'Bon cadeau', title: 'Quel montant ?',
    lede: 'Choisissez un montant, ou indiquez le vôtre.', customLabel: 'Ou un autre montant (CHF)',
    added: 'Ajouté ✓', add: 'Ajouter au panier', itemName: (n: number) => `Bon cadeau — CHF ${n}`,
  },
  de: {
    cta: 'Gutschein verschenken', close: 'Schliessen', eyebrow: 'Geschenkgutschein', title: 'Welcher Betrag?',
    lede: 'Wählen Sie einen Betrag, oder geben Sie Ihren eigenen ein.', customLabel: 'Oder ein anderer Betrag (CHF)',
    added: 'Hinzugefügt ✓', add: 'In den Warenkorb', itemName: (n: number) => `Geschenkgutschein — CHF ${n}`,
  },
} as const

export default function GiftModal({ lang = 'fr' }: { lang?: 'fr' | 'de' }) {
  const t = TEXT[lang]
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
    addItem(t.itemName(Math.round(amount)), Math.round(amount))
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
        {t.cta}
      </button>

      <div className={`gift-modal-overlay${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} />
      <div className={`gift-modal${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <button type="button" className="gift-modal-close" onClick={() => setOpen(false)} aria-label={t.close}>
          &times;
        </button>
        <p className="eyebrow">{t.eyebrow}</p>
        <h3>{t.title}</h3>
        <p className="lede">{t.lede}</p>
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
          <label htmlFor="giftAmount">{t.customLabel}</label>
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
          {added ? t.added : t.add}
        </button>
      </div>
    </>
  )
}
