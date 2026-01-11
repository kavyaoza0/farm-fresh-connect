import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type FarmerProduce = Database['public']['Tables']['farmer_produce']['Row'];
type BulkOrderRequest = Database['public']['Tables']['bulk_order_requests']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

export interface ProduceWithProduct extends FarmerProduce {
  product: Product;
}

export interface BulkOrderWithDetails extends BulkOrderRequest {
  produce: ProduceWithProduct;
  shopkeeper_profile?: {
    name: string;
    phone: string | null;
  };
}

// Fetch farmer's produce
export function useMyProduce() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['my-produce', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('farmer_produce')
        .select(`
          *,
          product:products(*)
        `)
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProduceWithProduct[];
    },
    enabled: !!user?.id,
  });
}

// Add new produce
export function useAddProduce() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (produce: {
      product_id: string;
      price_per_kg: number;
      available_quantity: number;
      harvest_date?: string;
      is_organic?: boolean;
    }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('farmer_produce')
        .insert({
          farmer_id: user.id,
          product_id: produce.product_id,
          price_per_kg: produce.price_per_kg,
          available_quantity: produce.available_quantity,
          harvest_date: produce.harvest_date,
          is_organic: produce.is_organic ?? false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-produce'] });
      toast.success('Produce added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add produce: ' + error.message);
    },
  });
}

// Update produce
export function useUpdateProduce() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string;
      price_per_kg?: number;
      available_quantity?: number;
      harvest_date?: string;
      is_organic?: boolean;
      is_available?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('farmer_produce')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-produce'] });
      toast.success('Produce updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update produce: ' + error.message);
    },
  });
}

// Remove produce
export function useRemoveProduce() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('farmer_produce')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-produce'] });
      toast.success('Produce removed successfully');
    },
    onError: (error) => {
      toast.error('Failed to remove produce: ' + error.message);
    },
  });
}

// Fetch bulk order requests for farmer
export function useBulkOrderRequests() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['bulk-order-requests', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('bulk_order_requests')
        .select(`
          *,
          produce:farmer_produce(
            *,
            product:products(*)
          )
        `)
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch shopkeeper profiles separately
      const shopkeeperIds = [...new Set(data.map(r => r.shopkeeper_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, phone')
        .in('id', shopkeeperIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      return data.map(request => ({
        ...request,
        shopkeeper_profile: profileMap.get(request.shopkeeper_id),
      })) as BulkOrderWithDetails[];
    },
    enabled: !!user?.id,
  });
}

// Update bulk order status
export function useUpdateBulkOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: 'accepted' | 'rejected' | 'completed';
    }) => {
      const { data, error } = await supabase
        .from('bulk_order_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bulk-order-requests'] });
      toast.success('Order status updated');
    },
    onError: (error) => {
      toast.error('Failed to update status: ' + error.message);
    },
  });
}

// Fetch all products for selection
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    },
  });
}
