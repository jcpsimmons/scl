import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Switch } from './switch'

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch aria-label="switch" />)
    expect(screen.getByRole('switch')).not.toBeChecked()
  })

  it('can be toggled', async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="switch" />)
    await user.click(screen.getByRole('switch'))
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Switch ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('merges custom className', () => {
    render(<Switch className="custom-class" aria-label="switch" />)
    expect(screen.getByRole('switch')).toHaveClass('custom-class')
  })

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch onCheckedChange={onCheckedChange} aria-label="switch" />)
    await user.click(screen.getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('can be disabled', () => {
    render(<Switch disabled aria-label="switch" />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })
})
