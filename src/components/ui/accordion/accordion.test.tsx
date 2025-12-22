import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

describe('Accordion', () => {
  it('renders accordion items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole('button', { name: 'Item 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Item 2' })).toBeInTheDocument()
  })

  it('expands accordion on click', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    await user.click(screen.getByRole('button', { name: 'Item 1' }))
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('collapses accordion on second click when collapsible', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole('button', { name: 'Item 1' })
    await user.click(trigger)
    await user.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'closed')
  })

  it('forwards ref to AccordionItem', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Accordion type="single">
        <AccordionItem ref={ref} value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
        </AccordionItem>
      </Accordion>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
