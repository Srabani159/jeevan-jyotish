import { useCallback, useEffect, useState } from "react";

export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), []);
  const push = useCallback((text, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((list) => [...list, { id, text, type }]);
  }, []);
  return { toasts, push, dismiss };
}

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 6000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);
  return (
    <div className={`adm-toast is-${toast.type}`} role={toast.type === "error" ? "alert" : "status"}>
      <span>{toast.text}</span>
      <button type="button" aria-label="Dismiss" onClick={() => onDismiss(toast.id)}>×</button>
    </div>
  );
}

export default function Toasts({ toasts, onDismiss }) {
  return (
    <div className="adm-toasts" aria-live="polite">
      {toasts.map((toast) => <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />)}
    </div>
  );
}
