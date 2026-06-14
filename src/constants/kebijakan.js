// Agenda kebijakan BGN + peta status badge.
// KEBIJAKAN = array `J`, KEBIJAKAN_STATUS = peta `Y`.
export const KEBIJAKAN = [
  {
    title: "Standarisasi Kualitas MBG Kota Mojokerto",
    status: "Aktif",
    desc: "Standar minimum gizi per porsi di 3 kecamatan berdasarkan data laporan yang masuk.",
    prioritas: "Tinggi",
  },
  {
    title: "Audit Darurat SPPG Magersari Kedundung 2",
    status: "Berjalan",
    desc: "Investigasi lapangan menyusul lonjakan 5 laporan. Tim audit Pemkot dijadwalkan minggu ini.",
    prioritas: "Tinggi",
  },
  {
    title: "GPS Tracking Kendaraan SPPG",
    status: "Draft",
    desc: "Integrasi GPS kendaraan distribusi untuk monitoring ketepatan waktu pengiriman MBG real-time.",
    prioritas: "Sedang",
  },
  {
    title: "Sosialisasi Pelaporan Warga Mojokerto",
    status: "Draft",
    desc: "Sosialisasi penggunaan WAS-SPPG ke warga, guru, dan komite sekolah di 3 kecamatan.",
    prioritas: "Sedang",
  },
  {
    title: "Pelatihan Pengelola SPPG",
    status: "Draft",
    desc: "Modul pelatihan food safety dan hygiene untuk 18 pengelola SPPG Kota Mojokerto.",
    prioritas: "Sedang",
  },
];

export const KEBIJAKAN_STATUS = {
  Aktif: ["status-done", "✅ Aktif"],
  Berjalan: ["status-verified", "🔵 Berjalan"],
  Draft: ["status-pending", "📝 Draft"],
};
