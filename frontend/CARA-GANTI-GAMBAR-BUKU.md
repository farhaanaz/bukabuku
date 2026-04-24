# Cara Mengganti Gambar Cover Buku dengan Cover Asli

Saat ini, website menggunakan gambar placeholder untuk cover buku. Berikut cara mengganti dengan cover buku asli dari katalog Anda:

## Metode 1: Upload ke Folder Public (Recommended)

### Langkah 1: Buat Folder Images
```bash
mkdir -p public/images/books
```

### Langkah 2: Upload Cover Buku
Upload semua file gambar cover buku ke folder `public/images/books/`

Contoh struktur:
```
public/
  images/
    books/
      teka-teki-gambar-aneh.jpg
      the-let-them-theory.jpg
      atomic-habits.jpg
      psychology-of-money.jpg
      filosofi-teras.jpg
      janji-tere-liye.jpg
      dll...
```

### Langkah 3: Update Path Gambar di HomePage.tsx
Buka file: `src/app/pages/HomePage.tsx`

Ganti URL gambar dari:
```javascript
image: 'https://images.unsplash.com/photo-xxx?w=400'
```

Menjadi:
```javascript
image: '/images/books/teka-teki-gambar-aneh.jpg'
```

## Metode 2: Menggunakan URL Eksternal

Jika cover buku sudah di-host online (misalnya di CDN atau Google Drive):

```javascript
image: 'https://your-cdn.com/book-covers/atomic-habits.jpg'
```

## Contoh Lengkap Update Satu Buku:

**Sebelum:**
```javascript
{
  id: '1',
  title: 'Teka-Teki Gambar Aneh',
  author: 'Ubertus',
  price: 79200,
  originalPrice: 99000,
  image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  rating: 4.7,
  category: 'Fiksi Sastra',
}
```

**Sesudah:**
```javascript
{
  id: '1',
  title: 'Teka-Teki Gambar Aneh',
  author: 'Ubertus',
  price: 79200,
  originalPrice: 99000,
  image: '/images/books/teka-teki-gambar-aneh.jpg', // ✅ Cover asli
  rating: 4.7,
  category: 'Fiksi Sastra',
}
```

## File yang Perlu Diupdate:

1. **src/app/pages/HomePage.tsx**
   - Array `allBooks` (10 buku)
   - Array `bestSellingBooks` (4 buku)
   - Array `newArrivals` (4 buku)

2. **src/app/pages/ProductPage.tsx** (opsional)
   - Update gambar produk detail jika diperlukan

## Tips:

- **Format gambar**: Gunakan JPG atau PNG
- **Ukuran file**: Maksimal 200KB per gambar untuk performa optimal
- **Dimensi**: Rasio 2:3 (portrait) - contoh: 400x600px atau 600x900px
- **Nama file**: Gunakan lowercase dan dash (teka-teki-gambar-aneh.jpg)

## Cek Hasil:

Setelah update, refresh browser dan cek:
- Homepage (Buku Terlaris, Buku Terbaru, Buku Pilihan)
- Halaman produk detail
- Keranjang belanja
- Wishlist

---

**Catatan:** Cover buku saat ini menggunakan placeholder dari Unsplash. Segera ganti dengan cover asli dari katalog bukabuku.com untuk tampilan yang profesional.
