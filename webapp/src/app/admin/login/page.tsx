'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { login } from '@/app/admin/actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <main className="admin-login">
      <form action={action} className="admin-login-card">
        <Link href="/" className="brand-mark" style={{ marginBottom: '1.5rem' }}>
          <Image className="brand-icon" src="/logo-butterfly.png" alt="" width={36} height={36} />
          <span className="brand-text">
            Rivage <em>Beauté</em>
          </span>
        </Link>
        <p className="eyebrow">Espace pro</p>
        <h1>Gérer la boutique</h1>
        <p className="lede" style={{ marginTop: '.6rem' }}>
          Connectez-vous pour ajouter, modifier ou retirer des produits.
        </p>

        <div className="form-row" style={{ marginTop: '1.6rem' }}>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="form-row">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>

        {state?.error && <p className="admin-error">{state.error}</p>}

        <button type="submit" className="btn" disabled={pending} style={{ width: '100%', marginTop: '.6rem' }}>
          {pending ? 'Connexion…' : 'Se connecter'}
        </button>

        <Link href="/admin/forgot-password" className="admin-forgot-link">
          Mot de passe oublié ?
        </Link>
      </form>
    </main>
  )
}
