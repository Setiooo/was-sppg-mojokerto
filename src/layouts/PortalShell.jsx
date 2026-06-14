// Kerangka portal setelah login: sidebar + area konten halaman aktif.
// Reproduksi 1:1 root `Z` sumber asli: memetakan `page` ke komponen halaman lewat satu peta rute
// gabungan (masyarakat + pemda + bgn), sepadan dengan objek `X`.
import React from "react";
import { useApp } from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";
import { MASYARAKAT_PAGES } from "../pages/masyarakat/index.js";
import { PEMDA_PAGES } from "../pages/pemda/index.js";
import { BGN_PAGES } from "../pages/bgn/index.js";

// Peta rute gabungan seluruh portal (sepadan dengan `X` pada bundel asli).
const ROUTES = {
  ...MASYARAKAT_PAGES,
  ...PEMDA_PAGES,
  ...BGN_PAGES,
};

export default function PortalShell() {
  const { page } = useApp();
  const Page = ROUTES[page];
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content" style={{ paddingTop: "1.75rem" }}>
        {Page ? (
          <Page />
        ) : (
          <div style={{ padding: "2rem", color: "var(--muted)" }}>
            Halaman tidak ditemukan.
          </div>
        )}
      </main>
    </div>
  );
}
