import jwt from "jsonwebtoken";

// Utility function to generate JWT
export const generateToken = (id: string) => {
  const secretKey = process.env.JWT_SECRET || "fallbackkey";
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";


  return jwt.sign({ id }, secretKey, { expiresIn });
};
export const generateRefreshToken = (userId: string) => {
  const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
};
