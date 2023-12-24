import {Children, cloneElement, forwardRef} from 'react';
import type {ReactElement} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './FormField.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children: ReactElement;
        label: string;
        hint?: string;
    };

export const FormField = forwardRef<HTMLDivElement, Props>(
    ({className, children, label, hint, ...nativeProps}, ref) => {
        const inputProps = Children.only(children).props;
        const id = useInternalId(inputProps.id);
        const childrenWithProps = inputProps.id ? Children.only(children) : cloneElement(Children.only(children), {id});
        return (
            <div {...nativeProps} ref={ref} className={classNames(classes.wrapper, className)}>
                <label className={classNames(classes.label, {[classes.required]: inputProps.required})} htmlFor={id}>
                    {label}
                </label>
                {childrenWithProps}
                {hint && <div className={classes.hint}>{hint}</div>}
            </div>
        );
    }
);

FormField.displayName = 'FormField';
