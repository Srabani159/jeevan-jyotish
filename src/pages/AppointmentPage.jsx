import { useState } from "react";
import { Chakra, Stars } from "../components/astrology/AstroEffects.jsx";
import SiteLayout from "../components/layout/SiteLayout.jsx";
import partnerImage from "../assets/RJ.jpeg";

const SERVICE_OPTIONS = [
  "Kundli Services",
  "Horoscope Services",
  "Tarot Card Services",
  "Palmistry Services",
  "Vastu Shastra Services",
  "Gemstones Services",
  "Numerology Services",
  "Rune-Casting Services",
  "Pooja Services",
  "Baby Names By Nakshatra",
];

const BRANCHES = [
  {
    city: "Lucknow",
    region: "Uttar Pradesh",
    contact: "Lav Ji Jhingran",
    phone: "9696775776",
    icon: "⌖",
  },
  {
    city: "Bhubaneswar",
    region: "Odisha",
    contact: "",
    phone: "",
    icon: "✧",
  },
  {
    city: "Sundargarh",
    region: "Odisha",
    contact: "Dr. Jayant Mishra",
    phone: "8417053550",
    icon: "☼",
  },
];

const CONSULTATION_TOPICS = [
  "Horoscope casting and yearly predictions",
  "Career and business guidance",
  "Horoscope engineering",
  "Evil-eye concerns",
  "Fortune-changing rituals",
  "Healing sessions",
  "Home and place-related remedies",
  "Black-magic concerns",
];

function AppointmentForm() {
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const subject = `Appointment request - ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${formData.get("email")}`,
      `Mobile: ${formData.get("mobile")}`,
      `Gender: ${formData.get("gender")}`,
      `Service: ${formData.get("service")}`,
      `Date of birth: ${formData.get("dob")}`,
      `Address: ${formData.get("address") || "Not provided"}`,
      `Reason for appointment: ${formData.get("reason") || "Not provided"}`,
    ].join("\n");

    window.location.href = `mailto:acharyajayantji@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="appointment-form-heading">
        <span className="section-kicker">Private consultation request</span>
        <h2>Make an appointment</h2>
        <p>Share a few details so we can prepare for your consultation.</p>
      </div>

      <div className="appointment-fields">
        <label className="appointment-field">
          <span>Name <b aria-hidden="true">*</b></span>
          <input autoComplete="name" name="name" placeholder="Your full name" required />
        </label>
        <label className="appointment-field">
          <span>Email <b aria-hidden="true">*</b></span>
          <input autoComplete="email" name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label className="appointment-field">
          <span>Mobile number <b aria-hidden="true">*</b></span>
          <input
            autoComplete="tel-national"
            inputMode="numeric"
            maxLength={10}
            name="mobile"
            pattern="[0-9]{10}"
            placeholder="10-digit mobile number"
            required
            title="Enter a 10-digit mobile number"
          />
        </label>
        <label className="appointment-field">
          <span>Gender <b aria-hidden="true">*</b></span>
          <select name="gender" defaultValue="" required>
            <option value="" disabled>Select gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
        <label className="appointment-field">
          <span>Service <b aria-hidden="true">*</b></span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
        <label className="appointment-field">
          <span>Date of birth <b aria-hidden="true">*</b></span>
          <input name="dob" type="date" required />
        </label>
        <label className="appointment-field appointment-field--wide">
          <span>Address</span>
          <textarea autoComplete="street-address" name="address" placeholder="Your address (optional)" rows={3} />
        </label>
        <label className="appointment-field appointment-field--wide">
          <span>Reason for appointment</span>
          <textarea name="reason" placeholder="How can we help? (optional)" rows={4} />
        </label>
      </div>

      <label className="appointment-declaration">
        <input
          checked={declarationAccepted}
          onChange={(event) => setDeclarationAccepted(event.target.checked)}
          required
          type="checkbox"
        />
        <span>
          I understand that consultation suggestions are for guidance, and I am
          responsible for my own decisions and outcomes.
        </span>
      </label>

      <button className="btn appointment-submit" type="submit">
        Prepare appointment email <span aria-hidden="true">→</span>
      </button>
      <p className="appointment-form-note">
        Submitting opens your email app with a draft for you to review and send.
        This page does not store your form details.
      </p>
    </form>
  );
}

export default function AppointmentPage() {
  return (
    <SiteLayout className="service-page appointment-page">
      <main>
        <section className="service-page-hero appointment-page-hero">
          <Stars count={130} />
          <div className="service-page-chakra" aria-hidden="true">
            <Chakra />
          </div>
          <div className="service-page-hero-content">
            <span className="section-kicker">Let’s talk about your path</span>
            <h1>Book an Appointment</h1>
            <p>
              Every consultation is personal. Tell us what guidance you’re
              looking for and we’ll help you take the next step.
            </p>
            <a className="btn appointment-hero-cta" href="#appointment-request">
              Request a consultation
            </a>
            <div className="appointment-hero-contact">
              <a href="tel:+918417053550">Call +91 84170 53550</a>
              <span aria-hidden="true">✦</span>
              <a href="mailto:acharyajayantji@gmail.com">Email us</a>
            </div>
          </div>
        </section>

        <section className="appointment-request-section" id="appointment-request">
          <Stars count={60} />
          <div className="appointment-request-layout">
            <aside className="appointment-contact-card">
              <span className="section-kicker">Get in touch</span>
              <h2>Let’s find a time to talk.</h2>
              <p>
                Jyotish traditions have been studied in India for generations.
                We believe every person is unique, and every conversation should
                be thoughtful, personal and respectful.
              </p>
              <div className="appointment-contact-details">
                <a href="tel:+918417053550">
                  <span className="appointment-detail-icon" aria-hidden="true">☎</span>
                  <span><small>Call us</small>+91-8417053550</span>
                </a>
                <a href="mailto:acharyajayantji@gmail.com">
                  <span className="appointment-detail-icon" aria-hidden="true">@</span>
                  <span><small>Email</small>acharyajayantji@gmail.com</span>
                </a>
                <div>
                  <span className="appointment-detail-icon" aria-hidden="true">⌖</span>
                  <span><small>Visit us</small>New Amlipali, Sundargarh, Odisha 770001</span>
                </div>
              </div>
              <div className="appointment-contact-note">
                <span aria-hidden="true">✧</span>
                <p>Share only the information you’re comfortable including in an email.</p>
              </div>
            </aside>

            <div className="appointment-form-card">
              <AppointmentForm />
            </div>
          </div>
        </section>

        <section className="appointment-branches-section">
          <Stars count={45} />
          <div className="appointment-section-heading">
            <span className="section-kicker">Here when you need us</span>
            <h2>Our <span>Branches</span></h2>
            <p>Connect with the branch nearest to you.</p>
          </div>
          <div className="appointment-branch-grid">
            {BRANCHES.map((branch) => (
              <article className="appointment-branch-card" key={branch.city}>
                <span className="appointment-branch-icon" aria-hidden="true">{branch.icon}</span>
                <h3>{branch.city}</h3>
                <p>{branch.region}</p>
                {branch.contact && <strong>{branch.contact}</strong>}
                {branch.phone ? (
                  <a href={`tel:+91${branch.phone}`}>+91 {branch.phone}</a>
                ) : (
                  <span className="appointment-branch-note">Contact us for details</span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="appointment-more-section">
          <div className="appointment-more-inner">
            <div className="appointment-topics">
              <span className="section-kicker">How we can help</span>
              <h2>Consultation <span>Topics</span></h2>
              <p>Choose a topic in the form or mention your question when you contact us.</p>
              <ul>
                {CONSULTATION_TOPICS.map((topic) => (
                  <li key={topic}><span aria-hidden="true">✦</span>{topic}</li>
                ))}
              </ul>
              <p className="appointment-topics-note">
                Consultations and remedies are discussed personally; specific
                recommendations depend on your consultation.
              </p>
            </div>
            <aside className="appointment-partner-card">
              <span className="section-kicker">Our partner</span>
              <img src={partnerImage} alt="Shree Radhika Jewellers advertisement" loading="lazy" decoding="async" />
              <h3>Shree Radhika Jewellers</h3>
              <p>Aapo Surya Bhavah</p>
            </aside>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
