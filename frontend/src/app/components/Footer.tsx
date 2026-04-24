import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, useContext } from 'react';
import { NavigationContext } from '../App';

export function Footer() {
  const { navigate } = useContext(NavigationContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-primary/10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Dapatkan Update Terbaru
              </h3>
              <p className="text-gray-400">
                Berlangganan newsletter kami untuk mendapatkan info promo dan buku terbaru
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:shadow-lg transition-shadow whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                Berlangganan
              </motion.button>
            </form>
          </div>
          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg text-center"
            >
              ✓ Terima kasih! Anda telah berlangganan newsletter kami.
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">bukabuku.com</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Toko buku online terpercaya dengan koleksi terlengkap dan harga terbaik di Indonesia.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">Jl. Sudirman No. 123, Jakarta</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">+62 858-5524-6645</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">info@bukabuku.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Cara Pemesanan
                </a>
              </li>
              <li>
                <button onClick={() => navigate('tracking')} className="text-gray-400 hover:text-primary transition-colors">
                  Lacak Pesanan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('login')} className="text-gray-400 hover:text-primary transition-colors">
                  Masuk / Daftar
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Layanan Pelanggan</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Kebijakan Pengembalian
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Metode Pembayaran
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Pengiriman
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Payment */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Ikuti Kami</h4>
            <div className="flex gap-3 mb-6">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>

            <h4 className="text-lg font-semibold text-white mb-4">Metode Pembayaran</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 rounded-lg p-2 flex items-center justify-center text-xs font-medium">
                VISA
              </div>
              <div className="bg-white/10 rounded-lg p-2 flex items-center justify-center text-xs font-medium">
                Master
              </div>
              <div className="bg-white/10 rounded-lg p-2 flex items-center justify-center text-xs font-medium">
                BCA
              </div>
              <div className="bg-white/10 rounded-lg p-2 flex items-center justify-center text-xs font-medium">
                Mandiri
              </div>
              <div className="bg-white/10 rounded-lg p-2 flex items-center justify-center text-xs font-medium">
                GoPay
              </div>
              <div className="bg-white/10 rounded-lg p-2 flex items-center justify-center text-xs font-medium">
                OVO
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2026 bukabuku.com. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Syarat Layanan
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Privasi
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
