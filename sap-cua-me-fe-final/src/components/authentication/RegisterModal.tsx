import { registerUser } from "@/app/authApi";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Button,
  Container,
  Field,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";

export const RegisterModal = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await registerUser({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password,
      });

      if (response?.user) {
        toaster.create({
          title: "Đăng ký thành công!",
          description: "Bạn đã tạo tài khoản thành công. Vui lòng đăng nhập.",
          type: "success",
          duration: 2000,
        });
        window.location.href = "/"; // Redirect to homepage or login page
      }
    } catch (error: any) {
      toaster.create({
        title: "Đăng ký thất bại",
        description:
          error.response?.data?.message ||
          "Vui lòng kiểm tra thông tin và thử lại",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxW="md" py={{ base: "12", md: "24" }}>
      <Stack gap="8">
        <Stack gap={{ base: "2", md: "3" }} textAlign="center">
          <Heading color="brand.500" size={{ base: "2xl", md: "3xl" }}>
            Đăng ký tài khoản
          </Heading>
          <Text color="fg.muted">Bắt đầu thăm quan Sạp của mẹ</Text>
        </Stack>

        <Stack gap="6">
          <Stack gap="5">
            <Field.Root>
              <Field.Label color="brand.500">Họ và tên</Field.Label>
              <Input
                type="text"
                placeholder="Nhập họ và tên"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label color="brand.500">Email</Field.Label>
              <Input
                type="email"
                placeholder="Nhập email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label color="brand.500">Số điện thoại</Field.Label>
              <Input
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label color="brand.500">Địa chỉ</Field.Label>
              <Input
                type="text"
                placeholder="Nhập địa chỉ"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label color="brand.500">Mật khẩu</Field.Label>
              <PasswordInput
                name="password"
                placeholder="Nhập mật khẩu"
                value={user.password}
                onChange={handleChange}
              />
            </Field.Root>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Đồng ý với điều khoản</Checkbox>
          </HStack>
          <Stack gap="4">
            <Button onClick={handleRegister} bg="brand.500Alpha80">
              Đăng ký
            </Button>
          </Stack>
        </Stack>

        <Text textStyle="sm" color="fg.muted" textAlign="center">
          Đã có tài khoản?{" "}
          <Link variant="underline" href="#">
            Đăng nhập
          </Link>
        </Text>
      </Stack>
    </Container>
  );
};