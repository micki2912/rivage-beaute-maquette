import AdminShell from '@/components/AdminShell'
import ProductForm from '@/components/ProductForm'
import { getProduct, getProducts, getCategories } from '@/lib/products'
import { updateProduct } from '@/app/admin/actions'
import { notFound } from 'next/navigation'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, products] = await Promise.all([getProduct(id), getProducts()])
  if (!product) notFound()

  const categories = getCategories(products)
  const boundUpdate = updateProduct.bind(null, id)

  return (
    <AdminShell title={`Modifier « ${product.name} »`}>
      <ProductForm product={product} action={boundUpdate} submitLabel="Enregistrer" categories={categories} />
    </AdminShell>
  )
}
