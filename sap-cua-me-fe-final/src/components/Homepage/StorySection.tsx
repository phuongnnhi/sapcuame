import { Box, Flex, Heading, Text, Image, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const StorySection = () => {
  return (
    <Box
      backgroundImage="url('/images/hoagiay.png')"
      backgroundSize="contain"
      backgroundPosition="left top"
      backgroundRepeat="no-repeat"
      py="10"
    >
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
            minH={{ base: "auto", md: "300px" }}
            textAlign={{ base: "center", md: "left" }}
            // marginLeft="20"
            // marginRight="20"
          >
            <Heading fontSize={{ base: "2xl", md: "3xl" }} mb="4">
              Câu chuyện của mẹ
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Cái sạp chợ là tài sản gia truyền từ bà ngoại để lại cho mẹ. Cái
              sạp của bà ngoại nuôi mẹ lớn lên, rồi đến cái sạp của mẹ nuôi hai
              anh em mình lớn lên.<br /><br />Hồi lúc mới mở cửa giao thương mẹ bán đắt dữ
              lắm. Mẹ kể nhà hàng năm sao nào ở Sài Gòn mẹ cũng đã từng ăn, nhà
              mình cũng là nhà đầu tiên trong xóm có tivi. Sau này mọi người ít
              đến chợ truyền thống hơn, hàng bán chậm hơn, nhưng mà mẹ không bỏ
              chợ được. <br /><br />Mẹ có những khách quen, có những bác ở nước ngoài nhưng
              cũng chỉ mua đồ của mẹ, mẹ tìm thấy niềm vui trong việc nói chuyện
              với mọi người và gợi ý những sản phẩm mà người nhà mẹ đang dùng.
              <br /><br />
              30 năm qua, chợ là một phần của mẹ, và không có gì có thể thay đổi điều đó. 
            </Text>
          </Box>

          {/* Stacked Images with Scroll Animation */}
          <Box
            flex="1"
            position="relative"
            height={{ base: "300px", md: "500px" }}
          >
            {[
              "/images/story2.png",
              "/images/story.png",
              "/images/story1.png",
            ].map((src, index) => (
              <MotionBox
                key={src}
                position="absolute"
                top={{ base: `${index * 5}%`, md: `${index * 10}%` }}
                left={{ base: `${index * 3}%`, md: `${index * 10}%` }}
                width={{ base: "80%", md: "70%" }}
                height="auto" // Maintain aspect ratio
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.5, // Staggered animation
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
            ))}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
