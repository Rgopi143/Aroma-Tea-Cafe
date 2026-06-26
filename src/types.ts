export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  tags?: string[];
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface SnackOption {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  quantity: number;
  sweetness: 'Normal' | 'Less' | 'No Sugar' | 'Bellam (Jaggery)';
  temperature: 'Hot' | 'Iced' | 'Normal';
  selectedSnack?: SnackOption;
}

export type OrderStatus = 'Received' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface CafeOrder {
  id: string;
  tokenNumber: number;
  items: CartItem[];
  subtotal: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  orderType: 'Pickup' | 'Local Delivery';
  status: OrderStatus;
  createdAt: string;
  notes?: string;
  rejectionReason?: string;
  adminNotes?: string;
  checkedItems?: Record<string, boolean>;
}

export interface CustomerSegment {
  name: string;
  icon: string;
  description: string;
  preferredDrinks: string[];
  averageSpend: string;
  timing: string;
}

export interface CafeInsight {
  metric: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}
