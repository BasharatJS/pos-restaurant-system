export type TableStatus = 'available' | 'occupied' | 'reserved' | 'billing';

export interface Table {
  id: number;
  number: number;
  status: TableStatus;
  capacity: number;
  currentOrder?: Order;
}

export type MenuCategory = 'all' | 'food' | 'fast-food' | 'sweet' | 'chinese' | 'popular';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  image?: string;
  available: boolean;
  description?: string;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  total: number;
}

export interface Order {
  id: string;
  tableId: number;
  items: OrderItem[];
  status: 'active' | 'hold' | 'completed' | 'cancelled';
  total: number;
  createdAt: Date;
  updatedAt: Date;
  waiterId: string;
}