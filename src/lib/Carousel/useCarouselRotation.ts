import {useCallback, useState} from 'react';

const getVisibleCellIndex = (index: number, length: number) => {
    return index % length >= 0 ? index % length : length + (index % length);
};

export type Props = {
    defaultVisible: number;
    cellsAmount: number;
    onRotate: (index: number) => void;
};

export const useCarouselRotation = ({defaultVisible, cellsAmount, onRotate}: Props) => {
    const [rotations, setRotations] = useState(defaultVisible);
    const visibleCellIndex = getVisibleCellIndex(rotations, cellsAmount);

    const rotateRight = useCallback(() => {
        const nextRotation = rotations + 1;
        setRotations(nextRotation);
        onRotate(getVisibleCellIndex(nextRotation, cellsAmount));
    }, [rotations, onRotate, cellsAmount]);

    const rotateLeft = useCallback(() => {
        const nextRotation = rotations - 1;
        setRotations(nextRotation);
        onRotate(getVisibleCellIndex(nextRotation, cellsAmount));
    }, [rotations, onRotate, cellsAmount]);

    const handleRotate = useCallback(() => {
        setRotations(rotations + 1);
    }, [rotations, setRotations]);

    return {visibleCellIndex, rotateRight, rotateLeft, rotations, handleRotate};
};
