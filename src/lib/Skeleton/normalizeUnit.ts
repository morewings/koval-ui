import type {Unit} from './SkeletonTypes.ts';

export const normalizeUnit = (unitProp?: Unit) => {
    if (unitProp === undefined) {
        return 'auto';
    } else if (unitProp === 'fluid') {
        return '100%';
    }
    return `${unitProp}px`;
};
