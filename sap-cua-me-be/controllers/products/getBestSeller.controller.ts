import { Request, Response } from 'express';
import Product from "../../models/Product";

export const getBestSellerProducts = async (req: Request, res: Response) => {
    try {
      const bestSellerProducts = await Product.find({ bestSeller: true, isDeleted: false });
      res.status(200).json(bestSellerProducts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch best-seller products' });
    }
  };