// Halaman "Jejak Audit" (menu m-blockchain). Direproduksi dari komponen `K` sumber asli.
// Menampilkan rantai catatan audit secara kronologis terbalik (terbaru di atas).
import React from "react";
import { useApp } from "../../context/AppContext.jsx";

export default function JejakAudit() {
  const { db } = useApp();
  const rantai = [...db.blockchain].reverse();

  return (
    <div>
      <div className="page-header">
        <h2>🧾 Jejak Audit Digital</h2>
        <p>Riwayat pencatatan laporan secara kronologis</p>
      </div>

      <div className="chain-summary">
        🧾 <strong>{db.blockchain.length} catatan tercatat</strong> · Catatan
        awal: <code>9e2b4f1c…</code> ·{" "}
        <span className="chain-valid">✅ VALID</span>
      </div>

      {rantai.map((blok, i) => (
        <div className="chain-item" key={blok.block}>
          <div className="chain-block-col">
            <div className="chain-block-no">#{blok.block}</div>
            {i < rantai.length - 1 && <div className="chain-connector" />}
          </div>
          <div className="chain-body">
            <div className="chain-row">
              <span className="chain-laporan">
                {blok.laporan === "GENESIS"
                  ? "🌱 Catatan Awal"
                  : `📋 ${blok.laporan}`}
              </span>
              <span className="chain-ts">{blok.ts}</span>
            </div>
            <div className="chain-hashes">
              <span>
                Hash: <span className="chain-hash">{blok.hash}</span>
              </span>
              <span className="cell-muted">
                Prev:{" "}
                <span className="chain-hash">{blok.prev.slice(0, 8)}…</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
