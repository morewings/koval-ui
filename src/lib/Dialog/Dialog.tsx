import type {ReactNode, MouseEvent, KeyboardEvent, ComponentProps} from 'react';
import {forwardRef, useEffect, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
import {IconClose} from '@/internal/Icons';
import {H3} from '@/lib';
import {useFocusTrap} from '@/internal/hooks/useFocusTrap.ts';
import {ActionButton, ActionsTree} from '@/internal/Actions';

import {TransitionDialog} from './TransitionDialog.tsx';
import {useDialogState} from './useDialogState.tsx';
import classes from './Dialog.module.css';
import {Animations} from './types.ts';

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
        actions?: (
            | ComponentProps<typeof ActionButton>
            | [ComponentProps<typeof ActionButton>, ComponentProps<typeof ActionButton>]
        )[];
        /** Set a title of Dialog */
        dialogTitle?: string;
        /** Provide a localized value for close button */
        closeLabel?: string;
        /** Enable a focus trap for Dialog */
        trapFocus?: boolean;
        /** Select Dialog animation style */
        animation?: keyof typeof Animations;
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
            trapFocus = true,
            animation = Animations['slide-top'],
            ...nativeProps
        },
        ref
    ) => {
        const dialogRef = useInternalRef(ref);
        const {isOpen, closeDialog} = useDialogState(id);
        useFocusTrap(dialogRef.current, isOpen, trapFocus);
        useEffect(() => {
            if (isOpen) {
                dialogRef.current?.showModal();
                document.body.classList.add(classes.noScroll);
            }
            onToggle(isOpen);
        }, [dialogRef, onToggle, isOpen]);

        const handleSelfClose = useCallback(() => {
            onToggle(false);
            closeDialog();
        }, [closeDialog, onToggle]);

        const handleClick = useCallback(
            (event: MouseEvent<typeof dialogRef.current>) => {
                if (
                    (event.target as HTMLDialogElement).nodeName === 'DIALOG' &&
                    closeOnClickOutside
                ) {
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

        const handleExit = useCallback(() => {
            dialogRef.current?.close();
            document.body.classList.remove(classes.noScroll);
        }, [dialogRef]);

        return (
            <TransitionDialog
                animation={animation}
                unmountNode={true}
                show={isOpen}
                nodeRef={dialogRef}
                onExit={handleExit}>
                <dialog
                    {...nativeProps}
                    id={id}
                    onKeyDown={handleKeyPress}
                    onClick={handleClick}
                    className={classNames(classes.dialog, className)}
                    ref={dialogRef}>
                    <div className={classes.flex}>
                        {dialogTitle && (
                            <header className={classNames(classes.header)}>
                                <H3>{dialogTitle}</H3>
                            </header>
                        )}
                        <div className={classNames(classes.body)}>{children}</div>
                        <footer className={classes.actions}>
                            <ActionsTree actions={actions} />
                            {showCloseButton && (
                                <div key={`${id}-close`} className={classes.row}>
                                    <ActionButton
                                        onClick={handleSelfClose}
                                        icon={IconClose}
                                        title={closeLabel}
                                    />
                                </div>
                            )}
                        </footer>
                    </div>
                </dialog>
            </TransitionDialog>
        );
    }
);

Dialog.displayName = 'Dialog';
