import {type ChangeEvent, useCallback} from 'react';
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
    onSubmit?: (event: SyntheticEvent<HTMLFormElement>, formState: FormState) => void;
    onInvalid?: (event: InvalidEvent<HTMLFormElement>, formState: FormState) => void;
    onReset?: (event: ChangeEvent<HTMLFormElement>, formState: FormState) => void;
    onChange?: (event: ChangeEvent<HTMLFormElement>, formState: FormState) => void;
};

type Props = DataAttributes &
    NativeProps &
    LibraryProps &
    CallbackProps & {
        children: ReactNode;
    };

export const Form = forwardRef<HTMLFormElement, Props>(
    (
        {
            className,
            children,
            onSubmit = () => {},
            onReset = () => {},
            onChange = () => {},
            onInvalid = () => {},
            ...nativeProps
        },
        ref
    ) => {
        const getFormState = useCallback((formElement: EventTarget & HTMLFormElement) => {
            const data = new FormData(formElement);
            const formState: FormState = {};
            for (const [key, value] of data.entries()) {
                formState[key] = value;
            }
            return formState;
        }, []);
        const handleSubmit = useCallback(
            (event: SyntheticEvent<HTMLFormElement>) => {
                const form = event.currentTarget;
                const data = new FormData(form);
                data.set('bar', 'bar');
                const formState = getFormState(form);
                onSubmit(event, formState);
            },
            [getFormState, onSubmit]
        );

        const handleError = useCallback(
            (event: InvalidEvent<HTMLFormElement>) => {
                const formState = getFormState(event.currentTarget);
                onInvalid(event, formState);
            },
            [getFormState, onInvalid]
        );

        const handleReset = useCallback(
            (event: ChangeEvent<HTMLFormElement>) => {
                const formState = getFormState(event.currentTarget);
                onReset(event, formState);
            },
            [getFormState, onReset]
        );

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLFormElement>) => {
                const formState = getFormState(event.currentTarget);
                onChange(event, formState);
            },
            [getFormState, onChange]
        );

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
