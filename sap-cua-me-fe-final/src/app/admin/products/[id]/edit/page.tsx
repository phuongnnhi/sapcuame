"use client";

import { useParams } from "next/navigation";
import UpdateProduct from "@/pages/Admin/UpdateProduct";

export default function EditProductPage() {
  const params = useParams<{ id: string }>(); 
  const id = params?.id; // 

  if (!id) {
    return <p>Product ID not found.</p>; // Optional: Handle missing ID gracefully
  }

  return <UpdateProduct productId={id} />;
}