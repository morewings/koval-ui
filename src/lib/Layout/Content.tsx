import {forwardRef} from 'react';
import type {ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import {Row} from './Row.tsx';
import classes from './Layout.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Content = forwardRef<HTMLDivElement, Props>(({children, className, ...restProps}, ref) => {
    return (
        <Row {...restProps} ref={ref} className={classNames(classes.content, className)}>
            {children}
        </Row>
    );
});

Content.displayName = 'Content';
