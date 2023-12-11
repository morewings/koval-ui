import type {FC, ReactNode} from 'react';
import {useLocalTheme} from 'css-vars-hook';
import {useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import type {SizeUnit, FluidUnit} from './SizeTypes';
import classes from './Layout.module.css';

export type ContainerProps = DataAttributes &
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

const normalizeWidth = (widthProp: ContainerProps['width']) => {
    if (widthProp === 'fluid') {
        return '100%';
    }
    return `${widthProp}px`;
};

export const Container: FC<ContainerProps> = ({width = 1280, className, as = 'div', children, gap = 16, base = 12}) => {
    const {LocalRoot} = useLocalTheme();
    const theme = useMemo(() => ({containerWidth: normalizeWidth(width), base, gap: `${gap}px`}), [width, gap, base]);
    return (
        <LocalRoot theme={theme} as={as} className={classNames(classes.container, className)}>
            {children}
        </LocalRoot>
    );
};
