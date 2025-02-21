import { Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwtUtils";
import jwt from "jsonwebtoken";
import { CustomRequest } from "..";

//Register a new user
export const registerUser = async (req: CustomRequest, res: Response) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Ensure either email or phone is provided
    if (!email && !phone) {
      res.status(400).json({ message: "Email or phone is required" });
      return;
    }

    //check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      res
        .status(400)
        .json({
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
      role,
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
      throw new Error("Invalid email/phone or password");
    }

    //Verify the password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email/phone or password");
    }

    // Generate a token
    const token = generateToken(user._id.toString());

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Log out the current user
export const logoutUser = async (req: CustomRequest, res: Response) => {
  try {
    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Forgot password
export const forgotPassword = async (req: CustomRequest, res: Response) => {
  try {
    const { email, phone } = req.body;
    // Ensure either email or phone is provided
    if (!email && !phone) {
      res.status(400).json({ message: "Email or phone is required" });
      return;
    }

    // Find the user by email or phone
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Generate a password reset token
    const secretKey = process.env.JWT_SECRET || "fallbackkey";
    const resetToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "15m", // Token valid for 15 minutes
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send the reset link via email or SMS (mocked for now)
    if (email) {
      console.log(`Password reset link sent to email: ${resetLink}`);
    } else if (phone) {
      console.log(`Password reset link sent via SMS to phone: ${resetLink}`);
    }

    res.status(200).json({
      message: "Password reset link sent (mocked for now)",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//reset password
export const resetPassword = async (req: CustomRequest, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    // Ensure token and new password are provided
    if (!token || !newPassword) {
      res.status(400).json({ message: "Token and new password are required" });
      return;
    }

    // Verify the reset token
    const secretKey = process.env.JWT_SECRET || "fallbackkey";
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secretKey) as { id: string };
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    // Find the user
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
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
