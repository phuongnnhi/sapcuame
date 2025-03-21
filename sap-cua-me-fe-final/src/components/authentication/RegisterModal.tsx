import { registerUser } from "@/app/authApi";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define validation schema
const schema = yup.object().shape({
  name: yup.string().required("Họ và tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: yup
    .string()
    .matches(/^\d{10,12}$/, "Số điện thoại phải có từ 10 đến 12 chữ số")
    .required("Số điện thoại không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
});

export const RegisterModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: any) => {
    try {
      const response = await registerUser(data);
      if (response?.user) {
        window.location.href = "/"; // Redirect to homepage or login page
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
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

        <form onSubmit={handleSubmit(handleRegister)}>
          <Stack gap="6">
            <Stack gap="5">
              {/* Name Field */}
              <Field.Root invalid={!!errors.name}>
                <Field.Label color="brand.500">Họ và tên</Field.Label>
                <Input {...register("name")} placeholder="Nhập họ và tên" />
                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
              </Field.Root>

              {/* Email Field */}
              <Field.Root invalid={!!errors.email}>
                <Field.Label color="brand.500">Email</Field.Label>
                <Input {...register("email")} placeholder="Nhập email" />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              {/* Phone Field */}
              <Field.Root invalid={!!errors.phone}>
                <Field.Label color="brand.500">Số điện thoại</Field.Label>
                <Input {...register("phone")} placeholder="Nhập số điện thoại" />
                <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
              </Field.Root>

              {/* Address Field */}
              <Field.Root invalid={!!errors.address}>
                <Field.Label color="brand.500">Địa chỉ</Field.Label>
                <Input {...register("address")} placeholder="Nhập địa chỉ" />
                <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
              </Field.Root>

              {/* Password Field */}
              <Field.Root invalid={!!errors.password}>
                <Field.Label color="brand.500">Mật khẩu</Field.Label>
                <PasswordInput {...register("password")} placeholder="Nhập mật khẩu" />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>
            </Stack>

            <HStack justify="space-between">
              <Checkbox defaultChecked>Đồng ý với điều khoản</Checkbox>
            </HStack>

            <Stack gap="4">
              <Button
                type="submit"
                loading={isSubmitting}
                bg="brand.500Alpha80"
              >
                Đăng ký
              </Button>
            </Stack>
          </Stack>
        </form>

        <Text textStyle="sm" color="brand.500" textAlign="center">
          Đã có tài khoản?{" "}
          <Link variant="underline" href="/dang-nhap">
            Đăng nhập
          </Link>
        </Text>
      </Stack>
    </Container>
  );
};