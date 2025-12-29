import type { Meta, StoryObj } from '@storybook/react';
import { Statusline } from './statusline';

const meta: Meta<typeof Statusline> = {
  title: 'Components/Statusline',
  component: Statusline,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Statusline>;

export const Default: Story = {
  args: {
    mode: 'NORMAL',
    branch: 'master',
    diffStat: '+2',
    filename: 'index.d.ts',
    filetype: 'typescript',
    filetypeAbbr: 'TS',
    encoding: 'utf-8',
    line: 1,
    column: 1,
    totalLines: 31,
  },
};

export const InsertMode: Story = {
  args: {
    mode: 'INSERT',
    modeVariant: 'insert',
    filename: 'statusline.tsx',
    filetype: 'typescriptreact',
    filetypeAbbr: 'TSX',
    encoding: 'utf-8',
    line: 45,
    column: 23,
    totalLines: 150,
    modified: true,
  },
};

export const VisualMode: Story = {
  args: {
    mode: 'VISUAL',
    modeVariant: 'visual',
    filename: 'README.md',
    filetype: 'markdown',
    encoding: 'utf-8',
    line: 10,
    column: 5,
    totalLines: 100,
  },
};

export const CommandMode: Story = {
  args: {
    mode: 'COMMAND',
    modeVariant: 'command',
    filename: 'package.json',
    filetype: 'json',
    encoding: 'utf-8',
    line: 1,
    column: 1,
    totalLines: 50,
  },
};

export const WithBranch: Story = {
  args: {
    mode: 'NORMAL',
    branch: 'master',
    diffStat: '+5',
    filename: 'src/components/ui/button/button.tsx',
    filetype: 'typescriptreact',
    filetypeAbbr: 'TSX',
    encoding: 'utf-8',
    line: 25,
    column: 12,
    totalLines: 80,
  },
};

export const ModifiedFile: Story = {
  args: {
    mode: 'INSERT',
    modeVariant: 'insert',
    filename: 'globals.css',
    filetype: 'css',
    encoding: 'utf-8',
    line: 100,
    column: 1,
    totalLines: 200,
    modified: true,
  },
};

export const ReadonlyFile: Story = {
  args: {
    mode: 'NORMAL',
    filename: '/etc/hosts',
    filetype: 'conf',
    encoding: 'utf-8',
    line: 5,
    column: 1,
    totalLines: 20,
    readonly: true,
  },
};

export const AtTop: Story = {
  args: {
    mode: 'NORMAL',
    filename: 'large-file.ts',
    filetype: 'typescript',
    line: 1,
    column: 1,
    totalLines: 1000,
  },
};

export const AtBottom: Story = {
  args: {
    mode: 'NORMAL',
    filename: 'large-file.ts',
    filetype: 'typescript',
    line: 1000,
    column: 1,
    totalLines: 1000,
  },
};

export const CustomContent: Story = {
  args: {
    mode: 'NORMAL',
    leftContent: <div className="flex items-center px-2 bg-amber-500 text-black">LSP: Ready</div>,
    centerContent: <span className="text-yellow-400">Custom Center Content</span>,
    rightContent: <div className="flex items-center px-2 text-green-400">Spaces: 2</div>,
    line: 42,
    column: 10,
    percentage: '50%',
  },
};

export const Minimal: Story = {
  args: {
    mode: 'NORMAL',
    filename: 'file.txt',
  },
};
