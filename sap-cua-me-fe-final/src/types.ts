export interface Variety {
    name: string;
    price: number;
  }
  
export interface Product {
    _id: string;
    name: string;
    description: string;
    images?: string[];
    productType: string;
    brand: string;
    colors?: string[];
    category: string[];
    tags?: string[];
    size:string[];
    varieties:Variety[];
    price: number;
    isAvailable: boolean;
    isFeatured: boolean;
    bestSeller: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductResponse {
    products: Product[];
    total: number;
}

export interface ProductCart {
    _id: string;
    productId: Product; // Populate with full product details
    cartId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Cart {
    _id: string;
    userId: string;
    productCarts: ProductCart[];
    addedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductOrder {
    _id: string;
    orderId: string; // eferences the Order ID
    productId: Product; // References the full Product details
    quantity: number;
}

export interface Order {
    _id: string;
    userId: string;
    totalCost: number;
    status:
      | "Mới tạo"
      | "Chờ xác nhận"
      | "Đã xác nhận"
      | "Đang chuẩn bị hàng"
      | "Đang giao hàng"
      | "Đã giao hàng"
      | "Đã hoàn thành"
      | "Đã hủy"
      | "Hoàn trả"
      | "Đã hoàn tiền";
    productOrders?: ProductOrder[];
    createdAt: string;
}

export interface OrderResponse {
    orders: Order[];
    totalOrders: number;  
    totalPages: number;  
    currentPage: number;  
}

export interface ProductOrderResponse {
    productOrders: ProductOrder[];
}