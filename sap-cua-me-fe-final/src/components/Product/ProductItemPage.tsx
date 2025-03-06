"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/types";

import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  Heading,
  SimpleGrid,
  Container,
  Breadcrumb,
  Separator,
} from "@chakra-ui/react";
import {
  addToCart,
  getCart,
  getProductById,
  getProducts,
  removeCartItem,
} from "@/app/apiFunctions";
import { ProductItem } from "./ProductCard";
import { ProductColorPicker } from "./product-color-picker";
// import { Divider } from "@mui/material";
import { LuHouse, LuShoppingBag, LuSmile } from "react-icons/lu";

interface ItemPageProps {
  productId: string;
  data: Product;
}

export const ItemPage: React.FC<ItemPageProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariety, setSelectedVariety] = useState<
    Product["varieties"][0] | null
  >(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  /** Fetch product data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedProduct = await getProductById(productId);
        if (!fetchedProduct) throw new Error("Product not found.");

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images?.[0] || null);

        // Fetch related products
        const { products } = await getProducts({
          category: fetchedProduct.category[0],
          limit: 5,
        });

        const filteredProducts = products
          .filter((p) => p._id !== productId)
          .slice(0, 4);
        setRelatedProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching item page data:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    if (!product) return;

    const checkCartStatus = async () => {
      try {
        const cart = await getCart(); // Fetch cart data from API
        console.log("Cart data:", cart);

        if (cart && Array.isArray(cart.products)) {
          const productIds = cart.products.map((item) => item.productId._id);

          if (productIds.includes(product._id)) {
            console.log("Product is in cart! Updating state.");
            setCartItemId(product._id); // Now we assign the correct value
            setIsInCart(true);
          } else {
            console.log(" Product is NOT in cart!");
            setCartItemId(null);
            setIsInCart(false);
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart status:", error);
      }
    };

    checkCartStatus();
  }, [product]);

  /** Set initial variety and price after product loads */
  useEffect(() => {
    if (product && product.varieties?.length > 0) {
      setSelectedVariety(product.varieties[0]);
      setCurrentPrice(product.varieties[0].price);
    } else if (product) {
      setCurrentPrice(
        Array.isArray(product.price) ? product.price[0] : product.price
      );
    }
  }, [product]);

  if (loading) return <Text>Loading product...</Text>;
  if (error) return <Text>{error}</Text>;
  if (!product) return <Text>Product not found.</Text>;

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setIsLoading(true);
      await addToCart(product._id, quantity);
      setCartItemId(product._id);
      setIsInCart(true);

      //  Re-fetch cart to update UI after adding
      const updatedCart = await getCart();

      if (updatedCart && Array.isArray(updatedCart.products)) {
        const productIds = updatedCart.products.map(
          (item) => item.productId._id
        );

        if (!productIds.includes(product._id)) {
          setCartItemId(null);
          setIsInCart(false);
        }
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!product) return;

    try {
      setIsLoading(true);
      const cart = await getCart();

      if (!cart || !Array.isArray(cart.products)) {
        console.error("Cart is empty or invalid!");
        return;
      }

      const cartItem = cart.products.find(
        (item) => item.productId._id === product._id
      );

      if (!cartItem) {
        console.error("Product not found in cart!");
        return;
      }

      console.log("Removing product from cart, cartItemId:", cartItem._id);
      await removeCartItem(cartItem._id);

      setCartItemId(null);
      setIsInCart(false);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="7xl" py="10">
      <Breadcrumb.Root marginBottom="10">
        <Breadcrumb.List textStyle="md">
          <Breadcrumb.Item gap="2">
            <LuHouse />
            <Breadcrumb.Link href="/">Trang chủ</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item gap="2">
            <LuShoppingBag />
            <Breadcrumb.Link href="/san-pham">Sản phẩm</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item gap="2">
            <LuSmile />
            <Breadcrumb.Link href={`/san-pham/${product._id}`}>
              {product.name}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Box p={8}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={20}>
          {/* Left Side - Product Gallery */}
          <Stack gap={4} direction="row">
            {/* Thumbnails on the left */}
            {product.images && product.images.length > 1 && (
              <Stack direction="column" gap={2}>
                {product.images.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    boxSize="80px"
                    borderRadius="md"
                    border={
                      selectedImage === img
                        ? "2px solid black"
                        : "1px solid gray"
                    }
                    cursor="pointer"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </Stack>
            )}

            {/* Main Image */}
            <Box>
              <Image
                src={selectedImage || ""}
                alt="Selected Product View"
                borderRadius="lg"
                height="500px"
                width="100%"
              />
            </Box>
          </Stack>

          {/* Right Side - Product Details */}
          <Stack gap={5}>
            <Heading size="3xl" color="brand.500">
              {product.name}
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" color="brand.500Alpha80">
              {currentPrice?.toLocaleString("de-DE")} VNĐ
            </Text>
            <Text>{product.description.split(".")[0]}.</Text>

            {/* Phân loại sản phẩm */}
            {product.varieties && product.varieties.length > 0 && (
              <>
                <Separator size="sm" width="100%" orientation="horizontal" />
                <Text color="brand.500" fontWeight="bold">
                  Chọn loại sản phẩm
                </Text>
                <Stack direction="row" gap={3}>
                  {product.varieties.map((variety, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedVariety?.name === variety.name
                          ? "solid"
                          : "outline"
                      }
                      bg={
                        selectedVariety?.name === variety.name
                          ? "brand.500"
                          : "brand.100"
                      }
                      color={
                        selectedVariety?.name === variety.name
                          ? "white"
                          : "black"
                      }
                      borderRadius="full"
                      size="sm"
                      onClick={() => {
                        setSelectedVariety(variety);
                        setCurrentPrice(variety.price);
                      }}
                    >
                      {variety.name}
                    </Button>
                  ))}
                </Stack>
              </>
            )}

            {/* Màu sắc sản phẩm */}
            {product.colors && product.colors.length > 0 && (
              <>
                <Separator size="sm" width="100%" orientation="horizontal" />
                <Text color="brand.500" fontWeight="bold">
                  Chọn màu
                </Text>
                <ProductColorPicker data={product} />
              </>
            )}

            {/* Kích cỡ sản phẩm */}
            {product.size && product.size.length > 0 && (
              <>
                <Separator size="sm" width="100%" orientation="horizontal" />
                <Text color="brand.500" fontWeight="bold">
                  Chọn kích cỡ
                </Text>
                <Stack direction="row" gap={3}>
                  {product.size.map((size, index) => (
                    <Button
                      key={index}
                      variant={selectedSize === size ? "solid" : "outline"}
                      bg={selectedSize === size ? "brand.500" : "brand.100"}
                      color={selectedSize === size ? "white" : "black"}
                      borderRadius="full"
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </Stack>
              </>
            )}

            <Separator size="sm" width="100%" orientation="horizontal" />
            <Stack direction="row" alignItems="center" gap={3}>
              <Text fontWeight="bold" color = "brand.500">Số lượng:</Text>
              <Button
                size="sm"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                bg ="brand.500"
              >
                -
              </Button>
              <Text>{quantity}</Text>
              <Button size="sm" onClick={() => setQuantity((prev) => prev + 1)} bg ="brand.500">
                +
              </Button>
            </Stack>
            <Button
              bg={isInCart ? "gray.500" : "brand.700"}
              size="lg"
              onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            >
              {isInCart ? "Xóa khỏi giỏ hàng" : "Thêm vào giỏ hàng"}
            </Button>
          </Stack>
        </Grid>

        <Box mt="20" bg="brand.pastel" borderRadius="lg" p={10} boxShadow="md">
          <Heading size="2xl" mb={4} color="brand.500">
            Mô tả sản phẩm
          </Heading>
          <Text whiteSpace="pre-line">{product.description}</Text>
        </Box>

        {/* Related Products Section */}
        <Box mt={12}>
          <Heading size="2xl" mb={4} color="brand.500">
            Có thể bạn sẽ thích
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
            {relatedProducts.map((relatedProduct) => (
              <ProductItem key={relatedProduct._id} data={relatedProduct} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Container>
  );
};
