import { Icon, Input } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { InputGroup, type InputGroupProps } from '@/components/ui/input-group'

export const SearchField = (props: Omit<InputGroupProps, 'children'>) => {
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
      <Input placeholder="Search" variant="subtle" borderRadius="lg" />
    </InputGroup>
  )
}
