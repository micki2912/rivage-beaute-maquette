import { getProducts, groupByCategory } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: 'Online-Shop — Rivage Beauté' },
  description:
    'Die professionelle JPROSSELET-Pflegelinie des Institut Rivage, online bestellbar: Cremes, Seren, Masken und Reinigungsprodukte.',
  alternates: {
    canonical: `${SITE_URL}/de/boutique`,
    languages: { 'fr-CH': `${SITE_URL}/boutique`, 'de-CH': `${SITE_URL}/de/boutique` },
  },
}

export const dynamic = 'force-dynamic'

export default async function BoutiquePageDE() {
  const products = await getProducts()
  const grouped = groupByCategory(products)

  return (
    <>
      <section className="shop-hero">
        <div className="wrap">
          <Link href="/de" className="back-link">← Zurück zur Webseite</Link>
          <p className="eyebrow">Online-Shop</p>
          <h1>Die ganze JPR/XC-Linie.</h1>
          <p className="lede">
            Das Schweizer Pflegesystem aus dem Institut, jetzt auch für zu Hause. Legen Sie Produkte in den
            Warenkorb und geben Sie Ihre Adresse an — Zahlung per Rechnung, wie im Institut.
          </p>
        </div>
      </section>

      {grouped.length === 0 && (
        <section className="shop-category">
          <div className="wrap">
            <p className="lede">Der Shop wird gerade vorbereitet — schauen Sie bald wieder vorbei.</p>
          </div>
        </section>
      )}

      {grouped.map(([category, items]) => (
        <section className="shop-category" key={category}>
          <div className="wrap">
            <h2>{category}</h2>
            <div className="shop-grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} lang="de" />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
