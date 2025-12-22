import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'
import { Label } from '../label'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    rows: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'This is some default text in the textarea.',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
}

export const WithRows: Story = {
  args: {
    placeholder: 'Textarea with 5 rows',
    rows: 5,
  },
}
