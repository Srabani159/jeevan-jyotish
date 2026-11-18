import React from "react";
import { Link } from "react-router-dom";
import rishiImage from "../../assets/rishi.png";
import { Chakra, Stars } from "../astrology/AstroEffects.jsx";
import { phoneHref, useContact } from "../../context/ContactContext.jsx";

const OTHER_SERVICES = [
  "Navgraha Shanti",
  "Maanglik Dosh Nivaran",
  "Kaal Sarp Dosh Nivaran",
  "Griha Klesh Nivaran",
  "Pitra Dosh Remedy",
];

const QUICK_LINKS = [
  "Laxmi Prapti Yagya",
  "Vaastu Dosh Nivaran",
  "Career Problem Removal",
  "Black Magic Removal",
  "Mahamrityunjay Pujan",
];

export default function SiteFooter() {
  const appointmentPath = "/appointment";
  const galleryPath = "/gallery";
  const { phone, email, address } = useContact();

  return (
    <footer className="site-footer">
      <Stars count={34} />
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-rishi-visual">
            <div className="footer-rishi-chakra" aria-hidden="true"><Chakra /></div>
            <img
              className="footer-rishi-image"
              src={rishiImage}
              alt="Rishi writing beneath a zodiac chakra"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="footer-column">
          <h2>Other Services</h2>
          {OTHER_SERVICES.map((service) => (
            <Link key={service} to={appointmentPath}>{service}</Link>
          ))}
        </div>
        <div className="footer-column">
          <h2>Quick Links</h2>
          {QUICK_LINKS.map((service) => (
            <Link key={service} to={appointmentPath}>{service}</Link>
          ))}
        </div>
        <div className="footer-column footer-contact">
          <h2>Get In Touch</h2>
          <p><span aria-hidden="true">⌖</span> {address}</p>
          <a href={`mailto:${email}`}><span aria-hidden="true">@</span> {email}</a>
          <a href={phoneHref(phone)}><span aria-hidden="true">☎</span> {phone}</a>
          <Link to={galleryPath}><span aria-hidden="true">▧</span> Gallery</Link>
        </div>
      </div>
    <div className="footer-bottom">
  <p>© {new Date().getFullYear()} Jeevan Jyotish. All rights reserved.</p>
  <p>
    For Website Development, Contact:{" "}
    <a href="tel:8249752938">8249752938</a>
  </p>
</div>
    </footer>
  );
}
