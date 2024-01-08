import type {ReactNode, MouseEvent} from 'react';
import {forwardRef, useEffect, useState, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
// import {useOutsideClick} from '@/internal/hooks/useOutsideClick.ts';

import classes from './Dialog.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        open?: boolean;
        closeOnClickOutside?: boolean;
    };

export const Dialog = forwardRef<HTMLDialogElement, Props>(
    ({children, className, open = false, closeOnClickOutside, ...nativeProps}, ref) => {
        const dialogRef = useInternalRef(ref);
        const [isOpen, setOpen] = useState(open);
        useEffect(() => {
            console.log('isOpen', isOpen);
            if (isOpen) {
                dialogRef.current?.showModal();
            } else {
                dialogRef.current?.close();
            }
        }, [dialogRef, isOpen]);

        const handleClick = useCallback(
            (event: MouseEvent<typeof dialogRef.current>) => {
                if ((event.target as HTMLDialogElement).nodeName === 'DIALOG') {
                    // dialogRef.current?.close();
                    setOpen(false);
                }
            },
            [dialogRef, setOpen]
        );

        return (
            <dialog
                {...nativeProps}
                onClick={handleClick}
                className={classNames(classes.dialog, className)}
                ref={dialogRef}>
                {children}
            </dialog>
        );
    }
);

Dialog.displayName = 'Dialog';
