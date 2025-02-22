import { Logo } from "@/constants/logo";
import {
  AspectRatio,
  Container,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  Heading,
  Image,
  Flex
} from "@chakra-ui/react"; 

export const Footer = () => (
  <Container
    as="footer"
    // py={{ base: "10", md: "12" }}
    bg="brand.700"
    maxW="100%"
    w="full"
  >
    <Container maxW="7xl" py="10" mt="10">
    <Stack gap="6" px={{ base: "4", md: "8", lg: "16" }}>
      <Stack direction="row" justify="space-between" align="center">
        <Stack> 
        <Flex
        direction={{ base: "column"}}
        justify="center"
        align="center"
        gap={{ base: "6" }}
        w="full"
      >
          <Image
              src="/images/sapcuame_logo.png" 
              alt="Logo"
              height="150px" 
              width="300px" 
              objectFit="cover"
            />
            <HStack gap="3" align="center">
          <Text color="brand.50" textStyle="lg">Nhắn má Phương qua</Text>
          <Link
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/zalo-icon.png"
              alt="Zalo Icon"
              boxSize="80px"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </HStack>
        </Flex>
        </Stack>
        <Stack w="full" maxW="400px">
          <Heading color="brand.50" fontSize="3xl" mb="4">Ghé chợ tham quan</Heading>
          <AspectRatio ratio={16 / 9} minH="400px">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1550.7387751269912!2d106.70648514137784!3d10.792022826998995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b3b0a055c7%3A0xce3436392c0b8e03!2sThi%20Nghe%20Market!5e0!3m2!1sen!2sbe!4v1740217962039!5m2!1sen!2sbe"
              style={{ border: 0, borderRadius: "16px" }}
            />
          </AspectRatio>
        </Stack>
      </Stack>
      <Text fontSize="sm" color="brand.50">
        &copy; {new Date().getFullYear()} Logo, Inc. All rights reserved.
      </Text>
    </Stack>
    </Container>
  </Container>
);
