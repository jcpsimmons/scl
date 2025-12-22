import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Textarea } from './textarea'

describe('Textarea', () => {
  it('renders with default props', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('merges custom className', () => {
    render(<Textarea className="custom-class" data-testid="textarea" />)
    expect(screen.getByTestId('textarea')).toHaveClass('custom-class')
  })

  it('handles value changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Textarea onChange={onChange} data-testid="textarea" />)
    await user.type(screen.getByTestId('textarea'), 'hello')
    expect(onChange).toHaveBeenCalled()
  })

  it('can be disabled', () => {
    render(<Textarea disabled data-testid="textarea" />)
    expect(screen.getByTestId('textarea')).toBeDisabled()
  })

  it('supports rows attribute', () => {
    render(<Textarea rows={5} data-testid="textarea" />)
    expect(screen.getByTestId('textarea')).toHaveAttribute('rows', '5')
  })
})
