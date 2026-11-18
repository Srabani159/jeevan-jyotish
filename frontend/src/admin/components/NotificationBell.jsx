import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../lib/api.js";

const POLL_MS = 15000;

function timeAgo(value) {
  const seconds = Math.max(0, (Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function NotificationBell({ onSessionExpired, onNew }) {
  const navigate = useNavigate();
  const [data, setData] = useState({ unread: 0, items: [] });
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const lastUnread = useRef(null);

  const load = useCallback(async () => {
    try {
      const result = await apiRequest("admin/notifications");
      if (lastUnread.current !== null && result.unread > lastUnread.current) {
        onNew?.(result.unread - lastUnread.current);
      }
      lastUnread.current = result.unread;
      setData(result);
    } catch (error) {
      if (error.message.includes("sign in")) onSessionExpired?.();
      else console.error("Notifications could not be loaded:", error.message);
    }
  }, [onNew, onSessionExpired]);

  useEffect(() => {
    load();
    const timer = setInterval(load, POLL_MS);
    return () => clearInterval(timer);
  }, [load]);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markAllRead = async () => {
    try {
      await apiRequest("admin/notifications/read", { method: "POST" });
      lastUnread.current = 0;
      setData({ unread: 0, items: [] });
    } catch { /* keep current state */ }
  };

  const openAppointments = () => {
    setOpen(false);
    markAllRead();
    navigate("/admin/appointments");
  };

  return (
    <div className="adm-bell" ref={rootRef}>
      <button
        type="button"
        className="adm-icon-btn"
        aria-label={`Notifications, ${data.unread} unread`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        {data.unread > 0 && <span className="adm-badge">{data.unread > 99 ? "99+" : data.unread}</span>}
      </button>
      {open && (
        <div className="adm-dropdown" role="menu">
          <div className="adm-dropdown-head">
            <strong>Notifications</strong>
            {data.unread > 0 && <button type="button" onClick={markAllRead}>Mark all read</button>}
          </div>
          {data.items.length ? (
            <ul>
              {data.items.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={openAppointments}>
                    <span className="adm-dot" aria-hidden="true" />
                    <span>
                      <b>New appointment from {item.name}</b>
                      <small>{item.service} · {timeAgo(item.createdAt)}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="adm-dropdown-empty">You’re all caught up.</p>
          )}
          <button type="button" className="adm-dropdown-foot" onClick={openAppointments}>View all appointments</button>
        </div>
      )}
    </div>
  );
}
