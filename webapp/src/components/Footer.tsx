import Link from 'next/link'
import Image from 'next/image'

const TEXT = {
  fr: {
    institut: 'Institut', soins: 'Soins', boutique: 'Boutique', faq: 'FAQ', contact: 'Contact',
    reviews: 'Avis Google', copyright: '© 2026 Institut Rivage, Praz', pro: 'Espace pro',
  },
  de: {
    institut: 'Institut', soins: 'Behandlungen', boutique: 'Shop', faq: 'FAQ', contact: 'Kontakt',
    reviews: 'Google-Bewertungen', copyright: '© 2026 Institut Rivage, Praz', pro: 'Profi-Bereich',
  },
} as const

export default function Footer({ lang = 'fr' }: { lang?: 'fr' | 'de' }) {
  const t = TEXT[lang]
  const prefix = lang === 'de' ? '/de' : ''

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
          <Link href={`${prefix}/#top`} className="brand-mark small">
            <Image className="brand-icon" src="/logo-butterfly.png" alt="" width={36} height={36} />
            <span className="brand-text">
              Rivage <em>Beauté</em>
            </span>
          </Link>
          <ul className="foot-links">
            <li><Link href={`${prefix}/#institut`}>{t.institut}</Link></li>
            <li><Link href={`${prefix}/#soins`}>{t.soins}</Link></li>
            <li><Link href={`${prefix}/boutique`}>{t.boutique}</Link></li>
            <li><Link href={`${prefix}/#faq`}>{t.faq}</Link></li>
            <li><Link href={`${prefix}/#contact`}>{t.contact}</Link></li>
            <li>
              <a href="https://share.google/ACTIXfR3yiheV3YTY" target="_blank" rel="noopener">
                {t.reviews}
              </a>
            </li>
          </ul>
          <p>
            {t.copyright} · <Link href="/admin">{t.pro}</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
