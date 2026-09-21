import AdminShell from '@/components/AdminShell'
import ProductForm from '@/components/ProductForm'
import { createProduct } from '@/app/admin/actions'
import { getProducts, getCategories } from '@/lib/products'

export default async function NewProductPage() {
  const categories = getCategories(await getProducts())

  return (
    <AdminShell title="Ajouter un produit">
      <ProductForm action={createProduct} submitLabel="Ajouter le produit" categories={categories} />
    </AdminShell>
  )
}
