import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return;
        }

        const token = authHeader.split(" ")[1];

        // Verify the token
        const secretKey = process.env.JWT_SECRET || "fallbackkey";
        const decoded = jwt.verify(token, secretKey) as { id: string };

        // Fetch the user from the database
        const user: IUser | null = await User.findById(decoded.id).select('-passwordHash');

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};