import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMyShop, useMyShopProducts, useShopOrders } from '@/hooks/useShopkeeper';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ShopOverview } from '@/components/shopkeeper/ShopOverview';
import { ProductManagement } from '@/components/shopkeeper/ProductManagement';
import { OrderManagement } from '@/components/shopkeeper/OrderManagement';
import { CreateShopForm } from '@/components/shopkeeper/CreateShopForm';
import { Skeleton } from '@/components/ui/skeleton';

type TabType = 'overview' | 'products' | 'orders';

export function ShopkeeperDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { signOut } = useAuth();
  const { data: shop, isLoading: shopLoading } = useMyShop();
  const { data: products = [], isLoading: productsLoading } = useMyShopProducts(shop?.id);
  const { data: orders = [], isLoading: ordersLoading } = useShopOrders(shop?.id);

  // Calculate pending orders count
  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'pending' || o.status === 'confirmed' || o.status === 'preparing'
  ).length;

  if (shopLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="My Shop" onProfileClick={signOut} />
        <div className="p-4 space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // If no shop exists, show create shop form
  if (!shop) {
    return <CreateShopForm />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={shop.name} 
        onProfileClick={signOut}
        showLocation={false}
        showCart={false}
      />

      <main className="container max-w-lg mx-auto p-4">
        {activeTab === 'overview' && (
          <ShopOverview 
            shop={shop} 
            productsCount={products.length}
            ordersCount={pendingOrdersCount}
          />
        )}

        {activeTab === 'products' && (
          <ProductManagement 
            shopId={shop.id} 
            products={products}
            isLoading={productsLoading}
          />
        )}

        {activeTab === 'orders' && (
          <OrderManagement 
            orders={orders}
            isLoading={ordersLoading}
          />
        )}
      </main>

      <BottomNav
        activeTab={
          activeTab === 'overview' ? 'home' : 
          activeTab === 'products' ? 'explore' : 
          'orders'
        }
        onTabChange={(tab) => {
          if (tab === 'home') setActiveTab('overview');
          else if (tab === 'explore') setActiveTab('products');
          else if (tab === 'orders') setActiveTab('orders');
        }}
      />
    </div>
  );
}
