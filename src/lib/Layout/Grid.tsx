import type {ReactNode} from 'react';
import {useLocalTheme} from 'css-vars-hook';
import {useMemo, forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import type {SizeUnit, FluidUnit} from './SizeTypes';
import classes from './Layout.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        /** Set Container width in pixels as a number or set to `fluid` to make it 100% */
        width?: SizeUnit | FluidUnit;
        /** Set amount of columns to place in container */
        base?: number;
        /** Set a gap between columns in pixels */
        gap?: number;
        /** Select HTML element to render as a container */
        as?: string;
        children: ReactNode;
    };

const normalizeWidth = (widthProp: Props['width']) => {
    if (widthProp === 'fluid') {
        return '100%';
    }
    return `${widthProp}px`;
};

export const Grid = forwardRef<HTMLElement, Props>(
    ({width = 1280, className, as = 'div', children, gap = 16, base = 12, ...nativeProps}, ref) => {
        const {LocalRoot, ref: internalRef} = useLocalTheme();
        useLinkRefs(ref, internalRef);
        const theme = useMemo(
            () => ({containerWidth: normalizeWidth(width), base, gap: `${gap}px`}),
            [width, gap, base]
        );
        return (
            <LocalRoot {...nativeProps} theme={theme} as={as} className={classNames(classes.grid, className)}>
                {children}
            </LocalRoot>
        );
    }
);

Grid.displayName = 'Grid';
