"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Box,
  Button,
  Container,
  Field,
  Flex,
  HStack,
  Heading,
  Input,
  Link,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsApple, BsGoogle, BsKeyFill, BsLinkedin } from "react-icons/bs";
import { LuExternalLink } from "react-icons/lu";
import { ImagePlaceholder } from "@/components/authentication/image-placeholder";
import { SocialLoginButton } from "@/components/authentication/social-login-button";

import { ColorModeToggle } from "@/components/color-mode-toggle";

export default function Page() {
  return (
    <Box height={{ base: "auto", lg: "100vh" }} display="flex" position="relative">
      <Box position="absolute" top="4" right="4">
        <ColorModeToggle />
      </Box>

      <Flex height="full" flex="1">
        <Box flex="1" display={{ base: "none", lg: "block" }}>
          <ImagePlaceholder />
        </Box>
        <Box flex="1.5" py={{ base: "24", md: "32" }}>
          <Container maxW="md">
            <Stack gap="8">
              <Stack gap={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={{ base: "2xl", md: "3xl" }}>
                  Sign in to Chakra
                </Heading>
                <Text color="fg.muted">
                  Start using Chakra in your projects
                </Text>
              </Stack>

              <Stack gap="6">
                <Stack gap="5">
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input type="email" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <PasswordInput />
                  </Field.Root>
                </Stack>

                <HStack justify="space-between" textStyle="sm" fontWeight="medium">
                  <Link variant="plain">Forgot password?</Link>
                  <Link>
                    Help <LuExternalLink />
                  </Link>
                </HStack>

                <Stack gap="4">
                  <Button>Sign in</Button>
                  <Text textStyle="sm" color="fg.muted">
                    By signing in, you agree to our{" "}
                    <Link variant="underline" href="#">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link variant="underline" href="#">
                      Privacy Policy
                    </Link>
                  </Text>
                </Stack>

                <Checkbox defaultChecked>Keep me signed in</Checkbox>
              </Stack>

              <HStack gap="6">
                <Separator />
                <Text textStyle="sm" color="fg.muted" whiteSpace="nowrap">
                  or continue with
                </Text>
                <Separator />
              </HStack>

              <HStack wrap="wrap" justify="space-around">
                <SocialLoginButton icon={<BsKeyFill />}>SSO</SocialLoginButton>
                <SocialLoginButton icon={<BsGoogle />}>Google</SocialLoginButton>
                <SocialLoginButton icon={<BsApple />}>Apple</SocialLoginButton>
                <SocialLoginButton icon={<BsLinkedin />}>
                  LinkedIn
                </SocialLoginButton>
              </HStack>
            </Stack>
          </Container>
        </Box>
      </Flex>
    </Box>
  );
}