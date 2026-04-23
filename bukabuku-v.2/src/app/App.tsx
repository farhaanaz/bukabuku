import { useState } from 'react';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AddressPage } from './pages/AddressPage';
import { PaymentPage } from './pages/PaymentPage';
import { ShippingPage } from './pages/ShippingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import React from 'react';

export type Page = 'home' | 'product' | 'checkout' | 'address' | 'payment' | 'shipping' | 'confirmation' | 'wishlist' | 'tracking' | 'profile' | 'login' | 'register' | 'search';

export interface NavigationState {
  page: Page;
  productId?: string;
  searchQuery?: string;
}

export const NavigationContext = React.createContext<{
  state: NavigationState;
  navigate: (page: Page, productId?: string, searchQuery?: string) => void;
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

export interface WishlistItem {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
}

export const WishlistContext = React.createContext<{
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
});

export interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

export const CartContext = React.createContext<{
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export interface User {
  fullName: string;
  email: string;
  phone?: string;
}

export const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export default function App() {
  const [navState, setNavState] = useState<NavigationState>({ page: 'home' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const navigate = (page: Page, productId?: string, searchQuery?: string) => {
    setNavState({ page, productId, searchQuery });
    window.scrollTo(0, 0);
  };

  const addToWishlist = (item: WishlistItem) => {
    if (!wishlistItems.find(w => w.id === item.id)) {
      setWishlistItems([...wishlistItems, item]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some(item => item.id === id);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate('home');
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
      case 'wishlist':
        return <WishlistPage />;
      case 'tracking':
        return <OrderTrackingPage />;
      case 'profile':
        return <ProfilePage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'search':
        return <SearchResultsPage searchQuery={navState.searchQuery || ''} />;
      default:
        return <HomePage />;
    }
  };

  const isAuthPage = navState.page === 'login' || navState.page === 'register';

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      <NavigationContext.Provider value={{ state: navState, navigate }}>
        <FilterContext.Provider value={{ selectedCategories, setSelectedCategories }}>
          <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
            <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
              <div className="min-h-screen bg-background">
                {!isAuthPage && <Header cartCount={cartItems.length} />}
                {!isAuthPage && <Breadcrumb />}
                {renderPage()}
                {!isAuthPage && <WhatsAppButton />}
              </div>
            </CartContext.Provider>
          </WishlistContext.Provider>
        </FilterContext.Provider>
      </NavigationContext.Provider>
    </AuthContext.Provider>
  );
}