// test-utils.tsx
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from '@/app/provider'

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(<Provider>{ui}</Provider>, options)

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render method
export { customRender as render }
