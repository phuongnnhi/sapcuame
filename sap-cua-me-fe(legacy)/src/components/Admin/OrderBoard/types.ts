type User1 = {
    _id: string;
}

// type User2 = {
//     _id: string;
//     age: number;
//     [key: string]: string | number | string[];
// };

// type User3 = Record<string,string | number | string[]>;

export interface Order {
    _id: string;
    userId: User1; 
    createdAt: string | Date;
    status: 'Mới tạo' | 'Chờ xác nhận' | 'Đã xác nhận' | 'Đang chuẩn bị hàng' | 'Đang giao hàng' | 'Đã giao hàng' | 'Đã hoàn thành' | 'Đã hủy' | 'Hoàn trả' | 'Đã hoàn tiền';
    totalCost: number;
}

export interface Props {
    orders: Order[];
}

export const statusOptions: Order['status'][] = [
    'Mới tạo',
    'Chờ xác nhận',
    'Đã xác nhận',
    'Đang chuẩn bị hàng',
    'Đang giao hàng',
    'Đã giao hàng',
    'Đã hoàn thành',
    'Đã hủy',
    'Hoàn trả',
    'Đã hoàn tiền',
];

export interface OrderResponse {
        ordersWithProducts: Order[];
        page: number;
        limit: number;
        total: number;
    }