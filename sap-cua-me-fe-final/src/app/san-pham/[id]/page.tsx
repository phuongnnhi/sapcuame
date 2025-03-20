"use client";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { ItemPage } from "@/components/Product/ProductItemPage";
import { Stack, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getProductById } from "@/app/apiFunctions";
import { Product } from "@/types";

export default function AllProductsPage() {
    const params = useParams<{ id: string }>(); 
    const id = params?.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const fetchedProduct = await getProductById(id);
                if (!fetchedProduct) throw new Error("Product not found.");
                setProduct(fetchedProduct);
            } catch (err) {
              console.error("Error fetching product:", err);
                setError("Failed to fetch product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (!id) return <Text>Product ID not found.</Text>;
    if (loading) return <Spinner />;
    if (error || !product) return <Text>{error || "Product not found."}</Text>;

    return (
        <Stack flex="1" gap="10">
            <MenuBlock />
            <ItemPage productId={id} data={product} /> 
            <Footer />
        </Stack>
    );
}