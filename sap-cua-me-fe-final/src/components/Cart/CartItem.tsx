import { Flex, Image, Stack, Text, Button, Link } from "@chakra-ui/react";
import { ProductCart } from "@/types";
import QuantitySelect from "./QuantitySelect";


interface CartItemProps {
  data: ProductCart;
  onRemove: (cartItemId: string) => void;
}



export const CartItem = ({ data, onRemove }: CartItemProps) => {
  return (
    <Flex justify="space-between" align="flex-start" p={4} borderRadius="md">
      {/* Product Image */}
      <Image 
        src={data.productId.images?.[0]} 
        alt={data.productId.name} 
        width="120px" 
        height="120px" 
        objectFit="cover"
      />

      {/* Product Details */}
      <Stack flex="1" ml={4}>
        <Text fontWeight="bold" color ="brand.500">{data.productId.name}</Text>
        <Text fontSize="sm">Color: {data.productId.colors?.[0]}, Size: {data.productId.size?.[0]}</Text>
        <QuantitySelect data={data} />
      </Stack>

      {/* Price and Actions */}
      <Stack align="flex-end">
        <Text fontWeight="bold">{(data.productId.price * data.quantity).toLocaleString("vi-VN")}</Text>
        <Stack direction="row">
          <Link onClick={() => onRemove(data._id)}>Xoá khỏi giỏ hàng</Link>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CartItem;