// Peta halaman Portal Pemda (pd-*): id menu -> komponen halaman.
// Sepadan dengan entri "pd-*" pada objek peta rute `X` sumber asli.
// Sebagian halaman dipakai bersama (shared) dengan portal BGN: SemuaLaporan (W) & MonitorSppg (q).
// Jejak Audit (K) & Notifikasi (F) juga komponen bersama lintas-peran.
import Dashboard from "./Dashboard.jsx";
import Verifikasi from "./Verifikasi.jsx";
import SemuaLaporan from "../monitoring/SemuaLaporan.jsx";
import MonitorSppg from "../monitoring/MonitorSppg.jsx";
import JejakAudit from "../masyarakat/JejakAudit.jsx";
import Notifikasi from "../masyarakat/Notifikasi.jsx";

export const PEMDA_PAGES = {
  "pd-home": Dashboard,
  "pd-verifikasi": Verifikasi,
  "pd-laporan": SemuaLaporan,
  "pd-sppg": MonitorSppg,
  "pd-blockchain": JejakAudit,
  "pd-notif": Notifikasi,
};
