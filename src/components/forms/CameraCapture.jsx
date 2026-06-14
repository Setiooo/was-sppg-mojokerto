// Pengambil foto bukti langsung dari kamera. Direproduksi dari komponen `_` sumber asli.
// Wajib kamera live (getUserMedia) — tidak menerima unggahan galeri, untuk memastikan foto nyata di lokasi.
// Catatan gaya: semua styling memakai class CSS (lihat styles/portal-masyarakat.css), tanpa inline style.
import React, { useRef, useState, useCallback, useEffect } from "react";

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState("starting"); // starting | ready | captured | error
  const [errorMsg, setErrorMsg] = useState("");
  const [snapshot, setSnapshot] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  // Mulai / ganti kamera dengan facingMode tertentu.
  const startCamera = useCallback(async (mode) => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setStatus("starting");
    setSnapshot(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      setErrorMsg(
        "Browser ini tidak mendukung akses kamera. Coba gunakan Chrome atau Safari terbaru.",
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus("ready");
    } catch (e) {
      setStatus("error");
      if (e.name === "NotAllowedError") {
        setErrorMsg(
          "Izin kamera ditolak. Buka Pengaturan browser dan izinkan akses kamera untuk situs ini.",
        );
      } else if (e.name === "NotFoundError") {
        setErrorMsg("Kamera tidak ditemukan di perangkat ini.");
      } else {
        setErrorMsg(`Kamera tidak bisa dibuka: ${e.message}`);
      }
    }
  }, []);

  // Mulai kamera saat mount; hentikan stream saat unmount.
  useEffect(() => {
    startCamera(facingMode);
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopAndClose = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onClose();
  };

  const flipCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  };

  // Ambil frame dari video ke canvas, lalu jadikan JPEG (kualitas 0.88).
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Kamera depan: cerminkan agar tidak terbalik.
    if (facingMode === "user") {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    setSnapshot(canvas.toDataURL("image/jpeg", 0.88));
    setStatus("captured");
  };

  const usePhoto = () => {
    if (!snapshot) return;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onCapture(snapshot);
    onClose();
  };

  return (
    <div className="camera-overlay">
      <div className="camera-topbar">
        <button className="camera-round-btn" onClick={stopAndClose}>
          ✕
        </button>
        <div className="camera-title">📷 Ambil Foto Bukti</div>
        <button className="camera-round-btn" onClick={flipCamera}>
          🔄
        </button>
      </div>

      {status === "error" ? (
        <div className="camera-error">{errorMsg}</div>
      ) : status === "captured" ? (
        <img className="camera-preview" src={snapshot} alt="Pratinjau foto" />
      ) : (
        <video ref={videoRef} className="camera-video" playsInline muted />
      )}
      <canvas ref={canvasRef} className="camera-canvas" />

      <div className="camera-actions">
        {status === "captured" ? (
          <>
            <button
              className="btn btn-ghost"
              onClick={() => startCamera(facingMode)}
            >
              🔁 Ulangi
            </button>
            <button className="btn btn-green" onClick={usePhoto}>
              ✅ Gunakan Foto
            </button>
          </>
        ) : (
          <button
            className="camera-shutter"
            disabled={status !== "ready"}
            onClick={takePhoto}
            aria-label="Ambil foto"
          />
        )}
      </div>
    </div>
  );
}
