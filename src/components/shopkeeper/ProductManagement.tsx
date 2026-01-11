import { useState } from 'react';
import { ShopProduct, Product } from '@/types';
import { 
  useAllProducts, 
  useAddShopProduct, 
  useUpdateShopProduct,
  useRemoveShopProduct 
} from '@/hooks/useShopkeeper';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Package, IndianRupee } from 'lucide-react';

interface ProductManagementProps {
  shopId: string;
  products: ShopProduct[];
  isLoading: boolean;
}

export function ProductManagement({ shopId, products, isLoading }: ProductManagementProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<ShopProduct | null>(null);

  const { data: allProducts = [] } = useAllProducts();
  const addProduct = useAddShopProduct();
  const updateProduct = useUpdateShopProduct();
  const removeProduct = useRemoveShopProduct();

  // Filter out products already in shop
  const availableProducts = allProducts.filter(
    (p) => !products.some((sp) => sp.productId === p.id)
  );

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-sm text-muted-foreground">{products.length} items in your shop</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product to Shop</DialogTitle>
            </DialogHeader>
            <AddProductForm
              products={availableProducts}
              shopId={shopId}
              onAdd={(data) => {
                addProduct.mutate(data);
                setIsAddOpen(false);
              }}
              isLoading={addProduct.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Products List */}
      {products.length === 0 ? (
        <Card className="p-8 text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium mb-1">No products yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add products to start selling
          </p>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add First Product
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => setEditingProduct(product)}
              onDelete={() => setDeleteProduct(product)}
              onToggleAvailable={(isAvailable) => {
                updateProduct.mutate({ id: product.id, isAvailable });
              }}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <EditProductForm
              product={editingProduct}
              onSave={(data) => {
                updateProduct.mutate({ id: editingProduct.id, ...data });
                setEditingProduct(null);
              }}
              isLoading={updateProduct.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove "{deleteProduct?.product.name}" from your shop. 
              You can add it again later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteProduct) {
                  removeProduct.mutate(deleteProduct.id);
                  setDeleteProduct(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  onEdit,
  onDelete,
  onToggleAvailable,
}: {
  product: ShopProduct;
  onEdit: () => void;
  onDelete: () => void;
  onToggleAvailable: (isAvailable: boolean) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex gap-3 p-3">
          <img
            src={product.product.image || '/placeholder.svg'}
            alt={product.product.name}
            className="w-16 h-16 rounded-lg object-cover bg-muted"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium truncate">{product.product.name}</h3>
                {product.product.nameHindi && (
                  <p className="text-xs text-muted-foreground">{product.product.nameHindi}</p>
                )}
              </div>
              <Badge variant={product.isAvailable ? 'default' : 'secondary'}>
                {product.isAvailable ? 'Active' : 'Hidden'}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm font-semibold flex items-center">
                <IndianRupee className="w-3 h-3" />
                {product.price}/{product.product.unit}
              </span>
              <span className="text-xs text-muted-foreground">
                Stock: {product.stock}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t px-3 py-2 bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Available</span>
            <Switch
              checked={product.isAvailable}
              onCheckedChange={onToggleAvailable}
            />
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Add Product Form
function AddProductForm({
  products,
  shopId,
  onAdd,
  isLoading,
}: {
  products: Product[];
  shopId: string;
  onAdd: (data: { shopId: string; productId: string; price: number; stock: number }) => void;
  isLoading: boolean;
}) {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !price) return;
    
    onAdd({
      shopId,
      productId: selectedProduct,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Select Product</Label>
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name} {p.nameHindi && `(${p.nameHindi})`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            step="0.5"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !selectedProduct}>
        {isLoading ? 'Adding...' : 'Add Product'}
      </Button>
    </form>
  );
}

// Edit Product Form
function EditProductForm({
  product,
  onSave,
  isLoading,
}: {
  product: ShopProduct;
  onSave: (data: { price: number; stock: number }) => void;
  isLoading: boolean;
}) {
  const [price, setPrice] = useState(product.price.toString());
  const [stock, setStock] = useState(product.stock.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
        <img
          src={product.product.image || '/placeholder.svg'}
          alt={product.product.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <h4 className="font-medium">{product.product.name}</h4>
          <p className="text-xs text-muted-foreground">per {product.product.unit}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="edit-price">Price (₹)</Label>
          <Input
            id="edit-price"
            type="number"
            step="0.5"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-stock">Stock</Label>
          <Input
            id="edit-stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
