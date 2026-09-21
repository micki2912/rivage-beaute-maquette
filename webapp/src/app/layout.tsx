import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const title = 'Rivage Beauté — Institut de bien-être, Praz (Vully)'
const description =
  "Institut de bien-être à Praz, entre les lacs de Morat, Neuchâtel et Bienne. Soins du visage, manucure, pédicure, pressothérapie, sur rendez-vous."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: '%s — Rivage Beauté',
  },
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: 'Rivage Beauté',
    images: [{ url: '/video-poster.jpg', width: 640, height: 386, alt: 'Institut Rivage Beauté, à Praz' }],
    locale: 'fr_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/video-poster.jpg'],
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
