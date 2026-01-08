import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: 'B',
    'aria-label': 'Toggle bold',
  },
};

export const WithText: Story = {
  args: {
    children: 'Toggle me',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Toggle size="sm" aria-label="Small">
        Sm
      </Toggle>
      <Toggle size="default" aria-label="Default">
        Md
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        Lg
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'B',
    disabled: true,
    'aria-label': 'Toggle disabled',
  },
};

export const Pressed: Story = {
  args: {
    children: 'B',
    defaultPressed: true,
    'aria-label': 'Toggle pressed',
  },
};
