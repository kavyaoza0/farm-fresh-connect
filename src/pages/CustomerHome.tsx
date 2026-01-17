import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ShopDetail } from '@/components/ShopDetail';
import { CartDrawer } from '@/components/CartDrawer';
import { LocationSelector } from '@/components/LocationSelector';
import { ExploreTab } from '@/components/customer/ExploreTab';
import { OrdersTab } from '@/components/customer/OrdersTab';
import { ProfileTab } from '@/components/customer/ProfileTab';
import { HomeTab } from '@/components/customer/HomeTab';
import { Shop } from '@/types';
import { useShops, ShopWithDistance } from '@/hooks/useShops';
import { Apple } from 'lucide-react';

export const CustomerHome = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'orders' | 'profile'>('home');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: shops = [] } = useShops();

  if (selectedShop) {
    return (
      <>
        <ShopDetail shop={selectedShop} onBack={() => setSelectedShop(null)} />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
          }}
        />
        <div className="fixed bottom-20 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="gradient-hero text-primary-foreground shadow-elevated p-4 rounded-full"
          >
            <Apple className="w-6 h-6" />
          </button>
        </div>
      </>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreTab onShopSelect={setSelectedShop} />;
      case 'orders':
        return <OrdersTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <HomeTab onExplore={() => setActiveTab('explore')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <LocationSelector shops={shops as unknown as ShopWithDistance[]} />

      <main className="container max-w-lg mx-auto px-4 py-4">
        {renderTabContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => setIsCartOpen(false)}
      />
    </div>
  );
};
