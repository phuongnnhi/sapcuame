"use client"
import { Box, Button, Flex, Heading, Stack, Text, Link, Separator } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Cart, ProductCart } from "@/types";
import CartItem from "@/components/Cart/CartItem";import { getCart, removeCartItem } from "@/app/apiFunctions";

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    // Fetch cart data
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);
  // Function to remove an item from the cart
  const handleRemove = async (cartItemId: string) => {
    try {
      await removeCartItem(cartItemId);
      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          products: prevCart.products.filter((item) => item._id !== cartItemId),
        };
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  if (!cart) {
    return <Text>Loading cart...</Text>;
  }

  // Calculate totals
  const total = cart.products.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);


  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Heading mb={6} color="brand.500" textStyle="3xl">Giỏ đi chợ ({cart.products.length} items)</Heading>
      
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Cart Items */}
        <Stack flex="2" gap={6}>
          {cart.products.map((item) => (
            <CartItem key={item._id} data={item} onRemove={handleRemove}/>
          ))}
        </Stack>

        {/* Order Summary */}
        <Box flex="1" p={6} bg="brand.700" borderRadius="md">
          <Stack gap={4}>
            <Text fontSize="lg" fontWeight="bold" color="white">Thông tin giỏ hàng</Text>
            <Separator size="sm" width="100%" orientation="horizontal" />
            <Flex justify="space-between" fontWeight="bold">
              <Text color="white">Tổng tiền (VNĐ)</Text>
              <Text color="white">{total.toLocaleString("vi-VN")}</Text>
            </Flex>
            <Button bg="white" color="brand.700" size="lg">Thanh toán</Button>
          </Stack>
        </Box>
      </Flex>

      <Link mt={6} display="block" textAlign="right" color="brand.700" href="/san-pham">
        Tiếp tục mua sắm →
      </Link>
    </Box>
  );
};

export default CartPage;