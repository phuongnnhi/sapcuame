import { PopoverContent, PopoverRoot, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { IconButton, PopoverBody } from '@chakra-ui/react'
import { LuShoppingCart } from 'react-icons/lu'

export const NotificationPopover = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <IconButton variant="ghost" rounded="full" color="brand.300"  _hover={{
            bg: 'brand.500', // Background color on hover
            color: 'brand.50', // Icon color on hover
          }}>
          <LuShoppingCart />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent maxW="fit-content">
        <PopoverBody>
          <PopoverTitle fontWeight="medium">Notifications</PopoverTitle>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
