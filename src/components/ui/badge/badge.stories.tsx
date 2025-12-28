import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'secondary-outline', 'destructive-outline'],
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

export const FilledVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
}

export const OutlineVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary-outline">Secondary</Badge>
      <Badge variant="destructive-outline">Destructive</Badge>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Filled (color bg, black text):</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Outline (transparent bg, color text):</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Outline</Badge>
          <Badge variant="secondary-outline">Secondary</Badge>
          <Badge variant="destructive-outline">Destructive</Badge>
        </div>
      </div>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>
        <span className="mr-1">+</span>
        New
      </Badge>
      <Badge variant="outline">
        <span className="mr-1">●</span>
        Active
      </Badge>
    </div>
  ),
}

export const WithThemeColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Filled with theme colors:</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Green (Default)</Badge>
          <div className="theme-cyan"><Badge>Cyan</Badge></div>
          <div className="theme-yellow"><Badge>Yellow</Badge></div>
          <div className="theme-hotpink"><Badge>Hot Pink</Badge></div>
          <div className="theme-amber"><Badge>Amber</Badge></div>
          <div className="theme-white"><Badge>White</Badge></div>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Outline with theme colors:</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Green (Default)</Badge>
          <div className="theme-cyan"><Badge variant="outline">Cyan</Badge></div>
          <div className="theme-yellow"><Badge variant="outline">Yellow</Badge></div>
          <div className="theme-hotpink"><Badge variant="outline">Hot Pink</Badge></div>
          <div className="theme-amber"><Badge variant="outline">Amber</Badge></div>
          <div className="theme-white"><Badge variant="outline">White</Badge></div>
        </div>
      </div>
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
