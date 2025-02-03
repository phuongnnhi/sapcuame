import express from 'express';

import { authenticateUser } from '../middleware/authMiddleware';
import { getCart } from '../controllers/carts/getCart.controller';
import { addToCart } from '../controllers/carts/addToCart.controller';
import { updateCartItem } from '../controllers/carts/updateCartItem.controller';
import { removeCartItem } from '../controllers/carts/removeCartItem.controller';
import { validateMiddleware } from '../middleware/validator';
import { addToCartSchema } from '../schemas/carts/addToCart.schema';
import { idSchema } from '../schemas/products/idSchema';
import { updateCartItemSchema } from '../schemas/carts/updateCart.schema';

const router = express.Router();

/**
 * @route GET api/cart
 * @description Get the user's current cart
 * @access Private
 */
router.get('/', authenticateUser, getCart);

/**
 * @route POST api/cart
 * @description Add a product to the cart
 * @body { productId, quantity, color }
 * @access Private
 */
router.post('/', authenticateUser, validateMiddleware(addToCartSchema, 'body'), addToCart);

/**
 * @route PUT api/cart/:id
 * @description Update the quantity or remove a product in the cart
 * @body { quantity }
 * @access Private
 */
router.put(
    '/:id',
    authenticateUser,
    validateMiddleware(idSchema, 'params'),
    validateMiddleware(updateCartItemSchema, 'body'),
    updateCartItem
  );

/**
 * @route DELETE api/cart/:id
 * @description Remove a product from the cart
 * @access Private
 */
router.delete('/:id', authenticateUser, validateMiddleware(idSchema, 'params'), removeCartItem);

export default router;