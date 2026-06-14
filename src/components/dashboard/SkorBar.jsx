// Bar skor kualitas SPPG. Reproduksi komponen `A` sumber asli.
// Ambang warna: >=85 hijau, >=70 amber, selain itu merah.
import React from "react";

export default function SkorBar({ skor }) {
  const color = skor >= 85 ? "#22c55e" : skor >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
      <div
        style={{
          flex: 1,
          height: 8,
          background: "#f0fdf4",
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${skor}%`,
            height: "100%",
            background: color,
            borderRadius: 100,
          }}
        />
      </div>
      <span
        style={{
          fontSize: ".75rem",
          fontWeight: 700,
          color,
          minWidth: 22,
          textAlign: "right",
        }}
      >
        {skor}
      </span>
    </div>
  );
}
