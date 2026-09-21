import { CartProvider } from '@/components/CartContext'
import CartDrawer from '@/components/CartDrawer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main id="top">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
