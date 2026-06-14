// Halaman Verifikasi Laporan (menu pd-verifikasi). Reproduksi 1:1 fungsi rute "pd-verifikasi".
// Daftar laporan pending di wilayah, dengan aksi Verifikasi/Tolak/Selesai + uploader foto verifikasi.
import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import FotoVerifUploader from "../../components/forms/FotoVerifUploader.jsx";

export default function Verifikasi() {
  const { db, updateLaporanStatus, showToast, user } = useApp();
  const kec = user?.wilayah || null;
  const [catatan, setCatatan] = useState({});
  const a = db.laporan.filter(
    (l) => l.status === "pending" && (!kec || l.wilayah === kec),
  );
  const aAll = db.laporan.filter((l) => l.status === "pending");

  const act = (id, status) => {
    const teks = (catatan[id] || "").trim();
    updateLaporanStatus(id, status, "Pemkot Mojokerto", teks || null);
    showToast(
      "success",
      `Laporan ${status === "verified" ? "diverifikasi" : status === "done" ? "diselesaikan" : "ditolak"}`,
      id,
    );
    setCatatan((c) => ({ ...c, [id]: "" }));
  };

  return (
    <div>
      <div className="page-header">
        <h2>✅ Verifikasi Laporan</h2>
        <p>
          {a.length} menunggu di {kec || "seluruh kota"} · {aAll.length} total
          seluruh kota
        </p>
      </div>

      {a.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "#fff",
            borderRadius: 14,
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          {aAll.length > 0 ? (
            <>
              <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>🎉</div>
              <p style={{ fontWeight: 600 }}>
                Semua laporan di wilayah Anda sudah diverifikasi!
              </p>
              <p style={{ fontSize: ".82rem", marginTop: ".4rem" }}>
                Masih ada {aAll.length} laporan pending di kecamatan lain
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>✨</div>
              <p style={{ fontWeight: 600 }}>
                Seluruh kota bebas laporan pending!
              </p>
            </>
          )}
        </div>
      ) : (
        [...a].reverse().map((e) => (
          <div key={e.id} className="verif-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: ".4rem",
                flexWrap: "wrap",
                gap: ".5rem",
              }}
            >
              <h4>
                {e.sekolah} - {e.jenis}
              </h4>
              <StatusBadge status={e.status} />
            </div>
            <div className="verif-meta">
              <span>📍 {e.wilayah}</span>
              <span>
                🕐 {e.tanggal} {e.waktu}
              </span>
              <span className="id-badge">{e.id}</span>
              {e.kredibilitas !== undefined && (
                <span
                  className={
                    e.kredibilitas >= 75
                      ? "kred-tinggi"
                      : e.kredibilitas >= 50
                        ? "kred-sedang"
                        : "kred-rendah"
                  }
                >
                  {(e.kredibilitas >= 75
                    ? "🟢"
                    : e.kredibilitas >= 50
                      ? "🟡"
                      : "🔴") +
                    " Kredibilitas " +
                    e.kredibilitas +
                    "%"}
                </span>
              )}
            </div>
            <div className="verif-desc">{e.deskripsi}</div>
            <FotoVerifUploader laporan={e} />
            <div className="catatan-verif">
              <label className="catatan-verif-label">
                💬 Justifikasi / catatan verifikasi (tampil ke BGN & masyarakat)
              </label>
              <textarea
                className="catatan-verif-input"
                rows={2}
                placeholder="Tulis alasan/justifikasi keputusan verifikasi…"
                value={catatan[e.id] || ""}
                onChange={(ev) =>
                  setCatatan((c) => ({ ...c, [e.id]: ev.target.value }))
                }
              />
            </div>
            <div className="verif-actions" style={{ marginTop: ".85rem" }}>
              <button
                className="btn btn-green btn-sm"
                onClick={() => act(e.id, "verified")}
              >
                ✅ Verifikasi Valid
              </button>
              <button
                className="btn btn-red btn-sm"
                onClick={() => act(e.id, "rejected")}
              >
                ❌ Tolak
              </button>
              <button
                className="btn btn-amber btn-sm"
                onClick={() => act(e.id, "done")}
              >
                ✓ Selesai
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
