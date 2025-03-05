import express from 'express';
import { getProducts } from '../controllers/products/getProduct.controller';
import { getProductById } from '../controllers/products/getProductById.controller';
import { getFeaturedProducts } from '../controllers/products/getFeaturedProducts.controller';
import { getBestSellerProducts } from '../controllers/products/getBestSeller.controller';
import { addProduct } from '../controllers/products/addProduct.controller';
import { updateProduct } from '../controllers/products/updateProduct.controller';
import { deleteProduct } from '../controllers/products/deleteProduct.controller';
import { validateMiddleware } from '../middleware/validator';
import { idSchema } from '../schemas/products/idSchema';
import { createProductSchema } from '../schemas/products/createProduct.schema';
import { updateProductSchema } from '../schemas/products/updateProduct.schema';
import upload from '../middleware/uploadMiddleware'; 
import { isAdmin } from '../middleware/role';

const router = express.Router();

/**
 * @route GET api/product
 * @description Get a list of all products with search, filter, and pagination
 * @query ?q=keyword&category=categoryName&brand=brandName&page=1&limit=10
 * @access Public
 */
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts)
router.get('/bestseller', getBestSellerProducts)

/**
 * @route GET api/product/:id
 * @description Get detailed information about a specific product
 * @access Public
 */
router.get('/:id', validateMiddleware(idSchema, 'params'), getProductById);

/**
 * @route POST api/admin/products
 * @description Add a new product with image upload to Cloudinary
 * @access Admin
 */
router.post('/', upload.array('images', 5), validateMiddleware(createProductSchema, 'body'), addProduct);

/**
 * @route PUT api/admin/products/:id
 * @description Update an existing product with new image uploads to Cloudinary
 * @access Admin
 */
router.put('/:id', isAdmin, upload.array('images', 5), validateMiddleware(idSchema, 'params'), validateMiddleware(updateProductSchema, 'body'), updateProduct);

/**
 * @route DELETE api/admin/products/:id
 * @description Delete a product
 * @access Admin
 */
router.delete('/:id', isAdmin, validateMiddleware(idSchema, 'params'), deleteProduct);

export default router;