import { Box, Grid, Text, Heading, Container } from "@chakra-ui/react";

const categories = [
  { name: "Chăm sóc mặt", image: "/images/category.jpg" },
  { name: "Chăm sóc da", image: "/images/category1.jpg" },
  { name: "Chăm sóc cơ thể", image: "/images/category2.jpg" },
  { name: "Chăm sóc tóc", image: "/images/category3.jpg" },
  { name: "Nội y", image: "/images/category4.jpg" },
];

const CategorySection = () => {
  return (
    <Container maxW="7xl" py="10">
      <Box bg="brand.500Alpha80" py="10" borderRadius="2xl">
        <Container maxW="7xl">
          <Heading textAlign="center" color="white" mb="8" fontSize="3xl">
            Tìm theo quầy hàng
          </Heading>

          <Grid
            templateColumns="repeat(3, 1fr)" // 3 equal columns
            templateRows="repeat(2, 200px)" // 2 rows with fixed height
            gap={6}
          >
            {/* Row 1 - 1:2 Ratio */}
            <Box
              gridColumn="span 1" // Takes 1 column
              {...categoryStyle(categories[0])}
            />
            <Box
              gridColumn="span 2" // Takes 2 columns
              {...categoryStyle(categories[1])}
            />

            {/* Row 2 - 3 Equal Columns */}
            <Box {...categoryStyle(categories[2])} />
            <Box {...categoryStyle(categories[3])} />
            <Box {...categoryStyle(categories[4])} />
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

// Reusable style function for category items
const categoryStyle = (category: { name: string; image: string }) => ({
    position: "relative",
    borderRadius: "xl",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    _hover: { transform: "scale(1.05)", transition: "0.3s ease-in-out" },
    children: (
      <>
        {/* Background layer with brightness filter */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundImage={`url(${category.image})`}
          backgroundSize="cover"
          backgroundPosition="center"
          filter="brightness(0.5)"
        />
        {/* Text layer unaffected by the filter */}
        <Text
          position="absolute"
          top="20px"
          left="20px"
          color="white"
          fontSize="2xl"
          fontWeight="bold"
          textAlign="left"
          zIndex="1" // Ensures text appears above the background
        >
          {category.name}
        </Text>
      </>
    ),
  });

export default CategorySection;