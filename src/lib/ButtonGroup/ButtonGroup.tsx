import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './ButtonGroup.module.css';

enum Layouts {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        layout?: keyof typeof Layouts;
    };

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
    ({children, className, layout = Layouts.horizontal, ...nativeProps}, ref) => {
        return (
            <div
                {...nativeProps}
                className={classNames(
                    classes.buttonGroup,
                    {
                        [classes.horizontal]: layout === Layouts.horizontal,
                        [classes.vertical]: layout === Layouts.vertical,
                    },
                    className
                )}
                ref={ref}>
                {children}
            </div>
        );
    }
);

ButtonGroup.displayName = 'ButtonGroup';
