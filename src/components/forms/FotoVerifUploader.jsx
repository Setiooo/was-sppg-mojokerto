// Pengunggah foto verifikasi petugas untuk sebuah laporan. Reproduksi 1:1 komponen `G` sumber asli.
// Semua file dibaca paralel via FileReader -> dataURL -> saveFoto(), lalu dikumpulkan menjadi
// SATU array id dan ditambahkan ke laporan via addFotoVerif(id, arrayFotoIds) — sekali panggil.
import React, { useRef } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { saveFoto, resolveFoto } from "../../services/verifikasiService.js";

export default function FotoVerifUploader({ laporan }) {
  const { addFotoVerif, showToast } = useApp();
  const inputRef = useRef(null);

  const upload = async (fileList) => {
    showToast("info", "Mengupload foto verifikasi...", "");
    const dataUrls = await Promise.all(
      Array.from(fileList).map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }),
      ),
    );
    const ids = dataUrls.map((url) => saveFoto(url));
    addFotoVerif(laporan.id, ids);
    showToast("success", `${fileList.length} foto verifikasi tersimpan`, "");
  };

  return (
    <div className="foto-verif-section">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={async (e) => {
          if (e.target.files?.length) {
            await upload(e.target.files);
            e.target.value = "";
          }
        }}
      />
      <div className="foto-verif-label">
        📸 Foto Bukti Verifikasi Petugas
        <span style={{ fontSize: ".7rem", opacity: 0.7 }}>
          {laporan.fotoVerif.length
            ? `(${laporan.fotoVerif.length} foto)`
            : "(belum ada)"}
        </span>
      </div>
      <div className="foto-verif-grid">
        {laporan.fotoVerif.map((id, i) => (
          <img
            key={id}
            className="foto-thumb"
            src={resolveFoto(id)}
            alt={`Verif ${i + 1}`}
          />
        ))}
        <div className="foto-add-btn" onClick={() => inputRef.current?.click()}>
          <span>＋</span>
          <span>Tambah</span>
        </div>
      </div>
    </div>
  );
}
