import AdminShell from '@/components/AdminShell'
import ProductForm from '@/components/ProductForm'
import { createProduct } from '@/app/admin/actions'

export default function NewProductPage() {
  return (
    <AdminShell title="Ajouter un produit">
      <ProductForm action={createProduct} submitLabel="Ajouter le produit" />
    </AdminShell>
  )
}
