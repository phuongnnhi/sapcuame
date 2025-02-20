import { Request, Response } from 'express';
import Product from '../../models/Product';
import cloudinary from '../../utils/cloudinaryConfig';

export const addProduct = async (req: Request, res: Response) => {
    try {
        console.log("Received Product Data (Before Upload):", req.body);

    
        const productData = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

        let uploadedImages: string[] = [];

        // Ensure `req.files` is processed correctly
        const files = req.files as Express.Multer.File[] | undefined;
        if (files && Array.isArray(files)) {
            for (const file of files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'products',
                    resource_type: 'image',
                });
                uploadedImages.push(result.secure_url);
            }
        }

        console.log("Uploaded Images:", uploadedImages); // Debugging

        const newProductData = {
            ...productData,
            images: [...(productData.images || []), ...uploadedImages], // Preserve any existing images
        };

        console.log("Final Product Data (Before Save):", newProductData); // Debugging before save

        const newProduct = new Product(newProductData);
        await newProduct.save();

        console.log("Saved Product Data:", newProduct); // Debugging saved data

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ message: 'Server error' });
    }
};