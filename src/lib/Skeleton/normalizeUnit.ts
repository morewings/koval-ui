import type {Unit} from './SkeletonTypes.ts';

export const normalizeUnit = (unitProp?: Unit) => {
    if (unitProp === 'fluid' || unitProp === undefined) {
        return '100%';
    }
    return `${unitProp}px`;
};
