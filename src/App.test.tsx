import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './App'
describe('rendering App page', () => {
  test('renders MappingTool text', () => {
    render(<App />)

    const textElement = screen.queryByText(/We're sorry but it seems like this part of the application is empty/i)
    // expect(textElement).toBeInTheDocument()
    expect(textElement).not.toBeInTheDocument()
  })
})
