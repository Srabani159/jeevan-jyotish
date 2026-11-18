import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { apiRequest } from "../../lib/api.js";
import { useAdminAuth } from "../AdminAuth.jsx";

const STATUS_LABEL = { new: "New", contacted: "Contacted", resolved: "Resolved" };

export default function DashboardPage() {
  const { toast } = useOutletContext();
  const { expireSession } = useAdminAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    apiRequest("admin/dashboard")
      .then((result) => active && setData(result))
      .catch((error) => {
        if (!active) return;
        if (error.message.includes("sign in")) expireSession();
        else toast(error.message, "error");
      });
    return () => { active = false; };
  }, [toast, expireSession]);

  if (!data) return <p className="admin-loading" role="status">Loading dashboard…</p>;

  const { stats, byService, recent } = data;
  const cards = [
    ["Total appointments", stats.total, ""],
    ["New", stats.new, "is-gold"],
    ["Contacted", stats.contacted, ""],
    ["Resolved", stats.resolved, "is-green"],
    ["Last 7 days", stats.last7Days, ""],
  ];
  const max = Math.max(1, ...byService.map((s) => s.count));

  return (
    <>
      <div className="adm-stats">
        {cards.map(([label, value, tone]) => (
          <div className={`adm-stat ${tone}`} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="adm-grid-2">
        <section className="adm-card">
          <div className="adm-card-head"><h2>Recent appointments</h2><Link to="/admin/appointments">View all</Link></div>
          {recent.length ? (
            <ul className="adm-recent">
              {recent.map((item) => (
                <li key={item.id}>
                  <div><b>{item.name}</b><small>{item.service}</small></div>
                  <span className={`adm-pill is-${item.status}`}>{STATUS_LABEL[item.status]}</span>
                </li>
              ))}
            </ul>
          ) : <p className="admin-empty">No appointments yet.</p>}
        </section>

        <section className="adm-card">
          <div className="adm-card-head"><h2>Popular services</h2></div>
          {byService.length ? (
            <ul className="adm-bars">
              {byService.map((item) => (
                <li key={item.service}>
                  <div><span>{item.service}</span><b>{item.count}</b></div>
                  <div className="adm-bar"><i style={{ width: `${(item.count / max) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          ) : <p className="admin-empty">No data yet.</p>}
        </section>
      </div>
    </>
  );
}
