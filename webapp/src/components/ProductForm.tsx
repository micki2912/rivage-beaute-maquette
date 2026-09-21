'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/types'

type ActionState = { error?: string } | undefined

export default function ProductForm({
  product,
  action,
  submitLabel,
}: {
  product?: Product
  action: (state: ActionState, formData: FormData) => Promise<ActionState>
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [preview, setPreview] = useState<string | null>(product?.image_url ?? null)

  return (
    <form action={formAction} className="admin-form" encType="multipart/form-data">
      <div className="form-row">
        <label htmlFor="name">Nom du produit</label>
        <input id="name" name="name" type="text" required defaultValue={product?.name} />
      </div>

      <div className="form-row two-col">
        <div>
          <label htmlFor="price">Prix (CHF)</label>
          <input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={product?.price} />
        </div>
        <div>
          <label htmlFor="category">Catégorie</label>
          <input id="category" name="category" type="text" required defaultValue={product?.category ?? 'Autres'} />
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="description">Description (optionnel)</label>
        <textarea id="description" name="description" rows={3} defaultValue={product?.description ?? ''} />
      </div>

      <div className="form-row">
        <label htmlFor="image">Photo {product ? '(laisser vide pour garder la photo actuelle)' : ''}</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setPreview(URL.createObjectURL(file))
          }}
        />
        {preview && (
          <img src={preview} alt="" className="admin-image-preview" />
        )}
      </div>

      {state?.error && <p className="admin-error">{state.error}</p>}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '.5rem' }}>
        <button type="submit" className="btn" disabled={pending}>
          {pending ? 'Enregistrement…' : submitLabel}
        </button>
        <Link href="/admin" className="btn ghost">
          Annuler
        </Link>
      </div>
    </form>
  )
}
