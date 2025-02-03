import express from 'express';


import { getProducts } from '../controllers/products/getProduct.controller';
import { getProductById } from '../controllers/products/getProductById.controller';
// import { isAdmin } from '../middleware/role';

// import { authenticateUser } from '../middleware/authMiddleware';
import { addProduct } from '../controllers/products/addProduct.controller';
import { updateProduct } from '../controllers/products/updateProduct.controller';
import { deleteProduct } from '../controllers/products/deleteProduct.controller';
import { validateMiddleware } from '../middleware/validator';
import { idSchema } from '../schemas/products/idSchema';
import { createProductSchema } from '../schemas/products/createProduct.schema';
import { updateProductSchema } from '../schemas/products/updateProduct.schema';

const router = express.Router();

/**
 * @route GET api/product
 * @description Get a list of all products with search, filter, and pagination
 * @query ?q=keyword&category=categoryName&brand=brandName&page=1&limit=10
 * @access Public
 */
router.get('/', getProducts);

/**
 * @route GET api/product/:id
 * @description Get detailed information about a specific product
 * @access Public
 */
router.get('/:id', validateMiddleware(idSchema, 'params'), getProductById);
/**
 * @route POST api/admin/products
 * @description Add a new product
 * @access Admin
 */
router.post('/', validateMiddleware(createProductSchema, 'body'), addProduct);

/**
 * @route PUT api/admin/products/:id
 * @description Update an existing product
 * @access Admin
 */
router.put('/:id', validateMiddleware(idSchema, 'params'), validateMiddleware(updateProductSchema, 'body'), updateProduct);

/**
 * @route DELETE api/admin/products/:id
 * @description Delete a product
 * @access Admin
 */
router.delete('/:id', validateMiddleware(idSchema, 'params'), deleteProduct);
export default router;