import { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

type Tag = {
  id: number;
  label: string;
  x: number;
  y: number;
  description: string;
  imageSrc: string;
};

const tagData: Tag[] = [
  {
    id: 1,
    label: "Khu ẩm thực",
    x: 10,
    y: 70,
    description:
      "Bún bò, bún riêu cua, và cơm tấm ở chợ là một trong những nơi ngon nhất mình từng ăn. Mấy cô chú cho siêu nhiều bổi mà giá thì 3-4 chục nghìn thui.",
    imageSrc: "/images/hero/amthuc.jpg",
  },
  {
    id: 2,
    label: "Khu thịt tươi",
    x: 30,
    y: 60,
    description: "Khu thịt tươi cung cấp các loại thịt bò, heo, gà tươi ngon.",
    imageSrc: "/images/hero/thittuoi.jpg",
  },
  {
    id: 3,
    label: "Khu tôm cá",
    x: 40,
    y: 80,
    description:
      "Sáng nào khu dưới chân cầu Thị Nghè cũng nhộn nhịp những người đi lựa hải sản tươi sống.",
    imageSrc: "/images/hero/haisan.png",
  },
  {
    id: 4,
    label: "Khu quần áo lụa là",
    x: 50,
    y: 40,
    description:
      "Hầu hết tủ đồ của mình đều từ đây mà ra, đến khi đi du học vẫn mang quần jean mua ở chợ.",
    imageSrc: "/images/hero/quanao.jpg",
  },
  {
    id: 5,
    label: "Khu mỹ phẩm",
    x: 70,
    y: 55,
    description:
      "Tất tần tật tất cả mọi thứ từ mỹ phẩm, dầu gội, sữa tắm, đến đồ trong.",
    imageSrc: "/images/hero/mypham.jpg",
  },
  {
    id: 6,
    label: "Khu bán trái cây",
    x: 85,
    y: 70,
    description:
      "Các quầy trái cây nằm ngay lối vào của chợ, trông tươi ngon vô cùng.",
    imageSrc: "/images/hero/traicay.jpg",
  },
];

export const HeroSection = () => {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogPosition, setDialogPosition] = useState<{
    top: string;
    left: string;
  }>({ top: "0", left: "0" });

  const handleTagHover = (tag: Tag) => {
    setSelectedTag(tag);
    setIsOpen(true);

    const screenWidth = window.innerWidth;
    const dialogWidth = 320;
    const tagPositionX = (screenWidth * tag.x) / 100;

    // Check if there’s enough space to the right, otherwise move left
    const adjustedLeft =
      tagPositionX + dialogWidth > screenWidth
        ? `${tag.x - 30}%`
        : `${tag.x + 5}%`; // Default to right

    setDialogPosition({
      top: `${tag.y}%`,
      left: adjustedLeft,
    });
  };

  return (
    <Box
      position="relative"
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 8 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {/* Image Wrapper */}
      <Box position="relative" maxW="90%" display="inline-block">
        <Image
          src="/images/chothinghe.png"
          alt="Chợ Thị Nghè"
          borderRadius="lg"
          maxH="100%"
          maxW="100%"
          objectFit="contain"
        />

        {/* Render Tags as Labels with Dots */}
        {tagData.map((tag) => (
          <Box
            key={tag.id}
            position="absolute"
            top={`${tag.y}%`}
            left={`${tag.x}%`}
            transform="translate(-50%, -50%)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            onMouseEnter={() => handleTagHover(tag)}
            onMouseLeave={() => setSelectedTag(null)}
            cursor="pointer"
          >
            {/* Connector Dot */}
            <Box
              width="10px"
              height="10px"
              bg="brand.50"
              borderRadius="50%"
              mb="4px"
            ></Box>

            {/* Label Box */}
            <Box
              bg="rgba(255, 255, 255, 0.9)"
              color="gray.700"
              px={{ base: 3, md: 6 }}
              py={{ base: 2, md: 4 }}
              borderRadius="xl"
              boxShadow="md"
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="medium"
              whiteSpace="nowrap"
              _hover={{ bg: "gray.200" }}
            >
              {tag.label}
            </Box>
          </Box>
        ))}

        {/* Dialog positioned slightly outside the image */}
        {isOpen && selectedTag && (
          <Box
            position="absolute"
            top={dialogPosition.top}
            left={dialogPosition.left}
            zIndex={20}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
            gap="4"
            bg="rgba(253, 250, 255, 0.95)"
            boxShadow="lg"
            borderRadius="lg"
            p="4"
            maxW={{ base: "250px", md: "320px" }}
            minH={{ base: "100px", md: "120px" }}
          >
            {/* Image on the left */}
            <Image
              src={selectedTag.imageSrc}
              alt={selectedTag.label}
              borderRadius="md"
              width={{ base: "150px", md: "100px" }}
              height={{ base: "80px", md: "120px" }}
              objectFit="cover"
              // mr={4}
            />

            {/* Text content on the right */}
            <Box flex="1">
              <Text fontWeight="bold" color="brand.500" fontSize="md">
                {selectedTag.label}
              </Text>
              <Text fontSize="sm" mt={2} color="gray.700">
                {selectedTag.description}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
