import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Combobox, ComboboxMulti } from './combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

const vimPlugins = [
  { value: 'telescope', label: 'Telescope' },
  { value: 'treesitter', label: 'Treesitter' },
  { value: 'lspconfig', label: 'LSP Config' },
  { value: 'cmp', label: 'nvim-cmp' },
  { value: 'mason', label: 'Mason' },
  { value: 'lazy', label: 'lazy.nvim' },
];

const colorschemes = [
  { value: 'green', label: 'Terminal Green' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'hotpink', label: 'Hot Pink' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'amber', label: 'Amber' },
  { value: 'white', label: 'White' },
  { value: 'blue', label: 'Blue' },
];

export const Default: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState('');
    return (
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
        searchPlaceholder="Search frameworks..."
      />
    );
  },
};

export const WithPreselection: Story = {
  render: function PreselectedExample() {
    const [value, setValue] = React.useState('next');
    return (
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
      />
    );
  },
};

export const VimPluginSelector: Story = {
  render: function VimExample() {
    const [value, setValue] = React.useState('');
    return (
      <Combobox
        options={vimPlugins}
        value={value}
        onValueChange={setValue}
        placeholder=":PlugInstall"
        searchPlaceholder="Search plugins..."
        className="w-[250px]"
      />
    );
  },
};

export const ColorschemeSelector: Story = {
  render: function ColorschemeExample() {
    const [value, setValue] = React.useState('green');
    return (
      <div className="flex flex-col gap-4 items-center">
        <Combobox
          options={colorschemes}
          value={value}
          onValueChange={setValue}
          placeholder=":colorscheme"
          searchPlaceholder="Search colors..."
          className="w-[200px]"
        />
        <p className="text-sm text-muted-foreground">
          Selected: <span className="text-primary">{value || 'none'}</span>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  render: function DisabledOptionsExample() {
    const [value, setValue] = React.useState('');
    const optionsWithDisabled = [
      { value: 'next', label: 'Next.js' },
      { value: 'sveltekit', label: 'SvelteKit', disabled: true },
      { value: 'nuxt', label: 'Nuxt.js' },
      { value: 'remix', label: 'Remix', disabled: true },
      { value: 'astro', label: 'Astro' },
    ];
    return (
      <Combobox
        options={optionsWithDisabled}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
      />
    );
  },
};

// Multi-select stories
export const MultiSelect: Story = {
  render: function MultiExample() {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <ComboboxMulti
        options={vimPlugins}
        value={value}
        onValueChange={setValue}
        placeholder="Select plugins..."
        searchPlaceholder="Search plugins..."
        className="w-[250px]"
      />
    );
  },
};

export const MultiSelectWithPreselection: Story = {
  render: function MultiPreselectedExample() {
    const [value, setValue] = React.useState(['telescope', 'treesitter', 'lspconfig']);
    return (
      <ComboboxMulti
        options={vimPlugins}
        value={value}
        onValueChange={setValue}
        placeholder="Select plugins..."
        className="w-[300px]"
      />
    );
  },
};

export const MultiSelectWithMax: Story = {
  render: function MultiMaxExample() {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div className="flex flex-col gap-4 items-center">
        <ComboboxMulti
          options={colorschemes}
          value={value}
          onValueChange={setValue}
          placeholder="Select up to 3 colors..."
          maxSelected={3}
          className="w-[250px]"
        />
        <p className="text-sm text-muted-foreground">Selected {value.length}/3 colors</p>
      </div>
    );
  },
};
