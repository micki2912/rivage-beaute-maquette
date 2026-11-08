export type Product = {
  id: string
  name: string
  price: number
  category: string
  description: string | null
  description_de: string | null
  is_popular: boolean
  image_url: string | null
  sort_order: number
  created_at: string
  updated_at: string
}
