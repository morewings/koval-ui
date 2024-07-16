import type {MutableRefObject} from 'react';
import {type FormEvent, useEffect} from 'react';

const ChangeEvent = new Event('change', {bubbles: false});

export const useRevalidateOnFormChange = (
    inputRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>,
    validateInput: (event: FormEvent) => unknown,
    condition?: boolean
) => {
    useEffect(() => {
        if (condition) {
            const inputElement = inputRef?.current;
            const formElement = inputElement?.form;
            const revalidateInput = () => {
                inputElement && inputElement?.dispatchEvent(ChangeEvent);
                inputElement && validateInput(ChangeEvent as unknown as FormEvent);
            };
            formElement && formElement.addEventListener('change', revalidateInput);
            return () => {
                formElement && formElement.removeEventListener('change', revalidateInput);
            };
        }
    }, [inputRef, condition, validateInput]);
};
