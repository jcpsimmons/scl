import * as React from 'react';
interface DitheredImageProps extends Omit<React.HTMLAttributes<HTMLCanvasElement>, 'color'> {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    /** Size of dither pattern pixels (default: 2) */
    ditherSize?: number;
    /** RGB color for lit pixels (default: terminal green [0, 255, 0]) */
    color?: [number, number, number];
}
declare const DitheredImage: React.ForwardRefExoticComponent<DitheredImageProps & React.RefAttributes<HTMLCanvasElement>>;
export { DitheredImage };
export type { DitheredImageProps };
//# sourceMappingURL=dithered-image.d.ts.map