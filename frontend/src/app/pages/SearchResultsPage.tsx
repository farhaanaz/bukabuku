import { motion } from 'motion/react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useContext, useState, useMemo } from 'react';
import { NavigationContext } from '../App';
import { BookCard } from '../components/BookCard';
import { BOOKS_DATABASE } from '../data/books';

interface SearchResultsPageProps {
  searchQuery: string;
}

export function SearchResultsPage({ searchQuery }: SearchResultsPageProps) {
  const { navigate } = useContext(NavigationContext);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Search and filter books
  const searchResults = useMemo(() => {
    let results = BOOKS_DATABASE;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.isbn.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query) ||
          book.publisher.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      results = results.filter((book) => selectedCategories.includes(book.category));
    }

    // Sort results
    switch (sortBy) {
      case 'price-low':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // relevance - keep original order
        break;
    }

    return results;
  }, [searchQuery, selectedCategories, sortBy]);

  const categories = Array.from(new Set(BOOKS_DATABASE.map((book) => book.category)));

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Hasil Pencarian</h1>
              {searchQuery && (
                <p className="text-muted-foreground mt-1">
                  Pencarian untuk: <span className="font-semibold text-foreground">"{searchQuery}"</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-muted-foreground">
              Ditemukan <span className="font-semibold text-foreground">{searchResults.length}</span> buku
            </p>

            <div className="flex gap-3 flex-wrap">
              {/* Filter Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
                  showFilters || selectedCategories.length > 0
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
                {selectedCategories.length > 0 && (
                  <span className="bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {selectedCategories.length}
                  </span>
                )}
              </motion.button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted cursor-pointer outline-none"
              >
                <option value="relevance">Paling Relevan</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Active Filters */}
        {selectedCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            {selectedCategories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleCategory(category)}
                className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm flex items-center gap-2"
              >
                {category}
                <X className="w-3 h-3" />
              </motion.button>
            ))}
            <button
              onClick={() => setSelectedCategories([])}
              className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground underline"
            >
              Hapus Semua
            </button>
          </motion.div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-white rounded-xl border border-border"
          >
            <h3 className="font-semibold mb-4">Kategori</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  originalPrice={book.originalPrice}
                  image={book.image}
                  rating={book.rating}
                  category={book.category}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Tidak ada hasil ditemukan</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Maaf, kami tidak dapat menemukan buku yang sesuai dengan pencarian "{searchQuery}".
              Coba gunakan kata kunci lain atau jelajahi kategori kami.
            </p>
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('home')}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
              >
                Kembali ke Beranda
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategories([]);
                  setShowFilters(false);
                }}
                className="border border-border px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Hapus Filter
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
