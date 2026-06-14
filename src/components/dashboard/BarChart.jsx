// Bar chart horizontal beranimasi. Reproduksi komponen `$` sumber asli.
// `items` = array pasangan [label, nilaiPersen]. Animasi lebar via setTimeout 120ms.
import React, { useEffect, useRef } from "react";

export default function BarChart({ items }) {
  const refs = useRef([]);
  useEffect(() => {
    const t = setTimeout(() => {
      refs.current.forEach((el, i) => {
        if (el) el.style.width = items[i][1] + "%";
      });
    }, 120);
    return () => clearTimeout(t);
  }, [items]);
  return (
    <div className="bar-chart">
      {items.map(([label, value], i) => (
        <div className="bar-row" key={i}>
          <div className="bar-label">{label}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              ref={(el) => (refs.current[i] = el)}
              style={{ width: 0 }}
            >
              {value}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
