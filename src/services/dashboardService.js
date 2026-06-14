// dashboardService.js — Skor kredibilitas laporan untuk kartu statistik & dashboard.
// Dari modul asli credibility.js (verbatim).
export function hitungKredibilitas({ suspectScore, jumlahKata, jumlahFoto }) {
  let skor = 45; // basis
  if (jumlahKata >= 20) skor += 15;
  else if (jumlahKata >= 10) skor += 8;
  if (jumlahFoto > 0) skor += 20;
  if (jumlahFoto >= 2) skor += 5;
  if (suspectScore < 20) skor += 8;
  if (suspectScore >= 50) skor -= 15;
  if (suspectScore >= 70) skor -= 20;
  return Math.max(0, Math.min(100, skor));
}
