"use clients"

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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toaster } from "../ui/toaster";
import { useRouter } from "next/navigation";

// Validation Schema
const schema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .required("Email hoặc Số điện thoại không được để trống")
    .test("is-email-or-phone", "Vui lòng nhập email hoặc số điện thoại hợp lệ", (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10,12}$/.test(value)
    ),
  password: yup.string().required("Mật khẩu không được để trống"),
});

export const LoginModal = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: any) => {
    try {
      const response = await loginUser({
        email: data.emailOrPhone.includes("@") ? data.emailOrPhone : undefined,
        phone: !data.emailOrPhone.includes("@") ? data.emailOrPhone : undefined,
        password: data.password,
      });

      if (response.token) {
        toaster.create({
          title: "Đăng nhập thành công!",
          description: "Bạn đã đăng nhập thành công.",
          type: "success",
          duration: 2000,
        });
        router.push("/");
      }
    } catch (error) {
      let errorMessage = "Vui lòng kiểm tra thông tin đăng nhập";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === "string"
      ) {
        errorMessage = (error as { response: { data: { message: string } } })
          .response.data.message;
      }
      toaster.create({
        title: "Đăng nhập thất bại",
        description: errorMessage,
        type: "error",
        duration: 3000,
      });
    }
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

        <form onSubmit={handleSubmit(handleLogin)}>
          <Stack gap="6">
            <Stack gap="5">
              {/* Email/Phone Field */}
              <Field.Root invalid={!!errors.emailOrPhone}>
                <Field.Label color="brand.500">
                  Email hoặc Số điện thoại
                </Field.Label>
                <Input
                  {...register("emailOrPhone")}
                  placeholder="Nhập email hoặc số điện thoại"
                  color="black"
                />
                <Field.ErrorText>{errors.emailOrPhone?.message}</Field.ErrorText>
              </Field.Root>

              {/* Password Field */}
              <Field.Root invalid={!!errors.password}>
                <Field.Label color="brand.500">Mật khẩu</Field.Label>
                <PasswordInput
                  {...register("password")}
                  placeholder="Nhập mật khẩu"
                  color="black"
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>
            </Stack>

            <HStack justify="space-between">
              <Checkbox defaultChecked>Nhớ cho lần sau</Checkbox>
            </HStack>

            <Stack gap="4">
              <Button type="submit" loading={isSubmitting} bg="brand.500Alpha80">
                Đăng nhập
              </Button>
            </Stack>
          </Stack>
        </form>

        <Text textStyle="sm" color="brand.500" textAlign="center">
          Chưa có tài khoản?{" "}
          <Link variant="underline" href="/dang-ky">
            Đăng ký
          </Link>
        </Text>
      </Stack>
    </Container>
  );
};