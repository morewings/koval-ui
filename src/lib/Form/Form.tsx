import {forwardRef, useRef} from 'react';
import type {ReactNode, SyntheticEvent} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';
import {useInnerRef} from '@/internal/hooks/useInnerRef.ts';

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
        form.reportValidity();
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
    const innerRef = useRef<HTMLFormElement>(null);
    useInnerRef<HTMLFormElement>(ref, innerRef);
    return (
        <form
            {...nativeProps}
            onSubmit={handleSubmit}
            onInvalid={handleError}
            onReset={handleReset}
            onChange={handleChange}
            ref={innerRef}
            className={classNames(classes.form, className)}>
            {children}
        </form>
    );
});

Form.displayName = 'Form';
