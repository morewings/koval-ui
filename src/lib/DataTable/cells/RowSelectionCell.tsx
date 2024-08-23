import type {FC} from 'react';
import classNames from 'classnames';

import {InputCheckbox} from '@/lib/InputCheckbox';

import classes from './Cells.module.css';

enum Modes {
    normal = 'normal',
    inverted = 'inverted',
}

export type Props = {
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (event: unknown) => void;
    mode?: keyof typeof Modes;
};

export const RowSelectionCell: FC<Props> = ({
    checked,
    disabled,
    onChange = () => {},
    indeterminate,
    mode = Modes.normal,
}) => {
    return (
        <div className={classes.rowSelectionCell}>
            <InputCheckbox
                indeterminate={indeterminate}
                className={classNames(classes.input, {[classes.inverted]: mode === Modes.inverted})}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    );
};
