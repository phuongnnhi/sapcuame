import CartPage from "@/components/Cart/CartPage";
import { Footer } from "@/components/Footer";
import { MenuBlock } from "@/components/MenuBar/MenuBlock";
import { Stack } from "@chakra-ui/react";

export default function AllProductsPage() {
    return (
      <Stack flex="1" gap="10">
            <MenuBlock/>
            <CartPage/>
            <Footer />
          </Stack>
    );
  }