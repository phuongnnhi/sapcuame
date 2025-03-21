// src/app/provider.tsx
"use client";

import { ChakraProvider, Box } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import system from "../theme"; // Adjust the path if necessary
import { CartProvider } from "@/components/CartContext";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider defaultTheme="light" attribute="class" disableTransitionOnChange>
      <CartProvider>
      <Box bg="brand.50" w="100vw" h="100vh" minH="100vh">
        {children}
      </Box>
      </CartProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}