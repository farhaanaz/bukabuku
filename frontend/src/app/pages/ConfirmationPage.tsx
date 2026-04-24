import { motion } from 'motion/react';
import { CheckoutStepper } from '../components/CheckoutStepper';
import { CheckCircle2, MapPin, CreditCard, Truck, Package } from 'lucide-react';
import { useContext } from 'react';
import { NavigationContext } from '../App';

export function ConfirmationPage() {
  const { navigate } = useContext(NavigationContext);

  const orderDetails = {
    shipping: {
      name: 'Farhan Ahmad Zamzami',
      address: 'Jl. Raya Dadapalangu, Ponggok, Kabupaten Blitar, Jawa Timur, Indonesia, 66153',
      phone: '6285855246645',
    },
    payment: {
      method: 'Transfer BCA',
    },
    delivery: {
      method: 'Standar - Lion Parcel',
      duration: '3-6 hari kerja',
      estimatedDelivery: 'April 23 - April 28, 2026',
    },
    items: [
      {
        id: '1',
        title: 'One Day, Everyone Will Have Always Been Against This',
        author: 'Anonymous',
        image: 'https://images.unsplash.com/photo-1580642612739-abcaba21b037?w=200',
        quantity: 1,
        price: 71200,
      },
      {
        id: '2',
        title: 'Orbiting Jupiter',
        author: 'Gary D. Schmidt',
        image: 'https://images.unsplash.com/photo-1715304616318-8a7bb03a142b?w=200',
        quantity: 1,
        price: 61600,
      },
    ],
    pricing: {
      subtotal: 132800,
      shipping: 58000,
      total: 190800,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutStepper currentPath="confirmation" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">Pesanan Dikonfirmasi!</h2>
          <p className="text-muted-foreground">
            Terima kasih atas pembelian Anda. Pesanan Anda telah berhasil dibuat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Shipping Address */}
          <div className="p-6 bg-white rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Alamat Pengiriman</h3>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{orderDetails.shipping.name}</p>
              <p className="text-muted-foreground">{orderDetails.shipping.address}</p>
              <p className="text-muted-foreground">Telepon: {orderDetails.shipping.phone}</p>
            </div>
            <button
              onClick={() => navigate('address')}
              className="text-sm text-primary font-medium mt-3 hover:underline"
            >
              Edit
            </button>
          </div>

          {/* Payment Method */}
          <div className="p-6 bg-white rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Metode Pembayaran</h3>
            </div>
            <p className="text-sm font-medium">{orderDetails.payment.method}</p>
            <button
              onClick={() => navigate('payment')}
              className="text-sm text-primary font-medium mt-3 hover:underline"
            >
              Edit
            </button>
          </div>

          {/* Shipping Method */}
          <div className="p-6 bg-white rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Metode Pengiriman</h3>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{orderDetails.delivery.method}</p>
              <p className="text-muted-foreground">{orderDetails.delivery.duration}</p>
              <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                <p className="text-xs text-muted-foreground">Estimasi Pengiriman</p>
                <p className="font-medium">{orderDetails.delivery.estimatedDelivery}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="shipInOne" className="rounded" />
              <label htmlFor="shipInOne" className="text-sm cursor-pointer">
                Kirim semua item dalam satu paket
              </label>
            </div>
            <button
              onClick={() => navigate('shipping')}
              className="text-sm text-primary font-medium mt-3 hover:underline"
            >
              Edit
            </button>
          </div>

          {/* Order Items */}
          <div className="p-6 bg-white rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Item Pesanan</h3>
              </div>
              <button
                onClick={() => navigate('checkout')}
                className="text-sm text-primary font-medium hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              {orderDetails.items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.author}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                      <span className="font-semibold">Rp {item.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coupon */}
          <div className="p-6 bg-white rounded-xl border border-border">
            <h3 className="font-semibold mb-3">Kode Kupon</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Masukkan kode kupon"
                className="flex-1 px-4 py-2 rounded-lg border border-border focus:border-primary outline-none"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-md transition-shadow">
                Terapkan
              </button>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-6 bg-white rounded-xl border border-border">
            <h3 className="font-semibold mb-4">Ringkasan Pembayaran</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">Rp {orderDetails.pricing.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pengiriman</span>
                <span className="font-medium">Rp {orderDetails.pricing.shipping.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  Rp {orderDetails.pricing.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Order Tracking Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <h3 className="font-semibold mb-2 text-blue-900">Lacak Pesanan Anda</h3>
            <p className="text-sm text-blue-800 mb-4">
              Setelah pembayaran Anda dikonfirmasi, Anda dapat melacak status pengiriman secara real-time.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('tracking')}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Lacak Pesanan Saya
            </motion.button>
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('home')}
              className="flex-1 border border-border py-4 rounded-full font-medium hover:bg-muted transition-colors"
            >
              Lanjutkan Belanja
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-primary text-primary-foreground py-4 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Selesaikan Pesanan
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
