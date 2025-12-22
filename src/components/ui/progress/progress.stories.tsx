import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'
import { useState, useEffect } from 'react'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    segments: {
      control: { type: 'number', min: 5, max: 50 },
    },
    colorRange: {
      control: 'boolean',
    },
    color: {
      control: 'select',
      options: ['red', 'yellow', 'green', 'magenta', 'blue'],
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
    value: 20,
    segments: 20,
  },
}

export const WithPercentage: Story = {
  args: {
    value: 65,
    showPercentage: true,
  },
}

export const WithLabel: Story = {
  args: {
    value: 75,
    label: 'Loading...',
    showPercentage: true,
  },
}

export const ColorRange: Story = {
  args: {
    value: 50,
    colorRange: true,
    showPercentage: true,
    label: 'Health',
  },
}

export const ColorRangeLow: Story = {
  args: {
    value: 20,
    colorRange: true,
    showPercentage: true,
    label: 'Critical',
  },
}

export const ColorRangeMedium: Story = {
  args: {
    value: 50,
    colorRange: true,
    showPercentage: true,
    label: 'Warning',
  },
}

export const ColorRangeHigh: Story = {
  args: {
    value: 85,
    colorRange: true,
    showPercentage: true,
    label: 'Good',
  },
}

export const CustomColor: Story = {
  args: {
    value: 60,
    color: 'magenta',
    showPercentage: true,
  },
}

export const DifferentSegments: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={60} segments={10} label="10 segments" showPercentage />
      <Progress value={60} segments={20} label="20 segments" showPercentage />
      <Progress value={60} segments={30} label="30 segments" showPercentage />
      <Progress value={60} segments={40} label="40 segments" showPercentage />
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={70} color="red" label="Red" showPercentage />
      <Progress value={70} color="yellow" label="Yellow" showPercentage />
      <Progress value={70} color="green" label="Green" showPercentage />
      <Progress value={70} color="magenta" label="Magenta" showPercentage />
      <Progress value={70} color="blue" label="Blue" showPercentage />
    </div>
  ),
}

export const AnimatedDemo: Story = {
  render: () => {
    const [value, setValue] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 1))
      }, 50)
      return () => clearInterval(interval)
    }, [])

    return (
      <div className="space-y-6">
        <Progress value={value} colorRange label="Animated with color range" showPercentage />
        <Progress value={value} color="green" label="Animated green" showPercentage />
      </div>
    )
  },
}

export const GameStats: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-black border-2 border-terminal-green">
      <h3 className="font-mono text-terminal-yellow font-bold mb-4">PLAYER STATUS</h3>
      <Progress value={85} colorRange label="HEALTH" showPercentage />
      <Progress value={45} colorRange label="STAMINA" showPercentage />
      <Progress value={20} colorRange label="MANA" showPercentage />
      <Progress value={65} color="blue" label="EXPERIENCE" showPercentage />
    </div>
  ),
}
