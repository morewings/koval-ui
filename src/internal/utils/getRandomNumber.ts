export const getRandomNumber = (seed?: number) => {
    let normalizedSeed = seed === undefined ? Math.random() + 1 : seed;
    const x = Math.sin(normalizedSeed++) * 10000;
    return x - Math.floor(x);
};

type Props = {
    min: number;
    max: number;
    seed?: number;
};

/**
 * Utility function. Returns a random integer between min (inclusive) and max (inclusive).
 */
export const getRandomNumberRange = ({min, max, seed}: Props) => {
    const minRange = Math.ceil(min);
    const maxRange = Math.floor(max);
    const normalizedSeed = seed !== undefined ? seed - min + max : undefined;
    return Math.floor(getRandomNumber(normalizedSeed) * (maxRange - minRange + 1)) + minRange;
};

/**
 * Utility function. Returns a random floating number between min (inclusive) and max (inclusive).
 */
export const getRandomFloatingRange = ({min, max, seed}: Props) => {
    const minRange = Math.ceil(min);
    const maxRange = Math.floor(max);
    return getRandomNumber(seed) * (maxRange - minRange + 1) + minRange;
};
