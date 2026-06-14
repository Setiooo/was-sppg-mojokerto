// Halaman "Buat Laporan" (menu m-lapor). Direproduksi dari komponen "m-lapor" sumber asli.
// Alur verifikasi berlapis: foto kamera (wajib) + GPS + deskripsi min. 8 kata, lalu hitung kredibilitas,
// buat ID laporan, catat ke database & rantai audit, perbarui profil perangkat.
// Catatan gaya: styling memakai class CSS (styles/portal-masyarakat.css). Hanya progress bar memakai
// inline style dinamis melalui sebuah objek (single-brace) agar lebar mengikuti jumlah kata.
import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useApp } from "../../context/AppContext.jsx";
import CameraCapture from "../../components/forms/CameraCapture.jsx";
import {
  KECAMATAN_LIST,
  KECAMATAN_CODE,
  KECAMATAN_COORDS,
} from "../../constants/kecamatan.js";
import { JENIS_LAPORAN } from "../../constants/enums.js";
import {
  readDatabase,
  saveDatabase,
  readDeviceProfile,
  saveDeviceProfile,
  evaluateRateLimit,
} from "../../services/laporanService.js";
import {
  appendAuditBlock,
  randomBlockHash,
} from "../../services/auditService.js";
import { saveFoto } from "../../services/verifikasiService.js";
import { hitungKredibilitas } from "../../services/dashboardService.js";
import {
  hitungJumlahKata,
  syaratTerverifikasi,
} from "../../utils/validators.js";

// Hitung jarak (km) antara dua titik dengan rumus haversine. Verbatim dari handler GPS sumber asli.
function jarakKm(lat, lng, pusat) {
  const a =
    Math.sin(((pusat.lat - lat) * Math.PI) / 180 / 2) ** 2 +
    Math.cos((lat * Math.PI) / 180) *
      Math.cos((pusat.lat * Math.PI) / 180) *
      Math.sin(((pusat.lng - lng) * Math.PI) / 180 / 2) ** 2;
  return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function BuatLaporan() {
  const { navigate, showToast, refreshDB } = useApp();

  const [fotoIds, setFotoIds] = useState([]);
  const [deskripsi, setDeskripsi] = useState("");
  const [kecamatan, setKecamatan] = useState(KECAMATAN_LIST[0]);
  const [sekolah, setSekolah] = useState("");
  const [jenis, setJenis] = useState("Kualitas Makanan");
  const [waktu, setWaktu] = useState(() =>
    new Date().toISOString().slice(0, 16),
  );
  const [gpsVerified, setGpsVerified] = useState(false);
  const [gpsPesan, setGpsPesan] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const formDibukaPada = useRef(Date.now());

  // Cek apakah perangkat boleh mengirim (banned / cooldown / maks 3 laporan per hari).
  const rateLimit = useMemo(() => evaluateRateLimit(), []);

  // Catat waktu form dibuka untuk deteksi pengisian terlalu cepat (anti-bot).
  useEffect(() => {
    formDibukaPada.current = Date.now();
  }, []);

  // Jumlah kata deskripsi.
  const jumlahKata = hitungJumlahKata(deskripsi);
  // Syarat laporan terverifikasi terpenuhi: ada foto + GPS dicek + deskripsi >= 8 kata.
  const bolehKirim = syaratTerverifikasi({
    jumlahFoto: fotoIds.length,
    gpsVerified,
    jumlahKata,
  });
  // Lebar progress bar deskripsi (objek single-brace untuk style dinamis).
  const progressStyle = {
    width: Math.min(100, Math.round((jumlahKata / 15) * 100)) + "%",
  };

  // Terima hasil foto dari kamera, simpan blob, tambahkan id-nya.
  const handleCapture = useCallback(
    (base64) => {
      const id = saveFoto(base64);
      setFotoIds((list) => [...list, id]);
      showToast(
        "success",
        "Foto berhasil diambil",
        `Total: ${fotoIds.length + 1} foto`,
      );
    },
    [fotoIds.length, showToast],
  );

  // Verifikasi GPS: hitung jarak ke pusat kecamatan. Apapun hasilnya, laporan tetap bisa dikirim.
  const verifikasiGps = () => {
    setGpsPesan("Mengambil lokasi GPS...");
    if (!navigator.geolocation) {
      setGpsVerified(true);
      setGpsPesan("GPS tidak tersedia - laporan tetap diterima");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const pusat = KECAMATAN_COORDS[KECAMATAN_CODE[kecamatan]];
        const km = jarakKm(pos.coords.latitude, pos.coords.longitude, pusat);
        setGpsVerified(true);
        setGpsPesan(
          km <= 5
            ? `✅ GPS Terverifikasi — ${km.toFixed(1)} km dari ${kecamatan}`
            : `📍 Lokasi ${km.toFixed(1)} km dari kecamatan — laporan tetap diterima`,
        );
      },
      () => {
        setGpsVerified(true);
        setGpsPesan("GPS ditolak - laporan tetap bisa dikirim");
      },
    );
  };

  // Kirim laporan: validasi, hitung skor, buat ID, simpan ke db + rantai audit, perbarui profil perangkat.
  const kirimLaporan = () => {
    if (Date.now() - formDibukaPada.current < 8000) {
      return showToast(
        "error",
        "Terlalu cepat",
        "Form perlu diisi dengan teliti",
      );
    }
    if (!sekolah.trim()) {
      return showToast("error", "Nama sekolah kosong", "");
    }

    const profile = readDeviceProfile();
    const kredibilitas = hitungKredibilitas({
      suspectScore: profile.suspectScore,
      jumlahKata,
      jumlahFoto: fotoIds.length,
    });

    const tahun = new Date().getFullYear();
    const db = readDatabase();
    const urut = String(db.laporan.length + 1).padStart(3, "0");
    const kode = KECAMATAN_CODE[kecamatan] || "MJK";
    const id = `MJK-${kode}-${tahun}-${urut}`;

    const laporan = {
      id,
      tanggal: new Date().toISOString().split("T")[0],
      waktu: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sekolah: sekolah.trim(),
      wilayah: kecamatan,
      jenis,
      deskripsi,
      status: "pending",
      fotoLaporan: fotoIds,
      fotoVerif: [],
      hash: randomBlockHash(),
      verified_by: null,
      catatanVerifikasi: null,
      deviceId: profile.deviceId,
      kredibilitas,
    };

    db.laporan.push(laporan);
    appendAuditBlock(db, laporan);
    saveDatabase(db);

    profile.laporanCount++;
    profile.history = [
      ...profile.history,
      { ts: Date.now(), jenis, wilayah: kecamatan },
    ];
    saveDeviceProfile(profile);

    refreshDB();
    showToast(
      "success",
      "Laporan terkirim!",
      `ID: ${id} - tercatat di jejak audit`,
    );
    navigate("m-riwayat");
  };

  // --- Layar blokir (banned / batas harian) ---
  if (rateLimit.alasan === "banned") {
    return (
      <div>
        <div className="page-header">
          <h2>Buat Laporan MBG</h2>
        </div>
        <div className="block-card block-card-red">
          <div className="block-emoji">🚫</div>
          <strong>Akses Diblokir</strong>
          <p>Perangkat ini terdeteksi aktivitas tidak wajar.</p>
        </div>
      </div>
    );
  }
  if (rateLimit.alasan === "limit") {
    return (
      <div>
        <div className="page-header">
          <h2>Buat Laporan MBG</h2>
        </div>
        <div className="block-card block-card-amber">
          <div className="block-emoji">⏳</div>
          <strong>Batas Laporan Harian Tercapai</strong>
          <p>Maks. 3 laporan/hari per perangkat.</p>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate("m-riwayat")}
          >
            Lihat Riwayat
          </button>
        </div>
      </div>
    );
  }

  // Status langkah verifikasi (untuk styling nomor langkah).
  const stepFoto = fotoIds.length > 0 ? "done" : "active";
  const stepGps = fotoIds.length > 0 ? (gpsVerified ? "done" : "active") : "";
  const stepDesk = gpsVerified ? (jumlahKata >= 8 ? "done" : "active") : "";
  const langkah = [
    {
      num: stepFoto,
      title: "📷 Foto Kamera Langsung (WAJIB)",
      desc: "Foto diambil langsung dari kamera - bot tidak bisa memalsukan foto realtime dari lokasi.",
    },
    {
      num: stepGps,
      title: "📍 Verifikasi GPS Lokasi",
      desc: "Membuktikan pelapor berada di area kecamatan. GPS ditolak = laporan tetap masuk tapi skor lebih rendah.",
    },
    {
      num: stepDesk,
      title: "📝 Deskripsi Min. 8 Kata",
      desc: "Bot cenderung mengisi deskripsi sangat singkat. Deskripsi panjang = lebih kredibel.",
    },
  ];
  const kurang = [
    fotoIds.length === 0 && "foto kamera",
    !gpsVerified && "verifikasi GPS",
    jumlahKata < 8 && "deskripsi min. 8 kata",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      {cameraOpen && (
        <CameraCapture
          onCapture={handleCapture}
          onClose={() => setCameraOpen(false)}
        />
      )}

      <div className="page-header">
        <h2>📝 Buat Laporan MBG</h2>
        <p>
          Verifikasi berlapis - memastikan laporan dari manusia nyata di lokasi
        </p>
      </div>

      {/* Panel syarat laporan terverifikasi */}
      <div className="hv-panel">
        <div className="hv-panel-title">🛡️ Syarat Laporan Terverifikasi</div>
        {langkah.map((step, i) => (
          <div className="hv-step" key={i}>
            <div className={`hv-step-num ${step.num}`}>{i + 1}</div>
            <div className="hv-step-body">
              <div className="hv-step-title">{step.title}</div>
              <div className="hv-step-desc">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form laporan */}
      <div className="report-form">
        <div className="form-section-title">📍 Lokasi Kejadian</div>
        <div className="form-row">
          <div className="form-group">
            <label>Kecamatan *</label>
            <select
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
            >
              {KECAMATAN_LIST.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Nama Sekolah *</label>
            <input
              type="text"
              placeholder="cth: SDN Prajurit Kulon 1"
              value={sekolah}
              onChange={(e) => setSekolah(e.target.value)}
            />
          </div>
        </div>

        <div className="gps-block">
          <button
            className="btn btn-blue btn-sm gps-btn"
            onClick={verifikasiGps}
          >
            📍 Verifikasi GPS Sekarang
          </button>
          {gpsPesan && <div className="gps-pesan">{gpsPesan}</div>}
        </div>

        <div className="form-section-title">⚠️ Detail Masalah</div>
        <div className="form-row">
          <div className="form-group">
            <label>Jenis Masalah *</label>
            <select value={jenis} onChange={(e) => setJenis(e.target.value)}>
              {JENIS_LAPORAN.map((j) => (
                <option key={j}>{j}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Waktu Kejadian</label>
            <input
              type="datetime-local"
              value={waktu}
              onChange={(e) => setWaktu(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            Deskripsi Lengkap *{" "}
            <span className="label-hint">(min. 8 kata)</span>
          </label>
          <textarea
            className="deskripsi-input"
            placeholder="Ceritakan kondisi yang Anda temui secara detail: makanannya bagaimana, waktunya kapan, kondisi siswa seperti apa..."
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
          <div className="desk-meter">
            <div className="progress-bar">
              <div className="progress-fill" style={progressStyle} />
            </div>
            <div className="desk-hint">
              {jumlahKata < 8
                ? `⚠️ Minimal 8 kata (${jumlahKata} ditulis)`
                : jumlahKata < 15
                  ? `✅ Cukup (${jumlahKata} kata) — lebih detail lebih baik`
                  : `⭐ Deskripsi lengkap (${jumlahKata} kata)`}
            </div>
          </div>
        </div>

        <div className="form-section-title">
          📷 Foto Kamera Langsung (WAJIB)
        </div>
        <div className="foto-warning">
          <span>📷</span>
          <span>
            Foto <strong>harus diambil langsung dari kamera</strong> - tidak
            bisa dipilih dari galeri. Ini memastikan foto diambil nyata di
            lokasi kejadian.
          </span>
        </div>
        <div
          className={`foto-dropzone${fotoIds.length > 0 ? " has-foto" : ""}`}
          onClick={() => setCameraOpen(true)}
        >
          {fotoIds.length > 0 ? (
            <div className="foto-count">
              ✅ {fotoIds.length} foto terambil — ketuk untuk tambah
            </div>
          ) : (
            <div className="foto-cta">📷 Ketuk untuk buka kamera</div>
          )}
        </div>

        {/* Status kelengkapan */}
        {bolehKirim ? (
          <div className="submit-ready">
            ✅ Semua syarat terpenuhi — laporan siap dikirim
          </div>
        ) : (
          <div className="submit-todo">Lengkapi: {kurang}</div>
        )}

        <div className="privacy-note">
          🔒 <strong>Privasi terjamin:</strong> Tidak ada nama, NIK, atau nomor
          HP yang dikumpulkan. GPS hanya dicek sekali saat submit.
        </div>

        <div className="form-actions">
          <button
            className="btn btn-green btn-kirim"
            disabled={!bolehKirim}
            onClick={kirimLaporan}
          >
            🚀 Kirim Laporan
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate("m-riwayat")}
          >
            📋 Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}
