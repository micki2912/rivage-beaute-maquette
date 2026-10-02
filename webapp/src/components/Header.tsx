'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/components/CartContext'

const BOOKING_URL_FR =
  'https://booking.localsearch.ch/bookings/institut-de-beaute-onglerie-rivage-pour-elle-lui/services?locale=fr'
const BOOKING_URL_DE =
  'https://booking.localsearch.ch/bookings/institut-de-beaute-onglerie-rivage-pour-elle-lui/services?locale=de'

const TEXT = {
  fr: {
    institut: 'Institut', pedicure: 'Pédicure', soins: 'Soins', boutique: 'Boutique', contact: 'Contact',
    find: 'Nous trouver', rdvFull: 'Prendre rendez-vous', rdvShort: 'RDV', cart: 'Ouvrir le panier',
    menu: 'Ouvrir le menu', gift: 'Bons cadeaux', faq: 'FAQ',
  },
  de: {
    institut: 'Institut', pedicure: 'Pediküre', soins: 'Behandlungen', boutique: 'Shop', contact: 'Kontakt',
    find: 'So finden Sie uns', rdvFull: 'Termin buchen', rdvShort: 'Termin', cart: 'Warenkorb öffnen',
    menu: 'Menü öffnen', gift: 'Gutscheine', faq: 'FAQ',
  },
} as const

export default function Header({ lang = 'fr' }: { lang?: 'fr' | 'de' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, openCart } = useCart()
  const pathname = usePathname()
  const t = TEXT[lang]
  const prefix = lang === 'de' ? '/de' : ''
  const bookingUrl = lang === 'de' ? BOOKING_URL_DE : BOOKING_URL_FR
  const otherLangHref =
    lang === 'de'
      ? pathname.startsWith('/de/boutique') ? '/boutique' : '/'
      : pathname.startsWith('/boutique') ? '/de/boutique' : '/de'

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`} id="siteNav">
        <div className="wrap">
          <Link href={`${prefix}/#top`} className="brand-mark">
            <Image className="brand-icon" src="/logo-butterfly.png" alt="" width={36} height={36} />
            <span className="brand-text">
              Rivage <em>Beauté</em>
            </span>
          </Link>
          <nav>
            <ul className="nav-links">
              <li><Link href={`${prefix}/#institut`}>{t.institut}</Link></li>
              <li><Link href={`${prefix}/#pedicure`}>{t.pedicure}</Link></li>
              <li><Link href={`${prefix}/#soins`}>{t.soins}</Link></li>
              <li><Link href={`${prefix}/boutique`}>{t.boutique}</Link></li>
              <li><Link href={`${prefix}/#contact`}>{t.contact}</Link></li>
            </ul>
          </nav>
          <div className="nav-cta">
            <Link href={otherLangHref} className="lang-switch" hrefLang={lang === 'de' ? 'fr' : 'de'}>
              {lang === 'de' ? 'FR' : 'DE'}
            </Link>
            <Link href={`${prefix}/#contact`} className="btn ghost small">{t.find}</Link>
            <a href={bookingUrl} target="_blank" rel="noopener" className="btn small">
              <span className="rdv-full">{t.rdvFull}</span>
              <span className="rdv-short">{t.rdvShort}</span>
            </a>
            <button className="cart-toggle" onClick={openCart} aria-label={t.cart}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
                <circle cx="9.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
                <circle cx="17.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
              </svg>
              <span className="cart-count" hidden={count === 0}>{count}</span>
            </button>
            <button
              className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={t.menu}
              aria-expanded={menuOpen}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-panel${menuOpen ? ' is-open' : ''}`}>
        <Link href={`${prefix}/#institut`} onClick={() => setMenuOpen(false)}>{t.institut}</Link>
        <Link href={`${prefix}/#pedicure`} onClick={() => setMenuOpen(false)}>{t.pedicure}</Link>
        <Link href={`${prefix}/#soins`} onClick={() => setMenuOpen(false)}>{t.soins}</Link>
        <Link href={`${prefix}/boutique`} onClick={() => setMenuOpen(false)}>{t.boutique}</Link>
        <Link href={`${prefix}/#cadeau`} onClick={() => setMenuOpen(false)}>{t.gift}</Link>
        <Link href={`${prefix}/#faq`} onClick={() => setMenuOpen(false)}>{t.faq}</Link>
        <Link href={`${prefix}/#contact`} onClick={() => setMenuOpen(false)}>{t.contact}</Link>
      </div>
    </>
  )
}
