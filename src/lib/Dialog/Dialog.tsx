import type {ReactNode, MouseEvent, KeyboardEvent} from 'react';
import {forwardRef, useEffect, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
import {IconClose} from '@/internal/Icons';

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
                if ((event.target as HTMLDialogElement).nodeName === 'DIALOG') {
                    closeOnClickOutside && handleSelfClose();
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
                {showCloseButton && <IconClose className={classes.close} onClick={handleSelfClose} />}
                {children}
            </dialog>
        );
    }
);

Dialog.displayName = 'Dialog';
