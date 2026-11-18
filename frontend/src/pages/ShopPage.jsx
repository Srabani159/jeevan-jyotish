import React from "react";
import { Link, useParams } from "react-router-dom";
import fengShuiImage from "../assets/content/Products/Fengshui.jpg";
import gemstoneImage from "../assets/content/Products/Gemstone.jpg";
import yantraImage from "../assets/content/Products/Navgrah.jpg";
import rudrakshaImage from "../assets/content/Products/Rudhrakhsa.jpg";
import { Chakra, Stars } from "../components/astrology/AstroEffects.jsx";
import SiteLayout from "../components/layout/SiteLayout.jsx";
import { phoneHref, useContact } from "../context/ContactContext.jsx";

const PRODUCTS = [
  {
    slug: "yantras",
    title: "Energised Yantras",
    image: yantraImage,
    alt: "A framed collection of traditional yantra diagrams",
    summary: "Traditional geometric diagrams selected through a personal consultation.",
    description: "Yantras are geometric diagrams used in a range of Indian spiritual traditions. Their forms and customary uses vary.",
    details: [
      "Discuss the purpose and type of yantra you are considering.",
      "Selection and any customary preparation are explained during a personal consultation.",
    ],
  },
  {
    slug: "rudraksha",
    title: "Rudraksha",
    image: rudrakshaImage,
    alt: "A natural rudraksha bead",
    summary: "Rudraksha beads and related items, offered by consultation.",
    description: "Rudraksha beads have significance in Hindu devotional traditions and are used in items such as prayer malas.",
    details: [
      "Ask about bead appearance, origin information and how the item is intended to be used.",
      "Availability and recommendations are discussed individually; there is no need to purchase an item.",
    ],
  },
  {
    slug: "feng-shui",
    title: "Feng Shui",
    image: fengShuiImage,
    alt: "A traditional Feng Shui diagram",
    summary: "Traditional Feng Shui items discussed in relation to your space.",
    description: "Feng Shui is a traditional Chinese practice concerned with the arrangement of spaces and objects. Approaches and interpretations differ.",
    details: [
      "Share the area you want to consider and your practical preferences.",
      "Suggestions are intended to complement your space, not replace safe planning or professional design advice.",
    ],
  },
  {
    slug: "gemstones",
    title: "Gemstones",
    image: gemstoneImage,
    alt: "A selection of colorful gemstones",
    summary: "Gemstones with traditional astrological associations, discussed by consultation.",
    description: "Some astrological traditions associate gemstones with planets and symbolic meanings. The associations vary by system and practitioner.",
    details: [
      "Discuss the stone's identity, traditional association, treatment and your budget before deciding.",
      "Ask the seller for clear information about quality, certification and return terms.",
    ],
  },
];

function ShopHero({ product }) {
  return (
    <section className="service-page-hero shop-page-hero">
      <Stars count={140} />
      <div className="shoot s1" />
      <div className="shoot s2" />
      <div className="shoot s3" />
      <div className="service-page-chakra" aria-hidden="true">
        <Chakra />
      </div>
      <div className="service-page-hero-content">
        <span className="section-kicker">Consultation-only collection</span>
        <h1>{product ? product.title : "Shop"}</h1>
        <p>
          {product
            ? product.summary
            : "Various yantras, rudraksha, Feng Shui items and gemstones are offered through personal consultation only."}
        </p>
        {product ? (
          <Link className="btn" to="/shop">Browse all offerings</Link>
        ) : (
          <a className="btn" href="/#appointment">Discuss your needs</a>
        )}
      </div>
    </section>
  );
}

function ShopCatalog() {
  const { phone } = useContact();

  return (
    <>
      <section className="shop-catalog" aria-labelledby="shop-catalog-title">
        <Stars count={55} />
        <header className="shop-section-heading">
          <span className="section-kicker">Thoughtfully selected</span>
          <h2 id="shop-catalog-title">Explore the Collection</h2>
          <p>Choose an item to learn more. Availability and recommendations are confirmed in a personal consultation.</p>
        </header>
        <div className="shop-product-grid">
          {PRODUCTS.map((product, index) => (
            <Link
              className="shop-product-card"
              key={product.slug}
              to={`/shop/${product.slug}`}
            >
              <div className="shop-product-image">
                <img src={product.image} alt={product.alt} loading="lazy" decoding="async" />
              </div>
              <div className="shop-product-copy">
                <span className="shop-product-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{product.title}</h3>
                <p>{product.summary}</p>
                <span className="shop-product-link">View details <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
        <p className="shop-consultation-note">
          Items are provided on personal consultation only. No online checkout or fixed pricing is offered on this page.
        </p>
      </section>
      <section className="shop-contact-banner" aria-labelledby="shop-contact-title">
        <Stars count={25} />
        <h2 id="shop-contact-title">Looking for guidance?</h2>
        <p>Contact us to discuss an item and whether it suits your needs.</p>
        <a className="btn" href={phoneHref(phone)}>Call {phone}</a>
      </section>
    </>
  );
}

function ShopProductDetail({ product }) {
  const { phone, email } = useContact();

  return (
    <>
      <section className="shop-detail-section" aria-labelledby="shop-detail-title">
        <Stars count={55} />
        <Link className="shop-back-link" to="/shop">← Back to shop</Link>
        <article className="shop-detail-card">
          <div className="shop-detail-image">
            <img src={product.image} alt={product.alt} />
            <span className="shop-detail-image-glow" aria-hidden="true" />
          </div>
          <div className="shop-detail-copy">
            <span className="section-kicker">Available by personal consultation</span>
            <h2 id="shop-detail-title">{product.title}</h2>
            <p>{product.description}</p>
            <ul>
              {product.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
            <p className="shop-detail-disclaimer">
              These items are connected with cultural or spiritual traditions. No particular result is guaranteed,
              and purchasing is entirely optional.
            </p>
            <div className="shop-detail-actions">
              <a
                className="btn"
                href={`mailto:${email}?subject=${encodeURIComponent(`Shop enquiry: ${product.title}`)}`}
              >
                Enquire about this item
              </a>
              <a className="shop-call-link" href={phoneHref(phone)}>Call us</a>
            </div>
          </div>
        </article>
      </section>
      <section className="shop-contact-banner" aria-labelledby="shop-contact-title">
        <Stars count={25} />
        <h2 id="shop-contact-title">Explore other offerings</h2>
        <p>Browse the collection or contact us to discuss your questions.</p>
        <Link className="btn" to="/shop">Back to the shop</Link>
      </section>
    </>
  );
}

export default function ShopPage() {
  const { productSlug } = useParams();
  const product = PRODUCTS.find((item) => item.slug === productSlug);

  if (productSlug && !product) {
    return (
      <SiteLayout className="service-page shop-page">
        <main className="service-not-found">
          <h1>Item not found</h1>
          <p>This shop item is not available.</p>
          <Link className="btn" to="/shop">Browse the shop</Link>
        </main>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout className="service-page shop-page">
      <main>
        <ShopHero product={product} />
        {product ? <ShopProductDetail product={product} /> : <ShopCatalog />}
      </main>
    </SiteLayout>
  );
}
