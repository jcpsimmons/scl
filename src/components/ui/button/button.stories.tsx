import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'secondary-outline', 'ghost', 'link', 'destructive-outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: '[Start Quiz]',
  },
}

export const Primary: Story = {
  args: {
    variant: 'default',
    children: '[Start Quiz]',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Reset Progress',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button variant="default">[Start Quiz]</Button>
      <Button variant="secondary">Reset Progress</Button>
      <Button variant="outline">Continue</Button>
      <Button variant="secondary-outline">Secondary Outline</Button>
      <Button variant="destructive">Delete Data</Button>
      <Button variant="destructive-outline">Destructive Outline</Button>
      <Button variant="ghost">Press ENTER to start</Button>
      <Button variant="link">Learn More</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">[Start]</Button>
      <Button size="default">[Start Quiz]</Button>
      <Button size="lg">[Begin Assessment]</Button>
      <Button size="icon">
        <span>→</span>
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: '[Loading...]',
    disabled: true,
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button>
        <span>→</span>
        Next Question
      </Button>
      <Button variant="secondary">
        <span>←</span>
        Go Back
      </Button>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#">[View Documentation]</a>
    </Button>
  ),
}

export const InteractiveDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-black rounded-lg">
      <div className="text-white font-mono text-center">
        <p className="text-gray-400 mb-2">14 questions • ~3 minutes</p>
        <Button size="lg" className="mb-4">[Start Quiz]</Button>
        <p className="text-sm">
          Press <Button variant="ghost" size="sm" className="inline-flex mx-1">ENTER</Button> to start
        </p>
      </div>
      <div className="flex justify-between items-center">
        <Button variant="secondary">Reset Progress</Button>
        <Button variant="destructive">Clear Data</Button>
      </div>
    </div>
  ),
}

export const WithThemeColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Button>Default (Green)</Button>
        <Button variant="outline">Green Outline</Button>
      </div>
      <div className="flex gap-4 items-center theme-cyan">
        <Button>Cyan Fill</Button>
        <Button variant="outline">Cyan Outline</Button>
      </div>
      <div className="flex gap-4 items-center theme-yellow">
        <Button>Yellow Fill</Button>
        <Button variant="outline">Yellow Outline</Button>
      </div>
      <div className="flex gap-4 items-center theme-hotpink">
        <Button>Hot Pink Fill</Button>
        <Button variant="outline">Hot Pink Outline</Button>
      </div>
      <div className="flex gap-4 items-center theme-amber">
        <Button>Amber Fill</Button>
        <Button variant="outline">Amber Outline</Button>
      </div>
    </div>
  ),
}
