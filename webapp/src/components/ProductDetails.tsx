'use client'

import { useRef } from 'react'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'

const TEXT = {
  fr: { more: 'Détails', close: 'Fermer' },
  de: { more: 'Details', close: 'Schliessen' },
} as const

// Descriptions come from the admin as plain text, one paragraph per line.
// A short first line without final punctuation is shown as a subtitle.
function parse(description: string) {
  const lines = description
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
  const hasSubtitle = lines.length > 1 && lines[0].length <= 90 && !/[.!?:]$/.test(lines[0])
  return { subtitle: hasSubtitle ? lines[0] : null, paragraphs: hasSubtitle ? lines.slice(1) : lines }
}

export default function ProductDetails({
  name,
  price,
  imageUrl,
  description,
  lang = 'fr',
}: {
  name: string
  price: number
  imageUrl: string | null
  description: string
  lang?: 'fr' | 'de'
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const t = TEXT[lang]
  const { subtitle, paragraphs } = parse(description)

  return (
    <>
      <button type="button" className="shop-more" onClick={() => dialogRef.current?.showModal()}>
        {t.more}
      </button>
      <dialog
        ref={dialogRef}
        className="product-dialog"
        aria-label={name}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        <button type="button" className="product-dialog-close" onClick={() => dialogRef.current?.close()} aria-label={t.close}>
          &times;
        </button>
        <div className="product-dialog-body">
          <div className={`product-dialog-media${imageUrl ? '' : ' shop-swatch'}`}>
            {imageUrl && (
              <Image src={imageUrl} alt="" fill sizes="(max-width: 640px) 80vw, 320px" style={{ objectFit: 'contain' }} />
            )}
          </div>
          <div className="product-dialog-text">
            <h3>{name}</h3>
            <p className="shop-price">CHF {price.toFixed(2)}</p>
            {subtitle && <p className="product-dialog-subtitle">{subtitle}</p>}
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <AddToCartButton name={name} price={price} lang={lang} onAdd={() => dialogRef.current?.close()} />
          </div>
        </div>
      </dialog>
    </>
  )
}
