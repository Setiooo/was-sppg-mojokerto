// Wilayah Kota Mojokerto. Daftar, kode, dan koordinat pusat kecamatan diambil verbatim dari sumber asli.
export const KECAMATAN_LIST = [
  "Kec. Prajurit Kulon",
  "Kec. Magersari",
  "Kec. Kranggan",
];

// Pemetaan nama kecamatan -> kode singkat (dipakai untuk ID laporan & lookup koordinat).
export const KECAMATAN_CODE = {
  "Kec. Prajurit Kulon": "PKL",
  "Kec. Magersari": "MGR",
  "Kec. Kranggan": "KRG",
};

// Titik pusat tiap kecamatan untuk verifikasi GPS (haversine).
export const KECAMATAN_COORDS = {
  PKL: { lat: -7.47, lng: 112.43 },
  MGR: { lat: -7.48, lng: 112.44 },
  KRG: { lat: -7.46, lng: 112.445 },
};
