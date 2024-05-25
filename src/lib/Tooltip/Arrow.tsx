import {forwardRef, useMemo} from 'react';
import type {Placement} from '@floating-ui/react-dom';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import classes from './Tooltip.module.css';

export type Props = {
    placement: Placement;
    left?: number;
    top?: number;
};

export const Arrow = forwardRef<HTMLDivElement, Props>(({placement, left, top}, ref) => {
    const position = placement.split('-')[0];
    const {LocalRoot, ref: rootRef} = useLocalTheme<HTMLDivElement>();
    const theme = useMemo(() => {
        const result = {} as {top?: Props['top']; left?: Props['left']};
        if (top) {
            result.top = top;
        }
        if (left) {
            result.left = left;
        }
        return result;
    }, [left, top]);
    useLinkRefs<HTMLDivElement>(ref, rootRef);
    return (
        <LocalRoot
            theme={theme}
            className={classNames(classes.arrow, {
                [classes.bottom]: position === 'bottom',
                [classes.left]: position === 'left',
                [classes.top]: position === 'top',
                [classes.right]: position === 'right',
            })}></LocalRoot>
    );
});

Arrow.displayName = 'Arrow';
