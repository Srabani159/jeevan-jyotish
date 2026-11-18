import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../AdminAuth.jsx";

export default function LoginPage() {
  const { adminEmail, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (adminEmail) return <Navigate to={location.state?.from || "/admin"} replace />;

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(credentials);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.message);
      setCredentials((c) => ({ ...c, password: "" }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="admin-page admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <a className="admin-brand" href="/">Jeevan Jyotish <span>Admin</span></a>
        <p className="admin-eyebrow">Administration</p>
        <h1 id="admin-login-title">Sign in</h1>
        <p className="admin-login-intro">Use the administrator credentials configured in the backend seeder.</p>
        {error && <p className="admin-message is-error" role="alert">{error}</p>}
        <form onSubmit={submit}>
          <label>
            Email
            <input autoComplete="username" type="email" value={credentials.email} required
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
          </label>
          <label>
            Password
            <input autoComplete="current-password" type="password" value={credentials.password} required
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
          </label>
          <button type="submit" className="admin-primary-button" disabled={busy}>{busy ? "Signing in…" : "Sign in to admin"}</button>
        </form>
        <a className="admin-back-link" href="/">← Back to website</a>
      </section>
    </main>
  );
}
