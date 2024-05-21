export type FormState = Record<string, FormDataEntryValue>;

export const getFormState = (formElement: HTMLFormElement | null) => {
    const data = formElement && new FormData(formElement);
    const formState: FormState = {};
    if (data) {
        for (const [key, value] of data.entries()) {
            formState[key] = value;
        }
    }
    return formState;
};
