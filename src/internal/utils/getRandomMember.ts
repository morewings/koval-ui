/**
 * Utility function. Gets random member of an array.
 */
export const getRandomElement = <TElement>(elements: TElement[]) => {
    return elements[Math.floor(Math.random() * elements.length)];
};
