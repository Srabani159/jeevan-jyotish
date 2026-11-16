import React, { useState } from "react";
import { Link } from "react-router-dom";

const MENU = [
  { title: "Home", id: "home" },
  { title: "About Us", id: "about", path: "/astrologer" },
  {
    title: "Astrology",
    items: [
      ["Horoscope", "horoscope"],
      ["Numerology", "numerology"],
      ["Tarot Card", "tarot"],
      ["Palmistry", "palmistry"],
      ["Vastu Shastra", "vastu"],
      ["Rune-Casting", "rune-casting"],
    ],
  },
  { title: "Remedies", items: [["Gemstones", "gemstones"], ["Pooja", "pooja"]] },
  { title: "Shop", id: "shop", path: "/shop" },
  { title: "Gallery", id: "gallery", path: "/gallery" },
  { title: "Appointment", id: "appointment", path: "/appointment" },
];

function Logo({ size = 64 }) {
  const signs = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 100 100" aria-label="Jeevan Jyotish logo">
      <circle cx="50" cy="50" r="48" fill="#1a1f6b" stroke="#d4a62a" strokeWidth="3" />
      <circle cx="50" cy="50" r="30" fill="#0a0a1f" stroke="#d4a62a" strokeWidth="1.5" />
      <g className="spin-slow" style={{ transformOrigin: "50px 50px" }}>
        {signs.map((sign, index) => {
          const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
          return (
            <text
              key={sign}
              x={50 + 39 * Math.cos(angle)}
              y={50 + 39 * Math.sin(angle)}
              fontSize="9"
              fill="#f2c14e"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {sign}
            </text>
          );
        })}
      </g>
      <circle cx="50" cy="50" r="12" fill="#d4a62a" />
      <circle cx="50" cy="50" r="6" fill="#0a0a1f" />
    </svg>
  );
}

export default function SiteHeader({ isHome = false }) {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const closeMenu = () => {
    setOpen(false);
    setSubmenu(null);
  };
  const sectionPath = (id) => isHome ? `#${id}` : `/#${id}`;
  const servicePath = (id) => `/services/${id}`;

  return (
    <>
     <div className="topbar">
  <div className="topbar-inner">
    <a href="tel:+917008259050">📞 +91-7008259050</a>
    <a href="mailto:acharyajayantji@gmail.com">✉️ acharyajayantji@gmail.com</a>
    <span className="free">
      <span className="free-dot" />
      Free first consultation
    </span>
  </div>
</div>

      <header className="nav">
        <Link to={sectionPath("home")} className="brand" onClick={closeMenu}>
          <Logo size={64} />
          <span>Jeevan<b>Jyotish</b></span>
        </Link>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <nav className={open ? "open" : ""}>
          {MENU.map((item) => item.items ? (
            <div key={item.title} className={"has-sub" + (submenu === item.title ? " show" : "")}>
              <button
                className="sub-toggle"
                aria-haspopup="true"
                aria-expanded={submenu === item.title}
                onClick={() => setSubmenu(submenu === item.title ? null : item.title)}
              >
                {item.title} <span className="caret" aria-hidden="true">▾</span>
              </button>
              <div className="submenu">
                {item.items.map(([title, id]) => (
                  <Link key={id} to={servicePath(id)} onClick={closeMenu}>{title}</Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.id} to={item.path || sectionPath(item.id)} onClick={closeMenu}>{item.title}</Link>
          ))}
        </nav>
      </header>
    </>
  );
}
