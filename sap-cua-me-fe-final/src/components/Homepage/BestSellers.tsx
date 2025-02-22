import { useEffect, useState } from "react";
import { Container, Button, Heading, Spinner, Center, Text, SimpleGrid } from "@chakra-ui/react";
import { ProductItem } from "../Product/ProductCard";
import { getBestSellerProducts} from "@/app/apiFunctions";
import type { Product } from "@/types";

import Slider from "react-slick";


export const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        const data = await getBestSellerProducts();
        console.log("Fetched best seller products:", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load best seller products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellerProducts();
  }, []);

  if (loading) {
    return (
      <Center height="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="200px">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (

    <Container maxW="7xl" py="10" mt="20">
            <Heading fontSize={{ base: "2xl", md: "3xl" }} color="brand.500" mb="6">Sản phẩm bán chạy ở sạp</Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
  {products.slice(0, 4).map((product) => (
    <ProductItem key={product._id} data={product} />
  ))}
</SimpleGrid>
<Center mt="8">
        <Button
          variant="outline"
          colorScheme="brand"
          borderRadius="full"
          borderColor="brand.500"
          px="8"
          py="6"
          fontWeight="medium"
          onClick={() => console.log("Xem thêm clicked")}
        >
          Xem thêm
        </Button>
      </Center>
    </Container>
  );
};
