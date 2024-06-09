import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { TextAreaField } from '../TextAreaField.tsx'

describe('TextAreaField renders correctly', () => {
  it('without errors', () => {
    render(
      <TextAreaField
        placeholder='Test Placeholder'
        value=''
        onChange={() => {}}
      />,
    )
    // Ensure the component renders without errors
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
  })

  it('calls the onChange callback when the TextAreaField value changes', () => {
    const handleChange = vi.fn()
    render(
      <TextAreaField
        placeholder='Test Placeholder'
        value=''
        onChange={handleChange}
      />,
    )
    // Simulate TextAreaField value change
    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), {
      target: { value: 'New Value' },
    })
    // Ensure the onChange callback is called
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
  })
})
