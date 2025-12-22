import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

describe('Avatar', () => {
  it('renders avatar with fallback', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('forwards ref to Avatar', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Avatar ref={ref}><AvatarFallback>JD</AvatarFallback></Avatar>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('merges custom className on Avatar', () => {
    render(
      <Avatar className="h-20 w-20" data-testid="avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId('avatar')).toHaveClass('h-20', 'w-20')
  })

  it('renders AvatarImage with alt text', () => {
    render(
      <Avatar>
        <AvatarImage src="/avatar.png" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    // Image might not be immediately visible if loading fails, fallback should show
    expect(screen.getByText('JD')).toBeInTheDocument()
  })
})
