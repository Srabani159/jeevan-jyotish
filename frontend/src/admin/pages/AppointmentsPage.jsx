import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { phoneHref } from "../../context/ContactContext.jsx";
import { apiRequest } from "../../lib/api.js";
import { useAdminAuth } from "../AdminAuth.jsx";
import Pagination from "../components/Pagination.jsx";

const POLL_MS = 5000;
const STATUS_OPTIONS = [["new", "New"], ["contacted", "Contacted"], ["resolved", "Resolved"]];

const formatDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString();
};

export default function AppointmentsPage() {
  const { toast } = useOutletContext();
  const { expireSession } = useAdminAuth();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const silent = useRef(false);

  // Background refresh so new appointments appear without a manual reload.
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return;
      silent.current = true;
      setReloadKey((k) => k + 1);
    }, POLL_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    let active = true;
    const query = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (status !== "all") query.set("status", status);
    if (search) query.set("search", search);
    if (!silent.current) setLoading(true);
    silent.current = false;
    apiRequest(`admin/enquiries?${query}`)
      .then((result) => {
        if (!active) return;
        setRows(result.enquiries);
        setTotal(result.total);
        const last = Math.max(1, Math.ceil(result.total / pageSize));
        if (page > last) setPage(last);
      })
      .catch((error) => {
        if (!active) return;
        if (error.message.includes("sign in")) expireSession();
        else toast(error.message, "error");
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [page, pageSize, status, search, reloadKey, toast, expireSession]);

  const changeStatus = async (id, next) => {
    try {
      await apiRequest(`admin/enquiries/${id}/status`, { method: "PATCH", body: { status: next } });
      toast("Status updated.", "success");
      setReloadKey((k) => k + 1);
    } catch (error) {
      toast(error.message, "error");
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Permanently delete the appointment from ${row.name}?`)) return;
    try {
      await apiRequest(`admin/enquiries/${row.id}`, { method: "DELETE" });
      toast("Appointment deleted.", "success");
      setReloadKey((k) => k + 1);
    } catch (error) {
      toast(error.message, "error");
    }
  };

  return (
    <section className="adm-card">
      <div className="adm-toolbar">
        <input
          type="search"
          className="adm-search"
          placeholder="Search name, email or phone…"
          aria-label="Search appointments"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <label className="adm-inline-select">
          Status
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="all">All</option>
            {STATUS_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th>#</th><th>Name</th><th>Contact</th><th>Service</th><th>Received</th><th>Status</th><th aria-label="Actions" /></tr>
          </thead>
          <tbody>
            {loading && !rows.length ? (
              <tr><td colSpan={7} className="adm-table-empty">Loading…</td></tr>
            ) : rows.length ? rows.flatMap((row) => [
              <tr key={row.id} className={loading ? "is-stale" : ""}>
                <td>{row.id}</td>
                <td><b>{row.name}</b></td>
                <td>
                  <a href={`mailto:${row.email}`}>{row.email}</a><br />
                  <a href={phoneHref(row.phone)}>{row.phone}</a>
                </td>
                <td>{row.service}</td>
                <td>{formatDate(row.createdAt)}</td>
                <td>
                  <select className={`adm-status is-${row.status}`} value={row.status}
                    aria-label={`Status for appointment ${row.id}`}
                    onChange={(e) => changeStatus(row.id, e.target.value)}>
                    {STATUS_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </td>
                <td className="adm-actions">
                  <button type="button" onClick={() => setExpanded(expanded === row.id ? null : row.id)}>
                    {expanded === row.id ? "Hide" : "Details"}
                  </button>
                  <button type="button" className="is-danger" onClick={() => remove(row)}>Delete</button>
                </td>
              </tr>,
              expanded === row.id && (
                <tr key={`${row.id}-d`} className="adm-details-row">
                  <td colSpan={7}>
                    <dl>
                      <div><dt>Date of birth</dt><dd>{String(row.dateOfBirth).slice(0, 10)}</dd></div>
                      <div><dt>Gender</dt><dd>{row.gender}</dd></div>
                      <div><dt>Address</dt><dd>{row.address || "—"}</dd></div>
                      <div><dt>Reason</dt><dd>{row.reason || "—"}</dd></div>
                    </dl>
                  </td>
                </tr>
              ),
            ]) : (
              <tr><td colSpan={7} className="adm-table-empty">No appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        disabled={loading}
        onPageChange={setPage}
        onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
      />
    </section>
  );
}
