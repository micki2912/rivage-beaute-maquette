import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import ProductDetails from '@/components/ProductDetails'
import type { Product } from '@/lib/types'

export default function ProductCard({ product, lang = 'fr' }: { product: Product; lang?: 'fr' | 'de' }) {
  const description = (lang === 'de' ? product.description_de : product.description)?.trim()

  return (
    <div className="shop-card">
      {product.image_url ? (
        <div className="shop-swatch shop-swatch-photo">
          <Image
            src={product.image_url}
            alt=""
            fill
            sizes="(max-width: 520px) 50vw, (max-width: 900px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div className="shop-swatch" />
      )}
      <h3>{product.name}</h3>
      {description && (
        <ProductDetails
          name={product.name}
          price={product.price}
          imageUrl={product.image_url}
          description={description}
          lang={lang}
        />
      )}
      <div className="shop-row">
        <p className="shop-price">CHF {product.price.toFixed(2)}</p>
        <AddToCartButton name={product.name} price={product.price} lang={lang} />
      </div>
    </div>
  )
}
