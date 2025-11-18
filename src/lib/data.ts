import type { Category, Product, User, Order, Coupon, Address } from './types';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Fresh Vegetables' },
  { id: 'cat-2', name: 'Fresh Fruits' },
  { id: 'cat-3', name: 'Bakery' },
  { id: 'cat-4', name: 'Dairy & Eggs' },
  { id: 'cat-5', name: 'Pantry' },
];

export const products: Product[] = [
  { id: 'prod-1', name: 'Organic Carrots', description: 'A bunch of fresh, sweet organic carrots.', price: 2.99, category: categories[0], stock: 150, certifications: ['USDA Organic'], imageId: 'prod-1' },
  { id: 'prod-2', name: 'Organic Red Apple', description: 'Crisp and juicy organic red apple.', price: 0.99, category: categories[1], stock: 200, certifications: ['USDA Organic', 'Non-GMO Project Verified'], imageId: 'prod-2' },
  { id: 'prod-3', name: 'Sourdough Bread', description: 'Artisanal whole-grain sourdough loaf.', price: 5.49, category: categories[2], stock: 50, certifications: [], imageId: 'prod-3' },
  { id: 'prod-4', name: 'Free-Range Eggs', description: 'One dozen large brown free-range eggs.', price: 4.99, category: categories[3], stock: 100, certifications: ['USDA Organic', 'Fair Trade Certified'], imageId: 'prod-4' },
  { id: 'prod-5', name: 'Organic Broccoli', description: 'A large head of fresh organic broccoli.', price: 3.49, category: categories[0], stock: 80, certifications: ['USDA Organic'], imageId: 'prod-5' },
  { id: 'prod-6', name: 'Organic Whole Milk', description: 'A half-gallon of creamy organic whole milk.', price: 4.29, category: categories[3], stock: 70, certifications: ['USDA Organic'], imageId: 'prod-6' },
  { id: 'prod-7', name: 'Organic Bananas', description: 'A bunch of sweet, ripe organic bananas.', price: 1.99, category: categories[1], stock: 120, certifications: ['USDA Organic', 'Fair Trade Certified'], imageId: 'prod-7' },
  { id: 'prod-8', name: 'Artisanal Cheddar Cheese', description: 'A block of sharp, aged organic cheddar.', price: 8.99, category: categories[3], stock: 40, certifications: ['USDA Organic'], imageId: 'prod-8' },
  { id: 'prod-9', name: 'Organic Almonds', description: 'Raw, unsalted organic almonds.', price: 12.99, category: categories[4], stock: 60, certifications: ['USDA Organic', 'Non-GMO Project Verified'], imageId: 'prod-9' },
  { id: 'prod-10', name: 'Organic Honey', description: 'Pure, unfiltered organic honey.', price: 9.99, category: categories[4], stock: 90, certifications: ['USDA Organic'], imageId: 'prod-10' },
  { id: 'prod-11', name: 'Organic Spinach', description: 'A bag of fresh organic spinach leaves.', price: 3.99, category: categories[0], stock: 110, certifications: ['USDA Organic'], imageId: 'prod-11' },
  { id: 'prod-12', name: 'Organic Tomatoes', description: 'Vine-ripened organic tomatoes.', price: 4.49, category: categories[0], stock: 75, certifications: ['USDA Organic', 'Non-GMO Project Verified'], imageId: 'prod-12' },
];

const mockAddress: Address = {
  id: 'addr-1', street: '123 Green Way', city: 'Natureville', state: 'CA', zip: '90210', country: 'USA', isDefault: true
};

const mockUser: User = {
  id: 'user-1', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'customer', addresses: [mockAddress], orderHistory: [], avatarId: 'avatar-1'
};

const mockAdmin: User = {
  id: 'user-2', name: 'Admin', email: 'admin@greenbasket.com', role: 'admin', addresses: [], orderHistory: [], avatarId: 'avatar-2'
};

export const users: User[] = [mockUser, mockAdmin];

export const orders: Order[] = [
  { id: 'order-1', user: mockUser, items: [{ product: products[0], quantity: 2, price: 2.99 }, { product: products[2], quantity: 1, price: 5.49 }], total: 11.47, status: 'Delivered', shippingAddress: mockAddress, orderDate: new Date('2023-10-15') },
  { id: 'order-2', user: mockUser, items: [{ product: products[4], quantity: 1, price: 3.49 }, { product: products[5], quantity: 1, price: 4.29 }], total: 7.78, status: 'Shipped', shippingAddress: mockAddress, orderDate: new Date('2023-10-28') },
  { id: 'order-3', user: mockAdmin, items: [{ product: products[1], quantity: 5, price: 0.99 }], total: 4.95, status: 'Delivered', shippingAddress: mockAddress, orderDate: new Date('2023-10-20') },
];

mockUser.orderHistory = orders.filter(o => o.user.id === mockUser.id);
mockAdmin.orderHistory = orders.filter(o => o.user.id === mockAdmin.id);

export const coupons: Coupon[] = [
  { id: 'coupon-1', code: 'FRESH10', discount: 10, expiryDate: new Date('2024-12-31'), isActive: true },
  { id: 'coupon-2', code: 'ORGANIC20', discount: 20, expiryDate: new Date('2024-10-31'), isActive: true },
  { id: 'coupon-3', code: 'EXPIRED5', discount: 5, expiryDate: new Date('2023-01-01'), isActive: false },
];
