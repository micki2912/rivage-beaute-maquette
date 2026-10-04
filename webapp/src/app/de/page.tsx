import PriceGroup, { PriceRow } from '@/components/PriceGroup'
import GiftModal from '@/components/GiftModal'
import ProductCard from '@/components/ProductCard'
import WaveDivider from '@/components/WaveDivider'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import type { Product } from '@/lib/types'
import { SITE_URL } from '@/lib/site'

const title = 'Rivage Beauté — Wellness-Institut, Praz (Vully)'
const description =
  'Wellness-Institut in Praz, mitten im Vully, zwischen Murten, Avenches und Neuenburg. Gesichtsbehandlungen, Maniküre, Pediküre, Pressotherapie, nach Vereinbarung.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${SITE_URL}/de`,
    languages: { 'fr-CH': SITE_URL, 'de-CH': `${SITE_URL}/de` },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/de`,
    siteName: 'Rivage Beauté',
    images: [{ url: '/video-poster.jpg', width: 640, height: 386, alt: 'Institut Rivage Beauté, Praz' }],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/video-poster.jpg'],
  },
}

const BOOKING_URL =
  'https://booking.localsearch.ch/bookings/institut-de-beaute-onglerie-rivage-pour-elle-lui/services?locale=de'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Institut Rivage',
  image: `${SITE_URL}/video-poster.jpg`,
  url: `${SITE_URL}/de`,
  telephone: '+41798382223',
  email: 'rivage@bluewin.ch',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Route principale 140a',
    postalCode: '1788',
    addressLocality: 'Praz (Vully)',
    addressCountry: 'CH',
  },
  areaServed: [
    'Praz', 'Sugiez', 'Nant', 'Môtier', 'Lugnorre', 'Salavaux', 'Vully-les-Lacs',
    'Murten', 'Avenches', 'Kerzers', 'Ins', 'Gampelen', 'Cudrefin',
  ],
  priceRange: 'CHF',
}

const FAQ_ITEMS = [
  {
    q: 'Wie kann ich einen Termin buchen?',
    a: 'Per Telefon, per WhatsApp, oder direkt online über unser Buchungssystem.',
  },
  {
    q: 'Welche Zahlungsmittel akzeptieren Sie?',
    a: 'TWINT, Rechnung oder bar. Kartenzahlungen werden nicht angeboten.',
  },
  {
    q: 'Ist das Institut gut erreichbar?',
    a: 'Route principale 140a, in Praz (Vully) — fünfzehn Minuten vom Bahnhof mit öffentlichen Verkehrsmitteln, gut erreichbar von Sugiez, Nant, Môtier, Murten, Avenches, Kerzers und den übrigen Vully-Dörfern.',
  },
  {
    q: 'Ich kann für meine Pédicure nicht kommen — geht das trotzdem?',
    a: 'Ja — auf Anfrage holt Béatrice Sie zu Hause ab, verwöhnt Ihre Füsse im Institut und bringt Sie danach wieder nach Hause.',
  },
  {
    q: 'Gibt es einen Parkplatz?',
    a: 'Ja, direkt vor dem Institut steht ein kostenloser Parkplatz zur Verfügung.',
  },
  {
    q: 'Liefern Sie die Shop-Produkte?',
    a: 'Ja, an Ihre Adresse, Zahlung per Rechnung — wie im Institut.',
  },
  {
    q: 'Bieten Sie Geschenkgutscheine an?',
    a: 'Ja, mit frei wählbarem Betrag, gültig für alle Behandlungen des Instituts.',
  },
  {
    q: 'Welche Produktmarken verwenden Sie?',
    a: 'Professionelle Schweizer Linien: JPROSSELET, Artepil, Stagecolor, OPI und Forever Aloe.',
  },
]

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export const dynamic = 'force-dynamic'

function pickRandom(products: Product[], count: number) {
  const shuffled = [...products].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default async function HomePageDE() {
  const products = await getProducts()
  const featured = pickRandom(products, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">Wellness-Institut — Praz, Vully</p>
            <h1>
              Zwischen drei Seen,
              <br />
              ein Moment nur für <em>Sie</em>.
            </h1>
            <p className="lede">
              Gesichtsbehandlungen, Maniküre, Pédicure und Lymphdrainage in einem Institut mit persönlicher
              Atmosphäre. Béatrice Eichenberger empfängt Sie nach Vereinbarung — mit dreiunddreissig Jahren
              Erfahrung und einer Aufmerksamkeit, die sich nie hetzen lässt.
            </p>
            <div className="hero-ctas">
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn">
                Termin buchen
              </a>
              <a href="#soins" className="btn ghost">
                Behandlungen entdecken
              </a>
            </div>
            <div className="hero-facts">
              <div className="hero-fact"><b>33 Jahre</b><span>Erfahrung</span></div>
              <div className="hero-fact"><b>1788</b><span>Praz, Vully</span></div>
              <div className="hero-fact"><b>Nach Vereinbarung</b><span>Tel. &amp; WhatsApp</span></div>
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
              alt="Béatrice Eichenberger vor dem Institut Rivage in Praz"
              fill
              sizes="(max-width: 900px) 90vw, 40vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div className="cap"><span>Béatrice Eichenberger</span></div>
          </div>
          <div>
            <p className="eyebrow">Das Institut</p>
            <h2>Ein Ufer der Ruhe, eine sichere Hand.</h2>
            <p className="quote">«Jede Behandlung beginnt mit Zuhören — der Rest ergibt sich von selbst.»</p>
            <p className="lede">
              Kosmetikerin und diplomierte Pédicure, hat Béatrice Rivage in Praz gegründet — einem Dorf
              zwischen den Seen von Murten, Neuenburg und Biel. Hier gibt es keine Kette, keine
              durchgetakteten Termine: ein Institut, das darauf ausgelegt ist, jeweils nur eine Person zu
              empfangen, mit professionellen Produkten, die auf Dauer ausgelegt sind.
            </p>
            <div className="facts-row">
              <div>
                <p className="eyebrow">Erfahrung</p>
                <p>Mehr als dreiunddreissig Jahre Praxis in Kosmetik und Pédicure.</p>
              </div>
              <div>
                <p className="eyebrow">Produkte</p>
                <p>Professionelle Schweizer Linien: JPROSSELET, Artepil, Stagecolor, OPI.</p>
              </div>
              <div>
                <p className="eyebrow">Ablauf</p>
                <p>
                  Nur nach Vereinbarung — per Telefon,{' '}
                  <a href="https://wa.me/41798382223" target="_blank" rel="noopener">
                    WhatsApp
                  </a>{' '}
                  oder{' '}
                  <a href={BOOKING_URL} target="_blank" rel="noopener">
                    online
                  </a>
                  .
                </p>
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
              <h2>Fusspflege von einer echten diplomierten Pédicure.</h2>
              <p>
                Eine diplomierte Pédicure geht weit über Nagellack hinaus — eine präzise, fachkundige
                Behandlung für Füsse, die den ganzen Tag Gewicht tragen, nicht nur für die Farbe.
              </p>
              <p className="feature-list-title">Nagelschnitt und -pflege:</p>
              <ul className="feature-list">
                <li>Entfernung von Hornhaut</li>
                <li>Behandlung von Hühneraugen</li>
                <li>Korrektur eingewachsener Nägel</li>
              </ul>
              <p className="feature-note">Professionelle, sterilisierte Instrumente und Einwegklingen.</p>
              <p className="feature-note">Keine podologischen Behandlungen für Risikopatienten (z. B. bei Diabetes).</p>
            </div>
            <div className="feature-price">
              <div className="row"><span>Einfache Pédicure</span><span className="price">85.–</span></div>
              <div className="row"><span>Pédicure &amp; Semi-permanent-Lack</span><span className="price highlight">95.–</span></div>
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn light">Termin buchen</a>
              <p className="pickup-note">
                Haben Sie Mühe, sich fortzubewegen? Auf Anfrage hole ich Sie zu Hause ab, verwöhne Ihre Füsse
                im Institut und bringe Sie danach wieder nach Hause.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="soins">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Die Behandlungen</p>
              <h2>Eine Karte, wie am Ufer des Sees.</h2>
            </div>
            <p className="lede">
              Klare Preise, sorgfältig ausgewählte Behandlungen — vom Gesicht über die Hände bis zur
              Warmwachs-Epilation.
            </p>
          </div>

          <div className="menu-cols">
            <div>
              <PriceGroup
                lang="de"
                title="Gesicht & Blick"
                visible={
                  <>
                    <PriceRow name="Komplette Gesichtsbehandlung" note="Reinigung, Peeling, Massage, Maske" price="145.–" />
                    <PriceRow name="Gesichtsbehandlung ohne Massage" price="100.–" />
                  </>
                }
                extra={
                  <>
                    <PriceRow name="Wimpernfärben" price="30.–" />
                    <PriceRow name="Augenbrauenfärben" price="20.–" />
                    <PriceRow name="Augenbrauen-Epilation" price="ab 25.–" />
                  </>
                }
              />
              <PriceGroup
                lang="de"
                title="Maniküre"
                visible={
                  <>
                    <PriceRow name="Einfache Maniküre" price="45.–" />
                    <PriceRow name="Maniküre & Nagellack" price="55.–" />
                  </>
                }
                extra={
                  <>
                    <PriceRow name="Maniküre & Semi-permanent-Lack" price="70.–" />
                    <PriceRow name="Komplettes Gel-Modellage" price="100.–" />
                  </>
                }
              />
            </div>
            <div>
              <PriceGroup
                lang="de"
                title="Pédicure"
                visible={
                  <>
                    <PriceRow name="Einfache Pédicure" price="85.–" />
                    <PriceRow name="Pédicure & Nagellack" price="90.–" />
                  </>
                }
                extra={
                  <>
                    <PriceRow name="Pédicure & Semi-permanent-Lack" price="95.–" />
                    <PriceRow name="Nur Semi-permanent-Lack" price="35.–" />
                  </>
                }
              />
              <PriceGroup
                lang="de"
                title="Warmwachs-Epilation"
                visible={
                  <>
                    <PriceRow name="Halbe Beine" price="50.–" />
                    <PriceRow name="Ganze Beine" price="90.–" />
                  </>
                }
                extra={
                  <>
                    <PriceRow name="Beine, Intimbereich & Achseln" price="120.–" />
                    <PriceRow name="Arme" price="30.–" />
                    <PriceRow name="Achseln" price="25.–" />
                    <PriceRow name="Intimbereich" price="30.–" />
                    <PriceRow name="Intimbereich komplett (Brazilian)" price="50.–" />
                    <PriceRow name="Oberlippe" price="20.–" />
                    <PriceRow name="Ganzes Gesicht" price="50.–" />
                    <PriceRow name="Rücken, Schultern & Brust (Herren)" price="nach Aufwand" />
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
              <p className="eyebrow">Pressotherapie</p>
              <h2>Lymphdrainage, ganz ohne Aufwand.</h2>
              <p>
                Ein sanfter, rhythmischer Druck durch Manschetten an den Beinen regt die Durchblutung an und
                lindert das Gefühl schwerer Beine. Schon fünfundvierzig Minuten reichen, um den Unterschied
                zu spüren — bei einer Kur hält die Wirkung länger an.
              </p>
            </div>
            <div className="feature-price">
              <div className="row"><span>45-minütige Sitzung</span><span className="price">70.–</span></div>
              <div className="row"><span>Kur mit 8 Sitzungen<br /><small>1. Sitzung gratis</small></span><span className="price highlight">480.–</span></div>
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn light">Termin buchen</a>
            </div>
          </div>
        </div>
      </section>

      <section id="boutique">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Online-Shop</p>
              <h2>Die JPR/XC-Linie, zum Mitnehmen.</h2>
            </div>
            <p className="lede">
              Stellen Sie Ihren Warenkorb zusammen und senden Sie Ihre Anfrage — Zahlung wie gewohnt per
              TWINT oder Rechnung.
            </p>
          </div>
          <p className="brand-strip">
            Im Institut verwendete Marken: JPROSSELET, Artepil, Stagecolor, OPI, Forever Aloe.
          </p>
          {featured.length > 0 && (
            <div className="shop-grid shop-grid-teaser">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} lang="de" />
              ))}
            </div>
          )}
          <div className="shop-cta">
            <a href="/de/boutique" className="btn ghost">Zum ganzen Shop</a>
          </div>
        </div>
      </section>

      <section id="cadeau">
        <div className="wrap">
          <div className="gift">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark, fluid size (min(46vw,340px)) doesn't fit next/image's fixed layouts */}
            <img className="gift-mark" src="/logo-butterfly.png" alt="" aria-hidden="true" />
            <div>
              <p className="eyebrow">Geschenkgutscheine</p>
              <h2>Verschenken Sie einen Moment Rivage.</h2>
              <p>
                Ein frei wählbarer Betrag, gültig für alle Behandlungen des Instituts — passend zum Anlass,
                oder ganz nach Wahl der Beschenkten.
              </p>
            </div>
            <GiftModal lang="de" />
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Häufige Fragen</p>
              <h2>Vielleicht fragen Sie sich...</h2>
            </div>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Kontakt</p>
              <h2>Mitten im Vully.</h2>
            </div>
            <p className="lede">
              Fünfzehn Minuten vom Bahnhof mit öffentlichen Verkehrsmitteln, dreissig Minuten von Bern,
              Freiburg oder Neuenburg mit dem Auto — gut erreichbar von Sugiez, Nant, Môtier, Lugnorre,
              Salavaux, Murten, Avenches, Kerzers, Ins, Gampelen und Cudrefin.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-map">
              <Image
                src="/map.jpg"
                alt="Karte mit der Lage des Institut Rivage in Praz, Vully, zwischen den Seen von Murten, Neuenburg und Biel"
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
                In Maps öffnen ↗
              </a>
            </div>
            <div className="contact-details">
              <dl>
                <dt>Adresse</dt>
                <dd>Institut Rivage<br />Route principale 140a<br />1788 Praz (Vully), Schweiz</dd>
                <dt>Telefon</dt>
                <dd>
                  <a href="tel:+41798382223">079 838 22 23</a> — auch über{' '}
                  <a href="https://wa.me/41798382223" target="_blank" rel="noopener">
                    WhatsApp
                  </a>
                </dd>
                <dt>E-Mail</dt>
                <dd><a href="mailto:rivage@bluewin.ch">rivage@bluewin.ch</a></dd>
                <dt>Öffnungszeiten</dt>
                <dd>Nur nach Vereinbarung</dd>
                <dt>Parkplatz</dt>
                <dd>Kostenloser Parkplatz vor dem Institut</dd>
                <dt>Instagram</dt>
                <dd><a href="https://www.instagram.com/bea.trice03" target="_blank" rel="noopener">@bea.trice03</a></dd>
              </dl>
              <p className="eyebrow">Zahlungsarten</p>
              <div className="pay-methods">
                <span>TWINT</span><span>Rechnung</span><span>Bar</span>
              </div>
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn contact-cta">Termin buchen</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
