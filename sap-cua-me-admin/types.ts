export interface Product {
    _id: string;
    name: string;
    description: string;
    image?: string;
    productType: string;
    brand: string;
    category: string[];
    tags: string[];
    price: number;
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductResponse {
    products: Product[];
    total: number;
}

export interface Order {
    _id: string;
    userId: string;
    createdAt: string | Date;  // Allow both Date and string
    status: 
        | 'Mới tạo'
        | 'Chờ xác nhận'
        | 'Đã xác nhận'
        | 'Đang chuẩn bị hàng'
        | 'Đang giao hàng'
        | 'Đã giao hàng'
        | 'Đã hoàn thành'
        | 'Đã hủy'
        | 'Hoàn trả'
        | 'Đã hoàn tiền';
    totalCost: number;
}

export interface OrderResponse {
    ordersWithProducts: Order[];
    page: number;
    limit: number;
    total: number;
}