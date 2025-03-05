// type User1 = {
//     _id: string;
// }

export interface Order {
    _id: string;
    userId: string 
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