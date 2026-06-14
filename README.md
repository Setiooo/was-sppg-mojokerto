# WAS-SPPG — Warga Awasi Sekolah (Kota Mojokerto)

Platform pengawasan partisipatif program **Makan Bergizi Gratis (MBG)** Kota Mojokerto.
Versi modular (React + Parcel) hasil re-author dari prototipe HTML tunggal.

Tiga portal: **Masyarakat**, **Pemerintah Kota (Pemda)**, dan **BGN / SPPG**.

---

## 1. Prasyarat (install dulu)

| Tool | Untuk apa | Link |
|------|-----------|------|
| **Node.js** (v18 atau lebih baru) | Menjalankan project | https://nodejs.org |
| **Visual Studio Code** | Editor kode | https://code.visualstudio.com |
| **Git** | Sambung ke GitHub | https://git-scm.com |

Cek instalasi di terminal:

```bash
node -v
npm -v
git --version
```

---

## 2. Jalankan di Visual Studio Code

1. **Ekstrak** `was-sppg-source.zip` ke sebuah folder.
2. Buka VS Code → **File ▸ Open Folder…** → pilih folder `was-sppg-source`.
3. Buka terminal di VS Code: **Terminal ▸ New Terminal** (atau `Ctrl + \``).
4. Install dependencies (sekali saja):

   ```bash
   npm install
   ```

5. Jalankan mode development:

   ```bash
   npm start
   ```

6. Buka browser ke alamat yang muncul (biasanya **http://localhost:1234**).
   Parcel akan auto-reload setiap kali kamu menyimpan perubahan.

### Build untuk produksi (opsional)

```bash
npm run build
```

Hasilnya ada di folder `dist/`.

> **Rekomendasi extension VS Code:** ESLint, Prettier, dan "ES7+ React/Redux/React-Native snippets".

### Kredensial demo

| Portal | Username | Password |
|--------|----------|----------|
| Pemerintah Kota | `pemkot` | `mojokerto2025` |
| BGN / SPPG | `bgn.mojokerto` | `bgn2025` |
| Masyarakat | — (anonim, langsung masuk) | — |

---

## 3. Sambungkan ke GitHub

### A. Buat repository kosong di GitHub

1. Buka https://github.com/new
2. Isi **Repository name** (mis. `was-sppg-mojokerto`).
3. **Jangan** centang "Add a README / .gitignore / license" (project ini sudah punya).
4. Klik **Create repository**. Salin URL repo (mis. `https://github.com/USERNAME/was-sppg-mojokerto.git`).

### B. Push dari VS Code (terminal)

Di dalam folder project, jalankan satu per satu:

```bash
git init
git add .
git commit -m "Initial commit: WAS-SPPG modular source"
git branch -M main
git remote add origin https://github.com/USERNAME/was-sppg-mojokerto.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub-mu.

> Kalau diminta login, GitHub sekarang memakai **Personal Access Token** (bukan password biasa).
> Buat di: GitHub ▸ Settings ▸ Developer settings ▸ Personal access tokens ▸ Tokens (classic) ▸ centang scope `repo`.
> Tempel token itu saat diminta password.

### C. Update berikutnya

Setiap kali ada perubahan:

```bash
git add .
git commit -m "deskripsi perubahan"
git push
```

> Tip: VS Code punya panel **Source Control** (ikon cabang di kiri) untuk commit & push tanpa mengetik perintah.

---

## 4. Struktur folder

```
was-sppg-source/
├── index.html              # Entry HTML (Parcel)
├── package.json            # Dependencies & script
├── .gitignore
└── src/
    ├── index.jsx           # Bootstrap React (createRoot)
    ├── App.jsx             # Root: Landing atau PortalShell
    ├── assets/             # Gambar (logo, dll.)
    ├── components/         # Komponen UI (BarChart, Toast, SlhsBadge, dll.)
    ├── constants/          # Data statis (menu, kecamatan, seed, kebijakan)
    ├── context/            # AppContext (state global)
    ├── layouts/            # Landing, Sidebar, PortalShell
    ├── pages/
    │   ├── masyarakat/      # Buat Laporan, Riwayat, Jejak Audit, Notifikasi
    │   ├── pemda/           # Dashboard, Verifikasi
    │   ├── bgn/             # Control Center, Peta Kecamatan, Kebijakan
    │   └── shared/          # Semua Laporan, Monitor SPPG (dipakai lintas-peran)
    ├── services/           # photoStore, reportStore, credibility, deviceProfile
    ├── utils/              # hash.js
    └── styles/             # app.css (CSS asli), portal-masyarakat.css
```

---

## 5. Catatan teknis

- **Penyimpanan data**: localStorage browser (`mbgwatch_mojokerto_v1`). Tidak ada backend — semua jalan di sisi klien.
- **Seed data**: 33 laporan contoh dimuat otomatis saat pertama kali dibuka.
- **Reset data**: hapus localStorage lewat DevTools browser (Application ▸ Local Storage), lalu refresh.
