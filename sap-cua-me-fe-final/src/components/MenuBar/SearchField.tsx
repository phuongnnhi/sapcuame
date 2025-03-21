import { Icon, Input } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { InputGroup, type InputGroupProps } from '@/components/ui/input-group'
import { useState } from "react";
import { useRouter } from "next/navigation"; 

interface SearchFieldProps extends Omit<InputGroupProps, "children"> {
  onSearchChange?: (value: string) => void; // New prop to handle search
}

export const SearchField = ({ onSearchChange, ...props }: SearchFieldProps) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (onSearchChange) {
      onSearchChange(value); 
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      router.push(`san-pham?search=${encodeURIComponent(inputValue.trim())}`); 
    }
  };

  return (
    <InputGroup
      flex="1"
      maxW="md"
      startElement={
        <Icon size="sm" color="brand.700">
          <LuSearch />
        </Icon>
      }
      {...props}
    >
      <Input
        placeholder="Tìm kiếm sản phẩm"
        variant="subtle"
        borderRadius="lg"
        value={inputValue}
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  )
}
