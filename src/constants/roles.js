// roles.js — Peran pengguna & halaman awal tiap peran.
// Dipusatkan dari nilai inline di AppContext (HALAMAN_AWAL_PER_ROLE) — perilaku tetap.
export const ROLES = { masyarakat: "masyarakat", pemda: "pemda", bgn: "bgn" };

export const HALAMAN_AWAL_PER_ROLE = {
  masyarakat: "m-lapor",
  pemda: "pd-home",
  bgn: "bgn-home",
};
