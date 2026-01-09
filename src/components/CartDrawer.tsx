import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer = ({ isOpen, onClose, onCheckout }: CartDrawerProps) => {
  const { items, shop, total, clearCart, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/40 z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden",
        "animate-slide-up"
      )}>
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Your Cart</h2>
              {shop && (
                <p className="text-sm text-muted-foreground">{shop.name}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="overflow-y-auto max-h-[50vh] p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Browse shops and add items to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.shopProductId}
                  className="flex items-center gap-3 bg-card rounded-xl p-3"
                >
                  <img
                    src={item.shopProduct.product.image}
                    alt={item.shopProduct.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">
                      {item.shopProduct.product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.shopProduct.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      ₹{item.shopProduct.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="sticky bottom-0 bg-background border-t border-border p-4 pb-safe">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground">₹{total}</span>
            </div>
            <Button
              variant="hero"
              size="xl"
              onClick={onCheckout}
              className="w-full"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
