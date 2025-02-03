import { Request, Response } from "express";
import Rating from "../../models/Rating";
import Product from "../../models/Product";

// Get all reviews written by a specific user
export const getReviewsByUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      // Fetch reviews written by the user
      const reviews = await Rating.find({ userId, isDeleted: false })
      .populate({
        path: "productId",
        select: "name image isDeleted",
        match: { isDeleted: false }, // Ensure associated product is not soft-deleted
      });
  
          // Remove any reviews where the populated product was soft-deleted
          const filteredReviews = reviews.filter((review) => review.productId !== null);
  
      res.status(200).json({
        message: "User reviews fetched successfully",
        reviews,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };