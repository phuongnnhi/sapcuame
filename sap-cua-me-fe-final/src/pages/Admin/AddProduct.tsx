import React from "react";
import ProductForm from "../../components/Admin/ProductForm";


const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const AddProduct: React.FC = () => {
  const handleAddProduct = async (formData: FormData) => {
    const response = await fetch(`${BASE_API_URL}/api/product`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Product added successfully!");
    } else {
      alert("Failed to add product.");
    }
  };

  return <ProductForm onSubmit={handleAddProduct} />;
};

export default AddProduct;