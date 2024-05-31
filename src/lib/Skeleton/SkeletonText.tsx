import {useMemo, forwardRef} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {createArray} from '@/internal/utils/createArray.ts';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';
import {normalizeUnit} from '@/lib/Skeleton/normalizeUnit.ts';

import classes from './Skeleton.module.css';
import {SkeletonShape} from './SkeletonShape.tsx';
import type {SkeletonProps} from './SkeletonTypes.ts';

export type Props = DataAttributes & LibraryProps & SkeletonProps & {lines?: number};

export const SkeletonText = forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
            width = 'fluid',
            height,
            lines: linesProp = 3,
            marginY = 36,
            marginX = 0,
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
                'margin-y': marginY,
                'margin-x': marginX,
            }),
            [height, marginX, marginY, width]
        );
        const isSingle = linesProp === 1;
        const lines = createArray(linesProp - 1);
        return (
            <LocalRoot
                {...nativeProps}
                className={classNames(classes.skeletonText, className)}
                theme={theme}>
                {isSingle && <SkeletonShape marginY={9} height={24} />}
                {!isSingle &&
                    lines.map((_, i) => {
                        return <SkeletonShape marginY={9} key={i} height={24} />;
                    })}
                {!isSingle && (
                    <SkeletonShape marginY={9} className={classes.shortLine} height={24} />
                )}
            </LocalRoot>
        );
    }
);

SkeletonText.displayName = 'SkeletonText';
