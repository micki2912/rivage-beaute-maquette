'use client'

import { useCart, money } from '@/components/CartContext'

const SHOP_EMAIL = 'rivage@bluewin.ch'

const TEXT = {
  fr: {
    title: 'Votre panier', close: 'Fermer le panier', empty: 'Votre panier est vide.',
    removeOne: 'Retirer un', addOne: 'Ajouter un', remove: 'Retirer',
    deliveryTitle: 'Livraison & paiement',
    deliveryLede: "Livré à votre adresse, réglé sur facture — comme à l'institut.",
    total: 'Total', fullname: 'Nom complet', fullnamePlaceholder: 'Prénom et nom',
    phone: 'Téléphone', address: 'Adresse de livraison', addressPlaceholder: 'Rue et numéro, NPA, ville',
    submit: 'Envoyer ma demande de commande', subject: 'Commande boutique — Rivage',
    bodyIntro: 'Bonjour,\n\nJe souhaite commander :\n', bodyTotal: '\n\nTotal : ', bodyDelivery: '\n\nLivraison à :\n',
    bodyPhone: '\n\nTéléphone : ', bodyPayment: '\n\nPaiement souhaité : sur facture',
    bodyThanks: '\n\nMerci, au plaisir de vous lire.',
  },
  de: {
    title: 'Ihr Warenkorb', close: 'Warenkorb schliessen', empty: 'Ihr Warenkorb ist leer.',
    removeOne: 'Eines entfernen', addOne: 'Eines hinzufügen', remove: 'Entfernen',
    deliveryTitle: 'Lieferung & Zahlung',
    deliveryLede: 'Lieferung an Ihre Adresse, Zahlung per Rechnung — wie im Institut.',
    total: 'Total', fullname: 'Vollständiger Name', fullnamePlaceholder: 'Vorname und Name',
    phone: 'Telefon', address: 'Lieferadresse', addressPlaceholder: 'Strasse und Nummer, PLZ, Ort',
    submit: 'Bestellanfrage senden', subject: 'Shop-Bestellung — Rivage',
    bodyIntro: 'Guten Tag,\n\nIch möchte Folgendes bestellen:\n', bodyTotal: '\n\nTotal: ', bodyDelivery: '\n\nLieferung an:\n',
    bodyPhone: '\n\nTelefon: ', bodyPayment: '\n\nGewünschte Zahlungsart: Rechnung',
    bodyThanks: '\n\nHerzlichen Dank, ich freue mich auf Ihre Rückmeldung.',
  },
} as const

export default function CartDrawer({ lang = 'fr' }: { lang?: 'fr' | 'de' }) {
  const { cart, total, isOpen, closeCart, changeQty, removeItem } = useCart()
  const names = Object.keys(cart)
  const t = TEXT[lang]

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
    const plainBody =
      t.bodyIntro +
      lines.join('\n') +
      t.bodyTotal + money(total) + ' CHF' +
      t.bodyDelivery + `${fullname}\n${address}` +
      t.bodyPhone + phone +
      t.bodyPayment +
      t.bodyThanks

    window.location.href =
      'mailto:' + SHOP_EMAIL + '?subject=' + encodeURIComponent(t.subject) + '&body=' + encodeURIComponent(plainBody)
  }

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' is-open' : ''}`} onClick={closeCart} />
      <aside className={`cart-drawer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-head">
          <h3>{t.title}</h3>
          <button className="cart-close" onClick={closeCart} aria-label={t.close}>
            &times;
          </button>
        </div>
        <div className="cart-body">
          {names.length === 0 ? (
            <p className="cart-empty">{t.empty}</p>
          ) : (
            <ul className="cart-items">
              {names.map((name) => {
                const item = cart[name]
                return (
                  <li key={name} className="cart-item">
                    <span className="name">{name}</span>
                    <span className="qty">
                      <button type="button" onClick={() => changeQty(name, -1)} aria-label={t.removeOne}>
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => changeQty(name, 1)} aria-label={t.addOne}>
                        +
                      </button>
                    </span>
                    <span className="line-price">{money(item.qty * item.price)}</span>
                    <button type="button" className="remove" onClick={() => removeItem(name)}>
                      {t.remove}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-payment">
            <p className="eyebrow">{t.deliveryTitle}</p>
            <p className="lede">{t.deliveryLede}</p>
          </div>
          <div className="cart-total">
            <span>{t.total}</span>
            <span>{money(total)}</span>
          </div>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="ckFullname">{t.fullname}</label>
              <input id="ckFullname" name="fullname" type="text" required autoComplete="name" placeholder={t.fullnamePlaceholder} />
            </div>
            <div className="form-row">
              <label htmlFor="ckPhone">{t.phone}</label>
              <input id="ckPhone" name="phone" type="tel" required autoComplete="tel" placeholder="079 000 00 00" />
            </div>
            <div className="form-row">
              <label htmlFor="ckAddress">{t.address}</label>
              <textarea
                id="ckAddress"
                name="address"
                required
                rows={2}
                autoComplete="street-address"
                placeholder={t.addressPlaceholder}
              />
            </div>
            <button type="submit" className="btn" disabled={names.length === 0} style={{ width: '100%' }}>
              {t.submit}
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
