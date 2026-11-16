import { FloatingIcons } from "../astrology/AstroEffects.jsx";
import SiteFooter from "./SiteFooter.jsx";
import SiteHeader from "./SiteHeader.jsx";

export default function SiteLayout({ children, className = "service-page", isHome = false, style }) {
  return (
    <div className={className} style={style}>
      <FloatingIcons />
      <SiteHeader isHome={isHome} />
      {children}
      <SiteFooter />
    </div>
  );
}
