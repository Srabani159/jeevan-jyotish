import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import horoscopeImage from "../assets/content/11.jpg";
import horoscopeStoryImage from "../assets/content/about/hr-abt1.jpg";
import tarotImage from "../assets/content/tarot_single.jpg";
import palmistryImage from "../assets/content/palmistry_single.jpg";
import palmHeartLine from "../assets/content/palm1.png";
import palmHeadLine from "../assets/content/palm2.png";
import palmLifeLine from "../assets/content/palm3.png";
import palmLoveLine from "../assets/content/palm4.png";
import vastuImage from "../assets/content/vastu_single.jpg";
import gemstoneImage from "../assets/content/gemstones_single.jpg";
import numerologyImage from "../assets/content/numerology_single.jpg";
import poojaImage from "../assets/content/rudrabhishek.jpg";
import { Chakra, Stars } from "../components/astrology/AstroEffects.jsx";
import SiteLayout from "../components/layout/SiteLayout.jsx";
import { phoneHref, useContact } from "../context/ContactContext.jsx";
import { SERVICE_PAGES, ZODIAC_SIGNS } from "../data/serviceContent.js";

const SERVICE_ART = {
  horoscope: { image: horoscopeImage, alt: "A zodiac chart beneath a starry sky", accent: "#48b6df" },
  tarot: { image: tarotImage, alt: "A spread of richly illustrated tarot cards", accent: "#c27aef" },
  palmistry: { image: palmistryImage, alt: "A palm reading consultation", accent: "#ff822f" },
  vastu: { image: vastuImage, alt: "A calm, balanced bedroom interior", accent: "#7cc9b2" },
  gemstones: { image: gemstoneImage, alt: "A blue gemstone in a silver setting", accent: "#77bdf2" },
  numerology: { image: numerologyImage, alt: "Numbers in a blue-toned composition", accent: "#8e9dff" },
  "rune-casting": { image: null, alt: "A glowing arrangement of traditional rune symbols", accent: "#e5aa66" },
  pooja: { image: poojaImage, alt: "Traditional devotional ceremony imagery", accent: "#ffad4d" },
};

const PALMISTRY_LINES = [
  {
    title: "Heart Line",
    image: palmHeartLine,
    alt: "Palm illustration highlighting the heart line",
    text: "In palmistry traditions, this upper palm line is associated with emotions and relationships. Its appearance cannot predict a person's romantic life.",
  },
  {
    title: "Head Line",
    image: palmHeadLine,
    alt: "Palm illustration highlighting the head line",
    text: "Traditional readings connect this line with thought and decision-making. It is not a measure of intelligence or mental ability.",
  },
  {
    title: "Life Line",
    image: palmLifeLine,
    alt: "Palm illustration highlighting the life line",
    text: "Some readings associate this curve with vitality or life changes. It cannot determine health, lifespan, or future events.",
  },
  {
    title: "Love Line",
    image: palmLoveLine,
    alt: "Palm illustration highlighting a line near the thumb",
    text: "Often used as another name for the heart line, this mark is traditionally discussed in relation to emotional connections.",
  },
];

export default function ServicePage() {
  const { slug } = useParams();
  const { phone, email } = useContact();
  const service = SERVICE_PAGES[slug];
  const art = SERVICE_ART[slug];
  const [activeInfo, setActiveInfo] = useState(0);

  useEffect(() => {
    setActiveInfo(0);
  }, [slug]);

  if (!service) {
    return (
      <SiteLayout className="service-page">
        <main className="service-not-found">
          <h1>Service not found</h1>
          <p>That service page is not available.</p>
          <Link className="btn" to="/#services">Browse our services</Link>
        </main>
      </SiteLayout>
    );
  }

  const serviceStyle = {
    "--service-accent": art.accent,
    ...(art.image ? { "--service-hero-image": `url("${art.image}")` } : {}),
  };
  const selectedInfo = service.sections[activeInfo];
  const nextInfo = (activeInfo + 1) % service.sections.length;

  return (
    <SiteLayout className="service-page" style={serviceStyle}>
      <main>
        <section className="service-page-hero">
          <Stars count={160} />
          <div className="shoot s1" />
          <div className="shoot s2" />
          <div className="shoot s3" />
          <div className="service-page-chakra" aria-hidden="true">
            <Chakra />
          </div>
          <div className="service-page-hero-content">
            <span className="section-kicker">{service.category}</span>
            <h1>{service.heading}</h1>
            <p>{service.intro}</p>
            <Link className="btn" to="/appointment">Know Your Future</Link>
          </div>
        </section>

        {service.signs ? (
          <section className="service-story" aria-label="Horoscope and rune-casting information">
            <Stars count={55} />
            <div className="service-story-copy">
              <span className="section-kicker">Explore the traditions</span>
              <div className="service-story-switch" aria-label="Choose a topic">
                {service.sections.map((section, index) => (
                  <button
                    className={index === activeInfo ? "active" : ""}
                    type="button"
                    key={section.title}
                    aria-pressed={index === activeInfo}
                    onClick={() => setActiveInfo(index)}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              <article aria-live="polite">
                <h2>{selectedInfo.title}</h2>
                <p>{selectedInfo.text}</p>
                <span className="service-story-hint">Select a topic or click the artwork to switch.</span>
              </article>
            </div>

            <button
              type="button"
              className={`service-story-art${activeInfo === 1 ? " rune-artwork" : ""}`}
              aria-label={`Show ${service.sections[nextInfo].title}`}
              onClick={() => setActiveInfo(nextInfo)}
            >
              {activeInfo === 0 ? (
                <img
                  src={horoscopeStoryImage}
                  alt="A golden zodiac clock against a starry sky"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="rune-art-symbols" aria-hidden="true">
                  <span>ᚠ</span>
                  <span>ᚢ</span>
                  <span>ᚦ</span>
                  <span>ᚨ</span>
                  <span>ᚱ</span>
                </span>
              )}
              <span className="service-story-art-label">{selectedInfo.title}</span>
              <span className="service-story-art-action" aria-hidden="true">↻</span>
            </button>
          </section>
        ) : (
          <>
            <section className="service-visual-section" aria-label={`${service.title} overview`}>
              <Stars count={45} />
              <div
                className={`service-visual-frame${art.image ? "" : " rune-visual"}`}
                role={art.image ? undefined : "img"}
                aria-label={art.image ? undefined : art.alt}
              >
                {art.image ? (
                  <img src={art.image} alt={art.alt} loading="lazy" decoding="async" />
                ) : (
                  <span className="service-visual-runes" aria-hidden="true">
                    <span>ᚠ</span><span>ᚢ</span><span>ᚦ</span><span>ᚨ</span><span>ᚱ</span>
                  </span>
                )}
                <span className="service-visual-orbit" aria-hidden="true" />
                <span className="service-visual-symbol" aria-hidden="true">{service.symbol}</span>
                <span className="service-visual-label">{service.title}</span>
              </div>
              <article className="service-visual-copy">
                <span className="section-kicker">{service.category}</span>
                <h2>{service.sections[0].title}</h2>
                <p>{service.sections[0].text}</p>
                <span className="service-visual-note">Traditional perspectives for reflection—not guaranteed outcomes.</span>
              </article>
            </section>
            <section className="service-page-content" aria-label={`${service.title} details`}>
              <Stars count={45} />
              <header className="service-details-heading">
                <span className="section-kicker">More to explore</span>
                <h2>Discover the details</h2>
              </header>
              {service.sections.slice(1).map((section, index) => (
                <article className="service-detail-card" key={section.title} style={{ "--detail-index": index }}>
                  <span className="service-detail-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </article>
              ))}
            </section>
          </>
        )}

        {slug === "palmistry" && (
          <section className="palmistry-lines" aria-labelledby="palmistry-lines-title">
            <Stars count={55} />
            <header className="palmistry-lines-heading">
              <span className="section-kicker">A closer look at the hand</span>
              <h2 id="palmistry-lines-title">About Palmistry</h2>
              <p>Common palm-line names and their traditional interpretations.</p>
            </header>
            <div className="palmistry-lines-grid">
              {PALMISTRY_LINES.map((line, index) => (
                <article className="palmistry-line-card" key={line.title} style={{ "--line-index": index }}>
                  <div className="palmistry-line-visual">
                    <img src={line.image} alt={line.alt} loading="lazy" decoding="async" />
                  </div>
                  <h3>{line.title}</h3>
                  <p>{line.text}</p>
                </article>
              ))}
            </div>
            <p className="palmistry-lines-note">
              These are cultural beliefs, not scientifically validated assessments. Palm lines do not reliably reveal
              personality, predict the future, or determine health or lifespan.
            </p>
          </section>
        )}

        {service.featureSection && (
          <section className={`service-topic-section service-topic-${slug}`} aria-labelledby={`service-topic-title-${slug}`}>
            <Stars count={55} />
            <header className="service-topic-heading">
              <span className="section-kicker">{service.featureSection.eyebrow}</span>
              <h2 id={`service-topic-title-${slug}`}>{service.featureSection.title}</h2>
              <p>{service.featureSection.intro}</p>
            </header>
            <div className={`service-topic-grid service-topic-grid-${slug}`}>
              {service.featureSection.cards.map((card, index) => (
                <article className={`service-topic-card${card.image ? " has-image" : " number-card"}`} key={card.title ?? card.number}>
                  {card.image ? (
                    <div className="service-topic-image">
                      <img src={card.image} alt={card.alt} loading="lazy" decoding="async" />
                    </div>
                  ) : (
                    <div className="service-topic-number" aria-hidden="true">{card.number}</div>
                  )}
                  <div className="service-topic-card-copy">
                    {card.tradition && <span className="service-topic-tradition">{card.tradition}</span>}
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="service-topic-note">{service.featureSection.note}</p>
          </section>
        )}

        {service.signs && (
          <section className="zodiac-section" aria-labelledby="zodiac-title">
            <Stars count={55} />
            <span className="section-kicker">The twelve signs</span>
            <h2 id="zodiac-title">Explore the Zodiac</h2>
            <div className="zodiac-grid">
              {ZODIAC_SIGNS.map(([symbol, sign, traditionalName]) => (
                <article
                  className="zodiac-card"
                  key={sign}
                  tabIndex={0}
                  aria-label={`${sign}, traditionally called ${traditionalName}`}
                >
                  <span aria-hidden="true">{symbol}</span>
                  <h3>{sign}</h3>
                  <p>{traditionalName}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="service-page-cta">
          <Stars count={35} />
          <h2>Start a conversation</h2>
          <p>Call <a href={phoneHref(phone)}>{phone}</a> or email <a href={`mailto:${email}`}>{email}</a> to arrange a consultation.</p>
          <a className="btn" href={phoneHref(phone)}>Call now</a>
        </section>
      </main>

    </SiteLayout>
  );
}
