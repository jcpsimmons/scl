import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
}

const WithLabelComponent = () => {
  const [value, setValue] = React.useState([50])
  return (
    <div className="space-y-4 w-80">
      <div className="flex justify-between">
        <span className="text-sm">Volume</span>
        <span className="text-sm">{value[0]}%</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  )
}

export const WithLabel: Story = {
  render: () => <WithLabelComponent />,
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
}

export const StepValues: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 10,
  },
}
