// laporanService.js — Database laporan + profil perangkat (anti-bot rate-limit).
// Gabungan dari modul asli: reportStore.js (CRUD laporan + blok GENESIS) dan
// deviceProfile.js (profil perangkat & pembatasan laju). Logika dipertahankan verbatim.
import {
  STORAGE_KEY_REPORTS,
  STORAGE_KEY_DEVICE,
} from "../constants/storageKeys.js";
import { SEED_REPORTS } from "../constants/seedReports.js";
import { deviceFingerprintHash } from "../utils/helpers.js";

// ===== Database laporan (dari reportStore.js) =====

// Blok awal (GENESIS) rantai audit — verbatim dari sumber asli.
const GENESIS_BLOCK = {
  block: 1001,
  hash: "9e2b4f1c8d7a3e05",
  prev: "0000000000000000",
  ts: "2025-01-01 00:00:00",
  laporan: "GENESIS",
};

export function seedDatabase() {
  const db = { laporan: SEED_REPORTS, blockchain: [GENESIS_BLOCK] };
  saveDatabase(db);
  return db;
}

export function readDatabase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seedDatabase();
}

export function saveDatabase(db) {
  try {
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(db));
  } catch {}
}

// ===== Profil perangkat anti-bot (dari deviceProfile.js) =====

export function readDeviceProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DEVICE);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    deviceId: deviceFingerprintHash(),
    firstSeen: Date.now(),
    laporanCount: 0,
    cooldownUntil: 0,
    suspectScore: 0,
    banned: false,
    history: [],
  };
}

export function saveDeviceProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY_DEVICE, JSON.stringify(profile));
  } catch {}
}

export function evaluateRateLimit(profile = readDeviceProfile()) {
  if (profile.banned) return { ok: false, alasan: "banned" };
  if (Date.now() < (profile.cooldownUntil || 0)) {
    return { ok: false, alasan: "cooldown", sampai: profile.cooldownUntil };
  }
  const sejak24Jam = Date.now() - 864e5; // 24 jam dalam ms
  const jumlah = (profile.history || []).filter(
    (h) => h.ts > sejak24Jam,
  ).length;
  if (jumlah >= 3) return { ok: false, alasan: "limit", jumlah };
  return { ok: true };
}
