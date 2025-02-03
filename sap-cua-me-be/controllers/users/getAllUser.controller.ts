import { Request, Response } from 'express';
import User from '../../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, '-passwordHash'); // Exclude password hash for security
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};