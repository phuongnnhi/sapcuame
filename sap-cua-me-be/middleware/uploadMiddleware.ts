import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinaryConfig"; // Ensure correct import path

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "products", // Folder in Cloudinary
    format: 'jpg',
    allowed_formats: ["jpg", "png", "jpeg", "heic", "heif"], // ✅ Allow HEIC & HEIF
    resource_type: "auto", // Allows different file types
  }),
});

const upload = multer({ storage });

export default upload;