"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  Separator,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Cart } from "@/types";
import CartItem from "@/components/Cart/CartItem";
import { checkoutOrder, getCart, removeCartItem } from "@/app/apiFunctions";
import { useMemo } from "react";

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  const total = useMemo(() => {
    if (!cart || !cart.productCarts) return 0;
    return cart.productCarts.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
  }, [cart]);

  useEffect(() => {
    // Fetch cart data
    const fetchCart = async () => {
      try {
        console.log('cart page');
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
          productCarts: prevCart.productCarts.filter(
            (item) => item._id !== cartItemId
          ),
        };
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    setCart((prevCart) => {
      if (!prevCart) return null;
  
      return {
        ...prevCart,
        productCarts: prevCart.productCarts.map((item) =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        ),
      };
    });
  };

  const handleCheckout = async () => {
    if (!cart || cart.productCarts.length === 0) {
      alert("Giỏ hàng trống, không thể tạo đơn hàng.");
      return;
    }

    try {
      console.log("Cart Products:", cart.productCarts);
      await checkoutOrder(cart);
      alert("Tạo đơn hàng thành công!");

      // Clear cart after checkout
      setCart((prevCart) =>
        prevCart
          ? {
              ...prevCart,
              productCarts: [],
            }
          : null
      );
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
    }
  };

  if (!cart) {
    return <Text>Đang tải giỏ hàng</Text>;
  }

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Heading mb={6} color="brand.500" textStyle="3xl">
        Giỏ đi chợ ({cart.productCarts.length} items)
      </Heading>

      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Cart Items */}
        <Stack flex="2" gap={6}>
          {cart.productCarts.map((item) => (
            <CartItem key={item._id} data={item} onRemove={handleRemove} onQuantityChange={handleQuantityChange}/>
          ))}
        </Stack>

        {/* Order Summary */}
        <Box flex="1" p={6} bg="brand.700" borderRadius="md">
          <Stack gap={4}>
            <Text fontSize="lg" fontWeight="bold" color="white">
              Thông tin giỏ hàng
            </Text>
            <Separator size="sm" width="100%" orientation="horizontal" />
            <Flex justify="space-between" fontWeight="bold">
              <Text color="white">Tổng tiền (VNĐ)</Text>
              <Text color="white">{total.toLocaleString("vi-VN")}</Text>
            </Flex>
            <Button
              bg="white"
              color="brand.700"
              size="lg"
              onClick={handleCheckout}
            >
              Tạo đơn hàng
            </Button>
          </Stack>
        </Box>
      </Flex>

      <Link
        mt={6}
        display="block"
        textAlign="right"
        color="brand.700"
        href="/san-pham"
      >
        Tiếp tục mua sắm →
      </Link>
    </Box>
  );
};

export default CartPage;
