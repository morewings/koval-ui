import type {ReactNode} from 'react';
import {useMemo, forwardRef} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import classes from './Skeleton.module.css';
import {SkeletonShape} from './SkeletonShape.tsx';
import type {SkeletonProps} from './SkeletonTypes.ts';
import {normalizeUnit} from './normalizeUnit.ts';

export type Props = DataAttributes &
    LibraryProps &
    SkeletonProps & {
        children?: ReactNode;
        double?: boolean;
    };

export const SkeletonAction = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            width = 'fluid',
            height = 'fluid',
            marginY = 24,
            marginX = 0,
            double = false,
            ...nativeProps
        },
        ref
    ) => {
        const {LocalRoot, ref: innerRef} = useLocalTheme<HTMLDivElement>();
        useLinkRefs(ref, innerRef);
        const theme = useMemo(
            () => ({
                width: normalizeUnit(width),
                height: normalizeUnit(height),
                marginY,
                marginX,
            }),
            [height, marginX, marginY, width]
        );
        return (
            <LocalRoot
                {...nativeProps}
                className={classNames(classes.skeletonAction, className)}
                theme={theme}>
                <SkeletonShape className={classes.skeletonButton} height={36} />
                {double && <SkeletonShape className={classes.skeletonButton} height={36} />}
            </LocalRoot>
        );
    }
);

SkeletonAction.displayName = 'SkeletonAction';
