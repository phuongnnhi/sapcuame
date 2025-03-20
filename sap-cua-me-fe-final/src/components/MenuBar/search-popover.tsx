import {
  IconButton,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Popover
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { SearchField } from "./search-field";

interface SearchPopoverProps {
  onSearchChange?: (value: string) => void;
}

export const SearchPopover = ({ onSearchChange, ...props }: SearchPopoverProps) => {
  return (
    <Popover.Root>
      <PopoverTrigger>
        <IconButton
          variant="plain"
          color="brand.50"
          rounded="full"
          colorScheme="gray"
          aria-label="Search"
          {...props}
        >
          <LuSearch />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent maxW="200px" p={0}>
        <PopoverBody p={0}>
          <SearchField onSearchChange={onSearchChange} />
        </PopoverBody>
      </PopoverContent>
    </Popover.Root>
  );
};