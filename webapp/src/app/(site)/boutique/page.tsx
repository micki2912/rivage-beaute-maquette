import { getProducts, groupByCategory } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boutique en ligne',
  description:
    "La gamme de soins professionnels JPROSSELET utilisée à l'institut Rivage, à commander en ligne : crèmes, sérums, masques et nettoyants.",
}

export const dynamic = 'force-dynamic'

export default async function BoutiquePage() {
  const products = await getProducts()
  const grouped = groupByCategory(products)

  return (
    <>
      <section className="shop-hero">
        <div className="wrap">
          <Link href="/" className="back-link">← Retour au site</Link>
          <p className="eyebrow">Boutique en ligne</p>
          <h1>La gamme JPR/XC, en entier.</h1>
          <p className="lede">
            Le système de soin suisse utilisé à l&apos;institut, à emporter chez vous. Ajoutez vos produits au
            panier, indiquez votre adresse — réglé sur facture, comme à l&apos;institut.
          </p>
        </div>
      </section>

      {grouped.length === 0 && (
        <section className="shop-category">
          <div className="wrap">
            <p className="lede">La boutique est en cours de préparation — repassez bientôt.</p>
          </div>
        </section>
      )}

      {grouped.map(([category, items]) => (
        <section className="shop-category" key={category}>
          <div className="wrap">
            <h2>{category}</h2>
            <div className="shop-grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
