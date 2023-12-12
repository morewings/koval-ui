import {Children, cloneElement, forwardRef} from 'react';
import type {ReactElement} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

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
        const id = useInternalId(inputProps.id);
        const childrenWithId = inputProps.id ? Children.only(children) : cloneElement(Children.only(children), {id});
        return (
            <div {...nativeProps} ref={ref} className={classNames(classes.wrapper, className)}>
                <label className={classes.label} htmlFor={id}>
                    {label} {inputProps.required && <span className={classes.required}>*</span>}
                </label>
                {childrenWithId}
                {hint && <div className={classes.hint}>{hint}</div>}
            </div>
        );
    }
);

FormField.displayName = 'FormField';
