"use clients";
import { Button, Flex, AspectRatio, FormatNumber, Card, Span, Stack, Text} from '@chakra-ui/react'
import type { Product } from '@/types'
import { ProductColorPicker } from '@/components/Product/product-color-picker'
import { useState } from 'react'
import { BsCartCheckFill } from "react-icons/bs";
import Link from 'next/link';

interface ProductItemProps {
  data: Product
}

export const ProductItem = (props: ProductItemProps) => {
  const { data } = props
  const productImage = data.images?.[0] ?? "/placeholder.jpg";

  const [isInCart, setIsInCart] = useState(false);

  const handleAddToCart = () => {
    setIsInCart(true);}

  return (
    <Card.Root overflow="hidden" variant="elevated" boxShadow="lg" bg="brand.300" height="600px">
      <Card.Header p="0">
      <AspectRatio ratio={4 / 5} w="full">
    <img
      style={{ objectFit: 'cover' }}
      src={productImage}
      alt={data.name}
    /></AspectRatio>
      </Card.Header>
      <Card.Body gap={{ base: '5', md: '6' }}>
        <Stack gap="3" flex="1">
          <Stack>
            <Text textStyle="sm" fontWeight="medium" color="brand.500">
              {data.category}
            </Text>
            <ProductColorPicker data={data}/>
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
            <BsCartCheckFill size="24px" color="green" />
          ) : (
            <Button size="sm" bg="brand.500" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          )}
        </Flex>
      </Card.Footer>
    </Card.Root>
  )
}
