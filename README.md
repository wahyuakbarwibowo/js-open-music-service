# OpenMusic API v1

OpenMusic API adalah RESTful API untuk aplikasi pemutar musik terbuka. API ini memungkinkan pengguna untuk mengelola data album dan lagu seperti menambahkan, memperbarui, menghapus, dan mendapatkan data musik. Proyek ini dikembangkan menggunakan Hapi.js, PostgreSQL, dan Amazon RDS.

## Fitur

- Tambah, ubah, hapus album
- Tambah, ubah, hapus lagu
- Validasi data menggunakan Joi
- Koneksi database menggunakan PostgreSQL (Amazon RDS)

## Teknologi

- **Node.js** + **Hapi.js** (Framework backend)
- **Joi** (Validasi input)
- **PostgreSQL** + **Amazon RDS**
- **ESLint** + **Prettier** (Standar penulisan kode)

## Struktur Folder

```
src/
├── api/
│   ├── albums/
│   │   ├── handler.js
│   │   ├── index.js
│   │   └── validator.js
│   └── songs/
│       ├── handler.js
│       ├── index.js
│       └── validator.js
├── services/
│   └── postgres/
│       ├── AlbumsService.js
│       └── SongsService.js
├── utils/
│   └── errorHandler.js
├── exceptions/
│   └── ClientError.js
└── server.js
```

## Instalasi

1. Clone repository:

```bash
git clone https://github.com/username/openmusic-api.git
cd openmusic-api
```

2. Install dependencies:

```bash
npm install
```

3. Buat file `.env` dan isi:

```env
PGHOST=your-rds-host
PGUSER=your-db-username
PGPASSWORD=your-db-password
PGDATABASE=openmusic
PGPORT=5432
```

4. Setup database (jika belum):

```bash
psql -U your-db-username -d openmusic -f migrations/schema.sql
```

5. Jalankan server:

```bash
npm run start
```

## Endpoint

### Albums

| Method | Endpoint         | Deskripsi               |
|--------|------------------|--------------------------|
| POST   | `/albums`        | Tambah album baru       |
| GET    | `/albums/{id}`   | Lihat detail album      |
| PUT    | `/albums/{id}`   | Ubah album              |
| DELETE | `/albums/{id}`   | Hapus album             |

### Songs

| Method | Endpoint         | Deskripsi               |
|--------|------------------|--------------------------|
| POST   | `/songs`         | Tambah lagu baru        |
| GET    | `/songs`         | Lihat semua lagu        |
| GET    | `/songs/{id}`    | Lihat detail lagu       |
| PUT    | `/songs/{id}`    | Ubah lagu               |
| DELETE | `/songs/{id}`    | Hapus lagu              |

## Validasi

Validasi dilakukan menggunakan Joi:

- Field `title`, `name` wajib diisi
- `year` harus berupa angka dan masuk rentang valid (1900–sekarang)
- Validasi ID UUID (jika digunakan)

## Catatan

- Pastikan database dapat diakses dari aplikasi
- Gunakan tools seperti Postman untuk menguji endpoint

## Lisensi

Proyek ini dikembangkan untuk keperluan pembelajaran dalam program pelatihan Back-End Developer oleh Dicoding. Tidak untuk distribusi komersial.
