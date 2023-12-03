import type {FC, ReactNode} from 'react';
import {useMemo} from 'react';
import {useLocalTheme} from 'css-vars-hook';
import classNames from 'classnames';

import type {OffsetConfig, SizesConfig} from './SizeTypes';
import classes from './Layout.module.css';

export type ColProps = Partial<SizesConfig> &
    Partial<OffsetConfig> & {
        /** Select an HTML element to render as a container */
        as?: string;
        children?: ReactNode;
        className?: string;
    };

const filterUndefined = (target: Record<string, number | string | undefined>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.fromEntries(Object.entries(target).filter(([_, v]) => v !== undefined)) as Record<
        string,
        number | string
    >;
};

export const Col: FC<ColProps> = ({
    as = 'div',
    children,
    className,
    xs,
    sm,
    md,
    lg,
    xl,
    offsetXS,
    offsetSM,
    offsetMD,
    offsetLG,
    offsetXL,
}) => {
    const {LocalRoot} = useLocalTheme();

    const theme = useMemo(
        () =>
            filterUndefined({
                xs: xs ?? '',
                sm: sm ?? '',
                md: md ?? '',
                lg: lg ?? '',
                xl: xl ?? '',
                offsetXS: offsetXS ?? '',
                offsetSM: offsetSM ?? '',
                offsetMD: offsetMD ?? '',
                offsetLG: offsetLG ?? '',
                offsetXL: offsetXL ?? '',
            }),
        [xs, sm, md, lg, xl, offsetXS, offsetSM, offsetMD, offsetLG, offsetXL]
    );
    return (
        <LocalRoot
            theme={theme}
            as={as}
            className={classNames(
                classes.column,
                {
                    [classes.xs]: !!xs,
                    [classes.sm]: !!sm,
                    [classes.md]: !!md,
                    [classes.lg]: !!lg,
                    [classes.xl]: !!xl,
                    [classes['fluid-xs']]: xs === 'fluid',
                    [classes['fluid-sm']]: sm === 'fluid',
                    [classes['fluid-md']]: md === 'fluid',
                    [classes['fluid-lg']]: lg === 'fluid',
                    [classes['fluid-xl']]: xl === 'fluid',
                },
                className
            )}>
            {children}
        </LocalRoot>
    );
};
