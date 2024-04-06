import type {ReactNode, MouseEvent, KeyboardEvent} from 'react';
import {forwardRef, useEffect, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
import {IconClose} from '@/internal/Icons';
import {H3} from '@/lib';

import type {Props as ActionProps} from './Action.tsx';
import {Action} from './Action.tsx';
import {useDialogState} from './useDialogState.tsx';
import classes from './Dialog.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        /** Provide unique id for Dialog */
        id: NonNullable<LibraryProps['id']>;
        children?: ReactNode;
        /** Configure outside click behavior */
        closeOnClickOutside?: boolean;
        /** Callback triggered when Dialog toggles */
        onToggle?: (open: boolean) => void;
        /** Display close icon at the right top corner */
        showCloseButton?: boolean;
        /** Provide an array of actions with callbacks */
        actions?: (ActionProps | [ActionProps, ActionProps])[];
        /** Set a title of dialog */
        dialogTitle?: string;
        /** Provide a localized value for close button */
        closeLabel?: string;
    };

export const Dialog = forwardRef<HTMLDialogElement, Props>(
    (
        {
            children,
            className,
            closeOnClickOutside = true,
            showCloseButton = true,
            onToggle = () => {},
            id,
            actions = [],
            dialogTitle,
            closeLabel = 'Close',
            ...nativeProps
        },
        ref
    ) => {
        const dialogRef = useInternalRef(ref);
        const {isOpen, closeDialog} = useDialogState(id);
        useEffect(() => {
            if (isOpen) {
                dialogRef.current?.showModal();
            } else {
                dialogRef.current?.close();
            }
            onToggle(isOpen);
        }, [dialogRef, onToggle, isOpen]);

        const handleSelfClose = useCallback(() => {
            onToggle(false);
            closeDialog();
        }, [closeDialog, onToggle]);

        const handleClick = useCallback(
            (event: MouseEvent<typeof dialogRef.current>) => {
                if ((event.target as HTMLDialogElement).nodeName === 'DIALOG' && closeOnClickOutside) {
                    handleSelfClose();
                }
            },
            [dialogRef, handleSelfClose, closeOnClickOutside]
        );

        const handleKeyPress = useCallback(
            (event: KeyboardEvent<HTMLDialogElement>) => {
                event.code === 'Escape' && handleSelfClose();
            },
            [handleSelfClose]
        );

        return (
            <dialog
                {...nativeProps}
                id={id}
                onKeyDown={handleKeyPress}
                onClick={handleClick}
                className={classNames(classes.dialog, {[classes.flex]: isOpen}, className)}
                ref={dialogRef}>
                {dialogTitle && (
                    <header className={classNames(classes.header, className)}>
                        <H3>{dialogTitle}</H3>
                    </header>
                )}
                <div className={classNames(classes.body, className)}>{children}</div>
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
                    {showCloseButton && (
                        <div key={`${id}-close`} className={classes.row}>
                            <Action onClick={handleSelfClose} icon={IconClose} title={closeLabel} />
                        </div>
                    )}
                </footer>
            </dialog>
        );
    }
);

Dialog.displayName = 'Dialog';
