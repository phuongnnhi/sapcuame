import { Response } from "express";
import Rating from "../../models/Rating";
import Product from "../../models/Product";
import { CustomRequest } from "../../index";

// Submit a review for a product
export const submitReview = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id; // Extract logged-in user ID
    const { productId, star, review } = req.body;

    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Check if the user has already reviewed this product
    const existingReview = await Rating.findOne({ productId, userId });
    if (existingReview) {
       res.status(400).json({ message: "You have already reviewed this product" });
       return;
    }

    // Create and save the review
    const rating = new Rating({
      productId,
      userId,
      star,
      review,
    });
    await rating.save();

    res.status(201).json({
      message: "Review submitted successfully",
      rating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error"});
  }
};