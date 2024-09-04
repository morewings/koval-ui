/**
 * Utility function. Returns a random integer between min (inclusive) and max (inclusive).
 */
export const getRandomNumber = (min: number, max: number) => {
    const minRange = Math.ceil(min);
    const maxRange = Math.floor(max);
    return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
};

/**
 * Utility function. Returns a random floating number between min (inclusive) and max (inclusive).
 */
export const getRandomNumberFloating = (min: number, max: number) => {
    const minRange = Math.ceil(min);
    const maxRange = Math.floor(max);
    return Math.random() * (maxRange - minRange + 1) + minRange;
};
