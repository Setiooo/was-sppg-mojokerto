// Peta halaman Portal BGN (bgn-*): id menu -> komponen halaman.
// Sepadan dengan entri "bgn-*" pada objek peta rute `X` sumber asli.
// SemuaLaporan (W) & MonitorSppg (q) dipakai bersama dengan portal Pemda; Jejak Audit (K) lintas-peran.
import ControlCenter from "./ControlCenter.jsx";
import PetaKecamatan from "./PetaKecamatan.jsx";
import Kebijakan from "./Kebijakan.jsx";
import SemuaLaporan from "../monitoring/SemuaLaporan.jsx";
import MonitorSppg from "../monitoring/MonitorSppg.jsx";
import JejakAudit from "../masyarakat/JejakAudit.jsx";

export const BGN_PAGES = {
  "bgn-home": ControlCenter,
  "bgn-peta": PetaKecamatan,
  "bgn-laporan": SemuaLaporan,
  "bgn-sppg": MonitorSppg,
  "bgn-blockchain": JejakAudit,
  "bgn-kebijakan": Kebijakan,
};
