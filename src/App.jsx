import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./styles/site.css";
import jayPortrait from "./assets/jay.jpg";
import horoscopeBanner from "./assets/content/11.jpg";
import testimonial1 from "./assets/content/tm1.jpg";
import testimonial2 from "./assets/content/tm2.jpg";
import testimonial3 from "./assets/content/tm3.jpg";
import testimonial4 from "./assets/content/tm4.jpg";
import testimonial5 from "./assets/content/tm5.jpeg";
import { Chakra, FloatingIcons, Stars } from "./components/astrology/AstroEffects.jsx";
import SiteLayout from "./components/layout/SiteLayout.jsx";

const ServicePage = lazy(() => import("./pages/ServicePage.jsx"));
const ShopPage = lazy(() => import("./pages/ShopPage.jsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.jsx"));
const AppointmentPage = lazy(() => import("./pages/AppointmentPage.jsx"));
const AstrologerPage = lazy(() => import("./pages/AstrologerPage.jsx"));

// Grahas orbiting in the hero: name, orbit radius (px), duration (s), size, colour
const GRAHAS = [
  { n: "Surya", r: 90, d: 14, s: 26, c: "#ffb300" },
  { n: "Chandra", r: 140, d: 20, s: 20, c: "#e8eef7" },
  { n: "Mangal", r: 190, d: 27, s: 20, c: "#e5533d" },
  { n: "Budh", r: 240, d: 33, s: 16, c: "#5fd38d" },
  { n: "Guru", r: 295, d: 41, s: 26, c: "#f2c14e" },
  { n: "Shukra", r: 350, d: 50, s: 20, c: "#f5e6ff" },
  { n: "Shani", r: 405, d: 62, s: 24, c: "#9a8c6e" },
  { n: "Rahu", r: 460, d: 75, s: 16, c: "#7a6bd6" },
  { n: "Ketu", r: 510, d: 90, s: 16, c: "#c76b9b" },
];

const SERVICES = [
  ["horoscope", "Horoscope", "Janam kundli reading and yearly predictions based on your birth chart."],
  ["tarot", "Tarot Card", "Card spreads for questions on love, work and decisions."],
  ["palmistry", "Palmistry", "Understand the lines and mounts of your palm."],
  ["vastu", "Vastu Shastra", "Home and office layout guidance for balance and prosperity."],
  ["gemstones", "Gemstones", "Choose a stone that suits your planetary positions."],
  ["numerology", "Numerology", "Find out what your name and birth date numbers say."],
  ["rune-casting", "Rune-Casting", "Explore traditional rune symbols as prompts for reflection."],
  ["pooja", "Pooja", "Graha shanti and other poojas, performed on your behalf."],
];

const SERVICE_IDS = new Set(SERVICES.map(([id]) => id));

function LegacyRouteHashRedirect() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const slug = hash.slice(1);
    if (slug === "appointment") {
      navigate("/appointment", { replace: true });
    } else if (slug === "shop") {
      navigate("/shop", { replace: true });
    } else if (slug === "gallery") {
      navigate("/gallery", { replace: true });
    } else if (slug === "about") {
      navigate("/astrologer", { replace: true });
    } else if (SERVICE_IDS.has(slug)) {
      navigate(`/services/${slug}`, { replace: true });
    }
  }, [hash, navigate]);

  return null;
}

const BENEFITS = [
  ["✦", "Expert Astrologers", "Guidance informed by years of study and practical experience."],
  ["☼", "24×7, 365 Days Availability", "Reach out whenever you need thoughtful guidance."],
  ["✧", "Instant Access Worldwide", "Connect with Jeevan Jyotish from wherever you are."],
  ["❋", "Accurate Remedial Solutions", "Personalized suggestions to help you make informed choices."],
  ["◈", "Privacy Guaranteed", "Your personal questions are treated with care and discretion."],
  ["☽", "Trusted by Clients", "A people-first approach focused on confidence and self-reliance."],
];

const TESTIMONIALS = [
  {
    image: testimonial5,
    text: "I met Jayant sir through my relatives. I had been going through toughest phase of my life.My life was a complete failure. I was under the spell of black magic for 8 years n I was unaware of the fact. I was suffering from variety of illness, depression, nightmares. I couldn't find the reason for this. Why all these? But fortunately I was introduced to Jayant sir. He helped me with all my problems. Currently I am following the remedies he prescribed and life seems better now.",
    name: "Nilima Mishra",
    location: "kujang",
  },
  {
    image: testimonial2,
    text: "I am a Law Student Pursuing My Study In Bhubaneshwar, Odisha. In life, we face many challenges and we should know the art of facing those. So, I am talking about someone, who is not only a torch bearer or an astrologer for me. He is a guide, friend and a philosopher to me. I am connected to Mr. Jayant Mishra from my Schooling Days. I belief that his predictions and remedies have worked a lot in my life. Out of my personal experiences, I am saying that he is a person of both art and science. He believes in numericals as well as the societal cultures. I am following his path and taking my life in a good and fruitful way.",
    name: "Aishwarya Priyadarshini",
    location: "Bhubaneshwar",
  },
  {
    image: testimonial3,
    text: "Life is not always about the present situations. We need to make our future better in all expects to lead a life without any stress. So, I am talking about My Family Astrologer Mr. Jayant Mishra. We are connected to him from long back. He is someone, who had predicted a lot of things about our family, wealth and other necessary things. And we are on his path to follow every remedy to fill life with happiness and prosperity.",
    name: "Snigdha Debta",
    location: "Sambalpur",
  },
  {
    image: testimonial1,
    text: "Ever cheerful and always smiling. He always has a solution for everyone and almost everything. He is a great listener and pacifier. He always gives quite practical solutions. A joyful human being who will stay and never leave no matter what. I must say his knowledge in alternative medicines is quite commendable. He is very thorough and always dedicated to serve. He has helped many with his accuracy in calculations and his predictions have benefited many.",
    name: "Ms. Smruti Dash",
    location: "Mumbai",
  },
  {
    image: testimonial1,
    text: "When life throws stones at you, you just need to be able to gather courage to catch them all, before everything else starts falling in place. Jayant Bhaiya has been one of those people who not only helped me in gaining that strength, but also motivated me to think and aim higher. He has a profound knowledge of how stars and planets work and affect our lives. When you talk to him, you just don't get the solutions to the issues you are facing in life, but he would even give you a detailed explanation of why something did not work. Many a times, each one of us goes through that dilemma while making big decisions in life, and I feel he is the right person to go to, each time that battle begins in the mind. Grateful for all the guidance.",
    name: "Urvashi Singh",
    location: "Lucknow",
  },
  {
    image: testimonial4,
    text: "l have been practising healing & sound therapy from 2012 and have tried to lend a helping hand to people who needed psychological assistance and counselling. Jayanta Mishra who's a major in human values, biological sciences as well as astrology and human consciousness is an expert known to me since 20 years now, he with his team are ready to help you out in the journey of your life to make your life fulfilled & purposeful. So,please indulge yourself into this aura of self awareness and majestic power of equanimity and rejoice the power of love.",
    name: "Mystic Ruby (Healer)",
    location: "Sambalpur",
  },
];

const TESTIMONIAL_SLIDES = Array.from(
  { length: Math.ceil(TESTIMONIALS.length / 2) },
  (_, index) => TESTIMONIALS.slice(index * 2, index * 2 + 2),
);

function Testimonials() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState({});
  const pointerStart = useRef(null);

  const goTo = (nextSlide) => {
    setSlide((nextSlide + TESTIMONIAL_SLIDES.length) % TESTIMONIAL_SLIDES.length);
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % TESTIMONIAL_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, slide]);

  const handlePointerUp = (event) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (distance < -50) goTo(slide + 1);
    if (distance > 50) goTo(slide - 1);
  };

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <Stars count={45} />
      <div className="testimonials-content">
        <header className="testimonials-heading">
          <span className="section-kicker">Words from our community</span>
          <h2 id="testimonials-title">Readings that changed their path</h2>
          <p>Experiences shared by people who found guidance with Jeevan Jyotish.</p>
        </header>
        <div
          className="testimonial-viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
          onPointerDown={(event) => {
            pointerStart.current = event.clientX;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") goTo(slide - 1);
            if (event.key === "ArrowRight") goTo(slide + 1);
          }}
        >
          <div
            className="testimonial-track"
            style={{ transform: `translate3d(-${slide * 100}%, 0, 0)` }}
            aria-live="polite"
          >
            {TESTIMONIAL_SLIDES.map((items, slideIndex) => (
              <div className="testimonial-slide" key={slideIndex}>
                {items.map((testimonial, cardIndex) => {
                  const isExpanded = Boolean(expanded[testimonial.name]);
                  return (
                    <article
                      className={`testimonial-card${isExpanded ? " expanded" : ""}`}
                      key={testimonial.name}
                      style={{ "--float-delay": `${cardIndex * -1.5}s` }}
                    >
                      <span className="testimonial-mark" aria-hidden="true">✦ &nbsp; CLIENT STORY</span>
                      <p>{testimonial.text}</p>
                      <button
                        type="button"
                        className="testimonial-read-more"
                        aria-expanded={isExpanded}
                        onClick={() => setExpanded((current) => ({
                          ...current,
                          [testimonial.name]: !current[testimonial.name],
                        }))}
                      >
                        {isExpanded ? "Show less" : "Read full story"}
                      </button>
                      <div className="testimonial-author">
                        <img src={testimonial.image} alt="" loading="lazy" decoding="async" />
                        <div>
                          <h3>{testimonial.name}</h3>
                          <span>{testimonial.location}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="testimonial-controls" aria-label="Testimonial navigation">
          <button type="button" className="testimonial-arrow" aria-label="Previous testimonials" onClick={() => goTo(slide - 1)}>←</button>
          <div className="testimonial-dots">
            {TESTIMONIAL_SLIDES.map((items, index) => (
              <button
                type="button"
                key={items[0].name}
                className={`testimonial-dot${index === slide ? " active" : ""}`}
                aria-label={`Go to testimonial group ${index + 1}`}
                aria-current={index === slide ? "true" : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button type="button" className="testimonial-arrow" aria-label="Next testimonials" onClick={() => goTo(slide + 1)}>→</button>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <SiteLayout className="app" isHome>
      <section id="home" className="hero">
        <Stars count={160} />
        <div className="shoot s1" /><div className="shoot s2" /><div className="shoot s3" />
        <div className="planet" aria-hidden="true" />

        <div className="orbits" aria-hidden="true">
          <div className="sun-core" />
          {GRAHAS.map((g) => (
            <div key={g.n} className="orbit" style={{ width: g.r * 2, height: g.r * 2, animationDuration: `${g.d}s` }}>
              <span className="graha" title={g.n}
                style={{ width: g.s, height: g.s, background: g.c, boxShadow: `0 0 14px ${g.c}`, animationDuration: `${g.d}s` }} />
            </div>
          ))}
        </div>

        <div className="hero-text">

          <h1 className="fx-liquid">Jeevan Jyotish Reveals The Will Of God</h1>
          <p className="fx-laser" data-text="Horoscopes ✶ Gemstones ✶ Numerology">
            Horoscopes ✶ Gemstones ✶ Numerology
          </p>
          <Link className="btn" to="/appointment">Know Your Future</Link>
        </div>
      </section>

      <section id="about" className="about">
        <Stars count={90} />
        <FloatingIcons local />
        <div className="about-text">
          <h2>About <span>Jeevan Jyotish</span></h2>
          <h3>'Aapo Surya Bhavah'</h3>
          <p>
            In India, the study of astrology, or Jyotish Shastra, can be traced to the Vedic times.
            Glimpses of astrological traditions are visible in the ‘Atharva-Veda’, one of the most
            sacred texts of India. Vedic astrology is the interpretation of the arrangement of the
            planets as it applies to humans and other entities. We believe each of us is unique. Our
            analysis is different from textual astrology or prediction. The methods are proven and
            established by years of study. We make individuals self-reliant rather than dependent.
            Let's be a family to share, learn and grow.
          </p>
        </div>
        <Chakra />
      </section>

      <section className="astrology-note">
        <Stars count={36} />
        <div className="astrology-note-card">
          <div className="note-rainbow" aria-hidden="true" />
          <div className="note-emblem" aria-hidden="true"><span>☼</span></div>
          <header className="note-heading">
            <span className="profile-kicker">A note on astrology</span>
            <h2>The awareness of what needs to be corrected only leads to its correction. And so, astrology came into being.</h2>
          </header>
          <div className="note-profile">
            <figure className="portrait-frame">
              <div className="portrait-orbit" aria-hidden="true" />
              <img className="astrologer-portrait" src={jayPortrait} alt="Professor Jayant Mishra" loading="lazy" decoding="async" />
              <figcaption>Professor Jayant Mishra</figcaption>
            </figure>
            <div className="astrology-note-copy">
              <h3>Meet Professor Jayant Mishra</h3>
              <p>
                <strong>Professor Jayant Mishra</strong> has been actively involved in helping people align their lives
                with their stars, so as to reap the full benefits of their being in this world. He holds an MS in
                Consciousness Studies and has twenty-one years of experience in Meditation, Astrology and related
                sciences. An expert practitioner of Kriya Yoga, he has also worked as a Reiki Grand Master (Healer),
                a Fengshui Consultant and Tarot Reader. He even helps his clients make great decisions in their lives
                using Rune casting.
              </p>
              <p>
                Merely a conversation with him could help you receive immense motivation and a valuable piece of
                advice to make the most of your life. Contact him now to find answers to your queries and help solve
                the never-ending mysteries life throws at us.
              </p>
              <Link className="btn note-cta" to="/appointment">Talk to the astrologer</Link>
              <Link className="astrologer-profile-link" to="/astrologer">
                Read the full profile <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="why-us">
        <Stars count={45} />
        <div className="why-heading">
          <span className="section-kicker">Guidance with care</span>
          <h2>Why <span>Choose Us</span></h2>
          <p>Thoughtful guidance rooted in experience, respect and your individual journey.</p>
        </div>
        <div className="benefit-grid">
          {BENEFITS.map(([icon, title, description], index) => (
            <article className="benefit-card" key={title} style={{ "--card-index": index }}>
              <span className="benefit-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="services">
        <Stars count={60} />
        <FloatingIcons local />
        <h2>Our Services</h2>
        <div className="grid">
          {SERVICES.map(([id, t, d]) => (
            <article key={id} id={id} className="card">
              <h4>{t}</h4>
              <p>{d}</p>
              <Link className="service-read-more" to={`/services/${id}`}>Read more</Link>
            </article>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="appt">
        <Stars count={50} />
        <h2>Book an Appointment</h2>
        <p>Call +91-7008259050 or write to acharyajayantji@gmail.com to fix a time.</p>
        <Link className="btn" to="/appointment">Make an appointment</Link>
      </section>

    </SiteLayout>
  );
}

function FloatingControls() {
  const { pathname } = useLocation();
  const [promoOpen, setPromoOpen] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const previousScrollY = useRef(window.scrollY);

  useEffect(() => {
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      setShowBackToTop(currentScrollY > 320);
      if (currentScrollY > previousScrollY.current && currentScrollY > 48) {
        setPromoOpen(false);
      }
      previousScrollY.current = currentScrollY;
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      {pathname !== "/astrologer" && (
        <aside className={`floating-promo${promoOpen ? " is-open" : " is-closed"}`} aria-label="Consultation advertisement">
          <div
            id="floating-promo-card"
            className="floating-promo-card"
            aria-hidden={!promoOpen}
            inert={!promoOpen}
          >
            <img className="floating-promo-image" src={horoscopeBanner} alt="" />
            <div className="floating-promo-content">
              <button
                type="button"
                className="floating-promo-close"
                aria-label="Close consultation advertisement"
                onClick={() => setPromoOpen(false)}
              >
                ×
              </button>
              <span className="floating-promo-kicker">Personalized Vedic astrology</span>
              <h2>Get your full &amp; detailed Kundli</h2>
              <p>Explore your birth chart in a one-to-one consultation.</p>
              <div className="floating-promo-actions">
                <Link className="floating-promo-cta" to="/appointment">Let&apos;s Go</Link>
                <a href="tel:+917008259050">Call +91-7008259050</a>
              </div>
            </div>
          </div>
          {!promoOpen && (
            <button
              type="button"
              className="floating-promo-reopen"
              aria-controls="floating-promo-card"
              aria-expanded={promoOpen}
              onClick={() => setPromoOpen(true)}
            >
              <span aria-hidden="true">✦</span> Get a consultation
            </button>
          )}
        </aside>
      )}
      {showBackToTop && (
        <button
          type="button"
          className="back-to-top"
          aria-label="Go to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span aria-hidden="true">↑</span>
          <span>Top</span>
        </button>
      )}
    </>
  );
}

export default function App() {
  return (
    <>
      <LegacyRouteHashRedirect />
      <Suspense fallback={<main className="service-not-found" role="status">Loading page…</main>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productSlug" element={<ShopPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/astrologer" element={<AstrologerPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="*" element={<ServicePage />} />
        </Routes>
      </Suspense>
      <FloatingControls />
    </>
  );
}
