import {forwardRef} from 'react';
import type {ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {SizesConfig} from '@/lib/Layout/SizeTypes.tsx';

import {Col} from './Col.tsx';
import classes from './Layout.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Partial<SizesConfig> & {
        children?: ReactNode;
    };

export const Sidebar = forwardRef<HTMLDivElement, Props>(
    ({children, className, xs, sm, md, lg, xl, ...restProps}, ref) => {
        return (
            <Col
                {...restProps}
                as="aside"
                xs={xs}
                sm={sm}
                md={md}
                lg={lg}
                xl={xl}
                ref={ref}
                className={classNames(classes.aside, className)}>
                {children}
            </Col>
        );
    }
);

Sidebar.displayName = 'Sidebar';
