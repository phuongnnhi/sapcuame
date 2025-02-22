import { Response } from "express";
import Rating from "../../models/Rating";
import { CustomRequest } from "../../index";

// Edit a review
export const editReview = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user._id;
      const { id } = req.params; // ID of the review to edit
      const { star, review } = req.body;
  
      // Find the review
      const existingReview = await Rating.findOne({ _id: id, userId });
      if (!existingReview) {
         res.status(404).json({ message: "Review not found or has been deleted" });
         return;
      }
  
      // Update the review
      if (star) existingReview.star = star;
      if (review) existingReview.review = review;
      await existingReview.save();
  
      res.status(200).json({ message: "Review updated successfully", review: existingReview });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };