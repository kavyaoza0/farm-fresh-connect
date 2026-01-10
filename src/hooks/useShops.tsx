import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Shop, ShopProduct, Product, Location } from '@/types';

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

interface DbProduct {
  id: string;
  name: string;
  name_hindi: string | null;
  category: 'vegetable' | 'fruit' | 'leafy' | 'exotic';
  description: string | null;
  image: string | null;
  unit: 'kg' | 'dozen' | 'piece' | 'bundle';
  min_quantity: number | null;
}

interface DbShopProduct {
  id: string;
  product_id: string;
  shop_id: string;
  price: number;
  stock: number | null;
  is_available: boolean | null;
  products: DbProduct;
}

const mapDbShopToShop = (dbShop: DbShop, products: ShopProduct[] = []): Shop => {
  const location: Location = {
    latitude: dbShop.latitude ?? 0,
    longitude: dbShop.longitude ?? 0,
    address: dbShop.address ?? '',
    city: dbShop.city ?? '',
    state: dbShop.state ?? '',
    pincode: dbShop.pincode ?? '',
  };

  return {
    id: dbShop.id,
    ownerId: dbShop.owner_id,
    name: dbShop.name,
    description: dbShop.description ?? '',
    image: dbShop.image ?? '/placeholder.svg',
    location,
    rating: dbShop.rating ?? 0,
    reviewCount: dbShop.review_count ?? 0,
    isVerified: dbShop.is_verified ?? false,
    isOpen: dbShop.is_open ?? true,
    openingTime: dbShop.opening_time ?? '08:00',
    closingTime: dbShop.closing_time ?? '20:00',
    products,
  };
};

const mapDbProductToProduct = (dbProduct: DbProduct): Product => ({
  id: dbProduct.id,
  name: dbProduct.name,
  nameHindi: dbProduct.name_hindi ?? undefined,
  category: dbProduct.category,
  description: dbProduct.description ?? '',
  image: dbProduct.image ?? '/placeholder.svg',
  unit: dbProduct.unit,
  minQuantity: dbProduct.min_quantity ?? 1,
});

const mapDbShopProductToShopProduct = (dbShopProduct: DbShopProduct): ShopProduct => ({
  id: dbShopProduct.id,
  productId: dbShopProduct.product_id,
  product: mapDbProductToProduct(dbShopProduct.products),
  shopId: dbShopProduct.shop_id,
  price: dbShopProduct.price,
  stock: dbShopProduct.stock ?? 0,
  isAvailable: dbShopProduct.is_available ?? true,
});

export const useShops = () => {
  return useQuery({
    queryKey: ['shops'],
    queryFn: async (): Promise<Shop[]> => {
      const { data: shopsData, error: shopsError } = await supabase
        .from('shops')
        .select('*')
        .eq('is_open', true);

      if (shopsError) throw shopsError;

      const shops: Shop[] = (shopsData ?? []).map((shop) => 
        mapDbShopToShop(shop as DbShop)
      );

      return shops;
    },
  });
};

export const useShopWithProducts = (shopId: string) => {
  return useQuery({
    queryKey: ['shop', shopId],
    queryFn: async (): Promise<{ shop: Shop; products: ShopProduct[] } | null> => {
      // Fetch shop
      const { data: shopData, error: shopError } = await supabase
        .from('shops')
        .select('*')
        .eq('id', shopId)
        .maybeSingle();

      if (shopError) throw shopError;
      if (!shopData) return null;

      // Fetch shop products with product details
      const { data: productsData, error: productsError } = await supabase
        .from('shop_products')
        .select(`
          *,
          products (*)
        `)
        .eq('shop_id', shopId)
        .eq('is_available', true);

      if (productsError) throw productsError;

      const shopProducts: ShopProduct[] = (productsData ?? []).map((sp) =>
        mapDbShopProductToShopProduct(sp as DbShopProduct)
      );

      const shop = mapDbShopToShop(shopData as DbShop, shopProducts);

      return { shop, products: shopProducts };
    },
    enabled: !!shopId,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      return (data ?? []).map((product) => mapDbProductToProduct(product as DbProduct));
    },
  });
};
