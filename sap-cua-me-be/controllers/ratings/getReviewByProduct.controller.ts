import { Response } from "express";
import Rating from "../../models/Rating";
import Product from "../../models/Product";
import { CustomRequest } from "../../index";

// Get all reviews for a specific product
export const getReviewsForProduct = async (req: CustomRequest, res: Response) => {
  try {
    const { productId } = req.params;

    // Validate product existence
    const product = await Product.findOne({ _id: productId, isDeleted: false });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Fetch reviews for the product
    const reviews = await Rating.find({ productId, isDeleted: false }).populate("userId", "name email");

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};