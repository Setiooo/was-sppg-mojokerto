// Halaman "Notifikasi" (menu m-notif). Direproduksi dari komponen `F` sumber asli.
// Daftar notifikasi bersifat statis (konstanta `O` sumber asli); header menampilkan jumlah laporan pending.
import React from "react";
import { useApp } from "../../context/AppContext.jsx";

// Notifikasi demo — verbatim dari konstanta `O` sumber asli.
const NOTIFIKASI = [
  {
    title: "✅ Laporan MJK-KRG-2025-003 Selesai",
    msg: "Porsi tidak memadai di SDN Kranggan 2 telah selesai ditangani.",
    type: "",
    time: "2 jam lalu",
    unread: true,
  },
  {
    title: "⚠️ Laporan Baru Masuk",
    msg: "2 laporan baru di Prajurit Kulon & Magersari menunggu verifikasi.",
    type: "amber",
    time: "3 jam lalu",
    unread: false,
  },
  {
    title: "🔵 Laporan MJK-MGR-2025-002 Diverifikasi",
    msg: "Laporan keterlambatan distribusi di SMPN 1 Mojokerto telah diverifikasi Pemkot.",
    type: "",
    time: "5 jam lalu",
    unread: false,
  },
  {
    title: "🔴 SPPG Magersari Kedundung 2 Bermasalah",
    msg: "SPPG Magersari Kedundung 2 terima 5 laporan minggu ini - perlu audit segera.",
    type: "red",
    time: "8 jam lalu",
    unread: false,
  },
  {
    title: "ℹ️ Jejak Audit Diperbarui",
    msg: "Catatan #1007 berhasil ditambahkan. Semua data laporan terverifikasi.",
    type: "",
    time: "1 hari lalu",
    unread: false,
  },
];

export default function Notifikasi() {
  const { db, user } = useApp();
  const kec = user?.wilayah || null;
  const pending = db.laporan.filter(
    (l) => l.status === "pending" && (!kec || l.wilayah === kec),
  ).length;

  return (
    <div>
      <div className="page-header">
        <h2>🔔 Notifikasi</h2>
        <p>{pending} laporan menunggu tindakan</p>
      </div>

      {NOTIFIKASI.map((n, i) => (
        <div
          className={`notif-item${n.unread ? " unread" : ""}${n.type ? " " + n.type : ""}`}
          key={i}
        >
          <h4>{n.title}</h4>
          <p>
            {n.msg} · <span className="cell-muted">{n.time}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
