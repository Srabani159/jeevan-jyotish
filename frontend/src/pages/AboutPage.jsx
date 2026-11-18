import { Link } from "react-router-dom";
import { Chakra, Stars } from "../components/astrology/AstroEffects.jsx";
import SiteLayout from "../components/layout/SiteLayout.jsx";
import "../styles/about.css";

const PRINCIPLES = [
  {
    icon: "✧",
    title: "Every journey is personal",
    text: "We make space for your circumstances and questions instead of treating every reading as one-size-fits-all.",
  },
  {
    icon: "☼",
    title: "Tradition with reflection",
    text: "Vedic astrology and related practices offer traditional perspectives to consider—not fixed outcomes or guarantees.",
  },
  {
    icon: "◈",
    title: "Guidance that builds confidence",
    text: "Our aim is to help you reflect, make informed choices and become more self-reliant.",
  },
];

const PRACTICES = [
  ["horoscope", "Horoscope", "Explore your birth chart and yearly themes."],
  ["numerology", "Numerology", "Reflect on the traditional meanings of numbers."],
  ["tarot", "Tarot Card", "Use card symbolism as a prompt for your questions."],
  ["palmistry", "Palmistry", "Learn about traditional interpretations of palm lines."],
  ["vastu", "Vastu Shastra", "Consider traditional perspectives on living spaces."],
  ["gemstones", "Gemstones", "Explore cultural and planetary gemstone associations."],
  ["rune-casting", "Rune-Casting", "Use rune symbols to reflect on a question."],
  ["pooja", "Pooja", "Learn about traditional devotional ceremonies."],
];

export default function AboutPage() {
  return (
    <SiteLayout className="about-page">
      <main>
        <section className="about-page-hero" aria-labelledby="about-page-title">
          <Stars count={110} />
          <div className="about-page-hero-inner">
            <div className="about-page-hero-copy">
              <span className="about-page-kicker"><span aria-hidden="true">✦</span> The story of Jeevan Jyotish</span>
              <h1 id="about-page-title">Ancient wisdom.<br /><em>A more personal path.</em></h1>
              <p>
                Jeevan Jyotish brings the traditions of Vedic astrology together
                with thoughtful conversation—so you can explore life&apos;s
                questions with perspective, care and confidence.
              </p>
              <div className="about-page-actions">
                <Link className="btn" to="/appointment">Start a conversation <span aria-hidden="true">→</span></Link>
                <Link className="about-page-text-link" to="/astrologer">Meet Dr. Jayant Mishra</Link>
              </div>
            </div>
            <div className="about-page-seal">
              <Chakra />
              <span className="about-page-seal-caption">Tradition · Reflection · Guidance</span>
            </div>
          </div>
          <a className="about-page-scroll-cue" href="#about-story">
            <span>Discover our approach</span><span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="about-page-story" id="about-story" aria-labelledby="about-story-title">
          <div className="about-page-story-inner">
            <div className="about-page-story-copy">
              <span className="about-page-section-kicker">Rooted in Jyotish Shastra</span>
              <h2 id="about-story-title">A tradition of looking for <em>meaning</em></h2>
              <p>
                In India, the study of astrology, or Jyotish Shastra, can be
                traced to Vedic times. Vedic astrology interprets the arrangement
                of the planets as it relates to people and other parts of life.
              </p>
              <p>
                At Jeevan Jyotish, we believe each person is unique. We listen to
                what matters to you and draw on traditional study to offer
                perspectives for reflection—not predictions that replace your
                own judgment.
              </p>
            </div>
            <aside className="about-page-story-note">
              <span aria-hidden="true">“</span>
              <p>Let&apos;s be a family to share, learn and grow.</p>
              <small>The spirit of Jeevan Jyotish</small>
            </aside>
          </div>
        </section>

        <section className="about-page-principles" aria-labelledby="about-principles-title">
          <header className="about-page-section-heading">
            <span className="about-page-section-kicker">What guides us</span>
            <h2 id="about-principles-title">A thoughtful approach to <em>guidance</em></h2>
            <p>Our work begins with listening and leaves room for your own decisions.</p>
          </header>
          <div className="about-page-principles-grid">
            {PRINCIPLES.map((principle, index) => (
              <article className="about-page-principle-card" key={principle.title} style={{ "--principle-index": index }}>
                <span className="about-page-principle-icon" aria-hidden="true">{principle.icon}</span>
                <span className="about-page-principle-number" aria-hidden="true">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-page-practices" aria-labelledby="about-practices-title">
          <header className="about-page-section-heading">
            <span className="about-page-section-kicker">Ways we can help</span>
            <h2 id="about-practices-title">Explore our <em>practices</em></h2>
            <p>Learn about the traditions we work with and find a place to begin.</p>
          </header>
          <div className="about-page-practices-grid">
            {PRACTICES.map(([id, title, description]) => (
              <Link className="about-page-practice-card" key={id} to={`/services/${id}`}>
                <span className="about-page-practice-mark" aria-hidden="true">✦</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="about-page-practice-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="about-page-cta" aria-labelledby="about-cta-title">
          <span className="about-page-section-kicker">A conversation can be a beginning</span>
          <h2 id="about-cta-title">Your questions, your <em>pace</em></h2>
          <p>Explore the traditions, learn more about our astrologer or arrange a conversation.</p>
          <div className="about-page-actions">
            <Link className="btn" to="/appointment">Book an appointment <span aria-hidden="true">→</span></Link>
            <Link className="about-page-text-link" to="/astrologer">Read Dr. Mishra&apos;s profile</Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
