import { Inter } from "next/font/google"
import { Provider } from "./provider"
import { MenuBlock } from "@/components/MenuBar/MenuBlock"
import { ChakraProvider, Box } from '@chakra-ui/react';
import '../global.css';
import { Footer } from "@/components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body >
        <Provider>
        <Box flex="1">{children}</Box>
        </Provider>
      </body>
    </html>
  )
}