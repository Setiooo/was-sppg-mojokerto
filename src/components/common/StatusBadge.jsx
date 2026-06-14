// Badge status laporan. Direproduksi dari komponen `D` sumber asli (peta konstanta `R`).
import React from "react";
import { STATUS_BADGE } from "../../constants/status.js";

export default function StatusBadge({ status }) {
  const [className, label] = STATUS_BADGE[status] || STATUS_BADGE.pending;
  return <span className={`status-badge ${className}`}>{label}</span>;
}
