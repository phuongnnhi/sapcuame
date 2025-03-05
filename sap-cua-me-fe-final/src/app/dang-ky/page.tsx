"use client";

import { Box, Stack } from "@chakra-ui/react";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/authentication/RegisterModal";

export default function Page() {
  return (
    <Stack flex="1" gap="10">
      <MenuBlock />
      <RegisterModal/>
      <Box id="lien-he">
        <Footer />
      </Box>
    </Stack>
  );
}
