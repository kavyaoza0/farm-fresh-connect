import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

// Admin hook to fetch all profiles
export function useAllProfiles() {
  const { userRole } = useAuth();

  return useQuery({
    queryKey: ['admin-all-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: userRole === 'admin',
  });
}

// Admin hook to fetch all user roles
export function useAllUserRoles() {
  const { userRole } = useAuth();

  return useQuery({
    queryKey: ['admin-all-user-roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: userRole === 'admin',
  });
}

// Admin hook to fetch all shops
export function useAllShops() {
  const { userRole } = useAuth();

  return useQuery({
    queryKey: ['admin-all-shops'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: userRole === 'admin',
  });
}

// Admin hook to fetch all orders
export function useAllOrders() {
  const { userRole } = useAuth();

  return useQuery({
    queryKey: ['admin-all-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: userRole === 'admin',
  });
}

// Admin hook to fetch all farmer produce
export function useAllFarmerProduce() {
  const { userRole } = useAuth();

  return useQuery({
    queryKey: ['admin-all-farmer-produce'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('farmer_produce')
        .select(`
          *,
          product:products(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: userRole === 'admin',
  });
}

// Admin hook to fetch all bulk order requests
export function useAllBulkOrderRequests() {
  const { userRole } = useAuth();

  return useQuery({
    queryKey: ['admin-all-bulk-order-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bulk_order_requests')
        .select(`
          *,
          produce:farmer_produce(
            *,
            product:products(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: userRole === 'admin',
  });
}

// Admin: verify/unverify a shop
export function useVerifyShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ shopId, verified }: { shopId: string; verified: boolean }) => {
      const { error } = await supabase
        .from('shops')
        .update({ is_verified: verified })
        .eq('id', shopId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-shops'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
}

// Admin statistics summary
export function useAdminStats() {
  const { userRole } = useAuth();

  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        profilesResult,
        shopsResult,
        ordersResult,
        produceResult,
        rolesResult,
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('shops').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('farmer_produce').select('id', { count: 'exact', head: true }),
        supabase.from('user_roles').select('role'),
      ]);

      const roles = rolesResult.data || [];
      const customerCount = roles.filter(r => r.role === 'customer').length;
      const shopkeeperCount = roles.filter(r => r.role === 'shopkeeper').length;
      const farmerCount = roles.filter(r => r.role === 'farmer').length;

      const [pendingShopsResult, pendingOrdersResult] = await Promise.all([
        supabase.from('shops').select('id', { count: 'exact', head: true }).eq('is_verified', false),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);

      return {
        totalUsers: profilesResult.count || 0,
        totalShops: shopsResult.count || 0,
        totalOrders: ordersResult.count || 0,
        totalProduce: produceResult.count || 0,
        customerCount,
        shopkeeperCount,
        farmerCount,
        pendingShopApprovals: pendingShopsResult.count || 0,
        pendingOrders: pendingOrdersResult.count || 0,
      };
    },
    enabled: userRole === 'admin',
  });
}
