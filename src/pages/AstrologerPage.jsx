import { Link } from "react-router-dom";
import { Stars } from "../components/astrology/AstroEffects.jsx";
import SiteLayout from "../components/layout/SiteLayout.jsx";
import jayPortrait from "../assets/jay.jpg";
import "../styles/astrologer.css";

const PROFILE_FACTS = [
  { value: "21", label: "years in astrology and meditation", source: "Website biography" },
  { value: "13", label: "years of academic teaching", source: "Supplied CV" },
  { value: "4", label: "years as a bioinformatics scientist", source: "Supplied CV" },
];

const EDUCATION = [
  {
    degree: "M.S. in Consciousness Studies",
    institution: "Bhaktivedanta Institute (BIITS-Pilani), India",
    detail: "The CV notes the program as equivalent to an M.Tech.",
  },
  {
    degree: "M.Sc. in Biomedical Sciences",
    institution: "Bundelkhand University",
    detail: "A foundation in biomedical research and life sciences.",
  },
  {
    degree: "Bachelor of Science",
    institution: "Bangalore University",
    detail: "Undergraduate study in the sciences.",
  },
];

const CAREER = [
  {
    period: "2005–2006",
    title: "Teaching Assistant",
    place: "Institute of Biomedical Sciences, Bundelkhand University",
  },
  {
    period: "2009",
    title: "Research Scientist and Faculty",
    place: "BioAxis DNA Research Centre, Hyderabad",
  },
  {
    period: "2011",
    title: "Research Scientist",
    place: "Genetech Biolaboratories, Biotech Park, Lucknow",
  },
  {
    period: "2013",
    title: "Assistant Professor",
    place: "SRM College of Engineering and Management, Lucknow",
  },
  {
    period: "2021",
    title: "Principal",
    place: "Maheshwari Group of Institutions, Sundargarh",
  },
];

const RESEARCH_AREAS = [
  ["01", "Cancer biology", "Doctoral research interests listed in the CV."],
  ["02", "Bioinformatics", "Computational approaches to biological research."],
  ["03", "Cognition & neuroscience", "Study spanning cognition, the mind and consciousness."],
  ["04", "Biomedical sciences", "Teaching and research experience across life-science subjects."],
];

export default function AstrologerPage() {
  return (
    <SiteLayout className="service-page astrologer-page">
      <main>
        <section className="astrologer-hero" aria-labelledby="astrologer-title">
          <Stars count={110} />
          <div className="astrologer-hero-orbit" aria-hidden="true">
            <span />
          </div>
          <div className="astrologer-hero-inner">
            <div className="astrologer-hero-copy">
              <span className="astrologer-eyebrow"><span aria-hidden="true">✦</span> The person behind Jeevan Jyotish</span>
              <h1 id="astrologer-title">Dr. Jayant <em>Mishra</em></h1>
              <p className="astrologer-hero-lead">
                An educator and researcher with a lifelong curiosity about science,
                consciousness and the traditions that help people reflect on their lives.
              </p>
              <div className="astrologer-specialties" aria-label="Areas of practice">
                <span>Vedic astrology</span>
                <span>Consciousness studies</span>
                <span>Biomedical research</span>
              </div>
              <Link className="btn astrologer-primary-link" to="/appointment">
                Speak with Dr. Mishra <span aria-hidden="true">→</span>
              </Link>
            </div>
            <figure className="astrologer-portrait-card">
              <div className="astrologer-portrait-halo" aria-hidden="true" />
              <img src={jayPortrait} alt="Dr. Jayant Mishra" fetchPriority="high" />
              <figcaption>
                <span>Science · Awareness · Guidance</span>
                <strong>Dr. Jayant Mishra</strong>
              </figcaption>
              <span className="astrologer-portrait-star" aria-hidden="true">✧</span>
            </figure>
          </div>
          <a className="astrologer-scroll-cue" href="#astrologer-profile">
            <span>Discover his journey</span><span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="astrologer-profile-section" id="astrologer-profile" aria-labelledby="profile-heading">
          <div className="astrologer-section-intro">
            <span className="astrologer-section-kicker">A thoughtful perspective</span>
            <h2 id="profile-heading">A life shaped by <em>curiosity</em></h2>
            <p>
              Dr. Mishra brings together a formal background in biomedical sciences and
              bioinformatics with a deep interest in consciousness and Vedic astrology.
              His approach is grounded in learning, listening and helping people find
              perspective—not in promising certain outcomes.
            </p>
          </div>
          <div className="astrologer-facts" aria-label="Career highlights">
            {PROFILE_FACTS.map((fact) => (
              <article className="astrologer-fact" key={fact.label}>
                <strong>{fact.value}</strong>
                <p>{fact.label}</p>
                <small>{fact.source}</small>
              </article>
            ))}
          </div>
          <p className="astrologer-source-note">
            Career and education details are summarized from the supplied curriculum vitae.
            The astrology experience figure is from the Jeevan Jyotish website biography.
          </p>
        </section>

        <section className="astrologer-education-section" aria-labelledby="education-heading">
          <div className="astrologer-section-heading">
            <span className="astrologer-section-kicker">Learning &amp; discovery</span>
            <h2 id="education-heading">Academic <em>foundations</em></h2>
            <p>Studies that span life sciences, research and the study of consciousness.</p>
          </div>
          <div className="astrologer-education-grid">
            {EDUCATION.map((item, index) => (
              <article className="astrologer-education-card" key={item.degree}>
                <span className="astrologer-card-number">0{index + 1}</span>
                <span className="astrologer-degree-icon" aria-hidden="true">{["✧", "◈", "⌘"][index]}</span>
                <h3>{item.degree}</h3>
                <p className="astrologer-institution">{item.institution}</p>
                <p className="astrologer-card-detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="astrologer-research-section" aria-labelledby="research-heading">
          <div className="astrologer-research-heading">
            <span className="astrologer-section-kicker">Academic work</span>
            <h2 id="research-heading">Research with a wider <em>view</em></h2>
            <p>
              The CV describes work and teaching across the biological sciences,
              alongside doctoral research in cancer biology and bioinformatics.
            </p>
          </div>
          <div className="astrologer-research-grid">
            {RESEARCH_AREAS.map(([number, title, description]) => (
              <article className="astrologer-research-card" key={title}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="astrologer-journey-section" aria-labelledby="journey-heading">
          <div className="astrologer-section-heading">
            <span className="astrologer-section-kicker">Selected milestones</span>
            <h2 id="journey-heading">An evolving <em>journey</em></h2>
            <p>Academic roles and appointments documented in the supplied CV.</p>
          </div>
          <ol className="astrologer-timeline">
            {CAREER.map((item) => (
              <li className="astrologer-timeline-item" key={`${item.period}-${item.title}`}>
                <span className="astrologer-timeline-dot" aria-hidden="true" />
                <time>{item.period}</time>
                <div><h3>{item.title}</h3><p>{item.place}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="astrologer-practice-section" aria-labelledby="practice-heading">
          <span className="astrologer-practice-symbol" aria-hidden="true">☼</span>
          <div>
            <span className="astrologer-section-kicker">Beyond the classroom</span>
            <h2 id="practice-heading">Guidance rooted in <em>reflection</em></h2>
            <p>
              Jeevan Jyotish describes Dr. Mishra’s work in astrology, meditation,
              Kriya Yoga, Reiki, Feng Shui, tarot and rune-casting. These traditions
              are offered as personal and cultural guidance, not as a substitute for
              medical, financial or other professional advice.
            </p>
            <Link className="astrologer-text-link" to="/services/horoscope">
              Explore astrology services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="astrologer-contact-section">
          <Stars count={28} />
          <span className="astrologer-section-kicker">Your questions, your pace</span>
          <h2>Start with a <em>conversation</em></h2>
          <p>Reach out to arrange a personal consultation with Jeevan Jyotish.</p>
          <Link className="btn" to="/appointment">Book an appointment <span aria-hidden="true">→</span></Link>
        </section>
      </main>
    </SiteLayout>
  );
}
