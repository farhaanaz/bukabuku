import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useContext } from 'react';
import { NavigationContext } from '../App';

export function ProductPage({ productId }: { productId?: string }) {
  const { navigate } = useContext(NavigationContext);
  const id = productId;

  // Mock product data
  const product = {
    id,
    title: 'One Day, Everyone Will Have Always Been Against This',
    author: 'Anonymous',
    price: 71200,
    originalPrice: 89000,
    image: 'https://images.unsplash.com/photo-1580642612739-abcaba21b037?w=800',
    rating: 4.8,
    reviewCount: 142,
    isbn: '978-0-123456-78-9',
    publisher: 'Literary Press',
    year: 2024,
    pages: 352,
    language: 'English',
    format: 'Soft Cover',
    description:
      'A profound exploration of collective memory and social change. This book examines how societies reshape their narratives and the powerful forces that drive historical revisionism.',
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    navigate('checkout');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted/30">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium">
                  -{discount}% OFF
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
                {product.title}
              </h1>
              <p className="text-xl text-muted-foreground">by {product.author}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="py-6 border-y border-border">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">Rp {product.price.toLocaleString()}</span>
                <span className="text-2xl text-muted-foreground line-through">
                  Rp {product.originalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-primary font-medium mt-2">Save Rp {(product.originalPrice - product.price).toLocaleString()}</p>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full border-2 border-primary text-primary py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border border-border py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border border-border py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">ISBN</span>
                  <p className="font-medium">{product.isbn}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Publisher</span>
                  <p className="font-medium">{product.publisher}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Year</span>
                  <p className="font-medium">{product.year}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Pages</span>
                  <p className="font-medium">{product.pages}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Language</span>
                  <p className="font-medium">{product.language}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Format</span>
                  <p className="font-medium">{product.format}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
