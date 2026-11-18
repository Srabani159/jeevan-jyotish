import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FALLBACK_CONTACT, useContact } from "../../context/ContactContext.jsx";
import { apiRequest } from "../../lib/api.js";
import { useAdminAuth } from "../AdminAuth.jsx";

export default function CompanyPage() {
  const { toast } = useOutletContext();
  const { updateContact } = useContact();
  const { expireSession } = useAdminAuth();
  const [contact, setContact] = useState({ phone: "", email: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    apiRequest("admin/contact")
      .then(({ contact: c }) => active && setContact({ phone: c.phone || "", email: c.email || "", address: c.address || "" }))
      .catch((error) => {
        if (!active) return;
        if (error.message.includes("sign in")) expireSession();
        else toast(error.message, "error");
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [toast, expireSession]);

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const result = await apiRequest("admin/contact", { method: "PUT", body: contact });
      updateContact(result.contact);
      toast("Company details saved.", "success");
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="admin-loading" role="status">Loading company details…</p>;

  return (
    <section className="adm-card adm-narrow">
      <div className="adm-card-head">
        <div>
          <h2>Public contact details</h2>
          <p>Saved values appear across the website; leave a field blank to use its static fallback.</p>
        </div>
      </div>
      <form className="admin-contact-form" onSubmit={save}>
        <label>
          Phone number
          <input type="tel" autoComplete="tel" maxLength={32} placeholder={FALLBACK_CONTACT.phone}
            value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          <small>Static fallback: {FALLBACK_CONTACT.phone}</small>
        </label>
        <label>
          Email address
          <input type="email" autoComplete="email" maxLength={254} placeholder={FALLBACK_CONTACT.email}
            value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
          <small>Static fallback: {FALLBACK_CONTACT.email}</small>
        </label>
        <label>
          Address
          <textarea rows={3} maxLength={500} placeholder={FALLBACK_CONTACT.address}
            value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
          <small>Static fallback: {FALLBACK_CONTACT.address}</small>
        </label>
        <button type="submit" className="admin-primary-button" disabled={saving}>{saving ? "Saving…" : "Save company details"}</button>
      </form>
    </section>
  );
}
