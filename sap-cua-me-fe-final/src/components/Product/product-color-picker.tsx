'use client'

import {
  ColorPickerRoot,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
} from '@/components/ui/color-picker'
import { parseColor, type Color, ColorPicker } from '@chakra-ui/react'
import type { Product } from '@/types'

// Mapping Vietnamese colors to CSS color codes
const vietnameseColorMap: Record<string, string> = {
    "xanh dương": "blue",
    "xanh lá": "green",
    "trắng": "white",
    "hồng": "pink",
    "da": "beige",
    "xám": "grey",
    "đen": "black"
}

function mapVietnameseColor(color: string): string {
  return vietnameseColorMap[color.toLowerCase()] ?? color // fallback if already a valid CSS color
}

interface ProductItemProps {
  data: Product
}

export const ProductColorPicker = ({ data }: ProductItemProps) => {
  const { colors, defaultColor } = transform(data)

  return (
    <ColorPickerRoot open defaultValue={defaultColor}>
      <ColorPickerSwatchGroup>
        {colors?.map((color) => {
          const mappedColor = mapVietnameseColor(color)
          return (
            <ColorPickerSwatchTrigger
              rounded="full"
              key={color}
              value={mappedColor ?? 'black'}
            >
              <ColorPicker.Swatch rounded="full" boxSize="3" value={mappedColor}>
                <ColorPicker.SwatchIndicator
                  pos="absolute"
                  inset="0"
                  outline="1px solid currentColor"
                  color="fg.muted"
                  outlineOffset="1.5px"
                />
              </ColorPicker.Swatch>
            </ColorPickerSwatchTrigger>
          )
        })}
      </ColorPickerSwatchGroup>
    </ColorPickerRoot>
  )
}

function transform(data: Product) {
  const colors = data.colors ?? []
  const defaultColor: Color | undefined =
    colors.length > 0 ? parseColor(mapVietnameseColor(colors[0])) : undefined
  return { colors, defaultColor }
}