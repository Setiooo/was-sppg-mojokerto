// Kontainer toast global. Direproduksi dari komponen `L` sumber asli.
import React from "react";
import { useApp } from "../../context/AppContext.jsx";

const TOAST_ICON = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };

export default function Toast() {
  const { toasts } = useApp();
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <div className="toast-icon">{TOAST_ICON[t.type] ?? "ℹ️"}</div>
          <div className="toast-body">
            <strong>{t.title}</strong>
            {t.msg && <span>{t.msg}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
