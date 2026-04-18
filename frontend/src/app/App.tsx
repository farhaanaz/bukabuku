import { useState } from 'react';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AddressPage } from './pages/AddressPage';
import { PaymentPage } from './pages/PaymentPage';
import { ShippingPage } from './pages/ShippingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import React from 'react';

export type Page = 'home' | 'product' | 'checkout' | 'address' | 'payment' | 'shipping' | 'confirmation';

export interface NavigationState {
  page: Page;
  productId?: string;
}

export const NavigationContext = React.createContext<{
  state: NavigationState;
  navigate: (page: Page, productId?: string) => void;
}>({
  state: { page: 'home' },
  navigate: () => {},
});

export const FilterContext = React.createContext<{
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}>({
  selectedCategories: [],
  setSelectedCategories: () => {},
});

export default function App() {
  const [navState, setNavState] = useState<NavigationState>({ page: 'home' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const navigate = (page: Page, productId?: string) => {
    setNavState({ page, productId });
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (navState.page) {
      case 'home':
        return <HomePage />;
      case 'product':
        return <ProductPage productId={navState.productId} />;
      case 'checkout':
        return <CheckoutPage />;
      case 'address':
        return <AddressPage />;
      case 'payment':
        return <PaymentPage />;
      case 'shipping':
        return <ShippingPage />;
      case 'confirmation':
        return <ConfirmationPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <NavigationContext.Provider value={{ state: navState, navigate }}>
      <FilterContext.Provider value={{ selectedCategories, setSelectedCategories }}>
        <div className="min-h-screen bg-background">
          <Header cartCount={2} />
          <Breadcrumb />
          {renderPage()}
        </div>
      </FilterContext.Provider>
    </NavigationContext.Provider>
  );
}