/// <reference types="react" />
import { ExcalidrawElement, NonDeleted } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';
declare type ImageType = 'svg' | 'canvas';
declare type Props = {
    /**
     * Configures the export setting for SVG/Canvas
     */
    appState?: Partial<Omit<AppState, 'offsetTop' | 'offsetLeft'>> | null;
    /**
     * The css class applied to image to be rendered
     */
    className?: string;
    /**
     * The Excalidraw elements to be rendered as an image
     */
    elements: NonDeleted<ExcalidrawElement>[];
    /**
     * The height of the image to be rendered
     */
    height?: number | null;
    /**
     * The ref object to be used to render the image
     */
    imageContainerRef: {
        current: null | HTMLDivElement;
    };
    /**
     * The type of image to be rendered
     */
    imageType?: ImageType;
    /**
     * The css class applied to the root element of this component
     */
    rootClassName?: string | null;
    /**
     * The width of the image to be rendered
     */
    width?: number | null;
};
/**
 * @explorer-desc
 * A component for rendering Excalidraw elements as a static image
 */
export default function ExcalidrawImage({ elements, imageContainerRef, appState, rootClassName, }: Props): JSX.Element;
export {};
