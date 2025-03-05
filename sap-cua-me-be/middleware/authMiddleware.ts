import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { CustomRequest } from "..";

export const authenticateUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return
        }

        const token = authHeader.split(" ")[1];
        const secretKey = process.env.JWT_SECRET || "fallbackkey";

        try {
            // Verify the token
            const decoded = jwt.verify(token, secretKey) as { id: string };

            // Fetch the user from the database
            const user: IUser | null = await User.findById(decoded.id).select("-passwordHash");
            if (!user) {
                 res.status(404).json({ message: "User not found" });
                 return
            }

            // Attach the user to the request object
            req.user = user;
            next();
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                 res.status(401).json({ message: "Token expired, please refresh" });
                 return
            }
             res.status(401).json({ message: "Unauthorized: Invalid token" });
             return
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};