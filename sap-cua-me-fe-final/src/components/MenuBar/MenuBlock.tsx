"use client";
import { useEffect, useState } from "react";
import { Box, Container, HStack, Image } from "@chakra-ui/react";
import { NotificationPopover } from "./notification-popover";
import { SearchField } from "./search-field";
import { SearchPopover } from "./search-popover";
import { UserMenu } from "./user-menu";
// import { MobilePopover } from './mobile-popover'
import { NavbarLinks } from "./navbar-links";
import Link from "next/link";

export const MenuBlock = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  useEffect(() => {
    const threshold = 10; // change this value to adjust sensitivity
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isScrollingDownEnough = currentScrollPos - prevScrollPos > threshold;
  
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
      position="sticky"
      top="5"
      zIndex="1000"
      bg="brand.700Alpha80"
      backdropFilter="blur(10px)"
      mx={{ base: "8", md: "16" }}
      mt="10"
      py="0.7"
      px={{ base: "4", md: "8" }}
      borderRadius="15px"
      transform={visible ? 'translateY(5px)' : 'translateY(-125%)'}
      transition="transform 0.3s ease-in-out"
    >
      <Container py={{ base: "3.5", md: "4" }}>
        <HStack justify="space-between">
          <HStack gap={{ base: "4", md: "10" }}>
            {/* <MobilePopover>
              <NavbarLinks />
            </MobilePopover> */}
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
            <SearchField hideBelow="lg" />
            <HStack gap={{ base: "2", md: "3" }}>
              <SearchPopover hideFrom="lg" />
              <NotificationPopover />
              <UserMenu />
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
