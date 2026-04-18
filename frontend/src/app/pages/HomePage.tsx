import { motion } from 'motion/react';
import { BookCard } from '../components/BookCard';
import { ArrowRight } from 'lucide-react';
import { useContext, useMemo } from 'react';
import { FilterContext } from '../App';

const featuredBooks = [
  {
    id: '1',
    title: 'One Day, Everyone Will Have Always Been Against This',
    author: 'Anonymous',
    price: 71200,
    originalPrice: 89000,
    image: 'https://images.unsplash.com/photo-1580642612739-abcaba21b037?w=400',
    rating: 4.8,
    category: 'Literary Fiction',
  },
  {
    id: '2',
    title: 'Orbiting Jupiter',
    author: 'Gary D. Schmidt',
    price: 61600,
    originalPrice: 77000,
    image: 'https://images.unsplash.com/photo-1715304616318-8a7bb03a142b?w=400',
    rating: 4.5,
    category: 'Young Adult (YA)',
  },
  {
    id: '3',
    title: 'The Art of Reading',
    author: 'Various Authors',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1763098844932-7240ee8ff180?w=400',
    rating: 4.7,
    category: 'Self-Help / Personal Development',
  },
  {
    id: '4',
    title: 'Classic Literature Collection',
    author: 'Multiple Authors',
    price: 120000,
    originalPrice: 150000,
    image: 'https://images.unsplash.com/photo-1766431015002-5ee72990953d?w=400',
    rating: 4.9,
    category: 'Literary Fiction',
  },
  {
    id: '5',
    title: 'Modern Poetry Anthology',
    author: 'Contemporary Poets',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1769766407884-791f8136f239?w=400',
    rating: 4.6,
    category: 'Literary Fiction',
  },
  {
    id: '6',
    title: 'Philosophy Essentials',
    author: 'Great Thinkers',
    price: 98000,
    originalPrice: 125000,
    image: 'https://images.unsplash.com/photo-1723220217551-5b5a8a578758?w=400',
    rating: 4.8,
    category: 'Philosophy',
  },
  {
    id: '7',
    title: 'World History Chronicles',
    author: 'Historical Society',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1723220217566-f79c2b6adb46?w=400',
    rating: 4.7,
    category: 'History',
  },
  {
    id: '8',
    title: 'Art & Culture Studies',
    author: 'Academic Press',
    price: 105000,
    originalPrice: 130000,
    image: 'https://images.unsplash.com/photo-1715304617193-a4f86af446bb?w=400',
    rating: 4.5,
    category: 'History',
  },
  {
    id: '9',
    title: 'The Midnight Garden',
    author: 'Sarah Johnson',
    price: 78000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    rating: 4.6,
    category: 'Fantasy',
  },
  {
    id: '10',
    title: 'Cosmic Explorers',
    author: 'Dr. Michael Chen',
    price: 92000,
    originalPrice: 115000,
    image: 'https://images.unsplash.com/photo-1614544048536-0d28caf77200?w=400',
    rating: 4.7,
    category: 'Science Fiction (Sci-Fi)',
  },
  {
    id: '11',
    title: 'The Silent Witness',
    author: 'Detective James Carter',
    price: 68000,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    rating: 4.5,
    category: 'Mystery / Detective',
  },
  {
    id: '12',
    title: 'Psychology Today',
    author: 'Prof. Emily White',
    price: 88000,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    rating: 4.8,
    category: 'Psychology',
  },
];

export function HomePage() {
  const { selectedCategories } = useContext(FilterContext);

  const filteredBooks = useMemo(() => {
    if (selectedCategories.length === 0) {
      return featuredBooks;
    }
    return featuredBooks.filter((book) => selectedCategories.includes(book.category));
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
                Discover Your Next
                <span className="block text-primary">Great Read</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl"
              >
                Explore thousands of books from classics to contemporary bestsellers
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:shadow-lg transition-shadow"
              >
                Browse Collection
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
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
              {selectedCategories.length > 0 ? 'Filtered Books' : 'Featured Books'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {selectedCategories.length > 0 
                ? `Showing ${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''} in selected categories`
                : 'Handpicked selections from our curators'
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
                No books found in the selected categories. Try selecting different filters.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Fiction', 'Non-Fiction', 'Poetry', 'Philosophy', 'History', 'Science', 'Art', 'Biography'].map(
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
    </div>
  );
}