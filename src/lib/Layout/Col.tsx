import type {FC, ReactNode} from 'react';
import {useEffect} from 'react';
import {useLocalTheme} from 'css-vars-hook';
import classNames from 'classnames';

import type {OffsetConfig, SizesConfig} from './SizeTypes';
import type {FluidUnit, SizeUnit} from './SizeTypes';
import classes from './Layout.module.css';

export type ColProps = Partial<SizesConfig> &
    Partial<OffsetConfig> & {
        /** Select an HTML element to render as a container */
        as?: string;
        children?: ReactNode;
        className?: string;
    };

const normalizeGrow = (breakPoint?: SizeUnit | FluidUnit) => {
    if (breakPoint === 'fluid') {
        return 1;
    }
    return 0;
};

export const Col: FC<ColProps> = ({
    as = 'div',
    children,
    className,
    xs,
    sm,
    md,
    lg,
    xl,
    offsetXS,
    offsetSM,
    offsetMD,
    offsetLG,
    offsetXL,
}) => {
    const {LocalRoot, setTheme} = useLocalTheme();
    useEffect(() => {
        setTheme({xs, offsetXS, growXS: normalizeGrow(xs)});
    }, [setTheme, xs, sm, md, lg, xl, offsetXS, offsetSM, offsetMD, offsetLG, offsetXL]);
    return <LocalRoot className={classNames(classes.column, className)}>{children}</LocalRoot>;
};
