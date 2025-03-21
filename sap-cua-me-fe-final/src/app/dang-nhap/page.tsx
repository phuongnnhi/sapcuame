"use client";

import { Box, Stack } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { LoginModal } from "@/components/Authentication/LoginModal";

export default function Page() {
  return (
    <Stack flex="1" gap="10">
      <LoginModal />
      <Box id="lien-he">
        <Footer />
      </Box>
    </Stack>
  );
}
