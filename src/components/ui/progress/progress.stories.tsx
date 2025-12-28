import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    showPercentage: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    value: 50,
  },
}

export const Empty: Story = {
  args: {
    value: 0,
    label: 'Not started',
    showPercentage: true,
  },
}

export const Quarter: Story = {
  args: {
    value: 25,
    label: 'Loading...',
    showPercentage: true,
  },
}

export const Half: Story = {
  args: {
    value: 50,
    label: 'Processing...',
    showPercentage: true,
  },
}

export const ThreeQuarters: Story = {
  args: {
    value: 75,
    label: 'Almost there...',
    showPercentage: true,
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    label: 'Complete!',
    showPercentage: true,
  },
}

export const WithLabel: Story = {
  args: {
    value: 66,
    label: 'Upload progress',
    showPercentage: true,
  },
}

export const WithThemeColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full">
      <Progress value={60} label="Default (Green)" showPercentage />
      <div className="theme-cyan">
        <Progress value={45} label="Cyan Theme" showPercentage />
      </div>
      <div className="theme-yellow">
        <Progress value={80} label="Yellow Theme" showPercentage />
      </div>
      <div className="theme-hotpink">
        <Progress value={30} label="Hot Pink Theme" showPercentage />
      </div>
    </div>
  ),
}

export const ComparisonDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Progress value={25} label="CPU Usage" showPercentage />
      <Progress value={60} label="Memory" showPercentage />
      <Progress value={90} label="Disk Space" showPercentage />
    </div>
  ),
}
