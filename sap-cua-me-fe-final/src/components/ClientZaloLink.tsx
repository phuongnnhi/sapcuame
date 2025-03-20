"use client"; // Ensure this component runs only on the client

import { useBreakpointValue, Link, Image, HStack, Text } from "@chakra-ui/react";

export const ClientZaloLink = () => {
  const zaloLink = useBreakpointValue({
    base: "https://zalo.me/0395192877",
    md: "https://chat.zalo.me/?phone=0395192877",
  });

  return (
    <HStack gap="3" align="center">
      <Text color="brand.50" textStyle="lg">Nhắn má Phương qua</Text>
      <Link href={zaloLink} target="_blank" rel="noopener noreferrer">
        <Image src="/images/zalo-icon.png" alt="Zalo Icon" boxSize="80px" style={{ cursor: "pointer" }} />
      </Link>
    </HStack>
  );
};