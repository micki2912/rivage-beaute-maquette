import { CartProvider } from '@/components/CartContext'
import CartDrawer from '@/components/CartDrawer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SeasonBanner from '@/components/SeasonBanner'

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="de">
      <CartProvider>
        <SeasonBanner lang="de" />
        <Header lang="de" />
        <main id="top">{children}</main>
        <Footer lang="de" />
        <CartDrawer lang="de" />
      </CartProvider>
    </div>
  )
}
