import type {ReactNode} from 'react';
import {useMemo, forwardRef} from 'react';
import {useLocalTheme} from 'css-vars-hook';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import {Offsets, Sizes} from './SizeTypes';
import type {OffsetConfig, SizesConfig} from './SizeTypes';
import classes from './Layout.module.css';

export type ColProps = DataAttributes &
    LibraryProps &
    Partial<SizesConfig> &
    Partial<OffsetConfig> & {
        /** Select an HTML element to render as a container */
        as?: string;
        children?: ReactNode;
    };

const filterUndefined = (target: Record<string, number | string | undefined>) => {
    return Object.fromEntries(Object.entries(target).filter(([_, v]) => v !== undefined)) as Record<
        string,
        number | string
    >;
};

export const Col = forwardRef<HTMLElement, ColProps>(
    (
        {
            as = 'div',
            children,
            className,
            xs,
            sm,
            md,
            lg,
            xl,
            shiftXS,
            shiftSM,
            shiftMD,
            shiftLG,
            shiftXL,
            ...nativeProps
        },
        ref
    ) => {
        const {LocalRoot, ref: internalRef} = useLocalTheme();
        useLinkRefs(ref, internalRef);
        const theme = useMemo(
            () =>
                filterUndefined({
                    [Sizes.xs]: xs ?? '',
                    [Sizes.sm]: sm ?? '',
                    [Sizes.md]: md ?? '',
                    [Sizes.lg]: lg ?? '',
                    [Sizes.xl]: xl ?? '',
                    [Offsets.xs]: shiftXS ?? '',
                    [Offsets.sm]: shiftSM ?? '',
                    [Offsets.md]: shiftMD ?? '',
                    [Offsets.lg]: shiftLG ?? '',
                    [Offsets.xl]: shiftXL ?? '',
                }),
            [xs, sm, md, lg, xl, shiftXS, shiftSM, shiftMD, shiftLG, shiftXL]
        );
        return (
            <LocalRoot
                {...nativeProps}
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
    }
);

Col.displayName = 'Col';
