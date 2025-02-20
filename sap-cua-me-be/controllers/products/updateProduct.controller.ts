import { Request, Response } from 'express';
import multer from 'multer'; // ✅ Import Multer types
import Product from '../../models/Product';
import cloudinary from '../../utils/cloudinaryConfig';

// Update an existing product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the existing product
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Handle image uploads if new images are provided
    let uploadedImages: string[] = product.images; // Keep existing images

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

    // Update product data, including images
    updateData.images = uploadedImages;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to update product' });
  }
};