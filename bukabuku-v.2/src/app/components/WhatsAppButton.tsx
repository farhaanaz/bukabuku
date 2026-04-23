import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsAppButton() {
  const handleClick = () => {
    // Replace with your actual WhatsApp number (format: country code + number without + or spaces)
    const phoneNumber = '6285855246645'; // Example: Indonesian number
    const message = encodeURIComponent('Halo, saya butuh bantuan dengan pesanan saya di bukabuku.com');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow group"
      aria-label="Hubungi Layanan Pelanggan via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Layanan Pelanggan
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
      </motion.div>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
    </motion.button>
  );
}
