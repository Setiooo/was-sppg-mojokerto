// Halaman landing + pemilihan peran & login. Reproduksi 1:1 komponen landing `E` sumber asli.
// Masyarakat masuk anonim langsung. Pemda & BGN login lewat modal (kredensial demo pra-isi, read-only) lalu klik tombol.
import React, { useState, useRef } from "react";
import { useApp } from "../context/AppContext.jsx";
import { KECAMATAN_LIST } from "../constants/kecamatan.js";
import Berita from "../components/common/Berita.jsx";
import LandingStats from "../components/dashboard/LandingStats.jsx";
import logoKota from "../assets/images/mjk_jpeg0.jpg";
import logoBgn from "../assets/images/mjk_jpeg1.jpg";

export default function Landing() {
  const { login } = useApp();
  const [modal, setModal] = useState(null); // null | "info" | "pemda" | "bgn"
  const [kecBgn, setKecBgn] = useState(KECAMATAN_LIST[0]);
  const portalRef = useRef(null);

  const scrollToPortal = () =>
    portalRef.current?.scrollIntoView({ behavior: "smooth" });

  const tutupJikaOverlay = (e) => {
    if (e.target === e.currentTarget) setModal(null);
  };

  return (
    <>
      <nav className="land-nav">
        <div className="logo">
          <div className="logo-box">🌾</div> WAS-SPPG
          <span
            style={{
              fontSize: ".62rem",
              background: "var(--g-pale)",
              color: "var(--g-mid)",
              padding: ".18rem .55rem",
              borderRadius: 100,
              marginLeft: ".35rem",
              fontWeight: 700,
            }}
          >
            KOTA MOJOKERTO
          </span>
        </div>
        <div className="nav-btns">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setModal("info")}
          >
            📖 Tentang
          </button>
          <button className="btn btn-green btn-sm" onClick={scrollToPortal}>
            Masuk →
          </button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="badge">
            <span className="dot" /> Sistem Aktif · 18 SPPG · 3 Kecamatan
          </div>
          <h1>
            Sistem Pengawasan Digital Partisipatif
            <br />
            Program Makan Bergizi Gratis Kota{" "}
            <span className="accent">Mojokerto</span>
          </h1>
          <p className="hero-p">
            WAS-SPPG: Sistem Pengawasan Digital Partisipatif Program Makan
            Bergizi Gratis Kota Mojokerto. Pengawasan, pelaporan, verifikasi,
            monitoring, dan evaluasi pelaksanaan Program Gizi secara transparan,
            akuntabel, dan berbasis data.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-green btn-big" onClick={scrollToPortal}>
              🔐 Masuk ke Sistem
            </button>
            <button
              className="btn btn-outline btn-big"
              onClick={() => setModal("info")}
            >
              Pelajari Sistem
            </button>
          </div>
        </div>
      </div>

      <div className="portal" id="portal-section" ref={portalRef}>
        <h2 className="portal-title">Pilih Peran Anda</h2>
        <p className="portal-sub">
          Masyarakat bisa langsung masuk - tidak perlu daftar, tidak perlu NIK
        </p>
        <div className="portal-grid">
          <div
            className="portal-card"
            onClick={() =>
              login({
                role: "masyarakat",
                label: "Masyarakat",
                avatar: "👤",
                nama: "Pelapor Anonim",
              })
            }
          >
            <span className="portal-icon">👨‍👩‍👧</span>
            <div className="role-tag">PELAPOR · TANPA REGISTRASI</div>
            <h3>Masyarakat</h3>
            <p>
              Klik dan langsung buat laporan. Tidak perlu NIK, nama, atau nomor
              HP. Identitas Anda sepenuhnya anonim.
            </p>
            <button className="btn btn-green" style={{ width: "100%" }}>
              Masuk Langsung & Lapor →
            </button>
          </div>

          <div className="portal-card" onClick={() => setModal("pemda")}>
            <span className="portal-icon">
              <img
                src={logoKota}
                alt="Lambang Kota Mojokerto"
                className="portal-crest"
              />
            </span>
            <div className="role-tag">VERIFIKATOR</div>
            <h3>Pemerintah Kota</h3>
            <p>
              Dinas terkait Kota Mojokerto - verifikasi laporan dan evaluasi
              kinerja SPPG di 3 kecamatan.
            </p>
            <button className="btn btn-blue" style={{ width: "100%" }}>
              Masuk sebagai Pemkot →
            </button>
          </div>

          <div className="portal-card" onClick={() => setModal("bgn")}>
            <span className="portal-icon">
              <img
                src={logoBgn}
                alt="Lambang Badan Gizi Nasional"
                className="portal-crest"
              />
            </span>
            <div className="role-tag">ADMIN KOTA</div>
            <h3>BGN / SPPG Mojokerto</h3>
            <p>
              BGN koordinator Kota Mojokerto dan pengelola SPPG untuk monitoring
              data seluruh kecamatan.
            </p>
            <button className="btn btn-amber" style={{ width: "100%" }}>
              Masuk sebagai BGN/SPPG →
            </button>
          </div>
        </div>
      </div>

      <LandingStats />

      <Berita />

      {modal === "info" && (
        <div className="modal-overlay open" onClick={tutupJikaOverlay}>
          <div className="modal">
            <button className="modal-close" onClick={() => setModal(null)}>
              ✕
            </button>
            <h2>📖 Tentang WAS-SPPG</h2>
            <p className="modal-sub">
              Sistem pengawasan partisipatif 3 kecamatan
            </p>
            <div
              style={{
                fontSize: ".85rem",
                lineHeight: 1.7,
                color: "var(--ink)",
              }}
            >
              <p style={{ marginBottom: ".7rem" }}>
                <strong style={{ color: "var(--g-deep)" }}>🌾 WAS-SPPG</strong>{" "}
                WAS-SPPG - Sistem Pengawasan Digital Partisipatif Program Makan
                Bergizi Gratis - merupakan platform digital untuk pengawasan,
                pelaporan, verifikasi, monitoring, dan evaluasi pelaksanaan
                Program Gizi secara transparan, akuntabel, dan berbasis data.
              </p>
              <p style={{ marginBottom: ".7rem" }}>
                <strong style={{ color: "var(--g-deep)" }}>🔵 Pemkot:</strong>{" "}
                Login untuk verifikasi laporan di Kec. Prajurit Kulon,
                Magersari, dan Kranggan.
              </p>
              <p style={{ marginBottom: ".7rem" }}>
                <strong style={{ color: "var(--g-deep)" }}>🟡 BGN/SPPG:</strong>{" "}
                Monitor data seluruh Kota Mojokerto real-time.
              </p>
              <p style={{ marginBottom: ".7rem" }}>
                <strong style={{ color: "var(--g-deep)" }}>
                  👤 Masyarakat:
                </strong>{" "}
                Lapor langsung tanpa registrasi, anonim 100%.
              </p>
              <div
                style={{
                  background: "var(--g-pale)",
                  borderRadius: 10,
                  padding: ".85rem",
                  marginTop: "1rem",
                  fontSize: ".78rem",
                  color: "var(--muted)",
                }}
              >
                🧾 Semua laporan tercatat dalam jejak audit dengan kode
                verifikasi unik & stempel waktu.
              </div>
            </div>
          </div>
        </div>
      )}

      {modal === "pemda" && (
        <div className="modal-overlay open" onClick={tutupJikaOverlay}>
          <div className="modal">
            <button className="modal-close" onClick={() => setModal(null)}>
              ✕
            </button>
            <h2>🏛️ Login Pemerintah Kota</h2>
            <p className="modal-sub">Verifikator laporan MBG Kota Mojokerto</p>
            <div
              style={{
                background: "var(--g-pale)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: ".85rem",
                marginBottom: "1rem",
                fontSize: ".78rem",
                color: "var(--muted)",
              }}
            >
              <strong
                style={{
                  color: "var(--g-deep)",
                  display: "block",
                  marginBottom: ".25rem",
                }}
              >
                Demo credentials
              </strong>
              Username: <code>pemkot</code> · Password:{" "}
              <code>mojokerto2025</code>
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" defaultValue="pemkot" readOnly />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" defaultValue="mojokerto2025" readOnly />
            </div>
            <button
              className="btn btn-blue"
              style={{ width: "100%" }}
              onClick={() => {
                login({
                  role: "pemda",
                  label: "Pemerintah Kota",
                  avatar: "🏛️",
                  nama: "Pemkot Mojokerto",
                });
                setModal(null);
              }}
            >
              Masuk sebagai Pemkot →
            </button>
          </div>
        </div>
      )}

      {modal === "bgn" && (
        <div className="modal-overlay open" onClick={tutupJikaOverlay}>
          <div className="modal">
            <button className="modal-close" onClick={() => setModal(null)}>
              ✕
            </button>
            <h2>🇮🇩 Login BGN / SPPG Mojokerto</h2>
            <p className="modal-sub">Admin BGN koordinator Kota Mojokerto</p>
            <div
              style={{
                background: "var(--amber-lt)",
                border: "1px solid #fcd34d",
                borderRadius: 10,
                padding: ".85rem",
                marginBottom: "1rem",
                fontSize: ".78rem",
                color: "#92400e",
              }}
            >
              <strong style={{ display: "block", marginBottom: ".25rem" }}>
                Demo credentials
              </strong>
              Username: <code>bgn.mojokerto</code> · Password:{" "}
              <code>bgn2025</code>
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" defaultValue="bgn.mojokerto" readOnly />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" defaultValue="bgn2025" readOnly />
            </div>
            <div className="form-group">
              <label>Kecamatan</label>
              <select
                value={kecBgn}
                onChange={(e) => setKecBgn(e.target.value)}
              >
                {KECAMATAN_LIST.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-amber"
              style={{ width: "100%" }}
              onClick={() => {
                login({
                  role: "bgn",
                  label: "BGN / SPPG " + kecBgn.replace("Kec. ", ""),
                  avatar: "🇮🇩",
                  nama: "Admin BGN " + kecBgn.replace("Kec. ", ""),
                  unit: kecBgn,
                  wilayah: kecBgn,
                });
                setModal(null);
              }}
            >
              Masuk sebagai BGN/SPPG →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
