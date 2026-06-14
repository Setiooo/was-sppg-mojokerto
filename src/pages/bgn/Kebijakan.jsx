// Halaman Kebijakan & Tindak Lanjut BGN (menu bgn-kebijakan). Reproduksi 1:1 fungsi rute "bgn-kebijakan".
// Daftar kartu kebijakan dengan badge prioritas & status + ringkasan statistik kebijakan.
import React from "react";
import { KEBIJAKAN, KEBIJAKAN_STATUS } from "../../constants/kebijakan.js";

export default function Kebijakan() {
  return (
    <div>
      <div className="page-header">
        <h2>📌 Kebijakan & Tindak Lanjut</h2>
        <p>Agenda kebijakan aktif Kota Mojokerto</p>
      </div>

      {KEBIJAKAN.map((e, t) => (
        <div key={t} className="kebijakan-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: ".5rem",
              flexWrap: "wrap",
              gap: ".4rem",
            }}
          >
            <h4>{e.title}</h4>
            <div style={{ display: "flex", gap: ".4rem" }}>
              <span
                className={`priority-badge priority-${e.prioritas === "Tinggi" ? "tinggi" : "sedang"}`}
              >
                {e.prioritas}
              </span>
              <span className={`status-badge ${KEBIJAKAN_STATUS[e.status][0]}`}>
                {KEBIJAKAN_STATUS[e.status][1]}
              </span>
            </div>
          </div>
          <p
            style={{
              fontSize: ".83rem",
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            {e.desc}
          </p>
        </div>
      ))}

      <div
        style={{
          background: "var(--g-pale)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "1.25rem",
          marginTop: "1.25rem",
        }}
      >
        <div
          style={{
            fontFamily: "Syne,sans-serif",
            fontWeight: 700,
            fontSize: ".9rem",
            color: "var(--g-deep)",
            marginBottom: ".75rem",
          }}
        >
          📊 Statistik Kebijakan
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: ".75rem",
          }}
        >
          {[
            ["Aktif", KEBIJAKAN.filter((e) => e.status === "Aktif").length],
            [
              "Berjalan",
              KEBIJAKAN.filter((e) => e.status === "Berjalan").length,
            ],
            ["Draft", KEBIJAKAN.filter((e) => e.status === "Draft").length],
          ].map(([e, t]) => (
            <div
              key={e}
              style={{
                textAlign: "center",
                background: "#fff",
                borderRadius: 10,
                padding: ".85rem",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "var(--g-deep)",
                }}
              >
                {t}
              </div>
              <div style={{ fontSize: ".72rem", color: "var(--muted)" }}>
                {e}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
