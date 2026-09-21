'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })
    setStatus(error ? 'error' : 'sent')
  }

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <Link href="/" className="brand-mark" style={{ marginBottom: '1.5rem' }}>
          <Image className="brand-icon" src="/logo-butterfly.png" alt="" width={36} height={36} />
          <span className="brand-text">
            Rivage <em>Beauté</em>
          </span>
        </Link>
        <p className="eyebrow">Espace pro</p>
        <h1>Mot de passe oublié</h1>

        {status === 'sent' ? (
          <p className="lede" style={{ marginTop: '.6rem' }}>
            Si un compte existe pour cette adresse, un e-mail vient de vous être envoyé avec un lien pour
            choisir un nouveau mot de passe.
          </p>
        ) : (
          <>
            <p className="lede" style={{ marginTop: '.6rem' }}>
              Indiquez votre e-mail : nous vous envoyons un lien pour définir un nouveau mot de passe.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-row" style={{ marginTop: '1.6rem' }}>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {status === 'error' && (
                <p className="admin-error">Une erreur est survenue. Réessayez dans un instant.</p>
              )}

              <button
                type="submit"
                className="btn"
                disabled={status === 'sending'}
                style={{ width: '100%', marginTop: '.6rem' }}
              >
                {status === 'sending' ? 'Envoi…' : 'Envoyer le lien'}
              </button>
            </form>
          </>
        )}

        <Link href="/admin/login" className="admin-forgot-link">
          ← Retour à la connexion
        </Link>
      </div>
    </main>
  )
}
