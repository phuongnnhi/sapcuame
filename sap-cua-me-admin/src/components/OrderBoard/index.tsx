import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem, Button, Typography, Container } from '@mui/material';
import { Order, Props, statusOptions } from './types';
import { updateOrderStatus } from '../../app/apiFunctions';




const OrderBoard: React.FC<Props> = ({ orders }) => {
    const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            alert(`Order ${orderId} updated to ${newStatus}`);
        } catch (error) {
            console.error('Failed to update order:', error);
            alert('Failed to update order status.');
        }
    };

    return (
        <Container>
                        <Typography variant="h4" gutterBottom>
                Đơn hàng
            </Typography>
        
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Mã đơn</TableCell>
                    <TableCell>Mã người dùng</TableCell>
                    <TableCell>Thời gian tạo</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Tổng giá tiền</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order._id}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{order.userId._id}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Select
                                value={order.status}
                                onChange={(e) => handleUpdateStatus(order._id, e.target.value as Order['status'])}
                                variant="outlined"
                                size="small"
                            >
                                {statusOptions.map(status => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </TableCell>
                        <TableCell>{order.totalCost.toLocaleString()} VND</TableCell>
                        <TableCell>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleUpdateStatus(order._id, order.status)}
                            >
                                Update
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </Container>
    );
};

export default OrderBoard;