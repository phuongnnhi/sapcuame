import { Request, Response } from 'express';
import Product from "../../models/Product";
import { preprocessText } from '../../constants/productCategories';

// Get all products with filters
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, tags, search, sortBy, page = 1, limit = 10 } = req.query;

    const query: any = { isDeleted: false };

    // Filter by category
    if (category) {
      query.category = { $in: Array.isArray(category) ? category : [category] }; // Single or multiple categories
    }

    // Filter by tags
    if (tags) {
      query.tags = { $in: Array.isArray(tags) ? tags : [tags] }; // Match any of the provided tags
    }
    //1. chiếc giầy 2. chiec giay

    // Search by name, productType, or brand
    if (search) {
      const normalizedSearch = preprocessText(search as string); // Normalize search query
      query.$or = [
        { name: { $regex: normalizedSearch, $options: 'i' } },
        { productType: { $regex: normalizedSearch, $options: 'i' } },
        { brand: { $regex: normalizedSearch, $options: 'i' } },
      ];
    }

    // Set sorting options
    const sort: any = {};
    if (sortBy === 'price') {
      sort.price = 1; // Sort by price in ascending order
    } else if (sortBy === 'rating') {
      sort.rating = -1; // Sort by rating in descending order
    } else if (sortBy) {
      sort[sortBy as string] = 1; // Default sorting for other fields
    }

    // Pagination options
    const skip = (Number(page) - 1) * Number(limit);
    const limitValue = Number(limit);

    // Fetch products based on query, sorting, and pagination
    const products = await Product.find(query).sort(sort).skip(skip).limit(limitValue);
    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      total: totalProducts,
      page: Number(page),
      limit: Number(limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};