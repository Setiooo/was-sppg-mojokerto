// Dashboard Pemerintah Kota (menu pd-home). Reproduksi 1:1 fungsi rute "pd-home" sumber asli.
// Statistik laporan + grafik jenis laporan (BarChart) + ringkasan kondisi SPPG + tabel laporan terbaru.
import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { SPPG_LIST } from "../../constants/sppgData.js";
import BarChart from "../../components/dashboard/BarChart.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";

export default function Dashboard() {
  const { db, user, navigate } = useApp();
  const kec = user?.wilayah || null;
  const kecShort = kec ? kec.replace("Kec. ", "") : null;
  const lWil = kec ? db.laporan.filter((l) => l.wilayah === kec) : db.laporan;
  const lPend = lWil.filter((l) => l.status === "pending").length;
  const lVerif = lWil.filter((l) => l.status === "verified").length;
  const lDone = lWil.filter((l) => l.status === "done").length;
  const sWil = kecShort
    ? SPPG_LIST.filter((s) => s.kecamatan === kecShort)
    : SPPG_LIST;
  const sMasal = sWil.filter((s) => s.status === "Masalah").length;
  const sSkor = sWil.length
    ? Math.round(sWil.reduce((a, s) => a + s.skor, 0) / sWil.length)
    : 0;

  const jenisMap = {};
  lWil.forEach((l) => {
    jenisMap[l.jenis] = (jenisMap[l.jenis] || 0) + 1;
  });
  const jenisArr = Object.entries(jenisMap).sort((a, b) => b[1] - a[1]);
  const maxJ = Math.max(...jenisArr.map((x) => x[1]), 1);
  const jenisChart = jenisArr.map(([k, v]) => [
    k,
    Math.round((v / maxJ) * 100),
  ]);

  return (
    <div>
      <div className="welcome-banner">
        <h2>🏛️ Dashboard Pemerintah Kota - {kec || "Kota Mojokerto"}</h2>
        <p>
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · Seluruh Kota Mojokerto
        </p>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--amber)" }}>
            {lPend}
          </div>
          <div className="stat-label">⚡ Perlu Diverifikasi</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--blue)" }}>
            {lVerif}
          </div>
          <div className="stat-label">🔵 Sedang Diproses</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--g-bright)" }}>
            {lDone}
          </div>
          <div className="stat-label">✅ Selesai</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{lWil.length}</div>
          <div className="stat-label">Total di Wilayah</div>
        </div>
        <div className="stat-card">
          <div
            className="stat-num"
            style={{ color: sMasal > 0 ? "var(--red)" : "var(--g-bright)" }}
          >
            {sMasal}
          </div>
          <div className="stat-label">SPPG Bermasalah</div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        <div className="chart-wrap">
          <div className="chart-title">
            📊 Jenis Laporan - {kec || "Seluruh Kota"}
          </div>
          {jenisChart.length > 0 ? (
            <BarChart items={jenisChart} />
          ) : (
            <p
              style={{
                fontSize: ".82rem",
                color: "var(--muted)",
                padding: ".5rem 0",
              }}
            >
              Belum ada laporan di wilayah ini
            </p>
          )}
        </div>
        <div className="chart-wrap">
          <div className="chart-title">
            🍱 Kondisi SPPG - {kecShort || "Kota Mojokerto"}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: ".82rem", color: "var(--muted)" }}>
                Jumlah SPPG
              </span>
              <strong>{sWil.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: ".82rem", color: "var(--muted)" }}>
                Skor Rata-rata
              </span>
              <strong
                style={{
                  color:
                    sSkor >= 85
                      ? "var(--g-bright)"
                      : sSkor >= 70
                        ? "var(--amber)"
                        : "var(--red)",
                }}
              >
                {sSkor}
              </strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: ".82rem", color: "var(--muted)" }}>
                Punya SLHS
              </span>
              <strong>
                {sWil.filter((s) => s.slhs === "punya").length}/{sWil.length}
              </strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: ".82rem", color: "var(--muted)" }}>
                SPPG Bermasalah
              </span>
              <strong
                style={{ color: sMasal > 0 ? "var(--red)" : "var(--g-bright)" }}
              >
                {sMasal}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="table-wrap" style={{ marginBottom: "1.25rem" }}>
        <div className="table-header">
          <h3>📋 Laporan Terbaru - {kec || "Kota Mojokerto"}</h3>
          <span style={{ fontSize: ".74rem", color: "var(--muted)" }}>
            {lWil.length} total
          </span>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tgl</th>
                <th>Sekolah</th>
                <th>Jenis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lWil.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      color: "var(--muted)",
                      padding: "1.5rem",
                      fontSize: ".84rem",
                    }}
                  >
                    Belum ada laporan di wilayah ini
                  </td>
                </tr>
              ) : (
                [...lWil]
                  .reverse()
                  .slice(0, 6)
                  .map((lap) => (
                    <tr key={lap.id}>
                      <td>
                        <span className="id-badge">{lap.id}</span>
                      </td>
                      <td style={{ fontSize: ".76rem" }}>{lap.tanggal}</td>
                      <td style={{ fontWeight: 500, fontSize: ".8rem" }}>
                        {lap.sekolah}
                      </td>
                      <td style={{ fontSize: ".75rem" }}>{lap.jenis}</td>
                      <td>
                        <StatusBadge status={lap.status} />
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap" }}>
        <button
          className="btn btn-blue"
          onClick={() => navigate("pd-verifikasi")}
        >
          ✅ Verifikasi Laporan ({lPend})
        </button>
        <button
          className="btn btn-outline"
          onClick={() => navigate("pd-laporan")}
        >
          📋 Laporan Wilayah
        </button>
        <button className="btn btn-ghost" onClick={() => navigate("pd-sppg")}>
          🍱 SPPG Wilayah
        </button>
      </div>
    </div>
  );
}
