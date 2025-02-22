import { Box, Container, Flex, Text, VStack, Separator, Heading } from "@chakra-ui/react";

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
        bg="blackAlpha.600"
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
            color="white"
          >
            <Text pl={4} fontSize="lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea"
            </Text>
            <Separator size="sm" width="100%" orientation="horizontal" borderColor="whiteAlpha.800" />
            <Text pl={4} fontSize="lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea"
            </Text>
            <Separator size="sm" width="100%" orientation="horizontal" borderColor="whiteAlpha.800" />
            <Text pl={4} fontSize="lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea"
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