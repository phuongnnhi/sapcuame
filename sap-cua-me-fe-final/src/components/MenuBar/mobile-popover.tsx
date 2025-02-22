'use client'
import { Icon, IconButton, PopoverContext } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover'

export const MobilePopover = (props: PropsWithChildren) => {
  return (
    <PopoverRoot
      positioning={{
        placement: 'bottom',
        overflowPadding: 0,
        offset: { mainAxis: 12 },
      }}
    >
      <PopoverContext>
        {(context) => (
          <PopoverTrigger asChild>
            <IconButton
              aria-label="Open Menu"
              variant="ghost"
              size="sm"
              colorPalette="gray"
              hideFrom="md"
            >
              <Icon size="md">{context.open ? <LuX /> : <LuMenu />}</Icon>
            </IconButton>
          </PopoverTrigger>
        )}
      </PopoverContext>
      <PopoverContent
        textStyle="md"
        boxShadow="none"
        borderRadius="none"
        maxW="unset"
        px="4"
        py="6"
        width="var(--available-width)"
        height="var(--available-height)"
        {...props}
      />
    </PopoverRoot>
  )
}
