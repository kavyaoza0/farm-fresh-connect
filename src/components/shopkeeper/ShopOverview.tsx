import { useState } from 'react';
import { Shop } from '@/types';
import { useUpdateShop } from '@/hooks/useShopkeeper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Store, 
  MapPin, 
  Clock, 
  Star, 
  Package, 
  ShoppingBag,
  Edit,
  CheckCircle2,
} from 'lucide-react';

interface ShopOverviewProps {
  shop: Shop;
  productsCount: number;
  ordersCount: number;
}

export function ShopOverview({ shop, productsCount, ordersCount }: ShopOverviewProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: shop.name,
    description: shop.description,
    opening_time: shop.openingTime,
    closing_time: shop.closingTime,
  });

  const updateShop = useUpdateShop();

  const handleToggleOpen = () => {
    updateShop.mutate({
      shopId: shop.id,
      updates: { is_open: !shop.isOpen },
    });
  };

  const handleSaveEdit = () => {
    updateShop.mutate({
      shopId: shop.id,
      updates: editForm,
    });
    setIsEditOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Shop Status Card */}
      <Card className="overflow-hidden">
        <div 
          className="h-32 bg-cover bg-center relative"
          style={{ 
            backgroundImage: shop.image 
              ? `url(${shop.image})` 
              : 'linear-gradient(135deg, hsl(var(--shopkeeper)) 0%, hsl(var(--accent)) 100%)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">{shop.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{shop.location.city || 'No location set'}</span>
              </div>
            </div>
            {shop.isVerified && (
              <Badge variant="secondary" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Shop Status</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={shop.isOpen ? 'text-success' : 'text-destructive'}>
                {shop.isOpen ? 'Open' : 'Closed'}
              </span>
              <Switch 
                checked={shop.isOpen} 
                onCheckedChange={handleToggleOpen}
                disabled={updateShop.isPending}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{productsCount}</p>
              <p className="text-xs text-muted-foreground">Products</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-shopkeeper/10 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-shopkeeper" />
            </div>
            <div>
              <p className="text-2xl font-bold">{ordersCount}</p>
              <p className="text-xs text-muted-foreground">Active Orders</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{shop.rating.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">{shop.reviewCount} reviews</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">{shop.openingTime}</p>
              <p className="text-xs text-muted-foreground">to {shop.closingTime}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">About</CardTitle>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Shop Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Shop Name</Label>
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="opening">Opening Time</Label>
                      <Input
                        id="opening"
                        type="time"
                        value={editForm.opening_time}
                        onChange={(e) => setEditForm({ ...editForm, opening_time: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closing">Closing Time</Label>
                      <Input
                        id="closing"
                        type="time"
                        value={editForm.closing_time}
                        onChange={(e) => setEditForm({ ...editForm, closing_time: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleSaveEdit} 
                    className="w-full"
                    disabled={updateShop.isPending}
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {shop.description || 'No description added yet.'}
          </p>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {shop.location.address ? (
              <>
                {shop.location.address}
                {shop.location.city && `, ${shop.location.city}`}
                {shop.location.state && `, ${shop.location.state}`}
                {shop.location.pincode && ` - ${shop.location.pincode}`}
              </>
            ) : (
              'No address set'
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
