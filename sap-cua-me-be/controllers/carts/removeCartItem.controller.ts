import { Request, Response } from "express";
import Cart from "../../models/Cart";
import ProductCart from "../../models/ProductCart";

//remove product from the cart
export const removeCartItem = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;

        //find and remove the product from the cart
        const productCart = await ProductCart.findByIdAndDelete(id)
        if (!productCart) {
            res.status(404).json({ message: "Cart item not found" });
            return
          }
        
          //remove the product reference from the cart
          await Cart.findOneAndUpdate({products:id}, {$pull: { products: id }}, {new:true})
          res.status(200).json({message:"Cart item removed successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}