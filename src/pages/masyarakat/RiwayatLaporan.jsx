// Halaman "Riwayat Laporan" (menu m-riwayat). Direproduksi dari komponen "m-riwayat" sumber asli.
// Filter tab per status + tabel daftar laporan. Styling memakai class CSS bawaan.
import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";

export default function RiwayatLaporan() {
  const { db, navigate } = useApp();
  const [filter, setFilter] = useState("all");

  const terlihat =
    filter === "all"
      ? db.laporan
      : db.laporan.filter((l) => l.status === filter);
  const jumlah = {
    pending: db.laporan.filter((l) => l.status === "pending").length,
    verified: db.laporan.filter((l) => l.status === "verified").length,
    done: db.laporan.filter((l) => l.status === "done").length,
  };

  // [nilai filter, label, jumlah, class default tombol]
  const tabs = [
    ["all", "Semua", db.laporan.length, "btn-outline"],
    ["pending", "Pending", jumlah.pending, "btn-ghost"],
    ["verified", "Verified", jumlah.verified, "btn-ghost"],
    ["done", "Selesai", jumlah.done, "btn-ghost"],
  ];

  return (
    <div>
      <div className="page-header">
        <h2>📋 Riwayat Laporan</h2>
        <p>Semua laporan WAS-SPPG Kota Mojokerto</p>
      </div>

      <div className="riwayat-tabs">
        {tabs.map(([val, label, n, cls]) => (
          <button
            key={val}
            className={`btn ${filter === val ? "btn-green" : cls} btn-sm`}
            onClick={() => setFilter(val)}
          >
            {label} ({n})
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <div className="table-header">
          <h3>Total {db.laporan.length} Laporan</h3>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tgl/Waktu</th>
                <th>Kecamatan</th>
                <th>Sekolah</th>
                <th>Jenis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {terlihat.map((l) => (
                <tr key={l.id}>
                  <td>
                    <span className="id-badge">{l.id}</span>
                  </td>
                  <td className="cell-waktu">
                    {l.tanggal}
                    <br />
                    <span className="cell-muted">{l.waktu}</span>
                  </td>
                  <td className="cell-muted-sm">{l.wilayah}</td>
                  <td className="cell-sekolah">{l.sekolah}</td>
                  <td className="cell-jenis">{l.jenis}</td>
                  <td>
                    <StatusBadge status={l.status} />
                    {l.catatanVerifikasi && (
                      <div className="verif-note-sm">
                        💬 {l.catatanVerifikasi}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="btn btn-green" onClick={() => navigate("m-lapor")}>
        📝 Buat Laporan Baru
      </button>
    </div>
  );
}
