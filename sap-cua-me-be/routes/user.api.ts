import express from 'express';

import { authenticateUser } from '../middleware/authMiddleware';
import { getUserProfile } from '../controllers/users/getUserProfile.controller';
import { updateUserProfile } from '../controllers/users/updateUserProfile.controller';
import { getAllUsers } from '../controllers/users/getAllUser.controller';
import { isAdmin } from '../middleware/role';

const router = express.Router();

/**
 * @route GET api/user/profile
 * @description Get the user's profile information
 * @access Private
 */
router.get('/profile', authenticateUser, getUserProfile);

/**
 * @route PUT api/user/profile
 * @description Update the user's profile information (name, phone, address)
 * @access Private
 */
router.put('/profile', authenticateUser, updateUserProfile);

/**
 * @route GET api/user/all
 * @description Get all user profiles (Admin only)
 * @access Private (Admin only)
 */
router.get('/all', authenticateUser, isAdmin, getAllUsers);

export default router;