type Callback<TValue> = (value: TValue, index: number, array: TValue[]) => boolean;

export const without = <TValue>(filter: TValue | Callback<TValue>, array: TValue[]) => {
    const filterFn =
        typeof filter === 'string'
            ? (member: TValue) => member !== filter
            : (filter as Callback<TValue>);
    return array.filter(filterFn);
};
