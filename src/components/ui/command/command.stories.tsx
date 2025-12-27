import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command'
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  File,
  Terminal,
  Moon,
  Sun,
} from 'lucide-react'

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="border-2 border-primary w-[400px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>:profile</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>:billing</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>:settings</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const VimStyle: Story = {
  render: () => (
    <Command className="border-2 border-primary w-[400px]">
      <CommandInput placeholder=":command" />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>
        <CommandGroup heading="File">
          <CommandItem>
            <File className="mr-2 h-4 w-4" />
            <span>New file</span>
            <CommandShortcut>:e [file]</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">󰆓</span>
            <span>Save</span>
            <CommandShortcut>:w</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">󰈆</span>
            <span>Quit</span>
            <CommandShortcut>:q</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">󰈆</span>
            <span>Save and quit</span>
            <CommandShortcut>:wq</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="View">
          <CommandItem>
            <Terminal className="mr-2 h-4 w-4" />
            <span>Terminal</span>
            <CommandShortcut>:term</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">󰕭</span>
            <span>Split vertical</span>
            <CommandShortcut>:vs</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">󰕮</span>
            <span>Split horizontal</span>
            <CommandShortcut>:sp</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Set options</span>
            <CommandShortcut>:set</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Moon className="mr-2 h-4 w-4" />
            <span>Colorscheme</span>
            <CommandShortcut>:colorscheme</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithDialog: Story = {
  render: function DialogExample() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }

      document.addEventListener('keydown', down)
      return () => document.removeEventListener('keydown', down)
    }, [])

    return (
      <>
        <p className="text-sm text-muted-foreground">
          Press{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 border border-primary bg-muted px-1.5 font-mono text-[10px] font-medium text-primary opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    )
  },
}

export const ThemeSwitcher: Story = {
  render: () => (
    <Command className="border-2 border-primary w-[350px]">
      <CommandInput placeholder="Switch theme..." />
      <CommandList>
        <CommandEmpty>No themes found.</CommandEmpty>
        <CommandGroup heading="Themes">
          <CommandItem>
            <Sun className="mr-2 h-4 w-4 text-yellow-400" />
            <span>Green (Default)</span>
          </CommandItem>
          <CommandItem>
            <Moon className="mr-2 h-4 w-4 text-cyan-400" />
            <span>Cyan</span>
          </CommandItem>
          <CommandItem>
            <Moon className="mr-2 h-4 w-4 text-fuchsia-500" />
            <span>Hot Pink</span>
          </CommandItem>
          <CommandItem>
            <Moon className="mr-2 h-4 w-4 text-yellow-400" />
            <span>Yellow</span>
          </CommandItem>
          <CommandItem>
            <Moon className="mr-2 h-4 w-4 text-amber-500" />
            <span>Amber</span>
          </CommandItem>
          <CommandItem>
            <Moon className="mr-2 h-4 w-4 text-white" />
            <span>White</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const Empty: Story = {
  render: () => (
    <Command className="border-2 border-primary w-[400px]">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </Command>
  ),
}
