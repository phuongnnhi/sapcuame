import { Box, Container, HStack } from '@chakra-ui/react'
import { Logo } from '../../constants/logo'
import { NotificationPopover } from './notification-popover'
import { SearchField } from './search-field'
import { SearchPopover } from './search-popover'
import { UserMenu } from './user-menu'
import { MobilePopover } from './mobile-popover'
import { NavbarLinks } from './navbar-links'

export const MenuBlock = () => {
  return (
    <Box position="sticky" top="5" zIndex="1000" borderBottomWidth="1px" bg="brand.700Alpha80" mx={{base:"8", md:"16"}} mt="10" py="0.7" px={{base:"4", md:'8'}} borderRadius="15px">
      <Container py={{ base: '3.5', md: '4' }} >
        <HStack justify="space-between">
          <HStack gap={{ base: '4', md: '10' }}>
            <MobilePopover>
              <NavbarLinks />
            </MobilePopover>
            <Logo />
            <NavbarLinks hideBelow="md" />
          </HStack>
          <HStack gap={{ base: '2', md: '4' }}>
            <SearchField hideBelow="lg" />
            <HStack gap={{ base: '2', md: '3' }}>
              <SearchPopover hideFrom="lg" />
              <NotificationPopover />
              <UserMenu />
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}
