// Band statistik publik di halaman utama (#was-landing-stats).
// Direproduksi dari overlay <script> sumber asli: 5 kartu ringkas + grafik
// batang laporan per kecamatan, dihitung langsung dari data laporan (db.laporan).
import React, { useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { KECAMATAN_LIST, KECAMATAN_CODE } from "../../constants/kecamatan.js";
import { SPPG_LIST } from "../../constants/sppgData.js";

export default function LandingStats() {
  const { db } = useApp();
  const lap = db.laporan;
  const total = lap.length;
  const pending = lap.filter((l) => l.status === "pending").length;
  const verified = lap.filter((l) => l.status === "verified").length;
  const done = lap.filter((l) => l.status === "done").length;
  const rejected = lap.filter((l) => l.status === "rejected").length;
  const ditindaklanjuti = verified + done;
  const sppgTerpantau = SPPG_LIST.length;

  const bars = KECAMATAN_LIST.map((kec) => ({
    lbl: KECAMATAN_CODE[kec],
    count: lap.filter((l) => l.wilayah === kec).length,
  }));
  const maxCount = Math.max(...bars.map((b) => b.count), 1);

  const refs = useRef([]);
  useEffect(() => {
    const t = setTimeout(() => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const c = bars[i].count;
        el.style.height =
          (c > 0 ? Math.max(14, Math.round((c / maxCount) * 130)) : 4) + "px";
      });
    }, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const barStyle = { height: 0 };
  const cards = [
    ["", "\uD83D\uDCCB", total, "Total Laporan"],
    ["amber", "\u23F3", pending, "Menunggu Verifikasi"],
    ["blue", "\u2705", ditindaklanjuti, "Ditindaklanjuti"],
    ["red", "\u274C", rejected, "Ditolak"],
    ["green", "\uD83C\uDF71", sppgTerpantau, "SPPG Terpantau"],
  ];

  return (
    <section className="was-landing-stats" id="was-landing-stats">
      <div className="was-ls-inner">
        <div className="was-ls-head">
          <h2>📊 Statistik Pengawasan Real-Time</h2>
          <p>
            Rekapitulasi laporan masyarakat dan tindak lanjut Program Makan
            Bergizi Gratis di seluruh Kota Mojokerto.
          </p>
        </div>

        <div className="was-ls-grid">
          {cards.map(([cls, ico, num, lbl], i) => (
            <div className={`was-ls-card${cls ? " " + cls : ""}`} key={i}>
              <span className="was-ls-ico">{ico}</span>
              <div className="was-ls-num">{num}</div>
              <div className="was-ls-lbl">{lbl}</div>
            </div>
          ))}
        </div>

        <div className="was-ls-chart">
          <div className="was-ls-chart-head">
            <h3>🗺️ Laporan per Kecamatan</h3>
            <div className="was-ls-chart-meta">
              Total <strong>{total}</strong> laporan
            </div>
          </div>
          <div className="was-ls-bars">
            {bars.map((d, i) => (
              <div className="was-ls-bcol" key={d.lbl}>
                <div
                  className="was-ls-bar"
                  style={barStyle}
                  ref={(el) => (refs.current[i] = el)}
                >
                  <span className="was-ls-bval">{d.count}</span>
                </div>
                <div className="was-ls-blbl">{d.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
