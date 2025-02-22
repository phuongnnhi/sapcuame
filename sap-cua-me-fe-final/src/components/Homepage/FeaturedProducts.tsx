import { useEffect, useState } from "react";
import { Container, Box, Heading, Spinner, Center, Text } from "@chakra-ui/react";
import { ProductItem } from "../Product/ProductCard";
import { getFeaturedProducts } from "@/app/apiFunctions";
import type { Product } from "@/types";

import Slider from "react-slick";


export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getFeaturedProducts();
        console.log("Fetched featured products:", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load featured products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (

    <Container maxW="7xl" py="10" mt="20">
            <Heading fontSize={{ base: "2xl", md: "3xl" }} color="brand.500" mb="6">Sản phẩm nhà mẹ dùng</Heading>
    <Slider {...settings}>
        {products.map((product) => (
          <Box key={product._id} p={2}>
            <ProductItem data={product} />
          </Box>
        ))}
      </Slider>
    </Container>
  );
};
