import type {ComponentProps, FC, ChangeEvent, JSX} from 'react';
import {useMemo, useState, useCallback, useEffect, memo} from 'react';
import classNames from 'classnames';

import {Dialog, useDialogState} from '@/lib/Dialog';
import {FormField} from '@/lib/FormField';
import {InputText} from '@/lib/InputText';
import {InputNumeric} from '@/lib/InputNumeric';
import {InputDate} from '@/lib/InputDate';
import {Select} from '@/lib/Select';
import {IconEdit, IconClose, IconColumns} from '@/internal/Icons';
import {useBrowserLocale} from '@/internal/locale';

import classes from './Dialog.module.css';
import type {TableValue} from './../types.ts';
import {ColumnTypes} from './../types.ts';
import {PercentageInput} from './PercentageInput.tsx';

export type ColumnsConfig = {
    id: string;
    name: string;
    type: keyof typeof ColumnTypes;
};

export type Props = {
    id: string;
    columnsConfig?: ColumnsConfig[];
    onEdit: (columnId: string, value: TableValue) => void;
    selectionAmount?: number;
};

const withValueMapping = <TProps extends JSX.IntrinsicAttributes>(Component: FC<TProps>) => {
    const Wrapped: FC<
        Omit<ComponentProps<typeof Component>, 'onChange'> & {onChange?: (value: string) => void}
    > = ({onChange = () => {}, ...restProps}) => {
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event.target?.value);
            },
            [onChange]
        );
        return <Component {...(restProps as TProps)} mode="floating" onChange={handleChange} />;
    };

    Wrapped.displayName = Component.displayName;

    return Wrapped;
};

const valueInputMapping = {
    [ColumnTypes.text]: withValueMapping(InputText),
    [ColumnTypes.currency]: withValueMapping(InputNumeric),
    [ColumnTypes.decimal]: withValueMapping(InputNumeric),
    [ColumnTypes.unit]: withValueMapping(InputNumeric),
    [ColumnTypes.percentage]: PercentageInput,
    [ColumnTypes.select]: withValueMapping(InputText),
    [ColumnTypes.date]: withValueMapping(InputDate),
};

export const EditDialog: FC<Props> = memo(({id, columnsConfig = [], selectionAmount, onEdit}) => {
    const {dialogParams, closeDialog} = useDialogState(id);

    const [selectedColumn, setSelectedColumn] = useState(columnsConfig[0].id);

    useEffect(() => {
        dialogParams?.columnId && setSelectedColumn(dialogParams?.columnId as string);
    }, [dialogParams?.columnId]);

    const handleColumnSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn(event.target.value);
    }, []);

    const [selectedType, setSelectedType] = useState<keyof typeof ColumnTypes>(ColumnTypes.text);

    useEffect(() => {
        const nextType =
            columnsConfig.find(({id}) => id === selectedColumn)?.type ||
            (ColumnTypes.text as keyof typeof ColumnTypes);
        setSelectedType(nextType);
    }, [columnsConfig, selectedColumn, setSelectedType]);

    const Input = useMemo(() => valueInputMapping[selectedType], [selectedType]);

    const [selectionValue, setSelectionValue] = useState('');

    useEffect(() => {
        setSelectionValue('');
    }, [selectedColumn]);

    const handleEdit = useCallback(() => {
        onEdit(selectedColumn || columnsConfig[0].id, selectionValue);
        closeDialog();
    }, [closeDialog, columnsConfig, onEdit, selectedColumn, selectionValue]);

    const handleReset = useCallback(() => {
        closeDialog();
    }, [closeDialog]);

    const actions = useMemo<ComponentProps<typeof Dialog>['actions']>(
        () => [
            [
                {title: 'Cancel', onClick: handleReset, icon: IconClose},
                {
                    title: 'Apply change',
                    icon: IconEdit,
                    onClick: handleEdit,
                    type: 'link' as const,
                },
            ] as const,
        ],
        [handleEdit, handleReset]
    );

    const userLocale = useBrowserLocale();

    const amountFormatted = new Intl.NumberFormat(userLocale, {
        style: 'decimal',
    }).format(selectionAmount || 0);

    return (
        <Dialog
            animation="scale-in"
            showCloseButton={false}
            dialogTitle={`Edit ${amountFormatted} row(s)`}
            id={id}
            className={classes.dialog}
            actions={actions}>
            <div className={classes.fieldset}>
                <FormField className={classes.field} label="Column:">
                    <Select
                        prefix={IconColumns}
                        value={selectedColumn}
                        onChange={handleColumnSelect}>
                        {columnsConfig.map(({id, name}) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </Select>
                </FormField>
                <FormField
                    className={classNames(classes.field, classes.valueField)}
                    label="New value:">
                    <Input value={selectionValue} onChange={setSelectionValue} />
                </FormField>
            </div>
        </Dialog>
    );
});

EditDialog.displayName = 'EditDialog';
