import type {ReactNode, RefObject} from 'react';
import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';
import {Picture} from '@/lib';

import type {Props as ActionProps} from './Action.tsx';
import {Action} from './Action.tsx';
import classes from './Card.module.css';

enum Variants {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Provide an url for header image */
        headerImageUrl?: string;
        /** Provide an array of actions with callbacks */
        actions?: (ActionProps | [ActionProps, ActionProps])[];
        /** Set vertical or horizontal layout for the card */
        variant?: keyof typeof Variants;
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
            variant = 'vertical',
            width,
            height,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);
        const {LocalRoot, ref: internalRef} = useLocalTheme();
        useLinkRefs<HTMLDivElement>(ref, internalRef as RefObject<HTMLDivElement>);
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
                        [classes.vertical]: variant === Variants.vertical,
                        [classes.horizontal]: variant === Variants.horizontal,
                    },
                    className
                )}>
                {headerImageUrl && <Picture className={classes.headerImage} src={headerImageUrl} />}
                <div className={classes.body}>{children}</div>
                <footer className={classes.actions}>
                    {actions.map((actionSlot, i) => {
                        if (Array.isArray(actionSlot)) {
                            const [left, right] = actionSlot;
                            return (
                                <div key={`${id}-${i}`} className={classes.row}>
                                    <Action {...left} />
                                    <Action {...right} />
                                </div>
                            );
                        } else {
                            return (
                                <div key={`${id}-${i}`} className={classes.row}>
                                    <Action {...actionSlot} />
                                </div>
                            );
                        }
                    })}
                </footer>
            </LocalRoot>
        );
    }
);

Card.displayName = 'Card';
