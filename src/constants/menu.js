// Menu sidebar per peran. Verbatim dari konstanta `z` sumber asli.
// Catatan: hanya menu `masyarakat` yang sudah diimplementasikan penuh pada source modular ini.
// Menu `pemda` & `bgn` dipertahankan agar struktur navigasi tetap utuh untuk pengembangan portal berikutnya.
export const MENUS = {
  masyarakat: [
    { id: "m-lapor", icon: "📝", label: "Buat Laporan" },
    { id: "m-riwayat", icon: "📋", label: "Riwayat Laporan" },
    { id: "m-blockchain", icon: "🧾", label: "Jejak Audit" },
    { id: "m-notif", icon: "🔔", label: "Notifikasi" },
  ],
  pemda: [
    { id: "pd-home", icon: "🏠", label: "Dashboard" },
    { id: "pd-verifikasi", icon: "✅", label: "Verifikasi Laporan" },
    { id: "pd-laporan", icon: "📊", label: "Semua Laporan" },
    { id: "pd-sppg", icon: "🍱", label: "Monitor SPPG" },
    { id: "pd-blockchain", icon: "🧾", label: "Jejak Audit" },
    { id: "pd-notif", icon: "🔔", label: "Notifikasi" },
  ],
  bgn: [
    { id: "bgn-home", icon: "🏠", label: "Control Center" },
    { id: "bgn-peta", icon: "🗺️", label: "Peta Kecamatan" },
    { id: "bgn-laporan", icon: "📋", label: "Semua Laporan" },
    { id: "bgn-sppg", icon: "🍱", label: "Manajemen SPPG" },
    { id: "bgn-blockchain", icon: "🧾", label: "Jejak Audit" },
    { id: "bgn-kebijakan", icon: "📌", label: "Kebijakan" },
  ],
};
