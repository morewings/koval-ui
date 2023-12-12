import {
    forwardRef,
    Children,
    cloneElement,
    isValidElement,
    type FC,
    type ChangeEvent,
    type ReactElement,
    type FieldsetHTMLAttributes,
    useMemo,
} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';
import type {Validation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputGroup.module.css';

type ChildProps = {
    name?: Props['name'];
    disabled?: Props['disabled'];
    required?: Props['required'];
    id?: Props['id'];
};

type Props = DataAttributes &
    LibraryProps & {
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        prefix?: FC;
        validation?: keyof typeof Validation;
        validator?: (event: ChangeEvent<HTMLInputElement>) => void;
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
    (
        {prefix: Prefix, className, validation, id, label, children, name, disabled, hint, required, ...nativeProps},
        ref
    ) => {
        const inputId = useInternalId();
        const childrenWithProps = useMemo(() => {
            return Children.map(children, (element, index) => {
                if (isValidElement(element)) {
                    const nextProps = {name} as ChildProps;
                    if (disabled !== undefined) {
                        nextProps.disabled = disabled;
                    }
                    if (required !== undefined) {
                        nextProps.required = required;
                    }
                    if (!element.props.id) {
                        nextProps.id = `${inputId}-${index}`;
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
