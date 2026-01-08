import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'destructive',
        'outline',
        'secondary',
        'secondary-outline',
        'ghost',
        'link',
        'destructive-outline',
      ],
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
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '[Start Quiz]',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '[Start Quiz]',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Reset Progress',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Button variant="primary">[Start Quiz]</Button>
      <Button variant="secondary">Reset Progress</Button>
      <Button variant="outline">Continue</Button>
      <Button variant="secondary-outline">Secondary Outline</Button>
      <Button variant="destructive">Delete Data</Button>
      <Button variant="destructive-outline">Destructive Outline</Button>
      <Button variant="ghost">Press ENTER to start</Button>
      <Button variant="link">Learn More</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button size="sm">[Start]</Button>
      <Button size="default">[Start Quiz]</Button>
      <Button size="lg">[Begin Assessment]</Button>
      <Button size="icon">
        <span>→</span>
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: '[Loading...]',
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
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
};

export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="/docs">[View Documentation]</a>
    </Button>
  ),
};
