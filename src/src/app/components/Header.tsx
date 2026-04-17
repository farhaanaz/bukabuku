import { Search, ShoppingCart, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { NavigationContext, FilterContext } from '../App';
import { CategoryFilter } from './CategoryFilter';

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  const { navigate } = useContext(NavigationContext);
  const { selectedCategories, setSelectedCategories } = useContext(FilterContext);

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
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for books, authors, ISBN..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-muted/50 border border-transparent focus:border-primary focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('checkout')} className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}