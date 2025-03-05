import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  Separator,
  Heading,
} from "@chakra-ui/react";

const MarketRules = () => {
  return (
    <Box
      position="relative"
      width="full"
      height={{ base: "80vh", md: "70vh" }}
      backgroundImage="url('/images/sapbao.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      mt="20"
    >
      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="full"
        height="full"
        bg="brand.500Alpha50"
      />

      {/* Content */}
      <Container maxW="7xl" height="full" position="relative">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          height="full"
          py={{ base: 10, md: 0 }}
        >
          {/* Left Section - Text Blocks */}
          <VStack
            gap={6}
            align="flex-start"
            maxW={{ base: "full", md: "60%" }}
            color="brand.50"
          >
            <Text pl={4} fontSize="lg">
              Mẹ không phải chuyên gia làm đẹp nên sẽ không tư vấn bạn theo kiến
              thức chuyên môn hay thành phần. Thay vào đó, lời khuyên của mẹ sẽ
              đến từ những món mà mẹ tự tin đưa cho chồng, con, người thân, hay
              gia đình của mẹ sử dụng.
            </Text>
            <Separator
              size="sm"
              width="100%"
              orientation="horizontal"
              borderColor="whiteAlpha.800"
            />
            <Text pl={4} fontSize="lg">
              Bạn thông cảm đừng trả giá vì mẹ bán không lời nhiều. Khách quen
              mua riết là mẹ giảm giá à, bạn bè của con gái có khi mẹ còn lấy
              giá vốn.
            </Text>
            <Separator
              size="sm"
              width="100%"
              orientation="horizontal"
              borderColor="whiteAlpha.800"
            />
            <Text pl={4} fontSize="lg">
              Mẹ ship hàng theo phong cách "cận hiện đại". Nhắn Zalo/Facebook mẹ
              để chốt đơn rồi mẹ gửi anh Grab ruột giao qua cho bạn nhen.
            </Text>
          </VStack>

          {/* Right Section - Title */}
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="brand.300"
            textAlign={{ base: "center", md: "right" }}
            maxW={{ base: "full", md: "35%" }}
          >
            Nguyên tắc đi chợ
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
};

export default MarketRules;
