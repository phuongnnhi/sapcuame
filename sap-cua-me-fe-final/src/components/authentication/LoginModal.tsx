import { loginUser } from "@/app/authApi";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Button,
  Container,
  Field,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";

export const LoginModal = () => {
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginUser({
        email: credentials.emailOrPhone.includes("@")
          ? credentials.emailOrPhone
          : undefined,
        phone: !credentials.emailOrPhone.includes("@")
          ? credentials.emailOrPhone
          : undefined,
        password: credentials.password,
      });

      if (response.token) {
        toaster.create({
          title: "Đăng nhập thành công!",
          description: "Bạn đã đăng nhập thành công.",
          type: "success",
          duration: 2000,
        });
        window.location.href = "/"; // Redirect to homepage
      }
    } catch (error: any) {
      toaster.create({
        title: "Đăng nhập thất bại",
        description:
          error.response?.data?.message ||
          "Vui lòng kiểm tra thông tin đăng nhập",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxW="md" py={{ base: "12", md: "24" }}>
      <Stack gap="8">
        <Stack gap={{ base: "2", md: "3" }} textAlign="center">
          <Heading color="brand.500" size={{ base: "2xl", md: "3xl" }}>
            Chào mừng các tình iu
          </Heading>
          <Text color="fg.muted">Quay lại thăm Sạp của mẹ</Text>
        </Stack>

        <Stack gap="6">
          <Stack gap="5">
            <Field.Root>
              <Field.Label color="brand.500">Email hoặc Số điện thoại</Field.Label>
              <Input
                type="text"
                placeholder="Nhập email hoặc số điện thoại"
                value={credentials.emailOrPhone}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    emailOrPhone: e.target.value,
                  })
                }
              />
            </Field.Root>
            <Field.Root>
              <Field.Label color="brand.500">Mật khẩu</Field.Label>
              <PasswordInput
                name="password"
                placeholder="Nhập mật khẩu"
                value={credentials.password}
                onChange={handleChange}
              />
            </Field.Root>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Nhớ cho lần sau</Checkbox>
          </HStack>
          <Stack gap="4">
            <Button onClick={handleLogin} bg="brand.500Alpha80">Đăng nhập</Button>
          </Stack>
        </Stack>

        <Text textStyle="sm" color="fg.muted" textAlign="center">
          Chưa có tài khoản?{" "}
          <Link variant="underline" href="/dang-ky">
            Đăng ký
          </Link>
        </Text>
      </Stack>
    </Container>
  );
};
