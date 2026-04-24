import { Search, ShoppingCart, User, Heart, Package, LogOut, UserCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useContext, useState } from 'react';
import { NavigationContext, FilterContext, WishlistContext, AuthContext } from '../App';
import { CategoryFilter } from './CategoryFilter';

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  const { navigate } = useContext(NavigationContext);
  const { selectedCategories, setSelectedCategories } = useContext(FilterContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('search', undefined, searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate('search', undefined, mobileSearchQuery.trim());
      setMobileSearchQuery('');
      setShowMobileSearch(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate('home')} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">B</span>
            </div>
            <span className="text-xl font-semibold">bukabuku.com</span>
          </button>

          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8 gap-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
            />
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari buku, penulis, ISBN..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-muted/50 border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
              />
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('wishlist')} className="relative p-2 hover:bg-muted rounded-lg transition-colors" title="Daftar Keinginan">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button onClick={() => navigate('checkout')} className="relative p-2 hover:bg-muted rounded-lg transition-colors" title="Keranjang Belanja">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate('tracking')} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Lacak Pesanan">
              <Package className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-border mx-2" />

            {/* User Account Dropdown */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Akun Saya"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:block text-sm font-medium max-w-[100px] truncate">
                    {user.fullName}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-border overflow-hidden z-20"
                      >
                        <div className="p-4 border-b border-border bg-muted/30">
                          <p className="font-semibold truncate">{user.fullName}</p>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('profile');
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3"
                          >
                            <UserCircle className="w-5 h-5 text-muted-foreground" />
                            <span>Profil Saya</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              logout();
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Keluar</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={() => navigate('login')} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Masuk">
                <User className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {showMobileSearch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSearch(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="fixed top-0 left-0 right-0 bg-white p-4 z-50 shadow-lg md:hidden"
            >
              <form onSubmit={handleMobileSearch} className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    placeholder="Cari buku, penulis, ISBN..."
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-muted/50 border border-border focus:border-primary focus:bg-white transition-all outline-none"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowMobileSearch(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Batal
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}