import {
    forwardRef,
    Children,
    cloneElement,
    isValidElement,
    type ReactElement,
    type FieldsetHTMLAttributes,
    useMemo,
} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';
import type {ValidationState} from '@/internal/inputs';

import classes from './InputGroup.module.css';

type ChildProps = {
    name?: Props['name'];
    disabled?: Props['disabled'];
    required?: Props['required'];
    id?: Props['id'];
};

export type Props = DataAttributes &
    LibraryProps & {
        validation?: keyof typeof ValidationState;
        label?: string;
        children: ReactElement<ChildProps & unknown>[];
        name: string;
        /**
         * Disable input.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
         */
        disabled?: FieldsetHTMLAttributes<HTMLFieldSetElement>['disabled'];
        required?: boolean;
        hint?: string;
    };

export const InputGroup = forwardRef<HTMLFieldSetElement, Props>(
    ({className, validation, id, label, children, name, disabled, hint, required, ...nativeProps}, ref) => {
        const childrenWithProps = useMemo(() => {
            return Children.map(children, element => {
                if (isValidElement(element)) {
                    const nextProps = {name} as ChildProps;
                    /* Check if own prop is set and child doesn't have the same prop */
                    if (disabled !== undefined && typeof element.props.disabled !== 'boolean') {
                        nextProps.disabled = disabled;
                    }
                    if (required !== undefined && typeof element.props.required !== 'boolean') {
                        nextProps.required = required;
                    }
                    return cloneElement<ChildProps>(element, nextProps);
                }
                return element;
            });
        }, [children, disabled, name, required]);
        return (
            <fieldset
                {...nativeProps}
                className={classNames(classes.wrapper, className)}
                disabled={disabled}
                id={id}
                ref={ref}>
                <legend className={classes.legend} data-disabled={disabled}>
                    {label}
                </legend>
                <div className={classes.inputs}>{childrenWithProps}</div>
                {hint && <div className={classes.hint}>{hint}</div>}
            </fieldset>
        );
    }
);

InputGroup.displayName = 'InputGroup';
