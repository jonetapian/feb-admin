export interface Stock {
  id: string;
  productId: string;
  quantity: number;
  minStock: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string | null;
  barcode: string | null;
  costPrice: number;
  salePrice: number;
  unitsPerBox: number | null;
  supplierId: string | null;
  categoryId: string | null;
  createdAt: string;
  stock: Stock;
}

export interface CreateProductRequest {
  name: string;
  costPrice: number;
  salePrice: number;
  initialQuantity: number;
  minStock: number;
  sku?: string | null;
  barcode?: string | null;
  unitsPerBox?: number | null;
  supplierId?: string | null;
  categoryId?: string | null;
}

export interface Supplier {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  cnpj: string | null;
  createdAt: string;
  products?: Product[];
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  products?: Product[];
}

export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
}

export interface Sale {
  id: string;
  totalAmount: number;
  createdAt: string;
  saleItems: SaleItem[];
}

export interface CreateSaleRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
}

// Dashboard interfaces
export interface DashboardKPIs {
  totalRevenue: number;
  totalSales: number;
  totalItemsSold: number;
  averageTicket: number;
}

export interface SalesByDate {
  date: string;
  total: number;
  quantity: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
}

export interface SlowProduct {
  productId: string;
  productName: string;
  sku: string;
  salePrice: number;
}

export interface LowStockProduct {
  productId: string;
  productName: string;
  currentQuantity: number;
  minStock: number;
  status: 'LOW' | 'CRITICAL';
}

export interface ComparisonData {
  current: DashboardKPIs;
  previous: DashboardKPIs;
  growth: {
    revenueGrowth: number;
    salesGrowth: number;
    itemsGrowth: number;
  };
}
