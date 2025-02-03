import { Response } from "express";
import Cart from "../../models/Cart";
import { CustomRequest } from "../../index";

export const getCart = async(req: CustomRequest, res:Response) => {
    try {
        const userId = req.user._id;

        //find the user's cart and populate the products
        const cart = await Cart.findOne({userId}).populate({
            path: "products",
            populate: {
              path: "productId",
              model: "Product",
            },
        })

        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return
          }

        res.status(200).json(cart)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}