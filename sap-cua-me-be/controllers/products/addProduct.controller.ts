import { Request, Response } from 'express';
import Product from '../../models/Product';

export const addProduct = async(req:Request, res:Response) => {
    try {
        const productData =req.body;
        const newProduct = new Product(productData);
        await newProduct.save();

        res.status(200).json(newProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}