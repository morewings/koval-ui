import {forwardRef} from 'react';
import type {FC, ReactNode} from 'react';
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

export const Main: FC<Props> = forwardRef<HTMLDivElement, Props>(
    ({children, className, xs = 'fluid', sm, md, lg, xl, ...restProps}, ref) => {
        return (
            <Col
                {...restProps}
                as="main"
                ref={ref}
                xs={xs}
                sm={sm}
                md={md}
                lg={lg}
                xl={xl}
                className={classNames(classes.main, className)}>
                {children}
            </Col>
        );
    }
);

Main.displayName = 'Main';
