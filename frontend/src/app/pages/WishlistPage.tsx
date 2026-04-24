import { motion } from 'motion/react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { NavigationContext, WishlistContext, CartContext } from '../App';

export function WishlistPage() {
  const { navigate } = useContext(NavigationContext);
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Daftar Keinginan Saya</h1>
          </div>
          <p className="text-muted-foreground">
            {wishlistItems.length > 0
              ? `Anda memiliki ${wishlistItems.length} buku di daftar keinginan Anda`
              : 'Daftar keinginan Anda kosong'}
          </p>
        </motion.div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  onClick={() => navigate('product', item.id)}
                  className="relative aspect-[3/4] overflow-hidden bg-muted/30 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.originalPrice && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3
                      onClick={() => navigate('product', item.id)}
                      className="font-semibold line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.author}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">Rp {item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        Rp {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        addToCart({ id: item.id, title: item.title, author: item.author, price: item.price, originalPrice: item.originalPrice, image: item.image });
                        setAddedItemId(item.id);
                        setTimeout(() => setAddedItemId(null), 2000);
                      }}
                      className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:shadow-md transition-shadow"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {addedItemId === item.id ? '✓ Ditambahkan' : 'Tambah ke Keranjang'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 border border-border rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </motion.button>
                  </div>
                </div>
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
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Daftar keinginan Anda kosong</h3>
            <p className="text-muted-foreground mb-6">
              Mulai tambahkan buku favorit Anda ke daftar keinginan
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('home')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Jelajahi Buku
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
