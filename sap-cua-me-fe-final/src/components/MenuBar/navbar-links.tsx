import { Link, Stack, type StackProps } from '@chakra-ui/react'

export const NavbarLinks = (props: StackProps) => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
        <Link
          fontWeight="medium"
          color="brand.300"
          href= "/#story-section"
          _hover={{
            _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
          }}
          _currentPage={{ color: 'colorPalette.fg' }}
        >
          Chuyện chợ
        </Link>
        <Link
          fontWeight="medium"
          color="brand.300"
          href="/#me-goi-y"
          _hover={{
            _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
          }}
          _currentPage={{ color: 'colorPalette.fg' }}
        >
          Mẹ gợi ý
        </Link>
        <Link
          fontWeight="medium"
          color="brand.300"
          href="/san-pham"
          _hover={{
            _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
          }}
          _currentPage={{ color: 'colorPalette.fg' }}
        >
          Sản phẩm
        </Link>
        <Link
          fontWeight="medium"
          color="brand.300"
          href="/#lien-he"
          _hover={{
            _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
          }}
          _currentPage={{ color: 'colorPalette.fg' }}
        >
          Liên hệ
        </Link>
    </Stack>
  )
}
