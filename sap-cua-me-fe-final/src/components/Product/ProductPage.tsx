"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  Button,
  SimpleGrid,
  Spinner,
  Stack,
  HStack,
  Container,
  Heading,
  Breadcrumb
} from "@chakra-ui/react";

import {
  PaginationRoot,
  PaginationItems,
  PaginationPrevTrigger,
  PaginationNextTrigger,
} from "@/components/ui/pagination";

import { getProducts } from "@/app/apiFunctions";
import type { Product, ProductResponse } from "@/types";
import { ProductItem } from "./ProductCard";
import { categories } from "@/constants/ProductCat";
import { LuHouse, LuShoppingBag } from "react-icons/lu";

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 9;
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        category: selectedCategory || undefined,
        page,
        limit,
      };

      const response: ProductResponse = await getProducts(params);
      setProducts(response.products);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="7xl" py="10">

    <Breadcrumb.Root marginBottom="10">
      <Breadcrumb.List textStyle="md">
        <Breadcrumb.Item gap="2">
        <LuHouse/> 
          <Breadcrumb.Link href="#">Trang chủ</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item gap="2">
        <LuShoppingBag/> 
          <Breadcrumb.Link href="#">Sản phẩm</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>

      <Flex>
        <Box
          w="20%"
          p={4}
          bgColor="#e5ddf3"
          height="500px"
          borderRight="1px solid #e2e8f0"
          borderRadius="15px"
          position="sticky"
          top="20vh"
        >
          <Flex
            paddingTop="30px"
            direction="column"
            justify="top"
            align="center"
            height="100%"
          >
            <Heading fontWeight="bold" textStyle="2xl" mb={4} color="brand.700">
              Quầy hàng
            </Heading>
            <Stack gap={1}>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  bg={selectedCategory === cat ? "brand.500" : "transparent"}
                  color={selectedCategory === cat ? "brand.50" : "brand.500"}
                  _hover={{
                    bg: "brand.500",
                    color: "brand.50",
                  }}
                  _active={{
                    bg: "brand.700",
                  }}
                  onClick={() =>
                    setSelectedCategory(cat === "toàn bộ sản phẩm" ? "" : cat)
                  }
                >
                  {cat}
                </Button>
              ))}
            </Stack>
          </Flex>
        </Box>

        <Box w="80%" p={4}>
          <Flex mb={4} justify="space-between" align="center">
            <Input
              placeholder="Nhập tên sản phẩm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              w="40%"
            />
          </Flex>

          {loading ? (
            <Flex justify="center" align="center" minH="50vh">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <SimpleGrid columns={[1, 2, 3]} gap={4}>
              {products.map((product) => (
                <ProductItem key={product._id} data={product} />
              ))}
            </SimpleGrid>
          )}

          <Flex justify="center" mt={6}>
            <PaginationRoot
              count={totalPages * limit} // Total number of items
              pageSize={limit} // Items per page
              defaultPage={page} // Current page
              onPageChange={(details) => setPage(details.page)}
            >
              <HStack>
                <PaginationPrevTrigger>Previous</PaginationPrevTrigger>
                <PaginationItems />
                <PaginationNextTrigger>Next</PaginationNextTrigger>
              </HStack>
            </PaginationRoot>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
