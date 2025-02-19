import {type ChangeEvent, useCallback} from 'react';
import {forwardRef} from 'react';
import type {ReactNode, SyntheticEvent, FormHTMLAttributes, InvalidEvent} from 'react';
import classNames from 'classnames';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import {withFormProvider} from './withFormProvider.tsx';
import classes from './Form.module.css';
import {useFormActions, useFormSelectors} from './useFormContext.ts';

type FormState = Record<string, FormDataEntryValue>;

type Props = DataAttributes &
    LibraryProps & {
        /**
         * Set the name of the HTMLFormElement.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/name
         */
        name?: FormHTMLAttributes<HTMLFormElement>['name'];
        /**
         * Define whether inputted text is automatically capitalized and, if so, in what manner.
         * Relevant for mobile devices with virtual keyboards or voice input
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize
         */
        autoCapitalize?: FormHTMLAttributes<HTMLFormElement>['autoCapitalize'];
        /**
         * Control autocomplete behavior
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
         */
        autoComplete?: FormHTMLAttributes<HTMLFormElement>['autoComplete'];
        /**
         * Disable validation
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#novalidate
         */
        noValidate?: FormHTMLAttributes<HTMLFormElement>['noValidate'];
        /**
         * Callback when the form was submitted. Gets form state as a second parameter
         */
        onSubmit?: (event: SyntheticEvent<HTMLFormElement>, formState: FormState) => void;
        /**
         * Callback when the form has failed validation. Gets form state as a second parameter
         */
        onInvalid?: (event: InvalidEvent<HTMLFormElement>, formState: FormState) => void;
        /**
         * Callback when the form was reset. Gets form state as a second parameter
         */
        onReset?: (event: ChangeEvent<HTMLFormElement>, formState: FormState) => void;
        /**
         * Callback when the form content was change. Gets form state as a second parameter
         */
        onChange?: (event: ChangeEvent<HTMLFormElement>, formState: FormState) => void;
        children: ReactNode;
    };

const Form = forwardRef<HTMLFormElement, Props>(
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
        const {markAsPristine, markAsDirty} = useFormActions();
        const getFormState = useCallback((formElement: EventTarget & HTMLFormElement) => {
            const data = new FormData(formElement);
            const formState: FormState = {};
            for (const [key, value] of data.entries()) {
                formState[key] = value;
            }
            return formState;
        }, []);
        const handleSubmit = useCallback(
            (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
                event.preventDefault();
                const form = event.currentTarget as HTMLFormElement;
                // const data = new FormData(form);
                // data.set('bar', 'bar');
                const formState = getFormState(form);
                onSubmit(event, formState);
            },
            [getFormState, onSubmit]
        );

        const handleError = useCallback(
            (event: InvalidEvent<HTMLFormElement>) => {
                markAsDirty();
                const formState = getFormState(event.currentTarget);
                onInvalid(event, formState);
            },
            [getFormState, markAsDirty, onInvalid]
        );

        const handleReset = useCallback(
            (event: ChangeEvent<HTMLFormElement>) => {
                const formState = getFormState(event.currentTarget);
                markAsPristine();
                onReset(event, formState);
            },
            [getFormState, onReset, markAsPristine]
        );

        const {pristine} = useFormSelectors();
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLFormElement>) => {
                pristine && markAsDirty();
                const formState = getFormState(event.currentTarget);
                onChange(event, formState);
            },
            [getFormState, onChange, markAsDirty, pristine]
        );

        const innerRef = useInternalRef<HTMLFormElement>(ref);
        return (
            <form
                {...nativeProps}
                autoFocus={true}
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

export {Form as FormVanilla};

const WrappedForm = withFormProvider(Form);

export {WrappedForm as Form};
