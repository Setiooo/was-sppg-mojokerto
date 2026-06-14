// verifikasiService.js — Foto bukti verifikasi + generator avatar fallback.
// Dari modul asli photoStore.js. CRUD database diambil dari laporanService.js.
import { readDatabase, saveDatabase } from "./laporanService.js";
import { stringHash } from "../utils/helpers.js";

const AVATAR_PALETTE = [
  ["#166534", "#bbf7d0", "🍱"],
  ["#1e40af", "#dbeafe", "📋"],
  ["#7c3aed", "#ede9fe", "🔍"],
  ["#92400e", "#fef3c7", "📷"],
];

export function generateAvatar(key) {
  const t = stringHash(key);
  const [bg, , emoji] = AVATAR_PALETTE[Math.abs(t) % AVATAR_PALETTE.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}" rx="10"/><text x="100" y="110" text-anchor="middle" font-size="70">${emoji}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

export function saveFoto(base64) {
  const id =
    "foto_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
  const db = readDatabase();
  if (!db.fotoBlobs) db.fotoBlobs = {};
  db.fotoBlobs[id] = base64;
  saveDatabase(db);
  return id;
}

export function resolveFoto(id) {
  if (id.startsWith("__demo")) return generateAvatar(id);
  const db = readDatabase();
  return (db.fotoBlobs && db.fotoBlobs[id]) || generateAvatar(id);
}
