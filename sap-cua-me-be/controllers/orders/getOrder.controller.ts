import { Response } from "express";
import Order from "../../models/Order";
import { CustomRequest } from "../../index";
import ProductOrder from "../../models/ProductOrder";

// Get the list of all orders for the logged-in user (with pagination)
export const getOrders = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;

    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Fetch orders with pagination
    const orders = await Order.find({ userId })
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const productOrders = await ProductOrder.find({
          orderId: order._id,
        }).populate("productId", "name price");
        return { ...order.toObject(), productOrders };
      })
    );

    // Get total count for pagination metadata
    const totalOrders = await Order.countDocuments({ userId });

    res.status(200).json({
      orders: ordersWithProducts,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};