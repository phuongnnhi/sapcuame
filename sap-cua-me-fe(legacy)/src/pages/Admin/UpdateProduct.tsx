import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/Admin/ProductForm";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${BASE_API_URL}/product/${id}`);
      const data = await response.json();
      setInitialData(data);
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (formData: FormData) => {
    const response = await fetch(`${BASE_API_URL}/product/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      alert("Product updated successfully!");
    } else {
      alert("Failed to update product.");
    }
  };

  if (!initialData) {
    return <p>Loading...</p>;
  }

  return <ProductForm initialData={initialData} onSubmit={handleUpdateProduct} isEditing />;
};

export default UpdateProduct;