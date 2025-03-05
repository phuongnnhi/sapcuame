import express from "express";
import {
  registerUser,
  logoutUser,
  getLoggedInUserDetails,
  loginUser,
} from "../controllers/auth/auth.controllers";
import { authenticateUser } from "../middleware/authMiddleware";
import { refreshToken } from "../controllers/auth/refreshToken.controller";

const router = express.Router();

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", registerUser);

/**
 * @route POST api/auth/login
 * @description Log in a user
 * @access Public
 */
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

/**
 * @route POST api/auth/logout
 * @description Log out the current user
 * @access Private
 */
router.post("/logout", authenticateUser, logoutUser);

/**
 * @route GET api/auth/me
 * @description Get logged-in user's details
 * @access Private
 */
router.get("/me", authenticateUser, getLoggedInUserDetails);

export default router;
