import { motion } from 'motion/react';
import { CheckoutStepper } from '../components/CheckoutStepper';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useState, useContext } from 'react';
import { NavigationContext } from '../App';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
}

export function CheckoutPage() {
  const { navigate } = useContext(NavigationContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'One Day, Everyone Will Have Always Been Against This',
      author: 'Anonymous',
      price: 71200,
      originalPrice: 89000,
      image: 'https://images.unsplash.com/photo-1580642612739-abcaba21b037?w=200',
      quantity: 1,
    },
    {
      id: '2',
      title: 'Orbiting Jupiter',
      author: 'Gary D. Schmidt',
      price: 61600,
      originalPrice: 77000,
      image: 'https://images.unsplash.com/photo-1715304616318-8a7bb03a142b?w=200',
      quantity: 1,
    },
  ]);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    const item = cartItems.find(item => item.id === id);

    // If trying to decrease quantity and it's already 1, show confirmation dialog
    if (item && item.quantity === 1 && delta === -1) {
      setItemToDelete(id);
      return;
    }

    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    setItemToDelete(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <CheckoutStepper currentPath="checkout" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 bg-white rounded-xl border border-border"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded-lg"
                />

                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.author}</p>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Rp {item.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      Rp {item.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 rounded-full hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 rounded-full hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => setItemToDelete(item.id)}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="p-6 bg-white rounded-xl border border-border space-y-4">
              <h3 className="text-xl font-semibold">Order Summary</h3>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">Rp {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">Rp {subtotal.toLocaleString()}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('address')}
                className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AlertDialog open={itemToDelete !== null} onOpenChange={(open) => {
        if (!open) setItemToDelete(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove item from cart?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this item from your shopping cart? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (itemToDelete) {
                removeItem(itemToDelete);
              }
            }}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
