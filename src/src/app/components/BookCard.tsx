import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useContext } from 'react';
import { NavigationContext } from '../App';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
}

export function BookCard({ id, title, author, price, originalPrice, image, rating = 4.5 }: BookCardProps) {
  const { navigate } = useContext(NavigationContext);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate('product', id)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl bg-muted/30 aspect-[3/4] mb-4">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            -{discount}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{author}</p>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Rp {price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              Rp {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
