import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rivage Beauté — Institut de bien-être, Praz (Vully)',
  description:
    "Institut de bien-être à Praz, entre les lacs de Morat, Neuchâtel et Bienne. Soins du visage, manucure, pédicure, pressothérapie, sur rendez-vous.",
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
