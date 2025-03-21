"use client";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Button, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuLogOut, LuPackage } from "react-icons/lu";
import { BiSolidUserCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/authApi";
import Link from "next/link";

export const UserMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      router.push("/dang-nhap");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <MenuRoot positioning={{ placement: "bottom" }}>
          <MenuTrigger>
            <Icon
              rounded="full"
              fontSize="35px"
              color="brand.300"
              cursor="pointer"
            >
              <BiSolidUserCircle />
            </Icon>
          </MenuTrigger>
          <MenuContent>
            <Link href="/don-hang">
              <MenuItem value="don-hang">
                <LuPackage />
                Đơn hàng
              </MenuItem>
            </Link>
            <MenuSeparator />
            <MenuItem value="logout" onClick={handleLogout}>
              <LuLogOut />
              Đăng xuất
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      ) : (
        <Button
          colorScheme="orange"
          bg="brand.500"
          color="brand.50"
          _hover={{ bg: "brand.700" }}
          onClick={() => router.push("/dang-nhap")}
        >
          Đăng nhập
        </Button>
      )}
    </>
  );
};
