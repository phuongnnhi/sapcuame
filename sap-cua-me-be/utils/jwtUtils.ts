import jwt from "jsonwebtoken";

// Utility function to generate JWT
export const generateToken = (id: string) => {
  const secretKey = process.env.JWT_SECRET || "fallbackkey";
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  return jwt.sign({ id }, secretKey, { expiresIn });
};