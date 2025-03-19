import { Response } from "express";
import mongoose from "mongoose";
import Order from "../../models/Order";
import Cart from "../../models/Cart";
import ProductOrder from "../../models/ProductOrder";
import ProductCart from "../../models/ProductCart";
import { CustomRequest } from "../../index";

export const createOrder = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate({
      path: "productCarts",
      populate: {
        path: "productId",
        model: "Product",
        select: "name price", // Select only necessary fields
      },
    });

    // Check if the cart exists and has items
    if (!cart || !cart.productCarts || cart.productCarts.length === 0) {
      res.status(400).json({ message: "Your cart is empty" });
      return 
    }

    // Prepare order data
    let totalCost = 0;
    const orderedProductIds: mongoose.Types.ObjectId[] = [];
    const productOrders: {
      productId: mongoose.Types.ObjectId;
      name: string;
      price: number;
      quantity: number;
    }[] = [];

    for (const productCart of cart.productCarts) {
      if (!productCart.productId || typeof productCart.productId !== "object") {
        res.status(400).json({ message: "Product data is not available" });
        return 
      }
      const product = productCart.productId as unknown as {
        _id: mongoose.Types.ObjectId;
        name: string;
        price: number;
        images: string | string[];
      };

      totalCost += product.price * productCart.quantity;
      orderedProductIds.push(product._id);

      productOrders.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: productCart.quantity,
      });
    }

    //  Create and save the order
    const order = new Order({
      userId,
      status: "Mới tạo",
      totalCost,
    });
    await order.save();

    // Save ProductOrder records
    const productOrderRecords = await ProductOrder.insertMany(
      productOrders.map((item) => ({
        productId: item.productId,
        orderId: order._id,
        quantity: item.quantity,
      }))
    );

    //Remove ordered products from the cart
    await ProductCart.deleteMany({
      productId: { $in: orderedProductIds },
      cartId: cart._id,
    });

    //Send response
    res.status(201).json({
      message: "Order created successfully",
      order,
      productOrders,
      productOrderRecords,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};