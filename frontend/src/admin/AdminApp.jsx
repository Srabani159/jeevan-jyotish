import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuth.jsx";
import AdminLayout from "./AdminLayout.jsx";
import AppointmentsPage from "./pages/AppointmentsPage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "../styles/admin.css";
import "../styles/admin-layout.css";

function RequireAdmin({ children }) {
  const { adminEmail, checking } = useAdminAuth();
  const location = useLocation();
  if (checking) {
    return <main className="admin-page"><p className="admin-loading" role="status">Checking admin session…</p></main>;
  }
  if (!adminEmail) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return children;
}

// Self-contained admin module, mounted at /admin/* — register new pages here.
export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="company" element={<CompanyPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
