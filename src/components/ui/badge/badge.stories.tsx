import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'green', 'white', 'yellow', 'hotpink', 'blue'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="white">White</Badge>
      <Badge variant="yellow">Yellow</Badge>
      <Badge variant="hotpink">Hotpink</Badge>
      <Badge variant="blue">Blue</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Badge>
      <span className="mr-1">+</span>
      New
    </Badge>
  ),
}
