import {Children, cloneElement, forwardRef, useMemo} from 'react';
import type {ReactElement} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './FormField.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children: ReactElement;
        /** Set text label */
        label: string;
        /** Set hint text to be displayed below the input */
        hint?: string;
        /**
         * Renders * character after label indicating required input status.
         * Also, set automatically when required input is provided.
         */
        required?: boolean;
    };

export const FormField = forwardRef<HTMLDivElement, Props>(
    ({className, children, label, hint, required, ...nativeProps}, ref) => {
        const inputProps = Children.only(children).props;
        const id = useInternalId(inputProps.id);
        const hintId = `${id}-hint`;
        const childrenWithProps = useMemo(
            () =>
                cloneElement(Children.only(children), {
                    id,
                    ...(hint && {'aria-describedby': hintId}),
                }),
            [children, hint, hintId, id]
        );
        return (
            <div {...nativeProps} ref={ref} className={classNames(classes.wrapper, className)}>
                <label
                    className={classNames(classes.label, {
                        [classes.required]: inputProps.required || required,
                    })}
                    htmlFor={id}>
                    {label}
                </label>
                {childrenWithProps}
                {hint && (
                    <div className={classes.hint} id={hintId}>
                        {hint}
                    </div>
                )}
            </div>
        );
    }
);

FormField.displayName = 'FormField';
