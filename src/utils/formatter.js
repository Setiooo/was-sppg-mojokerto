// formatter.js — Format waktu relatif berbahasa Indonesia.
// Diekstrak verbatim dari fungsi `rel` pada komponen Berita.
export function waktuRelatif(ds) {
  const t = new Date(ds);
  if (isNaN(t)) return "";
  const m = Math.floor((Date.now() - t) / 6e4);
  if (m < 1) return "baru saja";
  if (m < 60) return m + " mnt lalu";
  const h = Math.floor(m / 60);
  if (h < 24) return h + " jam lalu";
  return Math.floor(h / 24) + " hari lalu";
}
