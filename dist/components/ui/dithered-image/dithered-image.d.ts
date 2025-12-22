import * as React from 'react';
interface DitheredImageProps extends Omit<React.HTMLAttributes<HTMLCanvasElement>, 'color'> {
    src: string;
    alt?: string;
    /** Width in pixels. If only width is set, height is calculated from aspect ratio */
    width?: number;
    /** Height in pixels. If only height is set, width is calculated from aspect ratio */
    height?: number;
    /** Size of dither pattern pixels (default: 1) */
    ditherSize?: number;
    /** RGB color for lit pixels (default: terminal green [0, 255, 0]) */
    color?: [number, number, number];
}
declare const DitheredImage: React.ForwardRefExoticComponent<DitheredImageProps & React.RefAttributes<HTMLCanvasElement>>;
export { DitheredImage };
export type { DitheredImageProps };
//# sourceMappingURL=dithered-image.d.ts.map