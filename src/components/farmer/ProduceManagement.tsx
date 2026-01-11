import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Package, Pencil, Trash2, Leaf } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useMyProduce, useAddProduce, useUpdateProduce, useRemoveProduce, useProducts, type ProduceWithProduct } from '@/hooks/useFarmer';

export function ProduceManagement() {
  const { data: produce, isLoading } = useMyProduce();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduce, setEditingProduce] = useState<ProduceWithProduct | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Produce ({produce?.length || 0})</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Produce
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Produce</DialogTitle>
            </DialogHeader>
            <AddProduceForm onSuccess={() => setIsAddOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {produce && produce.length > 0 ? (
        <div className="space-y-3">
          {produce.map((item) => (
            <ProduceCard 
              key={item.id} 
              produce={item} 
              onEdit={() => setEditingProduce(item)}
            />
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">No produce yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              List your produce to receive bulk orders from shopkeepers
            </p>
            <Button onClick={() => setIsAddOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Your First Produce
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={!!editingProduce} onOpenChange={(open) => !open && setEditingProduce(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Produce</DialogTitle>
          </DialogHeader>
          {editingProduce && (
            <EditProduceForm 
              produce={editingProduce} 
              onSuccess={() => setEditingProduce(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProduceCard({ produce, onEdit }: { produce: ProduceWithProduct; onEdit: () => void }) {
  const removeProduce = useRemoveProduce();
  const updateProduce = useUpdateProduce();

  const handleToggleAvailability = () => {
    updateProduce.mutate({
      id: produce.id,
      is_available: !produce.is_available,
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {produce.product.image ? (
            <img 
              src={produce.product.image} 
              alt={produce.product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{produce.product.name}</h3>
                {produce.product.name_hindi && (
                  <p className="text-xs text-muted-foreground">{produce.product.name_hindi}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={produce.is_available ?? true}
                  onCheckedChange={handleToggleAvailability}
                  disabled={updateProduce.isPending}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="font-semibold text-primary">₹{produce.price_per_kg}/kg</span>
              <span className="text-muted-foreground">•</span>
              <span>{produce.available_quantity} kg available</span>
              {produce.is_organic && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> Organic
                  </span>
                </>
              )}
            </div>

            {produce.harvest_date && (
              <p className="text-xs text-muted-foreground mt-1">
                Harvested: {new Date(produce.harvest_date).toLocaleDateString()}
              </p>
            )}

            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Pencil className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive hover:text-destructive"
                onClick={() => removeProduce.mutate(produce.id)}
                disabled={removeProduce.isPending}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AddProduceForm({ onSuccess }: { onSuccess: () => void }) {
  const { data: products, isLoading } = useProducts();
  const addProduce = useAddProduce();

  const [productId, setProductId] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [quantity, setQuantity] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [isOrganic, setIsOrganic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addProduce.mutate({
      product_id: productId,
      price_per_kg: parseFloat(pricePerKg),
      available_quantity: parseFloat(quantity),
      harvest_date: harvestDate || undefined,
      is_organic: isOrganic,
    }, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Product</Label>
        <Select value={productId} onValueChange={setProductId} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <SelectItem value="loading" disabled>Loading...</SelectItem>
            ) : (
              products?.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} {product.name_hindi && `(${product.name_hindi})`}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Price per kg (₹)</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(e.target.value)}
            placeholder="40.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Available Quantity (kg)</Label>
          <Input
            type="number"
            step="0.1"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="100"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Harvest Date (optional)</Label>
        <Input
          type="date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch 
          id="organic" 
          checked={isOrganic} 
          onCheckedChange={setIsOrganic} 
        />
        <Label htmlFor="organic" className="flex items-center gap-1">
          <Leaf className="h-4 w-4 text-emerald-600" />
          Organic Produce
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={addProduce.isPending}>
        {addProduce.isPending ? 'Adding...' : 'Add Produce'}
      </Button>
    </form>
  );
}

function EditProduceForm({ produce, onSuccess }: { produce: ProduceWithProduct; onSuccess: () => void }) {
  const updateProduce = useUpdateProduce();

  const [pricePerKg, setPricePerKg] = useState(produce.price_per_kg.toString());
  const [quantity, setQuantity] = useState(produce.available_quantity.toString());
  const [harvestDate, setHarvestDate] = useState(produce.harvest_date || '');
  const [isOrganic, setIsOrganic] = useState(produce.is_organic ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProduce.mutate({
      id: produce.id,
      price_per_kg: parseFloat(pricePerKg),
      available_quantity: parseFloat(quantity),
      harvest_date: harvestDate || undefined,
      is_organic: isOrganic,
    }, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
        {produce.product.image ? (
          <img 
            src={produce.product.image} 
            alt={produce.product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center">
            <Package className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <div>
          <p className="font-medium">{produce.product.name}</p>
          {produce.product.name_hindi && (
            <p className="text-sm text-muted-foreground">{produce.product.name_hindi}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Price per kg (₹)</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Available Quantity (kg)</Label>
          <Input
            type="number"
            step="0.1"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Harvest Date</Label>
        <Input
          type="date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch 
          id="organic-edit" 
          checked={isOrganic} 
          onCheckedChange={setIsOrganic} 
        />
        <Label htmlFor="organic-edit" className="flex items-center gap-1">
          <Leaf className="h-4 w-4 text-emerald-600" />
          Organic Produce
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={updateProduce.isPending}>
        {updateProduce.isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
