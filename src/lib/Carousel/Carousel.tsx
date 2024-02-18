import type {MutableRefObject, ReactNode} from 'react';
import {Children, forwardRef, useMemo, useState, useCallback} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {IconArrowLeft, IconArrowRight} from '@/internal/Icons';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import {Cell} from './Cell.tsx';
import {Dots} from './Dots.tsx';
import {useAutoRotate} from './useAutoRotate.ts';
import classes from './Carousel.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        width: number;
        height: number;
        children?: ReactNode;
        defaultVisible?: number;
        showDots?: boolean;
        showArrows?: boolean;
        /** Provide time interval in seconds to auto rotate Carousel */
        autoRotate?: number;
        /** Callback when user clicks navigation arrows */
        onRotate?: (index: number) => void;
    };

const getVisibleIndex = (index: number, length: number) => {
    return index % length >= 0 ? index % length : length + (index % length);
};

// CSS formulas
// const getTranslateZ = (width: number, amount: number) => width / (2 * Math.tan(Math.PI / amount));
// const getRotateY = (amount: number, index: number) => Math.round(index * (360 / amount));
// see https://3dtransforms.desandro.com/carousel

export const Carousel = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            width,
            height,
            defaultVisible = 0,
            showDots = true,
            showArrows = true,
            autoRotate,
            onRotate = () => {},
            ...nativeProps
        },
        ref
    ) => {
        const {LocalRoot, ref: innerRef} = useLocalTheme();

        useLinkRefs<HTMLDivElement>(ref, innerRef as MutableRefObject<HTMLDivElement>);

        const initialState = defaultVisible !== 0 ? defaultVisible - 1 : defaultVisible;

        const [visible, setVisible] = useState(initialState);

        const cellsAmount = Children.toArray(children).length;

        const visibleIndex = getVisibleIndex(visible, cellsAmount);

        const handleIncrement = useCallback(() => {
            const nextVisible = visible + 1;
            setVisible(nextVisible);
            onRotate(getVisibleIndex(nextVisible, cellsAmount));
        }, [visible, onRotate, cellsAmount]);

        const handleDecrement = useCallback(() => {
            const nextVisible = visible - 1;
            setVisible(nextVisible);
            onRotate(getVisibleIndex(nextVisible, cellsAmount));
        }, [visible, onRotate, cellsAmount]);

        const handleRotate = useCallback(() => {
            setVisible(visible + 1);
        }, [visible, setVisible]);

        useAutoRotate({
            rotateFn: handleRotate,
            interval: autoRotate && autoRotate * 1000,
            ref: innerRef,
        });

        const cells = useMemo(
            () =>
                Children.toArray(children).map((element, index) => {
                    return (
                        <Cell index={index} key={index}>
                            {element}
                        </Cell>
                    );
                }),
            [children]
        );
        // TODO: calculate width. Make Carousel responsive.
        const theme = useMemo(
            () => ({
                width,
                height,
                cellsAmount,
                rotations: visible,
            }),
            [width, height, cellsAmount, visible]
        );

        /**
         * Has to be empty array to avoid rerenders.
         * TODO: investigate css-vars-hook
         */
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        const LocalRootMemoized = useMemo(() => LocalRoot, []);

        return (
            <LocalRootMemoized {...nativeProps} theme={theme} className={classNames(classes.carousel, className)}>
                <div className={classes.scene}>
                    {showArrows && (
                        <button className={classNames(classes.navigation, classes.left)} onClick={handleDecrement}>
                            <IconArrowLeft className={classes.icon} />
                        </button>
                    )}
                    <div className={classes.viewport}>{cells}</div>
                    {showArrows && (
                        <button className={classNames(classes.navigation, classes.right)} onClick={handleIncrement}>
                            <IconArrowRight className={classes.icon} />
                        </button>
                    )}
                </div>
                {showDots && <Dots amount={Children.toArray(children).length} active={visibleIndex} />}
            </LocalRootMemoized>
        );
    }
);

Carousel.displayName = 'Carousel';
