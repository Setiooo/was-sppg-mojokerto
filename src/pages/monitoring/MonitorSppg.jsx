// Halaman "Monitor SPPG" (menu pd-sppg & bgn-sppg). Reproduksi 1:1 komponen `q` sumber asli.
// Statistik agregat + panel SLHS + kartu ringkas per-kecamatan + tabel detail per-kecamatan.
import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { SPPG_LIST } from "../../constants/sppgData.js";
import { KECAMATAN_THEME } from "../../constants/kecamatanMeta.js";
import SlhsPanel from "../../components/dashboard/SlhsPanel.jsx";
import SlhsBadge from "../../components/common/SlhsBadge.jsx";
import SkorBar from "../../components/dashboard/SkorBar.jsx";

export default function MonitorSppg() {
  const { user } = useApp();
  const kec = user?.wilayah || null;
  const kecShort = kec ? kec.replace("Kec. ", "") : null;
  const sppgList = kecShort
    ? SPPG_LIST.filter((s) => s.kecamatan === kecShort)
    : SPPG_LIST;
  const eTot = sppgList.length;
  const tAkt = sppgList.filter((e) => e.status === "Aktif").length;
  const nMas = sppgList.filter((e) => e.status === "Masalah").length;
  const rSkor = eTot
    ? Math.round(sppgList.reduce((a, s) => a + s.skor, 0) / eTot)
    : 0;
  const aSlhs = sppgList.filter((e) => e.slhs === "punya").length;
  const kecGroups = kecShort
    ? [kecShort]
    : ["Prajurit Kulon", "Magersari", "Kranggan"];

  return (
    <div>
      <div className="page-header">
        <h2>🍱 Monitor SPPG - {kec ? kec : "Kota Mojokerto"}</h2>
        <p>
          {kec
            ? sppgList.length + " SPPG di wilayah Anda"
            : "18 SPPG aktif tersebar di 3 kecamatan - data resmi per-kelurahan"}
        </p>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num">{eTot}</div>
          <div className="stat-label">Total SPPG</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--g-bright)" }}>
            {tAkt}
          </div>
          <div className="stat-label">Aktif</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--red)" }}>
            {nMas}
          </div>
          <div className="stat-label">Perlu Perhatian</div>
        </div>
        <div className="stat-card">
          <div
            className="stat-num"
            style={{
              color: aSlhs === eTot ? "var(--g-bright)" : "var(--amber)",
            }}
          >
            {aSlhs}/{eTot}
          </div>
          <div className="stat-label">Punya SLHS</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{rSkor}</div>
          <div className="stat-label">Skor Rata-rata</div>
        </div>
      </div>

      <SlhsPanel />

      <div
        style={{
          display: "flex",
          gap: ".75rem",
          flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}
      >
        {kecGroups.map((kG) => {
          const kT = KECAMATAN_THEME[kG];
          const kData = SPPG_LIST.filter((s) => s.kecamatan === kG);
          const kSkor = kData.length
            ? Math.round(kData.reduce((a, s) => a + s.skor, 0) / kData.length)
            : 0;
          const kSlhs = kData.filter((e) => e.slhs === "punya").length;
          return (
            <div
              key={kG}
              style={{
                background: kT.bg,
                border: `1px solid ${kT.color}33`,
                borderRadius: 12,
                padding: ".65rem 1.1rem",
                flex: 1,
                minWidth: 140,
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  fontFamily: "Syne,sans-serif",
                  color: kT.color,
                }}
              >
                {kData.length}
              </div>
              <div
                style={{ fontSize: ".72rem", color: kT.color, fontWeight: 600 }}
              >
                Kec. {kG}
              </div>
              <div
                style={{
                  fontSize: ".68rem",
                  color: "var(--muted)",
                  marginTop: ".2rem",
                }}
              >
                Skor: <strong style={{ color: "var(--ink)" }}>{kSkor}</strong> ·
                SLHS:{" "}
                <strong
                  style={{
                    color: kSlhs === kData.length ? "#166534" : "#92400e",
                  }}
                >
                  {kSlhs}/{kData.length}
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: "var(--g-pale)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: ".85rem 1.1rem",
          marginBottom: "1.25rem",
          display: "flex",
          gap: ".75rem",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>📊</span>
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: ".88rem",
              color: "var(--g-deep)",
            }}
          >
            Distribusi Skor SPPG
          </div>
          <div
            style={{
              fontSize: ".78rem",
              color: "var(--muted)",
              marginTop: ".2rem",
            }}
          >
            {sppgList.filter((s) => s.skor >= 85).length} Baik (≥85) ·{" "}
            {sppgList.filter((s) => s.skor >= 70 && s.skor < 85).length} Sedang
            (70–84) · {sppgList.filter((s) => s.skor < 70).length} Butuh
            Perhatian (&lt;70)
          </div>
        </div>
      </div>

      {kecGroups.map((kG) => {
        const kT = KECAMATAN_THEME[kG];
        const kData = SPPG_LIST.filter((s) => s.kecamatan === kG);
        const kSkor = kData.length
          ? Math.round(kData.reduce((a, s) => a + s.skor, 0) / kData.length)
          : 0;
        const kSlhs = kData.filter((e) => e.slhs === "punya").length;
        return (
          <div key={kG} style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".6rem",
                marginBottom: ".65rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: kT.color,
                  flexShrink: 0,
                }}
              />
              <h3
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 700,
                  fontSize: ".95rem",
                  color: "var(--g-deep)",
                }}
              >
                Kec. {kG}
              </h3>
              <span
                style={{
                  fontSize: ".72rem",
                  background: kT.bg,
                  color: kT.color,
                  padding: ".18rem .6rem",
                  borderRadius: 100,
                  fontWeight: 700,
                }}
              >
                {kData.length} SPPG
              </span>
              <span
                style={{
                  fontSize: ".72rem",
                  color: "var(--muted)",
                  marginLeft: "auto",
                }}
              >
                Skor:{" "}
                <strong style={{ color: "var(--g-deep)" }}>{kSkor}</strong> ·
                SLHS:{" "}
                <strong
                  style={{
                    color: kSlhs === kData.length ? "#166534" : "#92400e",
                  }}
                >
                  {kSlhs}/{kData.length} sah
                </strong>
              </span>
            </div>
            <div className="table-wrap">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nama SPPG</th>
                      <th>Kelurahan</th>
                      <th>Alamat</th>
                      <th>SLHS</th>
                      <th>Status</th>
                      <th>Laporan</th>
                      <th>Skor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kData.map((e) => (
                      <tr
                        key={e.no}
                        style={{
                          background:
                            e.slhs === "tidak" ? "#fff5f5" : undefined,
                        }}
                      >
                        <td
                          style={{
                            fontSize: ".7rem",
                            color: "var(--muted)",
                            fontFamily: "monospace",
                          }}
                        >
                          #{e.no}
                        </td>
                        <td style={{ fontWeight: 600, fontSize: ".84rem" }}>
                          {e.nama}
                        </td>
                        <td
                          style={{ fontSize: ".74rem", color: "var(--muted)" }}
                        >
                          {e.kelurahan}
                        </td>
                        <td
                          style={{
                            fontSize: ".74rem",
                            color: "var(--muted)",
                            maxWidth: 180,
                          }}
                        >
                          {e.alamat}
                        </td>
                        <td>
                          <SlhsBadge slhs={e.slhs} />
                        </td>
                        <td>
                          <span
                            className={`status-badge ${e.status === "Aktif" ? "status-done" : "status-rejected"}`}
                          >
                            {e.status === "Aktif" ? "✅ Aktif" : "⚠️ Masalah"}
                          </span>
                        </td>
                        <td
                          style={{
                            fontWeight: 700,
                            color:
                              e.laporan >= 5
                                ? "var(--red)"
                                : e.laporan >= 3
                                  ? "var(--amber)"
                                  : "var(--ink)",
                          }}
                        >
                          {e.laporan}
                        </td>
                        <td style={{ minWidth: 110 }}>
                          <SkorBar skor={e.skor} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
