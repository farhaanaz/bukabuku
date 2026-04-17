import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FICTION_CATEGORIES = [
  'Fantasy',
  'Science Fiction (Sci-Fi)',
  'Mystery / Detective',
  'Thriller / Suspense',
  'Horror',
  'Romance',
  'Historical Fiction',
  'Adventure',
  'Dystopian',
  'Young Adult (YA)',
  "Children's Fiction",
  'Literary Fiction',
  'Graphic Novels / Comics',
];

export const NON_FICTION_CATEGORIES = [
  'Biography / Autobiography / Memoir',
  'Self-Help / Personal Development',
  'Business / Economics',
  'History',
  'Science & Technology',
  'Philosophy',
  'Psychology',
  'Politics',
  'Religion / Spirituality',
  'Health & Fitness',
  'Travel',
  'True Crime',
];

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const clearAll = () => {
    onCategoryChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-transparent hover:border-primary hover:bg-white transition-all"
      >
        <span className="text-sm font-medium">Categories</span>
        {selectedCategories.length > 0 && (
          <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
            {selectedCategories.length}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-border w-[600px] max-h-[500px] overflow-hidden z-50"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold">Filter by Category</h3>
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 divide-x divide-border overflow-y-auto max-h-[420px]">
              {/* Fiction */}
              <div className="p-4">
                <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                  Fiction
                </h4>
                <div className="space-y-2">
                  {FICTION_CATEGORIES.map((category) => (
                    <label
                      key={category}
                      className="flex items-start gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Non-Fiction */}
              <div className="p-4">
                <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                  Non-Fiction
                </h4>
                <div className="space-y-2">
                  {NON_FICTION_CATEGORIES.map((category) => (
                    <label
                      key={category}
                      className="flex items-start gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
