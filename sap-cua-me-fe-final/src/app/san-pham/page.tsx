import { Footer } from "@/components/Footer";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { ProductPage } from "@/components/Product/ProductPage";
import { Spinner, Stack } from "@chakra-ui/react";
import { Suspense } from "react";

export default function AllProductsPage() {
    return (
      <Stack flex="1" gap="10">
            <MenuBlock/>
            <Suspense fallback={<Spinner />}>
          <ProductPage />
        </Suspense>
            <Footer />
          </Stack>
    );
  }