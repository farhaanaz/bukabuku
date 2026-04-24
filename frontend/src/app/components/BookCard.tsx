import { motion } from 'motion/react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useContext, useState } from 'react';
import { NavigationContext, WishlistContext, CartContext } from '../App';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  category?: string;
}

export function BookCard({ id, title, author, price, originalPrice, image, rating = 4.5, category = 'General' }: BookCardProps) {
  const { navigate } = useContext(NavigationContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const inWishlist = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, title, author, price, originalPrice, image, rating, category });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, title, author, price, originalPrice, image });
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer relative"
    >
      <div onClick={() => navigate('product', id)} className="relative overflow-hidden rounded-xl bg-muted/30 aspect-[3/4] mb-4">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            -{discount}%
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistClick}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
            inWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </motion.button>

        {/* Add to Cart Button on Hover */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          onClick={handleAddToCart}
          className="absolute bottom-3 left-3 right-3 bg-primary text-primary-foreground py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart className="w-4 h-4" />
          Tambah ke Keranjang
        </motion.button>
      </div>

      {showAddedToCart && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 right-0 bg-green-500 text-white text-xs py-2 px-3 rounded-lg text-center z-10"
        >
          ✓ Ditambahkan ke keranjang!
        </motion.div>
      )}

      <div className="space-y-1">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{author}</p>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Rp {price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              Rp {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
