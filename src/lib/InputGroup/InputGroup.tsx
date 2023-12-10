import {forwardRef, Children, cloneElement, isValidElement} from 'react';
import classNames from 'classnames';

import classes from './InputGroup.module.css';
import type {Props} from './Types.ts';

export const InputGroup = forwardRef<HTMLFieldSetElement, Props>(
    ({prefix: Prefix, className, validation, id, label, children, name, disabled, hint, ...nativeProps}, ref) => {
        return (
            <fieldset {...nativeProps} className={classNames(classes.wrapper, className)} disabled={disabled} ref={ref}>
                <legend className={classes.legend} data-disabled={disabled}>
                    {label}
                </legend>
                <div className={classes.inputs}>
                    {Children.map(children, element => {
                        if (isValidElement(element)) {
                            return cloneElement<{name?: Props['name']; disabled?: Props['disabled']}>(element, {
                                name,
                                disabled,
                            });
                        }
                        return element;
                    })}
                </div>
                {hint && <div className={classes.hint}>{hint}</div>}
            </fieldset>
        );
    }
);

InputGroup.displayName = 'InputGroup';
