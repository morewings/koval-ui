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
        id: NonNullable<LibraryProps['id']>;
        children?: ReactNode;
        closeOnClickOutside?: boolean;
        onToggle?: (open: boolean) => void;
    };

export const Dialog = forwardRef<HTMLDialogElement, Props>(
    ({children, className, closeOnClickOutside, onToggle = () => {}, id, ...nativeProps}, ref) => {
        const dialogRef = useInternalRef(ref);
        const {isOpen, closeDialog} = useDialogState(id);
        console.log(isOpen);
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
                    handleSelfClose();
                }
            },
            [dialogRef, handleSelfClose]
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
                className={classNames(classes.dialog, className)}
                ref={dialogRef}>
                <IconClose className={classes.close} onClick={handleSelfClose} />
                <div className={classes.flex}>{children}</div>
            </dialog>
        );
    }
);

Dialog.displayName = 'Dialog';
