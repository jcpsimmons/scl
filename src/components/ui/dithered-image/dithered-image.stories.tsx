import type { Meta, StoryObj } from '@storybook/react';
import { DitheredImage } from './dithered-image';

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
    threshold: {
      control: { type: 'range', min: 0, max: 255, step: 1 },
    },
    algorithm: {
      control: { type: 'select' },
      options: ['atkinson', 'floyd-steinberg', 'bayer'],
    },
    color: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DitheredImage>;

// Using picsum for a consistent sample portrait
const SAMPLE_IMAGE = 'https://picsum.photos/seed/scl-demo/400/400';

// Default now uses Atkinson (classic Mac)
export const Default: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Atkinson dithered image (classic Mac)',
    width: 400,
  },
};

// Classic Mac aesthetic - Atkinson with green
export const AtkinsonGreen: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Atkinson dithered - classic Mac green',
    width: 400,
    algorithm: 'atkinson',
    color: [0, 255, 0],
  },
};

// Atkinson with amber (like old monochrome monitors)
export const AtkinsonAmber: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Atkinson dithered - amber monochrome',
    width: 400,
    algorithm: 'atkinson',
    color: [255, 176, 0],
  },
};

// Floyd-Steinberg for comparison (smoother gradients)
export const FloydSteinberg: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Floyd-Steinberg dithered',
    width: 400,
    algorithm: 'floyd-steinberg',
    color: [0, 255, 0],
  },
};

// Bayer ordered dithering (the original pattern)
export const BayerOrdered: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Bayer ordered dithering',
    width: 400,
    algorithm: 'bayer',
    ditherSize: 1,
  },
};

// Large Bayer pattern
export const BayerLargePattern: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Large Bayer dither pattern',
    width: 400,
    algorithm: 'bayer',
    ditherSize: 2,
  },
};

// Cyan terminal color
export const CyanColor: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Cyan dithered image',
    width: 400,
    algorithm: 'atkinson',
    color: [0, 255, 255],
  },
};

// Hot pink
export const HotPinkColor: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Hot pink dithered image',
    width: 400,
    algorithm: 'atkinson',
    color: [255, 0, 255],
  },
};

// White (high contrast)
export const WhiteColor: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'White dithered image',
    width: 400,
    algorithm: 'atkinson',
    color: [255, 255, 255],
  },
};

// Custom threshold (darker)
export const DarkThreshold: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Dark threshold dithering',
    width: 400,
    algorithm: 'atkinson',
    threshold: 100,
  },
};

// Custom threshold (lighter)
export const LightThreshold: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Light threshold dithering',
    width: 400,
    algorithm: 'atkinson',
    threshold: 180,
  },
};

// Comparison grid
export const AlgorithmComparison: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <DitheredImage src={SAMPLE_IMAGE} alt="Atkinson" width={200} algorithm="atkinson" />
        <p className="mt-2 text-sm text-primary">Atkinson (Mac)</p>
      </div>
      <div className="text-center">
        <DitheredImage
          src={SAMPLE_IMAGE}
          alt="Floyd-Steinberg"
          width={200}
          algorithm="floyd-steinberg"
        />
        <p className="mt-2 text-sm text-primary">Floyd-Steinberg</p>
      </div>
      <div className="text-center">
        <DitheredImage src={SAMPLE_IMAGE} alt="Bayer" width={200} algorithm="bayer" />
        <p className="mt-2 text-sm text-primary">Bayer (Ordered)</p>
      </div>
    </div>
  ),
};
