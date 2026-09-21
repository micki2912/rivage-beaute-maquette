'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // The reset link logs the visitor into a temporary "recovery" session —
    // wait for that before showing the form, otherwise updateUser has nothing to act on.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setStatus('error')
      setError(error.message)
      return
    }
    router.push('/admin')
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
        <h1>Nouveau mot de passe</h1>

        {!ready ? (
          <p className="lede" style={{ marginTop: '.6rem' }}>
            Vérification du lien…
          </p>
        ) : (
          <>
            <p className="lede" style={{ marginTop: '.6rem' }}>
              Choisissez un nouveau mot de passe pour votre compte.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-row" style={{ marginTop: '1.6rem' }}>
                <label htmlFor="password">Nouveau mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {status === 'error' && <p className="admin-error">{error}</p>}

              <button
                type="submit"
                className="btn"
                disabled={status === 'saving'}
                style={{ width: '100%', marginTop: '.6rem' }}
              >
                {status === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
