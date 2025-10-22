import type {ComponentProps, ReactNode} from 'react';
import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';
import {Picture} from '@/lib';
import type {ActionButton} from '@/internal/Actions';
import {ActionsTree} from '@/internal/Actions';

import classes from './Card.module.css';

enum Layouts {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Provide an url for header image */
        headerImageUrl?: string;
        /** Provide an array of actions with callbacks */
        actions?: (
            | ComponentProps<typeof ActionButton>
            | [ComponentProps<typeof ActionButton>, ComponentProps<typeof ActionButton>]
        )[];
        /** Set a vertical or horizontal layout for the card */
        layout?: keyof typeof Layouts;
        /** Provide width of the card. Applied in vertical mode */
        width?: number;
        /** Provide height of the card. Applied in horizontal mode */
        height?: number;
    };

export const Card = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            headerImageUrl,
            actions = [],
            id: idProp,
            layout = Layouts.vertical,
            width,
            height,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);
        const {LocalRoot, ref: internalRef} = useLocalTheme<HTMLDivElement>();
        useLinkRefs(ref, internalRef);
        const theme = useMemo(
            () => ({width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto'}),
            [height, width]
        );
        return (
            <LocalRoot
                {...nativeProps}
                theme={theme}
                id={id}
                className={classNames(
                    classes.card,
                    {
                        [classes.vertical]: layout === Layouts.vertical,
                        [classes.horizontal]: layout === Layouts.horizontal,
                    },
                    className
                )}>
                {headerImageUrl && <Picture className={classes.headerImage} src={headerImageUrl} />}
                <div className={classes.body}>{children}</div>
                <footer className={classes.actions}>
                    <ActionsTree
                        actions={actions}
                        classNameAction={classes.actionButton}
                        classNameRow={classes.row}
                    />
                </footer>
            </LocalRoot>
        );
    }
);

Card.displayName = 'Card';
