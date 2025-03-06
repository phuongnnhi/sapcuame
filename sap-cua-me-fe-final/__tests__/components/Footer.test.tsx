import React from 'react'
import { render, screen } from '../test-utils'
import '@testing-library/jest-dom'
import { Footer } from '@/components/Footer'

describe('Footer component', () => {
  it('renders footer text', () => {
    render(<Footer />)
    // Check for key text content in the footer
    expect(screen.getByText(/Nhắn má Phương qua/i)).toBeInTheDocument()
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
  })

  it('renders the logo image correctly', () => {
    render(<Footer />)
    // Query the logo image by its alt text
    const logo = screen.getByAltText('Logo')
    expect(logo).toBeInTheDocument()
    // Check that the logo has the expected source attribute
    expect(logo).toHaveAttribute('src', '/images/sapcuame_logo.png')
  })

  it('renders the Zalo icon with a link to Zalo', () => {
    render(<Footer />)
    // Query the Zalo icon by its alt text
    const zaloIcon = screen.getByAltText('Zalo Icon')
    expect(zaloIcon).toBeInTheDocument()
    // Ensure the image is wrapped by an anchor element with the correct href
    const link = zaloIcon.closest('a')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://zalo.me')
  })
})
