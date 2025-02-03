import type { Response, NextFunction } from 'express';
import { CustomRequest } from '..';


export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    // Check if `user` is present in the request (added by authenticateUser middleware)
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: No user information available' });
      return;
    }
    req.user

    // Check if the user's role is "admin"
    if (req.user.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden: You do not have admin privileges' });
      return;
    }

    next(); // User is admin, proceed to the next middleware/controller
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};