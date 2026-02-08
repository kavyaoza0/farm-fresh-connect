import { Plus, Minus } from 'lucide-react';
import { ShopProduct, Shop } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProductCardProps {
  shopProduct: ShopProduct;
  shop: Shop;
  className?: string;
  index?: number;
}

export const ProductCard = ({ shopProduct, shop, className, index = 0 }: ProductCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const { product, price, stock, isAvailable } = shopProduct;

  const cartItem = items.find(item => item.shopProductId === shopProduct.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => addItem(shopProduct, shop);
  const handleIncrement = () => { if (quantity < stock) updateQuantity(shopProduct.id, quantity + 1); };
  const handleDecrement = () => updateQuantity(shopProduct.id, quantity - 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.04, rotateY: 3, z: 20 }}
      whileTap={{ scale: 0.96 }}
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
      className={cn(
        "bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300",
        !isAvailable && "opacity-60",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative h-32 overflow-hidden" style={{ transform: "translateZ(8px)" }}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-primary-foreground font-medium bg-destructive px-3 py-1 rounded-full text-sm"
            >
              Out of Stock
            </motion.span>
          </div>
        )}
        {stock <= 10 && stock > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-2 right-2 bg-warning text-foreground px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ transform: "translateZ(20px)" }}
          >
            Only {stock} left
          </motion.div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3" style={{ transform: "translateZ(12px)" }}>
        <div className="mb-1">
          <h4 className="font-semibold text-foreground text-sm leading-tight">{product.name}</h4>
          {product.nameHindi && (
            <span className="text-xs text-muted-foreground">{product.nameHindi}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <motion.span
              className="text-lg font-bold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.08 + 0.3 }}
            >
              ₹{price}
            </motion.span>
            <span className="text-xs text-muted-foreground ml-1">/{product.unit}</span>
          </div>

          {isAvailable && (
            <>
              {quantity === 0 ? (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="sm" onClick={handleAdd} className="h-8 px-4">
                    Add
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="flex items-center gap-2 bg-primary/10 rounded-lg p-1"
                >
                  <Button variant="ghost" size="icon" onClick={handleDecrement} className="h-7 w-7 text-primary hover:bg-primary hover:text-primary-foreground">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <motion.span
                    key={quantity}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="font-semibold text-primary w-5 text-center"
                  >
                    {quantity}
                  </motion.span>
                  <Button variant="ghost" size="icon" onClick={handleIncrement} disabled={quantity >= stock} className="h-7 w-7 text-primary hover:bg-primary hover:text-primary-foreground">
                    <Plus className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
