// Halaman "Semua Laporan" (menu pd-laporan & bgn-laporan). Reproduksi 1:1 komponen `W` sumber asli.
// Jika user punya `wilayah`, daftar difilter ke kecamatan itu. Tombol aksi (verifikasi/tolak)
// hanya muncul untuk laporan berstatus pending dan memanggil updateLaporanStatus(...,"Pemkot Mojokerto").
import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";

const TABS = [
  ["all", "Semua"],
  ["pending", "Pending"],
  ["verified", "Verified"],
  ["done", "Selesai"],
  ["rejected", "Ditolak"],
];

export default function SemuaLaporan() {
  const { db, updateLaporanStatus, showToast, user } = useApp();
  const kec = user?.wilayah || null;
  const baseLaporan = kec
    ? db.laporan.filter((l) => l.wilayah === kec)
    : db.laporan;
  const [tab, setTab] = useState("all");
  const [catatan, setCatatan] = useState({});
  const terlihat =
    tab === "all" ? baseLaporan : baseLaporan.filter((l) => l.status === tab);

  const ubahStatus = (id, status) => {
    const teks = (catatan[id] || "").trim();
    updateLaporanStatus(id, status, "Pemkot Mojokerto", teks ? teks : null);
    setCatatan((c) => ({ ...c, [id]: "" }));
    showToast("success", "Status diperbarui", id);
  };

  return (
    <div>
      <div className="page-header">
        <h2>📋 {kec ? "Laporan - " + kec : "Semua Laporan Kota Mojokerto"}</h2>
        <p>
          {kec
            ? "Hanya laporan di wilayah Anda"
            : "Database lengkap 3 kecamatan"}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: ".6rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        {TABS.map(([val, label]) => (
          <button
            key={val}
            className={`btn btn-sm ${tab === val ? "btn-green" : "btn-ghost"}`}
            onClick={() => setTab(val)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <div className="table-header">
          <h3>
            Laporan{kec ? " " + kec : ""} ({terlihat.length})
          </h3>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tanggal</th>
                <th>Kecamatan</th>
                <th>Sekolah</th>
                <th>Jenis</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {terlihat.map((l) => (
                <tr key={l.id}>
                  <td>
                    <span className="id-badge">{l.id}</span>
                  </td>
                  <td style={{ fontSize: ".76rem" }}>{l.tanggal}</td>
                  <td style={{ fontSize: ".74rem", color: "var(--muted)" }}>
                    {l.wilayah}
                  </td>
                  <td style={{ fontSize: ".8rem", fontWeight: 500 }}>
                    {l.sekolah}
                  </td>
                  <td style={{ fontSize: ".75rem" }}>{l.jenis}</td>
                  <td>
                    <StatusBadge status={l.status} />
                    {l.catatanVerifikasi && (
                      <div className="verif-note-sm">
                        💬 {l.catatanVerifikasi}
                      </div>
                    )}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: ".3rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {l.status === "pending" && (
                        <>
                          <input
                            className="catatan-inline"
                            placeholder="Justifikasi (opsional)"
                            value={catatan[l.id] || ""}
                            onChange={(ev) =>
                              setCatatan((c) => ({
                                ...c,
                                [l.id]: ev.target.value,
                              }))
                            }
                          />
                          <button
                            className="btn btn-green btn-sm"
                            onClick={() => ubahStatus(l.id, "verified")}
                          >
                            ✅
                          </button>
                          <button
                            className="btn btn-red btn-sm"
                            onClick={() => ubahStatus(l.id, "rejected")}
                          >
                            ❌
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
