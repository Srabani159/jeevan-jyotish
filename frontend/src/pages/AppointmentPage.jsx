import { useEffect, useState } from "react";
import { Chakra, Stars } from "../components/astrology/AstroEffects.jsx";
import SiteLayout from "../components/layout/SiteLayout.jsx";
import { apiRequest } from "../lib/api.js";
import { phoneHref, useContact } from "../context/ContactContext.jsx";
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
  const [submitting, setSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!showSuccess) return undefined;
    const onKey = (event) => event.key === "Escape" && setShowSuccess(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setSubmissionMessage(null);

    try {
      await apiRequest("enquiries", {
        method: "POST",
        body: {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("mobile"),
          gender: formData.get("gender"),
          service: formData.get("service"),
          dateOfBirth: formData.get("dob"),
          address: formData.get("address"),
          reason: formData.get("reason"),
          declarationAccepted,
        },
      });
      form.reset();
      setDeclarationAccepted(false);
      setSubmissionMessage({ type: "success", text: "Thank you. Your enquiry has been received, and our team will be in touch." });
      setShowSuccess(true);
    } catch (error) {
      setSubmissionMessage({ type: "error", text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="appointment-form-heading">
        <span className="section-kicker">Private consultation request</span>
        <h2>Make an appointment</h2>
        <p>Share a few details so our team can follow up about your consultation.</p>
      </div>

      <div className="appointment-fields">
        <label className="appointment-field">
          <span>Name <b aria-hidden="true">*</b></span>
          <input autoComplete="name" maxLength={120} name="name" placeholder="Your full name" required />
        </label>
        <label className="appointment-field">
          <span>Email <b aria-hidden="true">*</b></span>
          <input autoComplete="email" maxLength={254} name="email" type="email" placeholder="you@example.com" required />
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
          <textarea autoComplete="street-address" maxLength={2000} name="address" placeholder="Your address (optional)" rows={3} />
        </label>
        <label className="appointment-field appointment-field--wide">
          <span>Reason for appointment</span>
          <textarea maxLength={4000} name="reason" placeholder="How can we help? (optional)" rows={4} />
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
          I consent to Jeevan Jyotish storing the details above, including
          my date of birth and any optional information, so the team can respond
          to my enquiry. I understand consultation suggestions are for guidance.
        </span>
      </label>

      <button className="btn appointment-submit" type="submit" disabled={submitting}>
        {submitting ? "Sending enquiry…" : "Send appointment request"} {!submitting && <span aria-hidden="true">→</span>}
      </button>
      <p className={`appointment-form-note${submissionMessage ? ` is-${submissionMessage.type}` : ""}`} aria-live="polite">
        {submissionMessage?.text || "Your enquiry will be available to authorized administrators for follow-up. Optional fields may be left blank."}
      </p>
      {showSuccess && (
        <div className="appointment-success-overlay" onClick={() => setShowSuccess(false)}>
          <div
            className="appointment-success-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="appointment-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="appointment-success-icon" aria-hidden="true">✓</span>
            <h3 id="appointment-success-title">Appointment request sent!</h3>
            <p>Thank you. Your request has been received and our team will contact you shortly.</p>
            <button type="button" className="btn" autoFocus onClick={() => setShowSuccess(false)}>Done</button>
          </div>
        </div>
      )}
    </form>
  );
}

export default function AppointmentPage() {
  const { phone, email, address } = useContact();

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
              <a href={phoneHref(phone)}>Call {phone}</a>
              <span aria-hidden="true">✦</span>
              <a href={`mailto:${email}`}>Email us</a>
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
                <a href={phoneHref(phone)}>
                  <span className="appointment-detail-icon" aria-hidden="true">☎</span>
                  <span><small>Call us</small>{phone}</span>
                </a>
                <a href={`mailto:${email}`}>
                  <span className="appointment-detail-icon" aria-hidden="true">@</span>
                  <span><small>Email</small>{email}</span>
                </a>
                <div>
                  <span className="appointment-detail-icon" aria-hidden="true">⌖</span>
                  <span><small>Visit us</small>{address}</span>
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
