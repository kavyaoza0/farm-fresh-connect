import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { SearchBar } from '@/components/SearchBar';
import { ShopCard } from '@/components/ShopCard';
import { ShopDetail } from '@/components/ShopDetail';
import { CartDrawer } from '@/components/CartDrawer';
import { LocationSelector } from '@/components/LocationSelector';
import { ShopMap } from '@/components/ShopMap';
import { ExploreTab } from '@/components/customer/ExploreTab';
import { OrdersTab } from '@/components/customer/OrdersTab';
import { ProfileTab } from '@/components/customer/ProfileTab';
import { Shop } from '@/types';
import { useShops, ShopWithDistance } from '@/hooks/useShops';
import { useLocation } from '@/context/LocationContext';
import { useLanguage } from '@/context/LanguageContext';
import { Apple, Carrot, Leaf, Sparkles, Loader2, Map, List, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', labelKey: 'all' as const, icon: Sparkles },
  { id: 'vegetable', labelKey: 'vegetables' as const, icon: Carrot },
  { id: 'fruit', labelKey: 'fruits' as const, icon: Apple },
  { id: 'leafy', labelKey: 'leafyGreens' as const, icon: Leaf },
];

export const CustomerHome = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'orders' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const { userLocation, isLocationSet, setShowLocationSelector } = useLocation();
  const { data: shops = [], isLoading, error } = useShops();
  const { t } = useLanguage();

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedShop) {
    return (
      <>
        <ShopDetail 
          shop={selectedShop} 
          onBack={() => setSelectedShop(null)} 
        />
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
            className="gradient-hero text-primary-foreground shadow-elevated p-4 rounded-full animate-bounce-soft"
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
        return renderHomeContent();
    }
  };

  const renderHomeContent = () => (
    <>
      {/* Hero Banner */}
      <div className="gradient-hero rounded-2xl p-6 mb-6 text-primary-foreground">
        <h2 className="text-2xl font-bold mb-2">{t.freshFromFarm}</h2>
        <p className="text-sm opacity-90 mb-4">{t.buyFreshVegetables}</p>
        <div className="flex gap-3">
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <p className="text-2xl font-bold">{filteredShops.length}</p>
            <p className="text-xs opacity-80">{t.nearbyShops}</p>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <p className="text-2xl font-bold">50+</p>
            <p className="text-xs opacity-80">{t.products}</p>
          </div>
        </div>
      </div>

      {/* Location Prompt */}
      {!isLocationSet && (
        <div 
          className="bg-muted rounded-xl p-4 mb-4 flex items-center justify-between cursor-pointer hover:bg-muted/80 transition-colors"
          onClick={() => setShowLocationSelector(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{t.setYourLocation}</p>
              <p className="text-sm text-muted-foreground">{t.findShopsNearYou}</p>
            </div>
          </div>
          <Button size="sm" variant="default">{t.setLocation}</Button>
        </div>
      )}

      {/* Search & View Toggle */}
      <div className="flex gap-2 mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={t.searchShops} className="flex-1" />
        <div className="flex bg-muted rounded-xl p-1">
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}>
            <List className="w-5 h-5" />
          </button>
          <button onClick={() => setViewMode('map')} className={`p-2 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}>
            <Map className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${isActive ? 'bg-primary text-primary-foreground shadow-soft' : 'bg-card text-muted-foreground hover:bg-muted'}`}>
              <Icon className="w-4 h-4" />
              {t[cat.labelKey]}
            </button>
          );
        })}
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="h-64 rounded-xl overflow-hidden mb-6 border">
          <ShopMap shops={filteredShops} userLocation={userLocation} onShopSelect={(shop) => setSelectedShop(shop)} />
        </div>
      )}

      {/* Shops List */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground text-lg">{isLocationSet ? t.shopsNearYou : t.allShops}</h3>
          {isLocationSet && (
            <button className="text-sm text-primary font-medium" onClick={() => setShowLocationSelector(true)}>{t.changeLocation}</button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : error ? (
          <div className="text-center py-12"><p className="text-destructive">{t.error}</p></div>
        ) : (
          <div className="space-y-4">
            {filteredShops.map((shop) => (
              <ShopCardWithDistance key={shop.id} shop={shop} onClick={() => setSelectedShop(shop)} />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredShops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{shops.length === 0 ? t.noShopsAvailable : t.noShopsFound}</p>
          </div>
        )}
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <LocationSelector shops={shops} />
      
      <main className="container max-w-lg mx-auto px-4 py-4">
        {renderTabContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={() => setIsCartOpen(false)} />
    </div>
  );
};

const ShopCardWithDistance = ({ shop, onClick }: { shop: ShopWithDistance; onClick: () => void }) => {
  return (
    <div className="relative">
      <ShopCard shop={shop} onClick={onClick} />
      {shop.distance !== undefined && (
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-muted-foreground">
          {shop.distance < 1 ? `${Math.round(shop.distance * 1000)}m away` : `${shop.distance.toFixed(1)} km away`}
        </div>
      )}
    </div>
  );
};
