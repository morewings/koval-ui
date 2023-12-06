import { flow, toPairs, map, fromPairs } from 'lodash/fp';

export const parseDataAttributes = (
    dataAttributes: Record<string, string>
): Record<string, string> => {
    return flow(
        toPairs,
        map(([name, value]) => [`data-${name}`, value]),
        fromPairs
    )(dataAttributes);
};
