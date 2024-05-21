import type {DetailedHTMLProps, ImgHTMLAttributes} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Picture.module.css';

type IntrinsicWidth = `${number}w`;
type DensityDescriptor = `${number}x`;

type Source = {
    /**
     * Provide the source image url
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/src
     * @see https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
     */
    src: string;
    /**
     * Provide the source image MIME type
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#type
     */
    type?: string;
    /**
     * Provide media condition for the source image
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#media
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries
     */
    mediaCondition?: string;
    /**
     * Provide width of the slot the image will fill when the media condition is true
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#sizes
     */
    slotWidth?: string;
    /**
     * Provide the source image display height in pixels
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#height
     */
    width?: number;
    /**
     * Provide the source image display width in pixels
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#width
     */
    height?: number;
} & (
    | {
          /**
           * Provide the source image width descriptor. Has to be a positive integer directly followed by w. E.g. 480w
           * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#srcset
           * @see https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size
           */
          intrinsicWidth?: IntrinsicWidth;
          density?: never;
      }
    | {
          intrinsicWidth?: never;
          /**
           * Provide the source image pixel density descriptor. Has to be a positive floating point number directly followed by x. E.g. 2x
           * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#srcset
           * @see https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size
           */
          density?: DensityDescriptor;
      }
);

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * Provide default image url
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/src
         */
        src: string;
        /**
         * Set default image width
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/width
         */
        width?: number;
        /**
         * Set default image height
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/height
         */
        height?: number;
        /**
         * Provide alternate text to display when the image is not loaded or for use by assistive devices
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt
         */
        alt?: string;
        /**
         * Provide alternative sources configs array
         * @see SourceDensity
         * @see SourceWidth
         */
        sources?: Source[];
        /**
         * Set image loading behavior
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading
         */
        loading?: DetailedHTMLProps<
            ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
        >['loading'];
    };

export const Picture = forwardRef<HTMLDivElement, Props>(
    ({className, alt, src, sources, width, height, loading = 'lazy', ...nativeProps}, ref) => {
        return (
            <picture {...nativeProps} className={classNames(classes.picture, className)} ref={ref}>
                {sources?.map(
                    ({
                        src,
                        mediaCondition,
                        density = '1x',
                        intrinsicWidth,
                        slotWidth = '',
                        type,
                        width: srcWidth,
                        height: srcHeight,
                    }) => {
                        const srcParam = intrinsicWidth ?? density;
                        return (
                            <source
                                type={type}
                                srcSet={`${src} ${srcParam}`}
                                media={`${mediaCondition} ${slotWidth}`}
                                width={srcWidth}
                                height={srcHeight}
                                key={src}
                            />
                        );
                    }
                )}
                <img width={width} height={height} loading={loading} src={src} alt={alt} />
            </picture>
        );
    }
);

Picture.displayName = 'Picture';
