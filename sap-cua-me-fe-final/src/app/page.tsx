"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Box,
  Button,
  Container,
  Field,
  Flex,
  HStack,
  Heading,
  Input,
  Link,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { StorySection } from "@/components/Homepage/StorySection";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { Footer } from "@/components/Footer";
import { FeaturedProducts } from "@/components/Homepage/FeaturedProducts";
import MarketRules from "@/components/Homepage/MarketRules";
import { BestSellers } from "@/components/Homepage/BestSellers";

export default function Page() {
  return (
    <Stack flex="1" gap="10">
          <MenuBlock/>
          <HeroSection />
          <StorySection/>
          <FeaturedProducts/>
          <MarketRules/>
          <BestSellers/>
          <Footer />
        </Stack>
  );
}