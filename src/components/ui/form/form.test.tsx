import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

const testSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type TestFormValues = z.infer<typeof testSchema>;

interface TestFormProps {
  onSubmit?: (values: TestFormValues) => void;
  defaultValues?: Partial<TestFormValues>;
}

function TestForm({ onSubmit = vi.fn(), defaultValues }: TestFormProps) {
  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      username: '',
      email: '',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>Your display name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

describe('Form', () => {
  it('renders form fields', () => {
    render(<TestForm />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders form description', () => {
    render(<TestForm />);

    expect(screen.getByText('Your display name')).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Username must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid username', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    await user.type(screen.getByPlaceholderText('Enter username'), 'a');
    await user.type(screen.getByPlaceholderText('Enter email'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Username must be at least 2 characters')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    await user.type(screen.getByPlaceholderText('Enter username'), 'testuser');
    await user.type(screen.getByPlaceholderText('Enter email'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('calls onSubmit with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText('Enter username'), 'testuser');
    await user.type(screen.getByPlaceholderText('Enter email'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { username: 'testuser', email: 'test@example.com' },
        expect.anything()
      );
    });
  });

  it('renders with default values', () => {
    render(
      <TestForm
        defaultValues={{
          username: 'defaultuser',
          email: 'default@example.com',
        }}
      />
    );

    expect(screen.getByPlaceholderText('Enter username')).toHaveValue('defaultuser');
    expect(screen.getByPlaceholderText('Enter email')).toHaveValue('default@example.com');
  });

  it('clears error when field is corrected', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    // Submit with invalid data
    await user.type(screen.getByPlaceholderText('Enter username'), 'a');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Username must be at least 2 characters')).toBeInTheDocument();
    });

    // Correct the field
    await user.type(screen.getByPlaceholderText('Enter username'), 'bc');

    await waitFor(() => {
      expect(screen.queryByText('Username must be at least 2 characters')).not.toBeInTheDocument();
    });
  });
});
