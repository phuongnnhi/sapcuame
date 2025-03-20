"use client";
import { useEffect, useState } from "react";
import { Box, Container, HStack, IconButton, Image } from "@chakra-ui/react";
import { SearchField } from "./search-field";
import { SearchPopover } from "./search-popover";
import { UserMenu } from "./user-menu";
import { useCallback } from "react";
// import { MobilePopover } from './mobile-popover'
import { NavbarLinks } from "./navbar-links";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { getProducts } from "@/app/apiFunctions";
import { MobilePopover } from "./mobile-popover";

export const MenuBlock = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

// Fetch products when search term changes
const fetchProducts = useCallback(async (search: string) => {
  try {
    await getProducts({ search });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}, []);

// Call fetchProducts when searchTerm changes
useEffect(() => {
  if (searchTerm.trim().length > 0) {
    fetchProducts(searchTerm);
  }
}, [searchTerm, fetchProducts]);

  useEffect(() => {
    const threshold = 10; // change this value to adjust sensitivity
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isScrollingDownEnough =
        currentScrollPos - prevScrollPos > threshold;

      if (isScrollingUp || currentScrollPos < 10) {
        setVisible(true);
      } else if (isScrollingDownEnough) {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <Box
      data-testid="menu-block"
      position="sticky"
      top="5"
      zIndex="1000"
      bg="brand.700Alpha80"
      backdropFilter="blur(10px)"
      mx={{ base: "0", md: "16" }}
      mt="10"
      py="0.7"
      px={{ base: "4", md: "8" }}
      borderRadius="15px"
      transform={visible ? "translateY(5px)" : "translateY(-125%)"}
      transition="transform 0.3s ease-in-out"
    >
      <Container py={{ base: "3.5", md: "4" }}>
        <HStack justify="space-between">
          <HStack gap={{ base: "4", md: "10" }}>
            <Box display={{ base: "block", md: "none" }}>
              <MobilePopover />
            </Box>
            <Link href="/">
              <Image
                src="/images/logo_chu.png"
                alt="Logo"
                height="60px"
                width="200px"
                objectFit="cover"
              />
            </Link>
            <NavbarLinks hideBelow="md" />
          </HStack>
          <HStack gap={{ base: "2", md: "4" }}>
            <SearchField
              hideBelow="lg"
              onSearchChange={(value) => setSearchTerm(value)}
            />
            <HStack gap={{ base: "2", md: "3" }}>
              <Box display={{ base: "block", lg: "none" }}>
                <SearchPopover />
              </Box>
              <Link href="/gio-hang" passHref>
                <IconButton
                  variant="ghost"
                  rounded="full"
                  color="brand.300"
                  _hover={{
                    bg: "brand.500", // Background color on hover
                    color: "brand.50", // Icon color on hover
                  }}
                >
                  <LuShoppingCart />
                </IconButton>
              </Link>
              <UserMenu />
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
