import { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Shop } from '@/types';
import { useShopWithProducts } from '@/hooks/useShops';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopDetailProps {
  shop: Shop;
  onBack: () => void;
  className?: string;
}

type Category = 'all' | 'vegetable' | 'fruit' | 'leafy';

const categories = [
  { id: 'all' as Category, label: 'All' },
  { id: 'vegetable' as Category, label: 'Vegetables' },
  { id: 'fruit' as Category, label: 'Fruits' },
  { id: 'leafy' as Category, label: 'Leafy' },
];

export const ShopDetail = ({ shop: initialShop, onBack, className }: ShopDetailProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const { data, isLoading } = useShopWithProducts(initialShop.id);

  const shop = data?.shop ?? initialShop;
  const products = data?.products ?? [];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(sp => sp.product.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={cn("min-h-screen bg-background", className)}
    >
      {/* Header Image with 3D parallax */}
      <motion.div
        className="relative h-56 overflow-hidden"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{ perspective: 800 }}
      >
        <motion.img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-4"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Shop Info Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, rotateX: -20 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-2xl font-bold mb-1"
              >
                {shop.name}
              </motion.h1>
              <div className="flex items-center gap-3 text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={{ rotate: [0, 72, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </motion.div>
                  <span>{shop.rating}</span>
                  <span>({shop.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                shop.isOpen ? "bg-success" : "bg-muted text-muted-foreground"
              )}
            >
              {shop.isOpen ? 'Open' : 'Closed'}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Shop Details with stagger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-card border-b border-border"
      >
        <p className="text-sm text-muted-foreground mb-3">{shop.description}</p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-wrap gap-4 text-sm"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0 } }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Clock className="w-4 h-4" />
            <span>{shop.openingTime} - {shop.closingTime}</span>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0 } }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <MapPin className="w-4 h-4" />
            <span>{shop.location.address}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button variant="outline" size="sm" className="mt-3">
            <Phone className="w-4 h-4 mr-2" />
            Contact Shop
          </Button>
        </motion.div>
      </motion.div>

      {/* Category Filter with 3D pills */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.6 + i * 0.08, type: "spring" }}
              whileHover={{ scale: 1.08, rotateY: 8 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 pb-32">
        <motion.h2
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="font-semibold text-foreground mb-4"
        >
          Available Products ({filteredProducts.length})
        </motion.h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <Loader2 className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              {filteredProducts.map((sp, i) => (
                <ProductCard key={sp.id} shopProduct={sp} shop={shop} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No products in this category</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
