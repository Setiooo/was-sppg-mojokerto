// helpers.js — Utilitas hash deterministik (tanpa crypto). Dari utils/hash.js asli.
export function deviceFingerprintHash() {
  const nav = window.navigator;
  const raw =
    nav.userAgent +
    nav.language +
    (nav.hardwareConcurrency || "") +
    screen.width +
    "x" +
    screen.height +
    new Date().getTimezoneOffset();
  let n = 5381;
  for (let i = 0; i < raw.length; i++) {
    n = (n << 5) + n + raw.charCodeAt(i);
    n &= n;
  }
  return "DEV" + Math.abs(n).toString(16).toUpperCase();
}

export function stringHash(str) {
  let t = 0;
  for (let i = 0; i < str.length; i++)
    t = ((t << 5) - t + str.charCodeAt(i)) | 0;
  return t;
}
