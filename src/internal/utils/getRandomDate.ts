import {getRandomNumberRange} from './getRandomNumber.ts';

type Props = {
    start: Date;
    end: Date;
    seed?: number;
};

/**
 * Utility function. Returns random Date within the provided range
 */
export const getRandomDate = ({start, end, seed}: Props) => {
    const randomDate = getRandomNumberRange({
        min: start.getTime(),
        max: end.getTime(),
        seed,
    });
    return new Date(randomDate);
};
