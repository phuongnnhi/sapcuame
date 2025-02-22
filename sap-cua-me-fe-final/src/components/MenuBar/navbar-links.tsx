import { Link, Stack, type StackProps } from '@chakra-ui/react'

export const NavbarLinks = (props: StackProps) => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {['Chuyện chợ', 'Mẹ gợi ý', 'Sạp của mẹ', 'Liên hệ'].map((item) => (
        <Link
          key={item}
          fontWeight="medium"
          color="brand.300"
          aria-current={item === 'Projects' ? 'page' : undefined}
          _hover={{
            _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
          }}
          _currentPage={{ color: 'colorPalette.fg' }}
        >
          {item}
        </Link>
      ))}
    </Stack>
  )
}
