import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Popover, PopoverTrigger, PopoverContent } from './popover'

describe('Popover', () => {
  it('renders popover trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  it('opens popover on click', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('forwards ref to PopoverContent', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent ref={ref}>Content</PopoverContent>
      </Popover>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('merges custom className', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-class">Content</PopoverContent>
      </Popover>
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Content').closest('[data-state="open"]')).toHaveClass('custom-class')
  })
})
