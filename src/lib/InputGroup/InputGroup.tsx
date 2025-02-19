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

import classes from './InputGroup.module.css';

type ChildProps = {
    name?: Props['name'];
    disabled?: Props['disabled'];
    required?: Props['required'];
    id?: Props['id'];
};

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * Set a label text for the group
         */
        label?: string;
        children: ReactElement<ChildProps & unknown>[];
        /**
         * Provide a name for each input control in the group
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name
         */
        name: string;
        /**
         * Disable all inputs in the group
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled
         */
        disabled?: FieldsetHTMLAttributes<HTMLFieldSetElement>['disabled'];
        /**
         * Make all inputs in the group required
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
         */
        required?: boolean;
        /**
         * Set a text for the hint displayed below the group
         */
        hint?: string;
    };

export const InputGroup = forwardRef<HTMLFieldSetElement, Props>(
    ({className, id, label, children, name, disabled, hint, required, ...nativeProps}, ref) => {
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
                <legend className={classNames(classes.legend, {[classes.disabled]: disabled})}>
                    {label}
                </legend>
                <div className={classes.inputs}>{childrenWithProps}</div>
                {hint && <div className={classes.hint}>{hint}</div>}
            </fieldset>
        );
    }
);

InputGroup.displayName = 'InputGroup';
