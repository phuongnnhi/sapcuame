import { HStack, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { updateCartItem } from "@/app/apiFunctions";

interface QuantitySelectProps {
  data: { _id: string; quantity: number };
}

const QuantitySelect = ({ data }: QuantitySelectProps) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [loading, setLoading] = useState(false);

  const handleChange = async (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    
    if (newQuantity === quantity) return;

    setQuantity(newQuantity);
    setLoading(true);
    
    try {
      await updateCartItem(data._id, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HStack gap={3}>
      <Button
        size="sm"
        bg="brand.500"
        color="white"
        _hover={{ bg: "brand.600" }}
        disabled={quantity <= 1 || loading}
        onClick={() => handleChange(-1)}
      >
        -
      </Button>

      <Text fontWeight="bold">{quantity}</Text>

      <Button
        size="sm"
        bg="brand.500"
        color="white"
        _hover={{ bg: "brand.600" }}
        disabled={loading}
        onClick={() => handleChange(1)}
      >
        +
      </Button>
    </HStack>
  );
};

export default QuantitySelect;