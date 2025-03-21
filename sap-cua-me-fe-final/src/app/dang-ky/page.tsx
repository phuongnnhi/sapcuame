"use client";

import { Box, Stack } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/Authentication/RegisterModal";

export default function Page() {
  return (
    <Stack flex="1" gap="10">
      <RegisterModal/>
      <Box id="lien-he">
        <Footer />
      </Box>
    </Stack>
  );
}
