'use client'

import { useCart, money } from '@/components/CartContext'

const SHOP_EMAIL = 'rivage@bluewin.ch'

export default function CartDrawer() {
  const { cart, total, isOpen, closeCart, changeQty, removeItem } = useCart()
  const names = Object.keys(cart)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (names.length === 0) return
    const data = new FormData(e.currentTarget)
    const fullname = String(data.get('fullname') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const address = String(data.get('address') || '').trim()

    const lines = names.map(
      (name) => `- ${name} x${cart[name].qty} — ${money(cart[name].qty * cart[name].price)} CHF`
    )
    const body =
      'Bonjour,%0D%0A%0D%0AJe souhaite commander :%0D%0A' +
      encodeURIComponent(lines.join('\n')) +
      '%0D%0A%0D%0ATotal : ' +
      encodeURIComponent(money(total)) +
      ' CHF' +
      '%0D%0A%0D%0ALivraison à :%0D%0A' +
      encodeURIComponent(`${fullname}\n${address}`) +
      '%0D%0A%0D%0ATéléphone : ' +
      encodeURIComponent(phone) +
      '%0D%0A%0D%0APaiement souhaité : sur facture' +
      '%0D%0A%0D%0AMerci, au plaisir de vous lire.'

    window.location.href =
      'mailto:' + SHOP_EMAIL + '?subject=' + encodeURIComponent('Commande boutique — Rivage') + '&body=' + body
  }

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' is-open' : ''}`} onClick={closeCart} />
      <aside className={`cart-drawer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-head">
          <h3>Votre panier</h3>
          <button className="cart-close" onClick={closeCart} aria-label="Fermer le panier">
            &times;
          </button>
        </div>
        <div className="cart-body">
          {names.length === 0 ? (
            <p className="cart-empty">Votre panier est vide.</p>
          ) : (
            <ul className="cart-items">
              {names.map((name) => {
                const item = cart[name]
                return (
                  <li key={name} className="cart-item">
                    <span className="name">{name}</span>
                    <span className="qty">
                      <button type="button" onClick={() => changeQty(name, -1)} aria-label="Retirer un">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => changeQty(name, 1)} aria-label="Ajouter un">
                        +
                      </button>
                    </span>
                    <span className="line-price">{money(item.qty * item.price)}</span>
                    <button type="button" className="remove" onClick={() => removeItem(name)}>
                      Retirer
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-payment">
            <p className="eyebrow">Livraison &amp; paiement</p>
            <p className="lede">Livré à votre adresse, réglé sur facture — comme à l&apos;institut.</p>
          </div>
          <div className="cart-total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="ckFullname">Nom complet</label>
              <input id="ckFullname" name="fullname" type="text" required autoComplete="name" placeholder="Prénom et nom" />
            </div>
            <div className="form-row">
              <label htmlFor="ckPhone">Téléphone</label>
              <input id="ckPhone" name="phone" type="tel" required autoComplete="tel" placeholder="079 000 00 00" />
            </div>
            <div className="form-row">
              <label htmlFor="ckAddress">Adresse de livraison</label>
              <textarea
                id="ckAddress"
                name="address"
                required
                rows={2}
                autoComplete="street-address"
                placeholder="Rue et numéro, NPA, ville"
              />
            </div>
            <button type="submit" className="btn" disabled={names.length === 0} style={{ width: '100%' }}>
              Envoyer ma demande de commande
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
