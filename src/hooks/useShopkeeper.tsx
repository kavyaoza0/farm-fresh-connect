import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Shop, ShopProduct, Product, Order, OrderItem } from '@/types';
import { toast } from 'sonner';

interface DbShop {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  image: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  review_count: number | null;
  is_verified: boolean | null;
  is_open: boolean | null;
  opening_time: string | null;
  closing_time: string | null;
}

interface DbShopProduct {
  id: string;
  shop_id: string;
  product_id: string;
  price: number;
  stock: number | null;
  is_available: boolean | null;
  products: {
    id: string;
    name: string;
    name_hindi: string | null;
    category: string;
    description: string | null;
    image: string | null;
    unit: string;
    min_quantity: number | null;
  };
}

interface DbOrder {
  id: string;
  customer_id: string;
  shop_id: string;
  status: string | null;
  subtotal: number;
  total: number;
  pickup_time: string | null;
  payment_method: string | null;
  is_paid: boolean | null;
  created_at: string | null;
  profiles: {
    name: string;
    phone: string | null;
  } | null;
}

interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_per_unit: number;
  total: number;
  products: {
    id: string;
    name: string;
    name_hindi: string | null;
    image: string | null;
  };
}

// Fetch shopkeeper's own shop
export function useMyShop() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['my-shop', user?.id],
    queryFn: async (): Promise<Shop | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching shop:', error);
        throw error;
      }

      if (!data) return null;

      return {
        id: data.id,
        ownerId: data.owner_id,
        name: data.name,
        description: data.description || '',
        image: data.image || '',
        location: {
          latitude: data.latitude || 0,
          longitude: data.longitude || 0,
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
        },
        rating: data.rating || 0,
        reviewCount: data.review_count || 0,
        isVerified: data.is_verified || false,
        isOpen: data.is_open !== false,
        openingTime: data.opening_time || '08:00',
        closingTime: data.closing_time || '20:00',
        products: [],
      };
    },
    enabled: !!user,
  });
}

// Fetch shop products for shopkeeper's shop
export function useMyShopProducts(shopId: string | undefined) {
  return useQuery({
    queryKey: ['my-shop-products', shopId],
    queryFn: async (): Promise<ShopProduct[]> => {
      if (!shopId) return [];

      const { data, error } = await supabase
        .from('shop_products')
        .select(`
          *,
          products (*)
        `)
        .eq('shop_id', shopId);

      if (error) {
        console.error('Error fetching shop products:', error);
        throw error;
      }

      return (data as DbShopProduct[]).map((sp) => ({
        id: sp.id,
        productId: sp.product_id,
        shopId: sp.shop_id,
        price: sp.price,
        stock: sp.stock || 0,
        isAvailable: sp.is_available !== false,
        product: {
          id: sp.products.id,
          name: sp.products.name,
          nameHindi: sp.products.name_hindi || undefined,
          category: sp.products.category as any,
          description: sp.products.description || '',
          image: sp.products.image || '',
          unit: sp.products.unit as any,
          minQuantity: sp.products.min_quantity || 0.5,
        },
      }));
    },
    enabled: !!shopId,
  });
}

// Fetch all available products (master list)
export function useAllProducts() {
  return useQuery({
    queryKey: ['all-products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data.map((p) => ({
        id: p.id,
        name: p.name,
        nameHindi: p.name_hindi || undefined,
        category: p.category as any,
        description: p.description || '',
        image: p.image || '',
        unit: p.unit as any,
        minQuantity: p.min_quantity || 0.5,
      }));
    },
  });
}

// Fetch orders for shopkeeper's shop
export function useShopOrders(shopId: string | undefined) {
  return useQuery({
    queryKey: ['shop-orders', shopId],
    queryFn: async () => {
      if (!shopId) return [];

      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('shop_id', shopId)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw ordersError;
      }

      // Fetch order items for each order
      const orderIds = orders.map((o) => o.id);
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select(`
          *,
          products (id, name, name_hindi, image)
        `)
        .in('order_id', orderIds);

      if (itemsError) {
        console.error('Error fetching order items:', itemsError);
        throw itemsError;
      }

      // Group items by order
      const itemsByOrder = (orderItems as DbOrderItem[]).reduce((acc, item) => {
        if (!acc[item.order_id]) acc[item.order_id] = [];
        acc[item.order_id].push({
          id: item.id,
          productId: item.product_id,
          product: {
            id: item.products.id,
            name: item.products.name,
            nameHindi: item.products.name_hindi || undefined,
            category: 'vegetable' as any,
            description: '',
            image: item.products.image || '',
            unit: 'kg' as any,
            minQuantity: 0.5,
          },
          quantity: item.quantity,
          pricePerUnit: item.price_per_unit,
          total: item.total,
        });
        return acc;
      }, {} as Record<string, OrderItem[]>);

      return orders.map((o) => ({
        id: o.id,
        customerId: o.customer_id,
        customerName: 'Customer',
        customerPhone: '',
        shopId: o.shop_id,
        status: o.status as any,
        subtotal: o.subtotal,
        total: o.total,
        pickupTime: o.pickup_time ? new Date(o.pickup_time) : null,
        paymentMethod: o.payment_method as any,
        isPaid: o.is_paid || false,
        createdAt: o.created_at ? new Date(o.created_at) : new Date(),
        items: itemsByOrder[o.id] || [],
      }));
    },
    enabled: !!shopId,
  });
}

// Add product to shop
export function useAddShopProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      shopId,
      productId,
      price,
      stock,
    }: {
      shopId: string;
      productId: string;
      price: number;
      stock: number;
    }) => {
      const { data, error } = await supabase
        .from('shop_products')
        .insert({
          shop_id: shopId,
          product_id: productId,
          price,
          stock,
          is_available: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['my-shop-products', variables.shopId] });
      toast.success('Product added to shop');
    },
    onError: (error) => {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    },
  });
}

// Update shop product
export function useUpdateShopProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      price,
      stock,
      isAvailable,
    }: {
      id: string;
      price?: number;
      stock?: number;
      isAvailable?: boolean;
    }) => {
      const updates: Record<string, any> = {};
      if (price !== undefined) updates.price = price;
      if (stock !== undefined) updates.stock = stock;
      if (isAvailable !== undefined) updates.is_available = isAvailable;

      const { data, error } = await supabase
        .from('shop_products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-shop-products'] });
      toast.success('Product updated');
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    },
  });
}

// Remove product from shop
export function useRemoveShopProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('shop_products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-shop-products'] });
      toast.success('Product removed from shop');
    },
    onError: (error) => {
      console.error('Error removing product:', error);
      toast.error('Failed to remove product');
    },
  });
}

// Update order status
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'cancelled';
    }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop-orders'] });
      toast.success('Order status updated');
    },
    onError: (error) => {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    },
  });
}

// Update shop details
export function useUpdateShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      shopId,
      updates,
    }: {
      shopId: string;
      updates: {
        name?: string;
        description?: string;
        is_open?: boolean;
        opening_time?: string;
        closing_time?: string;
      };
    }) => {
      const { data, error } = await supabase
        .from('shops')
        .update(updates)
        .eq('id', shopId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-shop'] });
      toast.success('Shop updated');
    },
    onError: (error) => {
      console.error('Error updating shop:', error);
      toast.error('Failed to update shop');
    },
  });
}

// Create a new shop
export function useCreateShop() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (shopData: {
      name: string;
      description?: string;
      address?: string;
      city?: string;
      state?: string;
      pincode?: string;
    }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('shops')
        .insert({
          owner_id: user.id,
          name: shopData.name,
          description: shopData.description,
          address: shopData.address,
          city: shopData.city,
          state: shopData.state,
          pincode: shopData.pincode,
          is_open: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-shop'] });
      toast.success('Shop created successfully!');
    },
    onError: (error) => {
      console.error('Error creating shop:', error);
      toast.error('Failed to create shop');
    },
  });
}
