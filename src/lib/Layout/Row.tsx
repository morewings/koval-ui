import {forwardRef} from 'react';
import type {ReactNode} from 'react';
import {useLocalTheme} from 'css-vars-hook';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import classes from './Layout.module.css';

type RowProps = DataAttributes &
    LibraryProps & {
        /** Select an HTML element to render as a container */
        as?: string;
        children: ReactNode;
    };

export const Row = forwardRef<HTMLElement, RowProps>(
    ({className, children, as = 'div', ...nativeProps}, ref) => {
        const {LocalRoot, ref: internalRef} = useLocalTheme();
        useLinkRefs(ref, internalRef);
        return (
            <LocalRoot {...nativeProps} as={as} className={classNames(classes.row, className)}>
                {children}
            </LocalRoot>
        );
    }
);

Row.displayName = 'Row';
