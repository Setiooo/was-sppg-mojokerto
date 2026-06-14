// Badge status SLHS. Reproduksi 1:1 komponen `SLHSBadge` sumber asli (gaya inline dipertahankan).
import React from "react";

export default function SlhsBadge({ slhs }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: ".3rem",
    borderRadius: 6,
    padding: ".15rem .55rem",
    fontSize: ".68rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
  };
  if (slhs === "punya")
    return (
      <span
        style={{
          ...base,
          background: "#dcfce7",
          border: "1px solid #86efac",
          color: "#166534",
        }}
      >
        ✅ Punya SLHS
      </span>
    );
  if (slhs === "proses")
    return (
      <span
        style={{
          ...base,
          background: "#fef3c7",
          border: "1px solid #fcd34d",
          color: "#92400e",
        }}
      >
        ⏳ Sedang Proses
      </span>
    );
  return (
    <span
      style={{
        ...base,
        background: "#fee2e2",
        border: "1px solid #fca5a5",
        color: "#991b1b",
      }}
    >
      ❌ Belum Ada
    </span>
  );
}
