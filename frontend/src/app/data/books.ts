import atomicHabitsImg from '../../imports/1._Atomic_Habits.jpg';
import filosofiTerasImg from '../../imports/2._Filosofi_Teras_(New_Cover).jpg';
import letThemTheoryImg from '../../imports/3._The_Let_Them_Theory.jpg';
import tekaTekiImg from '../../imports/4._Teka-Teki_Gambar_Aneh.png';
import seporsiMieImg from '../../imports/5._Seporsi_Mie_Ayam_Sebelum_Mati.jpg';
import janjiImg from '../../imports/6._Janji.jpeg';
import musimImg from '../../imports/7._Musim_Yang_Tak_Sempat_Kita_Miliki.jpg';
import dompetAyahImg from '../../imports/8._Dompet_Ayah_Sepatu_Ibu.jpg';
import psychologyOfMoneyImg from '../../imports/1._psychology_of_money.png';
import diTanahLadaImg from '../../imports/2._di_tanah_lada.jpg';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
  reviewCount?: number;
  isbn?: string;
  publisher?: string;
  year?: number;
  pages?: number;
  language?: string;
  format?: string;
  description?: string;
}

export const BOOKS_DATABASE: Book[] = [
  {
    id: '1',
    title: 'Teka-Teki Gambar Aneh',
    author: 'Ubertus',
    price: 79200,
    originalPrice: 99000,
    image: tekaTekiImg,
    rating: 4.7,
    reviewCount: 234,
    category: 'Fiksi Sastra',
    isbn: '978-602-0000-01-1',
    publisher: 'Gramedia Pustaka Utama',
    year: 2024,
    pages: 328,
    language: 'Indonesia',
    format: 'Soft Cover',
    description: 'Sebuah novel misteri yang menggabungkan teka-teki visual dengan narasi yang mencekam. Mengikuti perjalanan seorang detektif amatir yang harus memecahkan serangkaian teka-teki gambar untuk mengungkap kebenaran di balik kematian misterius.',
  },
  {
    id: '2',
    title: 'The Let Them Theory',
    author: 'Mel Robbins',
    price: 95200,
    originalPrice: 119000,
    image: letThemTheoryImg,
    rating: 4.8,
    reviewCount: 567,
    category: 'Pengembangan Diri',
    isbn: '978-1-4019-7285-6',
    publisher: 'Hay House',
    year: 2024,
    pages: 256,
    language: 'English',
    format: 'Soft Cover',
    description: 'Pelajari kekuatan untuk melepaskan kontrol dan membiarkan orang lain menjadi diri mereka sendiri. Mel Robbins membagikan strategi praktis untuk mengurangi stres dan meningkatkan kebahagiaan dengan membiarkan hal-hal terjadi.',
  },
  {
    id: '3',
    title: 'Di Tanah Lada',
    author: 'Ziggy Zezsyazeoviennazabrizkie',
    price: 76000,
    originalPrice: 95000,
    image: diTanahLadaImg,
    rating: 4.6,
    reviewCount: 189,
    category: 'Fiksi Sastra',
    isbn: '978-602-0000-03-5',
    publisher: 'Gramedia Pustaka Utama',
    year: 2023,
    pages: 412,
    language: 'Indonesia',
    format: 'Soft Cover',
    description: 'Novel sejarah yang mengisahkan kehidupan di masa kolonial Hindia Belanda. Mengangkat tema perdagangan rempah dan konflik budaya dengan narasi yang kuat dan detail historis yang mendalam.',
  },
  {
    id: '4',
    title: 'Seporsi Mie Ayam Sebelum Mati',
    author: 'Brian Khrisna',
    price: 74400,
    originalPrice: 93000,
    image: seporsiMieImg,
    rating: 4.5,
    reviewCount: 342,
    category: 'Fiksi Sastra',
    isbn: '978-602-0000-04-2',
    publisher: 'Gramedia Pustaka Utama',
    year: 2023,
    pages: 296,
    language: 'Indonesia',
    format: 'Soft Cover',
    description: 'Kumpulan cerita pendek yang mengeksplorasi kehidupan urban dengan sentuhan humor gelap. Setiap cerita menawarkan perspektif unik tentang kehidupan sehari-hari yang ternyata penuh misteri.',
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 86400,
    originalPrice: 108000,
    image: atomicHabitsImg,
    rating: 4.9,
    reviewCount: 1245,
    category: 'Pengembangan Diri',
    isbn: '978-0-7352-1129-2',
    publisher: 'Avery',
    year: 2018,
    pages: 320,
    language: 'English',
    format: 'Soft Cover',
    description: 'Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk. James Clear menjelaskan bagaimana perubahan kecil dapat menghasilkan hasil yang luar biasa melalui sistem yang terbukti efektif.',
  },
  {
    id: '6',
    title: 'Dompet Ayah Sepatu Ibu',
    author: 'J.S. Khairen',
    price: 70400,
    originalPrice: 88000,
    image: dompetAyahImg,
    rating: 4.7,
    reviewCount: 456,
    category: 'Fiksi Sastra',
    isbn: '978-602-0000-06-6',
    publisher: 'Gramedia Pustaka Utama',
    year: 2023,
    pages: 268,
    language: 'Indonesia',
    format: 'Soft Cover',
    description: 'Novel keluarga yang menyentuh hati tentang perjuangan orang tua untuk memberikan yang terbaik bagi anak-anaknya. Mengisahkan pengorbanan, cinta, dan kekuatan ikatan keluarga di tengah kesulitan ekonomi.',
  },
  {
    id: '7',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 76500,
    originalPrice: 85000,
    image: psychologyOfMoneyImg,
    rating: 4.8,
    reviewCount: 892,
    category: 'Bisnis / Ekonomi',
    isbn: '978-0-85788-708-5',
    publisher: 'Harriman House',
    year: 2020,
    pages: 256,
    language: 'English',
    format: 'Soft Cover',
    description: 'Pelajaran abadi tentang kekayaan, keserakahan, dan kebahagiaan. Morgan Housel mengungkap bagaimana perilaku dan psikologi mempengaruhi keputusan keuangan kita lebih dari pengetahuan teknis.',
  },
  {
    id: '8',
    title: 'Janji',
    author: 'Tere Liye',
    price: 98100,
    originalPrice: 109000,
    image: janjiImg,
    rating: 4.8,
    reviewCount: 678,
    category: 'Roman',
    isbn: '978-602-0000-08-0',
    publisher: 'Gramedia Pustaka Utama',
    year: 2021,
    pages: 384,
    language: 'Indonesia',
    format: 'Soft Cover',
    description: 'Novel romantis yang mengisahkan tentang janji, pengorbanan, dan cinta yang melampaui waktu. Tere Liye kembali menghadirkan cerita yang menyentuh hati dengan plot twist yang tak terduga.',
  },
  {
    id: '9',
    title: 'Filosofi Teras (New Cover)',
    author: 'Henry Manampiring',
    price: 97200,
    originalPrice: 108000,
    image: filosofiTerasImg,
    rating: 4.9,
    reviewCount: 1034,
    category: 'Filsafat',
    isbn: '978-602-0000-09-7',
    publisher: 'Kompas',
    year: 2019,
    pages: 320,
    language: 'Indonesia',
    format: 'Soft Cover',
    description: 'Pengantar praktis terhadap filosofi Stoikisme untuk kehidupan modern. Buku ini menjelaskan bagaimana ajaran kuno dapat membantu kita menghadapi tantangan kehidupan sehari-hari dengan lebih tenang dan bijaksana.',
  },
  {
    id: '10',
    title: 'Musim yang Tak Sempat Kita Miliki',
    author: 'Rania Sadja',
    price: 79200,
    originalPrice: 99000,
    image: musimImg,
    rating: 4.7,
    reviewCount: 423,
    category: 'Roman',
    isbn: '978-602-0000-10-3',
    publisher: 'Gramedia Pustaka Utama',
    year: 2023,
    pages: 312,
    language: 'Indonesia',
    format: 'Soft Cover',
    description: 'Novel romantis tentang cinta yang datang di waktu yang salah. Mengisahkan perjalanan dua jiwa yang saling mencintai namun dipisahkan oleh keadaan, dan bagaimana mereka berjuang untuk kembali bersama.',
  },
];

export const getBookById = (id: string): Book | undefined => {
  return BOOKS_DATABASE.find((book) => book.id === id);
};

export const searchBooks = (query: string): Book[] => {
  const searchQuery = query.toLowerCase();
  return BOOKS_DATABASE.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery) ||
      book.isbn?.toLowerCase().includes(searchQuery) ||
      book.category.toLowerCase().includes(searchQuery)
  );
};
