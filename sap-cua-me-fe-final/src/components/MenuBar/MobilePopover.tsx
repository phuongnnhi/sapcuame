"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
} from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { NavbarLinks } from "./NavbarLinks";

export const MobilePopover = () => {
  return (
    <Popover.Root>
      <PopoverTrigger>
        <IconButton
          variant="plain"
          color="brand.50"
          aria-label="Open menu"
          size="lg"
        >
          <LuMenu />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent
        width="auto"
        maxW="250px"
        p={2}
        boxShadow="md"
        borderRadius="md"
        bg="brand.500"
      >
        <PopoverBody>
          <NavbarLinks direction="column" gap="4" />
        </PopoverBody>
      </PopoverContent>
    </Popover.Root>
  );
};
