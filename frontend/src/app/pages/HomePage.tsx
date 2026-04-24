import { motion } from 'motion/react';
import { BookCard } from '../components/BookCard';
import { Footer } from '../components/Footer';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useContext, useMemo } from 'react';
import { FilterContext } from '../App';
import { BOOKS_DATABASE } from '../data/books';

// Use the shared books database
const allBooks = BOOKS_DATABASE;

// Best selling books (highest rated)
const bestSellingBooks = [
  BOOKS_DATABASE.find(b => b.id === '5')!, // Atomic Habits
  BOOKS_DATABASE.find(b => b.id === '9')!, // Filosofi Teras
  BOOKS_DATABASE.find(b => b.id === '7')!, // The Psychology of Money
  BOOKS_DATABASE.find(b => b.id === '2')!, // The Let Them Theory
].filter(Boolean);

// New arrivals (most recent publications)
const newArrivals = [
  BOOKS_DATABASE.find(b => b.id === '1')!, // Teka-Teki Gambar Aneh
  BOOKS_DATABASE.find(b => b.id === '4')!, // Seporsi Mie Ayam
  BOOKS_DATABASE.find(b => b.id === '8')!, // Janji
  BOOKS_DATABASE.find(b => b.id === '10')!, // Musim yang Tak Sempat
].filter(Boolean);

export function HomePage() {
  const { selectedCategories } = useContext(FilterContext);

  const filteredBooks = useMemo(() => {
    if (selectedCategories.length === 0) {
      return allBooks;
    }
    return allBooks.filter((book) => selectedCategories.includes(book.category));
  }, [selectedCategories]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1766431015002-5ee72990953d?w=1600"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Temukan Bacaan
                <span className="block text-primary">Terbaik Anda</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl"
              >
                Jelajahi ribuan buku dari klasik hingga bestseller kontemporer
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:shadow-lg transition-shadow"
              >
                Jelajahi Koleksi
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Selling Books */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Buku Terlaris</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Buku-buku paling populer pilihan pembaca
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {bestSellingBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <BookCard {...book} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Buku Terbaru</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Koleksi terbaru yang baru saja tiba
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <BookCard {...book} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {selectedCategories.length > 0 ? 'Buku Terfilter' : 'Buku Pilihan'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {selectedCategories.length > 0
                ? `Menampilkan ${filteredBooks.length} buku dalam kategori yang dipilih`
                : 'Pilihan terbaik dari kurator kami'
              }
            </p>
          </motion.div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <BookCard {...book} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                Tidak ada buku ditemukan dalam kategori yang dipilih. Coba pilih filter lain.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Jelajahi Berdasarkan Kategori</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Fiksi', 'Non-Fiksi', 'Puisi', 'Filsafat', 'Sejarah', 'Sains', 'Seni', 'Biografi'].map(
              (category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-6 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all text-left"
                >
                  <h3 className="font-semibold text-lg">{category}</h3>
                </motion.button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}