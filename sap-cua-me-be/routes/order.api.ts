import express from 'express';

import { authenticateUser } from '../middleware/authMiddleware';
import { createOrder } from '../controllers/orders/createOrder.controller';
import { getOrders } from '../controllers/orders/getOrder.controller';
import { getOrderById } from '../controllers/orders/getOrderById.controller';
import { cancelOrder } from '../controllers/orders/cancelOrder.controller';
import { isAdmin } from '../middleware/role';
import { getAllOrders } from '../controllers/orders/getAllOrder.controller';
import { updateOrderStatus } from '../controllers/orders/updateOrderStatus.controller';
import { validateMiddleware } from '../middleware/validator';
import { createOrderSchema } from '../schemas/orders/createOrder.schema';
import { idSchema } from '../schemas/products/idSchema';
import { updateOrderStatusSchema } from '../schemas/orders/updateOrderStatus.schema';

const router = express.Router();

// /api/orders

/**
 * @route POST api/order
 * @description Create a new order from selected products in the cart
 * @body { products: [{ productId, quantity }] }
 * @access Private
 */
router.post('/', authenticateUser, validateMiddleware(createOrderSchema, 'body'), createOrder);

/**
 * @route GET api/order
 * @description Get the list of all orders for the logged-in user
 * @access Private
 */
router.get('/', authenticateUser, getOrders);

// api/orders/:id

/**
 * api/oder/123
 * api/order/admin
 * api/order/admin123
 * @route GET api/order/:id
 * @description Get details of a specific order
 * @access Private
 */
router.get('/:id', authenticateUser, validateMiddleware(idSchema, 'params'), getOrderById);

/**
 * @route PUT api/order/:id/cancel
 * @description Cancel an order before it is shipped
 * @access Private
 */
router.put('/:id/cancel', authenticateUser, validateMiddleware(idSchema, 'params'), cancelOrder);

/**
 * @route GET api/order/admin
 * @description Get all orders
 * @access Admin
 */
router.get('/admin/all', getAllOrders);

/**
 * /api/order/admin/orders/:id/status
 * /api/orders/:id/status
 * @route PUT api/admin/orders/:id/status
 * @description Update the status of an order
 * @access Admin
 */
router.put(
    '/orders/:id/status',
    validateMiddleware(idSchema, 'params'),
    validateMiddleware(updateOrderStatusSchema, 'body'),
    updateOrderStatus
  );

export default router;