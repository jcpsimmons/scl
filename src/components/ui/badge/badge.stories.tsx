import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
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

export const WithThemeColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default (Green)</Badge>
      <Badge className="theme-cyan">Cyan</Badge>
      <Badge className="theme-yellow">Yellow</Badge>
      <Badge className="theme-hotpink">Hot Pink</Badge>
      <Badge className="theme-amber">Amber</Badge>
      <Badge className="theme-white">White</Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>ACTIVE</Badge>
      <Badge variant="secondary">PENDING</Badge>
      <Badge variant="destructive">ERROR</Badge>
      <Badge variant="outline">DRAFT</Badge>
    </div>
  ),
}
