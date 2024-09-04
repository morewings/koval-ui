/**
 * Naive implementation of a lodash set.
 * Mutates provided object.
 */
export const set = <TObject>(
    obj: TObject,
    path: string | string[],
    value: string | number
): TObject => {
    if (Object(obj) !== obj) return obj; // When obj is not an object,
    // If not yet an array, get the keys from the string-path
    if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
    // @ts-expect-error TODO: improve types
    (path as string[]).slice(0, -1).reduce(
        (
            a,
            c,
            i // Iterate all of them except the last one
        ) =>
            // @ts-expect-error TODO: improve types
            Object(a[c]) === a[c] // Does the key exist and is its value an object?
                ? // Yes: then follow that path
                  // @ts-expect-error TODO: improve types
                  a[c]
                : // No: create the key. Is the next key a potential array-index?
                  // @ts-expect-error TODO: improve types
                  (a[c] =
                      // @ts-expect-error TODO: improve types
                      Math.abs(path[i + 1]) >> 0 === +path[i + 1]
                          ? [] // Yes: assign a new array object
                          : {}), // No: assign a new plain object
        obj
    )[path[path.length - 1]] = value; // Finally, assign the value to the last key
    return obj; // Return the top-level object to allow chaining
};
