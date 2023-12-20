import type {ReactElement} from 'react';
import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Figure.module.css';

enum Positions {
    center = 'center',
    left = 'left',
    right = 'right',
}

export type Props = DataAttributes &
    LibraryProps & {
        children: ReactElement;
        caption?: string;
        position?: keyof typeof Positions;
    };

export const Figure = forwardRef<HTMLDivElement, Props>(
    ({children, className, caption, position = Positions.center, ...nativeProps}, ref) => {
        const theme = useMemo(
            () => ({
                position,
            }),
            [position]
        );
        const {LocalRoot} = useLocalTheme();
        return (
            <LocalRoot theme={theme} className={classes.wrapper}>
                <figure {...nativeProps} className={classNames(classes.figure, className)} ref={ref}>
                    {children}
                    {caption && <figcaption>{caption}</figcaption>}
                </figure>
            </LocalRoot>
        );
    }
);

Figure.displayName = 'Figure';
