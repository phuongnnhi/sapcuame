import express from 'express';

import { authenticateUser } from '../middleware/authMiddleware';
import { submitReview } from '../controllers/ratings/submitReview.controller';
import { getReviewsForProduct } from '../controllers/ratings/getReviewByProduct.controller';
import { getReviewsByUser } from '../controllers/ratings/getReviewByUser.controller';
import { editReview } from '../controllers/ratings/editReview.controller';
import { deleteReview } from '../controllers/ratings/deleteReview.controller';
import { validateMiddleware } from '../middleware/validator';
import { submitReviewSchema } from '../schemas/ratings/submitReview.schema';
import { idSchema } from '../schemas/products/idSchema';
import { editReviewSchema } from '../schemas/ratings/editReview.schema';

const router = express.Router();

/**
 * @route POST api/review
 * @description Submit a review for a product
 * @body { productId, star, review }
 * @access Private
 */
router.post('/', authenticateUser, validateMiddleware(submitReviewSchema, 'body'),submitReview);

/**
 * @route GET api/review/:productId
 * @description Get all reviews for a specific product
 * @access Public
 */
router.get('/:productId', validateMiddleware(idSchema, 'params'), getReviewsForProduct);

/**
 * @route GET api/review/user/:userId
 * @description Get all reviews written by a specific user
 * @access Public
 */
router.get('/user/:userId',validateMiddleware(idSchema, 'params'), getReviewsByUser);

/**
 * @route PUT api/review/:id
 * @description Edit a review
 * @body { star, review }
 * @access Private
 */
router.put('/:id', authenticateUser, validateMiddleware(idSchema, 'params'), validateMiddleware(editReviewSchema, 'body'), editReview);

/**
 * @route DELETE api/review/:id
 * @description Soft delete a review
 * @access Private
 */
router.delete('/:id', authenticateUser,validateMiddleware(idSchema, 'params'), deleteReview);

export default router;