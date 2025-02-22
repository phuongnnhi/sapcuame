import { Box, Flex, Heading, Text, Image, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const StorySection = () => {
  return (
    <Container maxW="7xl" py="10">
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      gap={{ base: "8", md: "16" }}
    >
      {/* Story Box */}
      <Box
        bg="brand.700"
        borderRadius="2xl"
        p={{ base: "6", md: "10" }}
        flex="1"
        color="brand.50"
        minH="300px"
        // marginLeft="20"
        // marginRight="20"
      >
        <Heading fontSize={{ base: "2xl", md: "3xl" }} mb="4">
          Câu chuyện của mẹ
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }}>
          Nơi mẹ gửi gắm tình thương, từng món hàng đều là tâm huyết. Chợ không
          chỉ là nơi buôn bán mà còn là nơi kết nối những câu chuyện đời thường.
        </Text>
      </Box>

      {/* Stacked Images with Scroll Animation */}
      <Box flex="1" position="relative" height={{ base: "300px", md: "500px" }}>
        {["/images/story2.png", "/images/story.png", "/images/story1.png"].map(
          (src, index) => (
            <MotionBox
              key={src}
              position="absolute"
              top={index * 10} // Adjust vertical stacking
              left={index * 10} // Adjust horizontal stacking
              zIndex={index} // Ensure proper stacking order
              width={{ base: "250px", md: "400px" }}
              height={{ base: "300px", md: "520px" }}
              overflow="hidden"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.5, // Stagger the animation
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src={src}
                alt={`Story image ${index + 1}`}
                objectFit="cover"
                w="full"
                h="full"
              />
            </MotionBox>
          )
        )}
      </Box>
    </Flex>
    </Container>
  );
};
