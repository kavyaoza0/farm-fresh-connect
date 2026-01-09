import { Plus, Minus } from 'lucide-react';
import { ShopProduct, Shop } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  shopProduct: ShopProduct;
  shop: Shop;
  className?: string;
}

export const ProductCard = ({ shopProduct, shop, className }: ProductCardProps) => {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const { product, price, stock, isAvailable } = shopProduct;

  const cartItem = items.find(item => item.shopProductId === shopProduct.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(shopProduct, shop);
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      updateQuantity(shopProduct.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    updateQuantity(shopProduct.id, quantity - 1);
  };

  return (
    <div
      className={cn(
        "bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in",
        !isAvailable && "opacity-60",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-primary-foreground font-medium bg-destructive px-3 py-1 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
        {stock <= 10 && stock > 0 && (
          <div className="absolute top-2 right-2 bg-warning text-foreground px-2 py-0.5 rounded-full text-xs font-medium">
            Only {stock} left
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <div className="mb-1">
          <h4 className="font-semibold text-foreground text-sm leading-tight">
            {product.name}
          </h4>
          {product.nameHindi && (
            <span className="text-xs text-muted-foreground">{product.nameHindi}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-lg font-bold text-primary">₹{price}</span>
            <span className="text-xs text-muted-foreground ml-1">/{product.unit}</span>
          </div>

          {isAvailable && (
            <>
              {quantity === 0 ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAdd}
                  className="h-8 px-4"
                >
                  Add
                </Button>
              ) : (
                <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDecrement}
                    className="h-7 w-7 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-primary w-5 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleIncrement}
                    disabled={quantity >= stock}
                    className="h-7 w-7 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
