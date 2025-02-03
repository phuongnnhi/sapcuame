import { Request, Response } from "express";
import Order from "../../models/Order";
import ProductOrder from "../../models/ProductOrder";

//retrieve all orders with populate product
export const getAllOrders = async(req:Request, res:Response) => {
    try {
        const {page=1, limit=100, sort='createdAt'} = req.query;
        const sortField = typeof sort === 'string' ? sort : 'createdAt';

        //fetch all orders
        const orders = await Order.find()
        .sort(sortField)
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .populate('userId', 'name email');

        //Fetch associated products for each order
        const ordersWithProducts = await Promise.all(
            orders.map(async(order) => {
                const productOrders = await ProductOrder.find({orderId: order._id}).populate('productId'); // Fetch and populate products
                return {
                    ...order.toObject(),
                    products: productOrders, //attach products to order
                }
            })
        )

        //count total orders
      const total = await Order.countDocuments();

      res.status(200).json({
        total,
        page: +page,
        limit: +limit,
        ordersWithProducts,
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}