import React, { useEffect, useState } from 'react';
import { getAllOrders} from '../app/apiFunctions';

import OrderBoard from '../components/OrderBoard';
import ProductList from '../components/ProductList';
import { Container, Stack, Typography } from '@mui/material';
import { Order } from '../components/OrderBoard/types';

const Dashboard: React.FC = () => {
    // Correctly typed state initialization
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                console.log('Fetched orders:', data);  // Debugging the response
                if (data && data.ordersWithProducts) { //data.orders
                    setOrders(data.ordersWithProducts);
                } else {
                    console.error('Unexpected response format:', data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <Stack spacing={4} alignItems="center">
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <OrderBoard orders={orders} />
            {orders.length === 0 && (
                <Typography>No orders available</Typography>
            )}
        </Container>
    
        <Container maxWidth="lg">
            <ProductList />
        </Container>
    </Stack>
    );
};

export default Dashboard;