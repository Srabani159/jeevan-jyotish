import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../lib/api.js";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminEmail, setAdminEmail] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    apiRequest("admin/session")
      .then((result) => {
        if (active && result.authenticated) setAdminEmail(result.email);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => { active = false; };
  }, []);

  const login = useCallback(async (credentials) => {
    const result = await apiRequest("admin/login", { method: "POST", body: credentials });
    setAdminEmail(result.email);
  }, []);

  const logout = useCallback(async () => {
    await apiRequest("admin/logout", { method: "POST" });
    setAdminEmail("");
  }, []);

  const expireSession = useCallback(() => setAdminEmail(""), []);

  const value = useMemo(
    () => ({ adminEmail, checking, login, logout, expireSession }),
    [adminEmail, checking, login, logout, expireSession],
  );
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
