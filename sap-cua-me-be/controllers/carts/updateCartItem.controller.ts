import { Request, Response } from "express";
import Cart from "../../models/Cart";
import ProductCart from "../../models/ProductCart";

export const updateCartItem = async (req:Request, res:Response) => {
    try {
        const {id} = req.params; //ProductCart Id
        const {quantity} = req.body;

        if (!quantity || quantity <1) {
            res.status(400).json({message:"Quantity must be at least 1"})
        }

        //Find and update the product in the cart
        const productCart = await ProductCart.findByIdAndUpdate(id, {quantity}, {new:true, runValidators:true});

        if(!productCart) {
            res.status(400).json({message:"Cart item not found"})
            return;
        };

        res.status(200).json({message:"Cart item updated", productCart})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}