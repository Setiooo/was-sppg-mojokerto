// Peta Kecamatan BGN (menu bgn-peta). Reproduksi 1:1 fungsi rute "bgn-peta".
// Peta ilustratif lingkaran per kecamatan + legenda + grid kartu SPPG per kecamatan.
import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { SPPG_LIST } from "../../constants/sppgData.js";
import { KECAMATAN_THEME } from "../../constants/kecamatanMeta.js";

export default function PetaKecamatan() {
  const { navigate, user } = useApp();
  const kS = user?.wilayah ? user.wilayah.replace("Kec. ", "") : null;
  const kecs = kS ? [kS] : ["Prajurit Kulon", "Magersari", "Kranggan"];

  return (
    <div>
      <div className="page-header">
        <h2>🗺️ Peta Kecamatan - Kota Mojokerto</h2>
        <p>Sebaran 18 SPPG di 3 kecamatan</p>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "1.5rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#e8f5e9,#c8e6c9)",
            borderRadius: 12,
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(34,197,94,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,.08) 1px,transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {kecs.map((t) => {
              const n = KECAMATAN_THEME[t];
              const r = SPPG_LIST.filter((e) => e.kecamatan === t).filter(
                (e) => e.status === "Masalah",
              ).length;
              return (
                <div
                  key={t}
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => navigate("bgn-sppg")}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: n.color,
                      border: "4px solid white",
                      display: "grid",
                      placeItems: "center",
                      margin: "0 auto .6rem",
                      boxShadow: `0 4px 16px ${n.color}55`,
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.1rem",
                      }}
                    >
                      {n.count}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: ".72rem",
                      fontWeight: 700,
                      color: "var(--g-deep)",
                      background: "white",
                      padding: ".25rem .6rem",
                      borderRadius: 100,
                      boxShadow: "0 2px 8px rgba(0,0,0,.1)",
                    }}
                  >
                    {t}
                  </div>
                  {r > 0 && (
                    <div
                      style={{
                        fontSize: ".62rem",
                        background: "var(--red)",
                        color: "#fff",
                        borderRadius: 100,
                        padding: ".1rem .4rem",
                        marginTop: ".3rem",
                        display: "inline-block",
                      }}
                    >
                      {r} masalah
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 12,
              fontSize: ".65rem",
              color: "var(--muted)",
              background: "rgba(255,255,255,.8)",
              padding: ".2rem .5rem",
              borderRadius: 6,
            }}
          >
            🗺️ Kota Mojokerto, Jawa Timur
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {kecs.map((e) => {
            const t = KECAMATAN_THEME[e];
            return (
              <div
                key={e}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".35rem",
                  fontSize: ".75rem",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: t.color,
                  }}
                />
                <span>
                  Kec. {e} ({t.count} SPPG)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {kecs.map((e) => {
        const t = KECAMATAN_THEME[e];
        const n = SPPG_LIST.filter((s) => s.kecamatan === e);
        return (
          <div key={e} style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".6rem",
                marginBottom: ".75rem",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: t.color,
                }}
              />
              <h3
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 700,
                  fontSize: ".95rem",
                  color: "var(--g-deep)",
                }}
              >
                Kec. {e}
              </h3>
              <span
                style={{
                  fontSize: ".72rem",
                  background: t.bg,
                  color: t.color,
                  padding: ".18rem .6rem",
                  borderRadius: 100,
                  fontWeight: 700,
                }}
              >
                {n.length} SPPG
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: ".75rem",
              }}
            >
              {n.map((s) => (
                <div
                  key={s.no}
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${s.status === "Masalah" ? "var(--red)" : "var(--border)"}`,
                    borderRadius: 12,
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: ".4rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: ".82rem",
                        fontWeight: 600,
                        color: "var(--g-deep)",
                        lineHeight: 1.35,
                      }}
                    >
                      {s.nama}
                    </div>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: ".65rem",
                        color: "var(--muted)",
                        flexShrink: 0,
                        marginLeft: ".5rem",
                      }}
                    >
                      #{s.no}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "var(--muted)",
                      marginBottom: ".6rem",
                    }}
                  >
                    📍 {s.kelurahan} · {s.alamat}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className={`status-badge ${s.status === "Aktif" ? "status-done" : "status-rejected"}`}
                    >
                      {s.status === "Aktif" ? "✅ Aktif" : "⚠️ Masalah"}
                    </span>
                    <span
                      style={{
                        fontSize: ".72rem",
                        color:
                          s.laporan >= 5
                            ? "var(--red)"
                            : s.laporan >= 3
                              ? "var(--amber)"
                              : "var(--muted)",
                      }}
                    >
                      📋 {s.laporan} laporan
                    </span>
                    <span
                      style={{
                        fontSize: ".78rem",
                        fontWeight: 700,
                        color:
                          s.skor >= 85
                            ? "var(--g-mid)"
                            : s.skor >= 70
                              ? "var(--amber)"
                              : "var(--red)",
                      }}
                    >
                      Skor {s.skor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
