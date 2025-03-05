import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/jwtUtils";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
     res.status(400).json({ message: "Refresh token is required" });
     return;
    }

    const secretKey = process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ message: "Invalid or expired refresh token" });
        return;
      }

      const newAccessToken = generateToken(decoded.id);
     res.status(200).json({ accessToken: newAccessToken });
     return;
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Server error" });
  }
};