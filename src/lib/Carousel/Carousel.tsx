import type {FC, ReactNode} from 'react';
import {Children, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {useAutoRotate} from '@/lib/Carousel/useAutoRotate.ts';
import {IconArrowLeft, IconArrowRight} from '@/internal/Icons';

import {useResponsiveWidth} from './useResponsiveWidth.ts';
import {useCarouselRotation} from './useCarouselRotation.ts';
import {Cell} from './Cell.tsx';
import {Dots} from './Dots.tsx';
import classes from './Carousel.module.css';

export type Props = {
    /** Carousel with in pixels */
    width: number;
    /** Carousel height in pixels */
    height: number;
    children?: ReactNode;
    /** Initially visible cell index */
    defaultVisible?: number;
    /** Show navigation dots */
    showDots?: boolean;
    /** Enable arrow navigation */
    showArrows?: boolean;
    /** Callback when a user clicks navigation arrows */
    onRotate?: (index: number) => void;
    /** Enable to see display backstage */
    exposedMode?: boolean;
    /** Provide a time interval in seconds to auto rotate Carousel */
    autoRotate?: number;
};

export const Carousel: FC<Props> = ({
    children,
    width,
    height,
    defaultVisible = 0,
    showDots = true,
    showArrows = true,
    onRotate = () => {},
    exposedMode = false,
    autoRotate,
}) => {
    const cellsAmount = Children.toArray(children).length;

    const {visibleCellIndex, rotateRight, rotateLeft, rotations, handleRotate} =
        useCarouselRotation({
            defaultVisible,
            cellsAmount,
            onRotate,
        });

    const {LocalRoot, ref} = useLocalTheme<HTMLDivElement>();

    const responsiveWidth = useResponsiveWidth({width, ref});

    const theme = useMemo(
        () => ({
            'aspect-ratio': width / height,
            width: width,
            'responsive-width': responsiveWidth,
            'cells-amount': cellsAmount,
            rotations: rotations,
        }),
        [width, height, responsiveWidth, cellsAmount, rotations]
    );

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

    useAutoRotate({
        rotateFn: handleRotate,
        interval: autoRotate && autoRotate * 1000,
        ref,
    });

    return (
        <LocalRoot theme={theme} className={classes.carousel}>
            <div
                className={classNames(classes.scene, {
                    [classes.normal]: !exposedMode,
                    [classes.exposed]: exposedMode,
                })}>
                {showArrows && (
                    <button
                        className={classNames(classes.navigation, classes.left)}
                        onClick={rotateLeft}>
                        <IconArrowLeft className={classes.icon} />
                    </button>
                )}
                <div className={classes.viewport}>{cells}</div>
                {showArrows && (
                    <button
                        className={classNames(classes.navigation, classes.right)}
                        onClick={rotateRight}>
                        <IconArrowRight className={classes.icon} />
                    </button>
                )}
            </div>
            {showDots && <Dots amount={cellsAmount} active={visibleCellIndex} />}
        </LocalRoot>
    );
};
