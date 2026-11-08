import Link from 'next/link'

const TEXT = {
  fr: { text: 'Pour Noël, offrez un bon cadeau — montant libre.', link: 'Découvrir', href: '/#cadeau' },
  de: { text: 'Zu Weihnachten: Geschenkgutschein mit frei wählbarem Betrag.', link: 'Entdecken', href: '/de#cadeau' },
} as const

// Seasonal note, shown automatically from 1 November to 24 December (no countdown, no fake urgency).
export default function SeasonBanner({ lang = 'fr' }: { lang?: 'fr' | 'de' }) {
  const now = new Date()
  const month = now.getMonth() // 0 = January
  const inSeason = month === 10 || (month === 11 && now.getDate() <= 24)
  if (!inSeason) return null

  const t = TEXT[lang]
  return (
    <div className="season-banner">
      <span>{t.text}</span>{' '}
      <Link href={t.href}>{t.link}</Link>
    </div>
  )
}
