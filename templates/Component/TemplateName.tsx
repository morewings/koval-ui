import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './TemplateName.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const TemplateName = forwardRef<HTMLDivElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <div {...nativeProps} className={classNames(classes.templateName, className)} ref={ref}>
                {children}
            </div>
        );
    }
);

TemplateName.displayName = 'TemplateName';
