import AddToCartButton from '@/components/AddToCartButton'
import type { Product } from '@/lib/types'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="shop-card">
      {product.image_url ? (
        <div className="shop-swatch shop-swatch-photo">
          <img src={product.image_url} alt="" />
        </div>
      ) : (
        <div className="shop-swatch" />
      )}
      <h3>{product.name}</h3>
      <div className="shop-row">
        <p className="shop-price">CHF {product.price.toFixed(2)}</p>
        <AddToCartButton name={product.name} price={product.price} />
      </div>
    </div>
  )
}
