import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { ShopCard } from '@/components/ShopCard';
import { ShopMap } from '@/components/ShopMap';
import { useShops, ShopWithDistance } from '@/hooks/useShops';
import { useLocation } from '@/context/LocationContext';
import { useLanguage } from '@/context/LanguageContext';
import { Apple, Carrot, Leaf, Sparkles, Loader2, Map, List } from 'lucide-react';
import { Shop } from '@/types';

const categories = [
  { id: 'all', labelKey: 'all' as const, icon: Sparkles },
  { id: 'vegetable', labelKey: 'vegetables' as const, icon: Carrot },
  { id: 'fruit', labelKey: 'fruits' as const, icon: Apple },
  { id: 'leafy', labelKey: 'leafyGreens' as const, icon: Leaf },
];

interface ExploreTabProps {
  onShopSelect: (shop: Shop) => void;
}

export const ExploreTab = ({ onShopSelect }: ExploreTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const { userLocation, isLocationSet } = useLocation();
  const { data: shops = [], isLoading, error } = useShops();
  const { t } = useLanguage();

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    // Filter by category based on shop products
    return matchesSearch && shop.products?.some(p => p.product.category === selectedCategory);
  });

  return (
    <div className="space-y-4">
      {/* Search & View Toggle */}
      <div className="flex gap-2">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t.searchShops}
          className="flex-1"
        />
        <div className="flex bg-muted rounded-xl p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-background shadow-sm text-foreground' 
                : 'text-muted-foreground'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'map' 
                ? 'bg-background shadow-sm text-foreground' 
                : 'text-muted-foreground'
            }`}
          >
            <Map className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
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
              {t[cat.labelKey]}
            </button>
          );
        })}
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="h-64 rounded-xl overflow-hidden border">
          <ShopMap
            shops={filteredShops}
            userLocation={userLocation}
            onShopSelect={onShopSelect}
          />
        </div>
      )}

      {/* Shops List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive">{t.error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredShops.map((shop) => (
            <ShopCardWithDistance
              key={shop.id}
              shop={shop}
              onClick={() => onShopSelect(shop)}
            />
          ))}
        </div>
      )}

      {!isLoading && !error && filteredShops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {shops.length === 0 ? t.noShopsAvailable : t.noShopsFound}
          </p>
        </div>
      )}
    </div>
  );
};

const ShopCardWithDistance = ({ 
  shop, 
  onClick 
}: { 
  shop: ShopWithDistance; 
  onClick: () => void;
}) => {
  return (
    <div className="relative">
      <ShopCard shop={shop} onClick={onClick} />
      {shop.distance !== undefined && (
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-muted-foreground">
          {shop.distance < 1 
            ? `${Math.round(shop.distance * 1000)}m away`
            : `${shop.distance.toFixed(1)} km away`
          }
        </div>
      )}
    </div>
  );
};
