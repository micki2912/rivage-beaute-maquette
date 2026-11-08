import type { Product } from '@/lib/types'

function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Home-page product teaser: a fresh random pick on every visit, except that a
// "popular" product (if any) always takes the 2nd slot.
export function pickFeatured(products: Product[], count = 4): Product[] {
  const popular = shuffle(products.filter((p) => p.is_popular))
  if (popular.length === 0) return shuffle(products).slice(0, count)

  const star = popular[0]
  const rest = shuffle(products.filter((p) => p.id !== star.id)).slice(0, count - 1)
  rest.splice(Math.min(1, rest.length), 0, star)
  return rest
}
