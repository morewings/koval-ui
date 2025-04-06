import type {ReactNode, RefObject} from 'react';
import {Children, useMemo} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';
import {useVirtualizer} from '@tanstack/react-virtual';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import classes from './VirtualList.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * Provide average item height in pixels.
         */
        averageItemHeight: number;
        /** Set the total height of the list in pixels */
        height: number;
        /** Set the total width of the list in pixels */
        width: number;
        /**
         * Enable to support items with different heights.
         * The actual height of each item is checked during the render, so items never cut.
         */
        variableItemSize?: boolean;
        children: ReactNode[];
    };

export const VirtualList = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            averageItemHeight,
            height,
            width,
            variableItemSize = false,
            ...nativeProps
        },
        ref
    ) => {
        const childrenArray = useMemo(() => Children.toArray(children), [children]);
        const {ref: providerRef, LocalRoot} = useLocalTheme();
        useLinkRefs<HTMLDivElement>(ref, providerRef as RefObject<HTMLDivElement>);
        const rowVirtualizer = useVirtualizer({
            count: childrenArray.length,
            getScrollElement: () => providerRef?.current,
            estimateSize: () => averageItemHeight,
            overscan: 6,
        });

        const items = rowVirtualizer.getVirtualItems();

        const totalSize = rowVirtualizer.getTotalSize();

        const firstItemStartPosition = items[0]?.start ?? 0;

        const theme = useMemo(
            () => ({
                width,
                height,
                'total-size': totalSize,
                'first-item-start-position': firstItemStartPosition,
            }),
            [firstItemStartPosition, height, totalSize, width]
        );

        return (
            <LocalRoot
                {...nativeProps}
                className={classNames(classes.virtualList, className)}
                theme={theme}>
                <div className={classes.heightContainer}>
                    <div className={classes.viewport}>
                        {items.map(virtualRow => (
                            <div
                                ref={variableItemSize ? rowVirtualizer.measureElement : undefined}
                                key={virtualRow.index}
                                data-index={virtualRow.index}>
                                {childrenArray[virtualRow.index]}
                            </div>
                        ))}
                    </div>
                </div>
            </LocalRoot>
        );
    }
);

VirtualList.displayName = 'VirtualList';
