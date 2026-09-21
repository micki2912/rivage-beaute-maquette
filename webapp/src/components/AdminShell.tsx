import Link from 'next/link'
import { logout } from '@/app/admin/actions'

export default function AdminShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <Link href="/admin" className="brand-mark small">
          <img className="brand-icon" src="/logo-butterfly.png" alt="" />
          <span className="brand-text">
            Rivage <em>Beauté</em>
          </span>
        </Link>
        <div className="admin-topbar-actions">
          <Link href="/boutique" target="_blank" className="btn ghost small">
            Voir la boutique
          </Link>
          <form action={logout}>
            <button type="submit" className="btn small">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <div className="admin-content wrap">
        <h1>{title}</h1>
        {children}
      </div>
    </main>
  )
}
