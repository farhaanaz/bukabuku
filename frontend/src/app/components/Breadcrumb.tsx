import { ChevronRight, Home } from 'lucide-react';
import { useContext } from 'react';
import { NavigationContext, Page } from '../App';

interface BreadcrumbItem {
  label: string;
  page: Page;
  productId?: string;
}

const pageToBreadcrumbs: Record<Page, BreadcrumbItem[]> = {
  home: [{ label: 'Beranda', page: 'home' }],
  product: [
    { label: 'Beranda', page: 'home' },
    { label: 'Produk', page: 'product' },
  ],
  wishlist: [
    { label: 'Beranda', page: 'home' },
    { label: 'Daftar Keinginan', page: 'wishlist' },
  ],
  tracking: [
    { label: 'Beranda', page: 'home' },
    { label: 'Lacak Pesanan', page: 'tracking' },
  ],
  profile: [
    { label: 'Beranda', page: 'home' },
    { label: 'Profil Saya', page: 'profile' },
  ],
  search: [
    { label: 'Beranda', page: 'home' },
    { label: 'Hasil Pencarian', page: 'search' },
  ],
  login: [{ label: 'Masuk', page: 'login' }],
  register: [{ label: 'Daftar', page: 'register' }],
  checkout: [
    { label: 'Beranda', page: 'home' },
    { label: 'Keranjang Belanja', page: 'checkout' },
  ],
  address: [
    { label: 'Beranda', page: 'home' },
    { label: 'Keranjang Belanja', page: 'checkout' },
    { label: 'Alamat Pengiriman', page: 'address' },
  ],
  shipping: [
    { label: 'Beranda', page: 'home' },
    { label: 'Keranjang Belanja', page: 'checkout' },
    { label: 'Alamat Pengiriman', page: 'address' },
    { label: 'Metode Pengiriman', page: 'shipping' },
  ],
  payment: [
    { label: 'Beranda', page: 'home' },
    { label: 'Keranjang Belanja', page: 'checkout' },
    { label: 'Alamat Pengiriman', page: 'address' },
    { label: 'Metode Pengiriman', page: 'shipping' },
    { label: 'Pembayaran', page: 'payment' },
  ],
  confirmation: [
    { label: 'Beranda', page: 'home' },
    { label: 'Keranjang Belanja', page: 'checkout' },
    { label: 'Alamat Pengiriman', page: 'address' },
    { label: 'Metode Pengiriman', page: 'shipping' },
    { label: 'Pembayaran', page: 'payment' },
    { label: 'Konfirmasi', page: 'confirmation' },
  ],
};

export function Breadcrumb() {
  const { state, navigate } = useContext(NavigationContext);
  const breadcrumbs = pageToBreadcrumbs[state.page] || [];

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <div key={item.page + index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
                )}
                {isLast ? (
                  <span className="font-medium text-foreground">{item.label}</span>
                ) : (
                  <button
                    onClick={() => navigate(item.page, item.productId)}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {isFirst && <Home className="w-4 h-4" />}
                    {item.label}
                  </button>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
