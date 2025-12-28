import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TerminalTextarea } from './terminal-textarea'
import { Statusline } from '../statusline/statusline'

const meta: Meta<typeof TerminalTextarea> = {
  title: 'Components/TerminalTextarea',
  component: TerminalTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    visibleLines: {
      control: { type: 'number', min: 3, max: 30 },
      description: 'Number of visible lines',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Show line numbers',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only mode',
    },
  },
}

export default meta
type Story = StoryObj<typeof TerminalTextarea>

export const Default: Story = {
  args: {
    visibleLines: 10,
    value: `function greet(name) {
  console.log("Hello, " + name);
}

greet("Terminal");`,
    placeholder: 'Enter code here...',
  },
}

export const WithPlaceholder: Story = {
  args: {
    visibleLines: 8,
    placeholder: 'Type something...',
  },
}

export const NoLineNumbers: Story = {
  args: {
    visibleLines: 8,
    showLineNumbers: false,
    value: `// Without line numbers
function simple() {
  return "Clean and minimal";
}`,
  },
}

export const ReadOnly: Story = {
  args: {
    visibleLines: 8,
    readOnly: true,
    value: `// This code is read-only
// You cannot edit it
const message = "Read-only mode";
console.log(message);`,
  },
}

// Interactive example with statusline
const InteractiveDemo = () => {
  const [value, setValue] = useState(`// Edit this code!
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`)
  const [cursor, setCursor] = useState({ line: 1, column: 1 })
  const lines = value.split('\n')

  return (
    <div className="flex flex-col w-[600px] bg-black">
      <TerminalTextarea
        visibleLines={12}
        value={value}
        onChange={setValue}
        onCursorChange={(line, column) => setCursor({ line, column })}
      />
      <Statusline
        mode="INSERT"
        modeVariant="insert"
        filename="fibonacci.js"
        filetype="javascript"
        filetypeAbbr="JS"
        line={cursor.line}
        column={cursor.column}
        totalLines={lines.length}
        encoding="utf-8"
        modified={true}
      />
    </div>
  )
}

export const WithStatusline: Story = {
  render: () => <InteractiveDemo />,
}

export const LongContent: Story = {
  args: {
    visibleLines: 15,
    value: Array.from({ length: 50 }, (_, i) => `Line ${i + 1}: This is some sample content`).join('\n'),
  },
}
