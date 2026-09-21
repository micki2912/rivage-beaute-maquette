import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="wrap" style={{ flexDirection: 'column' }}>
        <div
          className="wrap"
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Link href="/#top" className="brand-mark small">
            <Image className="brand-icon" src="/logo-butterfly.png" alt="" width={36} height={36} />
            <span className="brand-text">
              Rivage <em>Beauté</em>
            </span>
          </Link>
          <ul className="foot-links">
            <li><Link href="/#institut">Institut</Link></li>
            <li><Link href="/#soins">Soins</Link></li>
            <li><Link href="/boutique">Boutique</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
          <p>
            © 2026 Institut Rivage, Praz · <Link href="/admin">Espace pro</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
