import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { ShopCard } from '@/components/ShopCard';
import { ShopMap } from '@/components/ShopMap';
import { Button } from '@/components/ui/button';
import { useShops, ShopWithDistance } from '@/hooks/useShops';
import { useLocation } from '@/context/LocationContext';
import { useLanguage } from '@/context/LanguageContext';
import { Apple, Carrot, Leaf, Sparkles, Loader2, Map, List, MapPin } from 'lucide-react';
import { Shop } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

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

  const { userLocation, isLocationSet, setShowLocationSelector } = useLocation();
  const { data: shops = [], isLoading, error } = useShops();
  const { t } = useLanguage();

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && shop.products?.some(p => p.product.category === selectedCategory);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Location */}
      {!isLocationSet ? (
        <motion.button
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.02, rotateY: 2 }}
          style={{ transformStyle: "preserve-3d", perspective: 800 }}
          type="button"
          className="w-full bg-muted rounded-xl p-4 flex items-center justify-between text-left hover:bg-muted/80 transition-colors"
          onClick={() => setShowLocationSelector(true)}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <p className="font-medium text-foreground">{t.setYourLocation}</p>
              <p className="text-sm text-muted-foreground">{t.findShopsNearYou}</p>
            </div>
          </div>
          <Button size="sm" variant="default">{t.setLocation}</Button>
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <button type="button" className="text-sm text-primary font-medium" onClick={() => setShowLocationSelector(true)}>
            {t.changeLocation}
          </button>
        </motion.div>
      )}

      {/* Search & View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={t.searchShops} className="flex-1" />
        <div className="flex bg-muted rounded-xl p-1">
          {['list', 'map'].map((mode) => (
            <motion.button
              key={mode}
              whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode(mode as 'list' | 'map')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === mode ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              {mode === 'list' ? <List className="w-5 h-5" /> : <Map className="w-5 h-5" />}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Categories with 3D hover */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
      >
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring" }}
              whileHover={{ scale: 1.08, rotateY: 8 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                isActive ? 'bg-primary text-primary-foreground shadow-soft' : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Icon className="w-4 h-4" />
              {t[cat.labelKey]}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Map View */}
      <AnimatePresence>
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, height: 0, rotateX: -15 }}
            animate={{ opacity: 1, height: 256, rotateX: 0 }}
            exit={{ opacity: 0, height: 0, rotateX: 15 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="rounded-xl overflow-hidden border"
            style={{ perspective: 800 }}
          >
            <ShopMap shops={filteredShops} userLocation={userLocation} onShopSelect={onShopSelect} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shops List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <Loader2 className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      ) : error ? (
        <div className="text-center py-12"><p className="text-destructive">{t.error}</p></div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredShops.map((shop, i) => (
              <ShopCardWithDistance key={shop.id} shop={shop} onClick={() => onShopSelect(shop)} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && !error && filteredShops.length === 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
          <p className="text-muted-foreground">{shops.length === 0 ? t.noShopsAvailable : t.noShopsFound}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const ShopCardWithDistance = ({ shop, onClick, index }: { shop: ShopWithDistance; onClick: () => void; index: number }) => (
  <div className="relative">
    <ShopCard shop={shop} onClick={onClick} index={index} />
    {shop.distance !== undefined && (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
        className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-muted-foreground"
        style={{ transform: "translateZ(40px)" }}
      >
        {shop.distance < 1 ? `${Math.round(shop.distance * 1000)}m away` : `${shop.distance.toFixed(1)} km away`}
      </motion.div>
    )}
  </div>
);
