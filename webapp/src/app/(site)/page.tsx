import PriceGroup, { PriceRow } from '@/components/PriceGroup'
import GiftModal from '@/components/GiftModal'
import ProductCard from '@/components/ProductCard'
import WaveDivider from '@/components/WaveDivider'
import Image from 'next/image'
import { getProducts } from '@/lib/products'
import type { Product } from '@/lib/types'
import { SITE_URL } from '@/lib/site'

const BOOKING_URL =
  'https://booking.localsearch.ch/bookings/institut-de-beaute-onglerie-rivage-pour-elle-lui/services?locale=fr'

// Schema.org structured data — helps Google understand this as a local beauty
// institute (name, address, phone) for local search / Maps results.
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Institut Rivage',
  image: `${SITE_URL}/video-poster.jpg`,
  url: SITE_URL,
  telephone: '+41798382223',
  email: 'rivage@bluewin.ch',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Route principale 140a',
    postalCode: '1788',
    addressLocality: 'Praz (Vully)',
    addressCountry: 'CH',
  },
  priceRange: 'CHF',
}

// New pick of products on every visit/refresh, rather than a cached static page.
export const dynamic = 'force-dynamic'

function pickRandom(products: Product[], count: number) {
  const shuffled = [...products].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default async function HomePage() {
  const products = await getProducts()
  const featured = pickRandom(products, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">Institut de bien-être — Praz, Vully</p>
            <h1>
              Entre trois lacs,
              <br />
              un instant rien qu&apos;à <em>vous</em>.
            </h1>
            <p className="lede">
              Soins du visage, manucure, pédicure et drainage lymphatique, dans un institut à taille humaine.
              Béatrice Eichenberger vous reçoit sur rendez-vous, avec trente-trois ans d&apos;expérience et une
              attention qui ne se presse jamais.
            </p>
            <div className="hero-ctas">
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn">
                Prendre rendez-vous
              </a>
              <a href="#soins" className="btn ghost">
                Découvrir les soins
              </a>
            </div>
            <div className="hero-facts">
              <div className="hero-fact"><b>33 ans</b><span>d&apos;expérience</span></div>
              <div className="hero-fact"><b>1788</b><span>Praz, Vully</span></div>
              <div className="hero-fact"><b>Sur RDV</b><span>tél. &amp; WhatsApp</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <video className="hero-video" autoPlay muted loop playsInline poster="/video-poster.jpg">
              <source src="/rivage-story.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <WaveDivider />

      <section className="about" id="institut">
        <div className="wrap">
          <div className="about-portrait">
            <Image
              src="/beatrice.jpg"
              alt="Béatrice Eichenberger devant l'institut Rivage, à Praz"
              fill
              sizes="(max-width: 900px) 90vw, 40vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div className="cap"><span>Béatrice Eichenberger</span></div>
          </div>
          <div>
            <p className="eyebrow">L&apos;institut</p>
            <h2>Un rivage, une main sûre.</h2>
            <p className="quote">« Chaque soin commence par une écoute — le reste suit tout seul. »</p>
            <p className="lede">
              Esthéticienne et pédicure certifiée, Béatrice a fondé Rivage à Praz, un village niché entre les
              lacs de Morat, Neuchâtel et Bienne. Ici, pas de chaîne, pas de créneau minuté : un institut pensé
              pour recevoir une personne à la fois, avec des produits professionnels choisis pour durer.
            </p>
            <div className="facts-row">
              <div>
                <p className="eyebrow">Expérience</p>
                <p>Plus de trente-trois ans de pratique en soins esthétiques et pédicure médicale.</p>
              </div>
              <div>
                <p className="eyebrow">Produits</p>
                <p>Gammes suisses et professionnelles : JPROSSELET, Artepil, Stagecolor, OPI.</p>
              </div>
              <div>
                <p className="eyebrow">Rythme</p>
                <p>Uniquement sur rendez-vous — par téléphone ou WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pedicure">
        <div className="wrap">
          <div className="feature reverse">
            <div>
              <p className="eyebrow">Pédicure</p>
              <h2>Le soin des pieds, par une vraie pédicure diplômée.</h2>
              <p>
                Une pédicure diplômée va au-delà du vernis : durillons, cors, ongles incarnés — un vrai soin
                technique et précis, pensé pour des pieds qui portent le poids de toute une journée, pas
                seulement pour la couleur.
              </p>
            </div>
            <div className="feature-price">
              <div className="row"><span>Pédicure simple</span><span className="price">75.–</span></div>
              <div className="row"><span>Pédicure &amp; vernis semi-permanent</span><span className="price highlight">90.–</span></div>
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn light">Prendre rendez-vous</a>
            </div>
          </div>
        </div>
      </section>

      <section id="soins">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Les soins</p>
              <h2>Une carte, comme au bord de l&apos;eau.</h2>
            </div>
            <p className="lede">
              Des tarifs clairs, des soins choisis avec soin — du visage aux mains, en passant par
              l&apos;épilation à la cire chaude.
            </p>
          </div>

          <div className="menu-cols">
            <div>
              <PriceGroup
                title="Visage & regard"
                visible={
                  <>
                    <PriceRow name="Soin du visage complet" note="Nettoyage, gommage, massage, masque" price="145.–" />
                    <PriceRow name="Soin du visage sans massage" price="100.–" />
                  </>
                }
                extra={
                  <>
                    <PriceRow name="Teinture de cils" price="30.–" />
                    <PriceRow name="Teinture de sourcils" price="20.–" />
                    <PriceRow name="Épilation des sourcils" price="dès 25.–" />
                  </>
                }
              />
              <PriceGroup
                title="Manucure"
                visible={
                  <>
                    <PriceRow name="Manucure simple" price="45.–" />
                    <PriceRow name="Manucure & pose de vernis" price="55.–" />
                  </>
                }
                extra={
                  <>
                    <PriceRow name="Manucure & vernis semi-permanent" price="70.–" />
                    <PriceRow name="Pose de gel complète" price="100.–" />
                  </>
                }
              />
            </div>
            <div>
              <PriceGroup
                title="Pédicure"
                visible={
                  <>
                    <PriceRow name="Pédicure simple" price="75.–" />
                    <PriceRow name="Pédicure & pose de vernis" price="85.–" />
                  </>
                }
                extra={
                  <>
                    <PriceRow name="Pédicure & vernis semi-permanent" price="90.–" />
                    <PriceRow name="Vernis semi-permanent seul" price="45.–" />
                  </>
                }
              />
              <PriceGroup
                title="Épilation à la cire chaude"
                visible={
                  <>
                    <PriceRow name="Demi-jambes" price="50.–" />
                    <PriceRow name="Jambes complètes" price="90.–" />
                  </>
                }
                extra={
                  <>
                    <PriceRow name="Jambes, maillot & aisselles" price="120.–" />
                    <PriceRow name="Bras" price="30.–" />
                    <PriceRow name="Aisselles" price="25.–" />
                    <PriceRow name="Maillot" price="30.–" />
                    <PriceRow name="Maillot brésilien" price="50.–" />
                    <PriceRow name="Lèvre supérieure" price="20.–" />
                    <PriceRow name="Visage complet" price="50.–" />
                    <PriceRow name="Dos, épaules & torse (homme)" price="sur devis" />
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section id="pressotherapie">
        <div className="wrap">
          <div className="feature">
            <div>
              <p className="eyebrow">Pressothérapie</p>
              <h2>Le drainage lymphatique, sans effort.</h2>
              <p>
                Une pression douce et rythmée, exercée par manchons sur les jambes, relance la circulation et
                allège les sensations de jambes lourdes. Quarante-cinq minutes suffisent pour ressentir la
                différence — en cure, l&apos;effet se prolonge.
              </p>
            </div>
            <div className="feature-price">
              <div className="row"><span>Séance de 45 minutes</span><span className="price">70.–</span></div>
              <div className="row"><span>Cure de 8 séances<br /><small>1ère séance offerte</small></span><span className="price highlight">480.–</span></div>
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn light">Prendre rendez-vous</a>
            </div>
          </div>
        </div>
      </section>

      <section id="produits">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Produits</p>
              <h2>Des marques choisies, pas empilées.</h2>
            </div>
            <p className="lede">
              Depuis plusieurs années, Rivage travaille avec un nombre restreint de marques professionnelles,
              sélectionnées pour leur tenue autant que pour leur toucher.
            </p>
          </div>
          <div className="brand-list">
            <div className="brand-row">
              <h3>JPROSSELET</h3>
              <p className="desc-full">Système de soins suisse, formulé pour s&apos;adapter à chaque type de peau — la base des soins du visage chez Rivage.</p>
              <p className="desc-short">Système de soins suisse, pour chaque type de peau.</p>
            </div>
            <div className="brand-row">
              <h3>Artepil</h3>
              <p className="desc-full">Cires et soins dédiés à l&apos;épilation, pensés pour limiter les irritations sur peaux sensibles.</p>
              <p className="desc-short">Cires et soins épilation, douces pour peaux sensibles.</p>
            </div>
            <div className="brand-row">
              <h3>Stagecolor</h3>
              <p className="desc-full">Maquillage et couleur, pour prolonger l&apos;effet d&apos;un soin bien après le rendez-vous.</p>
              <p className="desc-short">Maquillage et couleur, effet longue durée.</p>
            </div>
            <div className="brand-row">
              <h3>OPI</h3>
              <p className="desc-full">Vernis et soins des ongles, pour les manucures et pédicures avec ou sans couleur.</p>
              <p className="desc-short">Vernis et soins des ongles, avec ou sans couleur.</p>
            </div>
            <div className="brand-row">
              <h3>Forever Aloe</h3>
              <p className="desc-full">Soins du corps et compléments à l&apos;aloe vera, pour prolonger le bien-être au-delà de l&apos;institut.</p>
              <p className="desc-short">Soins du corps et compléments à l&apos;aloe vera.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="boutique">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Boutique en ligne</p>
              <h2>La gamme JPR/XC, à emporter.</h2>
            </div>
            <p className="lede">
              Composez votre panier, envoyez votre demande — réglez comme d&apos;habitude, par TWINT ou sur
              facture.
            </p>
          </div>
          {featured.length > 0 && (
            <div className="shop-grid shop-grid-teaser">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
          <div className="shop-cta">
            <a href="/boutique" className="btn ghost">Voir la boutique complète</a>
          </div>
        </div>
      </section>

      <section id="cadeau">
        <div className="wrap">
          <div className="gift">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark, fluid size (min(46vw,340px)) doesn't fit next/image's fixed layouts */}
            <img className="gift-mark" src="/logo-butterfly.png" alt="" aria-hidden="true" />
            <div>
              <p className="eyebrow">Bons cadeaux</p>
              <h2>Offrir un instant de rivage.</h2>
              <p>
                Un montant libre, valable sur l&apos;ensemble des soins de l&apos;institut — à composer selon
                l&apos;occasion, ou à laisser choisir.
              </p>
            </div>
            <GiftModal />
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Au cœur du Vully.</h2>
            </div>
            <p className="lede">
              À quinze minutes de la gare en transports publics, à trente minutes de Berne, Fribourg ou
              Neuchâtel en voiture.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-map">
              <Image
                src="/map.jpg"
                alt="Carte de localisation de l'institut Rivage à Praz, Vully, entre les lacs de Morat, Neuchâtel et Bienne"
                fill
                sizes="(max-width: 900px) 90vw, 420px"
                style={{ objectFit: 'cover' }}
              />
              <a
                className="map-link"
                href="https://www.google.com/maps/search/?api=1&query=Route+principale+140a+1788+Praz+Vully"
                target="_blank"
                rel="noopener"
              >
                Ouvrir dans Maps ↗
              </a>
            </div>
            <div className="contact-details">
              <dl>
                <dt>Adresse</dt>
                <dd>Institut Rivage<br />Route principale 140a<br />1788 Praz (Vully), Suisse</dd>
                <dt>Téléphone</dt>
                <dd><a href="tel:+41798382223">079 838 22 23</a> — également sur WhatsApp</dd>
                <dt>E-mail</dt>
                <dd><a href="mailto:rivage@bluewin.ch">rivage@bluewin.ch</a></dd>
                <dt>Horaires</dt>
                <dd>Uniquement sur rendez-vous</dd>
                <dt>Instagram</dt>
                <dd><a href="https://www.instagram.com/bea.trice03" target="_blank" rel="noopener">@bea.trice03</a></dd>
              </dl>
              <p className="eyebrow">Modes de paiement</p>
              <div className="pay-methods">
                <span>TWINT</span><span>Facture</span>
              </div>
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn contact-cta">Prendre rendez-vous</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
