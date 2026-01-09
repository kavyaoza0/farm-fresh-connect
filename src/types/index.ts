// User roles
export type UserRole = 'customer' | 'shopkeeper' | 'farmer' | 'admin';

// User interface
export interface User {
  id: string;
  phone: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  location?: Location;
  createdAt: Date;
}

// Location
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// Product categories
export type ProductCategory = 'vegetable' | 'fruit' | 'leafy' | 'exotic';

// Product interface
export interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  category: ProductCategory;
  description: string;
  image: string;
  unit: 'kg' | 'dozen' | 'piece' | 'bundle';
  minQuantity: number;
}

// Shop product (product with shop-specific pricing)
export interface ShopProduct {
  id: string;
  productId: string;
  product: Product;
  shopId: string;
  price: number;
  stock: number;
  isAvailable: boolean;
}

// Shop interface
export interface Shop {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  image: string;
  location: Location;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
  products: ShopProduct[];
}

// Farmer produce
export interface FarmerProduce {
  id: string;
  farmerId: string;
  productId: string;
  product: Product;
  pricePerKg: number;
  availableQuantity: number;
  harvestDate: Date;
  isOrganic: boolean;
}

// Order status
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'picked_up' 
  | 'cancelled';

// Order item
export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

// Order
export interface Order {
  id: string;
  customerId: string;
  shopId: string;
  shop: Shop;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  total: number;
  pickupTime: Date;
  paymentMethod: 'upi' | 'cash';
  isPaid: boolean;
  createdAt: Date;
}

// Cart item
export interface CartItem {
  shopProductId: string;
  shopProduct: ShopProduct;
  quantity: number;
}

// Cart
export interface Cart {
  shopId: string;
  shop: Shop;
  items: CartItem[];
  total: number;
}

// Bulk order request (shopkeeper to farmer)
export interface BulkOrderRequest {
  id: string;
  shopkeeperId: string;
  farmerId: string;
  produceId: string;
  produce: FarmerProduce;
  requestedQuantity: number;
  offeredPrice: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
}
