import AdminShell from '@/components/AdminShell'
import ProductForm from '@/components/ProductForm'
import { getProduct } from '@/lib/products'
import { updateProduct } from '@/app/admin/actions'
import { notFound } from 'next/navigation'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) notFound()

  const boundUpdate = updateProduct.bind(null, id)

  return (
    <AdminShell title={`Modifier « ${product.name} »`}>
      <ProductForm product={product} action={boundUpdate} submitLabel="Enregistrer" />
    </AdminShell>
  )
}
