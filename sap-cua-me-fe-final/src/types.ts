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

// export interface Order {
//     _id: string;
//     userId: string;
//     createdAt: string | Date;  // Allow both Date and string
//     status: 
//         | 'Mới tạo'
//         | 'Chờ xác nhận'
//         | 'Đã xác nhận'
//         | 'Đang chuẩn bị hàng'
//         | 'Đang giao hàng'
//         | 'Đã giao hàng'
//         | 'Đã hoàn thành'
//         | 'Đã hủy'
//         | 'Hoàn trả'
//         | 'Đã hoàn tiền';
//     totalCost: number;
// }

// export interface OrderResponse {
//     ordersWithProducts: Order[];
//     page: number;
//     limit: number;
//     total: number;
// }