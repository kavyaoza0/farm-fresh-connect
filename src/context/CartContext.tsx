import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, ShopProduct, Shop } from '@/types';

interface CartContextType {
  items: CartItem[];
  shopId: string | null;
  shop: Shop | null;
  addItem: (shopProduct: ShopProduct, shop: Shop) => void;
  removeItem: (shopProductId: string) => void;
  updateQuantity: (shopProductId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shopId, setShopId] = useState<string | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);

  const addItem = useCallback((shopProduct: ShopProduct, currentShop: Shop) => {
    // If cart has items from different shop, clear it first
    if (shopId && shopId !== shopProduct.shopId) {
      setItems([]);
    }
    
    setShopId(shopProduct.shopId);
    setShop(currentShop);

    setItems(prev => {
      const existingItem = prev.find(item => item.shopProductId === shopProduct.id);
      if (existingItem) {
        return prev.map(item =>
          item.shopProductId === shopProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { shopProductId: shopProduct.id, shopProduct, quantity: 1 }];
    });
  }, [shopId]);

  const removeItem = useCallback((shopProductId: string) => {
    setItems(prev => {
      const newItems = prev.filter(item => item.shopProductId !== shopProductId);
      if (newItems.length === 0) {
        setShopId(null);
        setShop(null);
      }
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((shopProductId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(shopProductId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.shopProductId === shopProductId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setShopId(null);
    setShop(null);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.shopProduct.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        shopId,
        shop,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
