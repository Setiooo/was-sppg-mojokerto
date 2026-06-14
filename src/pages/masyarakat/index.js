// Peta halaman Portal Masyarakat: id menu -> komponen halaman.
// Sepadan dengan objek peta komponen "m-*" di sumber asli, tetapi terpisah rapi per file.
import BuatLaporan from "./BuatLaporan.jsx";
import RiwayatLaporan from "./RiwayatLaporan.jsx";
import JejakAudit from "./JejakAudit.jsx";
import Notifikasi from "./Notifikasi.jsx";

export const MASYARAKAT_PAGES = {
  "m-lapor": BuatLaporan,
  "m-riwayat": RiwayatLaporan,
  "m-blockchain": JejakAudit,
  "m-notif": Notifikasi,
};
