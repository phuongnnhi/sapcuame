"use client";
import { Footer } from "@/components/Footer";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { ItemPage } from "@/components/Product/ProductItemPage";
import { ProductPage } from "@/components/Product/ProductPage";
import { Stack } from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function AllProductsPage() {
    const params = useParams<{ id: string }>(); 
    const id = params?.id; // 
  
    if (!id) {
      return <p>Product ID not found.</p>; // Optional: Handle missing ID gracefully
    }
    return (
      <Stack flex="1" gap="10">
            <MenuBlock/>
            <ItemPage productId={id}/>
            <Footer />
          </Stack>
    );
  }