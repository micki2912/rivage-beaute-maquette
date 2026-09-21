'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/CartContext'

const BOOKING_URL =
  'https://booking.localsearch.ch/bookings/institut-de-beaute-onglerie-rivage-pour-elle-lui/services?locale=fr'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, openCart } = useCart()

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
          <Link href="/#top" className="brand-mark">
            <Image className="brand-icon" src="/logo-butterfly.png" alt="" width={36} height={36} />
            <span className="brand-text">
              Rivage <em>Beauté</em>
            </span>
          </Link>
          <nav>
            <ul className="nav-links">
              <li><Link href="/#institut">Institut</Link></li>
              <li><Link href="/#pedicure">Pédicure</Link></li>
              <li><Link href="/#soins">Soins</Link></li>
              <li><Link href="/boutique">Boutique</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </nav>
          <div className="nav-cta">
            <Link href="/#contact" className="btn ghost small">Nous trouver</Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn small">
              <span className="rdv-full">Prendre rendez-vous</span>
              <span className="rdv-short">RDV</span>
            </a>
            <button className="cart-toggle" onClick={openCart} aria-label="Ouvrir le panier">
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
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-panel${menuOpen ? ' is-open' : ''}`}>
        <Link href="/#institut" onClick={() => setMenuOpen(false)}>Institut</Link>
        <Link href="/#pedicure" onClick={() => setMenuOpen(false)}>Pédicure</Link>
        <Link href="/#soins" onClick={() => setMenuOpen(false)}>Soins</Link>
        <Link href="/boutique" onClick={() => setMenuOpen(false)}>Boutique</Link>
        <Link href="/#cadeau" onClick={() => setMenuOpen(false)}>Bons cadeaux</Link>
        <Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
    </>
  )
}
