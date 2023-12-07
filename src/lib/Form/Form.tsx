import {forwardRef} from 'react';
import type {ReactNode, SyntheticEvent} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';

import classes from './Form.module.css';

type Props = DataAttributes &
    LibraryProps & {
        children: ReactNode;
    };

export const Form = forwardRef<HTMLFormElement, Props>(({className, children, ...nativeProps}, ref) => {
    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        data.set('bar', 'bar');
        const formState: Record<string, FormDataEntryValue> = {};
        for (const [key, value] of data.entries()) {
            formState[key] = value;
        }
        console.log('formState', formState);
    };

    const handleError = (event: SyntheticEvent<HTMLFormElement>) => {
        console.log('onInvalid', event.target);
    };

    const handleReset = (event: SyntheticEvent<HTMLFormElement>) => {
        console.log(event.target);
    };

    const handleChange = (event: SyntheticEvent<HTMLFormElement>) => {
        console.log(event.target);
    };
    return (
        <form
            {...nativeProps}
            onSubmit={handleSubmit}
            onInvalid={handleError}
            onReset={handleReset}
            onChange={handleChange}
            ref={ref}
            className={classNames(classes.form, className)}>
            {children}
        </form>
    );
});

Form.displayName = 'Form';
