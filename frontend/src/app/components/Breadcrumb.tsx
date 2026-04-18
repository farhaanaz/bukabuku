import { ChevronRight, Home } from 'lucide-react';
import { useContext } from 'react';
import { NavigationContext, Page } from '../App';

interface BreadcrumbItem {
  label: string;
  page: Page;
  productId?: string;
}

const pageToBreadcrumbs: Record<Page, BreadcrumbItem[]> = {
  home: [{ label: 'Home', page: 'home' }],
  product: [
    { label: 'Home', page: 'home' },
    { label: 'Product', page: 'product' },
  ],
  checkout: [
    { label: 'Home', page: 'home' },
    { label: 'Shopping Cart', page: 'checkout' },
  ],
  address: [
    { label: 'Home', page: 'home' },
    { label: 'Shopping Cart', page: 'checkout' },
    { label: 'Shipping Address', page: 'address' },
  ],
  shipping: [
    { label: 'Home', page: 'home' },
    { label: 'Shopping Cart', page: 'checkout' },
    { label: 'Shipping Address', page: 'address' },
    { label: 'Shipping Method', page: 'shipping' },
  ],
  payment: [
    { label: 'Home', page: 'home' },
    { label: 'Shopping Cart', page: 'checkout' },
    { label: 'Shipping Address', page: 'address' },
    { label: 'Shipping Method', page: 'shipping' },
    { label: 'Payment', page: 'payment' },
  ],
  confirmation: [
    { label: 'Home', page: 'home' },
    { label: 'Shopping Cart', page: 'checkout' },
    { label: 'Shipping Address', page: 'address' },
    { label: 'Shipping Method', page: 'shipping' },
    { label: 'Payment', page: 'payment' },
    { label: 'Confirmation', page: 'confirmation' },
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
