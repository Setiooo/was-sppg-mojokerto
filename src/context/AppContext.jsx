// Context global aplikasi. Direproduksi persis dari provider `j` sumber asli.
// Menyimpan: layar (landing/app), user aktif, halaman aktif, snapshot db, daftar toast,
// serta aksi login/logout/navigate/refresh/showToast/updateLaporanStatus/addFotoVerif.
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  readDatabase,
  saveDatabase,
  seedDatabase,
} from "../services/laporanService.js";
import { HALAMAN_AWAL_PER_ROLE } from "../constants/roles.js";

const AppContext = createContext(null);

// Hook akses context (sepadan dengan S() di sumber asli).
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [screen, setScreen] = useState("landing"); // "landing" | "app"
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("");
  const [db, setDb] = useState(() => {
    try {
      return readDatabase() || seedDatabase();
    } catch {
      return seedDatabase();
    }
  });
  const [toasts, setToasts] = useState([]);
  const toastSeq = useRef(0);

  // Tampilkan toast yang otomatis hilang setelah 4,5 detik.
  const showToast = useCallback((type, title, msg = "") => {
    const id = ++toastSeq.current;
    setToasts((list) => [...list, { id, type, title, msg }]);
    setTimeout(
      () => setToasts((list) => list.filter((t) => t.id !== id)),
      4500,
    );
  }, []);

  // Muat ulang snapshot db dari localStorage (dipakai setelah submit laporan).
  const refreshDB = useCallback(() => {
    setDb({ ...readDatabase() });
  }, []);

  const login = useCallback(
    (u) => {
      setUser(u);
      setScreen("app");
      setPage(HALAMAN_AWAL_PER_ROLE[u.role]);
      showToast("success", "Masuk berhasil!", "Selamat datang, " + u.nama);
    },
    [showToast],
  );

  const logout = useCallback(() => {
    setUser(null);
    setScreen("landing");
    setPage("");
    showToast("info", "Keluar", "Sampai jumpa!");
  }, [showToast]);

  const navigate = useCallback((p) => setPage(p), []);

  // Ubah status laporan (dipakai portal Pemda). Disertakan agar kontrak context tetap utuh.
  const updateLaporanStatus = useCallback((id, status, verifiedBy, catatan) => {
    const next = readDatabase();
    const r = next.laporan.find((l) => l.id === id);
    if (r) {
      r.status = status;
      if (verifiedBy) r.verified_by = verifiedBy;
      if (catatan !== undefined) r.catatanVerifikasi = catatan;
      saveDatabase(next);
      setDb({ ...next });
    }
  }, []);

  // Tambah foto verifikasi ke laporan (dipakai portal Pemda).
  const addFotoVerif = useCallback((id, fotoIds) => {
    const next = readDatabase();
    const r = next.laporan.find((l) => l.id === id);
    if (r) {
      r.fotoVerif = [...r.fotoVerif, ...fotoIds];
      saveDatabase(next);
      setDb({ ...next });
    }
  }, []);

  const value = {
    screen,
    user,
    page,
    db,
    toasts,
    login,
    logout,
    navigate,
    refreshDB,
    showToast,
    updateLaporanStatus,
    addFotoVerif,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
