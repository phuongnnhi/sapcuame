import {  Response } from "express";
import Order from "../../models/Order";
import { CustomRequest } from "../../index";

//get order by Id
export const getOrderById = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user._id;
      const { id } = req.params;
  
      // Fetch the order with product details
      const order = await Order.findOne({ _id: id, userId }).populate({
        path: "productOrders",
        populate: { path: "productId", model: "Product" },
      });
  
      if (!order) {
         res.status(404).json({ message: "Order not found" });
         return
      }
  
      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };