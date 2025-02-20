import { Request, Response } from 'express';
import Product from "../../models/Product";

export const getFeaturedProducts = async (req: Request, res: Response) => {
    try {
      const featuredProducts = await Product.find({ isFeatured: true, isDeleted: false });
      res.status(200).json(featuredProducts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch featured products' });
    }
  };