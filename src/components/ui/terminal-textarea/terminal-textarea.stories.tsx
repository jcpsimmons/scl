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
    vimMode: {
      control: 'boolean',
      description: 'Enable Vim keybindings',
    },
    language: {
      control: 'select',
      options: ['none', 'javascript', 'typescript', 'html', 'css', 'json', 'markdown'],
      description: 'Syntax highlighting language',
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
    language: 'javascript',
    value: `function greet(name) {
  console.log("Hello, " + name);
}

greet("Terminal");`,
    placeholder: 'Enter code here...',
  },
}

export const WithVimMode: Story = {
  args: {
    visibleLines: 12,
    vimMode: true,
    language: 'javascript',
    value: `// Try Vim commands: hjkl, i, a, o, dd, yy, p, etc.
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  },
}

export const JavaScriptHighlight: Story = {
  args: {
    visibleLines: 15,
    language: 'javascript',
    value: `// JavaScript with syntax highlighting
import React from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(c => c + 1);
  };

  return (
    <div className="app">
      <h1>Counter: {count}</h1>
      <button onClick={handleClick}>+</button>
    </div>
  );
};

export default App;`,
  },
}

export const TypeScriptHighlight: Story = {
  args: {
    visibleLines: 12,
    language: 'typescript',
    value: `// TypeScript with syntax highlighting
interface User {
  id: number;
  name: string;
  email?: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = { id: 1, name: 'Alice' };
console.log(greetUser(user));`,
  },
}

export const HTMLHighlight: Story = {
  args: {
    visibleLines: 10,
    language: 'html',
    value: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Terminal Editor</title>
</head>
<body>
  <h1>Hello World</h1>
  <p class="terminal">This is a terminal-style editor.</p>
</body>
</html>`,
  },
}

export const CSSHighlight: Story = {
  args: {
    visibleLines: 10,
    language: 'css',
    value: `.terminal {
  background-color: #000;
  color: #0f0;
  font-family: monospace;
  padding: 1rem;
}

.terminal:hover {
  box-shadow: 0 0 10px #0f0;
}`,
  },
}

export const JSONHighlight: Story = {
  args: {
    visibleLines: 12,
    language: 'json',
    value: `{
  "name": "terminal-textarea",
  "version": "1.0.0",
  "features": {
    "vimMode": true,
    "syntaxHighlight": true,
    "languages": ["js", "ts", "html", "css", "json"]
  },
  "colors": {
    "primary": "#00ff00",
    "secondary": "#ffff00"
  }
}`,
  },
}

export const MarkdownHighlight: Story = {
  args: {
    visibleLines: 10,
    language: 'markdown',
    value: `# Terminal Textarea

## Features

- **Vim Mode**: Full vim keybindings
- **Syntax Highlighting**: Multiple languages
- **Terminal Theme**: Green on black aesthetic

\`\`\`javascript
console.log('Hello, Terminal!');
\`\`\``,
  },
}

export const VimModeDemo: Story = {
  render: () => {
    const [value, setValue] = useState(`// Vim Mode Demo
// Try these commands in NORMAL mode:
// - h, j, k, l: move left, down, up, right
// - i: insert mode
// - a: append mode
// - o: new line below
// - dd: delete line
// - yy: yank (copy) line
// - p: paste
// - u: undo
// - Ctrl+r: redo

function example() {
  console.log("Edit this code with Vim commands!");
}`)

    return (
      <div className="w-[700px]">
        <div className="mb-4 p-4 bg-black border-2 border-terminal-yellow text-terminal-yellow font-mono text-sm">
          <strong>VIM MODE ACTIVE</strong>
          <p className="mt-2">Start in NORMAL mode. Press 'i' to enter INSERT mode.</p>
        </div>
        <TerminalTextarea
          visibleLines={16}
          vimMode
          language="javascript"
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const NoLineNumbers: Story = {
  args: {
    visibleLines: 8,
    showLineNumbers: false,
    language: 'javascript',
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
    language: 'javascript',
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
        language="javascript"
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

// Full editor with Vim mode
const VimEditorMockup = () => {
  const [value, setValue] = useState(`import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(c => c - 1)}>
        Decrement
      </button>
    </div>
  );
}`)
  const [cursor, setCursor] = useState({ line: 1, column: 1 })
  const lines = value.split('\n')

  return (
    <div className="flex flex-col w-[800px] h-[500px] bg-black border-2 border-terminal-green">
      {/* Tab bar */}
      <div className="flex items-center h-8 bg-terminal-deepblue border-b border-terminal-green">
        <div className="px-4 py-1 bg-black text-terminal-green border-r border-terminal-green font-mono text-sm">
          Counter.tsx
        </div>
        <div className="px-4 py-1 text-terminal-green/50 border-r border-terminal-green font-mono text-sm">
          index.ts
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-hidden">
        <TerminalTextarea
          visibleLines={20}
          vimMode
          language="typescript"
          value={value}
          onChange={setValue}
          onCursorChange={(line, column) => setCursor({ line, column })}
          className="h-full border-0"
        />
      </div>

      {/* Statusline */}
      <Statusline
        mode="NORMAL"
        modeVariant="default"
        filename="Counter.tsx"
        filetype="typescriptreact"
        filetypeAbbr="TSX"
        branch="main"
        line={cursor.line}
        column={cursor.column}
        totalLines={lines.length}
        encoding="utf-8"
      />
    </div>
  )
}

export const VimEditor: Story = {
  render: () => <VimEditorMockup />,
  parameters: {
    layout: 'fullscreen',
  },
}

// Comparison of syntax highlighting
export const AllLanguages: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <h3 className="font-mono text-terminal-yellow mb-2">JavaScript</h3>
        <TerminalTextarea
          visibleLines={6}
          language="javascript"
          value={`const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
greet("World");`}
        />
      </div>
      <div>
        <h3 className="font-mono text-terminal-yellow mb-2">TypeScript</h3>
        <TerminalTextarea
          visibleLines={6}
          language="typescript"
          value={`interface Person {
  name: string;
}
const greet = (p: Person) => {
  console.log(p.name);
};`}
        />
      </div>
      <div>
        <h3 className="font-mono text-terminal-yellow mb-2">HTML</h3>
        <TerminalTextarea
          visibleLines={6}
          language="html"
          value={`<div class="container">
  <h1>Title</h1>
  <p>Content here</p>
</div>`}
        />
      </div>
      <div>
        <h3 className="font-mono text-terminal-yellow mb-2">CSS</h3>
        <TerminalTextarea
          visibleLines={6}
          language="css"
          value={`.container {
  display: flex;
  padding: 1rem;
  color: #0f0;
}`}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}
