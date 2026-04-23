import { motion } from 'motion/react';
import { Package, MapPin, Truck, CheckCircle2, Clock, Phone, Mail } from 'lucide-react';
import { useContext, useState } from 'react';
import { NavigationContext } from '../App';

interface TrackingStatus {
  id: string;
  status: string;
  location: string;
  date: string;
  time: string;
  description: string;
  completed: boolean;
}

export function OrderTrackingPage() {
  const { navigate } = useContext(NavigationContext);
  const [orderNumber] = useState('BKB-2026-041901');

  const orderDetails = {
    orderNumber: 'BKB-2026-041901',
    orderDate: 'April 19, 2026',
    estimatedDelivery: 'April 23 - April 28, 2026',
    currentStatus: 'In Transit',
    carrier: 'Lion Parcel',
    trackingNumber: 'LP123456789ID',
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
    shippingAddress: {
      name: 'Farhan Ahmad Zamzami',
      address: 'Jl. Raya Dadapalangu, Ponggok',
      city: 'Kabupaten Blitar, Jawa Timur',
      postalCode: '66153',
      phone: '6285855246645',
    },
  };

  const trackingHistory: TrackingStatus[] = [
    {
      id: '4',
      status: 'Pesanan Dikonfirmasi',
      location: 'Jakarta, Indonesia',
      date: 'April 19, 2026',
      time: '10:30 AM',
      description: 'Pesanan Anda telah dikonfirmasi dan sedang disiapkan',
      completed: true,
    },
    {
      id: '3',
      status: 'Telah Diambil',
      location: 'Jakarta Distribution Center',
      date: 'April 20, 2026',
      time: '02:15 PM',
      description: 'Paket telah diambil oleh kurir',
      completed: true,
    },
    {
      id: '2',
      status: 'Dalam Perjalanan',
      location: 'Surabaya Transit Hub',
      date: 'April 21, 2026',
      time: '08:45 AM',
      description: 'Paket sedang dalam perjalanan ke tujuan',
      completed: true,
    },
    {
      id: '1',
      status: 'Dalam Pengiriman',
      location: 'Blitar Local Facility',
      date: 'Estimasi: April 23, 2026',
      time: '',
      description: 'Paket akan segera dikirim',
      completed: false,
    },
    {
      id: '0',
      status: 'Terkirim',
      location: orderDetails.shippingAddress.address,
      date: 'Estimasi: April 23, 2026',
      time: '',
      description: 'Paket akan dikirim ke alamat Anda',
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Pelacakan Pesanan</h1>
              <p className="text-muted-foreground">
                Lacak pesanan Anda: <span className="font-semibold text-foreground">{orderNumber}</span>
              </p>
            </div>
            <button
              onClick={() => navigate('home')}
              className="px-6 py-2 border border-border rounded-full hover:bg-muted transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary rounded-full">
                  <Truck className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{orderDetails.currentStatus}</h3>
                  <p className="text-sm text-muted-foreground">Estimasi pengiriman: {orderDetails.estimatedDelivery}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Kurir</p>
                    <p className="font-medium">{orderDetails.carrier}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Nomor Resi</p>
                    <p className="font-medium">{orderDetails.trackingNumber}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tracking Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white rounded-xl border border-border"
            >
              <h3 className="text-xl font-semibold mb-6">Riwayat Pelacakan</h3>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-6">
                  {trackingHistory.map((status, index) => (
                    <motion.div
                      key={status.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative flex gap-4"
                    >
                      {/* Timeline Dot */}
                      <div
                        className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          status.completed
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground border-2 border-border'
                        }`}
                      >
                        {status.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`font-semibold ${status.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {status.status}
                          </h4>
                          <div className="text-right">
                            <p className="text-sm font-medium text-muted-foreground">{status.date}</p>
                            {status.time && <p className="text-xs text-muted-foreground">{status.time}</p>}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{status.description}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{status.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-white rounded-xl border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Alamat Pengiriman</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                <p className="text-muted-foreground">{orderDetails.shippingAddress.address}</p>
                <p className="text-muted-foreground">
                  {orderDetails.shippingAddress.city} {orderDetails.shippingAddress.postalCode}
                </p>
                <p className="text-muted-foreground">Telepon: {orderDetails.shippingAddress.phone}</p>
              </div>
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white rounded-xl border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Item Pesanan</h3>
              </div>
              <div className="space-y-3">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.author}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="text-sm font-semibold">Rp {item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Customer Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-primary/5 rounded-xl border border-primary/20"
            >
              <h3 className="font-semibold mb-3">Butuh Bantuan?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hubungi layanan pelanggan kami untuk bantuan
              </p>
              <div className="space-y-2">
                <a
                  href="https://wa.me/6285855246645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  Dukungan WhatsApp
                </a>
                <a
                  href="mailto:support@bukabuku.com"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  support@bukabuku.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
