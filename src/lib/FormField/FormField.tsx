import type {FC, ReactElement} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';

import classes from './FormField.module.css';

type Props<TInputProps> = DataAttributes &
    LibraryProps & {
        inputComponent: FC<TInputProps>;
        inputProps: TInputProps;
    };

export const FormField = <TInputProps extends {id?: string; required?: boolean}>({
    className,
    inputComponent: Input,
    inputProps = {} as TInputProps,
    ...nativeProps
}: Props<TInputProps>): ReactElement => {
    const {LocalRoot} = useLocalTheme();
    return (
        <LocalRoot {...nativeProps} className={classNames(classes.wrapper, className)}>
            <label
                className={classNames(classes.label, {
                    [classes.required]: inputProps.required,
                })}
                htmlFor={inputProps.id}>
                Hello
            </label>
            <Input {...inputProps} />
        </LocalRoot>
    );
};

FormField.displayName = 'FormField';
