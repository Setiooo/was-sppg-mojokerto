// validators.js — Validasi & syarat kelayakan laporan.
// Diekstrak dari logika inline komponen BuatLaporan (perilaku dipertahankan).
export function hitungJumlahKata(teks) {
  return teks.trim().split(/\s+/).filter(Boolean).length;
}

export function syaratTerverifikasi({ jumlahFoto, gpsVerified, jumlahKata }) {
  return jumlahFoto > 0 && gpsVerified && jumlahKata >= 8;
}
