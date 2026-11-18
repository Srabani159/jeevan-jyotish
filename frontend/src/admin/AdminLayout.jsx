import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth.jsx";
import NotificationBell from "./components/NotificationBell.jsx";
import Toasts, { useToasts } from "./components/Toasts.jsx";

const icon = (d) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

// Add future modules here — each entry becomes a sidebar link.
export const NAV_ITEMS = [
  { to: "/admin", end: true, label: "Dashboard", title: "Dashboard", icon: icon(<><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>) },
  { to: "/admin/appointments", label: "Appointments", title: "Appointments", icon: icon(<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>) },
  { to: "/admin/company", label: "Company details", title: "Company details", icon: icon(<><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /><path d="M9 9v.01M9 13v.01M9 17v.01" /></>) },
];

export default function AdminLayout() {
  const { adminEmail, logout, expireSession } = useAdminAuth();
  const { toasts, push, dismiss } = useToasts();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => setMenuOpen(false), [pathname]);

  const current = NAV_ITEMS.find((item) => (item.end ? pathname === item.to : pathname.startsWith(item.to)));

  const handleNew = useCallback((count) => {
    push(`${count} new appointment request${count > 1 ? "s" : ""} received.`, "info");
  }, [push]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      push(error.message, "error");
    }
  };

  return (
    <div className="adm-shell">
      <aside className={`adm-sidebar${menuOpen ? " is-open" : ""}`} aria-label="Admin navigation">
        <Link to="/admin" className="adm-logo">
          <span className="adm-logo-mark" aria-hidden="true">✦</span>
          <span>Jeevan Jyotish<small>Admin panel</small></span>
        </Link>
        <nav>
          <p className="adm-nav-label">Menu</p>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `adm-nav-link${isActive ? " is-active" : ""}`}>
              {item.icon}<span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="adm-sidebar-foot">
          <a href="/" target="_blank" rel="noreferrer" className="adm-nav-link">
            {icon(<><path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>)}
            <span>View website</span>
          </a>
        </div>
      </aside>
      {menuOpen && <button type="button" className="adm-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <div className="adm-main">
        <header className="adm-header">
          <button type="button" className="adm-icon-btn adm-menu-btn" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            {icon(<path d="M4 6h16M4 12h16M4 18h16" />)}
          </button>
          <h1 className="adm-header-title">{current?.title || "Admin"}</h1>
          <div className="adm-header-actions">
            <NotificationBell onNew={handleNew} onSessionExpired={expireSession} />
            <div className="adm-profile">
              <span className="adm-avatar" aria-hidden="true">{adminEmail.charAt(0).toUpperCase()}</span>
              <span className="adm-profile-email">{adminEmail}</span>
            </div>
            <button type="button" className="adm-logout" onClick={handleLogout}>Sign out</button>
          </div>
        </header>
        <main className="adm-content">
          <Outlet context={{ toast: push }} />
        </main>
      </div>
      <Toasts toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
