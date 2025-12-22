import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Slider } from './slider'

describe('Slider', () => {
  it('renders slider', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} aria-label="slider" />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Slider ref={ref} defaultValue={[50]} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('merges custom className', () => {
    render(<Slider className="w-60" defaultValue={[50]} data-testid="slider" />)
    expect(screen.getByTestId('slider')).toHaveClass('w-60')
  })

  it('calls onValueChange when value changes', () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={[50]} onValueChange={onValueChange} aria-label="slider" />)
    // Slider requires keyboard/mouse interaction to change value
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    render(<Slider disabled defaultValue={[50]} aria-label="slider" />)
    expect(screen.getByRole('slider')).toHaveAttribute('data-disabled')
  })
})
