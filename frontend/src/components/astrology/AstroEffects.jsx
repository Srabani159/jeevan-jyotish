import { useMemo } from "react";

const ZODIAC = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
  .map((sign) => sign + "\uFE0E");

const ICONS = [
  "🕉️", "🪐", "🌙", "☀️", "✋", "👁️", "🦶", "🔮", "🪔", "💎", "🔱", "⭐",
  ...ZODIAC, "🧿", "🤲", "👣", "🌟",
];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export function Stars({ count }) {
  const stars = useMemo(() => Array.from({ length: count }, () => ({
    x: randomBetween(0, 100),
    y: randomBetween(0, 100),
    size: randomBetween(1, 3),
    twinkleDuration: randomBetween(2, 6),
    twinkleDelay: randomBetween(0, 6),
    driftDuration: randomBetween(60, 140),
  })), [count]);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDuration: `${star.twinkleDuration}s, ${star.driftDuration}s`,
            animationDelay: `${star.twinkleDelay}s, 0s`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingIcons({ local = false }) {
  const items = useMemo(() => ICONS.map((icon) => ({
    icon,
    x: randomBetween(0, 96),
    size: randomBetween(22, 46),
    duration: randomBetween(28, 60),
    delay: randomBetween(-60, 0),
    sway: randomBetween(20, 70),
    opacity: randomBetween(0.12, 0.28),
  })), []);

  return (
    <div className={local ? "float-icons local" : "float-icons"} aria-hidden="true">
      {items.map((item, index) => (
        <span
          key={index}
          style={{
            left: `${item.x}%`,
            fontSize: item.size,
            opacity: local ? Math.min(item.opacity * 1.6, 0.4) : item.opacity,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            "--sway": `${item.sway}px`,
          }}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}

export function Chakra() {
  return (
    <div className="chakra-wrap">
      <svg className="chakra" viewBox="0 0 400 400" role="img" aria-label="Rotating zodiac chakra">
        <circle cx="200" cy="200" r="196" fill="#1f1b05" stroke="#d4a62a" strokeWidth="3" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#d4a62a" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="105" fill="#0e0c02" stroke="#d4a62a" strokeWidth="2" />
        {ZODIAC.map((sign, index) => {
          const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + 173 * Math.cos(angle);
          const y = 200 + 173 * Math.sin(angle);
          const innerX = 200 + 128 * Math.cos(angle);
          const innerY = 200 + 128 * Math.sin(angle);

          return (
            <g key={sign}>
              <circle cx={x} cy={y} r="26" fill="#2a2508" stroke="#d4a62a" strokeWidth="2" />
              <text x={x} y={y} fontSize="30" fill="#f2c14e" textAnchor="middle" dominantBaseline="central">{sign}</text>
              <text x={innerX} y={innerY} fontSize="14" fill="#d4a62a" textAnchor="middle" dominantBaseline="central">{index + 1}</text>
            </g>
          );
        })}
        {Array.from({ length: 24 }, (_, index) => {
          const angle = (index / 24) * Math.PI * 2;
          return (
            <line
              key={index}
              x1={200 + 60 * Math.cos(angle)}
              y1={200 + 60 * Math.sin(angle)}
              x2={200 + 98 * Math.cos(angle)}
              y2={200 + 98 * Math.sin(angle)}
              stroke="#f2c14e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="200" cy="200" r="48" fill="#f2c14e" />
        <circle cx="200" cy="200" r="30" fill="#0e0c02" />
        <text x="200" y="200" fontSize="36" fill="#f2c14e" textAnchor="middle" dominantBaseline="central">{"🕉\uFE0E"}</text>
      </svg>
    </div>
  );
}
