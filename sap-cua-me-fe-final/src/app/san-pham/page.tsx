import { Footer } from "@/components/Footer";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { ProductPage } from "@/components/Product/ProductPage";
import { Stack } from "@chakra-ui/react";

export default function AllProductsPage() {
    return (
      <Stack flex="1" gap="10">
            <MenuBlock/>
            <ProductPage/>
            <Footer />
          </Stack>
    );
  }