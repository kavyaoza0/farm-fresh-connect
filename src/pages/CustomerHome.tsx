import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { SearchBar } from '@/components/SearchBar';
import { ShopCard } from '@/components/ShopCard';
import { ShopDetail } from '@/components/ShopDetail';
import { CartDrawer } from '@/components/CartDrawer';
import { Shop } from '@/types';
import { useShops } from '@/hooks/useShops';
import { Apple, Carrot, Leaf, Sparkles, Loader2 } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'vegetable', label: 'Vegetables', icon: Carrot },
  { id: 'fruit', label: 'Fruits', icon: Apple },
  { id: 'leafy', label: 'Leafy Greens', icon: Leaf },
];

export const CustomerHome = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'orders' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: shops = [], isLoading, error } = useShops();

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
            // Navigate to checkout
          }}
        />
        {/* Floating Cart Button */}
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

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-4">
        {/* Hero Banner */}
        <div className="gradient-hero rounded-2xl p-6 mb-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Fresh from Farm 🌱</h2>
          <p className="text-sm opacity-90 mb-4">
            Buy fresh vegetables & fruits from verified local shops
          </p>
          <div className="flex gap-3">
            <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
              <p className="text-2xl font-bold">{shops.length}</p>
              <p className="text-xs opacity-80">Nearby Shops</p>
            </div>
            <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-xs opacity-80">Products</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          className="mb-4"
        />

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Shops List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-lg">
              Nearby Shops
            </h3>
            <button className="text-sm text-primary font-medium">
              See all
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">Error loading shops. Please try again.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredShops.map((shop) => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  onClick={() => setSelectedShop(shop)}
                />
              ))}
            </div>
          )}

          {!isLoading && !error && filteredShops.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {shops.length === 0 
                  ? 'No shops available yet. Check back soon!'
                  : 'No shops found matching your search'
                }
              </p>
            </div>
          )}
        </section>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
        }}
      />
    </div>
  );
};
