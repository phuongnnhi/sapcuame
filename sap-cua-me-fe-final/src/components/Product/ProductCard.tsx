"use clients";
import {
  Button,
  Flex,
  AspectRatio,
  FormatNumber,
  Card,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Product } from "@/types";
import { ProductColorPicker } from "@/components/Product/ProductColorPicker";
import { useEffect, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import Link from "next/link";
import { addToCart, removeCartItem } from "@/app/apiFunctions";
import { useCart } from "@/components/CartContext";

interface ProductItemProps {
  data: Product;
}

export const ProductItem = (props: ProductItemProps) => {
  const { data } = props;
  const productImage = data.images?.[0] ?? "/placeholder.jpg";
  const { cart, refreshCart } = useCart();

  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);

  // Check if product is already in cart on mount
  //useMemo => memory values
  // useCallback => function
// Whenever the global cart changes, update this product's cart status
useEffect(() => {
  if (cart && Array.isArray(cart)) {
    const cartItem = cart.find((item) => item.productId._id === data._id);
    if (cartItem) {
      setCartItemId(cartItem._id);
      setIsInCart(true);
    } else {
      setCartItemId(null);
      setIsInCart(false);
    }
  }
}, [cart, data._id]);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      await addToCart(data._id, 1);
      await refreshCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!cartItemId) return;

    try {
      setIsLoading(true);
      await removeCartItem(cartItemId); // Call API to remove product from cart
      await refreshCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card.Root
      overflow="hidden"
      variant="elevated"
      boxShadow="lg"
      bg="brand.300"
      minHeight="600px"
      minWidth="280px"
      height="100%"
      width="100%"
    >
      <Card.Header p="0">
        <AspectRatio ratio={4 / 5} w="full">
          <img
            style={{ objectFit: "cover" }}
            src={productImage}
            alt={data.name}
          />
        </AspectRatio>
      </Card.Header>
      <Card.Body gap={{ base: "5", md: "6" }} flex="1" display="flex" flexDirection="column">
        <Stack gap="3" flex="1">
          <Stack>
            <Text textStyle="sm" fontWeight="medium" color="brand.500">
              {data.category}
            </Text>
            <ProductColorPicker data={data} />
            <Link href={`/san-pham/${data._id}`}>
              <Text textStyle="lg" color="brand.700" fontWeight="bold">
                {data.name}
              </Text>
            </Link>
          </Stack>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Span textStyle="sm">
            <FormatNumber
              style="currency"
              currency="VND"
              value={Number(data.price)}
            />
          </Span>
          {isInCart ? (
            <BsCartCheckFill
              size="24px"
              color="green"
              onClick={handleRemoveFromCart}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <Button
              size="sm"
              bg="brand.500"
              onClick={handleAddToCart}
              loading={isLoading}
            >
              Thêm vào giỏ hàng
            </Button>
          )}
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};
