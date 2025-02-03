import {  Response } from "express";
import Cart from "../../models/Cart";
import ProductCart from "../../models/ProductCart";
import { CustomRequest } from "../../index";


export const addToCart = async (req:CustomRequest, res:Response) => {
    try {
        const userId = req.user._id;
        const {productId, quantity} = req.body;

        if (!productId || !quantity) {
            res.status(400).json({ message: "Product ID and quantity are required" })
            return; 
        }

        //find or create user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
          cart = new Cart({ userId, products: [] });
        }
    
        // Check if the product already exists in the cart
        let productCart = await ProductCart.findOne({ productId, cartId: cart._id });
    
        if (productCart) {
            //update quantity if product exists
            productCart.quantity += quantity;
            await productCart.save();
        } else {
            //Add new product to cart
            productCart = new ProductCart({productId, cartId:cart._id, quantity});
            await productCart.save();
            cart.products.push(productCart._id)
        }

        await cart.save();
        res.status(200).json({message:"Product added to cart", cart})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
