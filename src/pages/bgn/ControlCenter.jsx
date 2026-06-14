// Control Center BGN (menu bgn-home). Reproduksi 1:1 fungsi rute "bgn-home".
// Statistik nasional/wilayah + grafik jenis laporan + bar chart pending per kecamatan +
// tabel ringkasan per kecamatan + kartu peringatan SPPG bermasalah.
import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { SPPG_LIST } from "../../constants/sppgData.js";
import BarChart from "../../components/dashboard/BarChart.jsx";
import SkorBar from "../../components/dashboard/SkorBar.jsx";

export default function ControlCenter() {
  const { db, navigate, user } = useApp();
  const kec = user?.wilayah || null;
  const kecShort = kec ? kec.replace("Kec. ", "") : null;
  const lapPool = kec
    ? db.laporan.filter((l) => l.wilayah === kec)
    : db.laporan;
  const sppgPool = kecShort
    ? SPPG_LIST.filter((s) => s.kecamatan === kecShort)
    : SPPG_LIST;
  const pendAll = lapPool.filter((l) => l.status === "pending").length;
  const rTot = sppgPool.length;
  const aMas = sppgPool.filter((s) => s.status === "Masalah").length;
  const lSkor = sppgPool.length
    ? Math.round(sppgPool.reduce((a, s) => a + s.skor, 0) / sppgPool.length)
    : 0;

  const jenisMap = {};
  lapPool.forEach((l) => {
    jenisMap[l.jenis] = (jenisMap[l.jenis] || 0) + 1;
  });
  const jenisArr = Object.entries(jenisMap).sort((a, b) => b[1] - a[1]);
  const maxJ = Math.max(...jenisArr.map((x) => x[1]), 1);
  const jenisChart = jenisArr.map(([k, v]) => [
    k,
    Math.round((v / maxJ) * 100),
  ]);

  const kecData = (
    kecShort ? [kecShort] : ["Prajurit Kulon", "Magersari", "Kranggan"]
  ).map((kG) => {
    const lap = db.laporan.filter((l) => l.wilayah === "Kec. " + kG);
    const sppgK = SPPG_LIST.filter((s) => s.kecamatan === kG);
    const skor = sppgK.length
      ? Math.round(sppgK.reduce((a, s) => a + s.skor, 0) / sppgK.length)
      : 0;
    return {
      kec: kG,
      lapPend: lap.filter((l) => l.status === "pending").length,
      lapTot: lap.length,
      sppgTot: sppgK.length,
      sppgMas: sppgK.filter((s) => s.status === "Masalah").length,
      skor,
    };
  });

  return (
    <div>
      <div
        className="welcome-banner"
        style={{ background: "linear-gradient(135deg,#0a3622,#1a5c35)" }}
      >
        <h2>
          {"🇮🇩 Control Center BGN - " +
            (kecShort ? "Kec. " + kecShort : "Kota Mojokerto")}
        </h2>
        <p>
          {(kecShort ? "Kec. " + kecShort : "18 SPPG · 3 Kecamatan") + " · "}
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num">{rTot}</div>
          <div className="stat-label">Total SPPG</div>
          <div className="stat-change" style={{ color: "var(--g-bright)" }}>
            18 unit aktif
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--amber)" }}>
            {pendAll}
          </div>
          <div className="stat-label">Laporan Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--red)" }}>
            {aMas}
          </div>
          <div className="stat-label">SPPG Bermasalah</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{lSkor}</div>
          <div className="stat-label">Skor Rata-rata</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{lapPool.length}</div>
          <div className="stat-label">Total Laporan</div>
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
            {"📊 Jenis Laporan - " +
              (kecShort ? "Kec. " + kecShort : "Seluruh Kota")}
          </div>
          {jenisChart.length > 0 ? (
            <BarChart items={jenisChart} />
          ) : (
            <p style={{ fontSize: ".82rem", color: "var(--muted)" }}>
              Belum ada data
            </p>
          )}
        </div>
        <div className="chart-wrap">
          <div className="chart-title">🗺️ Laporan Pending per Kecamatan</div>
          <div className="bar-chart">
            {kecData.map((kd) => {
              const maxPend = Math.max(...kecData.map((x) => x.lapPend), 1);
              return (
                <div key={kd.kec} className="bar-row">
                  <div className="bar-label">{kd.kec}</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: (kd.lapPend / maxPend) * 100 + "%",
                        background:
                          kd.lapPend >= 5
                            ? "var(--red)"
                            : kd.lapPend >= 2
                              ? "var(--amber)"
                              : "var(--g-mid)",
                      }}
                    >
                      {kd.lapPend} pending
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="table-wrap" style={{ marginBottom: "1.25rem" }}>
        <div className="table-header">
          <h3>📊 Ringkasan per Kecamatan</h3>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Kecamatan</th>
                <th>Lap. Pending</th>
                <th>Total Laporan</th>
                <th>SPPG</th>
                <th>SPPG Masalah</th>
                <th>Skor Rata</th>
              </tr>
            </thead>
            <tbody>
              {kecData.map((kd) => (
                <tr key={kd.kec}>
                  <td style={{ fontWeight: 600 }}>Kec. {kd.kec}</td>
                  <td
                    style={{
                      fontWeight: 700,
                      color:
                        kd.lapPend >= 5
                          ? "var(--red)"
                          : kd.lapPend >= 2
                            ? "var(--amber)"
                            : "var(--ink)",
                    }}
                  >
                    {kd.lapPend}
                  </td>
                  <td>{kd.lapTot}</td>
                  <td>{kd.sppgTot}</td>
                  <td
                    style={{
                      color: kd.sppgMas > 0 ? "var(--red)" : "var(--g-bright)",
                    }}
                  >
                    {kd.sppgMas}
                  </td>
                  <td>
                    <SkorBar skor={kd.skor} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        {sppgPool
          .filter((s) => s.status === "Masalah")
          .map((s) => (
            <div
              key={s.no}
              style={{
                background: "var(--red-lt)",
                border: "1.5px solid var(--red)",
                borderRadius: 12,
                padding: "1rem 1.25rem",
                marginBottom: ".75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: ".5rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#991b1b",
                    fontSize: ".9rem",
                  }}
                >
                  🔴 {s.nama}
                </div>
                <div
                  style={{
                    fontSize: ".76rem",
                    color: "#991b1b",
                    marginTop: ".2rem",
                  }}
                >
                  Kec. {s.kecamatan} · {s.laporan} laporan · Skor: {s.skor}
                </div>
              </div>
              <button
                className="btn btn-red btn-sm"
                onClick={() => navigate("bgn-sppg")}
              >
                Lihat Detail
              </button>
            </div>
          ))}
      </div>

      <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap" }}>
        <button className="btn btn-green" onClick={() => navigate("bgn-sppg")}>
          🍱 Manajemen SPPG
        </button>
        <button
          className="btn btn-outline"
          onClick={() => navigate("bgn-laporan")}
        >
          📋 Semua Laporan
        </button>
        <button className="btn btn-ghost" onClick={() => navigate("bgn-peta")}>
          🗺️ Peta
        </button>
      </div>
    </div>
  );
}
