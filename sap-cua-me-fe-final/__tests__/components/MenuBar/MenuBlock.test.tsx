// __tests__/MenuBlock.test.tsx
import React from 'react'
import { render, screen } from '../../test-utils'
import '@testing-library/jest-dom'
import { MenuBlock } from '@/components/MenuBar/MenuBlock'

describe('MenuBlock component', () => {
  it('renders with initial visible state', () => {
    render(<MenuBlock />)
    const menuBlock = screen.getByTestId('menu-block')
    // Use object notation for style assertion:
    expect(menuBlock).toHaveStyle({ transform: 'translateY(5px)' })
  })
})
