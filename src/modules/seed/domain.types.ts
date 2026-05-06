export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: number;
  type: string;
  color: string;
  sku: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string;
  images: string[];
  basePrice: number;
  colors: string[];
  types: string[];
  tags: string[];
  isActive: boolean;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: number;
  variantId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  code: string;
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  paymentMethod: 'COD';
  status: 'pending' | 'confirmed' | 'delivering' | 'completed' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}
