import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Audio.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Audio = forwardRef<HTMLDivElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <div {...nativeProps} className={classNames(classes.audio, className)} ref={ref}>
                <audio src=""></audio>
                {children}
            </div>
        );
    }
);

Audio.displayName = 'Audio';
