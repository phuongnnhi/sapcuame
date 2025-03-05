import { Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { generateRefreshToken, generateToken } from "../../utils/jwtUtils";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../..";

//Register a new user
export const registerUser = async (req: CustomRequest, res: Response) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Ensure either email or phone is provided
    if (!email || !phone) {
      res.status(400).json({ message: "Email or phone is required" });
      return;
    }

    //check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists with this email or phone number",
      });
      return;
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create and save user
    const user = new User({
      name,
      email,
      phone,
      address,
      role: "user",
      passwordHash: hashedPassword,
    });
    await user.save();

    //Generate a token
    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Log in a user
export const loginUser = async (req: CustomRequest, res: Response) => {
  try {
    const { email, phone, password } = req.body;

    // Ensure either email or phone is provided
    if (!email && !phone) {
      res.status(400).json({ message: "Email or phone is required" });
      return;
    }

    //check if the user exsits
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
     res
        .status(400)
        .json({ message: "Invalid email/phone or password" });
        return
    }

    //Verify the password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res
        .status(400)
        .json({ message: "Invalid email/phone or password" });
        return;
    }

    // Generate a token
    const token = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

   res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Log out the current user
export const logoutUser = async (req: CustomRequest, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken || req.headers["x-refresh-token"];
    if (!refreshToken) {
       res.status(400).json({ message: "Refresh token is required" });
       return
    }

    // Remove refresh token from the database (if stored)
    await refreshToken.findOneAndDelete({ token: refreshToken });

    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get logged in user details
export const getLoggedInUserDetails = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const user = req.user; // Populated by authenticateUser middleware
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
