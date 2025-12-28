import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import { inject } from '@vercel/analytics'
import '../src/styles/globals.css'

// Initialize Vercel Analytics
inject()

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
}

export default preview
