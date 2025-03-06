// __tests__/HeroSection.test.tsx
import React from 'react'
import { render, screen } from '../../test-utils'
import '@testing-library/jest-dom'
import { HeroSection } from '@/components/Homepage/HeroSection'

describe('HeroSection component', () => {
  it('renders the image with correct alt text and src', () => {
    render(<HeroSection />)
    // Query the image by its alt text
    const heroImage = screen.getByAltText('Chợ Thị Nghè')
    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute('src', '/images/chothinghe.png')
  })

  it('has a container with flex layout and centered content', () => {
    render(<HeroSection />)
    // Optionally, add a test id in your component for easier selection:
    // <Box data-testid="hero-container" ...>
    // and then use:
    // const container = screen.getByTestId('hero-container')
    // For now, we can use the fact that the image's parent is the Box.
    const container = screen.getByAltText('Chợ Thị Nghè').parentElement
    expect(container).toBeInTheDocument()

    // Check that the container has a computed style of display:flex and centered items
    const computedStyle = window.getComputedStyle(container as Element)
    expect(computedStyle.display).toBe('flex')
    expect(computedStyle.justifyContent).toBe('center')
    expect(computedStyle.alignItems).toBe('center')
  })
})
