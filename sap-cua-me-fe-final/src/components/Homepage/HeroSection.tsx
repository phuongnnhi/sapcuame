import { Box, Image } from "@chakra-ui/react";

export const HeroSection = () => {
  return (
    <Box
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 8}}
      height="100vh" 
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src="/images/chothinghe.png"
        alt="Chợ Thị Nghè"
        borderRadius="lg"
        maxH="100%" 
        maxW="90%" 
        objectFit="contain"
      />
    </Box>
  );
};