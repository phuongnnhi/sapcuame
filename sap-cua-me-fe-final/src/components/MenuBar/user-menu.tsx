"use client"
import { MenuContent, MenuItem, MenuRoot, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import { Avatar, Button, Icon} from '@chakra-ui/react'
import { useState } from 'react';
import { LuCircleHelp, LuLogOut, LuSettings, LuUser } from 'react-icons/lu'
import { BiSolidUserCircle } from "react-icons/bi";


export const UserMenu = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);


  return (
    <>
      {isLoggedIn ? (
        <MenuRoot positioning={{ placement: 'bottom' }}>
          <MenuTrigger>
          <Icon rounded="full" fontSize="35px" color="brand.300" cursor="pointer">
          <BiSolidUserCircle/>
</Icon>
          </MenuTrigger>
          <MenuContent>
            {/* <MenuItem value="profile">
              <LuUser />
              Profile
            </MenuItem>
            <MenuItem value="settings">
              <LuSettings />
              Settings
            </MenuItem>
            <MenuSeparator /> */}
            <MenuItem value="logout" onClick={handleLogout}>
              <LuLogOut />
              Logout
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      ) : (
        <Button
          colorScheme="orange"
          bg="brand.500"
          color="brand.50"
          _hover={{ bg: 'brand.700' }}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      )}
    </>
  );
};