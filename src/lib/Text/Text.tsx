import type {FC, ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Text: FC<Props> = forwardRef<HTMLDivElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <div {...nativeProps} ref={ref} className={classNames(classes.text, className)}>
                {children}
            </div>
        );
    }
);

Text.displayName = 'Text';
