import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'terminal',
      values: [
        { name: 'terminal', value: '#000000' },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        minWidth: '100vw',
        padding: '2rem',
        fontFamily: 'BigBlueTerm437, monospace',
        color: '#00ff00',
      }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
