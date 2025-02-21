"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "../../components/Admin/ProductForm";


const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface UpdateProductProps {
    productId: string;
  }  

const UpdateProduct: React.FC<UpdateProductProps> = () => {
    const params = useParams();
    const id = params?.id as string;
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