import Link from 'next/link'
import Image from 'next/image'
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
          <Image className="brand-icon" src="/logo-butterfly.png" alt="" width={36} height={36} />
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
