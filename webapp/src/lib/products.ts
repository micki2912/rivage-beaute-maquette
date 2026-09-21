import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'

// Read-only, used by both the public boutique page and the admin dashboard.
// Relies on the "Products are publicly readable" RLS policy — no auth needed.
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Failed to load products:', error.message)
    return []
  }
  return data ?? []
}

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export function groupByCategory(products: Product[]) {
  const groups = new Map<string, Product[]>()
  for (const p of products) {
    if (!groups.has(p.category)) groups.set(p.category, [])
    groups.get(p.category)!.push(p)
  }
  return Array.from(groups.entries())
}
