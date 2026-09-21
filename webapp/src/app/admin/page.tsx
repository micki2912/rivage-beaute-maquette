import AdminShell from '@/components/AdminShell'
import { getProducts, groupByCategory } from '@/lib/products'
import { deleteProduct } from '@/app/admin/actions'
import DeleteProductButton from '@/components/DeleteProductButton'
import Link from 'next/link'
import Image from 'next/image'

export default async function AdminDashboard() {
  const products = await getProducts()
  const grouped = groupByCategory(products)

  return (
    <AdminShell title="La boutique">
      <div className="admin-dashboard-head">
        <p className="lede">
          {products.length} produit{products.length !== 1 ? 's' : ''} en ligne.
        </p>
        <Link href="/admin/products/new" className="btn">
          + Ajouter un produit
        </Link>
      </div>

      {grouped.length === 0 && (
        <p className="lede" style={{ marginTop: '2rem' }}>
          Aucun produit pour l&apos;instant — commencez par en ajouter un.
        </p>
      )}

      {grouped.map(([category, items]) => (
        <div key={category} className="admin-category">
          <h2>{category}</h2>
          <div className="admin-product-list">
            {items.map((p) => (
              <div key={p.id} className="admin-product-row">
                <div className="admin-product-thumb">
                  {p.image_url ? (
                    <Image src={p.image_url} alt="" width={52} height={52} style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className="admin-product-thumb-empty" />
                  )}
                </div>
                <div className="admin-product-info">
                  <p className="admin-product-name">{p.name}</p>
                  <p className="admin-product-price">CHF {p.price.toFixed(2)}</p>
                </div>
                <div className="admin-product-actions">
                  <Link href={`/admin/products/${p.id}/edit`} className="btn ghost small">
                    Modifier
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="imageUrl" value={p.image_url ?? ''} />
                    <DeleteProductButton name={p.name} />
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </AdminShell>
  )
}
