"use client";

import { Box, Stack } from "@chakra-ui/react";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { StorySection } from "@/components/Homepage/StorySection";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { Footer } from "@/components/Footer";
import { FeaturedProducts } from "@/components/Homepage/FeaturedProducts";
import MarketRules from "@/components/Homepage/MarketRules";
import { BestSellers } from "@/components/Homepage/BestSellers";
import CategorySection from "@/components/Homepage/CategorySection";

export default function Page() {
  return (
    <Stack flex="1" gap="10">
      <MenuBlock />
      <HeroSection />
      <Box id="story-section">
        <StorySection />
      </Box>
      <Box id="me-goi-y">
        <FeaturedProducts />
      </Box>
      <MarketRules />
      <BestSellers />
      <CategorySection />
      <Box id="lien-he">
        <Footer />
      </Box>
    </Stack>
  );
}
