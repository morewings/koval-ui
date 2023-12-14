import {useCallback} from 'react';
import {forwardRef} from 'react';
import type {ReactNode, SyntheticEvent, FormHTMLAttributes, InvalidEvent} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './Form.module.css';

type FormState = Record<string, FormDataEntryValue>;

type NativeProps = {
    name?: FormHTMLAttributes<HTMLFormElement>['name'];
    autoCapitalize?: FormHTMLAttributes<HTMLFormElement>['autoCapitalize'];
    autoComplete?: FormHTMLAttributes<HTMLFormElement>['autoComplete'];
    noValidate?: FormHTMLAttributes<HTMLFormElement>['noValidate'];
};

type CallbackProps = {
    onSubmit?: FormHTMLAttributes<HTMLFormElement>['onSubmit'];
    onInvalid?: FormHTMLAttributes<HTMLFormElement>['onInvalid'];
    onReset?: FormHTMLAttributes<HTMLFormElement>['onReset'];
    onChange?: FormHTMLAttributes<HTMLFormElement>['onChange'];
    onSubmitState?: (state: FormState) => void;
};

type Props = DataAttributes &
    NativeProps &
    LibraryProps &
    CallbackProps & {
        children: ReactNode;
    };

export const Form = forwardRef<HTMLFormElement, Props>(
    ({className, children, onSubmitState = () => {}, onSubmit = () => {}, ...nativeProps}, ref) => {
        const getFormState = useCallback((formElement: EventTarget & HTMLFormElement) => {
            const data = new FormData(formElement);
            const formState: FormState = {};
            for (const [key, value] of data.entries()) {
                formState[key] = value;
            }
            return formState;
        }, []);
        const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();
            const form = event.currentTarget;
            const data = new FormData(form);
            data.set('bar', 'bar');
            form.reportValidity();
            const formState = getFormState(form);
            onSubmit(event);
            onSubmitState(formState);
            console.log('formState', formState);
        };

        const handleError = (event: InvalidEvent<HTMLFormElement>) => {
            console.log('onInvalid', event.target.name);
        };

        const handleReset = (event: SyntheticEvent<HTMLFormElement>) => {
            console.log(event.target);
        };

        const handleChange = (event: SyntheticEvent<HTMLFormElement>) => {
            console.log(event.target);
        };
        const innerRef = useInternalRef<HTMLFormElement>(ref);
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
    }
);

Form.displayName = 'Form';
