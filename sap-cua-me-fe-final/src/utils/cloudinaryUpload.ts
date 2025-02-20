import axios from "axios";

interface CloudinaryResponse {
  secure_url: string;
}

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!);

  try {
    const response = await axios.post<CloudinaryResponse>(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      formData
    );

    console.log("Cloudinary Upload Response:", response.data); // ✅ Debugging
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

export default uploadToCloudinary;