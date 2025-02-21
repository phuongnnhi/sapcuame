import { Response } from "express";
import Rating from "../../models/Rating";
import { CustomRequest } from "../../index";

 // Soft delete a review
export const deleteReview = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user._id;
      const { id } = req.params; // ID of the review to delete
  
      // Find the review
      const deletedReview = await Rating.findOneAndUpdate({ _id: id, userId },{isDeleted:true},{new:true});
      if (!deletedReview) {
         res.status(404).json({ message: "Review not found" });
         return
      }
  
      res.status(200).json({ message: "Review deleted successfully", review: deletedReview});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error"});
    }
  };