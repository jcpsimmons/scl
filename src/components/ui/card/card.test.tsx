import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'

describe('Card', () => {
  it('renders card with all parts', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('forwards ref to Card', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Card</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('forwards ref to CardHeader', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardHeader ref={ref}>Header</CardHeader>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('merges custom className on Card', () => {
    render(<Card className="custom-class">Card</Card>)
    expect(screen.getByText('Card')).toHaveClass('custom-class')
  })

  it('merges custom className on CardTitle', () => {
    render(<CardTitle className="custom-class">Title</CardTitle>)
    expect(screen.getByText('Title')).toHaveClass('custom-class')
  })
})
