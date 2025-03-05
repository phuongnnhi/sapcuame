"use client";

import { Box, Stack } from "@chakra-ui/react";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { Footer } from "@/components/Footer";
import { LoginModal } from "@/components/authentication/LoginModal";

export default function Page() {
  return (
    <Stack flex="1" gap="10">
      <MenuBlock />
      <LoginModal />
      <Box id="lien-he">
        <Footer />
      </Box>
    </Stack>
  );
}
