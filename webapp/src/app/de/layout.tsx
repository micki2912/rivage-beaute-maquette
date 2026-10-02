import { CartProvider } from '@/components/CartContext'
import CartDrawer from '@/components/CartDrawer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="de">
      <CartProvider>
        <Header lang="de" />
        <main id="top">{children}</main>
        <Footer lang="de" />
        <CartDrawer lang="de" />
      </CartProvider>
    </div>
  )
}
