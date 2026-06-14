// Sidebar navigasi + topbar mobile. Direproduksi dari komponen `M` sumber asli.
// Catatan gaya: styling memakai class CSS bawaan (sidebar, nav-item, dst.) tanpa inline style.
import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { MENUS } from "../constants/menu.js";
import logoKota from "../assets/images/mjk_jpeg0.jpg";
import logoBgn from "../assets/images/mjk_jpeg1.jpg";

export default function Sidebar() {
  const { user, page, navigate, logout } = useApp();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  const items = MENUS[user.role] ?? [];

  return (
    <>
      {/* Topbar khusus mobile */}
      <div className="mobile-topbar mobile-only-flex">
        <button className="hamburger" onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
        <div className="logo logo-sm">
          <div className="logo-box">🌾</div> WAS-SPPG
        </div>
      </div>

      <div
        className={`sidebar-overlay${open ? " show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar${open ? " open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-box logo-box-ghost">🌾</div>
          <span>WAS-SPPG</span>
        </div>

        <div className="nav-section">Menu</div>
        {items.map((item) => (
          <button
            key={item.id}
            className={`nav-item${page === item.id ? " active" : ""}`}
            onClick={() => {
              navigate(item.id);
              setOpen(false);
            }}
          >
            <span className="ni">{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div className="sidebar-user">
          <div className="su-name">
            {user.role === "pemda" ? (
              <img
                src={logoKota}
                className="su-crest"
                alt="Lambang Kota Mojokerto"
              />
            ) : user.role === "bgn" ? (
              <img
                src={logoBgn}
                className="su-crest"
                alt="Lambang Badan Gizi Nasional"
              />
            ) : (
              user.avatar
            )}{" "}
            {user.nama}
          </div>
          <div className="su-role">
            {user.label}
            {user.wilayah ? " · " + user.wilayah : ""}
          </div>
          <button className="su-logout" onClick={logout}>
            🚪 Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
