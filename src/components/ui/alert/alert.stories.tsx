import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  ),
};

export const Secondary: Story = {
  render: () => (
    <Alert variant="secondary">
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Note</AlertTitle>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is the default alert style.</AlertDescription>
      </Alert>
      <Alert variant="secondary">
        <AlertTitle>Secondary</AlertTitle>
        <AlertDescription>This is the secondary alert style.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This is the destructive alert style.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithThemeColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert className="theme-cyan">
        <AlertTitle>Cyan Theme</AlertTitle>
        <AlertDescription>Using .theme-cyan class for cyan coloring.</AlertDescription>
      </Alert>
      <Alert className="theme-yellow">
        <AlertTitle>Yellow Theme</AlertTitle>
        <AlertDescription>Using .theme-yellow class for yellow coloring.</AlertDescription>
      </Alert>
      <Alert className="theme-hotpink">
        <AlertTitle>Hot Pink Theme</AlertTitle>
        <AlertDescription>Using .theme-hotpink class for pink coloring.</AlertDescription>
      </Alert>
    </div>
  ),
};
