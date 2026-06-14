// Berita terkini program MBG. Reproduksi 1:1 komponen `Berita` sumber asli.
// Mengambil Google News RSS via proxy allorigins, mem-parse XML, menampilkan 6 item.
import React, { useEffect, useState } from "react";
import { waktuRelatif } from "../../utils/formatter.js";

export default function Berita() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = () => {
    setStatus("loading");
    const q = encodeURIComponent('"Makan Bergizi Gratis" OR "SPPG" Mojokerto');
    const rss =
      "https://news.google.com/rss/search?q=" + q + "&hl=id&gl=ID&ceid=ID:id";
    const url = "https://api.allorigins.win/raw?url=" + encodeURIComponent(rss);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw 0;
        return r.text();
      })
      .then((t) => {
        const x = new DOMParser().parseFromString(t, "text/xml");
        const parsed = [...x.querySelectorAll("item")]
          .slice(0, 6)
          .map((it) => ({
            title: it.querySelector("title")?.textContent || "",
            link: it.querySelector("link")?.textContent || "",
            date: it.querySelector("pubDate")?.textContent || "",
            src: it.querySelector("source")?.textContent || "",
          }))
          .filter((i) => i.title);
        if (!parsed.length) throw 0;
        setItems(parsed);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    load();
  }, []);

  const rel = waktuRelatif;

  return (
    <div
      className="berita-section"
      style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 1.5rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.2rem",
          flexWrap: "wrap",
          gap: ".6rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.4rem", color: "var(--g-deep)", margin: 0 }}>
            📰 Berita Terkini Program Makan Bergizi Gratis
          </h2>
          <p
            style={{
              fontSize: ".8rem",
              color: "var(--g-mid)",
              margin: ".3rem 0 0",
            }}
          >
            Sumber: Google News · diperbarui otomatis saat halaman dibuka
          </p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={load}>
          🔄 Muat ulang
        </button>
      </div>
      {status === "loading" && (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "var(--g-mid)",
            fontSize: ".9rem",
          }}
        >
          ⏳ Memuat berita terbaru…
        </div>
      )}
      {status === "error" && (
        <div
          style={{
            padding: "1.4rem",
            textAlign: "center",
            background: "var(--g-pale)",
            borderRadius: 14,
            color: "var(--g-mid)",
            fontSize: ".88rem",
          }}
        >
          ⚠️ Tidak dapat memuat berita. Periksa koneksi internet, lalu coba muat
          ulang.
          <br />
          <button
            className="btn btn-green btn-sm"
            style={{ marginTop: ".8rem" }}
            onClick={load}
          >
            Coba lagi
          </button>
        </div>
      )}
      {status === "ok" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
          }}
        >
          {items.map((b, i) => (
            <a
              key={i}
              href={b.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid var(--g-pale)",
                borderRadius: 14,
                padding: "1.1rem",
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,.05)",
              }}
            >
              <div
                style={{
                  fontSize: ".95rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.4,
                  marginBottom: ".5rem",
                }}
              >
                {b.title}
              </div>
              <div
                style={{
                  fontSize: ".74rem",
                  color: "var(--g-mid)",
                  display: "flex",
                  gap: ".5rem",
                  flexWrap: "wrap",
                }}
              >
                {b.src && (
                  <span style={{ fontWeight: 600, color: "var(--g-deep)" }}>
                    {b.src}
                  </span>
                )}
                {rel(b.date) && <span>· {rel(b.date)}</span>}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
