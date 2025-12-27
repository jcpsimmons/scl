import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const meta: Meta = {
  title: 'Components/Form',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const basicSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export const BasicForm: Story = {
  render: function BasicFormExample() {
    const form = useForm<z.infer<typeof basicSchema>>({
      resolver: zodResolver(basicSchema),
      defaultValues: {
        username: '',
        email: '',
      },
    })

    function onSubmit(values: z.infer<typeof basicSchema>) {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[350px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="simsies" {...field} />
                </FormControl>
                <FormDescription>
                  Your public display name.
                </FormDescription>
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
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  We'll never share your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  },
}

const vimConfigSchema = z.object({
  leader: z.string().min(1, 'Leader key is required'),
  colorscheme: z.string().min(1, 'Select a colorscheme'),
  relativenumber: z.boolean(),
  tabstop: z.coerce.number().min(1).max(8),
  notes: z.string().optional(),
})

export const VimConfigForm: Story = {
  render: function VimConfigExample() {
    const form = useForm<z.infer<typeof vimConfigSchema>>({
      resolver: zodResolver(vimConfigSchema),
      defaultValues: {
        leader: ' ',
        colorscheme: '',
        relativenumber: true,
        tabstop: 2,
        notes: '',
      },
    })

    function onSubmit(values: z.infer<typeof vimConfigSchema>) {
      console.log(values)
      alert(`:set applied!\n${JSON.stringify(values, null, 2)}`)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[400px]">
          <FormField
            control={form.control}
            name="leader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leader Key</FormLabel>
                <FormControl>
                  <Input placeholder="<Space>" {...field} />
                </FormControl>
                <FormDescription>
                  vim.g.mapleader = &quot;{field.value}&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colorscheme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colorscheme</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder=":colorscheme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="green">Terminal Green</SelectItem>
                    <SelectItem value="cyan">Cyan</SelectItem>
                    <SelectItem value="hotpink">Hot Pink</SelectItem>
                    <SelectItem value="amber">Amber</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your preferred color theme.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relativenumber"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Relative numbers</FormLabel>
                  <FormDescription>
                    :set relativenumber
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tabstop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tab Stop</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={8} {...field} />
                </FormControl>
                <FormDescription>
                  :set tabstop={field.value}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="-- Additional config notes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit">:w</Button>
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              :e!
            </Button>
          </div>
        </form>
      </Form>
    )
  },
}

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean(),
})

export const LoginForm: Story = {
  render: function LoginExample() {
    const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        username: '',
        password: '',
        remember: false,
      },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
      console.log(values)
      alert('Login submitted!')
    }

    return (
      <div className="border-2 border-primary p-6 w-[350px]">
        <h2 className="text-lg font-bold mb-4 text-primary">LOGIN</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="root" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    )
  },
}

export const WithErrors: Story = {
  render: function ErrorsExample() {
    const form = useForm<z.infer<typeof basicSchema>>({
      resolver: zodResolver(basicSchema),
      defaultValues: {
        username: 'a',
        email: 'not-an-email',
      },
    })

    // Trigger validation on mount to show errors
    form.trigger()

    return (
      <Form {...form}>
        <form className="space-y-6 w-[350px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Minimum 2 characters required.
                </FormDescription>
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  },
}
