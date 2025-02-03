import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getLoggedInUserDetails,
} from '../controllers/auth.controllers';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post('/register', registerUser);

/**
 * @route POST api/auth/login
 * @description Log in a user
 * @access Public
 */
router.post('/login', loginUser);

/**
 * @route POST api/auth/logout
 * @description Log out the current user
 * @access Private
 */
router.post('/logout', authenticateUser, logoutUser);

/**
 * @route POST api/auth/forgot-password
 * @description Send a password reset link to the user's email
 * @access Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route POST api/auth/reset-password
 * @description Reset password using the token
 * @access Public
 */
router.post('/reset-password', resetPassword);

/**
 * @route GET api/auth/me
 * @description Get logged-in user's details
 * @access Private
 */
router.get('/me', authenticateUser, getLoggedInUserDetails);

export default router;