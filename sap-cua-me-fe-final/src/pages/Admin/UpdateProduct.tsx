"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "../../components/Admin/ProductForm";
import { Product } from "@/types";


const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface UpdateProductProps {
    productId: string;
  }  

const UpdateProduct: React.FC<UpdateProductProps> = () => {
    const params = useParams();
    const id = params?.id as string;
  const [initialData, setInitialData] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${BASE_API_URL}/product/${id}`);
      const data = await response.json();
      setInitialData(data);
    };

    fetchProduct();
  }, [id]);

  const transformInitialData = (data: Product): Partial<ProductForm> => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(", ")]; 
        }
        return [key, value];
      })
    );
  };

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

  return <ProductForm initialData={transformInitialData(initialData)} onSubmit={handleUpdateProduct} isEditing />;
};

export default UpdateProduct;