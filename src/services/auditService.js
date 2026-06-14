// auditService.js — Rantai audit (blockchain) laporan + hash blok.
// appendAuditBlock dari reportStore.js; randomBlockHash dari utils/hash.js (verbatim).
export function appendAuditBlock(db, report) {
  const prev = db.blockchain[db.blockchain.length - 1]?.hash ?? "0";
  db.blockchain.push({
    block: db.blockchain.length + 1001,
    hash: report.hash,
    prev,
    ts: new Date().toISOString().replace("T", " ").slice(0, 19),
    laporan: report.id,
  });
}

export function randomBlockHash() {
  let s = "";
  for (let i = 0; i < 16; i++) {
    s += "abcdef0123456789"[Math.floor(16 * Math.random())];
  }
  return s;
}
