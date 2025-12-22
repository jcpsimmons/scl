import type { Meta, StoryObj } from '@storybook/react'
import { DitheredImage } from './dithered-image'
import sampleImage from '../../../../simmonsprofile.jpg'

const meta: Meta<typeof DitheredImage> = {
  title: 'Components/DitheredImage',
  component: DitheredImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ditherSize: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
    },
    color: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof DitheredImage>

const SAMPLE_IMAGE = sampleImage

export const Default: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Dithered sample image',
    width: 400,
  },
}

export const LargeDitherPattern: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Large dither pattern',
    width: 400,
    ditherSize: 2,
  },
}

export const AmberColor: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Amber dithered image',
    width: 400,
    color: [255, 176, 0],
  },
}

export const CyanColor: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Cyan dithered image',
    width: 400,
    color: [0, 255, 255],
  },
}
