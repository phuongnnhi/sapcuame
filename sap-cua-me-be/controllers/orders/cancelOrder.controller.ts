import { Response } from "express";
import Order from "../../models/Order";
import { CustomRequest } from "../../index";

//cancel an order
export const cancelOrder = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user._id;
      const { id } = req.params;
  
      // Find the order and ensure it belongs to the logged-in user
      const order = await Order.findOne({ _id: id, userId });
  
      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return 
      }
  
      // Check if the order can be canceled
      if (["Đang giao hàng", "Đã giao hàng", "Đã hoàn thành"].includes(order.status)) {
        res.status(400).json({
          message: "Order cannot be canceled at this stage",
        });
        return;
      }
  
      // Update the order status to 'Đã hủy'
      order.status = "Đã hủy";
      await order.save();
  
      res.status(200).json({ message: "Order canceled successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };