import { Request, Response } from 'express';
import Product from "../../models/Product";

// Soft delete a product

export const deleteProduct = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;

        const deletedProduct = await Product.findByIdAndUpdate (id, {isDeleted: true}, {new:true});

        if (!deletedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
          }

     res.status(200).json({ message: 'Product soft-deleted successfully', product: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}