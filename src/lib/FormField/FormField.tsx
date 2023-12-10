import {Children, forwardRef} from 'react';
import type {ReactElement} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';

import classes from './FormField.module.css';

type Props = DataAttributes &
    LibraryProps & {
        children: ReactElement;
        label: string;
        hint?: string;
    };

export const FormField = forwardRef<HTMLDivElement, Props>(
    ({className, children, label, hint, ...nativeProps}, ref) => {
        const inputProps = Children.only(children).props;
        return (
            <div {...nativeProps} ref={ref} className={classNames(classes.wrapper, className)}>
                <label className={classes.label} htmlFor={inputProps.id}>
                    {label} {inputProps.required && <span className={classes.required}>*</span>}
                </label>
                {children}
                {hint && <div className={classes.hint}>{hint}</div>}
            </div>
        );
    }
);

FormField.displayName = 'FormField';
