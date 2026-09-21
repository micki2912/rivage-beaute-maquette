'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type CartItem = { price: number; qty: number }
type Cart = Record<string, CartItem>

type CartContextValue = {
  cart: Cart
  count: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (name: string, price: number) => void
  changeQty: (name: string, delta: number) => void
  removeItem: (name: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'rivage-cart-v1'

export function money(n: number) {
  return n.toFixed(2).replace('.00', '') + '.–'
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({})
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Reading localStorage can only happen after mount (it doesn't exist during
    // server rendering), so syncing it into state here — once, on mount — is correct.
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setCart(JSON.parse(raw))
    } catch {}
  }, [])

  const addItem = useCallback(
    (name: string, price: number) => {
      setCart((prev) => {
        const next = { ...prev, [name]: { price, qty: (prev[name]?.qty ?? 0) + 1 } }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {}
        return next
      })
    },
    []
  )

  const changeQty = useCallback((name: string, delta: number) => {
    setCart((prev) => {
      const item = prev[name]
      if (!item) return prev
      const nextQty = item.qty + delta
      const next = { ...prev }
      if (nextQty <= 0) delete next[name]
      else next[name] = { ...item, qty: nextQty }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const removeItem = useCallback(
    (name: string) => {
      setCart((prev) => {
        const next = { ...prev }
        delete next[name]
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {}
        return next
      })
    },
    []
  )

  const count = useMemo(() => Object.values(cart).reduce((n, i) => n + i.qty, 0), [cart])
  const total = useMemo(
    () => Object.values(cart).reduce((n, i) => n + i.qty * i.price, 0),
    [cart]
  )

  const value: CartContextValue = {
    cart,
    count,
    total,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    changeQty,
    removeItem,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
