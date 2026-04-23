import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { NavigationContext, WishlistContext, CartContext } from '../App';
import { getBookById } from '../data/books';

export function ProductPage({ productId }: { productId?: string }) {
  const { navigate } = useContext(NavigationContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  // Get product data from database
  const product = productId ? getBookById(productId) : null;

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produk Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-6">
            Maaf, buku yang Anda cari tidak tersedia.
          </p>
          <button
            onClick={() => navigate('home')}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const inWishlist = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart({ id: product.id, title: product.title, author: product.author, price: product.price, originalPrice: product.originalPrice, image: product.image });
    navigate('checkout');
  };

  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.title, author: product.author, price: product.price, originalPrice: product.originalPrice, image: product.image });
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        author: product.author,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        rating: product.rating,
        category: product.category,
      });
    }
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
              <p className="text-xl text-muted-foreground">oleh {product.author}</p>
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
              <span className="text-muted-foreground">({product.reviewCount} ulasan)</span>
            </div>

            <div className="py-6 border-y border-border">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">Rp {product.price.toLocaleString()}</span>
                <span className="text-2xl text-muted-foreground line-through">
                  Rp {product.originalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-primary font-medium mt-2">Hemat Rp {(product.originalPrice - product.price).toLocaleString()}</p>
            </div>

            {showAddedToCart && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-500 text-white py-3 px-4 rounded-lg text-center font-medium"
              >
                ✓ Berhasil ditambahkan ke keranjang!
              </motion.div>
            )}

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                <ShoppingCart className="w-5 h-5" />
                Beli Sekarang
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full border-2 border-primary text-primary py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Tambah ke Keranjang
              </motion.button>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlistToggle}
                  className={`flex-1 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors ${
                    inWishlist
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'border border-border hover:bg-muted'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
                  {inWishlist ? 'Dalam Wishlist' : 'Tambah ke Wishlist'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border border-border py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Bagikan
                </motion.button>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Detail Produk</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">ISBN</span>
                  <p className="font-medium">{product.isbn}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Penerbit</span>
                  <p className="font-medium">{product.publisher}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tahun</span>
                  <p className="font-medium">{product.year}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Halaman</span>
                  <p className="font-medium">{product.pages}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Bahasa</span>
                  <p className="font-medium">{product.language}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Format</span>
                  <p className="font-medium">{product.format}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-semibold text-lg mb-3">Deskripsi</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
