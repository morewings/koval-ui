/**
 * Utility function. Returns random Date within the provided range
 */
export const getRandomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
