import { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Shop } from '@/types';
import { shopProducts } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ShopDetailProps {
  shop: Shop;
  onBack: () => void;
  className?: string;
}

type Category = 'all' | 'vegetable' | 'fruit' | 'leafy';

const categories = [
  { id: 'all' as Category, label: 'All' },
  { id: 'vegetable' as Category, label: 'Vegetables' },
  { id: 'fruit' as Category, label: 'Fruits' },
  { id: 'leafy' as Category, label: 'Leafy' },
];

export const ShopDetail = ({ shop, onBack, className }: ShopDetailProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  
  const products = shopProducts.filter(sp => sp.shopId === shop.id);
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(sp => sp.product.category === selectedCategory);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header Image */}
      <div className="relative h-56">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Shop Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">{shop.name}</h1>
              <div className="flex items-center gap-3 text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span>{shop.rating}</span>
                  <span>({shop.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              shop.isOpen ? "bg-success" : "bg-muted text-muted-foreground"
            )}>
              {shop.isOpen ? 'Open' : 'Closed'}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Details */}
      <div className="p-4 bg-card border-b border-border">
        <p className="text-sm text-muted-foreground mb-3">{shop.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{shop.openingTime} - {shop.closingTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{shop.location.address}</span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="mt-3">
          <Phone className="w-4 h-4 mr-2" />
          Contact Shop
        </Button>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 pb-32">
        <h2 className="font-semibold text-foreground mb-4">
          Available Products ({filteredProducts.length})
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((sp) => (
            <ProductCard key={sp.id} shopProduct={sp} shop={shop} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};
