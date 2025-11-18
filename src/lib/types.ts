export type Category = {
  id: string;
  name: string;
};

export type Certification = 'USDA Organic' | 'Non-GMO Project Verified' | 'Fair Trade Certified';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
  certifications: Certification[];
  imageId: string;
  rating?: number;
  reviewsCount?: number;
};

export type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  orderHistory: Order[];
  avatarId: string;
};

export type OrderItem = {
  product: Product;
  quantity: number;
  price: number;
};

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type Order = {
  id: string;
  user: User;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  orderDate: Date;
  deliverySlot?: string;
};

export type Coupon = {
  id: string;
  code: string;
  discount: number; // percentage
  expiryDate: Date;
  isActive: boolean;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageId: string;
};

export type SliderContent = {
    id: string;
    imageId: string;
    headline: string;
    description: string;
    buttonText: string;
    buttonLink: string;
};
