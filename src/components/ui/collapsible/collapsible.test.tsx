import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'

describe('Collapsible', () => {
  it('renders trigger', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )
    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument()
  })

  it('expands on click', async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden Content</CollapsibleContent>
      </Collapsible>
    )
    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Hidden Content')).toBeVisible()
  })
})
