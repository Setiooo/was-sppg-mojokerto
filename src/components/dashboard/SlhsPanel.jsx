// Panel informasi SLHS (Sertifikat Laik Higiene Sanitasi). Reproduksi komponen `V` sumber asli.
// Menampilkan ringkasan jumlah SPPG punya/proses/belum, dapat dibuka/tutup, plus materi edukatif lengkap.
import React, { useState } from "react";
import { SPPG_LIST } from "../../constants/sppgData.js";

const SYARAT_FISIK = [
  "Lantai kedap air, tidak licin, mudah dibersihkan",
  "Dinding bersih, tidak retak, terbuat dari bahan tidak menyerap",
  "Ventilasi & pencahayaan cukup di area pengolahan",
  "Tempat cuci tangan dengan air mengalir dan sabun tersedia",
  "Pisah area bersih & kotor (raw vs cooked food)",
  "Tempat sampah tertutup rapat & tidak berdekatan dengan makanan",
  "Bebas hama (tikus, kecoa, lalat)",
  "Fasilitas penyimpanan bahan baku bersuhu sesuai (chiller/freezer)",
  "Penjamah makanan memakai celemek, penutup kepala, dan sarung tangan",
  "Sertifikat laik sehat penjamah makanan (dari Puskesmas)",
];

const ALUR = [
  {
    no: 1,
    icon: "📋",
    judul: "Persiapan Dokumen",
    isi: "Formulir permohonan, KTP pemohon, sertifikat usaha / NIB, denah lokasi dapur, daftar menu & bahan baku, hasil uji lab air (maksimal 3 bulan terakhir).",
  },
  {
    no: 2,
    icon: "🏥",
    judul: "Penyerahan ke Dinas Kesehatan",
    isi: "Berkas diserahkan ke Seksi Penyehatan Lingkungan Dinas Kesehatan Kota Mojokerto. Biaya administrasi sesuai Perda setempat (umumnya Rp 0 – Rp 150.000).",
  },
  {
    no: 3,
    icon: "🔍",
    judul: "Inspeksi Lapangan",
    isi: "Petugas sanitarian Dinkes melakukan pemeriksaan fisik: kondisi dapur, saluran pembuangan, tempat cuci tangan, suhu penyimpanan bahan, pakaian kerja penjamah makanan.",
  },
  {
    no: 4,
    icon: "🧪",
    judul: "Uji Lab Makanan (jika diperlukan)",
    isi: "Sampel makanan jadi dikirim ke laboratorium kesehatan daerah untuk uji Angka Lempeng Total (ALT), coliform, dan Salmonella.",
  },
  {
    no: 5,
    icon: "📜",
    judul: "Penerbitan SLHS",
    isi: "Jika lolos, SLHS diterbitkan dengan masa berlaku 3 tahun. Jika tidak lolos, diberikan rekomendasi perbaikan dan jadwal reinspeksi.",
  },
];

const RISIKO = [
  {
    ikon: "⚠️",
    teks: "Melanggar Permenkes No. 1098/2003 & Kepmenkes No. 942/2003 tentang Persyaratan Higiene Sanitasi Jasa Boga",
  },
  {
    ikon: "🚫",
    teks: "Dapat dikenai sanksi administratif berupa teguran tertulis, penghentian sementara kegiatan, hingga pencabutan izin usaha",
  },
  {
    ikon: "💉",
    teks: "Risiko kejadian luar biasa (KLB) keracunan pangan tanpa perlindungan hukum bagi pengelola SPPG",
  },
  {
    ikon: "📉",
    teks: "Dalam konteks MBG, SPPG tanpa SLHS berpotensi didiskualifikasi dari program oleh BGN sesuai Pedoman Teknis MBG 2024",
  },
  {
    ikon: "⚖️",
    teks: "Pengelola dapat dijerat Pasal 75–76 UU No. 18 Tahun 2012 tentang Pangan jika terjadi keracunan massal",
  },
];

export default function SlhsPanel() {
  const [open, setOpen] = useState(false);
  const punya = SPPG_LIST.filter((e) => e.slhs === "punya").length;
  const proses = SPPG_LIST.filter((e) => e.slhs === "proses").length;
  const tidak = SPPG_LIST.filter((e) => e.slhs === "tidak").length;
  const tanpaNama = SPPG_LIST.filter((e) => e.slhs === "tidak")
    .map((e) => e.nama.split(" ").slice(-2).join(" "))
    .join(", ");

  return (
    <div
      style={{
        border: "2px solid #fcd34d",
        background: "#fffbeb",
        borderRadius: 16,
        marginBottom: "1.25rem",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          border: "none",
          background: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: ".85rem",
          padding: "1.25rem 1.4rem",
          textAlign: "left",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Syne,sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              color: "#92400e",
              display: "flex",
              alignItems: "center",
              gap: ".4rem",
            }}
          >
            🧼 Sertifikat Laik Higiene Sanitasi (SLHS)
          </div>
          <div
            style={{ fontSize: ".76rem", color: "#92400e", marginTop: ".2rem" }}
          >
            Permenkes No. 1098/2003 · {punya} punya · {proses} proses · {tidak}{" "}
            belum ada
          </div>
        </div>
        <span style={{ fontSize: "1.1rem", color: "#92400e" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 1.4rem 1.4rem" }}>
          {tidak > 0 && (
            <div
              style={{
                background: "#fee2e2",
                border: "1px solid #fca5a5",
                borderRadius: 12,
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "#991b1b",
                  fontSize: ".88rem",
                  marginBottom: ".25rem",
                }}
              >
                {tidak} SPPG belum memiliki SLHS
              </div>
              <div
                style={{
                  fontSize: ".78rem",
                  color: "#991b1b",
                  lineHeight: 1.6,
                }}
              >
                SPPG berikut beroperasi tanpa sertifikasi higiene sanitasi yang
                sah dan perlu segera mengurus SLHS ke Dinas Kesehatan Kota
                Mojokerto: <strong>{tanpaNama}</strong>
              </div>
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 700,
                  fontSize: ".85rem",
                  color: "#0a3622",
                  marginBottom: ".65rem",
                  display: "flex",
                  alignItems: "center",
                  gap: ".4rem",
                }}
              >
                📌 Apa itu SLHS?
              </div>
              <p
                style={{
                  fontSize: ".8rem",
                  color: "#374151",
                  lineHeight: 1.7,
                  marginBottom: ".85rem",
                }}
              >
                SLHS adalah sertifikat yang dikeluarkan Dinas Kesehatan sebagai
                bukti bahwa tempat pengolahan pangan memenuhi persyaratan
                higiene dan sanitasi sesuai standar kesehatan. Bagi SPPG dalam
                program MBG, SLHS merupakan{" "}
                <strong>
                  jaminan bahwa makanan yang didistribusikan ke siswa diproduksi
                  di lingkungan yang aman.
                </strong>
              </p>
              <div
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 700,
                  fontSize: ".85rem",
                  color: "#0a3622",
                  marginBottom: ".65rem",
                }}
              >
                🏗️ Syarat Fisik Dapur
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".3rem",
                }}
              >
                {SYARAT_FISIK.map((e, t) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: ".45rem",
                      fontSize: ".76rem",
                      color: "#374151",
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      style={{
                        color: "#166534",
                        flexShrink: 0,
                        marginTop: ".05rem",
                      }}
                    >
                      ✓
                    </span>
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 700,
                  fontSize: ".85rem",
                  color: "#0a3622",
                  marginBottom: ".65rem",
                }}
              >
                📋 Alur Pengurusan SLHS
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                  marginBottom: "1rem",
                }}
              >
                {ALUR.map((e) => (
                  <div
                    key={e.no}
                    style={{
                      display: "flex",
                      gap: ".6rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "#0a3622",
                        color: "#bbf7d0",
                        fontSize: ".7rem",
                        fontWeight: 800,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {e.no}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: ".78rem",
                          color: "#0a3622",
                          marginBottom: ".1rem",
                        }}
                      >
                        {e.icon} {e.judul}
                      </div>
                      <div
                        style={{
                          fontSize: ".73rem",
                          color: "#6b7280",
                          lineHeight: 1.55,
                        }}
                      >
                        {e.isi}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 700,
                  fontSize: ".85rem",
                  color: "#991b1b",
                  marginBottom: ".65rem",
                }}
              >
                ⚠️ Risiko Tanpa SLHS
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".4rem",
                }}
              >
                {RISIKO.map((e, t) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      gap: ".45rem",
                      alignItems: "flex-start",
                      fontSize: ".74rem",
                      color: "#374151",
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ flexShrink: 0 }}>{e.ikon}</span>
                    <span>{e.teks}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid #fde68a",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: ".74rem", color: "#92400e" }}>
              📞 <strong>Dinas Kesehatan Kota Mojokerto</strong> - Seksi
              Penyehatan Lingkungan
            </div>
            <div style={{ fontSize: ".74rem", color: "#92400e" }}>
              📄 Dasar hukum: <strong>Permenkes 1098/2003</strong> ·{" "}
              <strong>Kepmenkes 942/2003</strong> ·{" "}
              <strong>UU Pangan 18/2012</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
