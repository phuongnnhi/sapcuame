import express from 'express';
import productRoutes from './product.api'; 
import userRoutes from './user.api';
import cartRoutes from './cart.api';
import orderRoutes from './order.api';
import ratingRoutes from './rating.api';
import authRoutes from './auth.api';

const router = express.Router();

// Use Product Routes
router.use('/product', productRoutes);
router.use('/user', userRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/rating', ratingRoutes);
router.use('/auth', authRoutes);

export default router;